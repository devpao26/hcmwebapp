/**
 * Grid Styled Component
 * @prop {string} columns   Grid columns (must comply to css grid template columns values) default: 1fr (1column)
 * @prop {string} gap       Grid gap (must be in px or %) default: 0px 0px (row column)
 */
import styled from 'styled-components';
import { media } from '../StyleUtils';
import { BorderColor } from '../StyleUtils/Colors';

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns ? props.columns : '1fr'};
  grid-gap: ${(props) => props.gap ? props.gap : '0px 0px'};
  font-size: 13px;

  .mobile-toggle {
    padding: 12px 10px;
    width: 100%;
    cursor: pointer;
    border-bottom: 1px solid ${BorderColor};
    display: none;

    .svg-inline--fa {
      margin-left: 2px;
      font-size: 1.1em;
    }
  }

  ${media.handheldLandscape`
    grid-template-columns: 1fr;
    grid-gap: 20px 0;

    .mobile-toggle {
      display: block;
    }
  `}
`;

export default Grid;
