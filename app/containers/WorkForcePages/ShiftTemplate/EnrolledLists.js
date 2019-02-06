/**
 * Shift Template Lists (for Shift Template Page)
 */
import React from 'react';
import PropTypes from 'prop-types';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/fontawesome-free-solid';

import { DEFAULT_GUID } from 'containers/App/constants';
import Loading from 'components/LoadingIndicator/Loading';
import Avatar from 'components/Img/Avatar';

class EnrolledDataList extends React.PureComponent {
  render() {
    const { loading, error, lists, requester } = this.props;

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
      if (requester === 'Employee') {
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
                  {(item.ShiftTemplate.TemplateInheritance.InheritedFromID !== DEFAULT_GUID) && <small className="enrolled-inherit">Template inherited from {item.ShiftTemplate.TemplateInheritance.RefType} - {item.ShiftTemplate.TemplateInheritance.Name}</small>}
                </span>
              </p>
              {(item.ShiftTemplate.TemplateInheritance.InheritedFromID === DEFAULT_GUID) && <button className="btn-delete" onClick={(e) => { this.props.unassign(e, `${item.LastName} ${item.FirstName}`, item.EmpProfileID); }}><FontAwesomeIcon icon={faMinus} /></button>}
            </div>
          );
        });
      }

      if (requester === 'Workgroup') {
        items = lists.map((item) => (
          <div className="enrolled-items" key={item.TeamID}>
            <p>
              <span className="enrolled-group">
                {item.Name}
              </span>
            </p>
            <button className="btn-delete" onClick={(e) => { this.props.unassign(e, item.Name, item.TeamID); }}><FontAwesomeIcon icon={faMinus} /></button>
          </div>
        ));
      }

      if (requester === 'Department') {
        items = lists.map((item) => (
          <div className="enrolled-items" key={item.DeptID}>
            <p>
              <span className="enrolled-group">
                {item.Name}
              </span>
            </p>
            <button className="btn-delete" onClick={(e) => { this.props.unassign(e, item.Name, item.DeptID); }}><FontAwesomeIcon icon={faMinus} /></button>
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
  requester: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  unassign: PropTypes.func,
};

export default EnrolledDataList;
