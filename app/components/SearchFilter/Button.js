import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Button = styled.button`
  display: inline-block;
  font-size: 11px;
  color: #2abb9c;
  line-height: 0;
  padding: 8px 4px;
  border-radius: 2px;
  cursor: pointer;
  margin-left: 3px;
  text-transform: uppercase;
  outline: 0;
  border: 0;
  .button-emp {
    margin: 0px 7px;
  }
  &:hover,
  &.active {
    background-color: #2abb9c;
    color: #fff;
  }

  .fa {
    line-height: 0;
    width: auto;
  }

  ${media.tablet`
    margin: 0 2px;
  `}
`;

export default Button;
