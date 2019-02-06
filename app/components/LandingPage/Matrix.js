import styled from 'styled-components';

const Matrix = styled.div`
  display: flex;
  height: 80%;
  min-height: 250px;
  justify-content: space-around;
  align-items: center;
  position: relative;

  div {
    width: 29%;
    padding: 6% 0;
    background-color: #ffffff;
    box-shadow: 0 5px 10px 1px rgba(0, 0, 0, 0.1);
    text-align: center;
    display: table;
    // height: 80px;

    &.green p {
      color: #58bfab;
    }

    &.purple p {
      color: #748cd1;
    }
  }

  p {
    display: table-cell;
    vertical-align: middle;
    margin: 0 0 3px;
    padding: 0 5px;
  }

  span {
    display: block;
    text-transform: uppercase;
    color: #2b3131;
    font-size: .7em;
  }
`;

export default Matrix;