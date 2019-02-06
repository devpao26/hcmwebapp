import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Left = styled.div`
  font-size: 13px;
  flex: 1;
  margin-bottom: 15px;
  margin-right: 20px;

  h2 {
    margin-bottom: 0;
  }

  ${ media.tablet `
    margin-right: 0;
    margin-bottom: 0;
  `}
`;

export default Left;