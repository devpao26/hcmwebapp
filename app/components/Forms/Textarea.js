/**
 * Textarea default styles
 */
import styled from 'styled-components';
import { BorderColor, BorderHoverColor, BorderActiveColor, RedColor } from '../StyleUtils/Colors';

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  border: 1px solid ${BorderColor};
  padding: 4px 6px;
  outline: 0;
  resize: none;
  height: ${(props) => props.height ? props.height : '150px'};

  &:hover {
    border-color: ${BorderHoverColor};
  }

  &:focus {
    border-color: ${BorderActiveColor}; 
  }

  &.error {
    border-color: ${RedColor};
  }
`;

export default Textarea;
