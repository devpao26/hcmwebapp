import styled from 'styled-components';
import { ActiveColor } from '../StyleUtils/Colors';

const Wrapper = styled.div`
  position: relative;
  min-height: 100px;

  h3 {
    .total {
      display: block;

      b {
        color: ${ActiveColor};
      }
    }
  }
`;

export default Wrapper;
