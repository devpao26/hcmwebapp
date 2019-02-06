import React, { Children } from 'react';
import { PropTypes } from 'prop-types';
import styled, { css } from 'styled-components';

const backStyle = css`
  text-transform: uppercase;
  display: inline-block;
  padding: 0;
  margin-bottom: 5px;
  margin-left: 5px;
  font-size: 12px;
  color: #2b3131;
  cursor: pointer;

  .svg-inline--fa {
    font-size: 1.5em;
    vertical-align: middle;
    margin-top: -2px;
  }
`;

const Button = styled.button`${backStyle}`;
const A = styled.a`${backStyle}`;

function BackButton(props) {

  if (props.to) {
    return <A href={props.to}>{Children.toArray(props.children)}</A>
  }

  if (props.onClick) {
    return <Button onClick={props.onClick}>{Children.toArray(props.children)}</Button>
  }

  return null;
}

BackButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
};

export default BackButton;
