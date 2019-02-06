import styled from 'styled-components';
import { BorderColor, RedColor } from 'components/StyleUtils/Colors';
import { media } from 'components/StyleUtils';

const RequestForm = styled.div`
  font-size: 13px;  
  height: 100%;
  background-color: #fff;
  box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.09);

  form {
    position: relative;
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 37px);

    .sending {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255,255,255,.5);
      z-index: 10;
    }
  }

  .message {
    margin: 0 0 0;
    padding: 15px;
    text-align: center;
    flex: 0 1 100%;
  }

  .error-msg {
    font-size: .9em;
    color: ${RedColor};
    padding: 0 15px;
    text-align: left;
  }

  fieldset {
    border: 0;
    padding: 0 15px;
    margin: 0 0 15px;

    label {
      display: block;
      font-size: .8em;
      color: #808489;

      span {
        color: ${RedColor};
      }
    }

    .middle {
      display: inline-block;
      vertical-align: middle;
      width: 8%;
      text-align: center;
    }

    .half {
      display: inline-block;
      vertical-align: middle;
      width: 46%;
      border-bottom: 1px solid ${BorderColor};
      position: relative;

      &:hover {
        border-bottom-color: #888;
      }

      .fa {
        position: absolute;
        top: 9px;
        right: 2px;
      }

      &.error {
        border-bottom-color: ${RedColor};
      }

    }
    .react-datepicker-wrapper,
    .react-datepicker__input-container {
      display: block;
    }

    .leave-type {
      font-size: 1em;
      border-bottom: 1px solid ${BorderColor};
      position: relative;
      color: #2b3131;

      &:hover {
        border-bottom-color: #888;
      }

      span {
        display: inline-block;
        width: calc(100% - 18px);
      }

      &.error {
        border-bottom-color: ${RedColor};
      }
    }

    input {
      display: block;
      width: 100%;
      outline: 0;
      padding: 7px 3px;
    }

    textarea {
      display: block;
      width: 100%;
      min-height: 150px;
      padding: 7px 5px;
      border: 1px solid ${BorderColor};
      resize: none;

      &:hover {
        border-color: #888;
      }

      &.error {
        border-color: ${RedColor};
      }
    }

    .attach {
      font-size: 1em;
      border-bottom: 1px solid ${BorderColor};
      position: relative;
      color: #2b3131;
      cursor: pointer;

      &:hover {
        border-bottom-color: #888;
      }

      span {
        display: inline-block;
        vertical-align: middle;
        width: calc(100% - 20px);
        text-align: left;

        b {
          font-weight: 400;
          font-size: .8em;
          line-height: 1;
          display: inline-block;
          margin-right: 2px;
          background-color: #d8d8d8;
          border-radius: 6px;
          padding: 3px 5px 2px;
        }
      }

      .fa-paperclip {
        vertical-align: middle;
        padding: 2px;
        font-size: 1.5em;
      }

      input {
        display: none;
      }
    }

    &.center {
      text-align: center;
      padding: 20px 0 0;

      button {
        width: 45%;
        border-radius: 2px;
      }
    }

    .option-menu {
      position: relative;
      z-index: 9;
      font-size: 11px;
      display: inline-block;
    }
  }

  ${media.tablet`
    max-height: 37px;
    transition: all 1s ease-in-out;
    overflow: hidden;

    &.toggle {
      max-height: none;
      overflow: auto;
      transition: all .5s ease-in-out;

      h2 .fa-caret-down {
        transform: rotate(0deg);
      }
    }

    fieldset.first {
      padding-top: 10px;
    }
  `}
`;

export default RequestForm;
