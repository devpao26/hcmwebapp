import styled from 'styled-components';
import { BorderColor, RedColor, HighlightColor, ActiveColor } from 'components/StyleUtils/Colors';
import { media } from 'components/StyleUtils';

const RequestForm = styled.div`
  font-size: 13px;  
  height: 100%;
  background-color: #fff;
  box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.09);

  .required-textarea {
    border: 0.5px solid rgb(236, 95, 89);
  }
  .required-label {
    color: rgb(236, 95, 89);
  }
  .required-select {
    border-bottom: 1px solid rgb(236, 95, 89) !important;
  }
  .loading-cont {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(255,255,255,.5);
    z-index: 5;
  }
  .select-custom {
    width: 100%;
    border-bottom: 1px solid #d8d8d8;
    padding: 5px 0;
     select {
      position: relative;
      z-index: 2;
      padding-left: 5px;
      padding-right: 5px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border-radius: 0;
      min-width: 100%;
      cursor: pointer;
     }
    .arrow-down {
      float: right;
      position: relative;
      top: 15px;
    }
  }
  .half {
    display: inline-block;
    vertical-align: middle;
    width: 46%;
    border-bottom: 1px solid ${BorderColor};
    position: relative;
    margin: 0px 5px;

    &:hover {
      border-bottom-color: #888;
    }

    .fa {
      position: absolute;
      bottom: 10px;
      right: 2px;
    }

    &.error {
      border-bottom-color: ${RedColor};
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
  form {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 37px);
    width: 100%;
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
  .grid-wrapper {
    display: flex;
    flex-flow: nowrap;
    
    .cont {
      cursor: pointer;
    }
    .grid-6 {
      width: 49.98%;
      height: auto;
      box-shadow: 0px 8px 25.4px 1.6px rgba(0, 0, 0, 0.12);
      padding: 0px 10px 30px 10px;
      margin: 10px;
    }
  }
  .message {
    margin: 0 0 0;
    padding: 15px;
    text-align: center;
    flex: 0 1 100%;
  }
  .selected {
    border-bottom: 0.5px solid #e5e6eb;
    font-size: .9em;
  }
  fieldset {
    border: 0;
    label {
      display: block;
      font-size: .8em;
      color: #808489;

      span {
        color: ${RedColor};
      }
    }
    input {
      display: block;
      width: 100%;
      outline: 0;
      padding: 7px 3px;
      border-bottom: 1px solid #d8d8d8;
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
          font-size: .9em;
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
    .option-menu {
      position: relative;
      z-index: 9;
      font-size: 13px;
      display: inline-block;
    }
    .error-message {
      color: rgb(236, 95, 89);
    }
  }
  .center {
    vertical-align: middle;
    width: calc(100% - 0px);
    text-align: center;
    padding: 30px 0 30px;
    position: relative;
    bottom: -20px;

    button {
      display: inline-block;
      width: 20%;
      border-radius: 2px;
    }
  }
  .action_button {
    text-align: center;
    padding-top: 10px;
    padding-bottom: 15px;
    .btn {
      width: 130px;
      margin: 0 5px;
      display: inline-block;
      vertical-align: middle;
    }
  }
  ${media.tablet`
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
