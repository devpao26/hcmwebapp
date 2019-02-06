import styled from 'styled-components';

const PageWrap = styled.div`
  display: grid;
  grid-gap: 0px;
  grid-template-columns: auto 450px;
  grid-template-rows: 60px auto 50px;
  grid-template-areas:
    "header sidebar"
    "content sidebar"
    "footer sidebar";

  @media screen and (max-width: 1023px) {
    grid-template-columns: 100%;
    grid-template-rows: 60px auto 50px;
    grid-template-areas:
      "header"
      "sidebar"
      "footer";
  }
`;

export default PageWrap;