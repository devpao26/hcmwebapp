import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  // Include padding and border in the element's total width and height 
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    background: #fff;
    font-family: Helvetica, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    line-height: 1.4;
    color: #2b3131;
    min-width: 320px;

    /* Font Smoothing */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body.fontLoaded {
    font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.no-scroll {
    position: fixed !important;
    overflow-y: scroll !important;
    width: 100%;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  a:hover {
    opacity: .8;
  }

  /* Remove outline for button, input, textarea and select tags */
  button,
  input,
  select,
  textarea {
    outline: 0;
    font-family: inherit;
  }

  /* Self Clear Children Elements */
  .clearfix:after {
    display: block;
    content: "";
    clear: both;
  }

  /* Text Alignment */
  .text-center {
    text-align: center;
  }

  /* Global Font color */
  .text-green {
    color: #2abb9c;
  }

  .text-red {
    color: #ff0000;
  }
`;
