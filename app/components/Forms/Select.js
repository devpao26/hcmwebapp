/**
 * Custom Select Dropdown
 * @prop {func}   getValue  Returns event handler
 * @prop {string} label     Optional label for the select tag
 * @prop {node}   children  Node children (options)
 * @prop {bool}   border    True/False to show border on bottom (default: true)
 * @prop {string} align     left/right text alignment (default: left)
 * @prop {bool}   disabled  True/False to set the tag to disabled (default: false)
 * @prop {any}    default   Default value for the select (default: false)
 * @prop {bool}   inline    True/False to set the select tag to display inline (default: false)
 * @prop {bool}   error     Show error color (default: false)
 */
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/fontawesome-free-solid';

import { BorderColor, BorderHoverColor, TextColor, RedColor } from '../StyleUtils/Colors';

const Wrapper = styled.div`
  ${(props) => props.inline && `
    display: inline-block;
    vertical-align: bottom;
    margin-right: 10px;
  `}

  .select-label {
    display: block;
    font-size: .8em;
    color: #646970;
  }

  .select-tag {
    display: block;
    width: 100%;
    position: relative;
    ${(props) => props.withBorder && `border-bottom: 1px solid ${BorderColor}`};

    &:hover {
      border-bottom-color: ${BorderHoverColor};
    }

    &.error {
      border-bottom-color: ${RedColor};
    }

    select {
      -moz-appearance: none;
      -ms-progress-appearance: none;
      -webkit-appearance: none;
      display: block;
      width: 100%;
      padding: 5px 15px 5px 5px;
      cursor: pointer;
      position: relative;
      z-index: 2;
    }

    select[disabled] {
      opacity: .5;
      cursor: default;
      pointer-events: none;
    }
    
    .svg-inline--fa {
      display: block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      margin-top: -1px;
      right: 2px;
      color: ${TextColor};
      font-size: 13px;
      z-index: 1;
    }
  }

  /* .select-label + .select-tag {
    display: inline-block;
    width: auto;
  } */
`;

export class CustomSelectDropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.default,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.default !== this.props.default) {
      this.setState({
        value: nextProps.default,
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      value: e.currentTarget.value,
    });
    this.props.getValue(e);
  }

  render() {
    return (
      <Wrapper className="custom-select" withBorder={this.props.border} inline={this.props.inline}>
        {(this.props.label) && <span className="select-label">{this.props.label}</span>}
        <span className={(this.props.error) ? 'select-tag error' : 'select-tag'}>
          <select onChange={this.handleChange} dir={(this.props.align === 'right') ? 'rtl' : 'ltl'} disabled={this.props.disabled} value={this.state.value}>
            {Children.toArray(this.props.children)}
          </select>
          <FontAwesomeIcon icon={faCaretDown} />
        </span>
      </Wrapper>
    );
  }
}

CustomSelectDropdown.defaultProps = {
  border: true,
  align: 'left',
  disabled: false,
  default: false,
  inline: false,
  error: false,
};

CustomSelectDropdown.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  getValue: PropTypes.func,
  border: PropTypes.bool,
  align: PropTypes.string,
  disabled: PropTypes.bool,
  default: PropTypes.any,
  inline: PropTypes.bool,
  error: PropTypes.bool,
};

export default CustomSelectDropdown;
