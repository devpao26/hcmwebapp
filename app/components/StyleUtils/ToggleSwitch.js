/**
 * Toggle Switch
 *
 * @prop {boolean}  value   Required: true/false
 * @prop {boolean}  hide    will hide the switch and display required text
 * @prop {func}     update  Required: function to get the value of the toggle
 * Usage: <ToggleSwitch value="true/false" hide update={function} />
 *
 * TO DOS: Update and remove props (ReqId, ReqStat)
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  clear: both;
  display: inline-block;
  vertical-align: middle;
  line-height: 0;

  label {
    display: block;
  }

  input {
    width: 0;
    height: 0;
    display: none !important;
  }

  p {
    margin: 0 0 0;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    background-color: #838690;
    height: 11px;
    width: 20px;
    border-radius: 5px;
    transition: background-color .3s ease-in-out;
    cursor: pointer;

    &:after {
      content: '';
      width: 9px;
      height: 9px;
      border-radius: 9px;
      margin: 1px;
      display: block;
      background-color: #fff;
      position: absolute;
      top: 0;
      left: 0;

      transition: left .3s ease-in-out;
    }
  }

  input:checked + p {
    background-color: #2abb9c;
  }
  input:checked + p:after {
    left: 9px;
  }

  span {
    display: inline-block;
    vertical-align: middle;
    height: 11px;
    font-size: 9px;
    color: #da3832;
    margin-left: 3px;
    line-height: 1.4;

    &.gray {
      color: #838690;
    }
  }
`;

class ToggleSwitch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.value,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.value !== this.props.value) {
      this.toggleCheck();
    }
  }

  toggleCheck = () => {
    this.setState({
      checked: !this.state.checked,
    });
  }

  render() {
    // let req = this.state.checked ? <span value={this.props.value}>Required</span> : <span className="gray">Not Required</span>;
    return (
      <Wrapper className="toggle">
        { this.props.hide
          ? <span>Required</span>
          : <label htmlFor="toggle">
            <input type="checkbox" onChange={this.toggleCheck} checked={this.state.checked} />
            <p role="presentation" data-id={this.props.ReqId} data-statid={this.props.ReqStat} onClick={(e) => { this.props.update(e, !this.state.checked); this.toggleCheck(e); }} />
          </label>
        }
        {(!this.props.hide && !this.props.hideReq)}
      </Wrapper>
    );
  }
}

ToggleSwitch.propTypes = {
  ReqId: PropTypes.string,
  ReqStat: PropTypes.string,
  value: PropTypes.bool,
  hide: PropTypes.bool,
  hideReq: PropTypes.bool,
  update: PropTypes.func,
};

export default ToggleSwitch;
