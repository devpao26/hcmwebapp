import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Container = styled.div`
  background-color: ${(props) => props.overlay ? 'transparent' : 'rgba(0,0,0,.6)'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  font-size: 13px;

  ${media.tablet`
    overflow-y: auto;
  `}
`;

export default Container;
