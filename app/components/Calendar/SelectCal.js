import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const SelectCal = styled.div`
  padding: 10px;
  font-size: 12px;
  width: ${(props) => props.width ? props.width : '100%'};

  label {
    display: block;
    font-size: .75em;
    color: #7a7f85;
    margin-bottom: 3px;
  }

  .data {
    border-bottom: 1px solid #d3d6db;
    position: relative;
    margin-bottom: 10px;

    .content {
      cursor: pointer;
      display: inline-block;
      width: calc(100% - 20px);
    }

    .fa-caret-down {
      font-size: 1em;
      width: 15px;
      text-align: center;
      cursor: pointer;
      outline: 0;
      display: inline-block;
    }

    .cal-wrap {
      position: absolute;
      right: 0;
      top: 100%;
      background-color: #fff;
      width: 300px;
      font-size: 11px;
      z-index: 10;

      h2 {
        padding: 5px 10px;
      }

      .date {
        top: 3px;
        right: 3px;
        font-size: .7em;
      }

      .day {
        border: 1px solid #fcfbfc;
        min-height: 30px;
      }

      button {
        width: 35px;
        height: 30px;
      }

      .monthlabel {
        line-height: 28px;
      }
    }
  }

  ${media.handheldLandscape`
    .data {
      .cal-wrap {
        margin-bottom: 10px;
        transform: translateX(53%);
      }
    }
  `}
`;

export default SelectCal;
