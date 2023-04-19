import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import useAuth from "../../hooks/useAuth";
import { ethers } from "ethers";
import ErrorBox from "../Validation/ErrorBox";

const DAORegisterForm = ({ setWantsToLogin }) => {
  const { account } = useMoralis();
  const { setUser, setIsLoggedIn, user, daoNFTContract, signer } = useAuth();
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const requestNFT = async () => {
    try {
      let contractWithSigner = daoNFTContract.connect(signer);
      let tx = await contractWithSigner.requestNft({
        value: ethers.utils.parseEther((0.11).toString()),
        gasLimit: 500000,
      });
      await tx.wait();
      console.log(tx);
      router.push("/dao-home");
    } catch (e) {
      console.log("E", e);
    }
  };

  return (
    <div className="flex flex-col ml-20 mt-20">
      <ErrorBox
        cancel={setShowErrorDialog}
        show={showErrorDialog}
        errorMessage={errorMessage}
      />
      <h1 className="text-6xl font-black text-blue-800">Get the DAO NFT</h1>
      <p className="mt-2 text-gray-400 text-sm font-light">
        to become a member of the DAO.
      </p>
      <form
        className="flex flex-col mt-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <>
          <label for="email" className="text-sm font-semibold text-gray-500">
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
            onClick={() => {
              if (user) {
                requestNFT();
              } else {
                setShowErrorDialog(true);
                setErrorMessage("Please Connect Your Wallet");
                setShowErrorDialog(true);
              }
            }}
            className="w-3/4 border border-blue-800 rounded-2xl my-4 py-2 text-blue-800 font-light"
          >
            Purchase
          </button>
        </>
      </form>
      <div className="flex row justify-start space-x-2">
        <p className="font-sm font-light">Already a member?</p>{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => setWantsToLogin(true)}
        >
          {" "}
          Sign in{" "}
        </span>
      </div>
    </div>
  );
};

export default DAORegisterForm;
