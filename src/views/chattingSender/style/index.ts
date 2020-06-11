import styled from "styled-components";

import { Thema } from "../../../Thema";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 30px;
  max-height: 60px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > textarea {
    border: none;
    width: 328px;
    min-height: 30px;
    max-height: 60px;
    border-radius: 15px;
    box-sizing: border-box;
    padding: 9px 16px;
    resize: none;
    background-color: ${Thema.SERVE_COLOR_1};
    color: ${Thema.SERVE_COLOR_3};
    font-size: 10px;

    &::-webkit-scrollbar {
      background: none;
    }
    &::-webkit-scrollbar-thumb {
      background: none;
    }
    &::-webkit-scrollbar-track {
      background: none;
    }

    &:focus {
      outline: none;
    }
  }

  > button {
    all: unset;
    cursor: pointer;

    &:active {
      opacity: 0.2;
      transition-duration: 0s;
    }

    > img {
      width: 24px;
      height: 24px;
    }
  }
`;
