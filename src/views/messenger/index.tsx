import React, { FC, useState, useEffect, useCallback } from "react";

import { OpenMark, CloseMark } from "../../assets";
import { socketType } from "../../data/socket";
import Chatting from "../chatting";
import * as S from "./style/index";

interface OwnProps {
  isLogin: boolean;
  token: string;
  socket: socketType;
  errorHandler: (errorStatus: number) => void;
}

const Messenger: FC<OwnProps> = ({ isLogin, token, socket, errorHandler }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isOpenHandler = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    [OpenMark, CloseMark].forEach((picture) => {
      const img = new Image();
      img.src = picture.fileName;
    });
  }, []);

  return (
    <S.Wrapper>
      <Chatting
        token={token}
        isOpen={isOpen}
        isLogin={isLogin}
        socket={socket}
        errorHandler={errorHandler}
      />
      <button onClick={isOpenHandler}>
        <img src={isOpen ? CloseMark : OpenMark} alt="채팅창 열기" />
      </button>
    </S.Wrapper>
  );
};

export default Messenger;
