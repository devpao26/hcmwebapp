import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const PageContent = styled.div`
  /* width: calc(100% - 200px);
  margin-left: 200px; */
  padding: 15px;

  ${media.tablet`
    width: 100%;
    margin-left: 0;
  `}
`;

export default PageContent;