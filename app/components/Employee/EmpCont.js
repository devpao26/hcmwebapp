import styled from 'styled-components';
import { BorderColor } from 'components/StyleUtils/Colors';

const EmpCont = styled.div`
  clear: both;
  font-size: 14px;
  position: relative;
  max-height: 420px;
  padding: 10px 0px 5px 5px;
  margin: 15px 0px;

  .add-emp {
    position: absolute;
    top: -2px;
    right: 0;
    font-size: .6em;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: #ec5f59;
    box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.3);
    color: #fff;
    cursor: pointer;

    &:hover {
      opacity: .8;
    }
  }

  h3 {
    margin: 0 0;
    padding-right: 25px;
    font-size: .8em;
    font-weight: 400;
  }

  dl {
    display: block;
    border-bottom: 1px solid ${BorderColor};
    padding-top: 15px;
    padding-bottom: 15px;
    margin: 0 0;

    &:first-child {
      padding-top: 5px;
    }

    &:last-child {
      border-bottom: 0;
      padding-bottom: 0;
    }
  }

  dt,
  dd {
    display: inline-block;
    vertical-align: middle;
    margin: 0 0 0;
  }

  dt {
    .user-avatar {
      width: 40px;
      height: 40px;
      background-color: #a8a8a8;
    }
  }

  dd {
    width: calc(100% - 40px);
    padding-left: 10px;

    p,
    .option-menu {
      display: inline-block;
      vertical-align: middle;
    }

    p {
      width: calc(100% - 20px);
      margin: 0 0 0;

      span {
        display: block;
        color: #fc7f7f;
        font-size: .8em;
      }
    }
    .option-menu {
      z-index: 9;
      font-size: .9em;
      position: relative;
    }
  }
`;

export default EmpCont;
