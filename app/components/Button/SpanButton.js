import styled from 'styled-components';

import ButtonStyle from './ButtonStyle';

const Button = styled.span`
  ${ButtonStyle}
  cursor: default;

  &:hover {
    opacity: 1;
  }
`;

export default Button;
