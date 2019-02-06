import styled from 'styled-components';
import { ActiveColor, RedColor, BorderColor, BoxShadow } from '../StyleUtils/Colors';

const Wrapper = styled.div`
  padding: 10px 0;
  /* TODO: enable this to change the display if only the dynamic display is fixed
  position: fixed;
  top: 50%;
  left: 210px;
  width: 400px;
  z-index: 99999;
  transform: translateY(-50%);
  padding: 0 0 10px 0;
  box-shadow: ${BoxShadow};
  background-color: #fff;
  font-size: 13px;

  h2 {
    margin-bottom: 10px;
  }

  &:before,
  &:after {
    content: '';
    display: block;
    width: 0; 
    height: 0; 
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent; 
    border-right: 7px solid #fff; 
    position: absolute;
    top: 33%;
  }
  &:before {
    border-right-color: #ccc;
    left: -8px;
  }
  &:after {
    border-right-color: #fff;
    left: -7px;
  } */

  .filters {
    margin-bottom: 15px;
    padding: 0 10px;

    button {
      font-size: .75em;
      border-radius: 2px;
      display: inline-block;
      vertical-align: middle;
      text-transform: uppercase;
      margin-right: 7px;
      padding: 2px 5px;
      cursor: pointer;
      user-select: none;
      will-change: opacity;
      transition: all .2s ease-in-out;

      &.active,
      &:hover {
        background-color: ${ActiveColor};
        color: #fff;
      }
    }
  }

  .message {
    padding: 20px 10px;
    text-align: center;
  }

  .notif-list {
    list-style: none;
    margin: 0 0 0;
    padding: 0 0 0;
    overflow-y: auto;
    max-height: 65vh;

    li {
      padding: 10px 10px 10px 25px;
      position: relative;
      display: block;
      border-bottom: 1px solid ${BorderColor};
      transition: background-color .1s ease-in-out;

      &.unread {
        background-color: #f1f1f1;
      }

      .item-loading {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        background-color: rgba(255,255,255,.5);
        display: none;
      }

      .status {
        position: absolute;
        top: 15px;
        left: 7px;
      }

      .time {
        font-size: .8em;
        position: absolute;
        top: 10px;
        right: 10px;
      }

      h3,
      h4 {
        margin: 0 0 0;
        font-weight: 500;
        font-size: 1em;
        width: calc(100% - 75px);
        white-space: pre-line;
      }

      h3 {
        min-height: 35px;
      }

      .details {
        margin: 0 0 5px;
        font-size: .9em;
        white-space: pre-line;
        overflow: hidden;
        max-height: 0;
        transition: max-height .2s ease-in-out;

        span {
          display: block;

          a {
            display: inline-block;
            color: inherit;
            text-decoration: none;
            color: ${ActiveColor};
            text-decoration: underline;

            &:before {
              content: ',';
              display: inline-block;
              margin-right: 5px;
            }

            &:first-child::before {
              display: none;
            }
          }
        }
      }
    }

    .action {
      font-size: .8em;

      a,
      .buttons {
        display: inline-block;
        vertical-align: middle;
        transition: all .2s ease-in-out;
        will-change: opacity;
        cursor: pointer;
      }

      a {
        margin-top: -2px;
        color: ${ActiveColor};
        text-decoration: none;
        border-bottom: 1px solid ${ActiveColor};

        &:hover {
          border-bottom-color: transparent;
        }
      }

      .buttons {
        margin: 0 0 0;
        width: 100%;
        text-align: right;

        button {
          text-align: center;
          display: inline-block;
          vertical-align: middle;
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.24);
          color: #fff;
          padding: 7px 10px;
          line-height: 1;
          width: 80px;
          margin-left: 10px;
          cursor: pointer;
          user-select: none;
          text-transform: uppercase;

          &:hover {
            opacity: .75;
          }

          &.btn-approve {
            background-color: ${ActiveColor};
          }

          &.btn-reject {
            background-color: ${RedColor};
          }
        }
      }

      a ~ .buttons {
        width: calc(100% - 70px);
      }
    }
  }

  .pagination {
    padding: 15px 10px 5px;
  }
`;

export default Wrapper;
