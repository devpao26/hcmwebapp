import styled from 'styled-components';
import { BorderColor, HighlightColor, ActiveColor, RedColor, AvatarBgColor, InactiveColor } from '../StyleUtils/Colors';
import { media } from '../StyleUtils';
import AddButtonStyle from '../StyleUtils/Add';

const Lists = styled.div`

  .search-filter {
    padding: 10px 5px 0;

    form {
      width: 100%;

      input:not([type=checkbox]):not([type=radio]) {
        width: 100%;
      }
    }

    .filter-buttons {
      display: block;
      padding-top: 5px;
    }
  }

  .lists {
    margin: 0 0 0;
    padding: 0 0 5px;
    list-style: none;

    .message {
      text-align: center;
      padding: 15px 10px;
      display: block;
    }

    li[role="presentation"] {
      display: block;
      border-top: 1px solid ${BorderColor};
      padding: 10px;
      cursor: pointer;
      position: relative;

      small {
        display: block;
        font-size: .75em;
        color: ${InactiveColor};
      }
      
      span {
        display: inline-block;
        vertical-align: middle;

        &:first-child {
          width: calc(100% - 50px);
        }

        &:last-child {
          font-size: .9em;
          color: ${ActiveColor};
        }
      }

      &:hover,
      &.active,
      &.selected {
        background-color: ${HighlightColor};
      }
    }
  }

  .lists.enrolled-list {
    li {
      display: block;
      border-bottom: 1px solid ${BorderColor};
      padding: 5px 10px;
      position: relative;

      .user-avatar,
      p {
        display: inline-block;
        vertical-align: middle;
      }

      p {
        width: 100%;
        margin: 0 0 0;
        padding: 10px 0;

        small {
          font-size: .7em;
          display: block;
        }
      }

      .user-avatar {
        width: 40px;
        height: 40px;
        background-color: ${AvatarBgColor};
        margin-right: 5px;

        & + p {
          width: calc(100% - 50px);
          padding: 0 0;
        }
      }

      .delete {
        padding: 0 0 0;
        color: ${RedColor};
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1.125em;
        cursor: pointer;
        opacity: 0;
        transition: opacity .2s ease-in-out;
        pointer-events: none;
      }

      &:hover {
        .delete {
          pointer-events: auto;
          opacity: 1;

          &:hover {
            opacity: .8;
          }
        }
      }
    }
  }

  .create-new {
    border-bottom: 1px solid ${BorderColor};
    padding: 13px 10px;
    cursor: pointer;
    display: block;
    width: 100%;
    text-align: left;

    .option-menu {
      display: inline-block;
      vertical-align: middle;
      z-index: 10;
    }

    .svg-inline--fa {
      ${AddButtonStyle}
    }
  }

  ${media.handheldLandscape`
    max-height: 300px;
    overflow-y: auto;
    /* overflow: hidden;
    max-height: 0;
    transition: max-height .2s ease-out; */
  `}
`;

export default Lists;
