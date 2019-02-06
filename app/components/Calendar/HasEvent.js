import styled from 'styled-components';

const HasEvent = styled.span`
  position: absolute;
  bottom: 0;
  left: -11px;
  transform: rotate(-45deg);

  &:after {
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(88, 191, 171, 0);
    border-right-color: #58bfab;
    border-width: 8px;
  }
`;

export default HasEvent;
