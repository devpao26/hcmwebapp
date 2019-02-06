/*
 * Show Cause Memo Requests Form
 *
*/

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { PropTypes } from 'prop-types';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'components/datepicker.css';

/* Font Awesome */
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faPlus,
} from '@fortawesome/fontawesome-free-solid';

/* Global References */
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

/* Global Components */
import Modal from 'components/Modal';
import Button from 'components/Button';
import ButtonWrapper from 'components/Button/ButtonWrapper';
import LoadingIndicator from 'components/LoadingIndicator';
import Search from 'components/SearchFilter';
import Pagination from 'components/Pagination';
import ListBox from 'components/Modal/Listings';
import ConfirmBox from 'components/ConfirmationDialog';

/* Local Components */
import EMPList from 'containers/FormRequests/ShowRequestHearingForms/EmployeeLists';
import ApprovedSCMList from 'containers/FormRequests/ShowRequestHearingForms/ApprovedShowCauseLists';

/* Buttons */
import ButtonEmp from './ButtonEmp';
import RequestForm from './RequestForm';

import {
  makeSelectLoading,
  makeSelectPageDetails,
  makeSelectError,
  makeSelectSuccess,
  makeSelectErrorToTrue,
  makeSelectSuccessToTrue,
  makeSelectReferrences,
} from './selector';

import reducer from './reducer';
import saga from './saga';

import {
  createFormRequest,
  createFormRequestReset,
  showEmployeeLists,
  showEmployeeListsNoReset,
  workflowReferrences,
  approvedReferrences,
  resetApprovedReferrences,
} from './action';

