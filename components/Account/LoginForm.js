import React, { useState } from "react";
// import jwt_decode from "jwt-decode";
// import { loginUser, profile, validateUser } from "../api/auth";
import useAuth from "../../hooks/useAuth";
// import Web3 from "web3";
import { useRouter } from "next/router";

import {
  useAccount,
  useConnect,
  useSignMessage,
  useDisconnect,
  useNetwork,
} from "wagmi";
import { requestMessage, verifySignature } from "../../api/auth";

import jwt_decode from "jwt-decode";
import ErrorBox from "../Validation/ErrorBox";

const LoginForm = ({ setWantsToLogin }) => {
  const router = useRouter();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const { chain } = useNetwork();
  const {
    isLoggedIn,
    user,
    setIsLoggedIn,
    setToken,
    isSellerYet,
    setUser,
    AsSeller,
    setAsSeller,
    chainId,
    isWrongNetwork,
    setValues,
  } = useAuth();

  const connectAndSign = async () => {
    setIsLoading(true);
    //disconnects the web3 provider if it's already active
    // if (isConnected) {
    //   await disconnectAsync();
    // }
    // enabling the web3 provider metamask
    // const { account, chain } = await connectAsync({
    //   connector: new InjectedConnector(),
    // });
    try {
      const userData = { address: address, chain: chain.id, network: "evm" };
      // making a post request to our 'request-message' endpoint
      const data = await requestMessage(userData);
      const message = data.message;

      // signing the received message via metamask
      const signature = await signMessageAsync({ message });
      setIsLoading(true);
      const verification_data = { message, signature };
      const result = await verifySignature(verification_data);

      console.log(result.token);
      //decrypt token and set user context
      const token = result.token;
      localStorage.setItem("token", token);

      // const decodedToken = jwt.verify(
      //   token,
      //   "MyUltraSecurePassWordIWontForgetToChange",
      //   { algorithms: ["HS256"] }
      // );
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);

      setIsLoggedIn(true);
      setToken(result.token);
      setUser(decodedToken.data.user);
      console.log(user);
      setValues();
      router.push("/explore");
    } catch (e) {
      setShowErrorDialog(true);
      setErrorMessage("You are not a member");
      if (e.toString().includes("rejected")) {
        setErrorMessage("User declined the action");
      } else if (e.toString().includes("deadline")) {
        setErrorMessage("Please select a date that is after today's date");
      } else {
        setErrorMessage(e.toString());
      }
    }
    // console.log(jwt_decode(result.token));
  };

  const { push } = useRouter();

  return (
    <div className="flex flex-col ml-20 mt-40">
      <ErrorBox
        cancel={setShowErrorDialog}
        show={showErrorDialog}
        errorMessage={errorMessage}
      />
      <h1 className="text-7xl font-black text-white">Log in</h1>
      <p className="mt-2 text-gray-400 text-sm font-light">
        Enter your credentials to access your account.
      </p>
      <form
        className="flex flex-col mt-20"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="email" className="text-sm font-semibold text-gray-500">
          Wallet
        </label>
        <input
          type="text"
          disabled={true}
          placeholder={address ? String(address) : "Connect your wallet"}
          className="placeholder:italic placeholder:text-slate-400 block bg-gray-100 bg-opacity-5 h-12 my-2 w-3/4 border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        />
        {address &&
          (!isWrongNetwork ? (
            <>
              {isLoading ? (
                <div className="flex w-3/4justify-end mt-5 mx-5">
                <img src="loading.svg" height={50} width={50} />
                </div>
              ) : (
                <button
                  // href="/explore"
                  onClick={() => connectAndSign()}
                  className="w-3/4 p-4 cursor-pointer border border-white rounded-2xl my-4  py-2 text-white font-light"
                >
                  Sign In
                </button>
              )}
            </>
          ) : (
            <span className="w-3/4 p-4 cursor-pointer border border-blue-800 rounded-2xl my-4  py-2 text-blue-800 font-light">
              Please reconnect to Polygon Mumbai network.
            </span>
          ))}
      </form>
    </div>
  );
};

export default LoginForm;
