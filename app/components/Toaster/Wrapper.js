import styled from 'styled-components';
import { BoxShadow, RedColor, ActiveColor } from '../StyleUtils/Colors';

const Wrapper = styled.div`
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 9999999;
  font-size: 12px;
  background-color: #eff3f6;
  padding: 10px;
  box-shadow: ${BoxShadow};
  min-width: 250px;
  transform: translateX(120%);
  transition: transform .3s ease-in-out, opacity .2s ease-in-out;
  will-change: transform;
  opacity: 0;

  &.show {
    opacity: 1;
    transform: translateX(0);
  }

  .close {
    position: absolute;
    top: 2px;
    right: 3px;
    font-size: .9em;
    padding: 2px;
    cursor: pointer;
  }

  p {
    margin: 0 0 0;

    .fa-exclamation-circle,
    span {
      display: inline-block;
      vertical-align: top;
    }

    span {
      width: calc(100% - 15px);
      padding-left: 5px;
      word-wrap: pre-line;
    }
    
    .svg-inline--fa {
      font-size: 1.1em;
      margin-top: 1px;
    }
    .fa-exclamation-circle {
      color: ${RedColor};
    }
    .fa-bell {
      color: ${ActiveColor};
    }
  }
`;

export default Wrapper;
