import NavDrawer from "../components/chat/NavDrawer";
import Chat from "../components/chat/Chat";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { socket, connectSocket } from "../socket";
import useAuth from "../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";

const Conversation = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [freelancerAddr, setFreelancerAddr] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [gigId, setGigId] = useState(undefined);

  useEffect(() => {
    if (router.query) {
      const freelancer_address = router.query.address;

      const id = router.query.gig_id;

      setFreelancerAddr(freelancer_address);
      setGigId(id);
    }
  }, [router]);

  const [selected, setSelected] = useState(null);
  const [conversationsData, setConversationsData] = useState(null);

  useEffect(() => {
    if (user && socket) {
      socket.emit(
        "get_direct_conversations",
        { user_id: user?.wallet_address },
        (data) => {
          setConversationsData(data);
          if (data.length > 0) {
            setSelected(data[0]._id);
          }
          // setMessagesList(data);
        }
      );
    }
  }, [user, socket]);

  const getConversations = () => {
    // if (!socket && user) {
    //   connectSocket(user.wallet_address);
    // }

    if (user && socket) {
      socket.emit(
        "get_direct_conversations",
        { user_id: user?.wallet_address },
        (data) => {
          setConversationsData(data);
          console.log("DATA: ", data);

          // setMessagesList(data);
        }
      );
    }
  };

  useEffect(() => {
    console.log(socket, "socket1");
    if (!socket && !socket?.connected && user) {
      console.log("connecting.....");
      connectSocket(user.wallet_address);
    }
  }, [user, socket]);

  useEffect(() => {
    console.log(socket, "socket2");
    if (socket && socket.connected && user && freelancerAddr) {
      console.log("emitting", user, freelancerAddr);
      socket.emit(
        "start_conversation",
        {
          from: user?.wallet_address,
          to: freelancerAddr,
          gig_token_id: gigId,
        },
        (data) => {
          console.log("strat convo data", data);
          // setConversationsData(data);
        }
      );
      // socket.on("new_message", (data) => {
      //   // const message = data.message;
      //   console.log("current_conversation------->", data);
      // });
    }
  }, [user, freelancerAddr, socket, socket?.connected]);
  function toggleChatList() {
    document.querySelector(".sidebar").classList.toggle("left-[-350px]");
  }

  // console.log(conversationsData.filter((c) => c._id == selected));

  return (
    // <div className="flex-col mt-20 transition ease-in-out delay-80 w-full h-90">
    //   <div className="flex mt-20"
    <>
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
                  conversationsData.filter((c) => c._id == selected)[0].messages
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
    </>
    //  </div>
    // </div>
  );
};

export default Conversation;
