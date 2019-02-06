/**
 * OT Request List component
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  FORMREQUEST_PENDING,
  FORMREQUEST_APPROVE,
  FORMREQUEST_REJECT,
} from 'containers/App/constants';

import Loading from 'components/LoadingIndicator/Loading';
import Row from 'components/Forms/ListingRow';
import Status from 'components/User/Status';
import OptionMenu from 'components/OptionMenu';
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
        // const otFrom = new Date(item.OTFrom);
        // const otTo = new Date(item.OTTo);
        const isRejected = (item.FormRequest.FormRequestStatusID === FORMREQUEST_REJECT || item.FormRequest.IsCompleted) ? convertPastTense(item.FormRequest.FormRequestStepList[0].FormRequestStatus.Name) : item.FormRequest.FormRequestStepList[0].FormRequestStatus.Name;
        const status = (item.FormRequest.ApproverPassedStep) ? convertPastTense(item.FormRequest.ApproverPassedStep.FormRequestStatus.Name) : isRejected;
        let dept;
        let team;
        if (item.FormRequest.EmpProfile.WorkGroup) {
          dept = item.FormRequest.EmpProfile.WorkGroup[0].Department ? item.FormRequest.EmpProfile.WorkGroup[0].Department.Name : 'No Assigned in Department.';
          team = item.FormRequest.EmpProfile.WorkGroup[0].Team ? item.FormRequest.EmpProfile.WorkGroup[0].Team.Name : 'Not Assigned in Team.';
        }

        return (
          <Row className="body" statusDot twoSmall key={item.OTRequestID}>
            <div className="cell first">
              <Status className={`${status} status`} />
              <p>
                <span role="presentation" className="emp-name" onClick={this.rowExpand}>{item.FormRequest.EmpProfile.LastName}, {item.FormRequest.EmpProfile.FirstName}</span>
                <small>{(item.FormRequest.EmpProfile.JobRole) ? item.FormRequest.EmpProfile.JobRole.Name : 'No Selected Job Role'}</small>
                <small>{dept} - {team}</small>
              </p>
            </div>
            <div className="cell" data-title="Auto Request">
              {item.IsAutoRequest ? 'Yes' : 'No'}
            </div>
            <div className="cell" data-title="Requested OT (mins)">
              {item.RequestedOTMinutes} mins
            </div>
            <div className="cell" data-title="OT Date">
              {`${moment(item.OTFrom).format('MM-DD-YYYY')} to ${moment(item.OTTo).format('MM-DD-YYYY')}`}
            </div>
            <div className="cell" data-title="Date Requested">{moment(new Date(item.CreatedDate)).format('MM-DD-YYYY')}</div>
            { (item.FormRequest.FormRequestStatusID === FORMREQUEST_PENDING && item.FormRequest.IsPendingOfApprover && !item.FormRequest.IsEscalated)
              ? <div className="menu">
                <span className="menu-label">{status}</span>
                <OptionMenu title="Action" position="bottom" icon="arrowdown">
                  <button onClick={(e) => { this.props.viewDetails(e, item.FormRequestID, employeeName, index); }}>View Details</button>
                  <button onClick={(e) => { this.props.update(e, item.FormRequestID, FORMREQUEST_APPROVE, employeeName); }}>Approve</button>
                  <button onClick={(e) => { this.props.update(e, item.FormRequestID, FORMREQUEST_REJECT, employeeName); }}>Reject</button>
                  {/* <button onClick={(e) => { this.props.update(e, item.FormRequestID, FORMREQUEST_CANCEL, employeeName) }}>Cancel</button>
                  <button onClick={(e) => { this.props.update(e, item.FormRequestID, FORMREQUEST_REMOVE, employeeName) }}>Remove</button> */}
                </OptionMenu>
              </div>
              : <div className="menu">
                <span className={`menu-label ${status}`}>{status}</span>
                <OptionMenu title="Action" position="bottom" icon="arrowdown">
                  <button onClick={(e) => { this.props.viewDetails(e, item.FormRequestID, employeeName, index); }}>View Details</button>
                </OptionMenu>
              </div>
            }
          </Row>
        );
      });

      return (
        <div className="row-container">
          <Row className="head" statusDot>
            <div className="cell">Employee Name</div>
            <div className="cell">Auto Request</div>
            <div className="cell">Requested OT (mins)</div>
            <div className="cell">OT Date</div>
            <div className="cell">Date Requested</div>
            <div className="cell"></div>
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
  update: PropTypes.func.isRequired,
};

export default HistoryList;
