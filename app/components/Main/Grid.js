/**
 * Grid Styled Component
 * @prop {string} columns   Grid columns (must comply to css grid template columns values) default: 1fr (1column)
 * @prop {string} rows      Grid rows (must comply to css grid template columns values) default: 1fr (1row)
 * @prop {string} gap       Grid gap (must be in px or %) default: 0px 0px (row column)
 */
import styled from 'styled-components';
import { media } from '../StyleUtils';

const Grid = styled.div`
  font-size: 13px;
  display: grid;
  grid-template-columns: ${(props) => props.columns ? props.columns : '1fr'};
  grid-template-rows: ${(props) => props.rows ? props.rows : '1fr'};
  grid-gap: ${(props) => props.gap ? props.gap : '0px 0px'};

  .message {
    margin: 0 0 0;
    font-size: .9rem;
    text-align: center;
    padding: 20px 10px;
  }

  ${media.handheldLandscape`
    grid-template-columns: 1fr;
    grid-gap: 20px 0;
  `}
`;

export default Grid;
