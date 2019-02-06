import styled from 'styled-components';
import { media } from 'components/StyleUtils';
import { BorderColor, ActiveColor } from 'components/StyleUtils/Colors';

const Employee = styled.div`
  display: grid;
  grid-template-columns: 190px auto 170px;
  background-color: #fff;
  border-radius: 2px;
  position: relative;
  margin-bottom: 15px;

  .user-avatar {
    width: 160px;
    height: 160px;
    background-color: #a8a8a8;
    border-radius: 50%;
    margin: 20px 10px 20px 20px;
  }

  .details {
    display: table;
    height: 100%;
    width: 100%;

    .info {
      display: table-cell;
      vertical-align: middle;
    }

    h4 {
      font-size: 1.3em;
      font-weight: 400;
      margin: 0 0 0;

      button {
        cursor: pointer;

        &:hover {
          opacity: .8;
        }
      }
    }

    p {
      margin: 0 0 2px;

      .fa {
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 50%;
        font-size: 1.8em;
        background-color: #242a2a;
        color: #fff;
        text-align: center;
        margin-right: 5px;
      }
    }
  }

  .options {
    display: table;
    height: 100%;
    width: 100%;
    background-color: #fbfcfe;

    .select {
      display: table-cell;
      vertical-align: middle;
      padding: 10px;

      label {
        display: block;
        font-size: .9em;
        margin-bottom: 3px;
      }

      nav label {
        margin-bottom: 0;
      }

      .data {
        border-bottom: 1px solid ${BorderColor};
        position: relative;
        margin-bottom: 10px;

        .content {
          display: inline-block;
          width: calc(100% - 16px);
          color: #17b385;
          cursor: pointer;
        }

        .fa {
          font-size: 1em;
          width: 15px;
          text-align: center;
          cursor: pointer;
          outline: 0;
        }
      }

      .filter {
        margin-bottom: 10px;

        button {
          font-size: .9em;
          display: inline-block;
          margin: 0 2px;
          border-radius: 2px;
          cursor: pointer;

          &.active {
            background-color: ${ActiveColor};
            color: #fff;
          }
        }
      }

      .option-menu {
        position: relative;
        z-index: 9;
        font-size: 13px;
        display: inline-block;
      }
    }

    .export-btn {
      margin-top: 5px;
      padding: 0 0;
    }
  }

  ${media.tablet `
    grid-template-columns: 120px auto 110px;
    font-size: 13px;

    .user-avatar {
      width: 100px;
      height: 100px;
      margin: 10px;
    }

    .details {
      padding: 5px;
    }

    .options {
      background-color: transparent;
    }
  `}
`;

export default Employee;