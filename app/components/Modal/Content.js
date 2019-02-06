/**
 * Dialog Content
 */
import styled, { keyframes } from 'styled-components';
import { media } from 'components/StyleUtils';

const scaleModal = keyframes`
  from, 0%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    transform-origin: 0 0;
  }

  0% {
    opacity: 0;
    transform: scale(.5) translate(-50%, -50%);
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
  width: ${(props) => props.width ? props.width : '600px'};
  text-align: left;
  z-index: 2;
  animation: ${scaleModal} .3s ease-in;
  .section-half {
    display: flex;
  }
  ${media.tablet`
    left: 50%;
    max-width: 95%;
  `}
`;

export default Content;
