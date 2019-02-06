/**
 * Three Dots animation
 */
import React from 'react';
import styled, { keyframes } from 'styled-components';

const animateDot = keyframes`
  0% {
    opacity: .2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: .2;
  }
`;

const Wrapper = styled.span`
  b {
    font-weight: 400;
    font-size: 1.5em;
    animation: ${animateDot} 1.4s infinite ease-in-out both;

    &:nth-child(2) {
      animation-delay: .2s;
    }
    &:nth-child(3) {
      animation-delay: .4s;
    }
  }
`

class ThreeDotsAnimation extends React.PureComponent {
  render() {
    return (
      <Wrapper className="dot-indicator">
        <b>.</b>
        <b>.</b>
        <b>.</b>
      </Wrapper>
    );
  }
}

export default ThreeDotsAnimation;