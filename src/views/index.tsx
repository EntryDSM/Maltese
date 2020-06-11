import React, { FC } from "react";

import Messenger from "./messenger/index";

interface OwnProps {
  isLogin: boolean;
}

const Views: FC<OwnProps> = ({ isLogin }) => {
  return <Messenger isLogin={isLogin} />;
};

export default Views;
