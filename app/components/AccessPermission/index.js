import styled from 'styled-components';
import { media } from '../StyleUtils';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 310px auto;
  grid-gap: 0 20px;
  font-size: 12px;

  ${media.handheldLandscape`
    grid-template-columns: 100%;
    grid-gap: 15px 0;
    margin-bottom: 20px;
  `}
`;

export default Wrapper;
