import styled from 'styled-components';
import { BorderColor } from 'components/StyleUtils/Colors';

const RequestForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  font-size: 13px;
  height: auto;

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
  .btn-holidays {
    float: right;
    background-color: #ec5f59;
    box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.3);
    color: #fff;
    padding: 5px 6px;
    border-radius: 10px;
    cursor: pointer;
  }
  .templateName {
    background: #fbfcfe;
    padding: 20px 10px;
    border-top: 1px solid #dadcea;
    .leftTemplate {
      button {
        color: #2abb9c;
        i {
          font-size: 10px;
        }
      }
    }
    .rightTemplate {
      float: right;
    }
  }
  fieldset {
      border: 0;
      padding: 0 15px;
      font-size: 14px;
  }
  .head {
      display: block;
      font-size: .8em;
      color: #808489;
      width: 100%;
      padding: 5px 8px;
      border: 0;
  }
  .fields {
      display: block;
      min-width: 95%;
      outline: 0;
      padding: 7px 3px;
      font-size: 1em;
      border-bottom: 1px solid ${BorderColor};
      position: relative;
      color: #2b3131;
  }
  select {
      position: relative;
      width: 80%;
      cursor: pointer;
      outline: none;
  }
  .dropdown {
    float: right;
    position: relative;
    bottom: 25px;
    right: 0px;
    button {
        border: 0;
        cursor: pointer;
    }
  }
  .fa-caret-down {
      color: #7f848b;
  }
  .time-half {
      display: inline-block;
      min-width: 49%;
      margin-left: 1%;
      padding: 0;
      label {
          border: 0;
      }
  }
  .half {
      display: inline-block;
      min-width: 41%;
      margin-left: 2%;
      padding: 0;
      
      span {
          display: flex;
          i {
              align-self: center;
              position: relative;
              right: 15px;
              font-size: 10px;
              color: #2abb9c;
          }
      }
  }   
`;

export default RequestForm;