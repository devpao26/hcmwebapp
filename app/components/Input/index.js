/*
 * Input tag
 */
import styled from 'styled-components';
import { BorderColor, BorderHoverColor, BorderActiveColor } from '../StyleUtils/Colors';

const Input = styled.input`
  &:not([type=checkbox]):not([type=radio]) {
    display: block;
    width: 100%;
    border: 0;
    border-bottom: 1px solid ${BorderColor};
    padding: 5px 5px;
    outline: 0;

    &:hover {
      border-bottom-color: ${BorderHoverColor};
    }

    &:focus {
      border-bottom-color: ${BorderActiveColor}; 
    }
  }
`;

export default Input;
