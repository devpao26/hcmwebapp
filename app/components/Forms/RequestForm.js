import styled from 'styled-components';
import { BorderColor } from 'components/StyleUtils/Colors';
import { media } from 'components/StyleUtils';

const RequestForm = styled.form`
  font-size: 12px;
  padding: 15px 0;

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

      .btn {
        display: inline-block;
        width: 43%;
        margin: 0 5px;
        border-radius: 2px;

        &:hover {
          opacity: .8;
        }
      }
    }

    .option-menu {
      position: relative;
      z-index: 9;
      font-size: 12px;
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
    }

    fieldset.first {
      padding-top: 10px;
    }
  `}
`;

export default RequestForm;
