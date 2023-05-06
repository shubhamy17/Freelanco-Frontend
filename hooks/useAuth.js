import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { getProfile, getProposalsOfClient } from "../api/auth";
import jwt_decode from "jwt-decode";
import { socket, connectSocket } from "../socket";
const {
  contractAddresses,
  Gig_abi,
  Freelanco_abi,
  DaoNFT_abi,
  whitelist_abi,
} = require("../constants");
const { ethers } = require("ethers");

const context = createContext();
const { Provider } = context;

const chainIdToNetwork = {
  1: "Mainnet",
  5: "Goerli",
  31337: "Hardhat",
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState();
  const [isSellerYet, setIsSellerYet] = useState(false);
  const [userProposals, setUserProposals] = useState([]);
  const [freelancoContract, setFreelanco] = useState(undefined);
  const [gigContract, setGigContract] = useState(undefined);
  const [daoNFTContract, setDAONFT] = useState(undefined);
  const [whitelistNFT, setWhitelistNFT] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [chainId, setChainID] = useState(undefined);
  const [network, setNetwork] = useState(undefined);
  const [provider, setProvider] = useState(undefined);
  const [asSeller, setAsSeller] = useState(false);
  const [skills, setSkills] = useState(["C++", "Python", "Tailwind", "AI/ML"]);
  const [currentFreelancerData, setCurrentFreelancerData] = useState(undefined);
  const [freelancerCompletenes, setCompleteness] = useState(undefined);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(undefined);
  const [searchedGigs, setSearchedGigs] = useState([]);
  const [newMessageCount, setNewMessageCount] = useState(new Set());
  const [isWrongNetwork, setIsWrongNetwork] = useState(undefined);

  console.log("newMessageCount...........................", newMessageCount);

  async function setValues() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    setSigner(provider.getSigner());
    setChainID(window.ethereum.networkVersion);
    if (parseInt(window.ethereum.networkVersion) === 80001) {
      setIsWrongNetwork(false);
    }
    setNetwork(chainIdToNetwork[chainId]);
    localStorage.setItem("isWalletConnected", true);
    // console.log("contractAddresses", contractAddresses["Gig"][window.ethereum.networkVersion][0], contractAddresses["Freelanco"][window.ethereum.networkVersion][0]);
    if (
      contractAddresses["Gig"][window.ethereum.networkVersion]?.[0] &&
      contractAddresses["Freelanco"][window.ethereum.networkVersion]?.[0]
    ) {
      const FreelancoContract = new ethers.Contract(
        contractAddresses["Freelanco"][window.ethereum.networkVersion][0],
        Freelanco_abi,
        signer
      );
      setFreelanco(FreelancoContract);

      if (contractAddresses.Gig[window.ethereum.networkVersion][0]) {
        const FreelancoContract = new ethers.Contract(
          contractAddresses["Gig"][window.ethereum.networkVersion][0],
          Gig_abi,
          signer
        );
        setGigContract(FreelancoContract);
      }

      if (contractAddresses.DaoNFT[window.ethereum.networkVersion][0]) {
        const DAONFT = new ethers.Contract(
          contractAddresses["DaoNFT"][window.ethereum.networkVersion][0],
          DaoNFT_abi,
          signer
        );
        setDAONFT(DAONFT);
      }
    }
    if (contractAddresses.Whitelist[window?.ethereum?.networkVersion]?.[0]) {
      const whitelist = new ethers.Contract(
        contractAddresses["Whitelist"][window.ethereum.networkVersion][0],
        whitelist_abi,
        signer
      );

      setWhitelistNFT(whitelist);
    }
  }


  useEffect(() => {
    console.log(socket, "auth socket");
    if (!socket && !socket?.connected && user) {
      console.log("connecting.....");
      connectSocket(user.wallet_address);
    }
  }, [user, socket]);


  useEffect(() => {
    if (socket && socket.connected && user ) {
      console.log("connectong new message....................");
      socket.on("new_message", (data) => {
        setNewMessageCount((prevSet) => {
          const newSet = new Set(prevSet);
          newSet.add(data.conversation_id);
          return newSet;
        });
      })
    }
  }, [user, socket, socket?.connected]);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("chainChanged", (e) => {
        setChainID(parseInt(e));
        if (parseInt(e) === 80001) {
          setIsWrongNetwork(false);
        } else {
          setIsWrongNetwork(true);
        }
      });
    }
  });

  useEffect(() => {
    setValues();
  }, [chainId]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      setToken(token);
      const decodedToken = jwt_decode(token);
      const user = decodedToken.data.user;
      setUser(user);
      setIsLoggedIn(true);
      // if (!socket) {
      //   console.log("socketttt---->", user._id);
      //   connectSocket(user?._id);
      // }
      setValues();
    }
  }, []);

  return (
    <Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        token,
        setToken,
        isSellerYet,
        userProposals,
        setUserProposals,
        asSeller,
        setAsSeller,
        freelancoContract,
        gigContract,
        daoNFTContract,
        whitelistNFT,
        signer,
        network,
        chainId,
        provider,
        skills,
        currentFreelancerData,
        setCurrentFreelancerData,
        freelancerCompletenes,
        setCompleteness,
        isWrongNetwork,
        setIsWrongNetwork,
        search,
        setSearch,
        setValues,
        theme,
        setTheme,
        searchedGigs,
        setSearchedGigs,
        newMessageCount,
        setNewMessageCount
      }}
    >
      {children}
    </Provider>
  );
};

const useAuth = () => useContext(context);

export default useAuth;
