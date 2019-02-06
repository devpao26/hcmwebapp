/**
 * Employee List Component
 * @prop {func} createAccess  Function to call for creating access form
 * @prop {func} changeStatus  Function to call for changing emp status
 * @prop {func} sendPass      Function to call for sending new password
 * @prop {func} updateEmail   Function to call for updating employee email
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

/**  Global Components **/
import Loading from 'components/LoadingIndicator/Loading';

/* OptionMenu Components */
import OptionMenu from 'components/OptionMenu';
import Avatar from 'components/Img/Avatar';
import Row from 'components/Employee/EMPMasterlistRow';

// Global Static Constants
import {
  EMP_STATUS_ACTIVE,
  EMP_STATUS_INACTIVE,
  EMP_STATUS_BLOCKED,
  EMP_STATUS_TERMINATED,
  EMP_STATUS_RESIGNED,
  EMP_STATUS_SUSPENDED,
  EMP_STATUS_NEW,
} from 'containers/App/constants';

import { makeSelectLoading, makeSelectError, makeSelectData } from './selector';

class ShowLists extends React.PureComponent {
  // Expand Section On Smaller Devices
  rowExpand = (e) => {
    // Get our Parent Row
    const parentRow = e.currentTarget.parentNode.parentNode.parentNode;
    // Toggle expand class
    parentRow.classList.toggle('expand');
  }

  render() {
    const { loading, error, lists, createAccess, changeStatus, sendPass, updateEmail } = this.props;
    let items;

    if (loading) return <div className="row-container"><Loading /></div>;

    if (error) {
      if (error.ErrorCode === 204) {
        return <div className="row-container"><p className="message">No Record(s) Found.</p></div>;
      }
      return <div className="row-container"><p className="message">There is a problem communicating with the server. Please try again later.</p></div>;
    }

    if (lists) {
      // Should be an array instead of null
      if (lists) {
        items = lists.map((item) => {
          const empName = `${item.FirstName} ${item.LastName}`;
          return (
            <Row className="body" key={item.EmpProfileID}>
              <div className="cell first">
                { (item.EmpAvatarAttachs != null)
                  ? <Avatar bgImage={`url('${item.EmpAvatarAttachs.Path}')`} />
                  : <Avatar />
                }
                <p>
                  <span role="presentation" className="emp-name" onClick={this.rowExpand}>{item.LastName}, {item.FirstName}</span>
                  <small>{item.ComSiteLoc.Name}</small>
                </p>
              </div>
              <div className="cell" data-title="ID No.">{item.EmpID.EmpIDNo}</div>
              <div className="cell" data-title="Date Hired"> - </div>
              <div className="cell" data-title="Position">{item.JobRole.Name !== '' ? item.JobRole.Name : '-'}</div>
              <div className="cell" data-title="WorkGroup">{(item.WorkGroup.length !== 0) ? item.WorkGroup[0].Team.Name : '-'}</div>
              <div className="cell" data-title="Department">{(item.WorkGroup.length !== 0) ? item.WorkGroup[0].Department.Name : '-'}</div>
              <div className="cell" data-title="Employment Status">{(item.EmploymentStatus.Name) ? item.EmploymentStatus.Name : '-'}</div>
              <div className="cell" data-title="IT Access Status">
                <span className={`stat-${(item.EmpStatus.Name) && item.EmpStatus.Name}`}>{item.EmpStatus.Name}</span>
              </div>
              <div className="menu">
                {
                  (item.EmpStatusID === EMP_STATUS_ACTIVE) &&
                  (<OptionMenu title="Options" position="left">
                    <button onClick={(e) => { changeStatus(e, empName, item.EmpProfileID, EMP_STATUS_BLOCKED, 'Block'); }}>Block</button>
                    <button onClick={(e) => { changeStatus(e, empName, item.EmpProfileID, EMP_STATUS_SUSPENDED, 'Suspend'); }}>Suspend</button>
                    <button onClick={(e) => { changeStatus(e, empName, item.EmpProfileID, EMP_STATUS_TERMINATED, 'Terminate'); }}>Terminate</button>
                    <button onClick={(e) => { updateEmail(e, item.Email, item.EmpProfileID, empName); }}>Update Email</button>
                    {/* <button onClick={() => { this.props.getProf(item); this.props.viewProf(); }}>View Profile</button> */}
                  </OptionMenu>)
                }
                { (item.EmpStatusID === EMP_STATUS_BLOCKED) &&
                  (<OptionMenu title="Options" position="left">
                    <button onClick={(e) => { changeStatus(e, empName, item.EmpProfileID, EMP_STATUS_ACTIVE, 'Unblock'); }}>Unblock</button>
                    <button onClick={(e) => { sendPass(e, empName, item.EmpProfileID); }}>Send New Password</button>
                    <button onClick={(e) => { updateEmail(e, item.Email, item.EmpProfileID, empName); }}>Update Email</button>
                    {/* <button onClick={() => { this.props.getProf(item); this.props.viewProf(); }}>View Profile</button> */}
                  </OptionMenu>)
                }
                { (item.EmpStatusID === EMP_STATUS_SUSPENDED) &&
                  (<OptionMenu title="Options" position="left">
                    <button onClick={(e) => { changeStatus(e, empName, item.EmpProfileID, EMP_STATUS_ACTIVE, 'Reactivate'); }}>Reactivate</button>
                    <button onClick={(e) => { updateEmail(e, item.Email, item.EmpProfileID, empName); }}>Update Email</button>
                    {/* <button onClick={() => { this.props.getProf(item); this.props.viewProf(); }}>View Profile</button> */}
                  </OptionMenu>)
                }
                { (item.EmpStatusID === EMP_STATUS_NEW) &&
                  (<OptionMenu title="Options" position="left">
                    <button onClick={(e) => { createAccess(e, empName, item.EmpProfileID, EMP_STATUS_NEW, 'Create Access'); }}>Create Access Form</button>
                  </OptionMenu>)
                }
                { (item.EmpStatusID === EMP_STATUS_INACTIVE) && ''}
                { (item.EmpStatusID === EMP_STATUS_TERMINATED) && '' }
                { (item.EmpStatusID === EMP_STATUS_RESIGNED) && '' }
              </div>
            </Row>
          );
        });
      }

      return (
        <div className="row-container">
          <Row className="head">
            <div className="cell" data-title="name">Name</div>
            <div className="cell">ID No.</div>
            <div className="cell" data-title="date-hired">Date Hired</div>
            <div className="cell" data-title="position">Position</div>
            <div className="cell" data-title="workgroup">WorkGroup</div>
            <div className="cell" data-title="department">Department</div>
            <div className="cell" data-title="emp-status">Employment Status</div>
            <div className="cell" data-title="it-access">IT Access Status</div>
          </Row>
          {items}
        </div>
      );
    }
    return null;
  }
}

ShowLists.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  createAccess: PropTypes.func,
  changeStatus: PropTypes.func,
  sendPass: PropTypes.func,
  updateEmail: PropTypes.func,
  getProf: PropTypes.func,
  viewProf: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('empList'),
  error: makeSelectError('empList'),
  lists: makeSelectData('empList'),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(ShowLists);
