import type { SendContent, User, SocketError } from "./apiTypes";
export declare const sendMessage: (data: SendContent) => void;
export declare const listenOnReceiveMessage: (listener: (user: User) => void) => void;
export declare const listenOnError: (listener: (error: SocketError) => void) => void;
