import { keyframes } from "styled-components";

export const downToUp = keyframes`
  0% {
    height: 42px;
    opacity: 0.3;
  }
  30% {
    height: 42px;
    opacity: 1;
  }
  100% {
    height: 450px;
  }
`;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  70% {
    opacity: 0;
    transform: scale( 0.98 );
  }

  100% {
    opacity: 1;
    transform: scale( 1 );
  }
`;
