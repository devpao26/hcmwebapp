import React, { Children } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.label`
  display: inline-block;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: .9em;

  .fa {
    vertical-align: middle;
    margin-top: -3px;
    font-size: .7em;
  }

  &:hover .fa,
  &:hover select {
    color: #0bd38a;
  }
`;

const Select = styled.select`
  appearance: none;
  outline: 0;
`;

class SelectTag extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Select>
          {Children.toArray(this.props.children)}
        </Select>
        <i className="fa fa-chevron-down"></i>
      </Wrapper>
    );
  }
}

SelectTag.propTypes = {
  children: PropTypes.node.isRequired
}

export default SelectTag;