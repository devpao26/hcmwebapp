import styled from 'styled-components';

const DataWrapper = styled.div`
  display: block;
  padding: 0 10px 10px;
  position: relative;
  text-align: ${props => props.center ? 'center' : 'left'};
`;

export default DataWrapper;