/**
 * Number Increase Decrease
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/fontawesome-free-solid';

const Wrapper = styled.span`
  input,
  button {
    display: inline-block;
    vertical-align: middle;
  }

  input {
    border-bottom: 1px solid #d3d6db;
    width: 50px;
    padding: 3px 5px;
    margin-right: 3px;
  }

  button {
    cursor: pointer;

    &[disabled] {
      opacity: .5;
      cursor: default;
    }
  }
`;

export class IncDecNum extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      keycode: 0,
      count: this.props.initial,
      validNum: false,
    };
  }

  onSetValue = (e) => {
    this.setState({
      count: e.currentTarget.value,
    });
  }

  // onBlur = () => {
  //   const val = this.state.count;
  //   const regex = /^\d+(\.\d{1}(5))?$/;

  //   if (regex.test(val)) {
  //     console.log('valid');
  //     this.setState({
  //       validNum: false,
  //     });
  //   } else {
  //     console.log('invalid');
  //     this.setState({
  //       validNum: true,
  //     });
  //   }
  // }

  increaseCount = (e) => {
    e.preventDefault();
    if (this.state.count >= '0') {
      const count = +this.state.count + 1;

      this.setState({
        count,
      });

      this.props.getValue(count);
    }
  }

  decreaseCount = (e) => {
    e.preventDefault();
    if (this.state.count > '0' && this.state.count > '0.9') {
      const count = +this.state.count - 1;

      this.setState({
        count,
      });

      this.props.getValue(count);
    }
  }

  render() {
    return (
      <Wrapper className="inc-dec-num">
        <input value={this.state.count} type="text" onChange={this.onSetValue} />
        <button onClick={this.decreaseCount} disabled={this.state.validNum}>
          <FontAwesomeIcon icon={faMinusCircle} />
        </button>
        <button onClick={this.increaseCount} disabled={this.state.validNum}>
          <FontAwesomeIcon icon={faPlusCircle} />
        </button>
      </Wrapper>
    );
  }
}

IncDecNum.defaultProps = {
  initial: '0.0',
};

IncDecNum.propTypes = {
  initial: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  getValue: PropTypes.func,
};

export default IncDecNum;
