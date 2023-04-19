import moment from "moment";
import {
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  Box,
} from "@mui/material";
import Image from "next/image";
import useAuth from "../../hooks/useAuth";

function ChatMessage(props) {
  const avatarColor = null;
  const selectedChat = null;
  const { user } = useAuth();

  const { freelancerData } = props;

  console.log("F", freelancerData);

  return (
    <ListItem
      sx={[
        props.sentByMe
          ? { justifyContent: "right" }
          : { justifyContent: "left" },
        { mt: "-10px" },
      ]}
    >
      {props.sentByMe ? (
        <Box
          sx={{
            display: props.proposalDetailPage ? "flex-col" : "flex",
            alignItems: "flex-start",
            pt: "5px",
            pb: "5px",
            backgroundColor: "grey.300",
            borderRadius: "20px",
            border: 1,
            padding: 2,
            maxWidth: "fit-content",
          }}
        >
          <Box pl={3}>
            <ListItemText
              align="right"
              primary={props.message}
              sx={{ overflowWrap: "anywhere" }}
            ></ListItemText>
            {props.proposalDetailPage ? (
              <></>
            ) : (
              <ListItemText
                align="right"
                secondary={moment(props.date).format("HH:mm")}
                sx={{ mb: "2px" }}
              ></ListItemText>
            )}
          </Box>

          <ListItemIcon sx={{ ml: 2 }}>
            {props.proposalDetailPage ? (
              props.from.slice(0, 24)
            ) : (
              <Image
                className="rounded-3xl h-12 my-2 max-h-sm mr-3"
                src={
                  freelancerData != null
                    ? props.from == freelancerData.wallet_address
                      ? "https://ipfs.io/ipfs/" + freelancerData.ipfsImageHash
                      : "/polygon.png"
                    : user?.freelancer == null
                    ? "/polygon.png"
                    : "https://ipfs.io/ipfs/" + user?.freelancer.ipfsImageHash
                }
                alt="product image"
                width={50}
                height={50}
              />
            )}
          </ListItemIcon>
        </Box>
      ) : (
        <Box
          sx={{
            display: props.proposalDetailPage ? "flex-col" : "flex",
            alignItems: "flex-end",
            pt: "5px",
            pb: "5px",
            backgroundColor: "grey.100",
            borderRadius: "20px",
            border: 1,
            padding: 2,
            maxWidth: "fit-content",
          }}
        >
          <Box pr={3}>
            <ListItemText
              align="left"
              primary={props.message}
              sx={{ overflowWrap: "anywhere" }}
            ></ListItemText>
            {props.proposalDetailPage ? (
              <></>
            ) : (
              <ListItemText
                align="right"
                secondary={moment(props.date).format("HH:mm")}
                sx={{ mb: "2px" }}
              ></ListItemText>
            )}
          </Box>
          <ListItemIcon sx={{}}>
            {props.proposalDetailPage ? (
              props.from.slice(0, 24)
            ) : (
              <Image
                className="rounded-3xl h-12 my-2 max-h-sm mr-3"
                src={
                  freelancerData != null
                    ? props.from != freelancerData.wallet_address
                      ? "https://ipfs.io/ipfs/" + freelancerData?.ipfsImageHash
                      : "/polygon.png"
                    : "/polygon.png"
                }
                alt="product image"
                width={50}
                height={50}
              />
            )}
          </ListItemIcon>
        </Box>
      )}
    </ListItem>
  );
}

export default ChatMessage;
