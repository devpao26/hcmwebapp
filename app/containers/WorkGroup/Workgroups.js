/**
 * Workgroup List
 * @prop {func}   showCreateDept Function to show the create group
 * @prop {func}   showEmpList Function to show the employee list
 * @prop {func}   showTemplateList Function to show the template list
 * @prop {func}   showDetails Function to show the group details
 * @prop {func}   showDelete Function to show the delete group
 * @prop {func}   showRename Function to show the rename group
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretDown, faChevronRight, faHome } from '@fortawesome/fontawesome-free-solid';

import Loading from 'components/LoadingIndicator';
import OptionMenu from 'components/OptionMenu';
import Breadcrumbs from 'components/Breadcrumbs';

import {
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
} from './selectors';

import { getGroupList } from './actions';

/* Styles */
import WorkGroupWrapper from './Wrapper';
import Flex from './Flex';
import Columns from './Columns';
import Items from './Items';

export class WorkgroupListComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbs: [{
        id: false,
        name: 'Home',
        isTeam: false,
      }],
      parentColor: '#242a2a',
      firstChildColor: '#4875a3',
      secondChildColor: '#037c6b',
      isViewing: 'Company',
      groupID: false,
      renameVal: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lists && this.state.groupID) {
      // this.renameBreadcrumbs();
    }
  }

  renameBreadcrumbs = () => {
    let parent;
    if (this.state.isViewing === 'Dept') {
      parent = this.props.lists[0].Department;
    }

    if (this.state.isViewing === 'Team') {
      parent = this.props.lists[0].Team;
    }

    const index = this.state.breadcrumbs.findIndex((item) => item.id === this.state.groupID);
    const newCrumbs = this.state.breadcrumbs;
    newCrumbs[index].name = parent.Name;
  }

  breadcrumbs = (id, name, isTeam) => {
    const index = this.state.breadcrumbs.findIndex((item) => item.id === id);
    if (index === -1) {
      this.setState((prevState) => ({
        breadcrumbs: [...prevState.breadcrumbs, { id, name, isTeam }],
      }));
    }
  }

  gotoBreadcrumbs = (e, id, isTeam) => {
    e.preventDefault();
    const index = this.state.breadcrumbs.findIndex((item) => item.id === id);

    const newCrumbs = this.state.breadcrumbs;
    newCrumbs.length = index + 1;

    this.setState({
      breadcrumbs: newCrumbs,
    });
    if (id === false && isTeam === false) {
      this.setState({
        parentColor: '#242a2a',
        firstChildColor: '#4875a3',
        secondChildColor: '#037c6b',
        isViewing: 'Company',
      });
    }
    if (id && isTeam === false) {
      this.setState({
        parentColor: '#4875a3',
        firstChildColor: '#037c6b',
        secondChildColor: '#826092',
        isViewing: 'Dept',
      });
    }
    this.props.retrieveGroupList(id, isTeam);
  }

  retrieveNewGroupList = (e, id, isTeam, name) => {
    e.preventDefault();
    this.setState({
      isViewing: (isTeam) ? 'Team' : 'Dept',
    });
    // Retrieve the list
    this.props.retrieveGroupList(id, isTeam);

    // Update the color for the state
    if (isTeam) {
      this.setState({
        parentColor: '#037c6b',
        firstChildColor: '#826092',
        secondChildColor: '#cd6b3e',
      });
    } else {
      this.setState({
        parentColor: '#4875a3',
        firstChildColor: '#037c6b',
        secondChildColor: '#826092',
      });
    }
    this.breadcrumbs(id, name, isTeam);
  }

  // Trigger for mobile display, expands the view
  mobileToggleDisplay = (e) => {
    // get our parent container
    const parent = e.currentTarget.parentNode;

    // toggle our class
    parent.classList.toggle('toggle');
  }

  render() {
    const { loading, error, lists } = this.props;
    const { isViewing } = this.state;

    const totalNav = this.state.breadcrumbs.length - 1;
    const breadcrumbs = this.state.breadcrumbs.map((nav, index) => {
      if (index === totalNav) return <span key={nav.id} className="text-green">{(nav.name === 'Home') && <FontAwesomeIcon icon={faHome} />}{nav.name}</span>;
      return <span key={nav.id}>{(nav.name === 'Home') && <FontAwesomeIcon icon={faHome} />}<a role="presentation" onClick={(e) => { this.gotoBreadcrumbs(e, nav.id, nav.isTeam); }}>{nav.name}</a><FontAwesomeIcon icon={faChevronRight} /></span>;
    });

    if (loading) {
      return <WorkGroupWrapper><Loading /></WorkGroupWrapper>;
    }

    if (error) {
      if (error.ErrorCode === 204) {
        return <WorkGroupWrapper><p className="error-msg">No Record(s) Found.</p></WorkGroupWrapper>;
      }
      return <WorkGroupWrapper><p className="error-msg">There is a problem communicating with the server. Please try again later.</p></WorkGroupWrapper>;
    }

    if (lists) {
      let groups;
      let parent;
      let parentID;
      let parentCat;
      let isTeam = false;
      if (isViewing === 'Company') {
        parent = lists[0].Company;
        parentID = parent.CompanyID;
        parentCat = 'Department';
        groups = lists[0].Company.Departments;
      }

      if (isViewing === 'Dept') {
        parent = lists[0].Department;
        parentID = parent.DeptID;
        parentCat = 'Team';
        groups = lists[0].Department.TeamList;
        isTeam = true;
      }

      if (isViewing === 'Team') {
        parent = lists[0].Team;
        parentID = parent.TeamID;
        parentCat = 'Team';
        groups = lists[0].Team.SubTeams;
        isTeam = true;
      }

      const items = groups.map((item) => {
        const groupID = (isViewing === 'Company') ? item.DeptID : item.TeamID;
        const deptID = (isViewing === 'Company') ? item.DeptID : parent.DeptID;
        const teamID = (isViewing === 'Team' || isViewing === 'Dept') ? item.TeamID : false;
        // const headID = (isViewing === 'Company') ? item.DeptHead : item.TeamHeadID;
        let subGroups;
        let subGroupList = item.TeamList; // Default subgrouplist
        if (isViewing === 'Dept' || isViewing === 'Team') subGroupList = item.SubTeams; // change the subgroup list
        if (subGroupList) {
          subGroups = subGroupList.map((sub) => (
            <Items bgColor={this.state.secondChildColor} key={sub.TeamID}>
              <p>
                <a role="presentation" className="link-to" title={item.Name} onClick={(e) => this.retrieveNewGroupList(e, sub.TeamID, true, sub.Name)}>{sub.Name}</a>
                <small>Team Level {sub.HierarchyLvl}</small>
              </p>
              <OptionMenu title="Options" position="bottom">
                <button onClick={() => { this.props.showEmpList(deptID, sub.TeamID, true, false, sub.Name); }}>Enroll Employees</button>
                <button onClick={(e) => { this.props.showCreateDept(e, sub.Name, sub.TeamID, 'Team', true); }}>Create Sub Team</button>
                <button onClick={(e) => { this.props.showTemplateList(e, sub.TeamID, true, 'Calendar', sub.Name); }}>Assign Calendar Template</button>
                <button onClick={(e) => { this.props.showTemplateList(e, sub.TeamID, true, 'Shift', sub.Name); }}>Assign Shift Schedule Template</button>
                <button onClick={(e) => { this.props.showTemplateList(e, sub.TeamID, true, 'Payroll', sub.Name); }}>Assign Payroll Cutoff Template</button>
                <button onClick={(e) => { this.props.showTemplateList(e, sub.TeamID, true, 'WorkStat', sub.Name); }}>Assign Work Status Template</button>
                <button onClick={(e) => { this.props.showTemplateList(e, sub.TeamID, true, 'DeskConfig', sub.Name); }}>Assign Desktop Configuration Template</button>
                <button onClick={(e) => { this.props.showRename(e, sub.TeamID, true, sub.Name); }}>Rename</button>
                <button onClick={(e) => { this.props.showDelete(e, sub.TeamID, true, sub.Name); }}>Delete</button>
                <button onClick={() => { this.props.showEmpList(deptID, sub.TeamID, true, true, sub.Name); }}>View Employee List</button>
                <button onClick={() => { this.props.showEmpList(deptID, sub.TeamID, true, true, sub.Name, true); }}>Transfer Members</button>
                <button onClick={(e) => { this.props.showDetails(e, sub.TeamID, true, sub.Name); }}>View Details</button>
              </OptionMenu>
            </Items>
           ));
        }
        // return for the groups.map
        return (
          <Columns key={groupID}>
            <Items bgColor={this.state.firstChildColor}>
              <p>
                <a role="presentation" className="link-to" title={item.Name} onClick={(e) => this.retrieveNewGroupList(e, groupID, isTeam, item.Name)}>{item.Name}</a>
                {(isViewing === 'Team' || isViewing === 'Dept') && <small>Team Level {item.HierarchyLvl}</small>}
              </p>
              <OptionMenu title="Options" position="bottom">
                <button onClick={() => { this.props.showEmpList(deptID, teamID, isTeam, false, item.Name); }}>Enroll Employees</button>
                <button onClick={(e) => { this.props.showCreateDept(e, item.Name, groupID, parentCat, true); }}>Create {(isViewing === 'Company') ? 'Team' : 'Sub Team'}</button>
                <button onClick={(e) => { this.props.showTemplateList(e, groupID, isTeam, 'Calendar', item.Name); }}>Assign Calendar Template</button>
                <button onClick={(e) => { this.props.showTemplateList(e, groupID, isTeam, 'Shift', item.Name); }}>Assign Shift Schedule Template</button>
                <button onClick={(e) => { this.props.showTemplateList(e, groupID, isTeam, 'Payroll', item.Name); }}>Assign Payroll Cutoff Template</button>
                <button onClick={(e) => { this.props.showTemplateList(e, groupID, isTeam, 'WorkStat', item.Name); }}>Assign Work Status Template</button>
                <button onClick={(e) => { this.props.showTemplateList(e, groupID, isTeam, 'DeskConfig', item.Name); }}>Assign Desktop Configuration Template</button>
                <button onClick={(e) => { this.props.showRename(e, groupID, isTeam, item.Name); }}>Rename</button>
                <button onClick={(e) => { this.props.showDelete(e, groupID, isTeam, item.Name); }}>Delete</button>
                <button onClick={() => { this.props.showEmpList(deptID, teamID, isTeam, true, item.Name); }}>View Employee List</button>
                <button onClick={() => { this.props.showEmpList(deptID, teamID, isTeam, true, item.Name, true); }}>Transfer Members</button>
                <button onClick={(e) => { this.props.showDetails(e, groupID, isTeam, item.Name); }}>View Details</button>
              </OptionMenu>
            </Items>
            {subGroups}

            {/* Trigger for mobile display */}
            <button onClick={this.mobileToggleDisplay} className="expander" ><FontAwesomeIcon icon={faCaretDown} /></button>
          </Columns>
        );
      });

      // Component return under render()
      return (
        <WorkGroupWrapper>
          <Breadcrumbs>
            {breadcrumbs}
          </Breadcrumbs>
          <Flex>
            <Columns noBorder head>
              <Items bgColor={this.state.parentColor}>
                <p>
                  {parent.Name}
                  {(isViewing === 'Team') && <small>Team Level {parent.HierarchyLvl}</small>}
                </p>
                { (isViewing === 'Company') &&
                  <OptionMenu title="Options" position="bottom">
                    <button onClick={(e) => { this.props.showCreateDept(e, parent.Name, parentID, 'Company', isTeam); }}>Create Department</button>
                  </OptionMenu>
                }
                { (isViewing === 'Dept') &&
                  <OptionMenu title="Options" position="bottom">
                    <button onClick={() => { this.props.showEmpList(parent.DeptID, false, false, false, parent.Name); }}>Enroll Employees</button>
                    <button onClick={(e) => { this.props.showCreateDept(e, parent.Name, parentID, 'Department', true); }}>Create Team</button>
                    <button onClick={(e) => { this.props.showTemplateList(e, parentID, false, 'Calendar', parent.Name); }}>Assign Calendar Template</button>
                    <button onClick={(e) => { this.props.showTemplateList(e, parentID, false, 'Shift', parent.Name); }}>Assign Shift Schedule Template</button>
                    <button onClick={(e) => { this.props.showTemplateList(e, parentID, false, 'Payroll', parent.Name); }}>Assign Payroll Cutoff Template</button>
                    <button onClick={(e) => { this.props.showTemplateList(e, parentID, false, 'WorkStat', parent.Name); }}>Assign Work Status Template</button>
                    <button onClick={(e) => { this.props.showTemplateList(e, parentID, false, 'DeskConfig', parent.Name); }}>Assign Desktop Configuration Template</button>
                    {/* <button onClick={(e) => { this.props.showRename(e, parentID, false, parent.Name); this.setState({ groupID: parentID }); }}>Rename</button>
                    <button onClick={(e) => { this.props.showDelete(e, parentID, false, parent.Name); }}>Delete</button> */}
                    <button onClick={() => { this.props.showEmpList(parent.DeptID, false, false, true, parent.Name); }}>View Employee List</button>
                    <button onClick={() => { this.props.showEmpList(parent.DeptID, false, false, true, parent.Name, true); }}>Transfer Members</button>
                    <button onClick={(e) => { this.props.showDetails(e, parentID, false, parent.Name); }}>View Details</button>
                  </OptionMenu>
                }
                { (isViewing === 'Team') &&
                  <OptionMenu title="Options" position="bottom">
                    <button onClick={() => { this.props.showEmpList(parent.DeptID, parentID, true, false, parent.Name); }}>Enroll Employees</button>
                    <button onClick={(e) => { this.props.showCreateDept(e, parent.Name, parentID, 'Team', true); }}>Create Sub Team</button>
                    <button onClick={(e) => { this.props.showTemplateList(e, parentID, true, 'Calendar', parent.Name); }}>Assign Calendar Template</button>
                    <button onClick={(e) => { this.props.showTemplateList(e, parentID, true, 'Shift', parent.Name); }}>Assign Shift Schedule Template</button>
                    <button onClick={(e) => { this.props.showTemplateList(e, parentID, true, 'Payroll', parent.Name); }}>Assign Payroll Cutoff Template</button>
                    <button onClick={(e) => { this.props.showTemplateList(e, parentID, true, 'WorkStat', parent.Name); }}>Assign Work Status Template</button>
                    <button onClick={(e) => { this.props.showTemplateList(e, parentID, true, 'DeskConfig', parent.Name); }}>Assign Desktop Configuration Template</button>
                    {/* <button onClick={(e) => { this.props.showRename(e, parentID, true, parent.Name); this.setState({ groupID: parentID }); }}>Rename</button>
                    <button onClick={(e) => { this.props.showDelete(e, parentID, true, parent.Name); }}>Delete</button> */}
                    <button onClick={() => { this.props.showEmpList(parent.DeptID, parentID, true, true, parent.Name); }}>View Employee List</button>
                    <button onClick={() => { this.props.showEmpList(parent.DeptID, parentID, true, true, parent.Name, true); }}>Transfer Members</button>
                    <button onClick={(e) => { this.props.showDetails(e, parentID, true, parent.Name); }}>View Details</button>
                  </OptionMenu>
                }
              </Items>
            </Columns>
          </Flex>
          <Flex>
            {items}
          </Flex>
        </WorkGroupWrapper>
      );
    }

    return null; // default return
  }
}

WorkgroupListComponent.propTypes = {
  // props from parent component
  showCreateDept: PropTypes.func,
  showEmpList: PropTypes.func,
  showTemplateList: PropTypes.func,
  showDetails: PropTypes.func,
  showDelete: PropTypes.func,
  showRename: PropTypes.func,
  // teamID: PropTypes.oneOfType([
  //   PropTypes.bool,
  //   PropTypes.string,
  // ]),
  // map state to props
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  // Function dispatch props
  retrieveGroupList: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('groupList'),
  error: makeSelectError('groupList'),
  lists: makeSelectData('groupList'),
});

function mapDispatchToProps(dispatch) {
  return {
    retrieveGroupList: (id, isTeam) => dispatch(getGroupList(id, isTeam)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(WorkgroupListComponent);
