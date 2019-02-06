import styled from 'styled-components';
import { BoxShadow, BorderColor, HighlightColor, ActiveColor } from '../StyleUtils/Colors';

const Lists = styled.div`
  background-color: #fff;
  box-shadow: ${BoxShadow};
  position: relative;
  .button-emp {
    margin: 0px 7px;
  }
  .search-filter {
    padding: 10px 10px 0;
  }

  .filters {
    padding: 0 10px;
    font-size: .8em;

    label { padding-right: 8px; }
  }

  .message {
    text-align: center;
  }

  .listings {
    list-style: none;
    margin: 0 0 0;
    padding: 0 0 0;

    li[role="presentation"] {
      border-bottom: 1px solid ${BorderColor};
      padding: 10px;
      cursor: pointer;
      position: relative;

      &:hover {
        background-color: ${HighlightColor};
      }

      .user-avatar,
      p {
        display: inline-block;
        vertical-align: middle;
      }

      .user-avatar {
        width: 35px;
        height: 35px;
        padding: 5px;
        border-radius: 50%;
        background-color: #5e5d5d;
        margin-right: 10px;
      }

      p {
        margin: 0 0 0;
        width: calc(100% - 45px);
        
        small {
          color: #838690;
          display: block;
        }
      }

      .fa-check-circle {
        position: absolute;
        font-size: 1.35em;
        color: ${ActiveColor};
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        display: none;
        z-index: 1;
      }

      &.selected .fa-check-circle {
        display: block;
      }
    }
  }
`;

export default Lists;
