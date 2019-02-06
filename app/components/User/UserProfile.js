import styled from 'styled-components';
import { media } from 'components/StyleUtils';

const UserProfile = styled.div`
  padding: 15px 20px;
  position: relative;

  .user-avatar {
    width: 180px;
    height: 180px;
    border-radius: 100px;

    svg {
      background-color: #717070;
    }
  }

  ${media.tablet`
    padding: 10px;

    .user-avatar {
      width: 110px;
      height: 110px;
    }
  `}
`;

export default UserProfile;
