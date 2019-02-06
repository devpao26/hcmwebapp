/*
 * Toggle Switch
 *
 * Props: value (true/false) - required
 * Usage: <ToggleSwitch value="true/false" />
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.label`
  clear: both;
  width: 20px;
  height: 20px;
  line-height: 0;
  cursor: pointer;

  input {
    display: none;
  }

  span {
    border: 1px solid #da3832;
    padding: 1px;
    display: block;
    width: 20px;
    height: 20px;
    text-align: center;

    .fa {
      display: none;
      color: #5d9d52;
      font-size: 1.1em;
    }
  }

  span.disabled,
  input:checked + span.disabled {
    border-color: #838690;
    cursor: default;

    .fa {
      display: none;
    }
  }

  input:checked + span {
    border-color: #5d9d52;

    .fa {
      display: block;
    }
  }
`;

class CustomCheckbox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.value && true,
    };
  }

  toggleCheck = (e) => {
    this.setState({
      checked: e.target.checked
    });
  }

  render() {
    return (
      <Wrapper onClick={this.toggleCheck}>
        <input type="checkbox" onChange={this.toggleCheck} defaultChecked={this.state.checked} />
        <span className={this.props.disabled ? 'disabled' : ''}><i className="fa fa-check" /></span>
      </Wrapper>
    );
  }
}

CustomCheckbox.propTypes = {
  value: PropTypes.bool
};

export default CustomCheckbox;