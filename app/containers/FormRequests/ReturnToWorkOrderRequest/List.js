import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

/**  Global Components **/
import Loading from 'components/LoadingIndicator/Loading';
import Avatar from 'components/Img/Avatar';
import EMPList from 'components/Employee/SmallEMPList';

import { makeSelectLoading, makeSelectError, makeSelectObjectList } from './selector';

class EmpListComponent extends React.PureComponent {
  select = (e, empProfileID, empFirstName, empLastName, empJobRole) => {
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

    this.props.selectEmp(empProfileID, empFirstName, empLastName, empJobRole);
  }
  render() {
    const { loading, error, lists } = this.props;
    let items;

    if (loading) return <span><Loading /></span>;

    if (error) {
      if (error.ErrorCode === 204) {
        return <p className="error-msg">No Record(s) Found.</p>;
      }
      return <p className="error-msg">There is a problem communicating with the server. Please try again later.</p>;
    }

    if (lists) {
      items = lists.map((item) => (
        <dl role="presentation" key={item.EmpProfileID} className="cont" onClick={(e) => { this.select(e, item.EmpProfileID, item.FirstName, item.LastName, item.JobRole.Name); }}>
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

      return (
        <EMPList>
          {items}
        </EMPList>
      );
    }
    return null;
  }
}

EmpListComponent.propTypes = {
  selectEmp: PropTypes.func,
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
  loading: makeSelectLoading('employeelists'),
  error: makeSelectError('employeelists'),
  lists: makeSelectObjectList('employeelists'),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(EmpListComponent);
