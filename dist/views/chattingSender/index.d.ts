import { FC } from "react";
import { socketType } from "../../data/socket";
interface OwnProps {
    socket: socketType;
}
declare const ChattingSender: FC<OwnProps>;
export default ChattingSender;
