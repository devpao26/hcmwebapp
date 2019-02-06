import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  font-size: 13px;
  background-color: #fff;
  box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.09);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 15px;

  td {
    padding: 3px 5px;
  }

  th {
    text-align: left;
    font-weight: 400;
    padding: 8px 5px;
    background-color: #2b3131;
    color: #fff;
    font-size: 1.2em;
  }
`;

export default Table;
