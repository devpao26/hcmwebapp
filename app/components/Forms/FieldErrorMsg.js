import styled, { keyframes } from 'styled-components';
import { RedColor } from '../StyleUtils/Colors';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ErrorMsg = styled.span`
  display: block;
  font-style: italic;
  font-size: .65rem;
  color: ${RedColor};
  opacity: 0;
  animation: ${fadeIn} .2s ease-in-out 0s 1 normal forwards;
`;

export default ErrorMsg;
