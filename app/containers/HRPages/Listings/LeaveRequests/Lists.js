/**
 * Leave Request form component
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  FORMREQUEST_REJECT,
} from 'containers/App/constants';

import Loading from 'components/LoadingIndicator/Loading';
import Row from 'components/Forms/ListingRow';
import Status from 'components/User/Status';
import { convertPastTense } from 'components/Methods';

export class HistoryList extends React.PureComponent {
  // For Mobile expanding rows
  rowExpand = (e) => {
    // Get our Parent Row
    const parentRow = e.currentTarget.parentNode.parentNode.parentNode;
    // Toggle expand class
    parentRow.classList.toggle('expand');
  }

  render() {
    const { loading, error, lists } = this.props;

    if (loading) {
      return <div className="row-container"><Loading /></div>;
    }

    if (error) {
      if (error.ErrorCode === 204) {
        return <div className="row-container"><p className="message">No Record(s) Found.</p></div>;
      }
      return <div className="row-container"><p className="message">Something went wrong, please try again.</p></div>;
    }

    if (lists) {
      const listItem = lists.map((item, index) => {
        const employeeName = `${item.FormRequest.EmpProfile.FirstName} ${item.FormRequest.EmpProfile.LastName}`;
        // const leaveFrom = new Date(item.LeaveFrom);
        // const leaveTo = new Date(item.LeaveTo);
        const isRejected = (item.FormRequest.FormRequestStatusID === FORMREQUEST_REJECT || item.FormRequest.IsCompleted) ? convertPastTense(item.FormRequest.FormRequestStepList[0].FormRequestStatus.Name) : item.FormRequest.FormRequestStepList[0].FormRequestStatus.Name;
        const status = (item.FormRequest.ApproverPassedStep) ? convertPastTense(item.FormRequest.ApproverPassedStep.FormRequestStatus.Name) : isRejected;

        return (
          <Row className="body" statusDot twoSmall key={item.FormRequestID}>
            <div className="cell first">
              <Status className={`${status} status`} />
              <p>
                <span role="presentation" className="emp-name" onClick={this.rowExpand}>{item.FormRequest.EmpProfile.LastName}, {item.FormRequest.EmpProfile.FirstName}</span>
                <small>{(item.FormRequest.EmpProfile.JobRole) ? item.FormRequest.EmpProfile.JobRole.Name : 'No Selected Job Role'}</small>
                <small>{(item.FormRequest.EmpProfile.WorkGroup) ? `${item.FormRequest.EmpProfile.WorkGroup[0].Department.Name} - ${item.FormRequest.EmpProfile.WorkGroup[0].Team ? item.FormRequest.EmpProfile.WorkGroup[0].Team.Name : 'Not Assigned in Team'}` : 'No Assigned WorkGroup'}</small>
              </p>
            </div>
            <div className="cell" data-title="Leave Type">{item.LeaveType.Name}</div>
            <div className="cell" data-title="Leave Dates">
              {(item.LeaveFrom === item.LeaveTo)
                ? moment(item.LeaveFrom).format('MM-DD-YYYY')
                : `${moment(item.LeaveFrom).format('MM-DD-YYYY')} to ${moment(item.LeaveTo).format('MM-DD-YYYY')}`
              }
            </div>
            <div className="cell" data-title="Date Requested">{moment(new Date(item.CreatedDate)).format('MM-DD-YYYY')}</div>
            <div className="cell" data-title="General Status"><span className={`menu-label ${status}`}>{status}</span></div>
            <div className="cell" data-title="View Details"><a role="presentation" className="link-to" onClick={(e) => { this.props.viewDetails(e, item.FormRequestID, employeeName, index); }}>View Details</a></div>
          </Row>
        );
      });

      return (
        <div className="row-container">
          <Row className="head" statusDot>
            <div className="cell">Employee Name</div>
            <div className="cell">Leave Type</div>
            <div className="cell">Leave Dates</div>
            <div className="cell">Date Requested</div>
            <div className="cell">General Status</div>
            <div className="cell">View Details</div>
          </Row>
          {listItem}
        </div>
      );
    }

    return <div className="row-container"><Loading /></div>;
  }
}

HistoryList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  viewDetails: PropTypes.func.isRequired,
};

export default HistoryList;
