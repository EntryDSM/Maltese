import styled from "styled-components";

import { Thema } from "../../../Thema";

export const Wrapper = styled.div`
  flex: 1;
  max-height: 325px;
  overflow-y: scroll;
  display: flex;

  > div {
    width: 100%;
    height: 100%;
  }
`;

export const ChatBubble = styled.div<{ isAdmin: boolean }>`
  width: 100%;
  margin-top: 4px;
  display: flex;
  justify-content: ${({ isAdmin }) => (isAdmin ? "flex-end" : "flex-start")};

  > p {
    margin: 0;
    width: fit-content;
    max-width: 280px;
    min-height: 36px;
    padding: 10px 12px;
    box-sizing: border-box;
    font-size: 14px;
    border-radius: ${Thema.DEFAULT_RADIUS};
    border-bottom-left-radius: ${({ isAdmin }) => !isAdmin && 0};
    border-bottom-right-radius: ${({ isAdmin }) => isAdmin && 0};
    background: ${({ isAdmin }) =>
      isAdmin ? Thema.MAIN_COLOR_1 : Thema.SERVE_COLOR_1};
    color: ${({ isAdmin }) =>
      isAdmin ? Thema.MAIN_COLOR_2 : Thema.SERVE_COLOR_2};
  }
`;

export const EmptyData = styled.p`
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: ${Thema.MAIN_COLOR_1};
`;
