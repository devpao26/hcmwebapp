/**
 * Payroll Processing Waive (Deductions and Earnings)
 *
 * Props: title
 * Usage: <Waive title="Option Menu Title">{children}</Waive>
 */

import React, { Children } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'components/Button';

/* Styles */
const Wrapper = styled.div`
  display: inline-block;
  position: relative;

  .main-check {
    color: #2abb9c;
    min-width: 58px;

    input {
      // display: none;
    }

    .fa,
    span {
      display: inline-block;
      vertical-align: middle;
    }

    .fa {
      margin-top: -1px;
    }

    .fa-square-o {
      margin-right: 2px;
    }

    span {
      margin-left: 3px;
      cursor: pointer;

      &:hover {
        opacity: .8;
      }
    }
  }

  .options {
    position: absolute;
    font-size: 13px;
    top: 0;
    right: calc(100% + 3px);
    width: 200px;
    box-shadow: 0 5px 10px 1px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    background-color: #fff;

    h2 {
      background-color: #2b3131;
      color: #fff;
      margin: 0 0 10px;
      padding: 5px 10px;
      font-weight: 400;
      font-size: .9em;
      box-shadow: 0 5px 12px 2px rgba(0, 0, 0, 0.12);
    }

    button {
      display: block;
      text-align: center;
      cursor: pointer;
      outline: 0;
      font-size: .85em;
      width: 100%;
      padding: 8px;
      border-bottom: 1px solid #e5e6eb;

      &.active,
      &:hover {
        background-color: #f8f8f8;
      }
    }
  }
`;

class Waive extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      showOptions: false,
      icon: 'fa fa-square-o',
      isChecked: this.props.isChecked
    }
  }
  // Add Listener when component mounts
  componentDidMount() {
    document.addEventListener('click', this.hideOptionMenu);
  }
  // Remove Listener when component unmounts
  componentWillUnmount() {
    document.removeEventListener('click', this.hideOptionMenu);
  }

  // Check if our Props has changed it's value
  componentDidUpdate() {
    if (this.props.isChecked) {
      this.setState({
        icon: 'fa fa-check-square-o',
        isChecked: this.props.isChecked
      }); 
    } else {
      this.setState({
        icon: 'fa fa-square-o',
        isChecked: this.props.isChecked
      });
    }
  }

  showOptions = (e) => {
    e.preventDefault();
    this.setState({
      showOptions: !this.state.showOptions
    });
  }

  hideOptionMenu = (e) => {
    let {container} = this.refs;
    const {target} = e;
    // if target is container - container was not clicked outside
    // if container contains clicked target - click was not outside of it
    if (target !== container && !container.contains(target)) {
      this.setState({
        showOptions: false,
      });
    }
  }

  render() {
    const { title, children } = this.props;

    return (
      <div className="waive" ref="container">
        <Wrapper>
          <div className="main-check">
            <i className={this.state.icon} />
            <span onClick={this.showOptions}>WAIVE</span>
          </div>
          { this.state.showOptions && (
              <div className="options">
                <h2>{title}</h2>
                {Children.toArray(children)}
              </div>
            )
          }
        </Wrapper>
      </div>
    );
  }
}

Waive.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired
};

export default Waive;