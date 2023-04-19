import React, { useState } from "react";
// import jwt_decode from "jwt-decode";
import { useMoralis } from "react-moralis";
// import { loginUser, profile, validateUser } from "../api/auth";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";
import ErrorBox from "../Validation/ErrorBox";
// import Web3 from "web3";

const { ethers } = require("ethers");

const LoginForm = ({ setWantsToLogin }) => {
  const { setUser, setIsLoggedIn, user, daoNFTContract } = useAuth();
  const { account } = useMoralis();
  const router = useRouter();

  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const getData = async () => {
    let res = await daoNFTContract.balanceOf(
      ethers.utils.getAddress(user.wallet_address)
    );
    res = Number(res._hex);

    if (res > 0) {
      router.push("/dao-home");
    } else {
      alert("You are not a member");
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
        onSubmit={(e) => {
          e.preventDefault();
          // router.push("/dao-home");
          if (user) {
            getData();
          } else {
            setShowErrorDialog(true);
            setErrorMessage("Please Connect Your Wallet");
            setShowErrorDialog(true);
          }
        }}
      >
        <label htmlFor="email" className="text-sm font-semibold text-gray-500">
          Wallet
        </label>
        <input
          type="text"
          disabled={true}
          placeholder={
            user ? String(user?.wallet_address) : "Connect your wallet"
          }
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
