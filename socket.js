// import io from 'socket.io-client';

// const socket = io('http://localhost:8080'); // replace with your server URL

// export default socket;

import io from "socket.io-client"; // Add this

let socket;
import { baseURL } from "./constants";

const connectSocket = (address) => {
  socket = io(baseURL, {
    query: `address=${address}`,
  });
}; // Add this -- our server will run on port 4000, so we connect to it from here

export { socket, connectSocket };
