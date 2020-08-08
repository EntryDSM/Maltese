import React, { FC, useEffect, useRef } from "react";

import { setItemToSesstion } from "../utils/storeage";
import Messenger from "./messenger/index";

interface OwnProps {
  isLogin: boolean;
  token: string;
}

const Views: FC<OwnProps> = ({ isLogin, token }) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      setItemToSesstion("messaging_token", token);
    }
  }, []);

  return <Messenger isLogin={isLogin} token={token} />;
};

export default Views;
