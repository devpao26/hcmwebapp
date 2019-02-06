import styled from 'styled-components';
import { BorderColor, BorderHoverColor, BorderActiveColor, RedColor } from '../StyleUtils/Colors';

const Login = styled.form`
  display: block;
  margin: 0 0 0;
  padding: 15px;
  position: relative;
  font-size: 12px;

  .error {
    color: ${RedColor};
    font-style: italic;
  }

  h4 {
    margin: 0 0 15px;
    font-weight: 400;
    font-size: 1.1em;
  }

  p {
    margin: 0 0 15px;
    position: relative;

    .svg-inline--fa {
      position: absolute;
      left: 0;
      top: 7px;
      font-size: 1.4em;
      color: #8f8f8f;
    }

    input {
      display: block;
      width: 100%;
      padding: 7px 10px 7px 25px;
      border-bottom: 1px solid ${BorderColor};

      &:not([disabled]):hover {
        border-bottom-color: ${BorderHoverColor};
      }

      &:not([disabled]):focus {
        border-bottom-color: ${BorderActiveColor};
      }
    }

    .error {
      font-size: .9em;
    }
  }

  .action_button {
    padding-top: 15px;
    text-align: center;

    .btn {
      display: inline-block;
      vertical-align: middle;
      width: 43%;
      margin: 0 7px;
    }
  }
`;

export default Login;
