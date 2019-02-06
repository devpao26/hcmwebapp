/**
 * Leave Request form component
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { DEFAULT_GUID } from 'containers/App/constants';

import Loading from 'components/LoadingIndicator/Loading';
import Row from 'components/Employee/EMPMasterlistRow';
import Status from 'components/User/Status';

import { makeSelectLoading, makeSelectError, makeSelectData } from './selectors';

export class HistoryList extends React.PureComponent {
  // For Mobile expanding rows
  rowExpand = (e) => {
    // Get our Parent Row
    const parentRow = e.currentTarget.parentNode.parentNode.parentNode;
    // Toggle expand class
    parentRow.classList.toggle('expand');
  }

  render() {
    const { loading, error, list } = this.props;
    let listItem;

    if (loading) {
      return <div className="row-container"><Loading /></div>;
    }

    if (error) {
      if (error.ErrorCode === 204) {
        return <div className="row-container"><p className="message">No Record(s) Found.</p></div>;
      }
      return <div className="row-container"><p className="message">Something went wrong, please try again.</p></div>;
    }

    if (list) {
      listItem = list.map((item) => {
        const leaveFrom = new Date(item.LeaveFrom);
        const leaveTo = new Date(item.LeaveTo);
        const createdDate = new Date(item.CreatedDate);
        return (
          <Row className="body" statusDot history key={item.FormRequestID}>
            <div className="cell first">
              <Status className={`${item.FormRequest.FormRequestStepList[0].FormRequestStatus.Name} status`} />
              <p>
                <span role="presentation" className="emp-name" onClick={this.rowExpand}>{item.LeaveType.Name}</span>
              </p>
            </div>
            <div className="cell" data-title="Leave Date(s)">
              {(item.LeaveFrom === item.LeaveTo)
                ? moment(leaveFrom).format('MM-DD-YYYY')
                : `${moment(leaveFrom).format('MM-DD-YYYY')} To ${moment(leaveTo).format('MM-DD-YYYY')}`
              }
            </div>
            <div className="cell" data-title="Status">
              <span className={`menu-label ${item.FormRequest.FormRequestStepList[0].FormRequestStatus.Name}`}>{item.FormRequest.FormRequestStepList[0].FormRequestStatus.Name}</span>
            </div>
            <div className="cell" data-title="Date Requested">{moment(createdDate).format('MM-DD-YYYY')}</div>
            <div className="cell" data-title="Processed By">{(item.FormRequest.FormRequestStepList[0].ApproverID !== DEFAULT_GUID) ? `${item.FormRequest.FormRequestStepList[0].Approver.FirstName} ${item.FormRequest.FormRequestStepList[0].Approver.LastName}` : '-'}</div>
            <div className="cell" data-title="View Details"><a role="presentation" className="link-to" onClick={(e) => { e.preventDefault(); this.props.viewDetails(item); }} title="View Leave Details">View</a></div>
          </Row>
        );
      });

      return (
        <div className="row-container">
          {/* <Row className="head" statusDot>
            <div className="cell">Leave Type <span className="sort fa fa-caret-down" /></div>
            <div className="cell">Leave Date <span className="sort fa fa-caret-down" /></div>
            <div className="cell">Date Processed <span className="sort fa fa-caret-down" /></div>
            <div className="cell">Processed By <span className="sort fa fa-caret-down" /></div>
            <div className="cell">Status <span className="sort fa fa-caret-down" /></div>
          </Row> */}
          <Row className="head" statusDot>
            <div className="cell">Leave Type</div>
            <div className="cell">Leave Date(s)</div>
            <div className="cell">Status</div>
            <div className="cell">Date Requested</div>
            <div className="cell">Last Processed By</div>
            <div className="cell">View Details</div>
          </Row>
          {listItem}
        </div>
      );
    }

    return null;
  }
}

HistoryList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  list: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  viewDetails: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('empLeaves'),
  error: makeSelectError('empLeaves'),
  list: makeSelectData('empLeaves'),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(HistoryList);
