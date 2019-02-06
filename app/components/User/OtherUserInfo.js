import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const OtherUserInfo = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 30%;
  padding: 20px;

  p {
    margin: 0 0 20px;

    span {
      display: inline-block;
      vertical-align: top;
      width: calc(100% - 95px);
    }

    span:first-child {
      width: 90px;
    }
  }

  ${media.tablet `
    display: none;
  `}
`;

export default OtherUserInfo;
