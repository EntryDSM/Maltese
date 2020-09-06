/// <reference types="socket.io-client" />
import type { SendContent, User, SocketError, Authentication } from "./apiTypes";
export declare type socketType = SocketIOClient.Socket | null;
export declare const socketConnect: () => SocketIOClient.Socket;
export declare const authentication: (socket: socketType) => (data: Authentication) => void;
export declare const sendMessage: (socket: socketType) => (data: SendContent) => void;
export declare const listenOnReceiveMessage: (socket: socketType) => (listener: (user: User) => void) => void;
export declare const listenOnAuthenticated: (socket: socketType) => (listener: () => void) => void;
export declare const listenOnUnauthorized: (socket: socketType) => (listener: () => void) => void;
export declare const listenOnError: (socket: socketType) => (listener: (error: SocketError) => void) => void;
