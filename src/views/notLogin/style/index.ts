import styled from "styled-components";

import { Thema } from "../../../Thema";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  > p {
    color: ${Thema.WARNING_COLOR};
    font-size: 24px;
  }
`;
