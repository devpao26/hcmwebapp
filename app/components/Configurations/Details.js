import styled from 'styled-components';
import { BorderColor, ActiveColor } from '../StyleUtils/Colors';
import { media } from '../StyleUtils';

const Details = styled.div`
  display: inline-block;
  vertical-align: top;
  border-left: 1px solid ${BorderColor};
  padding-bottom: 20px;
  position: relative;

  .message {
    text-align: center;
    padding: 10px 5px;
  }

  .details,
  .steps,
  .entities {
    padding: 10px;
  }

  .configs {
    padding: 15px;

    .action_button {
      text-align: center;
      padding-top: 20px;

      .btn {
        display: inline-block;
        vertical-align: middle;
        width: 43%;
        margin: 0 5px;
      }
    }
  }

  .details {
    border-bottom: 1px solid ${BorderColor};

    h3 {
      font-size: 1.5em;
      font-weight: 400;
      margin: 0 0 0;

      button {
        display: inline-block;
        vertical-align: top;
        padding: 0;
        margin-left: 5px;
        transition: opacity .2s ease-in-out;

        .svg-inline--fa {
          background-color: #f44336;
          box-shadow: 0px 5px 15px 0 rgba(0, 0, 0, 0.3);
          display: inline-block;
          vertical-align: middle;
          border-radius: 50%;
          color: #fff;
          padding: 5px;
          width: 20px;
          height: 20px;
          cursor: pointer;

          &.fa-pencil-alt {
            background-color: ${ActiveColor};
          }

          &:hover {
            opacity: .8;
          }
        }
      }
    }

    input,
    textarea {
      display: block;
      width: 100%;
    }

    input {
      font-size: 1.5em;
    }

    textarea {
      height: 80px;
    }

    p {
      margin: 0 0 5px;
    }
  }

  h4 {
    font-weight: 400;
    margin: 0 0 20px;
  }

  ul {
    list-style: none;
    margin: 0 0 0;
    padding: 0 0 0;
  }

  li {
    background: #fff;
    position: relative;
    box-shadow: 0px 5px 10px 1px rgba(0, 0, 0, 0.12);
    margin-bottom: 10px;
    padding: 15px 10px;
  }

  .steps {
    li {
      padding: 0 0 0;

      p,
      button {
        display: inline-block;
        vertical-align: middle;
      }

      p {
        margin: 0 0 0;
        padding: 15px 10px;
        width: calc(100% - 25px);

        &[role="presentation"] {
          cursor: pointer;

          &:hover {
            opacity: .8;
          }
        }

        span {
          display: inline-block;
          min-width: 20px;
          color: ${ActiveColor};
        }
      }

      button {
        padding: 0;
        opacity: 0;
        transition: opacity .2s ease-in-out;

        .svg-inline--fa {
          background-color: #f44336;
          box-shadow: 0px 5px 15px 0 rgba(0, 0, 0, 0.3);
          display: inline-block;
          vertical-align: middle;
          border-radius: 50%;
          color: #fff;
          padding: 5px;
          width: 18px;
          height: 18px;
          cursor: pointer;

          &:hover {
            opacity: .8;
          }
        }
      }

      &:hover {
        button {
          opacity: 1;
        }
      }
    }
  }

  .entities {
    h4 {
      margin-bottom: 10px;

      .option-menu {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin-top: -1px;
        margin-left: 8px;

        .svg-inline--fa {
          background-color: #f44336;
          box-shadow: 0px 5px 15px 0 rgba(0, 0, 0, 0.3);
          display: inline-block;
          vertical-align: top;
          border-radius: 50%;
          color: #fff;
          padding: 7px;
          width: 25px;
          height: 25px;
          cursor: pointer;
        }
      }
    }

    .search-filter {
      width: 100%;
      padding: 0 10px;

      form {
        width: 100%;

        input:not([type=checkbox]):not([type=radio]) {
          width: 100%:
        }
      }

      .filter-buttons {
        margin-top: 2px;
        display: block;
      }
    }

    ul {
      width: 75%;

      .option-menu {
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-50%);
        z-index: 10;
      }
    }
  }

  .add-btn {
    .svg-inline--fa {
      background-color: #f44336;
      box-shadow: 0px 5px 15px 0 rgba(0, 0, 0, 0.3);
      display: inline-block;
      vertical-align: middle;
      border-radius: 50%;
      color: #fff;
      padding: 7px;
      width: 25px;
      height: 25px;
      cursor: pointer;

      &:hover {
        opacity: .8;
      }
    }
  }

  ${media.handheldLandscape`
    display: block;
    width: 100%;
    border-left: 0;
    border-top: 1px solid ${BorderColor};

    .details {
      input {
        font-size: 1.2em;
      }
    }
  `}
`;

export default Details;
