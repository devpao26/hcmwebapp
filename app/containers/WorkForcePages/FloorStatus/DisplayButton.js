import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const DisplayButton = styled.div`
  position: absolute;
  top: 7px;
  right: 5px;
  font-size: 1.1em;

  button {
    outline: 0;
    cursor: pointer;

    &.active {
      color: #2abb9c;
    }
  }

  ${ media.tablet `
    margin-right: 20px;
  `}
`;

export default DisplayButton;