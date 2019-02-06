import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const H3 = styled.h3`
  font-weight: 400;
  font-size: 1.5em;
  margin: 0 0 0;
  ${props => props.padding ? 'padding: 3px 15px;' : ''}

  ${ media.tablet `
    font-size: 1.2em;
  `}
`;

export default H3;