import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const Right = styled.div`
  min-width: 320px;
  width: 30%;
  font-size: 13px;
  margin-bottom: 15px;

  .height100 {
    height: 100%;
  }

  .list {
    padding-bottom: 10px !important;
  }

  ${ media.tablet `
    width: 100%;
  `}
`;

export default Right;