export class ShowRequestHearingForms extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      empProfileID: '',
      empFirstName: '',
      empLastName: '',
      empJobRole: '',
      empSearchVal: '',
      approvedSearchVal: '',
      violation: '',
      dateofhearing: '',
      time: '',
      scmreqid: '',
      location: '',
      empvalidation: '',
      disableSelectedValue: '',
      startDate: moment().startOf('day'),
      endDate: moment().startOf('day'),
      isEmployeeLists: false,
      requiredEmployeeId: false,
      requiredEmployeesId: false,
      requiredViolation: false,
      requiredDateOfHearing: false,
      requiredTimeOfHearing: false,
      requiredLocation: false,
      showCauseMemoList: false,
      requiredSearchUnderInvestigation: false,
      employees: [],
      empListPageIndex: 1,
      approvedPageIndex: 1,
      selectedEmployees: [],
      selectedEmpNames: [],
    };
  }
  componentDidMount() {
    this.props.onShowReferrences(); // Show Workflow Referrences
  }
  // Submit Form Request
  onSendShowHearingRequest = () => {
    let error = false;
    const date = moment(this.state.startDate).format('YYYY-MM-DD');
    const { empProfileID, violation, location, time, scmreqid, selectedEmployees } = this.state;
    const hearingdate = `${date} ${time}`;

    if (empProfileID === '') {
      this.setState({
        requiredEmployeeId: true,
      });
      error = true;
    }
    if (violation === '') {
      this.setState({
        requiredViolation: true,
      });
      error = true;
    }
    if (time === '') {
      this.setState({
        requiredTimeOfHearing: true,
      });
      error = true;
    }
    if (location === '') {
      this.setState({
        requiredLocation: true,
      });
      error = true;
    }
    if (!Array.isArray(selectedEmployees) || !selectedEmployees.length) {
      this.setState({
        requiredEmployeesId: true,
      });
      error = true;
    }
    if (!error) this.props.onSubmitFormRequests(empProfileID, violation, hearingdate, scmreqid, location, selectedEmployees);
  }
  // Get time value
  getTime = () => {
    // Grab the time and split into hrs and mins
    const time = document.getElementById('time');

    const hrs = time.value.split(':')[0];
    const mins = time.value.split(':')[1];
    const newTime = `${(hrs % 12 || 12)}:${mins}${((hrs >= 12) ? ' PM' : ' AM')}`;
    this.setState({
      time: newTime,
      requiredTimeOfHearing: false,
    });
  }
  // Get sanction referrences type id
  getLocationID = (e) => {
    this.setState({ location: e.currentTarget.value });
    const { location } = this.state;
    this.setState({ disableSelectedValue: 0 });

    if (location.length <= 0) this.setState({ requiredLocation: false });
  }
  // Get violation value
  getViolation = (e) => {
    this.setState({
      violation: e.currentTarget.value,
      requiredViolation: false,
    });
  }
  // Show approved show cause memo list
  showCauseMemo = () => {
    const { empProfileID } = this.state;

    if (empProfileID !== '') {
      this.setState({
        showCauseMemoList: !this.state.showCauseMemoList,
        requiredSearchUnderInvestigation: false,
      });
      this.props.onShowApprovedRefs(1, false, empProfileID); // Show Approved Show Cause Memo List
    } else {
      this.setState({
        requiredSearchUnderInvestigation: true,
      });
    }
  }
  // Dimiss Dialog Lists
  addDismissLists = () => {
    this.setState({
      isEmployeeLists: false,
    });
  }
  // Handle Date Picker Dates
  handleChangeStart = (date) => {
    this.setState({
      startDate: date,
      endDate: moment(date).add(1, 'day'),
      dateError: false,
      errorMsg: false,
    });
  }
  // Show employee prompt
  showEmployees = (empvalidation) => {
    this.setState({
      isEmployeeLists: true,
      empvalidation,
      requiredSearchUnderInvestigation: false,
    });
    this.props.retrieveEmpList(1, false);
  }
  // Dismiss employee prompt
  dismissEmployee = () => {
    this.setState({
      isEmployeeLists: false,
      showCauseMemoList: false,
      empSearchVal: '',
      approvedSearchVal: '',
      approvedPageIndex: 1,
      empListPageIndex: 1,
    });
  }
  // Paginate employee listings
  gotoEmpListPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      empListPageIndex: page,
    });
    this.props.retrieveEmpListNoReset(page, this.state.empSearchVal);
  }
  // Paginate employee listings
  gotoApprovedListPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      approvedPageIndex: page,
    });
    this.props.onShowApprovedRefsNoReset(page, this.state.approvedSearchVal);
  }
  // Reset state to its original value
  dismissSuccess = () => {
    this.setState({ isEmployeeLists: false });
    // Close Request Modal
    this.props.close();

    // Reset to original state
    this.props.onResetRequests();
  }
  // Search employee list
  searchEmpList = (name) => {
    this.setState({
      empSearchVal: (name) || '',
      empListPageIndex: 1,
    });
    this.props.retrieveEmpList(1, name);
  }
  // Search employee list
  searchApproveList = (approvedname) => {
    this.setState({
      approvedSearchVal: (approvedname) || '',
      approvedPageIndex: 1,
    });
    this.props.onShowApprovedRefs(1, approvedname);
  }
  // Show single selected employee list
  showAssignedEmployee = (empProfileID, empFirstName, empLastName, empJobRole) => {
    this.setState({
      empProfileID,
      empFirstName,
      empLastName,
      empJobRole,
      requiredEmployeeId: false,
      isEmployeeLists: false,
    });
  }
  // Show multiple selected employee list
  showMultipleAssignedEmployee = (selectedEmployees, selectedEmpNames) => {
    this.setState({
      selectedEmployees,
      selectedEmpNames,
      requiredEmployeesId: false,
    });
  }
  // Select assigned case and id
  assignedShowCauseList = (scmreqid) => {
    this.setState({
      scmreqid,
      showCauseMemoList: false,
    });
  }
  render() {
    const { loading, empListPageDetails, success, error, showRequestResponseSuccess, showRequestResponseError, showReferrences, approvedPageDetails } = this.props;

    const { selectedEmpNames, disableSelectedValue } = this.state;
    let maxPageIndex = 1; // Get Max Page Index of the list (defaults to 1)
    let multipleSelectedEmployees;

    if (empListPageDetails != null) {
      maxPageIndex = empListPageDetails.MaxPageIndex;
    }
    if (selectedEmpNames) {
      multipleSelectedEmployees = selectedEmpNames.map((item) => <p value={item.id} key={item.id}>{(item.name)}</p>);
    }
    return (
      <span>
        <Modal
          show={this.props.show}
          title="Hearing Form"
          width="700px"
        >
          <RequestForm>
            <div className="grid-wrapper">
              <fieldset className="grid-6">
                <fieldset>
                  <label className={(this.state.requiredEmployeeId) && 'required-label'} htmlFor="search-employee-under-investigation">Search Employee Under Investigation <ButtonEmp onClick={(e) => { e.preventDefault(); this.showEmployees('singleemps'); }}><FontAwesomeIcon icon={faPlus} /></ButtonEmp></label>
                </fieldset>
                <fieldset>
                  <label htmlFor="Reason">Violation</label>
                  <textarea className={(this.state.requiredViolation) && 'required-textarea'} onChange={this.getViolation}></textarea>
                  {(this.state.requiredReason) && <small className="error-message">Please fill out this field.</small>}
                </fieldset>
                <fieldset>
                  <label className={(this.state.requiredEmployeeId) && 'required-label'} htmlFor="show-cause-memo">Show Cause Memo <ButtonEmp onClick={(val) => { this.showCauseMemo(val); }}><FontAwesomeIcon icon={faPlus} /></ButtonEmp></label>
                  <small className={(this.state.requiredSearchUnderInvestigation) ? 'required-label' : 'hide'}>You must select first search employee under investigation</small>
                </fieldset>
                <fieldset>
                  <div className="half">
                    <label htmlFor="start-date">Date of Hearing</label>
                    <span className="select-custom">
                      <i className="fa fa-caret-down" />
                      <DatePicker
                        selected={this.state.startDate}
                        selectsStart
                        startDate={this.state.startDate}
                        onChange={this.handleChangeStart}
                        dateFormat="LL"
                        minDate={moment().startOf('day')}
                      />
                    </span>
                  </div>
                  <div className="half">
                    <label htmlFor="time-of-hearing">Time of Hearing</label>
                    <span className="select-custom">
                      <input className={(this.state.requiredTimeOfHearing) && 'required-select'} id="time" type="time" onChange={this.getTime} />
                    </span>
                  </div>
                </fieldset>
                <fieldset>
                  <label htmlFor="Category Options">Location</label>
                  <span className={!this.state.requiredLocation ? 'select-custom' : 'select-custom required-label required-select'}>
                    <i className="fa fa-caret-down arrow-down" />
                    <select onChange={this.getLocationID}>
                      <option disabled={disableSelectedValue === 0}>Choose location...</option>
                      {(showReferrences) && showReferrences[0].HearingLocation.map((item) => <option value={item.ID} key={item.ID}>{item.Name}</option>)}
                    </select>
                  </span>
                </fieldset>
                <fieldset>
                  <label className={(this.state.requiredEmployeesId) && 'required-label'} htmlFor="committee-members">Committee Members <ButtonEmp className="right" onClick={(e) => { e.preventDefault(); this.showEmployees('multiemps'); }}><FontAwesomeIcon icon={faPlus} /></ButtonEmp></label>
                </fieldset>
                {(loading) && <span className="loading-cont"><LoadingIndicator /></span>}
                <ButtonWrapper>
                  <Button handleRoute={() => { this.onSendShowHearingRequest(); }} color="gray">Submit</Button>
                  <Button handleRoute={this.props.close} color="red">Cancel</Button>
                </ButtonWrapper>
              </fieldset>
              <fieldset className="grid-6">
                <fieldset>
                  <label htmlFor="employee-in-question">Employee In Question</label>
                  <p className="selected">{(this.state.empLastName !== '' && this.state.empFirstName !== '') ? `${this.state.empLastName} ${this.state.empFirstName}` : '-'}</p>
                </fieldset>
                <fieldset>
                  <label className={(this.state.requiredEmployeesId) && 'required-label'} htmlFor="committee-members">Committee Members</label>
                  {multipleSelectedEmployees}
                </fieldset>
              </fieldset>
            </div>
          </RequestForm>
        </Modal>
        <Modal
          show={this.state.isEmployeeLists}
          onClose={this.dismissEmployee}
          showCloseBtn
          title="Employee List"
          width="340px"
        >
          <ListBox>
            <Search search onClick={(val) => { this.searchEmpList(val); }} placeholder="Search Employees..." defaultVal={this.state.empSearchVal} />
            {(this.state.empvalidation === 'multiemps') && <span className="right right-emp"><ButtonEmp onClick={(e) => { e.preventDefault(); this.setState({ isEmployeeLists: false }); }}><FontAwesomeIcon icon={faPlus} /></ButtonEmp></span>}
            <EMPList showempvalidation={this.state.empvalidation} selectEmp={this.showAssignedEmployee} selectMultipleEmp={this.showMultipleAssignedEmployee} />
            {(empListPageDetails && maxPageIndex !== 1) &&
              <Pagination>
                <ReactPaginate
                  previousLabel={'Previous'}
                  nextLabel={'Next'}
                  breakLabel={<span>...</span>}
                  breakClassName={'break-me'}
                  pageCount={maxPageIndex}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={4}
                  onPageChange={this.gotoEmpListPage}
                  activeClassName={'active'}
                />
              </Pagination>
            }
          </ListBox>
        </Modal>
        <Modal
          show={this.state.showCauseMemoList}
          onClose={this.dismissEmployee}
          showCloseBtn
          title="Show Cause Memo List"
          width="340px"
        >
          <ListBox>
            <Search search onClick={(val) => { this.searchApproveList(val); }} placeholder="Search Employees..." defaultVal={this.state.approvedSearchVal} />
            <ApprovedSCMList selectSCM={this.assignedShowCauseList} />
            {(approvedPageDetails && maxPageIndex !== 1) &&
              <Pagination>
                <ReactPaginate
                  previousLabel={'Previous'}
                  nextLabel={'Next'}
                  breakLabel={<span>...</span>}
                  breakClassName={'break-me'}
                  pageCount={maxPageIndex}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={4}
                  onPageChange={this.gotoApprovedListPage}
                  activeClassName={'active'}
                />
              </Pagination>
            }
          </ListBox>
        </Modal>
        {/* Show Success Response */}
        { (showRequestResponseSuccess === true) &&
          (<ConfirmBox
            show={this.props.show}
            title="Request Success"
            onClick={this.dismissSuccess}
            okBtnText="OK"
          >
            {success}
          </ConfirmBox>)
        }
        {/* Show Error Response */}
        { (showRequestResponseError === true) &&
          (<ConfirmBox
            show={this.props.show}
            title="Request Failed"
            onClick={this.dismissSuccess}
            okBtnText="OK"
          >
            {error.ErrorCode === 400 ? "There's no Workflow associated to your request yet. Kindly contact support." : error.ErrorMsg}
          </ConfirmBox>)
        }
      </span>
    );
  }
}

