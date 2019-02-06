import styled from 'styled-components';
import { RedColor, ActiveColor } from '../StyleUtils/Colors';

const ViewDetails = styled.div`
  padding: 13px 10px;
  font-size: 12px;
  .section-half {
    width: 50%;
    border-right: 1px solid #d3d6db;
  }
  div .half {
    display: inline-block;
    width: 46%;
  }
  p {
    margin: 0 0 15px;

    .label {
      display: block;
      font-size: .85em;
    }

    .value {
      display: block;
      padding: 0 0 0;
      margin-bottom: 5px;

      &.reject {
        color: ${RedColor};
      }

      &.complete {
        color: ${ActiveColor};
      }

      &.border {
        border: 1px solid #d3d6db;
        padding: 5px;
        min-height: 50px;
      }

      b {
        font-weight: 400;
        text-decoration: underline;
      }

      a {
        text-decoration: none;
        color: inherit;
      }
    }
  }
  .action_button {
    text-align: center;
    padding-top: 10px;

    .btn {
      display: inline-block;
      vertical-align: middle;
      min-width: 40%;
      margin: 0 8px 10px;

      &:hover {
        opacity: .8;
      }
    }
  }
  .view-details {
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      opacity: .5;
    }
  }
`;

export default ViewDetails;
