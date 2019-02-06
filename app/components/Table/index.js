import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collaspe;
  font-size: 13px;
  margin-bottom: 15px;

  tbody tr:nth-child(odd) {
    background-color: #fbfcfe;
  }

  tbody tr:hover {
    background-color: #f9f9f9; 
  }

  th {
    font-weight: 400;
    font-size: .9em;
    text-align: left;
    padding: 5px 10px;
  }

  td {
    padding: 15px 10px;
    font-size: .85em;

    &.center {
      text-align: center;
    }

    span {
      display: block;
      font-size: 1.35em;
    }
  }

  td .fa-ellipsis-v {
    font-size: 1.4em;
  }

  td .user-avatar {
    display: inline-block;
    width: 45px;
    height: 45px;
    padding: 5px;
    border-radius: 50%;
    background-color: #5e5d5d;
  }

  td .option-menu {
    position: relative;
    z-index: 9;
    font-size: 12px;
    display: inline-block;
  }
`;

export default Table;
