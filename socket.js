// import io from 'socket.io-client';

// const socket = io('http://localhost:8080'); // replace with your server URL

// export default socket;

// import io from "socket.io-client"; // Add this

// let socket;
// import { baseURL } from "./constants-url";

// const connectSocket = (address) => {
//   socket = io(baseURL, {
//     query: `address=${address}`,
//   });
//   return socket;
// }; // Add this -- our server will run on port 4000, so we connect to it from here

// export { socket, connectSocket };

import io from "socket.io-client";
import { baseURL } from "./constants-url";

let socket;

const connectSocket = (address) => {
  return new Promise((resolve, reject) => {
    socket = io(baseURL, {
      query: `address=${address}`,
    });

    socket.on("connect", () => {
      console.log("Socket connected");
      resolve(socket);
    });

    socket.on("connect_error", (err) => {
      console.log("Socket connection error:", err);
      reject(err);
    });
  });
};

export { socket, connectSocket };

