import styled from 'styled-components';
import { BorderColor, ActiveColor, BlockedColor } from '../StyleUtils/Colors';

const LeaveCreditList = styled.table`
  table-layout: fixed;
  margin: 15px;

  th {
    font-weight: 400;
    text-align: left;
    border-bottom: 1px solid ${BorderColor};
    padding: 3px 5px;
  }

  td {
    padding: 5px;
  }

  td:first-child {
    min-width: 150px;
  }

  td:nth-child(2) {
    min-width: 100px;
    color: ${ActiveColor};
  }

  td:nth-child(3) {
    color: ${BlockedColor};
  }
`;

export default LeaveCreditList;
