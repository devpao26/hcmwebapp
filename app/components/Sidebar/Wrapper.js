import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Wrapper = styled.aside`
  grid-area: sidebar;
  width: 200px;
  background-color: #242a2a;
  font-size: 12px;
  transition: all .5s ease-in-out;

  ${media.tablet`
    // display: none;
    // width: 0px;
    position: fixed;
    top: 0;
    left: -200px;
    right: 0;
    bottom: 0;
    z-index: 99;
    grid-area: auto;
  `}
`;

export default Wrapper;
