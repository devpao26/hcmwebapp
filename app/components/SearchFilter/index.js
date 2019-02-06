/**
 * Filter Menu
 *
 * Props: search (true or false)
 *        onClick (function/action when submitting form)
 *        width (width for the search form if none is declared defaults to 100%)
 *        placeholder (default placeholder for the input)
 *        formRef (function to reset the form note: this must be in form of react ref)
 *        defaultVal (default value of our search input)
 * Usage: <Filter search />
 */

import React, { Children } from 'react';
import { PropTypes } from 'prop-types';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/fontawesome-free-solid';
import { faTimesCircle } from '@fortawesome/fontawesome-free-regular';

/* Global Components */
import Input from 'components/Input';

/* Styles */
import Wrapper from './Wrapper';

class SearchFilter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      input: (this.props.defaultVal) ? this.props.defaultVal : '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      input: nextProps.defaultVal,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onClick(this.state.input);
  }

  onResetSubmit = (e) => {
    e.preventDefault();
    this.setState({
      input: '',
    });
    this.props.onClick();
  }

  changeInputVal = (e) => {
    this.setState({
      input: e.target.value,
    });
  }

  render() {
    let search = '';

    if (this.props.search) {
      search = (
        <form ref={this.props.formRef}>
          <Input type="text" placeholder={this.props.placeholder} onChange={this.changeInputVal} value={this.state.input} />
          <button type="submit" onClick={this.onSubmit} className="btn-search"><FontAwesomeIcon icon={faSearch} /></button>
          { (this.state.input) && <button onClick={this.onResetSubmit} className="btn-reset"><FontAwesomeIcon icon={faTimesCircle} /></button>}
        </form>
      );
    }
    return (
      <Wrapper className="search-filter" wrapWidth={this.props.width}>
        {search}
        { (this.props.children) &&
          <span className="filter-buttons">
            {Children.toArray(this.props.children)}
          </span>
        }
      </Wrapper>
    );
  }
}

SearchFilter.defaultProps = {
  placeholder: 'Search Query...',
  width: '300px',
  defaultVal: '',
};

SearchFilter.propTypes = {
  children: PropTypes.node,
  search: PropTypes.bool,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  width: PropTypes.string,
  formRef: PropTypes.func,
  defaultVal: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};

export default SearchFilter;
