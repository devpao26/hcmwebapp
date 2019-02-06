/**
 * H2 styled tag
 */

import styled from 'styled-components';

const H2 = styled.h2`
  font-size: 1.25em;
  line-height: 1;
  margin: 0 0 0;
  padding: 15px;
  text-align: center;
  background-color: ${(props) => props.bgColor ? props.bgColor : '#242a2a'};
  color: #fff;
  text-transform: uppercase;
`;

export default H2;
