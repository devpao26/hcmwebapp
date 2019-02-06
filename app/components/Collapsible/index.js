/**
 * Collapsible Component
 * @prop {string} title     Name title for the collapsible
 * @prop {node}   children  Child elements
 */
import React, { Children } from 'react';
import PropTypes from 'prop-types';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCube, faCaretUp } from '@fortawesome/fontawesome-free-solid';

import Wrapper from './CollapsibleStyle';

class CollapsibleComponent extends React.PureComponent {
  collapseToggle = (e) => {
    const parent = e.currentTarget.parentNode;
    parent.classList.toggle('active');

    // add/remove max height on our content element for animation
    const maxHeight = this.collapseContent.scrollHeight; // get the scroll height of the element
    if (this.collapseContent.style.maxHeight) {
      this.collapseContent.style.maxHeight = null;
    } else {
      this.collapseContent.style.maxHeight = `${maxHeight}px`; // set the max height style
    }
  }

  render() {
    return (
      <Wrapper className="collapsible">
        <button className="toggle" onClick={this.collapseToggle}>
          <FontAwesomeIcon icon={faCube} />
          <span>{this.props.title}</span>
          <FontAwesomeIcon icon={faCaretUp} />
        </button>
        <div className="content" ref={(el) => { this.collapseContent = el; }}>
          {Children.toArray(this.props.children)}
        </div>
      </Wrapper>
    );
  }
}

CollapsibleComponent.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CollapsibleComponent;
