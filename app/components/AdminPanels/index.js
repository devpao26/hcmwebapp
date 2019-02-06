/**
 * Default Button for the Admin Panels
 * @prop {string}   to           Renders an anchor tag (choose one between to and onClick)
 * @prop {function} onClick      Renders a button tag (choose one between to and onClick)
 * @prop {boolean}  deadBtn      Render a dead button tag
 * @prop {boolean}  smallSpacing Will render small spaces in between of buttons
 * @prop {boolean}  grayIcon     Will render a gray icon
 * @prop {node}     children     Required, this will render the children inside the button/anchor tag
 *
 * Usage: <Button to/onClick smallSpacing grayIcon deadBtn>{children}</Button>
 */
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import AdminButtonStyle from './Button';

const ButtonA = styled(Link)`
  ${AdminButtonStyle}
`;

const Button = styled.a`
  ${AdminButtonStyle}
`;

export class AdminButton extends React.PureComponent {
  render() {
    if (this.props.to) {
      return (
        <ButtonA to={this.props.to} data-smallspacing={this.props.smallSpacing} data-grayicon={this.props.grayIcon}>{Children.toArray(this.props.children)}</ButtonA>
      );
    }

    if (this.props.onClick) {
      return (
        <Button role="presentation" href="/" onClick={(e) => { e.preventDefault(); this.props.onClick(e); }} className={(this.props.deadBtn) && 'dead-btn'} data-smallspacing={this.props.smallSpacing} data-grayicon={this.props.grayIcon}>{Children.toArray(this.props.children)}</Button>
      );
    }

    return null;
  }
}

AdminButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  smallSpacing: PropTypes.bool,
  grayIcon: PropTypes.bool,
  deadBtn: PropTypes.bool,
};

export default AdminButton;
