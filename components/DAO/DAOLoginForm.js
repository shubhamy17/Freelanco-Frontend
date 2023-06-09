import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";
import ErrorBox from "../Validation/ErrorBox";
import { useAccount, useNetwork, useSignMessage } from "wagmi";
import { requestMessage, verifySignature } from "../../api/auth";

const { ethers } = require("ethers");

const LoginForm = ({ setWantsToLogin }) => {
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
    daoNFTContract,
  } = useAuth();
  const router = useRouter();

  const { address } = useAccount();
  const { chain } = useNetwork();

  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { signMessageAsync } = useSignMessage();

  const getData = async (userArg) => {
    let res;
    if (user) {
      res = await daoNFTContract.balanceOf(
        ethers.utils.getAddress(user.wallet_address)
      );
    } else {
      res = await daoNFTContract.balanceOf(
        ethers.utils.getAddress(userArg.wallet_address)
      );
    }
    if (!res) {
      alert("You are not a member 2");
      return;
    }
    res = Number(res._hex);

    if (res > 0) {
      router.push("/dao-home");
    } else {
      setShowErrorDialog(true);
      setErrorMessage("You are not a member");
    }
  };

  return (
    <div className="flex flex-col ml-20 mt-20">
      <ErrorBox
        cancel={setShowErrorDialog}
        show={showErrorDialog}
        errorMessage={errorMessage}
      />
      <h1 className="text-6xl font-black text-blue-800">The DAO</h1>
      <p className="mt-2 text-gray-400 text-sm font-light">
        Sign with your credentials to access your account.
      </p>
      <form
        className="flex flex-col mt-16"
        onSubmit={async (e) => {
          e.preventDefault();
          // router.push("/dao-home");
          if (user) {
            await getData();
          } else {
            if (address) {
              const userData = {
                address: address,
                chain: chain.id,
                network: "evm",
              };
              // making a post request to our 'request-message' endpoint
              const data = await requestMessage(userData);
              const message = data.message;

              // signing the received message via metamask
              const signature = await signMessageAsync({ message });
              const verification_data = { message, signature };
              const result = await verifySignature(verification_data);

              console.log(result.token);
              //decrypt token and set user context
              const token = result.token;
              localStorage.setItem("token", token);
              try {
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
                await getData(decodedToken.data.user);
              } catch (e) {
                setShowErrorDialog(true);
                setErrorMessage(e.toString());
                setShowErrorDialog(true);
              }
            } else {
              setShowErrorDialog(true);
              setErrorMessage("Please Connect Your Wallet");
              setShowErrorDialog(true);
            }
          }
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
        <button
          //   onClick={handleSignMessage}
          type="submit"
          className="w-3/4 border border-blue-800 rounded-2xl my-4  py-2 text-blue-800 font-light"
        >
          Sign In
        </button>
      </form>
      <div className="flex row justify-start space-x-2">
        <p className="font-sm font-light">Not a member?</p>{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => setWantsToLogin(false)}
        >
          {" "}
          Sign up{" "}
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
