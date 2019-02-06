import { css } from 'styled-components';

const Button = css`
  outline: 0;
  border: 0;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  vertical-align: middle;
  background-color: ${props => props.color ? '#ff5252' : '#7e848c'};
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.24);
  color: #fff;
  padding: 7px 20px;
  font-size: 14px;
  line-height: 1;
  min-width: 95px;
  margin: 0 7px;
  cursor: pointer;
  user-select: none;

  &:hover {
    opacity: .8;
  }
`;

export default Button;