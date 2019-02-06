/**
 * Emp List
 * @prop {string}   groupName         Name of the group we are viewing
 * @prop {boolean}  isEnrolled        Checker for displaying an adding employee or viewing enrolled employee
 * @prop {boolean}  isTransfer        Checker to display only enrolled employee without the options menu
 * @prop {boolean}  isTeam            Check if we are viewing by dept or team
 * @prop {string}   teamID            ID of the team
 * @prop {string}   deptID            ID of the dept
 * @prop {func}     assignHead        Assigning of employee as dept/team head
 * @prop {func}     disable           Disabling of employee account
 * @prop {func}     showTemplateList  Show template list
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactPaginate from 'react-paginate';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faCheckCircle, faUsers, faMinus } from '@fortawesome/fontawesome-free-solid';

import Loading from 'components/LoadingIndicator/Loading';
import EMPList from 'components/Employee/SmallEMPList';
import OptionMenu from 'components/OptionMenu';
import Avatar from 'components/Img/Avatar';
import Search from 'components/SearchFilter';
import ToggleSwitch from 'components/StyleUtils/ToggleSwitch';
import Pagination from 'components/Pagination';

/* selectors, reducer, saga and actions */
import { EMP_STATUS_BLOCKED } from 'containers/App/constants';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPageDetails,
  makeSelectSuccess,
} from './selectors';

import {
  getEmpList, getEmpListNoResetPages,
  getEnrollEmps,
  getUnEnrollEmps,
} from './actions';

import Wrapper from './EmpWrapper';

