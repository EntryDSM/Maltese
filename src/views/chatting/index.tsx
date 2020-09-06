import React, { FC } from "react";

import ChattingText from "../chattingText";
import { socketType } from "../../data/socket";
import ChattingSender from "../chattingSender";
import NotLogin from "../notLogin";
import * as S from "./style/index";

interface OwnProps {
  isOpen: boolean;
  isLogin: boolean;
  token: string;
  socket: socketType;
  errorHandler: (errorStatus: number) => void;
}

const Chatting: FC<OwnProps> = ({
  isOpen,
  isLogin,
  token,
  socket,
  errorHandler,
}) => {
  return isOpen ? (
    <S.Wrapper>
      <header>QnA</header>
      <div>
        {isLogin && !!token ? (
          <S.MessageView>
            <ChattingText
              errorHandler={errorHandler}
              socket={socket}
              token={token}
            />
            <ChattingSender socket={socket} />
          </S.MessageView>
        ) : (
          <NotLogin />
        )}
      </div>
    </S.Wrapper>
  ) : null;
};

export default Chatting;
