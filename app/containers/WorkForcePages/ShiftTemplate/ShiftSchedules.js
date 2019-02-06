import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const ShiftSchedule = styled.div`
  margin-bottom: 15px;

  .scheds {
    padding: 0 0;

    label {
      padding: 10px 15px;

      .time-in,
      .time-out {
        position: relative;
        top: 10px;
      }
      .time-in {
        margin-left: 95px;
      }
      .time-out {
        margin-left: 140px;
      }
    }

    p {
      background-color: #fbfcfe;
      padding: 6px 15px;
      border-bottom: 1px solid #fff;
      margin: 0 0 0;
      font-weight: 600;

      span {
        display: inline-block;
        vertical-align: middle;
        font-weight: 400;
      }

      .week-name {
        min-width: 110px;
        padding-left: 10px;
      }

      .separator {
        text-align: center;
        min-width: 50px;
        font-weight: 600;
      }
    }
  }

  ${media.handheld`
    .scheds {
      label {
        .time-in,
        .time-out {
          margin-left: 65px;
        }
      }

      p {
        .week-name {
          min-width: 99px;
          padding-left: 5px;
        }

        .separator {
          min-width: 20px;
        }
      }
    }
  `}
`;

export default ShiftSchedule;
