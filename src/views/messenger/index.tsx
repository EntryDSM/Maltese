import React, { FC, useState, useEffect, useCallback } from "react";

import { OpenMark, CloseMark } from "../../assets";
import Chatting from "../chatting";
import * as S from "./style/index";

interface OwnProps {
  isLogin: boolean;
}

const Messenger: FC<OwnProps> = ({ isLogin }) => {
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
      <Chatting isOpen={isOpen} isLogin={isLogin} />
      <button onClick={isOpenHandler}>
        <img src={isOpen ? CloseMark : OpenMark} alt="채팅창 열기" />
      </button>
    </S.Wrapper>
  );
};

export default Messenger;
