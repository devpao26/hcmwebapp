import styled from 'styled-components';
import { media } from '../StyleUtils';

const SectionFlex = styled.div`
  clear: both;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &.fixed {
    position: fixed;
  }

  ${media.tablet`
    flex-direction: column;
  `}    
`;

export default SectionFlex;
