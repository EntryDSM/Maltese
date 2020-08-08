import { FC } from "react";
interface OwnProps {
    isLogin: boolean;
    token: string;
}
declare const Messenger: FC<OwnProps>;
export default Messenger;
