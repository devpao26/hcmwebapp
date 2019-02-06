/**
 * Template List
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Loading from 'components/LoadingIndicator/Loading';

import {
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
} from './selectors';

class TemplateListComponent extends React.PureComponent {
  selectTemplate = (e, id, item) => {
    // get all element in the list
    const childEl = e.currentTarget.parentNode.children;

    // get the clicked element
    const targetEl = e.currentTarget;

    // Iterate through all the element and toggle the class
    for (let i = 0; i < childEl.length; i += 1) {
      if (targetEl !== childEl[i]) {
        childEl[i].classList.remove('active');
      } else {
        childEl[i].classList.add('active');
      }
    }

    // Pass our ID on the parent component
    this.props.getTemplateId(id, item);
  }

  render() {
    const { loading, error, lists } = this.props;

    let items = (<div className="list"><p className="message">No Record(s) Found.</p></div>);

    if (loading) {
      return <div className="list"><Loading /></div>;
    }

    if (error) {
      if (error.ErrorCode === 204) {
        return <div className="list"><p className="message">No Record(s) Found.</p></div>;
      }
      return <div className="list"><p className="message">Something went wrong, please try again</p></div>;
    }

    if (lists) {
      items = lists.map((item, index) =>
        <p role="presentation" key={item.CutoffTemplateID} className={(index === 0) ? 'list-item active' : 'list-item'} onClick={(e) => { this.selectTemplate(e, item.CutoffTemplateID, item); }}>{item.Name}</p>
      );

      return (
        <div className="list">
          {items}
        </div>
      );
    }

    return null;
  }
}

TemplateListComponent.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  getTemplateId: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('templateList'),
  error: makeSelectError('templateList'),
  lists: makeSelectData('templateList'),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(TemplateListComponent);
