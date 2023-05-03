import { useEffect, useReducer, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";
import { socket } from "../../socket";
import ChatMessage from "./ChatMessage";
import { Box, Fab, List, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { MessageLeft, MessageRight } from "./Message";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextInput from "./TextInput";


const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: "80vw",
      height: "80vh",
      maxWidth: "500px",
      maxHeight: "700px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    paper2: {
      width: "80vw",
      maxWidth: "500px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )"
    }
  })
);

function Chat({ selected, conversations, to, freelancerData }) {
  const { user } = useAuth();
  const router = useRouter();
  const refc = useRef();
  const [messageState, setMessage] = useState("");

  const [freelancerAddr, setFreelancerAddr] = useState(null);

  const initialState = {
    messages: conversations || [],
  };
  useEffect(() => {
    if (conversations) {
      dispatch({ type: "SET_INITIAL_MESSAGES", payload: conversations });
    }
  }, [conversations])

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_MESSAGE":
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      case "SET_INITIAL_MESSAGES":
        return {
          messages: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (router.query.address) {
      const freelancer_address = router.query.address;

      setFreelancerAddr(freelancer_address);
    }
  }, [router, conversations]);

  const ref = useRef(null);

  const sendMessage = () => {
    const message = {
      message: messageState,
      conversation_id: selected,
      from: user.wallet_address,
      to: to.filter((addr) => addr !== user.wallet_address)[0],
      type: "Text",
    };
    if (socket) {
      socket.emit("text_message", message);
      setMessage("");
      ref.current.focus();
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("new_message", (data) => {
        // Check if incoming data has a unique createdAt value
        if (selected === data.conversation_id) {
          // Update lastCreatedAt to current value
          refc.current.scrollTop = refc.current.scrollHeight;
          dispatch({ type: "ADD_MESSAGE", payload: data.message });
        }
      });
    }

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      if (socket) {
        socket.off("new_message");
      }
    };
  }, [selected]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Do something when the Enter key is pressed
      sendMessage();
      console.log("Enter key pressed!");
    }
  };

  return (
    // <div className="shadow ">
    <>
      <div className="w-full ">
        {freelancerData ? (
          <div class="flex items-center  bg-white cursor-pointer px-2 w-full">
            <Image
              className="rounded-3xl h-14  m-4 max-h-sm"
              src={"https://ipfs.io/ipfs/" + freelancerData?.ipfsImageHash}
              alt="product image"
              width={50}
              height={50}
            />
            <div className="flex-col">
              <p className="font-bold text-md hover:underline cursor-pointer">
                {freelancerData?.name}
              </p>
              <h5 class="mb-2 text-xs font-bold tracking-tight text-gray-900">
                {freelancerData?.wallet_address}
              </h5>
              {freelancerData?.isTopRated && (
                <p className="text-blue-800 text-xs">Top Rated Seller</p>
              )}
            </div>
          </div>
        ) : (
          <div class="flex items-center bg-white border cursor-pointer px-2">
            <img
              className="rounded-3xl m-4 max-h-sm"
              src={"https://cryptologos.cc/logos/polygon-matic-logo.png"}
              alt="product image"
              width={50}
              height={50}
            />
            <div className="flex-col">
              <p className="font-bold text-md hover:underline cursor-pointer">
                {to[0] != user?.wallet_address ? to[0] : to[1]}{" "}
              </p>
              <h5 class="mb-2 text-xs font-bold tracking-tight text-gray-900">
                {new Date(
                  state.messages?.[state.messages.length - 1]?.created_at
                ).toLocaleString()}
              </h5>
            </div>
          </div>
        )}
      </div>
      <List
        ref={refc}
        sx={{
          height: { xs: "79vh", sm: "79vh", md: "84vh" },
          overflowY: "auto",
          mt: { xs: 9, sm: 9, md: "20px" },
        }}
      >
        {state.messages.length > 0 ? (
          <>
            {state.messages.map((message, id) => {
              return (
                // <ChatMessage
                //   key={id}
                //   message={message.text}
                //   date={message.date}
                //   sentByMe={message.from == user?.wallet_address}
                //   freelancerData={freelancerData}
                // />
                <>
                  {message.from != user?.wallet_address &&
                    <MessageLeft
                      message={message.text}
                      timestamp={message.date}
                      photoURL={"https://ipfs.io/ipfs/" + freelancerData?.ipfsImageHash}
                      // displayName={freelancerData?.name}
                      avatarDisp={true}
                    />}

                  {message.from == user?.wallet_address &&
                    <MessageRight
                      message={message.text}
                      timestamp={message.date}
                      photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                      // displayName="まさりぶ"
                      avatarDisp={true}
                    />
                  }
                </>
              );
            })}

            {/* <div ref={bottomOfMessages}></div> */}
          </>
        ) : conversations != null && conversations.length > 0 ? (
          <>
            {conversations.map((message, id) => {
              return (
                // <ChatMessage
                //   key={id}
                //   message={message.text}
                //   date={message.date}
                //   sentByMe={message.from == user.wallet_address}
                //   freelancerData={freelancerData}
                // />
                <>
                  {message.from != user?.wallet_address &&
                    <MessageLeft
                      message={message.text}
                      timestamp={message.date}
                      photoURL={"https://ipfs.io/ipfs/" + freelancerData?.ipfsImageHash}
                      // displayName={freelancerData?.name}
                      avatarDisp={true}
                    />}

                  {message.from == user?.wallet_address &&
                    <MessageRight
                      message={message.text}
                      timestamp={message.date}
                      photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                      // displayName="まさりぶ"
                      avatarDisp={true}
                    />
                  }
                </>
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
      </List>

      <div className="border">
        <Box
          // onSubmit={sendMessage}
          align="left"
          sx={{
            padding: "25px",
            display: "inline-flex",
            justifyContent: "left",
            width: { xs: "100%", sm: "100%", md: "95%", lg: "100%" },
            overflow: "hidden",
          }}
        >
          <Box sx={{ width: "90%" }}>
            {/* <TextField
              id="outlined-basic-email"
              label=""
              fullWidth
              // value={textInput}
              // onChange={handleTextInputChange}
            /> */}
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              value={messageState}
              ref={ref}
              onKeyDown={handleKeyDown}
            />
          </Box>
          <Box
            sx={{
              width: { xs: "30%", sm: "20%", md: "10%" },
              display: "flex",
              justifyContent: "left",
              marginLeft: "10px",
            }}
          >
            <p
              class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => sendMessage()}
            >
              Send
            </p>
          </Box>
        </Box>
      </div>
    </>
    // </div>
  );
}

export default Chat;
