import React, { FC, useState, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { sendMessage, socketType } from "../../data/socket";
import { SendMark } from "../../assets";
import * as S from "./style/index";

interface OwnProps {
  socket: socketType;
}

const ChattingSender: FC<OwnProps> = ({ socket }) => {
  const [message, setMessage] = useState("");

  const send = useCallback(async () => {
    if (message.trim() === "") {
      return;
    }
    await sendMessage(socket)({ content: message });
    await setMessage("");
  }, [message]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        send();
      }
    },
    [send]
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
        autoFocus={true}
      />
      <button onClick={send}>
        <img src={SendMark} alt="전송" />
      </button>
    </S.Wrapper>
  );
};

export default ChattingSender;
