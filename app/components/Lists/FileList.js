/*
 * File List
 *
 */
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  margin: 0 0 0;
  padding: 0 0 0;
  font-size: 12px;

  li {
    width: 100%;
    background-color: #fbfcfe;
    box-shadow: 0 3px 10px 1px rgba(0, 0, 0, 0.12);
    margin: 20px 0;
    padding: 10px 10%;

    p {
      margin: 0 0 0;
      display: inline-block;
      vertical-align: middle;
      padding: 0 10px;
      width: 36%;

      a {
        color: #2abb9c;
        font-size: .7em;
      }

      .svg-inline--fa {
        font-size: 2em;
        color: #b3bcc7;
        display: inline-block;
      }

      span {
        font-size: .7em;
        color: #b3bcc7;
        display: block;
      }

      button {
        outline: 0;
        cursor: pointer;

        &:hover {
          opacity: .8;
        }
      }
    }

    p:first-child {
      width: 70px;
      text-align: center;
    }

    p:last-child {
      width: 60px;

      .svg-inline--fa {
        font-size: 1.65em;
        color: #a7c6a7;

        &.fa-minus-circle {
          color: #da6d70
        }
      }
    }
  }
`;

export default List;
