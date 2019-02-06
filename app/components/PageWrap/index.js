/*
 * PageWrap
 *
 * NOTE: This should always be the first tag wrapper in all
 *       page containers
 */

import styled from 'styled-components';

const PageWrap = styled.div`
  /* display: flex;
  flex-direction: column;
  min-height: 100vh; */
  display: grid;
  grid-gap: 0px;
  grid-template-columns: auto 1fr;
  grid-template-rows: 60px auto 50px;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  overflow: hidden;

  @media screen and (max-width: 1023px) {
    position: relative;
    left: 0;
    transition: left .5s ease-in-out;
    grid-template-columns: 100%;
    grid-template-areas:
    "header"
    "content"
    "footer";
  }
`;

export default PageWrap;