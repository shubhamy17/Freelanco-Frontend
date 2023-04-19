import React, { useState } from "react";
// import jwt_decode from "jwt-decode";
import { useMoralis } from "react-moralis";
// import { loginUser, profile, validateUser } from "../api/auth";
import useAuth from "../../hooks/useAuth";
// import Web3 from "web3";
import { useRouter } from "next/router";

import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";

const LoginForm = ({ setWantsToLogin }) => {
  const router = useRouter();
  const { setUser, setIsLoggedIn, user, isWrongNetwork } = useAuth();

  const { push } = useRouter();

  console.log(isWrongNetwork);

  return (
    <div className="flex flex-col ml-20 mt-20">
      <h1 className="text-7xl font-black text-blue-800">Log in</h1>
      <p className="mt-2 text-gray-400 text-sm font-light">
        Enter your credentials to access your account.
      </p>
      <form
        className="flex flex-col mt-16"
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
          placeholder={
            user ? String(user.wallet_address) : "Connect your wallet"
          }
          className="placeholder:italic placeholder:text-slate-400 block bg-gray-100 bg-opacity-5 h-12 my-2 w-3/4 border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        />
        {user &&
          (isWrongNetwork ? (
            <a
              href="/explore"
              className="w-3/4 p-4 cursor-pointer border border-blue-800 rounded-2xl my-4  py-2 text-blue-800 font-light"
            >
              Sign In
            </a>
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
