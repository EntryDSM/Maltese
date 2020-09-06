import { FC } from "react";
interface OwnProps {
    isLogin: boolean;
    token: string | null;
    errorHandler: (errorStatus: number) => void;
}
declare const Views: FC<OwnProps>;
export default Views;
