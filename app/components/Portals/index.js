/**
 * Portals Component
 * @prop {node}   children Child elements to be rendered outside our app root
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const portalsContainer = document.getElementById('portals');

class PortalsComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    portalsContainer.appendChild(this.el);
  }

  componentWillUnmount() {
    portalsContainer.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

PortalsComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PortalsComponent;
