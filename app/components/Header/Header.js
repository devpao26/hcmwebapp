import styled from 'styled-components';

const Header = styled.header`
  grid-area: header;
  position: relative;
  z-index: 2;
  background-color: #242a2a;
  padding: 15px 20px 10px;
  box-shadow: 0 3px 6px 1px rgba(0, 0, 0, .2);

  @media screen and (max-width: 1023px) {
    padding: 15px 10px 10px;
  }
`;

export default Header