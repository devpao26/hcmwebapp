import styled from 'styled-components';
import { BorderColor } from 'components/StyleUtils/Colors';

const List = styled.div`
  margin: 0 0 10px;
  padding: 0 7px 0;
  font-size: 12px;

  ul {
    max-height: 420px;
    overflow-y: auto;
    overflow-x: none;
    margin: 0 0 0;
    padding: 0 0 0;
  }

  li {
    border-bottom: 1px solid ${BorderColor};
    display: block;
    margin: 0 0 0;

    &:last-child {
      border-bottom: 0;
    }

    .message {
      text-align: center;
      padding: 15px;
    }

    /* div:not(.loading) {
      cursor: pointer;
      padding: 12px 7px;

      &:hover,
      &.active {
        background-color: #fbfcfe;
      }
    } */
  }
`;

export default List;
