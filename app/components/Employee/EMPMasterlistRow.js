/**
 * Masterlist Row
 *
 * This will act like a table-cell
 * Children columns should be in div with className of cell with data-title attribute
 */
import styled from 'styled-components';
import { media } from 'components/StyleUtils';
import { ActiveColor, NewColor, InactiveColor, BlockedColor, RedColor } from 'components/StyleUtils/Colors';

const Row = styled.div`
  clear: both;
  display: table-row;
  width: 100%;
  position: relative;

  .visaya-clock {
    width: 30px;
    height: 30px; 
  }

  .emp-plus-icon {
    font-size: 1.5em;
    cursor: pointer;
    padding: 0 0;

    &:hover {
      opacity: .8;
    }
  }

  &.head .cell {
    padding: 5px 10px;

    &:first-child {
      padding-left: ${(props) => props.statusDot ? '30px' : '65px'};
    }
  }

  &.body:nth-of-type(even) {
    background-color: #fbfcfe;
  }

  .cell {
    display: table-cell;
    word-wrap: wrap;
    vertical-align: middle;
    font-size: .875em;
    padding: 15px 10px;

    &.nobreak {
      white-space: nowrap;
    }

    &.text-center {
      text-align: center;
    }

    &.min-width {
      min-width: 50px;
    }

    &:first-child {
      min-width: 265px;
    }

    .status,
    .user-avatar,
    p {
      display: inline-block;
      vertical-align: middle;
      margin: 0 0 0;
    }

    .user-avatar {
      width: 45px;
      height: 45px;
      padding: 5px;
      border-radius: 50%;
      background-color: #5e5d5d;
      margin-right: 10px;

      & + p {
        width: calc(100% - 55px);
      }
    }

    .status {
      margin-right: 10px;

      & + p {
        width: calc(100% - 20px);
      }
    }

    .emp-name {
      padding-top: 3px;
      display: block;
      font-size: 1.35em;
      text-transform: capitalize;
    }

    small {
      display: block;
      font-size: 1em;
      color: #838690;
    }

    .link-to {
      color: #2b3131;
      text-decoration: underline;
      cursor: pointer;

      &:hover {
        text-decoration: none;
      }
    }

    .stat-New {
      color: ${NewColor};
    }
    .stat-Active {
      color: ${ActiveColor};
    }
    .stat-Inactive {
      color: ${InactiveColor};
    }
    .stat-Blocked {
      color: ${BlockedColor};
    }
    .stat-Suspended,
    .stat-Resigned,
    .stat-Terminated {
      color: ${RedColor};
    }
  }

  .menu {
    position: relative;
    top: ${(props) => props.twoSmall ? '32px' : '27px'};
    right: 5px;
    max-width: 45px;
    text-align: right;
    display: table-cell;
  }

  .option-menu {
    display: inline-block;
    position: relative;
  }

  .menu-label {
    text-transform: uppercase;
    font-size: .9em;
    position: relative;

    &.Approved,
    &.Approve {
      color: ${ActiveColor};
    }
    &.Rejected,
    &.Reject {
      color: ${RedColor};
    }
  }

  ${media.tablet`
    display: block;
    max-height: ${(props) => props.twoSmall ? '70px' : '50px'};
    transition: all .2s ease-in-out;
    /* overflow: hidden; */

    &.expand {
      max-height: 999px;

      .cell {
        opacity: 1;
        /* transition-delay: .4s; */
      }
    }

    &.head {
      display: none;
    }

    .cell {
      display: block;
      opacity: 0;
      width: 100%;
      padding: ${(props) => props.statusDot ? '7px 10px 7px 135px' : '7px 10px 7px 153px'};
      transition: opacity .1s ease-in-out;

      &.first {
        opacity: 1;
        width: 100%;
      }

      .emp-name {
        padding-top: 0;
      }

      small {
        display: inline-block;
        min-height: 13px;
      }

      .user-avatar {
        width: 33px;
        height: 33px;
        margin-right: 7px;
      }

      &:before {
        content: attr(data-title);
        display: inline-block;
        vertical-align: baseline;
        margin-left: -108px;
        min-width: 110px;
      }

      &.first:before {
        display: none;
      }

      .progress-bar {
        display: inline-block;
        width: 100%;
      }
    }

    .cell.first {
      display: block;
      padding-left: 10px;
    }

    .menu {
      position: absolute;
      top: 28px;
      max-width: 75px;
      font-size: 11px;
    }

    ${(props) => props.history ? `
      .cell {
        .emp-name {
          padding: 9px 0;
        }
      }
      ` : ''
    }
  `}
`;

export default Row;
