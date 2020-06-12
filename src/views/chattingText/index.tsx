import React, { FC, useState, useCallback } from "react";

import InfinityScroll from "../infinityScroll";
import * as S from "./style/index";

const ChattingText: FC = () => {
  const [a, sA] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = useCallback(async () => {
    if (a.length > 1000) setHasMore(false);

    await sA([
      page,
      page,
      page,
      page,
      page,
      page,
      page,
      page,
      page,
      page,
      ...a,
    ]);
    await setPage(page + 1);
  }, [a, page]);

  return (
    <S.Wrapper>
      <InfinityScroll loadMore={fetchMoreData} hasMore={hasMore}>
        {a.map((v, i) => (
          <div key={i.toString()}>{v}</div>
        ))}
      </InfinityScroll>
    </S.Wrapper>
  );
};

export default ChattingText;
