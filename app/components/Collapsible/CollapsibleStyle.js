import styled from 'styled-components';
import { BoxShadow, BorderColor } from '../StyleUtils/Colors';

const Wrapper = styled.div`
  font-size: 12px;
  margin-bottom: 15px;
  box-shadow: ${BoxShadow};

  .toggle {
    display: block;
    width: 100%;
    text-align: left;
    text-transform: uppercase;
    position: relative;
    font-weight: 500;
    padding: 5px 10px;
    cursor: pointer;

    span,
    .fa-caret-up,
    .fa-cube {
      display: inline-block;
      vertical-align: middle;
    }

    .fa-caret-up {
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -7px;
      font-size: 1.175em;
      transform: rotate(180deg);
      will-change: transform;
      transition: transform .2s ease-out;
    }

    .fa-cube {
      font-size: 2.5em;
      margin-right: 10px;
    }
  }

  &.active {
    .toggle {
      border-bottom: 1px solid ${BorderColor};
      margin-bottom: 10px;

      .fa-caret-up {
        transform: rotate(0);
      }
    }
  }

  .content {
    padding: 0 15px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .2s ease-out;

    p {
      margin: 0 0 10px;
    }
  }
`;

export default Wrapper;
