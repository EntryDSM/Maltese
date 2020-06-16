import React, { FC, useState, useCallback } from "react";

import type { User } from "../../data/apiTypes";
import InfinityScroll from "../infinityScroll";
import { convertTimeStempToSentence } from "../../utils/convert";
import * as S from "./style/index";

const ChattingText: FC = () => {
  const [data, setData] = useState<User[] | null>(
    // null
    [
      {
        qna_id: 1,
        admin_email: "admin@example.com",
        user_email: "user@example.com",
        to: "admin",
        content: "안녕하세요",
        created_at: "2020-06-03T05:12:40.000Z",
      },
      {
        qna_id: 2,
        admin_email: "admin@example.com",
        user_email: "user@example.com",
        to: "student",
        content:
          "반갑습니반갑습니반갑습니반갑습니반갑습니반갑습니반갑습니반갑습니반갑습니반갑습니반갑습니반갑습니반갑습니반갑습니반갑습니",
        created_at: "2020-06-03T05:13:40.000Z",
      },
      {
        qna_id: 3,
        admin_email: "admin@example.com",
        user_email: "user@example.com",
        to: "admin",
        content: "안녕하세요",
        created_at: "2020-06-03T05:15:40.000Z",
      },
    ]
  );
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = useCallback(async () => {
    if (data === null) {
      setHasMore(false);
      return;
    }
    if (data.length > 50) setHasMore(false);

    await setData([
      {
        qna_id: page + 4,
        admin_email: "admin@example.com",
        user_email: "user@example.com",
        to: "admin",
        content: "안녕하세요",
        created_at: "2020-06-03T05:15:40.000Z",
      },
      ...data,
    ]);
    await setPage(page + 1);
  }, [data, page]);

  return (
    <S.Wrapper>
      <InfinityScroll loadMore={fetchMoreData} hasMore={hasMore}>
        {data === null || data.length === 0 ? (
          <S.EmptyData>EntryDSM에 궁금한점이 있으신가요?</S.EmptyData>
        ) : (
          data.map((v) => (
            <S.ChatBubble key={v.qna_id} isAdmin={v.to === "admin"}>
              <p>
                {v.content}
                <span>{convertTimeStempToSentence(v.created_at)}</span>
              </p>
            </S.ChatBubble>
          ))
        )}
      </InfinityScroll>
    </S.Wrapper>
  );
};

export default ChattingText;
