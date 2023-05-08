import React from "react";

const classes = {
  messageRow: {
    display: "flex"
  },
  messageRowRight: {
    display: "flex",
    justifyContent: "flex-end"
  },
  messageBlue: {
    position: "relative",
    marginLeft: "20px",
    marginBottom: "0.4px",
    padding: "10px",
    backgroundColor: "#A8DDFD",
    // maxWidth: "60%",
    // minWidth:"10%",
    //height: "50px",
    textAlign: "left",
    font: "400 .9em 'Open Sans', sans-serif",
    border: "1px solid #97C6E3",
    borderRadius: "10px",
    "&:after": {
      content: "''",
      position: "absolute",
      width: "0",
      height: "0",
      borderTop: "15px solid #A8DDFD",
      borderLeft: "15px solid transparent",
      borderRight: "15px solid transparent",
      top: "0",
      left: "-15px"
    },
    "&:before": {
      content: "''",
      position: "absolute",
      width: "0",
      height: "0",
      borderTop: "17px solid #97C6E3",
      borderLeft: "16px solid transparent",
      borderRight: "16px solid transparent",
      top: "-1px",
      left: "-17px"
    }
  },
  messageOrange: {
    position: "relative",
    marginRight: "20px",
    marginBottom: "0.4px",
    padding: "10px",
    backgroundColor: "#f8e896",
    maxWidth: "60%",
    minWidth: "10%",
    //height: "50px",
    textAlign: "left",
    font: "400 .9em 'Open Sans', sans-serif",
    border: "1px solid #dfd087",
    borderRadius: "10px",
    "&:after": {
      content: "''",
      position: "absolute",
      width: "0",
      height: "0",
      borderTop: "15px solid #f8e896",
      borderLeft: "15px solid transparent",
      borderRight: "15px solid transparent",
      top: "0",
      right: "-15px"
    },
    "&:before": {
      content: "''",
      position: "absolute",
      width: "0",
      height: "0",
      borderTop: "17px solid #dfd087",
      borderLeft: "16px solid transparent",
      borderRight: "16px solid transparent",
      top: "-1px",
      right: "-17px"
    }
  },

  messageContent: {
    padding: 0,
    margin: 0,
    wordWrap: "break-word"
  },
  messageTimeStampRight: {
    // position: "absolute",
    fontSize: ".85em",
    fontWeight: "550",
    marginBottom: "5px"
    // padding:"5px"
  },

  orange: {
    color: "#ff5722",
    backgroundColor: "#ff5722",
    width: 40,
    height:40,
    marginTop:9
  },
  avatarNothing: {
    color: "transparent",
    backgroundColor: "transparent",
    width: "40px",
    height: "40px"
  },
  displayName: {
    marginBottom: "5px",
    fontWeight: "550"
  }
}

function isImageOrDocument(fileUrl) {
  const extension = fileUrl.split('.').pop().toLowerCase();
  switch (extension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return 'image';
    case 'pdf':
    case 'doc':
    case 'docx':
    case 'xls':
    case 'xlsx':
    case 'ppt':
    case 'pptx':
    case 'txt':
    case 'csv':
      return 'document';
    default:
      return 'unknown';
  }
}



//avatarが左にあるメッセージ（他人）
export const MessageLeft = (props) => {
  const ext = isImageOrDocument(props.message);
  console.log(props.message, ext);
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? (new Date(props.timestamp).getHours().toString().padStart(2, '0') + ":" + new Date(props.timestamp).getMinutes().toString().padStart(2, '0')) : "";
  const photoURL = props.photoURL ? props.photoURL : "/polygon.png";
  const displayName = props.displayName;
  return (
    <>
      <div style={props.timestamp != null ? { "marginTop": "5px", ...classes.messageRow } : {...classes.messageRow}}>
        {props.timestamp != null ?
          <img
            className="rounded-full"
            alt={displayName}
            style={classes.orange}
            src={photoURL}
            height={"100px"}
            width={"100px"}
          />
          : <span style={{ "width": "32px" }}></span>}
        <div style={{ "minWidth": "10%", "maxWidth": "60%" }}>
          <div style={classes.messageBlue}>
            {props.timestamp != null ?
              <div style={classes.displayName}>
                <span style={{ "paddingRight": "5px" }}>{displayName}</span>
                <span style={classes.messageTimeStampRight}>{timestamp}</span>
              </div>
              : null}
            <div>
              {ext === "document" ? (
                <p style={classes.messageContent}>
                  <a href={message} target="_blank"><u>{message}</u></a>
                </p>
              ) : ext === "image" ? (
                <img
                  src={message}
                  style={{ height: "300px", width: "auto" }}
                  alt=""
                />
              ) : (
                <p style={classes.messageContent}>{message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
//avatarが右にあるメッセージ（自分）
export const MessageRight = (props) => {
  const ext = isImageOrDocument(props.message);
  // console.log(props.message, ext);
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? (new Date(props.timestamp).getHours().toString().padStart(2, '0') + ":" + new Date(props.timestamp).getMinutes().toString().padStart(2, '0')) : "";
  return (
    <div style={props.timestamp != null ? { "marginTop": "10px", ...classes.messageRowRight } : { ...classes.messageRowRight }}>
      <div style={classes.messageOrange}>
        {props.timestamp != null ? (
          <div style={classes.messageTimeStampRight}>{timestamp}</div>
        ) : null}
        {ext === "document" ? (
          <p style={classes.messageContent}>
            <a href={message} target="_blank"><u>{message}</u></a>
          </p>
        ) : ext === "image" ? (
          <img
            src={message}
            style={{ height: "auto", width: "300px" }}
            alt=""
          />
        ) : (
          <p style={classes.messageContent}>{message}</p>
        )}
      </div>
    </div>
  );
};
