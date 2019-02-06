import styled from 'styled-components';
import { RedColor, BorderColor } from '../StyleUtils/Colors';

const Form = styled.form`
  padding: 15px ;
  position: relative;
  font-size: 12px;

  .loading-cont {
    position: absolute !important;
  }

  .error {
    color: ${RedColor};
  }

  .line-break {
    margin: 10px 0 20px;
    height: 1px;
    background-color: ${BorderColor};
    border: 0;
  }

  .action-button,
  .action_button {
    padding: 10px 15px;
    text-align: center;

    .btn {
      display: inline-block;
      vertical-align: middle;
      width: 40%;
      margin: 0 7px;
    }
  }
`;

export default Form;
