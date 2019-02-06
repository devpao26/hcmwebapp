import styled, { keyframes } from 'styled-components';
import { media } from 'components/StyleUtils';
import { BorderColor, ActiveColor, BlockedColor } from 'components/StyleUtils/Colors';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  background-color: #fff;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  min-height: 300px;
  font-size: 13px;
  animation: ${fadeIn} .3s ease-in-out;
  z-index: 11;
  box-shadow: 0 3px 10px 1px rgba(0, 0, 0, 0.12);

  .tab-nav {
    padding: 5px 10px;
    text-align: center;
    border-top: 1px solid ${BorderColor};
    border-bottom: 1px solid ${BorderColor};

    a {
      display: inline-block;
      vertical-align: middle;
      font-size: 1.2em;
      text-transform: uppercase;
      margin: 0 6px;
      cursor: pointer;

      &.active {
        color: ${ActiveColor};
      }
    }
  }

  .tab-content {
    padding: 30px 25px;
    animation: ${fadeIn} .3s ease-in-out;
  }

  .personal-info {
    position: relative;

    .edit-prof {
      position: absolute;
      top: 10px;
      right: 15px;
      cursor: pointer;
    }

    p {
      margin: 0 0 15px;

      span {
        display: inline-block;
        vertical-align: top;

        &:first-child {
          width: 150px;
        }

        &:nth-child(2) {
          width: calc(100% - 155px);
        }
      }
    }
  }

  .emp-requirements {
    text-align: center;

    p {
      display: inline-block;
      vertical-align: top;
      margin: 0 10px 13px;
      padding: 10px 13px;
      width: 300px;
      box-shadow: 0 3px 10px 1px rgba(0, 0, 0, 0.12);
      text-align: left;
      position: relative;

      .svg-inline--fa,
      span {
        display: inline-block;
        vertical-align: middle;
      }

      .svg-inline--fa {
        font-size: 2em;
        color: ${BlockedColor};
      }

      span {
        width: calc(100% - 25px);
        padding-left: 10px;
      }

      button,
      a {
        position: absolute;
        bottom: 5px;
        right: 5px;
        font-size: .8em;
        color: ${BlockedColor};
        text-decoration: underline;
        cursor: pointer;

        &:hover {
          opacity: .8;
        }
      }
    }
  }

  .emp-history {
    padding: 30px 0;

    .collapse {
      background-color: #fbfcfe;
      border-bottom: 1px solid #fff;
      border-top: 1px solid #f6f7fc;

      .pagination {
        font-size: .9em;
        padding: 5px 5px 10px;
      }
    }

    table {
      margin: 10px 0;
      font-size: .9em;

      th,
      td {
        padding: 5px 8px;
      }

      th {
        text-align: left;
        font-weight: 300;
      }

      td:first-child {
        min-width: 100px;
      }

      a {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  ${media.handheldLandscape`
    .tab-content {
      padding: 35px 10px 20px;
    }

    .emp-requirements {
      p {
        width: 47%;
        margin: 0 8px 13px;
      }
    }
  `}

  ${media.handheld`
    .emp-requirements {
      p {
        width: 100%;
        margin: 0 0 13px;
      }
    }
  `}
`;

export default Wrapper;