ShowRequestHearingForms.propTypes = {
  loading: PropTypes.bool,
  show: PropTypes.bool,
  showRequestResponseSuccess: PropTypes.bool,
  showRequestResponseError: PropTypes.bool,
  close: PropTypes.func,
  retrieveEmpList: PropTypes.func,
  retrieveEmpListNoReset: PropTypes.func,
  onResetRequests: PropTypes.func,
  onShowApprovedRefsNoReset: PropTypes.func,
  onSubmitFormRequests: PropTypes.func,
  onShowReferrences: PropTypes.func,
  onShowApprovedRefs: PropTypes.func,
  empListPageDetails: PropTypes.any,
  approvedPageDetails: PropTypes.any,
  error: PropTypes.any,
  success: PropTypes.any,
  showReferrences: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('submitForm'),
  success: makeSelectSuccess('submitForm'),
  error: makeSelectError('submitForm'),
  empListPageDetails: makeSelectPageDetails('employeelists'),
  approvedPageDetails: makeSelectPageDetails('approvedrefs'),
  showReferrences: makeSelectReferrences('referrences'),
  showRequestResponseError: makeSelectErrorToTrue(),
  showRequestResponseSuccess: makeSelectSuccessToTrue(),
});

function mapDispatchToProps(dispatch) {
  return {
    retrieveEmpList: (page, search) => dispatch(showEmployeeLists(page, search)),
    retrieveEmpListNoReset: (page, search) => dispatch(showEmployeeListsNoReset(page, search)),
    onSubmitFormRequests: (empProfileID, violation, hearingdate, scmreqid, locationid, selectedEmployees) => dispatch(createFormRequest(empProfileID, violation, hearingdate, scmreqid, locationid, selectedEmployees)),
    onResetRequests: () => dispatch(createFormRequestReset()),
    onShowReferrences: () => dispatch(workflowReferrences()),
    onShowApprovedRefs: (page, search, id) => dispatch(approvedReferrences(page, search, id)),
    onShowApprovedRefsNoReset: (page, search) => dispatch(resetApprovedReferrences(page, search)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'Forms', reducer });
const withSaga = injectSaga({ key: 'Forms', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ShowRequestHearingForms);
