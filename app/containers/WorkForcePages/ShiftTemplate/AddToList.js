/**
 * Add To List
 * @prop {string} catName     Name of what we are adding (emp/dept/workgroup)
 * @prop {func}   addSelected Function to add selected item in list
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Loading from 'components/LoadingIndicator/Loading';
import Lists from 'components/Employee/SmallEMPList';
import Avatar from 'components/Img/Avatar';

/* selectors, reducer, saga and actions */
import {
  makeSelectListsLoading,
  makeSelectData,
  makeSelectListsError,
} from './selectors';

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
    const { catName, loading, error, lists } = this.props;
    let items;

    if (loading) {
      return <Lists><div className="loading-cont"><Loading /></div></Lists>;
    }

    if (error) {
      if (error.ErrorCode === 204) {
        return <Lists><dl className="message">No Record(s) Found.</dl></Lists>;
      }
      return <Lists><dl className="message">No Record(s) Found.</dl></Lists>;
    }

    if (lists) {
      if (catName === 'Department') {
        items = lists.map((item) => (
          <dl role="presentation" key={item.DeptID} onClick={(e) => { this.select(e, item.DeptID); }}>
            <dd>
              <h4>{item.Name}</h4>
            </dd>
          </dl>
        ));
      }

      if (catName === 'Workgroup') {
        items = lists.map((item) => (
          <dl role="presentation" key={item.TeamID} onClick={(e) => { this.select(e, item.TeamID); }}>
            <dd>
              <h4>{item.Name}</h4>
            </dd>
          </dl>
        ));
      }

      if (catName === 'Employee') {
        items = lists.map((item) => (
          <dl role="presentation" key={item.EmpProfileID} onClick={(e) => { this.select(e, item.EmpProfileID); }}>
            <dt>
              { (item.EmpAvatarAttachs != null)
                ? <Avatar bgImage={`url('${item.EmpAvatarAttachs.Path}')`} />
                : <Avatar />
              }
            </dt>
            <dd>
              <p>
                {item.LastName}, {item.FirstName}
                <span>{item.Email}</span>
              </p>
            </dd>
          </dl>
        ));
      }

      return <Lists>{items}</Lists>;
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
  addSelected: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectListsLoading('addToList'),
  error: makeSelectListsError('addToList'),
  lists: makeSelectData('addToList'),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(AddToListComponent);
