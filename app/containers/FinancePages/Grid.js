import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Grid = styled.div`
  font-size: 13px;
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 20% 40% auto;

  ${ media.tablet`
    grid-template-columns: 100%;
  `}
`;

export default Grid;