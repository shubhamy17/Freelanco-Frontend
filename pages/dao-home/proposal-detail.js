import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connectSocket, socket } from "../../socket";
import useAuth from "../../hooks/useAuth";
import Chat from "../../components/chat/Chat";
import { CircularProgress, List, Typography } from "@mui/material";
// import ChatMessage from "../../components/chat/ChatMessage";
import { ethers } from "ethers";

const DaoProposalDetail = () => {
  const router = useRouter();
  const { user, daoNFTContract } = useAuth();
  const [proposal, setProposal] = useState(null);

  useEffect(() => {
    if (router?.query?.proposal) {
      setProposal(JSON.parse(router.query.proposal));
    }
  }, [router]);

  const [conversationsData, setConversationsData] = useState();

  const [daoMessages, setDaoMessages] = useState([]);

  useEffect(() => {
    if (!socket && user && router.query) {
      connectSocket(user.wallet_address);
    }
    if (socket && proposal) {
      console.log("EMITING", proposal.gig_token_id);
      socket.emit(
        "get_messages_by_gig_id",
        { gig_token_id: proposal.gig_token_id },
        (data) => {
          // setConversationsData(data);
          console.log("DATA: ", data);
          setConversationsData(data);

          setDaoMessages(data?.[0]?.dao_messages);

          // setMessagesList(data);
        }
      );
    }
  }, [socket, user, router.query.data, proposal]);

  const [messageState, setMessageState] = useState(undefined);

  let message;

  console.log("DAO", daoMessages);

  const getConversations = () => {
    console.log("emiting2");

    if (!socket && user) {
      connectSocket(user.wallet_address);
    }

    if (user && socket) {
      socket.emit(
        "get_messages_by_gig_id",
        { gig_token_id: proposal.gig_token_id },
        (data) => {
          // setConversationsData(data);
          console.log("DATA: ", data);
          setConversationsData(data);

          setDaoMessages(data?.[0]?.dao_messages);

          // setMessagesList(data);
        }
      );
    }
  };

  const sendMessage = () => {
    message = {
      message: messageState,
      conversation_id: conversationsData?.[0]?._id,
      from: user.wallet_address,
      to: null,
      type: "Text",
    };

    if (socket) {
      socket.emit("text_message", message, function (response) {
        console.log("RES:", response);
        if (response) {
          setMessageState("");
          message = {
            ...message,
            text: message.message,
            created_at: new Date(),
          };
          setDaoMessages([...daoMessages, message]);
        } else {
        }
      });

      // setDaoMessages([...daoMessages, message]);
    }
  };

  return (
    <div>
      <div className="bg-gray-900 flex flex-col items-start justify-center text-center w-full text-white font-extrabold px-40 py-20">
        <p className="text-5xl ">Proposal</p>
        <div className="flex-col">
          {/* <div className="flex gap-x-2">
            <div className="w-64 border-2 border-white h-16 mt-5 rounded-2xl">
              <div className="flex-col text-md pt-1">
                <p>{proposal?.total0Votes}</p>
                <p className="text-white-500">Votes For</p>
              </div>
            </div>
            <div className="w-64 border-2 border-white h-16 mt-5 rounded-2xl">
              <div className="flex-col text-md pt-1">
                <p>{proposal?.total1Votes}</p>
                <p className="text-white-500">Votes Against</p>
              </div>
            </div>
          </div> */}
          {/* <div className="flex-col flex gap-y-5 mt-10">
            {" "}
            <button className="cursor-pointer border border-white text-white rounded-2xl font-light p-5">
              Vote for Freelancer
            </button>{" "}
            <button className="cursor-pointer border border-white text-white rounded-2xl font-light p-5">
              Vote for Client
            </button>{" "}
          </div> */}
        </div>
      </div>
      <div className="px-40 mt-10">
        <p className="text-5xl text-blue-800">Details</p>
        <div className="w-full">
          <div className="flex justify-between items-center">
            <p className="text-md font-bold">Reason for Proposal</p>
            <div className="flex flex-col">
              <p className="text-md font-bold py-8 pl-8 text-blue-800 hover:underline cursor-pointer">
                Made By:{" "}
                {proposal?.status == "Over_By_Freelancer"
                  ? proposal?.freelancer_address
                  : proposal?.client_address}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="h-32 border text-center flex items-center justify-center">
            <p className="font-light text-xs text-blue-800 p-4">
              {" "}
              {proposal?.reason}
            </p>
          </div>
        </div>

        {conversationsData == null ? (
          <div className="flex items-center align-center justify-center flex-col z-50 h-screen">
            {/* <img
              src={"/empty.png"}
              alt=""
              className="w-1/4 h-1/4"
              style={{
                filter: "grayscale(1)",
              }}
            />
            <p
              className="text-center text-gray-800 font-bold cursor-pointer"
              onClick={() => getConversations()}
            >
              Please try clicking <span className="text-blue-700"> here </span>{" "}
              or refreshing if you don't see your conversations
            </p> */}
            {/* <button onClick={() => getConversations()}>Get Data</button> */}
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="p-4 sm:ml-80 mt-16">
              <div className="inline-flex items-center p-2 text-sm rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <button type="button" onClick={() => toggleChatList()}>
                  <span className="sr-only">Your Chat</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>
                </button>
                <h3 className="p-2 font-bold">Your Chats</h3>
              </div>
              {selected != null ? (
                <Chat
                  selected={selected}
                  conversations={
                    conversationsData.filter((c) => c._id == selected)[0]
                      .messages
                  }
                  to={
                    conversationsData.filter((c) => c._id == selected)[0]
                      .participants
                  }
                  setConversations={setConversations}
                  freelancerData={
                    conversationsData.filter((c) => c._id == selected)[0]
                      .freelancer[0]
                  }
                />
              ) : (
                <></>
              )}
            </div>
            <NavDrawer
              conversationsData={conversationsData}
              setSelected={setSelected}
              toggleChatList={toggleChatList}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DaoProposalDetail;
