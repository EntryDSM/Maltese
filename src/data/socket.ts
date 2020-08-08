import socketio from "socket.io-client";

import type { SendContent, User, SocketError } from "./apiTypes";
import { getItemToSesstion } from "../utils/storeage";
import { baseURL } from "./endpoints";

const socket = socketio(baseURL, {
  transports: ["websocket"],
  query: `auth_token=${getItemToSesstion("messaging_token")}`,
});

export const sendMessage = (data: SendContent) => {
  socket.emit("new message", data);
};

export const listenOnReceiveMessage = (listener: (user: User) => void) => {
  socket.on("receive message", listener);
};

export const listenOnError = (listener: (error: SocketError) => void) => {
  socket.on("save error", listener);
};
