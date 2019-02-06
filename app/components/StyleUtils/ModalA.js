import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ButtonStyle from './ModalButtonStyle';

const A = styled(Link)`
  ${ButtonStyle};
`;

export default A;