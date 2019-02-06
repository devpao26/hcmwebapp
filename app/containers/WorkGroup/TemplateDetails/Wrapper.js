import styled from 'styled-components';
import { BorderColor } from 'components/StyleUtils/Colors';

const Wrapper = styled.div`
  font-size: 13px;

  .template-detail {
    font-size: 12px;
    max-height: 70vh;
    overflow-y: auto;

    .fields {
      margin: 0 0 12px;

      p {
        margin: 0 0 0;
      }

      .message {
        margin: 0 0 0;
        text-align: center;
        padding-top: 5px;
      }

      .half {
        margin: 0 0 0;
        display: inline-block;
        vertical-align: top;
        width: 30%;
        margin-right: 10px;
      }
    }

    .label {
      font-size: .8em;
      display: block;
      margin: 0 0 0;

      .half {
        display: inline-block;
        width: 49%;
        margin-right: 0;
      }
    }

    .value {
      display: block;
      font-weight: 600;
      padding: 3px;
      /* border-bottom: 1px solid ${BorderColor}; */

      &.border {
        /* border: 1px solid ${BorderColor}; */
        /* min-height: 50px; */
      }

      &.noborder {
        border: 0;
      }
    }

    dl {
      display: block;
      margin: 0 0 0;
      padding: 0 0 0;
      background: #fbfcfe;
      border-bottom: 1px solid ${BorderColor};

      dd,
      dt {
        margin: 0 0 0;
        padding: 8px 5px;
        display: inline-block;
        vertical-align: middle;
        width: 49%;
      }

      dt {
        .status,
        span {
          display: inline-block;
          vertical-align: middle;
        }

        .status {
          margin-right: 5px;
          width: 7px;
          height: 7px;
        }
      }

      dd {
        text-align: right;
      }
    }

    .shifts {
      dl {
        dt {
          width: 20%
        }
        dd {
          width: 80%;

          span {
            display: inline-block;
            vertical-align: middle;
            width: 49%;
            text-align: center;
          }
        }
      }
    }

    .workstats {
      dl {
        dd {
          text-align: left;
        }
      }
    }
  }
`;

export default Wrapper;
