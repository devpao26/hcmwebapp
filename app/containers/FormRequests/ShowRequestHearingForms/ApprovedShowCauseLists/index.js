import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

/**  Global Components **/
import Loading from 'components/LoadingIndicator/Loading';
import EMPList from 'components/Employee/SmallEMPList';
import { FORMREQUEST_APPROVE } from 'containers/App/constants';

import { makeSelectLoading, makeSelectError, makeSelectObjectList } from '../selector';

class ApprovedShowCauseComponent extends React.PureComponent {
  select = (e, violation, showcausememoid) => {
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
    this.props.selectSCM(violation, showcausememoid);
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
      items = lists.map((item) => {
        const approvedEmployees = item.FormRequest.EmpProfile;
        const approved = item.FormRequest.FormRequestStepList[0];
        const approvedList = approved.FormRequestStatus;
        
        if (approvedList.Name === 'Approve' && approvedList.ID === FORMREQUEST_APPROVE) {
          return (
            <div role="presentation" key={approvedEmployees.SCMRequestID} className="approved-list" onClick={(e) => { e.preventDefault(); this.select(e, item.SCMRequestID); }}>
              <p> {approvedEmployees.LastName}, {approvedEmployees.FirstName} </p>
              <span> {`Date of Incident: ${moment(item.IncidentDate).format('YYYY-MM-DD')}`} </span> <br />
              <span> {`Possible Rule Violation: ${item.RuleViolation.Name}`} </span>
            </div>);
        }
      });

      return (
        <EMPList>
          {items}
        </EMPList>
      );
    }
    return null;
  }
}

ApprovedShowCauseComponent.propTypes = {
  selectSCM: PropTypes.func,
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
  loading: makeSelectLoading('approvedrefs'),
  error: makeSelectError('approvedrefs'),
  lists: makeSelectObjectList('approvedrefs'),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(ApprovedShowCauseComponent);
