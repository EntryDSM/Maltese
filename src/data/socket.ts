import socketio from "socket.io-client";

import type {
  SendContent,
  User,
  SocketError,
  Authentication,
} from "./apiTypes";
import { baseURL } from "./endpoints";

export type socketType = SocketIOClient.Socket | null;

export const socketConnect = () =>
  socketio(baseURL, {
    transports: ["websocket"],
  });

export const authentication = (socket: socketType) => (
  data: Authentication
) => {
  socket?.emit("authentication", data);
};

export const sendMessage = (socket: socketType) => (data: SendContent) => {
  socket?.emit("new message", data);
};

export const listenOnReceiveMessage = (socket: socketType) => (
  listener: (user: User) => void
) => {
  socket?.on("receive message", listener);
};

export const listenOnAuthenticated = (socket: socketType) => (
  listener: () => void
) => {
  socket?.on("authenticated", listener);
};

export const listenOnUnauthorized = (socket: socketType) => (
  listener: () => void
) => {
  socket?.on("unauthorized", listener);
};

export const listenOnError = (socket: socketType) => (
  listener: (error: SocketError) => void
) => {
  socket?.on("save error", listener);
};

export const removeReceiveMessageListener = (socket: socketType) => {
  socket?.removeListener("receive message");
};

export const removeAuthenticatedListener = (socket: socketType) => {
  socket?.removeListener("authenticated");
};

export const removeUnauthorizedListener = (socket: socketType) => {
  socket?.removeListener("unauthorized");
};

export const removeErrorListener = (socket: socketType) => {
  socket?.removeListener("save error");
};
