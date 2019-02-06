import styled from 'styled-components';

const Close = styled.button`
  position: absolute;
  z-index: 3;
  top: 0px;
  right: 0px;
  color: ${(props) => props.red ? '#e99492' : '#fff'};
  cursor: pointer;
  outline: 0;
  padding: 1px 5px;

  &:hover {
    opacity: .8;
  }
`;

export default Close;