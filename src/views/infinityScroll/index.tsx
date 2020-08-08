import React, { FC } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { Loading } from "../../assets";
import * as S from "./style";

interface OwnProps {
  loadMore: () => void;
  hasMore: boolean;
}

const LoadingBar: FC = () => {
  return (
    <S.Loading>
      <Loading />
    </S.Loading>
  );
};

const InfinityScroll: FC<OwnProps> = ({ loadMore, hasMore, children }) => {
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      loader={<LoadingBar key="loading" />}
      hasMore={hasMore}
      useWindow={false}
      isReverse={true}
      threshold={10}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfinityScroll;
