/**
 * Template List component
 * @prop {function} select  Function for selecting template
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Loading from 'components/LoadingIndicator/Loading';
import { parseDate } from 'components/Methods';
import DateFormat from 'components/Enums/DateFormat';

/* selectors and actions */
import { makeSelectLoading, makeSelectError, makeSelectData } from './selectors';

import {
} from './actions';

class TemplateListComponent extends React.PureComponent {
  selectTemplate = (e, id, details) => {
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
    this.props.select(id, details);
  }

  render() {
    const { loading, error, lists } = this.props;

    if (loading) return <div className="loading-cont"><Loading /></div>;

    if (error) {
      if (error.ErrorCode === 204) {
        return <div className="message">No Record(s) Found.</div>;
      }
      return <div className="message">There was a problem communicating with the server. Please try again later.</div>;
    }

    if (lists) {
      const items = lists.map((item) => (
        <li key={item.WorkMonitoringTemplateID} role="presentation" onClick={(e) => { this.selectTemplate(e, item.WorkMonitoringTemplateID, item); }}>
          {item.Name}
          <small>Last Modified Date: {parseDate(item.LastModDate, DateFormat.Number)}</small>
        </li>
      ));
      return (
        <ul className="lists">
          {items}
        </ul>
      );
    }

    return null;
  }
}

TemplateListComponent.propTypes = {
  select: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
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
