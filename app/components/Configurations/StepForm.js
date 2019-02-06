import styled from 'styled-components';
import { BorderColor, RedColor } from '../StyleUtils/Colors';

const StepForm = styled.div`
  font-size: 12px;

  form {
    padding: 15px 10px;

    .action {
      padding: 10px;
      text-align: center;

      .btn {
        display: inline-block;
        width: 170px;

        &:hover {
          opacity: .8;
        }
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

  .fields {
    margin-bottom: 20px;

    label {
      font-size: .85em;
      color: #808489;
      display: block;
      margin-bottom: 3px;
    }

    h4 {
      margin-bottom: 0;
      font-weight: 400;
    }
  }

  .message {
    display: block;
    text-align: center;
    padding: 5px;
  }

  .emp-approvers {

    dl {
      margin: 0 0 0;
      padding: 10px 0;
      border-bottom: 1px solid ${BorderColor};
      position: relative;

      dt,
      dd {
        display: inline-block;
        vertical-align: middle;
        margin: 0 0 0;
      }

      dt {
        .user-avatar {
          width: 40px;
          height: 40px;
          padding: 5px;
          background-color: #5e5d5d;
        }
      }

      dd {
        width: calc(100% - 45px);
        margin-left: 5px;

        p {
          margin: 0 0 0;
          font-size: 1.1em;
        }

        .del-btn {
          position: absolute;
          bottom: 5px;
          right: 0;
          cursor: pointer;
          color: ${RedColor};

          &:hover {
            opacity: .8;
          }
        }
      }
    }
  }
`;

export default StepForm;
