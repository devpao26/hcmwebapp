import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Loading from 'components/LoadingIndicator/Loading';
import Row from 'components/Employee/EMPMasterlistRow';
import Avatar from 'components/Img/Avatar';

/* OptionMenu Components */
// import OptionMenu from 'components/OptionMenu';

/* User Components */
// import Status from 'components/User/Status';

class DataList extends React.PureComponent {
  setId = (id, obj) => {
    this.props.getEmpId(id, obj);
  }

  rowExpand = (e) => {
    // Get our Parent Row
    const parentRow = e.currentTarget.parentNode.parentNode;
    // Toggle expand class
    parentRow.classList.toggle('expand');
  }

  render() {
    const { loading, error, empList } = this.props;

    let items = (<div className="row-container"><p className="message">No Record(s) Found.</p></div>);

    if (loading) return <div className="row-container"><Loading /></div>;

    if (error) {
      if (error.ErrorCode === 204) {
        return <div className="row-container"><p className="message">No Record(s) Found.</p></div>;
      }
      return <div className="row-container"><p className="message">There is a problem communicating with the server. Please try again later.</p></div>;
    }

    if (empList) {
      // If we have data, .map it is
      items = empList.map((item) => (
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
          <div className="cell" data-title="Position">{item.JobRole.Name}</div>
          <div className="cell" data-title="WorkGroup">{(item.WorkGroup.length !== 0) ? item.WorkGroup[0].Team.Name : '-'}</div>
          <div className="cell" data-title="Department">{(item.WorkGroup.length !== 0) ? item.WorkGroup[0].Department.Name : '-'}</div>
          <div className="cell" data-title="Employee Status"><span className={`stat-${(item.EmpStatus.Name) && item.EmpStatus.Name}`}>{item.EmpStatus.Name}</span></div>
          {/* <div className="cell" data-title="View Floor Status"><Link className="link-to" to="/workforce/floor-status" onClick={() => { this.setId(item.EmpProfileID); }}>View</Link></div> */}
          <div className="cell" data-title="View Floor Status"><a className="link-to" role="presentation" onClick={() => { this.setId(item.EmpProfileID, item); }}>View</a></div>
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
            <div className="cell">Position</div>
            <div className="cell">WorkGroup</div>
            <div className="cell">Department</div>
            <div className="cell">Employee Status</div>
            <div className="cell">View Floor Status</div>
          </Row>
          {items}
        </div>
      );
    }

    return null;
  }
}

DataList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  empList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array,
  ]),
  getEmpId: PropTypes.func,
};

export default DataList;
