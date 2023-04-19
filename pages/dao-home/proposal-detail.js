import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connectSocket, socket } from "../../socket";
import useAuth from "../../hooks/useAuth";
import Chat from "../../components/chat/Chat";
import { List, Typography } from "@mui/material";
import ChatMessage from "../../components/chat/ChatMessage";
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

        {conversationsData != null ? (
          <>
            <div className="w-full">
              <h1 className="font-bold text-2xl mt-10">Conversation</h1>
              <div className="flex-col w-full border mb-10 mt-10">
                <List
                  sx={{
                    height: { xs: "79vh", sm: "79vh", md: "84vh" },
                    overflowY: "auto",
                    mt: { xs: 9, sm: 9, md: "20px" },
                  }}
                >
                  <div className="w-full">
                    {conversationsData != null &&
                    conversationsData?.[0]?.messages.length > 0 ? (
                      <>
                        {conversationsData[0].messages.map((message, id) => {
                          return (
                            <ChatMessage
                              key={id}
                              message={message.text}
                              date={message.date}
                              from={message.from}
                              sentByMe={
                                message.from == proposal?.client_address
                              }
                              // freelancerData={{
                              //   ipfsImageHash:
                              //     "bafkreibwronbp5evijccjhghclp3c6gul4qtl2mb44wajx2dbclapfphia",
                              // }}
                              proposalDetailPage={true}
                            />
                          );
                        })}
                      </>
                    ) : (
                      <Typography
                        component="h5"
                        variant="h5"
                        align="center"
                        mt="40vh"
                        color="grey.400"
                      >
                        This conversation is empty
                      </Typography>
                    )}
                  </div>
                </List>
              </div>
            </div>

            <div>
              <h1 className="font-bold text-2xl my-5">DAO Comments</h1>
              {daoMessages && daoMessages.length > 0 ? (
                daoMessages.map((message) => (
                  <>
                    <div className="w-full my-2">
                      <div className="h-32 border text-center flex items-center justify-center">
                        <p className="font-light text-xs text-blue-800 p-4">
                          {" "}
                          {message?.text}
                        </p>
                      </div>
                      <div className="flex justify-between w-full">
                        <p className="font-light text-xs text-blue-800 p-4">
                          {" "}
                          {message?.from}
                        </p>
                        <p className="font-light text-xs text-blue-800 p-4">
                          {" "}
                          <div className="flex items-center mt-2.5 mb-5">
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                              {new Date(message.created_at).toLocaleString()}
                            </span>
                          </div>
                        </p>
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <></>
              )}

              <div class="mb-5">
                <label
                  for="large-input"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Write your thoughts
                </label>
                <input
                  type="text"
                  id="large-input"
                  class="block w-full p-4 h-64 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => setMessageState(e.target.value)}
                  value={messageState}
                />
              </div>

              <button
                class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-20"
                onClick={() => sendMessage()}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="min-h-[calc(70vh)] flex items-center justify-center flex-col absoluteCenter">
            <img
              src={"/empty.png"}
              alt=""
              className="w-1/4 h-1/4"
              style={{
                filter: "grayscale(1)",
              }}
            />
            <p
              className="text-center text-gray-800 font-bold"
              onClick={() => getConversations()}
            >
              Please try clicking{" "}
              <span className="text-blue-700 cursor-pointer"> here </span> or
              refreshing if you don't see the conversation history
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DaoProposalDetail;
