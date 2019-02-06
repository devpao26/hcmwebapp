import styled from 'styled-components';
import { RedColor, BorderColor, BorderHoverColor } from 'components/StyleUtils/Colors';

const Form = styled.form`
  padding: 15px;
  font-size: 13px;
  position: relative;

  .loading-cont {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255,255,255,.5);
    z-index: 10;
  }

  .error-msg {
    display: block;
    font-size: .85em;
    color: ${RedColor};
    font-style: italic;
  }

  .fields {
    margin-bottom: 13px;

    label {
      color: #646970;
      font-size: .8em;
      display: block;
    }

    input,
    textarea {
      width: 100%;
      display: block;
      padding: 3px 5px;

      &:hover {
        border-color: ${BorderHoverColor};
      }
    }

    input {
      border-bottom: 1px solid ${BorderColor};
    }

    textarea {
      border: 1px solid ${BorderColor};
      height: 80px;
      resize: none;
    }

    .custom-select {
      display: inline-block;
      width: 40px;
      margin-right: 5px;
    }
  }

  .action-button {
    padding: 5px;
    text-align: center;

    .error-msg {
      margin-bottom: 5px;
    }

    .btn {
      width: 30%;
      margin: 0 3px;
      display: inline-block;
    }
  }

  .date-filter {
    background-color: red !important;
  }
`;

export default Form;
