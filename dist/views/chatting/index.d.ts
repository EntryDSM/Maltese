import { FC } from "react";
import { socketType } from "../../data/socket";
interface OwnProps {
    isOpen: boolean;
    isLogin: boolean;
    token: string;
    socket: socketType;
    errorHandler: (errorStatus: number) => void;
}
declare const Chatting: FC<OwnProps>;
export default Chatting;
