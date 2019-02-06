import styled from 'styled-components';
import { BorderColor } from '../StyleUtils/Colors';

const Wrapper = styled.div`
  font-size: 13px;

  .analytics {
    background-color: #fbfcfe;
    border-bottom: 1px solid ${BorderColor};
    padding: 10px;

    dl {
      margin: 0 0 0;
      padding: 0 0 0;

      dt,
      dd {
        margin: 0 0 0;
        padding: 0 0 0;
        display: inline-block;
        vertical-align: middle;
      }

      dt {
        width: 30%;
      }

      dd {
        width: 70%;
      }

      &.head {
        dt,
        dd {
          font-size: 1.275em;
        }
      }
    }
  }

  .listings {
    display: inline-block;
    vertical-align: top;
    width: 45%;
    padding: 15px 10px;
    border-right: 1px solid ${BorderColor};
    margin-right: -1px;

    .search-filter {
      form {
        width: 100%;

        input:not([type=checkbox]):not([type=radio]) {
          width: 100%;
        }
      }
    }
  }

  .listings + .history {
    width: 55%;
    display: inline-block;
    vertical-align: top;
    border-left: 1px solid ${BorderColor};
  }

  .history {
    .dates,
    .step-status {
      display: inline-block;
      vertical-align: top;

      p {
        margin: 0 0 0;
      }
    }

    .dates {
      border-right: 1px solid ${BorderColor};
      margin-right: -1px;
      width: 45%;

      p {
        border-bottom: 1px solid ${BorderColor};
        padding: 15px 10px;
      }
    }

    .step-status {
      border-left: 1px solid ${BorderColor};
      width: 55%;

      dl {
        margin: 0 0 0;

        dt,
        dd {
          display: inline-block;
          vertical-align: middle;
          padding: 0 0 0;
          margin: 0 0 0;
        }

        dt {
          width: 30%;
        }

        dd {
          width: 70%;
        }

        &.head {
          padding: 15px 10px;
        }
      }

      dl:not(.head) {
        background-color: #fbfcfe;

        dt,
        dd {
          padding: 5px;
        }

        dt {
          padding-left: 20px;
          border-bottom: 1px solid #f1f2f9;
          border-top: 1px solid #f1f2f9;
        }

        dd {
          border-left: 1px solid #f1f2f9;
          border-bottom: 1px solid #f1f2f9;
          border-top: 1px solid #f1f2f9;
        }
      }

      .note {
        padding: 15px 10px;
      }
    }
  }
`;

export default Wrapper;