export class EMPListComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      deptID: this.props.deptID,
      teamID: this.props.teamID,
      isAll: false,
      isEnrolled: this.props.isEnrolled,
      isTeam: this.props.isTeam,
      isSearching: false,
      searchVal: '',
      pageIndex: 1,
      selectedEmployees: [],
      selectedEmpNames: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.assignHeadSuccess || nextProps.transferSuccess) {
      this.setState({
        selectedEmployees: [],
        selectedEmpNames: [],
      });
      const { deptID, teamID, isTeam, isEnrolled, isAll, searchVal, pageIndex } = this.state;
      const id = (!teamID) ? deptID : teamID;
      this.props.retrieveEmpNoResetPage(id, isTeam, isEnrolled, isAll, searchVal, pageIndex);
    }
  }

  showAllEmployee = (e, isBool) => {
    if (this.searchForm) this.searchForm.reset();

    this.setState({
      selectedEmployees: [],
      isAll: isBool,
      searchVal: '',
      isSearching: false,
    });

    const { deptID, teamID, isTeam, isEnrolled } = this.state;
    const id = (!teamID) ? deptID : teamID;
    this.props.retrieveEmpList(id, isTeam, isEnrolled, isBool, false, 1);
  }

  gotoPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      pageIndex: page,
    });

    const { deptID, teamID, isTeam, isEnrolled, isAll, searchVal } = this.state;
    const id = (!teamID) ? deptID : teamID;
    this.props.retrieveEmpNoResetPage(id, isTeam, isEnrolled, isAll, searchVal, page);
  }

  searchEmpList = (val) => {
    this.setState({
      searchVal: val,
      isSearching: true,
      selectedEmployees: [],
      selectedEmpNames: [],
    });

    const { deptID, teamID, isTeam, isEnrolled, isAll } = this.state;
    const id = (!teamID) ? deptID : teamID;
    this.props.retrieveEmpNoResetPage(id, isTeam, isEnrolled, isAll, val, 1);
  }

  selectEmp = (e, id, name) => {
    e.preventDefault();
    const el = e.currentTarget;
    const { selectedEmployees } = this.state;
    const index = selectedEmployees.indexOf(id);

    // Check if the employee ID exists
    if (index === -1) {
      // ID doesn't exist in array, so add it
      this.setState((prevState) => ({
        selectedEmployees: [...prevState.selectedEmployees, id],
        selectedEmpNames: [...prevState.selectedEmpNames, { id, name }],
      }));
      // Add selected class in the element
      el.classList.add('selected');
    } else {
      // ID exists in array, remove it
      const newEmpArray = this.state.selectedEmployees.filter((item) => item !== id);
      const newNameArray = this.state.selectedEmpNames.filter((item) => item.id !== id);
      this.setState({
        selectedEmployees: newEmpArray,
        selectedEmpNames: newNameArray,
      });
      // Remove selected class in element
      el.classList.remove('selected');
    }
  }

  enrollEmployee = (e) => {
    e.preventDefault();
    const ids = this.state.selectedEmployees;
    const isTeam = this.props.isTeam;
    const { deptID, teamID } = this.props;

    this.props.enrollEmployees(ids, isTeam, deptID, teamID);
  }

  unEnrollEmployee = (e) => {
    e.preventDefault();
    const ids = this.state.selectedEmployees;
    const isTeam = this.props.isTeam;
    const { deptID, teamID } = this.props;

    this.props.unenrollEmployees(ids, isTeam, deptID, teamID);
  }

  assignAsHead = (e, empID, empName) => {
    e.preventDefault();
    const isTeam = this.props.isTeam;
    let groupID;
    if (isTeam) groupID = this.props.teamID;
    if (!isTeam) groupID = this.props.deptID;
    // Assign head props
    this.props.assignHead(empID, groupID, empName);
  }

  transferEmp = (e, empID, empName, isTeam, groupName) => {
    e.preventDefault();
    let groupID;
    if (isTeam) groupID = this.props.teamID;
    if (!isTeam) groupID = this.props.deptID;
    const empIDs = [empID];
    const empNames = [{ id: empID, name: empName }];
    this.props.showTransfer(empIDs, empNames, isTeam, groupName, groupID);
  }

  transferMembers = (e) => {
    e.preventDefault();
    let groupID;
    if (this.state.isTeam) groupID = this.props.teamID;
    if (!this.state.isTeam) groupID = this.props.deptID;
    this.props.showTransfer(this.state.selectedEmployees, this.state.selectedEmpNames, this.state.isTeam, this.props.groupName, groupID);
  }

  render() {
    const { groupName, loading, error, lists, pages } = this.props;
    let items;
    let nodata = false;

    let maxPageIndex = 1;
    if (pages) {
      maxPageIndex = pages.MaxPageIndex;
    }

    if (loading) {
      items = <Loading />;
    }

    if (error) {
      if (error.ErrorCode === 204) {
        items = <p className="error-msg">No Record(s) Found.</p>;
        nodata = true;
      } else {
        items = <p className="error-msg">There is a problem communicating with the server. Please try again later.</p>;
      }
    }

    if (lists) {
      items = lists.map((item) => {
        const selEmp = this.state.selectedEmployees;
        const selected = (selEmp.indexOf(item.EmpProfileID) !== -1) && 'selected';
        const enrolledList = (this.props.isEnrolled) && 'enrolled-list';
        const empName = `${item.FirstName} ${item.LastName}`;
        return (
          <dl key={item.EmpProfileID} className={`${enrolledList} ${selected}`}>
            <span role="presentation" onClick={(e) => { this.selectEmp(e, item.EmpProfileID, empName); }}>
              <dt>
                { (item.EmpAvatarAttachs != null)
                  ? <Avatar bgImage={`url('${item.EmpAvatarAttachs.Path}')`} />
                  : <Avatar />
                }
              </dt>
              <dd>
                <p>
                  {item.LastName}, {item.FirstName}
                  <span>{item.Email} {(!this.props.isEnrolled && item.WorkGroup !== undefined && item.WorkGroup.length !== 0) && <FontAwesomeIcon icon={faUsers} />}</span>
                </p>
              </dd>
            </span>
            { (this.props.isEnrolled && !this.props.isTransfer) &&
              <OptionMenu title="Options" position="left">
                <button onClick={(e) => { this.assignAsHead(e, item.EmpProfileID, empName); }} title={`Assign as ${(this.state.isTeam) ? 'Team' : 'Department'} Head`}>Assign as {(this.state.isTeam) ? 'Team' : 'Department'} Head</button>
                <button onClick={(e) => { this.transferEmp(e, item.EmpProfileID, empName, this.state.isTeam, groupName); }} title="Transfer Employee">Transfer</button>
                <button onClick={(e) => { this.props.disable(e, item.EmpProfileID, empName, EMP_STATUS_BLOCKED); }} title="Disable Account">Disable Account</button>
                <button onClick={(e) => { this.props.showTemplateList(e, item.EmpProfileID, false, 'Calendar', empName, false, true); }}>Assign Calendar Template</button>
                <button onClick={(e) => { this.props.showTemplateList(e, item.EmpProfileID, false, 'Shift', empName, false, true); }}>Assign Shift Schedule Template</button>
                <button onClick={(e) => { this.props.showTemplateList(e, item.EmpProfileID, false, 'Payroll', empName, false, true); }}>Assign Payroll Cutoff Template</button>
                <button onClick={(e) => { this.props.showTemplateList(e, item.EmpProfileID, false, 'WorkStat', empName, false, true); }}>Assign Work Status Template</button>
                <button onClick={(e) => { this.props.showTemplateList(e, item.EmpProfileID, false, 'DeskConfig', empName, false, true); }}>Assign Desktop Configuration Template</button>
                {/* <button>Transfer</button>
                <button>View Profile</button>
                <button>Assign Calendar Template</button>
                <button>Assign Shift Schedule Template</button>
                <button onClick={this.showDisable}>Disable Account</button> */}
              </OptionMenu>
            }
            <FontAwesomeIcon icon={faCheckCircle} />
          </dl>
        );
      });
    }

    return (
      <Wrapper>
        { (lists || this.state.isSearching) &&
          <Search search onClick={(val) => { this.searchEmpList(val); }} formRef={(el) => { this.searchForm = el; }} placeholder="Search Employees..." defaultVal={(this.state.searchVal) || ''} />
        }
        { (!this.props.isEnrolled && (lists || nodata)) &&
          <h3>
            <b>{groupName}</b> | Show All&nbsp;&nbsp;<ToggleSwitch value={this.state.isAll} hideReq update={this.showAllEmployee} />
            {(this.state.selectedEmployees.length > 0) && <button className="add-emp" onClick={this.enrollEmployee}><FontAwesomeIcon icon={faPlus} /></button>}
            <span className="total-emp">Total Selected Employees <b>{this.state.selectedEmployees.length}</b></span>
          </h3>
        }
        { (this.props.isEnrolled && !this.props.isTransfer && lists) &&
          <h3>
            <b>{groupName}</b> Enrolled Employees
            {(this.state.selectedEmployees.length > 0) && <button className="add-emp" onClick={this.unEnrollEmployee}><FontAwesomeIcon icon={faMinus} /></button>}
            <span className="total-emp">Total Selected Employees <b>{this.state.selectedEmployees.length}</b></span>
          </h3>
        }
        { (this.props.isEnrolled && this.props.isTransfer && lists) &&
          <h3>
            <b>{groupName}</b> Enrolled Employees
            {(this.state.selectedEmployees.length > 0) && <button className="add-emp" onClick={this.transferMembers}><FontAwesomeIcon icon={faPlus} /></button>}
            <span className="total-emp">Total Selected Employees <b>{this.state.selectedEmployees.length}</b></span>
          </h3>
        }
        <EMPList>
          {items}
        </EMPList>
        { (pages && maxPageIndex !== 1) &&
          <Pagination>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={<span>...</span>}
              breakClassName={'break-me'}
              pageCount={maxPageIndex}
              marginPagesDisplayed={1}
              pageRangeDisplayed={4}
              onPageChange={this.gotoPage}
              activeClassName={'active'}
            />
          </Pagination>
        }
      </Wrapper>
    );
  }
}

