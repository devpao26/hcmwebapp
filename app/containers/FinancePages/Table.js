import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collaspe;
  font-size: 14px;
  background-color: #fbfcfe;
  margin-bottom: 0;
  table-layout: fixed;

  tbody tr:nth-child(odd) {
    background-color: #fbfcfe;
  }

  tbody tr:hover {
    background-color: #f9f9f9; 
  }

  tr.no-data {
    text-align: center;

    td {
      padding: 10px 5px;
    }
  }

  td {
    padding: 8px 5px;
    border-right: 1px solid #f0f0f5;
    border-bottom: 1px solid #f0f0f5;
    font-size: .9em;

    small {
      display: block;
      color: #838791
    }

    select,
    textarea {
      max-width: 100%;
    }

    textarea {
      resize: none;
      text-align: center;
    }

    &:first-child,
    &:last-child {
      border-right: 0;
    }

    &:first-child {
      width: 25px;
      text-align: right;
    }

    &:nth-child(2) {
      width: 44%;
    }

    &:last-child {
      text-align: center;
    }
  }
`;

export default Table;