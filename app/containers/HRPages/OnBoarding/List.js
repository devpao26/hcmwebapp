import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Loading from 'components/LoadingIndicator/Loading';
import Row from 'components/Employee/EMPMasterlistRow';

/* OptionMenu Components */
import OptionMenu from 'components/OptionMenu';

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
    const { loading, error, joSignedList, joStatusRefs, showConfirm } = this.props;
    let statusRefs;
    if (joStatusRefs) statusRefs = joStatusRefs[0].JOStatusRefs;

    let items = (<div className="row-container"><p className="message">No JO Signed Applicant yet.</p></div>);

    if (loading) return <div className="row-container"><Loading /></div>;

    if (error) {
      if (error.ErrorCode === 204) {
        return <div className="row-container"><p className="message">No JO Signed Applicant yet.</p></div>;
      }
      return <div className="row-container"><p className="message">There is a problem communicating with the server. Please try again later.</p></div>;
    }

    if (joSignedList) {
      items = joSignedList.map((item) => (
        <Row className="body" statusDot key={item.ApplAppliedJobID}>
          <div className="cell first">
            <Status className="status New" />
            <p>
              <span role="presentation" className="emp-name" onClick={this.rowExpand}>{ item.ApplProfile.LastName }, { item.ApplProfile.FirstName }</span>
              <small>{item.JobPost.ComSiteLoc.Name}</small>
            </p>
          </div>
          <div className="cell" data-title="Mobile">{ item.ApplProfile.Mobile }</div>
          <div className="cell" data-title="Signed Date">{ moment(new Date(item.JOSigned.CreatedDate)).format('LL') }</div>
          <div className="cell" data-title="Application Date">{ moment(new Date(item.CreatedDate)).format('LL') }</div>
          <div className="cell" data-title="Basic Salary">&nbsp;</div>
          <div className="menu">
            <OptionMenu title="Mark As" position="left" icon="ellipsis">
              {statusRefs.map((option) =>
                <button key={option.JOStatusID} onClick={showConfirm} data-jostatid={option.JOStatusID} data-jobid={item.ApplAppliedJobID}>{option.Code}</button>
              )}
            </OptionMenu>
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
            <div className="cell">Basic Salary <span className="sort fa fa-caret-down" /></div>
          </Row> */}
          <Row className="head" statusDot>
            <div className="cell">Applicant</div>
            <div className="cell">Mobile</div>
            <div className="cell">Signed Date</div>
            <div className="cell">Application Date</div>
            <div className="cell">Basic Salary</div>
          </Row>
          {items}
        </div>
      );
    }

    return <div className="row-container"><Loading /></div>;
  }
}

DataList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  joSignedList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array,
  ]),
  joStatusRefs: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  showConfirm: PropTypes.func.isRequired, // to show the Confirmation
};

export default DataList;
