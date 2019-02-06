import styled from 'styled-components';
import { BorderColor, RedColor, ActiveColor, HighlightColor } from '../StyleUtils/Colors';

const ListWrapper = styled.ul`
  margin: 0 0 0;
  padding: 5px 0 0;
  list-style: none;
  font-size: 12px;
  min-height: 200px;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;

  li {
    position: relative;
    padding: 9px 1px;
    border-top: 1px solid ${BorderColor};
    cursor: pointer;

    &:hover {
      background-color: ${HighlightColor};
    }

    .user-avatar,
    p {
      display: inline-block;
      vertical-align: middle;
    }

    p {
      margin: 0 0 0;

      &.group {
        padding: 8px 5px;
      }
      
      small {
        color: ${RedColor};
        display: block;
      }
    }

    .fa-check-circle {
      color: ${ActiveColor};
      position: absolute;
      top: 50%;
      right: 5px;
      transform: translateY(-50%);
      display: none;
      font-size: 1.275em;
    }

    &.selected .fa-check-circle {
      display: block;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      margin-right: 5px;
      background-color: #a8a8a8;

      & + p {
        width: calc(100% - 45px);
      }
    }
  }
`;

export default ListWrapper;
