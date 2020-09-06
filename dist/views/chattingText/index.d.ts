import { FC } from "react";
import { socketType } from "../../data/socket";
interface OwnProps {
    token: string;
    socket: socketType;
    errorHandler: (errorStatus: number) => void;
}
declare const ChattingText: FC<OwnProps>;
export default ChattingText;
