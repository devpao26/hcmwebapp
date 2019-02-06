/**
 * Input Type Checkbox
 * @prop {string} value       Value of the input
 * @prop {func}   onChange    Function to call to get value (value is the one specified in the props)
 * @prop {bool}   checked     Whether our default is checked or not
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/fontawesome-free-regular';

const Label = styled.span`
  user-select: none;
  /* display: inline-block; */
  overflow: hidden;
  padding: 0 1px;
  cursor: pointer;

  input {
    width: 0;
    height: 0;
    position: absolute;
    top: -9999em;
    left: -9999em;
  }

  span {
    display: inline-block;
    vertical-align: middle;
    margin-right: 4px;
    margin-top: -2px;

    .svg-inline--fa {
      font-size: 1.2em;
    }
  }
`;

class InputCheckbox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked) {
      this.setState({
        checked: true,
      });
    } else {
      this.setState({
        checked: false,
      });
    }
  }

  check = (e) => {
    e.preventDefault();
    this.setState({
      checked: !this.state.checked,
    });
  }

  render() {
    return (
      <Label className="custom-checkbox">
        <input type="checkbox" value={this.props.value} />
        <span onClick={(e) => { this.check(e); this.props.onChange(); }} role="presentation">
          <FontAwesomeIcon icon={(this.state.checked) ? faCheckSquare : faSquare} />
        </span>
      </Label>
    );
  }
}

InputCheckbox.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

export default InputCheckbox;
