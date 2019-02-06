/**
 * Button.react.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a button with an onClick handler, if deadButton prop was passed
 * it will render a button look but with no actions
 *
 * Pass Prop:
 *  color = values are gray, red
 *
 * Usage: <Button handleRoute="" color="">{props.children}</Button> as a button tag
 *        <Button route="" color="">{props.children}</Button> as an anchor(a) tag
 *        <Button deadButton color="">{props.children}</Button> as a span button with no other action
 */
import React, { Children } from 'react';
import { PropTypes } from 'prop-types';

/* Styles */
import A from './A';
import StyledButton from './StyledButton';
import SpanButton from './SpanButton';

function Button(props) {
  let bgColor = '#f9671e';

  if (props.color === 'red') {
    bgColor = '#ec5f59';
  } else if (props.color === 'gray') {
    bgColor = '#7f848b';
  } else if (props.color === 'green') {
    bgColor = '#2abb9c';
  } else if (props.color === 'purple') {
    bgColor = '#826092';
  }

  let btnStyles = {
    backgroundColor: bgColor,
  };

  const notAllowed = {
    backgroundColor: bgColor,
    opacity: '.4',
    cursor: 'not-allowed',
  };

  if (props.opaque) {
    btnStyles = {
      backgroundColor: bgColor,
      opacity: '.5',
    };
  }

  // Render an anchor tag
  let button = (
    <A to={props.route} onClick={props.onClick} style={btnStyles}>
      {Children.toArray(props.children)}
    </A>
  );

  // If the Button has a handleRoute prop, we want to render a button
  if (props.handleRoute) {
    button = (
      <StyledButton onClick={props.handleRoute} style={btnStyles}>
        {Children.toArray(props.children)}
      </StyledButton>
    );
  }

  // If the Button has a deadButton prop, we want to render a span that only looks like a button
  if (props.deadButton) {
    button = (
      <SpanButton style={notAllowed}>
        {Children.toArray(props.children)}
      </SpanButton>
    );
  }

  return (
    <span className="btn">
      {button}
    </span>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  handleRoute: PropTypes.func,
  route: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
  opaque: PropTypes.bool,
  deadButton: PropTypes.bool,
};

export default Button;
