import styled from 'styled-components';
import { media } from '../StyleUtils';
import { BorderColor, HighlightColor, ActiveColor } from '../StyleUtils/Colors';

const Container = styled.div`
  clear: both;
  font-size: 12px;
  position: relative;
  min-height: 200px;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 5px;
  cursor: pointer;
  .approved-list {
    border-bottom: 1px solid ${BorderColor};
    p {
      font-size: 1.1em;
      font-weight: 700;
      margin: 5px 0;
    }
    span {
      font-size: .9em;
      color: #0c131d;
    }
    &:hover {
      background: #f1f2f3;
      cursor: pointer;
    }
  }
  dl {
    display: block;
    border-bottom: 1px solid ${BorderColor};
    padding-top: 10px;
    padding-bottom: 10px;
    margin: 0 0 0;
    position: relative;

    &.enrolled-list .option-menu {
      z-index: 9;
      font-size: .9em;
      position: relative;
      float: right;
      top: -30px;
    }

    &[role="presentation"] {
      cursor: pointer;
    }

    span[role="presentation"] {
      cursor: pointer;
      display: block;
    }

    &.active {
      background-color: ${HighlightColor};
    }

    &:last-child {
      border-bottom: 0;
    }

    &.message {
      text-align: center;
      padding-top: 20px;
    }

    .fa-check-circle {
      color: ${ActiveColor};
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      display: none;
      font-size: 1.275em;
    }

    &.enrolled-list {
      .fa-check-circle {
        right: 19px;
      }
    }

    &.selected,
    &.active {
      .fa-check-circle {
        display: block;
      }
    }
  }

  dt,
  dd {
    display: inline-block;
    vertical-align: middle;
    margin: 0 0 0;
  }

  dt {
    position: relative;
    width: 45px;

    .user-avatar {
      display: block;
      vertical-align: middle;
    }

    .user-avatar {
      /* margin-left: 5px; */
      width: 40px;
      height: 40px;
      background-color: #a8a8a8;
    }
  }

  dt + dd {
    width: calc(100% - 45px);
  }

  dd {
    width: 100%;
    /* padding-left: 5px; */

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
        font-size: .9em;

        .fa-users {
          color: #2b3131;
          font-size: 1.1em;
        }
      }
    }

    .option-menu {
      z-index: 9;
      font-size: .9em;
      position: relative;
    }

    h4 {
      font-size: 1.1em;
      font-weight: 400;
      margin: 0 0 0;
      padding: 5px 0;
    }
  }
  .cont {
    &:hover {
      background: #f1f2f3;
      cursor: pointer;
    }
  }
  .no-results-found {
    text-align: center;
    font-size: 1em;
    margin: 50px;
  }
  ${media.tablet`
    padding: 0 0 5px;
  `}
`;

export default Container;
