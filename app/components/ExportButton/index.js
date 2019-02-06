/**
 * Button.react.js
 *
 * An export button
 *
 * Usage: <Button handleRoute="" color="">{props.children}</Button> as a button tag
 *        <Button route="" color="">{props.children}</Button> as an anchor(a) tag
 *        <Button deadButton color="">{props.children}</Button> as a span button with no other action
 */
import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  font-size: 12px;
  cursor: pointer;

  .fa-download {
    display: inline-block;
    color: #2abb9c;
    margin-left: 3px;
  }
`;

/* Styles */
function ExportButton(props) {
  return (
    <Button className="export-btn" onClick={props.onClick}>
      {props.text}
      <i role="presentation" className="fa fa-download" onClick={props.onClick} />
    </Button>
  );
}

ExportButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ExportButton;
