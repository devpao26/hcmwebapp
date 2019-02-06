import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Screenshots = styled.div`
  padding: 15px 10px 5px;
  max-height: 520px;
  overflow-y: auto;

  .img {
    display: block;
    width: 100%;
    padding-bottom: 56.5%;
    background-size: 100% auto;
    position: relative;

    .fa-search-plus {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      transition: opacity .2s ease-in-out;

      &:before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2em;
        color: #fff;
        z-index: 2;
        text-shadow: 0 0 1px #000, 0 0 1px #000;
      }

      &:after {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.4);
        z-index: 1;
        content: '';
        display: block;
      }
    }

    &:hover .fa-search-plus {
      opacity: 1;
    }
  }

  &.grid {
    text-align: center;
  }

  .loading {
    margin-bottom: 15px;
  }

  .no-data {
    text-align: center;
    padding-bottom: 10px;
  }

  article {
    background-color: #fff;
    box-shadow: 0 3px 5px 1px rgba(0, 0, 0, 0.12);
  }

  &.grid article {
    display: inline-block;
    vertical-align: top;
    margin: 0 10px 25px;
    padding: 5px;
    width: 30%;
  }

  &.list article {
    display: table;
    width: 100%;
    border-radius: 3px;
    margin-bottom: 10px;

    .screen,
    .detail {
      display: table-cell;
      vertical-align: middle;
    }

    .screen {
      width: 190px;
      padding: 20px;
      text-align: center;
      border-right: 1px solid #f7f7fb;

      .img {
        display: inline-block;
      }
    }

    .detail {
      padding: 15px;

      h4 {
        margin: 0 0 15px;
        font-size: 1.1em;
        font-weight: 600;

        span {
          display: block;
        }
      }

      p {
        margin: 0 0;
        color: #838791;
        font-size: .9em;

        span {
          display: block;
        }
      }
    }
  }

  .link {
    padding: 5px 10px 0;

    button {
      text-decoration: none;
      color: #2abb9c;
      font-size: 1em;
      cursor: pointer;

      &:hover {
        opacity: .8;
      }
    }
  }

  ${ media.tablet `
    font-size: 13px;

    &.grid article {
      width: 44%;
      margin: 0 9px 15px;
    }

    &.list article {
      .screen {
        padding: 10px;
        width: 100px;
      }
      .detail {
        padding: 10px;
      }
    }
  `}
`;

export default Screenshots;