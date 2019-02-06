import { css } from 'styled-components';

const buttonStyles = css`
  display: block;
  width: 100%;
  text-align: center;
  border-radius: 2px;
  text-decoration: none;
  border: none;
  color: white;
  padding: 12px 10px;
  font-size: 1em;
  line-height: 1;
  cursor: pointer;
  outline: 0;
  position: relative;
  user-select: none;

  &:hover {
    opacity: .8;
  }
`;

export default buttonStyles;
