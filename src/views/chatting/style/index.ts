import styled from "styled-components";

import { Thema } from "../../../Thema";
import { downToUp, upToDown, fadeIn, fadeOut } from "./animation";

export const Wrapper = styled.div<{ isOpen: boolean }>`
  animation: ${({ isOpen }) => (isOpen ? downToUp : upToDown)} 1s ease-in-out
    forwards;

  width: 400px;
  overflow: hidden;
  border-radius: ${Thema.DEFAULT_RADIUS};
  border: solid 2px ${Thema.MAIN_COLOR_1};
  background-color: ${Thema.SERVE_COLOR_4};
  margin-bottom: 10px;

  > header {
    width: 100%;
    height: 42px;
    padding: 0 15px;
    box-sizing: border-box;
    line-height: 42px;
    font-size: 20px;
    color: ${Thema.SERVE_COLOR_4};
    background-color: ${Thema.MAIN_COLOR_1};
    -webkit-user-drag: none;
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }

  > div {
    animation: ${({ isOpen }) => (isOpen ? fadeIn : fadeOut)} 1.5s ease-out
      forwards;

    width: 100%;
    height: 408px;
    box-sizing: border-box;
    padding: 16px;
  }
`;

export const MessageView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
