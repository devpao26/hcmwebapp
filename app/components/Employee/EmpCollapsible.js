/**
 * Employee Collapsible Component
 * @prop {string} title     Title of the collapsible item
 * @prop {node}   children  Child elements (the content of the collapsible)
 */
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/fontawesome-free-solid';

const Wrapper = styled.div`
  .title {
    padding: 10px 15px;
    position: relative;

    span,
    button {
      display: inline-block;
      vertical-align: middle;
    }

    span {
      width: calc(100% - 50px);
    }
    button {
      cursor: pointer;
      padding: 0 0 0;

      &:hover {
        opacity: .8;
      }

      .svg-inline--fa {
        transition: transform .2s ease-in-out;
        will-change: transform;
        display: inline-block;
        margin-left: 3px;
      }
    }
  }

  &.active {
    .title button .svg-inline--fa {
      transform: rotate(180deg);
    }
  }

  .content {
    padding: 0 15px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .2s ease-out;
  }
`;

export class EmpCollapsible extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowContent: false,
    };
  }

  toggleCollapse = (e) => {
    this.setState({
      isShowContent: !this.state.isShowContent,
    });

    const parent = e.currentTarget.parentNode.parentNode;
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
      <Wrapper className="collapse">
        <div className="title">
          <span>{this.props.title}</span>
          <button onClick={this.toggleCollapse} title={(this.state.isShowContent) ? 'Hide' : 'Show'}>
            {(this.state.isShowContent) ? 'Hide' : 'Show'}
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        </div>
        <div className="content" ref={(el) => { this.collapseContent = el; }}>
          {Children.toArray(this.props.children)}
        </div>
      </Wrapper>
    );
  }
}

EmpCollapsible.defaultProps = {
  title: 'Title of the collapse here',
};

EmpCollapsible.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default EmpCollapsible;
