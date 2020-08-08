import { FC } from "react";
interface OwnProps {
    loadMore: () => void;
    hasMore: boolean;
}
declare const InfinityScroll: FC<OwnProps>;
export default InfinityScroll;
