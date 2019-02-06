/**
 * Main Wrapper
 *
 * NOTE: Wrapper after the Header tag and before Footer Tag
 *       this is the middle part of the page.
 *       Always use this, as this will push the footer to
 *       stick at the bottom of the page.
 */
import styled from 'styled-components';

const MainContent = styled.main`
  background-color: #eaf0f4;
  grid-area: content;
  position: relative;
  min-height: calc(100vh - 110px);
  /* overflow-y: auto; */

  /* &:before {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 200px;
    background-color: #242a2a;
    display: block;
    content: '';
  } */
`;

export default MainContent;
