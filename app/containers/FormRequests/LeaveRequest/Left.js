import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Left = styled.div`
  width: 63%;
  margin-bottom: 15px;

  ${media.tablet`
    width: 100%;
  `}
`;

export default Left;
