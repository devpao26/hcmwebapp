import styled from 'styled-components';
import { ActiveColor, RedColor } from 'components/StyleUtils/Colors';

const WorkNameType = styled.div`
  padding: 10px 0;
  font-size: 13px;

  .worknametype {
    padding: 0 0;

    label {
      .workname,
      .worktype,
      .statustype {
        display: inline-block;
        vertical-align: middle;
        width: 31%;
        padding: 5px 5px 0;
      }

      .workname {
        padding-left: 35px;
      }

      .statustype {
        text-align: center;
      }
    }

    p {
      background-color: #fbfcfe;
      padding: 7px 5px;
      border-bottom: 1px solid #fff;
      margin: 0 0 0;
      position: relative;

      &.error {
        background-color: transparent;
        text-align: center;
        color: #ff0000;
      }

      span,
      .btn-delete {
        display: inline-block;
        vertical-align: middle;
        font-weight: 400;
      }

      .status {
        margin-right: 15px;
      }

      .workname,
      .worktype,
      .statustype {
        width: 31%;
        padding: 5px;
      }

      .statustype {
        text-align: center;

        .icon-green {
          color: ${ActiveColor};
        }

        .icon-red {
          color: ${RedColor};
        }
      }

      .btn-remove {
        padding: 0;
        width: 15px;
        height: 15px;
        line-height: 9px;
        color: #fff;
        border-radius: 15px;
        font-size: .65em;
        background-color: #797979;
        padding: 3px;
        cursor: pointer;

        .fa-minus {
          color: #fff;
        }
      }
    }
  }

  .addworknametype {
    padding: 5px 15px 25px;

    p {
      margin: 0 0 0;
      padding: 0 7px 0;
      display: inline-block;
      width: 50%;

      &.system-type {
        /* padding-left: 20px; */
      }

      .worktype {
        width: 100%;
      }
    }

    .status-type {
      margin-top: 15px;
      padding: 0 7px;
      min-height: 21px;

      & > * {
        display: inline-block;
        vertical-align: middle;
        line-height: 1;
        margin-right: 5px;
      }

      .toggle {
        p {
          width: 20px;
        }
      }

      .svg-inline--fa {
        font-size: 1.2em;
        color: ${ActiveColor};

        &.icon-red {
          color: ${RedColor};
        }
      }
    }
  }

  .action_button {
    text-align: center;

    .btn {
      display: inline-block;
      width: 42%;
      margin: 0 7px;
    }
  }
`;

export default WorkNameType;
