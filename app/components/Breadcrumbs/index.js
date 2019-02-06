import styled from 'styled-components';
import { BorderColor, BorderHoverColor } from '../StyleUtils/Colors';

const Breadcrumbs = styled.div`
  font-size: 11px;
  padding: 0 1px 15px;
  text-align: left;

  span {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;

    .fa-chevron-right {
      margin: 0 5px;
      font-size: .8em;
    }
  }
  
  a {
    text-decoration: none;
    border-bottom: 1px solid ${BorderHoverColor};
    color: #2b3131;
    cursor: pointer;
    transition: all .2s ease-in-out;
    will-change: auto;

    &:hover {
      opacity: .8;
      border-bottom-color: ${BorderColor};
    }
  }

  .fa-home {
    font-size: 1em;
    margin-right: 3px;
  }
`;

export default Breadcrumbs;
