/**
 * Input Type Radio
 * @prop {string} label       String label for the checkbox
 * @prop {string} value       Value of the input
 * @prop {string} name        Required name attribute for input type radio (select only one)
 * @prop {func}   onClick    Function to call to get value (value is the one specified in the props) returns an event handler
 * @prop {bool}   checked     True/False for default selected value (default: false)
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCircle, faDotCircle } from '@fortawesome/fontawesome-free-regular';
import { ActiveColor, BorderHoverColor } from '../StyleUtils/Colors';

const Label = styled.label`
  user-select: none;
  display: inline-block;
  overflow: hidden;
  padding: 0 1px;
  margin: 0 4px;
  cursor: pointer;

  &:hover {
    color: ${BorderHoverColor};
  }

  input {
    width: 0;
    height: 0;
    position: absolute;
    top: -9999em;
    left: -9999em;
  }

  span {
    display: inline-block;
    margin-right: 3px;

    .svg-inline--fa {
      font-size: 1em;
    }

    .fa-dot-circle {
      display: none;
    }
  }

  input:checked + span {
    .fa-dot-circle {
      display: inline-block;
      color: ${ActiveColor};
    }
    .fa-circle {
      display: none;
    }
  }
`;

class InputRadio extends React.PureComponent {
  state = {
    checked: this.props.checked,
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.checked !== this.props.checked) {
      this.setState({
        checked: nextProps.checked,
      });
    }
  }

  render() {
    return (
      <Label className="custom-radio">
        <input type="radio" value={this.props.value} name={this.props.name} onChange={(e) => { this.props.onClick(e); }} checked={this.state.checked} />
        <span>
          <FontAwesomeIcon icon={faCircle} />
          <FontAwesomeIcon icon={faDotCircle} />
        </span>
        {(this.props.label) && this.props.label}
      </Label>
    );
  }
}

InputRadio.defaultProps = {
  checked: false,
};

InputRadio.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  checked: PropTypes.bool,
};

export default InputRadio;
