import React, { FC, useState, useEffect } from "react";

import { authentication, socketConnect, socketType } from "../data/socket";
import Messenger from "./messenger/index";

interface OwnProps {
  isLogin: boolean;
  token: string | null;
  errorHandler: (errorStatus: number) => void;
}

const Views: FC<OwnProps> = ({ isLogin, token, errorHandler }) => {
  const [socket, setSocket] = useState<socketType>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (token && !isConnected) {
      const connected = socketConnect();
      setSocket(connected);
      setIsConnected(true);
      authentication(connected)({
        token: token || "",
        type: "student",
      });
    }
  }, [token]);

  return (
    <Messenger
      socket={socket}
      isLogin={isLogin}
      token={token || ""}
      errorHandler={errorHandler}
    />
  );
};

export default Views;
