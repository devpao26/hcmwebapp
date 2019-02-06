/**
 * Employee List with Alphabet Filter
 *
 * Props: children (nodes), alphaFilter (boolean) - required
 * Usage: <EmployeeList alphaFilter={true/false}> { children nodes } </EmployeeList>
 */

import React, { Children } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  overflow: hidden;
  margin-top: 10px;
  border-top: 1px solid #f9f9fc;

  li {
    cursor: pointer;
  }
`;

const Filter = styled.div`
  float: right;
  width: 25px;
  padding-bottom: 10px;
  text-align: center;

  & + ul {
    margin-right: 25px !important;
    border-right: 1px solid #f9f9fc;
  }

  button {
    margin: 6px 0;
    outline: 0;
    display: block;
    width: 100%;
    cursor: pointer;

    &:hover {
      color: #2abb9c;
    }
  }

  .az {
    position: relative;
    padding: 0 6px;
    text-align: left;

    span {
      display: block;
      font-size: .7em;
    }

    .fa {
      position: absolute;
      top: 3px;
      right: 3px;
      font-size: 1.3em;
    }

    .fa-long-arrow-up {
      display: none;
    }

    &.asc .fa-long-arrow-up {
      display: block;
    }

    &.asc .fa-long-arrow-down {
      display: none;
    }
  }
`;

class EmployeeListAlphaFilter extends React.Component {
  changeSort = (e) => {
    e.preventDefault();
    // Toggle the asc class
    e.currentTarget.classList.toggle('asc');
  }

  render() {
    const { alphaFilter } = this.props;
    let alphas = [];
    const a = 'A';
    const z = 'Z';

    for (let i = a.charCodeAt(0); i <= z.charCodeAt(0); i += 1) {
      alphas.push(<button key={eval('String.fromCharCode(' + i + ')')}>{eval('String.fromCharCode(' + i + ')')}</button>);
    }

    return (
      <Container>
        { alphaFilter &&
          <Filter>
            <button key="az" className="az" onClick={this.changeSort}>
              <span>A</span><span>Z</span>
              <i className="fa fa-long-arrow-up" /><i className="fa fa-long-arrow-down" />
            </button>
            { alphas }
          </Filter>
        }
        {Children.toArray(this.props.children)}
      </Container>
    );
  }
}

EmployeeListAlphaFilter.propTypes = {
  children: PropTypes.node,
  alphaFilter: PropTypes.bool.isRequired,
};

export default EmployeeListAlphaFilter;
