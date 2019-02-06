/**
 * Add Button Style
 * NOTE: override width/height on other styled component where you call this style
 */

import { css } from 'styled-components';
import { RedColor, BoxShadow } from '../StyleUtils/Colors';

const AddButton = css`
  width: 25px;
  height: 25px;
  padding: 7px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  background-color: ${RedColor};
  color: #fff;
  box-shadow: ${BoxShadow};
`;

export default AddButton;
