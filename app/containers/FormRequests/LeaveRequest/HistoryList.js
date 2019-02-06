/**
 * Leave Request form component
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { DEFAULT_GUID } from 'containers/App/constants';

import Loading from 'components/LoadingIndicator/Loading';
import Row from 'components/Employee/EMPMasterlistRow';
import Status from 'components/User/Status';

export class HistoryList extends React.PureComponent {
  render() {
    const { loading, error, list, home } = this.props;
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
      // NOTE: Change how we handle the display of date without using new Date
      //       it causes conflict if user set a different timezone on his/her pc
      listItem = list.map((item) => {
        // const leaveFrom = new Date(item.LeaveFrom);
        // const leaveTo = new Date(item.LeaveTo);
        let dateFlag = false;
        let procFlag = false;
        const stepList = item.FormRequest.FormRequestStepList;
        return (
          <Row className="body" statusDot history key={item.FormRequestID}>
            <div className="cell first">
              <Status className={`${item.FormRequest.FormRequestStepList[0].FormRequestStatus.Name} status`} />
              <p>
                <span role="presentation" className="emp-name" onClick={this.rowExpand}>{item.LeaveType.Name}</span>
              </p>
            </div>
            <div className="cell" data-title="Leave Date">
              { (item.LeaveFrom === item.LeaveTo)
                ? moment(item.LeaveFrom).format('MM-DD-YYYY')
                : `${moment(item.LeaveFrom).format('MM-DD-YYYY')} To ${moment(item.LeaveTo).format('MM-DD-YYYY')}`
              }
            </div>
            {(!home) && <div className="cell" data-title="Last Date Processed">
              {/* {(item.FormRequest.FormRequestStepList[0].ApproverID !== DEFAULT_GUID) ? moment(lastModDate).format('MM-DD-YYYY') : '-'} */}
              {stepList.map((step) => {
                const id = step.ApproverID;
                if (id !== DEFAULT_GUID && !dateFlag) {
                  dateFlag = true;
                  return moment(new Date(step.LastModDate)).format('MM-DD-YYYY');
                }
                return null;
              })}
            </div>}
            {(!home) && <div className="cell" data-title="Last Processed By">
              {/* {(item.FormRequest.FormRequestStepList[0].ApproverID !== DEFAULT_GUID) ? `${item.FormRequest.FormRequestStepList[0].Approver.FirstName} ${item.FormRequest.FormRequestStepList[0].Approver.LastName}` : '-'} */}
              {stepList.map((step) => {
                const id = step.ApproverID;
                if (id !== DEFAULT_GUID && !procFlag) {
                  procFlag = true;
                  return `${step.Approver.FirstName} ${step.Approver.LastName}`;
                }
                return null;
              })}
            </div>}
            <div className="cell" data-title="Status">
              <span className={`menu-label ${item.FormRequest.FormRequestStepList[0].FormRequestStatus.Name}`}>
                {item.FormRequest.FormRequestStepList[0].FormRequestStatus.Name} ({item.FormRequest.ApprovedCount}/{item.FormRequest.RequiredApprovalCount})
              </span>
            </div>
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
            {(!home) && <div className="cell">Last Date Processed</div>}
            {(!home) && <div className="cell">Last Processed By</div>}
            <div className="cell">Status</div>
          </Row>
          {listItem}
        </div>
      );
    }

    return null;
  }
}

HistoryList.defaultProps = {
  home: false,
};

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
  home: PropTypes.bool,
};

export default HistoryList;
