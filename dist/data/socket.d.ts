import type { SendContent, User, SocketError, Authentication } from "./apiTypes";
export declare const authentication: (data: Authentication) => void;
export declare const sendMessage: (data: SendContent) => void;
export declare const listenOnReceiveMessage: (listener: (user: User) => void) => void;
export declare const listenOnAuthenticated: (listener: () => void) => void;
export declare const listenOnUnauthorized: (listener: () => void) => void;
export declare const listenOnError: (listener: (error: SocketError) => void) => void;