EMPListComponent.propTypes = {
  groupName: PropTypes.string,
  deptID: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  teamID: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  isEnrolled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  isTransfer: PropTypes.bool,
  isTeam: PropTypes.bool,
  assignHead: PropTypes.func,
  disable: PropTypes.func,
  // map state props
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  pages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  assignHeadSuccess: PropTypes.bool,
  transferSuccess: PropTypes.bool,
  showTemplateList: PropTypes.func,
  showTransfer: PropTypes.func,
  // Function dispatch props
  retrieveEmpList: PropTypes.func,
  retrieveEmpNoResetPage: PropTypes.func,
  enrollEmployees: PropTypes.func,
  unenrollEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('empList'),
  error: makeSelectError('empList'),
  lists: makeSelectData('empList'),
  pages: makeSelectPageDetails('empList'),
  assignHeadSuccess: makeSelectSuccess('assignHead'),
  transferSuccess: makeSelectSuccess('transfer'),
});

function mapDispatchToProps(dispatch) {
  return {
    retrieveEmpList: (id, isTeam, isEnrolled, isAll, search, page) => dispatch(getEmpList(id, isTeam, isEnrolled, isAll, search, page)),
    retrieveEmpNoResetPage: (id, isTeam, isEnrolled, isAll, search, page) => dispatch(getEmpListNoResetPages(id, isTeam, isEnrolled, isAll, search, page)),
    enrollEmployees: (ids, isTeam, deptID, teamID) => dispatch(getEnrollEmps(ids, isTeam, deptID, teamID)),
    unenrollEmployees: (ids, isTeam, deptID, teamID) => dispatch(getUnEnrollEmps(ids, isTeam, deptID, teamID)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(EMPListComponent);
