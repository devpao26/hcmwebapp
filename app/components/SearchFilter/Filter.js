import styled from 'styled-components';

const Filters = styled.div`
  display: inline-block;
  vertical-align: middle;
  background-color: #2abb9c;
  line-height: 0;
  padding: 3px 6px 4px;
  border-radius: 2px;
  margin-left: 10px;
  position: relative;
  cursor: pointer;

  span {
    font-size: 11px;
    color: #fff;
    text-transform: uppercase;
  }

  nav {
    line-height: 1.4;
    width: 150px;
  }
`;

export default Filters;
