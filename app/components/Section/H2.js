import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const H2 = styled.h2`
  margin: 0 0 0;
  background: #2b3131;
  color: #fff;
  padding: 8px 15px;
  font-size: 1.25em;
  font-weight: 400;
  border-radius: 2px 2px 0 0;
  box-shadow: 0 3px 8px 2px rgba(0, 0, 0, 0.12);
  position: relative;

  & + [class*="Grid__"] {
    min-height: calc(100% - 38px);
  }

  span {
    float: right;
  }

  .fa-caret-down {
    display: none;
    position: absolute;
    right: 5px;
    top: 7px;
    cursor: pointer;
    outline: 0;
    border: 0;
    font-size: 1.4em;
    transform: rotate(-90deg);
    transition: transform .2s ease-in-out;
  }

  &:after {
    clear: both;
    content: '';
    display: table;
  }

  ${media.tablet `
    .fa-caret-down {
      display: block;
    }
  `}
`;

export default H2;