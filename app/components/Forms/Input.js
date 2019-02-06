/*
 * Input tag
 */
import styled from 'styled-components';
import { BorderColor, BorderHoverColor, BorderActiveColor, RedColor, HighlightColor } from '../StyleUtils/Colors';

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

    &.error {
      border-bottom-color: ${RedColor};
    }
  }

  &[disabled]:not([type=checkbox]):not([type=radio]) {
    background-color: ${HighlightColor};
    border-bottom: 1px solid transparent;

    &:hover {
      border-bottom-color: transparent;
    }

    &:focus {
      border-bottom-color: transparent; 
    }

    &.error {
      border-bottom-color: transparent;
    }
  }
`;

export default Input;
