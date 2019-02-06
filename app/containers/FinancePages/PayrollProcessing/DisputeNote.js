import styled from 'styled-components';
import { BorderColor } from 'components/StyleUtils/Colors';

const DisputeNote = styled.div`
  padding: 5px 10px 0;
  min-height: 80px;
  font-size: 13px;
  border-bottom: 1px solid ${BorderColor};

  p {
    margin: 0 0 8px;
  }
`;

export default DisputeNote;
