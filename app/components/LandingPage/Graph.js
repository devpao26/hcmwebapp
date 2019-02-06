import styled from 'styled-components';

const Graph = styled.div`
  background-color: #2b3131;
  position: absolute;
  z-index: 2;
  top: 0;
  left: calc(100% - 1px);
  right: 0;
  bottom: 0;
  color: #fff;
  width: 300px;
  padding: 15px 10px;
  border-radius: 0 2px 2px 0;
  font-size: .8em;

  p {
    margin: 0 0 0;
    text-align: right;
  }
`;

export default Graph;