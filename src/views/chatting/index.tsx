import React, { FC } from "react";

import ChattingText from "../chattingText";
import ChattingSender from "../chattingSender";
import NotLogin from "../notLogin";
import * as S from "./style/index";

interface OwnProps {
  isOpen: boolean;
  isLogin: boolean;
  token: string;
}

const Chatting: FC<OwnProps> = ({ isOpen, isLogin, token }) => {
  return isOpen ? (
    <S.Wrapper>
      <header>QnA</header>
      <div>
        {isLogin ? (
          <S.MessageView>
            <ChattingText token={token} />
            <ChattingSender />
          </S.MessageView>
        ) : (
          <NotLogin />
        )}
      </div>
    </S.Wrapper>
  ) : null;
};

export default Chatting;
