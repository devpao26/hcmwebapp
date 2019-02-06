import styled from 'styled-components';

const Footer = styled.footer`
  grid-area: footer;
  position: relative;
  z-index: 2;
  width: 100%;
  clear: both;
  background-color: #242a2a;
  padding: 5px 20px;
  text-align: right;
  box-shadow: 0 -3px 6px 1px rgba(0, 0, 0, .2);

  &.footer-login {
    text-align: left;
    padding: 8px 20px;
    // width: calc(100% - 450px);
  }

  p {
    margin: 0 0 2px;
    color: #fff;
    font-size: 10px;

    &.app-name {
      letter-spacing: .5px;
    }

    span {
      width: 90px;
      margin-left: 3px;
    }
  }
`;

export default Footer;