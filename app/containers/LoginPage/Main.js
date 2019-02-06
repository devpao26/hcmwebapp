import styled from 'styled-components';
import LoginBg from 'components/ImageFiles/login_image.png';

const MainContent = styled.main`
  background-image: url(${LoginBg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #eaf0f4;
  grid-area: content;

  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

export default MainContent;