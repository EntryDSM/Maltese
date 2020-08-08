import React, { FC, useState, useCallback, useEffect, useRef } from "react";

import type { User } from "../../data/apiTypes";
import { listenOnReceiveMessage, listenOnError } from "../../data/socket";
import { getChatsApi, responseStatus } from "../../data/apis";
import InfinityScroll from "../infinityScroll";
import { convertTimeStempToSentence } from "../../utils/convert";
import * as S from "./style/index";

interface OwnProps {
  token: string;
}

const ChattingText: FC<OwnProps> = ({ token }) => {
  const infinityScrollRef = useRef<HTMLDivElement>(null);
  const didMountRef = useRef(false);
  const [data, setData] = useState<User[] | null>(null);
  const [page, setPage] = useState(0);
  const [warningMeassage, setWarningMeassage] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = useCallback(async () => {
    const chatData = await getChatsApi({
      page,
      accessToken: token,
    });
    const { _200, _401 } = responseStatus(chatData?.status);

    if (_200) {
      await setData([...chatData.data, ...(data || [])]);
    } else if (_401) {
      setWarningMeassage("토큰이 만료되었습니다. 재 로그인이 필요합니다.");
      setHasMore(false);
    } else {
      setHasMore(false);
    }

    await setIsScroll(true);
    await setPage(page + 1);

    if (chatData?.data.length === 0) {
      setHasMore(false);
    }
  }, [data, page]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      listenOnReceiveMessage((chatData) => {
        setIsScroll(false);
        setData((v) => v?.concat(chatData) || [chatData]);
      });
      listenOnError((error) => {
        switch (error.code) {
          case "c01":
            setWarningMeassage("API가 존재하지 않습니다.");
            break;
          case "c02":
            setWarningMeassage("파라미터 값이 비어있습니다");
            break;
          case "a01":
            setWarningMeassage("유저 정보가 옳바르지 않습니다.");
            break;
          case "a02":
            setWarningMeassage("확인할 수 없는 유저입니다.");
            break;
          case "d01":
            setWarningMeassage("데이터베이스에 저장하는데 문제가 생겼습니다.");
            break;
          default:
            setWarningMeassage("X");
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!isScroll) {
      infinityScrollRef.current?.scrollTo(
        0,
        infinityScrollRef.current?.scrollHeight
      );
    }
  }, [data]);

  return (
    <S.Wrapper ref={infinityScrollRef}>
      {warningMeassage ? (
        <S.WarningMeassage>{warningMeassage}</S.WarningMeassage>
      ) : (
        <InfinityScroll loadMore={fetchMoreData} hasMore={hasMore}>
          {data === null || data.length === 0 ? (
            <S.EmptyData key="intro">
              EntryDSM에 궁금한점이 있으신가요?
            </S.EmptyData>
          ) : (
            data.map((v) => (
              <S.ChatBubble
                key={v.qna_id.toString()}
                isAdmin={v.to === "admin"}
              >
                <p>
                  {v.content}
                  <span>{convertTimeStempToSentence(v.created_at)}</span>
                </p>
              </S.ChatBubble>
            ))
          )}
        </InfinityScroll>
      )}
    </S.Wrapper>
  );
};

export default ChattingText;
