/**
 * Payroll Cutoff Enrolled Lists
 * @prop {string} filter    Filter for displaying enrolled list (default: Employee)
 * @prop {func}   unassign  Unassign function callback
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/fontawesome-free-solid';

import { DEFAULT_GUID } from 'containers/App/constants';

import GroupFilter from 'components/Enums/GroupFilter';
import Loading from 'components/LoadingIndicator/Loading';
import Avatar from 'components/Img/Avatar';

import { makeSelectLoading, makeSelectError, makeSelectData } from './selectors';

class EnrolledDataList extends React.PureComponent {
  render() {
    const { loading, error, lists, filter } = this.props;

    let items = <div className="enrolled-list"><p className="message">No Record(s) Found.</p></div>;

    if (loading) return <div className="enrolled-list"><Loading /></div>;

    if (error) {
      if (error.ErrorCode === 204) {
        return <div className="enrolled-list"><p className="message">No Record(s) Found.</p></div>;
      }
      return <div className="enrolled-list"><p className="message">Something went wrong, please try again</p></div>;
    }

    if (lists) {
      // If we have data, .map it is
      if (filter === GroupFilter.Employee) {
        items = lists.map((item) => {
          let deptName;
          let teamName;
          if (item.WorkGroup.length > 0) {
            deptName = item.WorkGroup[0].Department.Name;
            teamName = (item.WorkGroup[0].Team.TeamID !== DEFAULT_GUID) ? `- ${item.WorkGroup[0].Team.Name}` : '';
          }
          return (
            <div className="enrolled-items" key={item.EmpProfileID}>
              <p>
                { (item.EmpAvatarAttachs != null)
                  ? <Avatar bgImage={`url('${item.EmpAvatarAttachs.Path}')`} />
                  : <Avatar />
                }
                <span className="enrolled-name">
                  {item.LastName}, {item.FirstName}
                  {(item.WorkGroup.length !== 0) && <small>{deptName} {teamName}</small>}
                  {(item.CutoffTemplate && item.CutoffTemplate.TemplateInheritance.InheritedFromID !== DEFAULT_GUID) && <small className="enrolled-inherit">Template inherited from {item.CutoffTemplate.TemplateInheritance.RefType} - {item.CutoffTemplate.TemplateInheritance.Name}</small>}
                </span>
              </p>
              {(item.CutoffTemplate && item.CutoffTemplate.TemplateInheritance.InheritedFromID === DEFAULT_GUID) && <button className="btn-delete" onClick={() => { this.props.unassign(`${item.FirstName} ${item.LastName}`, item.EmpProfileID); }}><FontAwesomeIcon icon={faMinus} /></button>}
            </div>
          );
        });
      }

      if (filter === GroupFilter.Workgroup) {
        items = lists.map((item) => (
          <div className="enrolled-items" key={item.TeamID}>
            <p>
              <span className="enrolled-group">
                {item.Name}
              </span>
            </p>
            <button className="btn-delete" onClick={() => { this.props.unassign(item.Name, item.TeamID); }}><FontAwesomeIcon icon={faMinus} /></button>
          </div>
        ));
      }

      if (filter === GroupFilter.Department) {
        items = lists.map((item) => (
          <div className="enrolled-items" key={item.DeptID}>
            <p>
              <span className="enrolled-group">
                {item.Name}
              </span>
            </p>
            <button className="btn-delete" onClick={() => { this.props.unassign(item.Name, item.DeptID); }}><FontAwesomeIcon icon={faMinus} /></button>
          </div>
        ));
      }

      return (
        <div className="enrolled-list">
          {items}
        </div>
      );
    }

    return null;
  }
}

EnrolledDataList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  filter: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  unassign: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('enrolledList'),
  error: makeSelectError('enrolledList'),
  lists: makeSelectData('enrolledList'),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(EnrolledDataList);
