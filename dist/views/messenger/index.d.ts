import { FC } from "react";
import { socketType } from "../../data/socket";
interface OwnProps {
    isLogin: boolean;
    token: string;
    socket: socketType;
    errorHandler: (errorStatus: number) => void;
}
declare const Messenger: FC<OwnProps>;
export default Messenger;
