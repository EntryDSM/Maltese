import React, { FC, useState, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { keyPressEnter } from "../../utils/keyPress";
import { SendMark } from "../../assets";
import * as S from "./style/index";

const ChattingSender: FC = () => {
  const [message, setMessage] = useState("");

  const sendMessage = useCallback(() => {
    setMessage("");
  }, [message]);

  const handleKeyPress = useCallback(
    ({ key }: React.KeyboardEvent<HTMLTextAreaElement>) => {
      keyPressEnter(key, sendMessage);
    },
    []
  );

  const messageHandler = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(value);
    },
    []
  );

  return (
    <S.Wrapper>
      <TextareaAutosize
        value={message}
        onChange={messageHandler}
        onKeyPress={handleKeyPress}
        maxRows={4}
        placeholder="메세지를 입력해 주세요"
      />
      <button onClick={sendMessage}>
        <img src={SendMark} alt="전송" />
      </button>
    </S.Wrapper>
  );
};

export default ChattingSender;
