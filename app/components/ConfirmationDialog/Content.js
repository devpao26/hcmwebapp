/**
 * Dialog Content
 */
import styled, { keyframes } from 'styled-components';
import { media } from 'components/StyleUtils';

const scaleModal = keyframes`
  from, 25%, 50%, 75%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    transform-origin: 0 0;
  }

  0% {
    opacity: 0;
    transform: scale(.4) translate(-50%, -50%);
  }

  25% {
    transform: scale(1.06) translate(-50%, -50%);
  }

  50% {
    transform: scale(.9) translate(-50%, -50%);
  }

  75% {
    opacity: 1;
    transform: scale(1.03) translate(-50%, -50%);
  }

  to {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%);
  }
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 56%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: -1.4px -1.4px 23.5px 0.5px rgba(45, 44, 44, 0.52);
  width: 400px;
  text-align: left;
  overflow: hidden;
  z-index: 2;
  animation: ${scaleModal} .5s ease-in-out 1;

  .text-green {
    font-size: 1.2em;
  }

  ${media.tablet`
    left: 50%;
    width: 90%;
  `}
`;

export default Content;
