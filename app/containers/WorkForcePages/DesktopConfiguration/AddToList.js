/**
 * Add To List
 * @prop {string} catName       Name of what we are adding (emp/dept/workgroup)
 * @prop {string} templateName  Name of template list will be added to
 * @prop {func}   addSelected   Function to add selected item in list
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Loading from 'components/LoadingIndicator/Loading';
import ErrorMsg from 'components/Messages/Error';
import Lists from 'components/Employee/SmallEMPList';

import AddToLists from 'components/AddToList';

/* selectors, reducer, saga and actions */
import { makeSelectLoading, makeSelectError, makeSelectData } from './selectors';

export class AddToListComponent extends React.PureComponent {
  select = (e, id) => {
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

    this.props.addSelected(id);
  }

  render() {
    const { templateName, catName, loading, error, lists } = this.props;

    if (loading) {
      return <Lists><div className="loading-cont"><Loading /></div></Lists>;
    }

    if (error) {
      if (error.ErrorCode === 204) {
        return <ErrorMsg>No Record(s) Found.</ErrorMsg>;
      }
      return <ErrorMsg>There was a problem communicating with the server. Please try again later.</ErrorMsg>;
    }

    if (lists) {
      return <AddToLists lists={lists} isMultiple={false} groupName={templateName} addTo={(id) => { this.props.addSelected(id); }} listType={catName} />;
    }

    return null;
  }
}

AddToListComponent.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  catName: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  templateName: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  addSelected: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('addToList'),
  error: makeSelectError('addToList'),
  lists: makeSelectData('addToList'),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(AddToListComponent);
