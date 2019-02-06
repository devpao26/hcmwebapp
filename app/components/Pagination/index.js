/**
 * Pagination
 *
 * Props: children, clear (default value is true)
 * Usage: <Pagination clear={true/false}> {children nodes} </Pagination>
 */

import React, { Children } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

/* Styles */
import Wrapper from './Wrapper';

class Pagination extends React.PureComponent {
  render() {
    let styles = {
      clear: 'both',
    }

    if (!this.props.clear) {
      styles = {
        clear: 'none',
        marginRight: '25px',
      }
    }

    return (
      <Wrapper className="pagination" style={styles}>
        {Children.toArray(this.props.children)}
      </Wrapper>
    );
  }
}

Pagination.defaultProps = {
  clear: true,
}

Pagination.propTypes = {
  children: PropTypes.node.isRequired,
  clear: PropTypes.bool
}

export default Pagination;
