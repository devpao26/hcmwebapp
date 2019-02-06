import styled from 'styled-components';
import { media } from '../StyleUtils';

const Left = styled.div`
  background-color: #fff;

  .mobile-toggle {
    border-bottom: 0;
  }

  ${media.handheldLandscape`
  `}
`;

export default Left;
