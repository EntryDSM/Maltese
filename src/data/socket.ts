import socketio from "socket.io-client";

import type {
  SendContent,
  User,
  SocketError,
  Authentication,
} from "./apiTypes";
import { baseURL } from "./endpoints";

const socket = socketio(baseURL, {
  transports: ["websocket"],
});

export const authentication = (data: Authentication) => {
  socket.emit("authentication", data);
};

export const sendMessage = (data: SendContent) => {
  socket.emit("new message", data);
};

export const listenOnReceiveMessage = (listener: (user: User) => void) => {
  socket.on("receive message", listener);
};

export const listenOnAuthenticated = (listener: () => void) => {
  socket.on("authenticated", listener);
};

export const listenOnUnauthorized = (listener: () => void) => {
  socket.on("unauthorized", listener);
};

export const listenOnError = (listener: (error: SocketError) => void) => {
  socket.on("save error", listener);
};
