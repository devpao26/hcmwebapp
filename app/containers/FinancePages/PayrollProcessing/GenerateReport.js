/**
 * Generate Report Option
 *
 * Props: title
 * Usage: <GenerateReport title="Option Menu Title">{children}</GenerateReport>
 */

import React, { Children } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { media } from 'components/StyleUtils';
import Button from 'components/Button';

/* Styles */
const Wrapper = styled.nav`
  position: absolute;
  font-size: 13px;
  bottom: 0;
  right: calc(100% + 3px);
  width: ${(props) => props.width ? props.width : '200px'};
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

  button,
  a {
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

  ${media.tablet`
    top: -96px;
    right: 0px;

    h2 {
      display: block;
    }
  `}

  ${media.handheld`
    top: -96px;
    right: -25px;
  `}
`;

class GenerateReport extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      optionMenu: false,
    };
  }
  // Add Listener when component mounts
  componentDidMount() {
    document.addEventListener('click', this.hideOptionMenu);
  }
  // Remove Listener when component unmounts
  componentWillUnmount() {
    document.removeEventListener('click', this.hideOptionMenu);
  }

  showOptions = (e) => {
    e.preventDefault();

    this.setState({
      optionMenu: !this.state.optionMenu,
    });
  }

  hideOptionMenu = (e) => {
    const container = this.optionMenu;
    const { target } = e;
    // if target is container - container was not clicked outside
    // if container contains clicked target - click was not outside of it
    if (target !== container && !container.contains(target)) {
      this.setState({
        optionMenu: false,
      });
    }
  }

  render() {
    const title = (<h2> {this.props.title} </h2>);

    return (
      <div className={(this.props.disabled === 'false') ? 'option-menu disabled' : 'option-menu'} ref={(el) => { this.optionMenu = el; }}>
        <Button handleRoute={this.showOptions} color="green" className={(!this.props.disabled) && 'disabled'}> {this.props.buttonText} </Button>
        { this.state.optionMenu &&
          <Wrapper>
            {title}
            {Children.toArray(this.props.children)}
          </Wrapper>
        }
      </div>
    );
  }
}

GenerateReport.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};

export default GenerateReport;
