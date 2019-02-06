import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Loading from 'components/LoadingIndicator/Loading';
import Row from 'components/Employee/EMPMasterlistRow';
import Avatar from 'components/Img/Avatar';
import OptionMenu from 'components/OptionMenu';

class FinEmpList extends React.PureComponent {
  rowExpand = (e) => {
    // Get our Parent Row
    const parentRow = e.currentTarget.parentNode.parentNode.parentNode;
    // Toggle expand class
    parentRow.classList.toggle('expand');
  }

  render() {
    const { loading, error, empList } = this.props;

    let items = (<div className="row-container"><p className="message">No Record(s) Found.</p></div>);

    if (loading) {
      return <div className="row-container"><Loading /></div>;
    }

    if (error) {
      if (error.ErrorCode === 204) {
        return <div className="row-container"><p className="no-data">No Record(s) Found.</p></div>;
      }
      return <div className="row-container"><p className="message">There is a problem communicating with the server. Please try again later.</p></div>;
    }

    if (empList) {
      items = empList.map((item) => (
        <Row className="body" key={item.EmpProfileID}>
          <div className="cell first">
            { (item.EmpAvatarAttachs != null)
              ? <Avatar bgImage={`url('${item.EmpAvatarAttachs.Path}')`} />
              : <Avatar />
            }
            <p>
              <span role="presentation" className="emp-name" onClick={this.rowExpand}>{item.LastName}, {item.FirstName}</span>
              <small>{item.Email}</small>
            </p>
          </div>
          <div className="cell" data-title="ID No.">{item.EmpID.EmpIDNo}</div>
          <div className="cell" data-title="Date Hired">{(item.DateHired !== '') && moment(new Date(item.DateHired)).format('MM-DD-YYYY')}</div>
          <div className="cell" data-title="Position">{item.JobRole.Name}</div>
          <div className="cell" data-title="WorkGroup">{(item.WorkGroup.length !== 0) ? item.WorkGroup[0].Team.Name : '-'}</div>
          <div className="cell" data-title="Department">{(item.WorkGroup.length !== 0) ? item.WorkGroup[0].Department.Name : '-'}</div>
          <div className="cell" data-title="Employment Status">{(item.EmploymentStatus.Name) ? item.EmploymentStatus.Name : '-'}</div>
          <div className="cell text-center">
            <OptionMenu title="Options" position="left">
              <button onClick={() => { this.props.getEmpID(item.EmpProfileID, 'deduction'); }}>Add Timed Deductions</button>
              <button onClick={() => { this.props.getEmpID(item.EmpProfileID, 'earning'); }}>Add Timed Earnings</button>
              {/* <button>View Profile</button>
              <button>Assign a Shift Schedule</button>
              <button>Assign CutOff Template</button>
              <button>Update Information</button>
              <button>Disable Access</button>
              <button>Access and Permissions</button>
              <button>Statistics</button>
              <button>File IRF</button> */}
            </OptionMenu>
          </div>
        </Row>
      ));

      return (
        <div className="row-container">
          {/* <Row className="head">
            <div className="cell">Name <span className="sort fa fa-caret-down" /></div>
            <div className="cell">Date Hired <span className="sort fa fa-caret-down" /></div>
            <div className="cell">Position <span className="sort fa fa-caret-down" /></div>
            <div className="cell">WorkGroup <span className="sort fa fa-caret-down" /></div>
            <div className="cell">Department <span className="sort fa fa-caret-down" /></div>
            <div className="cell">Employment Status <span className="sort fa fa-caret-down" /></div>
            <div className="cell">Current Work Status <span className="sort fa fa-caret-down" /></div>
            </Row> */}
          <Row className="head">
            <div className="cell">Name</div>
            <div className="cell">ID No.</div>
            <div className="cell">Date Hired</div>
            <div className="cell">Position</div>
            <div className="cell">Work Group</div>
            <div className="cell">Department</div>
            <div className="cell">Employment Status</div>
            <div className="cell"></div>
          </Row>
          {items}
        </div>
      );
    }

    return null;
  }
}

FinEmpList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  empList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  getEmpID: PropTypes.func,
};

export default FinEmpList;
