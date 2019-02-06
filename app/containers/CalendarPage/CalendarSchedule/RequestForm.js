import styled from 'styled-components';
import { BorderColor } from 'components/StyleUtils/Colors';

const RequestForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.09);
  height: auto;
  padding-top: 10px;

  fieldset {
    border: 0;
    padding: 0 15px;
    margin: 0 0 15px;

    label {
      display: block;
      font-size: .8em;
      color: #808489;
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
    }

    .react-datepicker-wrapper,
    .react-datepicker__input-container {
      display: block;
    }

    .time-zone {
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
    }

    input {
      display: block;
      width: 100%;
      outline: 0;
      padding: 7px 3px;

      font-size: 1em;
      border-bottom: 1px solid ${BorderColor};
      position: relative;
      color: #2b3131;
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
        min-height: 31px;
        line-height: 31px;
        display: block;
        width: 93%;
        text-align: left;
      }

      .fa {
        position: absolute;
        top: 6px;
        right: 5px;
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
  }
  .dropdown {
      float: right;
      position: relative;
      bottom: 25px;
  }
  .bgCont {
      background-color: #7f848b;
      width: 155px;
      border-radius: 2px;
      color: #fff;
      dl {
        padding: 5px !important;
        .user-avatar {
          width: 30px;
          height: 30px;
        }
      }
      dd {
        p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          width: auto;
          button {
            color: #fff;
          }
        }
      }
      button {
          position: relative;
          left: 20px;
          font-size: 12px;
          cursor: pointer;
      }
  }
  hr {
    border: 0.5px solid #d3d6db;
  }
  .addRecipient {
    font-size: .6em;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    padding: 2px;
    background-color: #ec5f59;
    box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 9px;
    cursor: pointer;
    float: right;
    position: relative;
    bottom: 30px;
    right: 0;
    left: 0;
  }
  .sched-type {
    font-size: 1em;
    border-bottom: 1px solid ${BorderColor};
    position: relative;
    color: #2b3131;
    height: 25px;
    .option-menu {
      position: relative;
      float: right;
      font-size: 11px;
      margin: 5px;
      z-index: 1;
    }
  }
`;

export default RequestForm;
