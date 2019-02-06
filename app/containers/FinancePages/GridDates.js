import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Dates = styled.div`
  // grid-area: date;
  background-color: #fff;

  .date-filter {
    padding: 20px 10px;
    border-bottom: 1px solid #f9f9fc;
    position: relative;

    &.select-days {
      display: none;
      background-color: #fbfcfe;
    }

    .content,
    .fa-caret-down {
      cursor: pointer;
    }

    .content:hover,
    .fa-caret-down:hover {
      opacity: .8;
    }

    .cal-wrap {
      position: absolute;
      top: 70%;
      left: 10px;
      box-shadow: -1.4px -1.4px 23.5px 0.5px rgba(45, 44, 44, 0.52);
    }
  }

  ul {
    list-style: none;
    margin: 0 0 0;
    padding: 0 0 0;

    li {
      padding: 13px 10px;
      border-bottom: 1px solid #f9f9fc;
      cursor: pointer;

      &:hover,
      &.active {
        background-color: #efefef;
      }
    }
  }

  ${ media.tablet`
    margin-bottom: 10px;

    .date-filter {
      display: inline-block;
      width: 50%;
      border-bottom: 0;

      &.select-days {
        display: inline-block;
      }

      &.center {
        width: 100%;
        text-align: center;
      }

      select {
        max-width: 100%;
      }
    }

    ul {
      /* display: none; */
    }
  `}
`;

export default Dates;
