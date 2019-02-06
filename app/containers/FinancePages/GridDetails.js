import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Details = styled.div`
  /* grid-area: details; */

  .payslip-action-button {
    padding: 10px 20px;
    text-align: center;

    .dot-indicator {
      font-size: 1.5em;
    }

    .btn {
      display: inline-block;
      width: 43%;

      &:hover {
        opacity: .8;
      }
    }
  }

  .option-menu.disabled {
    .btn {
      pointer-events: none;
      opacity: .5;
    }
  }

  .action-button {
    padding: 5px 20px;

    .btn {
      display: block;
      margin-top: 10px;

      &:hover {
        opacity: .8;
      }
    }

    .option-menu {
      position: relative;
    }
  }

  ${media.tablet`
    /* [class*="GridContent__"] {
      margin-bottom: 0;
    } */

    /* h2,
    table {
      display: none;
    } */

    .action-button {
      padding: 15px 0 10px;
      font-size: 11px;
      text-align: center;

      .btn {
        display: inline-block;
        width: 48%;
        margin: 0 3px 7px;
      }

      .option-menu {
        width: 48%;
        display: inline-block;

        .btn {
          width: 100%;
        }
      }
    }
  `}
`;

export default Details;
