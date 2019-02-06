import React from 'react';
import styled, { keyframes } from 'styled-components';
import { media } from 'components/StyleUtils';

const animate = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
  } 40% { 
    transform: scale(1.0);
  }
` 
const Wrapper = styled.div`
  margin: 20px auto 0;
  width: 50px;
  text-align: center;

  & > div {
    width: 33%;
    padding-top: 33%;
    background-color: #a0a0a0;

    border-radius: 100%;
    display: inline-block;
    animation: ${animate} 1.4s infinite ease-in-out both;
  }

  .bounce1 {
    animation-delay: -0.32s;
  }

  .bounce2 {
    animation-delay: -0.16s;
  }

  ${ media.tablet `
    margin: 20px 0 0 48%;
  `}
`

const LoadingIndicator = () => (
  <Wrapper className="loading">
    <div className="bounce1"></div>
    <div className="bounce2"></div>
    <div className="bounce3"></div>
  </Wrapper>
);

export default LoadingIndicator;
