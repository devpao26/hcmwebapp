import styled from 'styled-components';
import { BorderColor, RedColor } from 'components/StyleUtils/Colors';
import { media } from 'components/StyleUtils';

const RequestForm = styled.div`
  font-size: 13px;  
  height: 100%;
  background-color: #fff;
  box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.09);
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
    min-width: 264px;
    cursor: pointer;
   }
  .arrow-down {
    float: right;
    position: relative;
    top: 10px;
  }
}
  .space-around {
    padding: 2px;
    margin: 0; 
  }
    .right {
        text-align: right;
        padding: 20px 0 0;

        button {
        width: 45%;
        border-radius: 2px;
        margin: 0px 6px;
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
  div.grid-wrapper {
    display: flex;
    flex-flow: nowrap;
    
    .grid-5, .grid-7, .grid-6 {
      box-shadow: 0px 8px 25.4px 1.6px rgba(0, 0, 0, 0.12);
      padding: 0px 10px 30px 10px;
      margin: 10px;
    }
    .grid-1 {
      width: 8.33%;
    }
    .grid-6 {
        width: 49.98%;
        height: auto;
    }
    .grid-5 {
      width: 41.65%;
      height: 240px;
      .hide {
        visibility: hidden;
        padding: 0px;
      }
      .border-bottom {
        border-bottom: 1px solid #d8d8d8;
      }
    }
    .grid-7 {
      width: 58.31%;
      height: 240px;
      .search-filter {
        width: 100%;
      }
    }
    .cont {
      cursor: pointer;
      &:hover {
        background: #f1f2f3;
        transition: all 0.2s ease-in;
      }
    }
    .wg-template {
      max-height: 170px;
      overflow: auto;
      .cont {
        border-bottom: 1px solid ${BorderColor};
        padding: 15px 5px;
        cursor: pointer;  
        .option-menu {
          float: right;
        }
      }
    }
  }
  .wg-active {
    background: #f1f2f3;
    cursor: pointer;
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
    .required-textarea {
        border: 0.5px solid rgb(236, 95, 89);
    }
    .required-label {
        color: rgb(236, 95, 89);
    }
    .required-select {
        border-bottom: 1px solid rgb(236, 95, 89) !important;
    }
  }
  .right {
    vertical-align: middle;
    width: calc(100% - 0px);
    text-align: right;
    padding: 30px 0 30px;
    position: relative;
    bottom: -20px;

    button {
      display: inline-block;
      width: 20%;
      border-radius: 2px;
    }
  }
  ${media.tablet`
    transition: all 1s ease-in-out;
    overflow: auto;
    padding: 15px;
    div.grid-wrapper {
      display: flex;
      flex-flow: column wrap;
      margin: 10px 0px !important;
      .grid-6, .grid-7 {
        width: 100%;
      }
    }
    div.right {
      text-align: center;
    }
    .select-custom .arrow-down {
      float: left;
      position: relative;
      top: 5px;
      left: 265px;
    }
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
