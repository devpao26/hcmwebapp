import styled from 'styled-components';
import { media } from 'components/StyleUtils';
import { RedColor } from 'components/StyleUtils/Colors';

const PayrollForm = styled.form`
  padding: 15px;
  font-size: 13px;
  position: relative;

  .loading-cont {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(255,255,255,.5);
    z-index: 5;
  }

  .error-msg {
    font-size: .9em;
    font-style: italic;
    color: ${RedColor};
  }

  .waive {
    padding-left: 1px;
    display: block;
    position: absolute;
    top: 13px;
    right: 15px;
  }

  .fields {
    margin: 0 0 15px;

    .title {
      display: block;
      color: #646970;
      font-size: .8em;
    }

    input[type="text"],
    input[type="number"],
    select {
      display: block;
      border-bottom: 1px solid #edeef1;
      padding: 3px 5px;
      width: 50%;
      border-radius: 0;
      background: none;
      outline: 0;

      &.error {
        border-bottom-color: ${RedColor};
      }
    }

    textarea {
      border: 1px solid #edeef1;
      padding: 3px 5px;
      width: 100%;
      height: 100px;
      resize: none;

      &.error {
        border-bottom-color: ${RedColor};
      }
    }

    .radio-group {
      display: inline-block;
      margin-right: 10px;

      &.error {
        color: ${RedColor};
      }

      input {
        display: none;
      }

      span:before {
        display: inline-block;
        vertical-align: middle;
        margin-top: -2px;
        margin-right: 2px;
        content: '';
        width: 7px;
        height: 7px;
        border: 1px solid #9b9e9e;
        border-radius: 7px;
      }

      input:checked + span:before {
        background-color: #00bf9a;
      }
    }
  }

  .react-datepicker-wrapper {
    width: 50%;

    .react-datepicker__input-container {
      display: block;
      input {
        width: 100%;
      }
    }
  }

  .action-button {
    text-align: center;
    padding-top: 5px;

    .btn {
      display: inline-block;
      vertical-align: middle;
      width: 43%;
      margin: 0 3px;

      &:hover {
        opacity: .8;
      }
    }
  }

  ${media.tablet`
    .fields {
      input[type="text"],
      select,
      .react-datepicker-wrapper {
        width: 100%;
      }
    }

    .action-button {
      .btn {
        width: 47%;
      }
    }
  `}
`;

export default PayrollForm;
