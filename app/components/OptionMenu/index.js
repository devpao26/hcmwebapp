/**
 * Option Menu
 *
 * Props: title, position (value: left, right, bottom), icon (value: arrowdown default: ellipsis), width
 * Usage: <OptionMenu title="Option Menu Title" position="left, right, bottom" icon="ellipsis, arrowdown" width="100px">{children}</OptionMenu>
 */

import React, { Children } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEllipsisV, faCaretDown, faPlus } from '@fortawesome/fontawesome-free-solid';

/* Global Components */

/* Styles */
import Wrapper from './Wrapper';

// Our Button Style
const Button = styled.button`
  font-size: 1.2em;
  width: 18px;
  text-align: center;
  outline: 0;
  cursor: pointer;

  &:hover {
    opacity: .8;
  }

  .svg-inline--fa {
    color: inherit;
  }
`;

class OptionMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      optionMenu: false,
    };
    this.hideOptionMenu = this.hideOptionMenu.bind(this);
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
    const container = this.container;
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
    let icon = <FontAwesomeIcon icon={faEllipsisV} />;

    if (this.props.icon === 'arrowdown') {
      icon = <FontAwesomeIcon icon={faCaretDown} />;
    } else if (this.props.icon === 'plus') {
      icon = <FontAwesomeIcon icon={faPlus} />;
    }

    return (
      <div className="option-menu" ref={(el) => { this.container = el; }}>
        { this.props.filterButton !== true
          ? (<Button onClick={this.showOptions}>{icon}</Button>)
          : (<span className="option-filter" role="presentation" onClick={this.showOptions}>Filters <FontAwesomeIcon icon={faCaretDown} /></span>)
        }

        { this.state.optionMenu &&
          <Wrapper position={this.props.position} width={this.props.width}>
            {title}
            {Children.toArray(this.props.children)}
          </Wrapper>
        }
      </div>
    );
  }
}

OptionMenu.defaultProps = {
  filterButton: false,
};

OptionMenu.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  position: PropTypes.string,
  width: PropTypes.string,
  icon: PropTypes.string,
  filterButton: PropTypes.bool,
};

export default OptionMenu;
