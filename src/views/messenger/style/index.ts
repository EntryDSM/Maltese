import styled from "styled-components";

import { Thema } from "../../../Thema";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: fixed;
  right: 40px;
  bottom: 40px;

  > button {
    all: unset;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background-color: ${Thema.MAIN_COLOR_1};
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: ${Thema.DEFAULT_SHADOW};
    transition: ease-in-out 0.2s;
    cursor: pointer;

    &:hover {
      background-color: ${Thema.MAIN_HOVER};
    }
    &:active {
      background-color: ${Thema.MAIN_ACTIVE};
    }

    > img {
      width: 40px;
      height: 40px;
      -webkit-user-drag: none;
      -ms-user-select: none;
      -moz-user-select: -moz-none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      user-select: none;
    }
  }
`;
