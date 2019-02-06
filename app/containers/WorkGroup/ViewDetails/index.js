/**
 * View Details Component
 * @prop {object} details   Object data of the selected group
 * @prop {bool}   isTeam    Checker if we are viewing a dept or team
 * @prop {string} groupID   ID of the group
 * @prop {string} groupName Name of the group
 * @prop {func}   view      View template details
 * @prop {func}   unassign  Unassigning of template to dept or team
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/fontawesome-free-solid';

import Loading from 'components/LoadingIndicator/Loading';
import Status from 'components/User/Status';

import { DEFAULT_GUID } from 'containers/App/constants';
import Wrapper from './Wrapper';

import { makeSelectLoading, makeSelectError, makeSelectData } from '../selectors';

export class ViewDetailsComponent extends React.PureComponent {
  rowExpand = (e) => {
    // Get our Parent Row
    const parentRow = e.currentTarget.parentNode.parentNode;
    // Toggle expand class
    parentRow.classList.toggle('expand');
  }

  render() {
    const { loading, error, data, isTeam, groupID, groupName } = this.props;

    if (loading) return <Wrapper><Loading /></Wrapper>;

    if (error) {
      if (error.ErrorCode === 204) {
        return <Wrapper><p className="message">No data found.</p></Wrapper>;
      }
      return <Wrapper><p className="message">There is a problem communicating with the server. Please try again later.</p></Wrapper>;
    }

    if (data) {
      const details = data[0];
      const headID = (isTeam) ? details.TeamHeadID : details.DeptHead;
      const headName = (isTeam) ? details.TeamHeadName : details.DeptHeadName;
      return (
        <Wrapper>
          <div className="details">
            <h3>{details.Name}</h3>
            <p>Date Created: <b>{moment(new Date(details.CreatedDate)).format('MM-DD-YYYY')}</b></p>
            <p>{(isTeam) ? 'Team' : 'Department'} Head: <b>{(headID !== DEFAULT_GUID) ? headName : 'No assigned head yet.'}</b></p>
            <p>Enrolled Employees: <b>{details.MembersCount}</b></p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Template Type</th>
                <th>Template Name</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Status className={(details.CutoffTemplateID === DEFAULT_GUID) ? 'status Inactive' : 'status Active'} />
                  <p>Payroll Cutoff</p>
                </td>
                <td>{(details.CutoffTemplateID !== DEFAULT_GUID) ? details.CutoffTemplate.Name : 'No assigned template.'}</td>
                <td>
                  { (details.CutoffTemplateID === DEFAULT_GUID)
                    ? <a role="presentation" className="template-link" title="Assign Template" onClick={(e) => { this.props.showTemplateList(e, groupID, isTeam, 'Payroll', groupName, true); }}>Assign Template</a>
                    : <a role="presentation" className="template-link" title="View Template Details" onClick={(e) => { this.props.view(e, 'Payroll', details.CutoffTemplate); }}>View Template Details</a>
                  }
                </td>
                <td>{(details.CutoffTemplateID !== DEFAULT_GUID) && <button title="Unassign Template" onClick={(e) => { this.props.unassign(e, this.props.groupID, 'Payroll', details.CutoffTemplate.Name); }}><FontAwesomeIcon icon={faMinusCircle} /></button>}</td>
              </tr>
              <tr>
                <td>
                  <Status className={(details.ShiftTemplateID === DEFAULT_GUID) ? 'status Inactive' : 'status Active'} />
                  <p>Shift Schedules</p>
                </td>
                <td>{(details.ShiftTemplateID !== DEFAULT_GUID) ? details.ShiftTemplate.Name : 'No assigned template.'}</td>
                <td>
                  { (details.ShiftTemplateID === DEFAULT_GUID)
                    ? <a role="presentation" className="template-link" title="Assign Template" onClick={(e) => { this.props.showTemplateList(e, groupID, isTeam, 'Shift', groupName, true); }}>Assign Template</a>
                    : <a role="presentation" className="template-link" title="View Template Details" onClick={(e) => { this.props.view(e, 'Shift', details.ShiftTemplate); }}>View Template Details</a>
                  }
                </td>
                <td>{(details.ShiftTemplateID !== DEFAULT_GUID) && <button title="Unassign Template" onClick={(e) => { this.props.unassign(e, this.props.groupID, 'Shift', details.ShiftTemplate.Name); }}><FontAwesomeIcon icon={faMinusCircle} /></button>}</td>
              </tr>
              <tr>
                <td>
                  <Status className={(details.WorkStatusTemplateID === DEFAULT_GUID) ? 'status Inactive' : 'status Active'} />
                  <p>Work Status</p>
                </td>
                <td>{(details.WorkStatusTemplateID !== DEFAULT_GUID) ? details.WorkStatusTemplate.Name : 'No assigned template.'}</td>
                <td>
                  { (details.WorkStatusTemplateID === DEFAULT_GUID)
                    ? <a role="presentation" className="template-link" title="Assign Template" onClick={(e) => { this.props.showTemplateList(e, groupID, isTeam, 'WorkStat', groupName, true); }}>Assign Template</a>
                    : <a role="presentation" className="template-link" title="View Template Details" onClick={(e) => { this.props.view(e, 'WorkStat', details.WorkStatusTemplate); }}>View Template Details</a>
                  }
                </td>
                <td>{(details.WorkStatusTemplateID !== DEFAULT_GUID) && <button title="Unassign Template" onClick={(e) => { this.props.unassign(e, this.props.groupID, 'WorkStat', details.WorkStatusTemplate.Name); }}><FontAwesomeIcon icon={faMinusCircle} /></button>}</td>
              </tr>
              <tr>
                <td>
                  <Status className={(details.CalendarID === DEFAULT_GUID) ? 'status Inactive' : 'status Active'} />
                  <p>Calendar</p>
                </td>
                <td>{(details.CalendarID !== DEFAULT_GUID) ? details.CalendarTemplate.Name : 'No assigned template.'}</td>
                <td>
                  { (details.CalendarID === DEFAULT_GUID)
                    ? <a role="presentation" className="template-link" title="Assign Template" onClick={(e) => { this.props.showTemplateList(e, groupID, isTeam, 'Calendar', groupName, true); }}>Assign Template</a>
                    : <a role="presentation" className="template-link" title="View Template Details" onClick={(e) => { this.props.view(e, 'Calendar', details.CalendarTemplate); }}>View Template Details</a>
                  }
                </td>
                <td>{(details.CalendarID !== DEFAULT_GUID) && <button title="Unassign Template" onClick={(e) => { this.props.unassign(e, this.props.groupID, 'Calendar', details.CalendarTemplate.Name); }}><FontAwesomeIcon icon={faMinusCircle} /></button>}</td>
              </tr>
              <tr>
                <td>
                  <Status className={(details.WorkMonitoringTemplateID === DEFAULT_GUID) ? 'status Inactive' : 'status Active'} />
                  <p>Desktop Configuration</p>
                </td>
                <td>{(details.WorkMonitoringTemplateID !== DEFAULT_GUID) ? details.WorkMonitoringTemplate.Name : 'No assigned template.'}</td>
                <td>
                  { (details.WorkMonitoringTemplateID === DEFAULT_GUID)
                    ? <a role="presentation" className="template-link" title="Assign Template" onClick={(e) => { this.props.showTemplateList(e, groupID, isTeam, 'DeskConfig', groupName, true); }}>Assign Template</a>
                    : <a role="presentation" className="template-link" title="View Template Details" onClick={(e) => { this.props.view(e, 'DeskConfig', details.WorkMonitoringTemplate); }}>View Template Details</a>
                  }
                </td>
                <td>{(details.WorkMonitoringTemplateID !== DEFAULT_GUID) && <button title="Unassign Template" onClick={(e) => { this.props.unassign(e, this.props.groupID, 'DeskConfig', details.WorkMonitoringTemplate.Name); }}><FontAwesomeIcon icon={faMinusCircle} /></button>}</td>
              </tr>
            </tbody>
          </table>
        </Wrapper>
      );
    }

    return null;
  }
}

ViewDetailsComponent.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  data: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  isTeam: PropTypes.bool,
  groupID: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  groupName: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  view: PropTypes.func,
  showTemplateList: PropTypes.func,
  unassign: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('viewDetails'),
  error: makeSelectError('viewDetials'),
  data: makeSelectData('viewDetails'),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(ViewDetailsComponent);
