import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Right = styled.div`
  width: 37%;
  padding-left: 15px;
  margin-bottom: 15px;

  ${media.tablet`
    width: 100%;
    padding-left: 0;
  `}
`;

export default Right;
