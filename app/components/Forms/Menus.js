import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Menus = styled.div`
  padding: 20px 20px 10px;
  text-align: center;
  font-size: 12px;

  .fa-copy {
    font-size: 2em;
    color: #4875a3;
    margin-right: 10px;
  }

  .count {
    color: #0bd38a;
    font-weight: 400;
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
  }

  .label {
    position: relative;
    margin: 0 0 0;
    width: 100%;
    cursor: pointer;
    display: none;

    .fa-caret-down {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }

    .fa-copy,
    span,
    .count {
      display: inline-block;
      vertical-align: middle;
      line-height: 1;
    }

    .count {
      position: static;
      transform: none;
      margin-left: 3px;
    }
  }

  button {
    position: relative;
    width: 18%;
    min-width: 193px;
    display: inline-block;
    vertical-align: middle;
    box-shadow: 0 5px 15px 1px rgba(0,0,0,.1);
    margin: 0 10px 25px;
    text-align: left;
    padding: 10px;
    cursor: pointer;
    border-radius: 2px;
    border: 1px solid transparent;

    &:hover,
    &.active {
      border-color: #000;
    }

    .fa,
    span,
    .count {
      display: inline-block;
      vertical-align: middle;
      line-height: 1;
    }

    span {
      width: calc(100% - 40px);
      line-height: 1.2;
    }
  }

  ${media.tablet`
    display: block;
    margin: 15px;
    box-shadow: 0 5px 15px 1px rgba(0,0,0,.1);
    border-radius: 1px;
    border: 1px solid transparent;
    max-height: 43px;
    transition: all .2s ease-in-out;
    overflow: hidden;
    padding: 0 0 0;
    text-align: left;

    .fa-copy {
      font-size: 1.7em;
      margin-top: -2px;
    }

    .label {
      display: block;
      padding: 11px 10px;
    }

    button {
      width: 100%;
      display: block;
      box-shadow: none;
      margin: 0 0 0;
      padding: 5px 5px 5px 30px;

      .fa-copy {
        display: none;
      }

      &:hover,
      &.active {
        border-color: transparent;
        background-color: #f8f7fc;
      }
    }

    &.show {
      border-color: #000;
      max-height: 600px;
    }
  `}
`;

export default Menus;
