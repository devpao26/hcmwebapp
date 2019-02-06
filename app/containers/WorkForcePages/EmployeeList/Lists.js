import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/fontawesome-free-solid';

/**  Global Components **/
import visayaTimeClock from 'components/ImageFiles/visaya-clock.png';
import Loading from 'components/LoadingIndicator/Loading';
import Avatar from 'components/Img/Avatar';
import Row from 'components/Employee/EMPMasterlistRow';

import OptionMenu from 'components/OptionMenu';

import { makeSelectLoading, makeSelectError, makeSelectData } from './selector';

class Lists extends React.PureComponent {
  
  // Expand Section On Smaller Devices
  rowExpand = (e) => {
    // Get our Parent Row
    const parentRow = e.currentTarget.parentNode.parentNode.parentNode;
    // Toggle expand class
    parentRow.classList.toggle('expand');
  }

  render() {
    const { loading, error, lists } = this.props;
    let items;

    if (loading) return <div className="row-container"><Loading /></div>;

    if (error) {
      if (error.ErrorCode === 204) {
        return <div className="row-container"><p className="message">No Record(s) Found.</p></div>;
      }
      return <div className="row-container"><p className="message">There is a problem communicating with the server. Please try again later.</p></div>;
    }

    if (lists) {
      items = lists.map((item) => (
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
          <div className="cell text-center" data-title="ID No.">{item.EmpID.EmpIDNo}</div>
          <div className="cell" data-title="Date Hired"> - </div>
          <div className="cell" data-title="Position">{(item.JobRole.Name) ? item.JobRole.Name : '-'}</div>
          <div className="cell" data-title="WorkGroup">{(item.WorkGroup.length !== 0) ? item.WorkGroup[0].Team.Name : '-'}</div>
          <div className="cell" data-title="Department">{(item.WorkGroup.length !== 0) ? item.WorkGroup[0].Department.Name : '-'}</div>
          <div className="cell" data-title="Employment Status">{(item.EmploymentStatus.Name) ? item.EmploymentStatus.Name : '-'}</div>
          <div className="cell text-center">
            {item.EnrolledInWorkForceApp ? 'Enrolled' : <button className="emp-plus-icon" onClick={(e) => { this.props.enrollEmp(e, `${item.FirstName} ${item.LastName}`, item.EmpProfileID); }}><FontAwesomeIcon icon={faPlusSquare} /></button>}
          </div>
        </Row>
      ));

      return (
        <div className="row-container">
          <Row className="head">
            <div className="cell">Name</div>
            <div className="cell text-center">ID No.</div>
            <div className="cell">Date Hired</div>
            <div className="cell">Position</div>
            <div className="cell">WorkGroup</div>
            <div className="cell">Department</div>
            <div className="cell">Employment Status</div>
            {/* <div className="cell">Options</div> */}
            <div className="cell text-center">
              <img className="visaya-clock" src={visayaTimeClock} alt="VisayaKPO" />
              <FontAwesomeIcon icon={faPlusSquare} />
            </div>
          </Row>
          {items}
        </div>
      );
    }
    return null;
  }
}

Lists.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  enrollEmp: PropTypes.func,
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
)(Lists);
