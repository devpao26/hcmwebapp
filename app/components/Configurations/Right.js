import styled from 'styled-components';
import { BorderColor } from '../StyleUtils/Colors';
import { media } from '../StyleUtils';

const Right = styled.div`
  background-color: #fff;

  /* .template-list {
    display: inline-block;
    vertical-align: top;
    width: 50%;
    border-right: 1px solid ${BorderColor};
    margin-right: -1px;
    min-height: calc(100% - 37px);
  } */

  ${media.handheldLandscape`
    /* .template-list {
      display: block;
      width: 100%;
      border-right: 0;
      margin-right: 0;
    } */
  `}
`;

export default Right;
