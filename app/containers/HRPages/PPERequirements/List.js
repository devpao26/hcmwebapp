import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Loading from 'components/LoadingIndicator/Loading';
import Row from 'components/Employee/EMPMasterlistRow';

/* ProgressBar */
import ProgressBar from 'components/ProgressBar';

/* User Components */
import Status from 'components/User/Status';

class DataList extends React.PureComponent {
  rowExpand = (e) => {
    // Get our Parent Row
    const parentRow = e.currentTarget.parentNode.parentNode.parentNode;
    // Toggle expand class
    parentRow.classList.toggle('expand');
  }

  render() {
    const { loading, error, ppeList, showProgress } = this.props;

    let items = (<div className="row-container"><p className="message">No PPE Applicant yet.</p></div>);

    if (loading) return <div className="row-container"><Loading /></div>;

    if (error) {
      if (error.ErrorCode === 204) {
        return <div className="row-container"><p className="message">No PPE Applicant yet.</p></div>;
      }
      return <div className="row-container"><p className="message">There is a problem communicating with the server. Please try again later.</p></div>;
    }

    if (ppeList) {
      items = ppeList.map((item) => (
        <Row className="body" statusDot key={item.ApplAppliedJobID} title={`${(item.JOSigned.IsMigrated === false) ? 'Not yet processed as an Employee' : 'Already an Employee'}`}>
          <div className="cell first">
            <Status className={`status ${(item.JOSigned.IsMigrated === false) ? 'Suspended' : 'Active'}`} />
            <p>
              <span role="presentation" className="emp-name" onClick={this.rowExpand}>{ item.ApplProfile.LastName }, { item.ApplProfile.FirstName }</span>
              <small>{item.JobPost.ComSiteLoc.Name}</small>
            </p>
          </div>
          <div className="cell" data-title="Mobile">{ item.ApplProfile.Mobile }</div>
          <div className="cell" data-title="Signed Date">{ moment(new Date(item.JOSigned.CreatedDate)).format('LL') }</div>
          <div className="cell" data-title="Application Date">{ moment(new Date(item.CreatedDate)).format('LL') }</div>
          <div className="cell" data-title="Progress">
            <ProgressBar dataProgress={item.JOSigned.CompletionRate} onClick={showProgress} applJobId={item.ApplAppliedJobID} />
          </div>
        </Row>
      ));

      return (
        <div className="row-container">
          {/* <Row className="head">
            <div className="cell">Applicant <span className="sort fa fa-caret-down" /></div>
            <div className="cell">Mobile <span className="sort fa fa-caret-down" /></div>
            <div className="cell">Signed Date <span className="sort fa fa-caret-down" /></div>
            <div className="cell">Application Date <span className="sort fa fa-caret-down" /></div>
            <div className="cell">Progress <span className="sort fa fa-caret-down" /></div>
          </Row> */}
          <Row className="head" statusDot>
            <div className="cell">Applicant</div>
            <div className="cell">Mobile</div>
            <div className="cell">Signed Date</div>
            <div className="cell">Application Date</div>
            <div className="cell">Progress</div>
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
  error: PropTypes.any,
  ppeList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  showProgress: PropTypes.func.isRequired, // to show the Confirmation
};

export default DataList;
