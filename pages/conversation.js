import NavDrawer from "../components/chat/NavDrawer";
import Chat from "../components/chat/Chat";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { socket, connectSocket } from "../socket";
import useAuth from "../hooks/useAuth";

const Conversation = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [freelancerAddr, setFreelancerAddr] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [gigId, setGigId] = useState(undefined);

  useEffect(() => {
    if (router.query) {
      console.log("ROUTER:", router.query);
      const freelancer_address = router.query.address;

      const id = router.query.gig_id;
      console.log("FRELANCER: ", freelancer_address);
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
          console.log("DATA: ", data);

          // setMessagesList(data);
        }
      );
    }
  }, [user, socket]);

  const getConversations = () => {
    console.log("emiting2");

    if (!socket && user) {
      connectSocket(user.wallet_address);
    }

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
    if (!socket && user) {
      connectSocket(user.wallet_address);
    }
    if (socket && user && freelancerAddr) {
      socket.emit("start_conversation", {
        from: user?.wallet_address,
        to: freelancerAddr,
        gig_token_id: gigId,
      });
      // socket.on("new_message", (data) => {
      //   // const message = data.message;
      //   console.log("current_conversation------->", data);
      // });
    }
  }, [user, freelancerAddr, socket]);

  // console.log(conversationsData.filter((c) => c._id == selected));

  console.log(conversationsData);

  return (
    <div className="flex-col mt-20 transition ease-in-out delay-80 w-full">
      <div className="flex mx-20 space-x-8 mt-20">
        {conversationsData == null ? (
          <div className="min-h-[calc(70vh)] absoluteCenter flex items-center justify-center flex-col z-50">
            <img
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
            </p>
            {/* <button onClick={() => getConversations()}>Get Data</button> */}
          </div>
        ) : (
          <>
            <div className="flex-1/4 w-2/5 mb-20 ">
              <NavDrawer
                conversationsData={conversationsData}
                setSelected={setSelected}
              />
            </div>
            <div className="flex-3/4 w-3/4 flex-col mb-20">
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
          </>
        )}
      </div>

      {/* {conversations.length === 0 ? (
        <button onClick={() => getConversations()}>Get Data</button>
      ) : (
        <></>
      )} */}
    </div>
  );
};

export default Conversation;
