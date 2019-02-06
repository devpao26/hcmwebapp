import styled, { keyframes } from 'styled-components';
import { media } from '../StyleUtils';

const growShrink = keyframes`
  50% {
    opacity: .9
  }
`;

const jiggle = keyframes`
  0% {
    transform: translateX(-1px);
  }
  25% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(1px);
  }
  75% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-1px);
  }
`;

const PageLoading = styled.div`
  height: 100%;
  padding-top: 10%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  text-align: center;

  .rocket,
  .loading-text {
    display: inline-block;
    vertical-align: middle;
  }

  .rocket {
    width: 400px;
    position: relative;

    svg {
      padding: 0 10px;
    }

    &__circle {
      fill: #343434;
    }

    &__cloud {
      fill: #eef3f6;
      animation: ${growShrink} 10s ease-in-out infinite;
    }

    &__ship {
      fill: #000;
      animation: ${jiggle} .5s ease-in-out infinite;
    }

    &__lines {
      opacity: .7;
      animation: ${jiggle} .2s ease-in-out reverse infinite;
      fill: #f1f1f1;
    }
  }

  .loading-text {
    width: 55%;
    text-align: left;
    padding-left: 50px;

    h1 {
      margin: 0 0 0;
      font-weight: 400;
      font-size: 3em;
      line-height: 1.2;
    }

    p {
      margin: 0 0 0;
      font-size: 1.5em;
    }
  }

  ${media.handheldLandscape`
    padding-top: 20px;

    .rocket,
    .loading-text {
      display: block;
    }

    .rocket {
      width: 320px;
      margin: 0 auto;
      padding: 0 30px;
    }

    .loading-text {
      width: 100%;
      padding: 20px;
      font-size: .7em;
    }
  `}
`;

export default PageLoading;
