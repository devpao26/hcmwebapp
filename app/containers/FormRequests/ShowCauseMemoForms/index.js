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

/* Buttons  */
import ButtonEmp from './ButtonEmp';

import RequestForm from './RequestForm';
import EMPList from './List';

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
} from './action';

export class ShowCauseMemoForms extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      empProfileID: '',
      empFirstName: '',
      empLastName: '',
      empJobRole: '',
      empSearchVal: '',
      reason: '',
      dateOfIncident: '',
      sanction: '',
      violation: '',
      empvalidation: '',
      disableSelectedValue: '',
      startDate: moment().startOf('day'),
      endDate: moment().startOf('day'),
      isEmployeeLists: false,
      requiredEmployeeId: false,
      requiredReason: false,
      requiredDateOfIncident: false,
      requiredSanction: false,
      requireRulesViolation: false,
      requiredEmployeesId: false,
      employees: [],
      empListPageIndex: 1,
      selectedEmployees: [],
      selectedEmpNames: [],
    };
  }
  componentDidMount() {
    this.props.onShowReferrences();
  }
  // Get sanction referrences type id
  getSanctionReferrencesID = (e) => {
    this.setState({ sanction: e.currentTarget.value });

    const { sanction } = this.state;
    this.setState({ disableSelectedValue: 0 });

    if (sanction.length <= 0) this.setState({ requiredSanction: false });
  }
  // Get rule validation referrences type id
  getRuleValidationReferrencesID = (e) => {
    this.setState({ violation: e.currentTarget.value });

    const { violation } = this.state;
    this.setState({ disableSelectedValue: 0 });

    if (violation.length <= 0) this.setState({ requireRulesViolation: false });
  }
  // Get notes value
  getReason = (e) => {
    this.setState({
      reason: e.currentTarget.value,
      requiredReason: false,
    });
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
    });
    this.props.retrieveEmpList(1, false);
  }
  // Dismiss employee prompt
  dismissEmployee = () => {
    this.setState({
      isEmployeeLists: false,
      empSearchVal: '',
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
  // Reset state to its original value
  dismissSuccess = () => {
    this.setState({ isEmployeeLists: false });
    // Close Request Modal
    this.props.close();

    // Reset to original state
    this.props.onResetRequests();
  }
  // Submit Form Request
  submitFormRequest = () => {
    let error = false;
    const start = moment(this.state.startDate).format('YYYY-MM-DD');
    const { empProfileID, reason, sanction, violation, selectedEmpNames, selectedEmployees } = this.state;
    if (empProfileID === '') {
      this.setState({
        requiredEmployeeId: true,
      });
      error = true;
    }
    if (reason === '') {
      this.setState({
        requiredReason: true,
      });
      error = true;
    }
    if (sanction === '') {
      this.setState({
        requiredSanction: true,
      });
      error = true;
    }
    if (violation === '') {
      this.setState({
        requireRulesViolation: true,
      });
      error = true;
    }
    if (!Array.isArray(selectedEmployees) || !selectedEmployees.length) {
      this.setState({
        requiredEmployeesId: true,
      });
      error = true;
    }
    if (!error) this.props.onSubmitFormRequests(empProfileID, reason, start, sanction, violation, selectedEmployees);
  }
  // Search employee list
  searchEmpList = (name) => {
    this.setState({
      empSearchVal: (name) || '',
      empListPageIndex: 1,
    });
    this.props.retrieveEmpList(1, name);
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
  render() {
    const { loading, empListPageDetails, success, error, showRequestResponseSuccess, showRequestResponseError, showReferrences } = this.props;
    const { selectedEmpNames, disableSelectedValue } = this.state;
    let maxPageIndex = 1; // Get Max Page Index of the list (defaults to 1)
    let multipleSelectedEmployees;

    if (empListPageDetails != null) {
      maxPageIndex = empListPageDetails.MaxPageIndex;
    }
    if (selectedEmpNames) {
      multipleSelectedEmployees = selectedEmpNames.map((item) => <p value={item.id} key={item.id}>{item.name}</p>);
    }
    return (
      <span>
        <Modal
          show={this.props.show}
          title="Show Cause Memo Form"
          width="700px"
        >
          <RequestForm>
            <div className="grid-wrapper">
              <fieldset className="grid-6">
                <fieldset>
                  <label className={(this.state.requiredEmployeeId) && 'required-label'} htmlFor="select-employee">Select Employee <ButtonEmp onClick={(e) => { e.preventDefault(); this.showEmployees('singleemps'); }}><FontAwesomeIcon icon={faPlus} /></ButtonEmp></label>
                </fieldset>
                <fieldset>
                  <p className="selected">{(this.state.empLastName !== '' && this.state.empFirstName !== '') ? `${this.state.empLastName} ${this.state.empFirstName}` : '-'}</p>
                </fieldset>
                <fieldset>
                  <label htmlFor="Reason">Reason</label>
                  <textarea className={(this.state.requiredReason) && 'required-textarea'} onChange={this.getReason}></textarea>
                  {(this.state.requiredReason) && <small className="error-message">Please fill out this field.</small>}
                </fieldset>
                <fieldset>
                  <div className="half">
                    <label htmlFor="start-date">Date of Incident</label>
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
                </fieldset>
                <fieldset>
                  <label htmlFor="Category Options">Possible Sanction</label>
                  <span className={!this.state.requiredSanction ? 'select-custom' : 'select-custom required-label required-select'}>
                    <i className="fa fa-caret-down arrow-down" />
                    <select onChange={this.getSanctionReferrencesID}>
                      <option disabled={disableSelectedValue === 0}>Choose sanction options...</option>
                      {(showReferrences) && showReferrences[0].Sanction.map((item) => <option value={item.ID} key={item.ID}>{item.Name}</option>)}
                    </select>
                  </span>
                </fieldset>
                <fieldset>
                  <label htmlFor="Category Options">Possible Rule Violation</label>
                  <span className={!this.state.requireRulesViolation ? 'select-custom' : 'select-custom required-label required-select'}>
                    <i className="fa fa-caret-down arrow-down" />
                    <select onChange={this.getRuleValidationReferrencesID}>
                      <option disabled={disableSelectedValue === 0}>Choose rule violation options...</option>
                      {(showReferrences) && showReferrences[0].RuleViolation.map((item) => <option value={item.ID} key={item.ID}>{item.Name}</option>)}
                    </select>
                  </span>
                </fieldset>
                <fieldset>
                  <label className={(this.state.requiredEmployeesId) && 'required-label'} htmlFor="send-copy-to">Send Copy To <ButtonEmp className="right" onClick={(e) => { e.preventDefault(); this.showEmployees('multiemps'); }}><FontAwesomeIcon icon={faPlus} /></ButtonEmp></label>
                </fieldset>
                {(loading) && <span className="loading-cont"><LoadingIndicator /></span>}
                <ButtonWrapper>
                  <Button handleRoute={(e) => { this.submitFormRequest(); e.preventDefault(); }} color="gray">Submit</Button>
                  <Button handleRoute={this.props.close} color="red">Cancel</Button>
                </ButtonWrapper>
              </fieldset>
              <fieldset className="grid-6">
                <fieldset>
                  <label htmlFor="employee-in-question">Employee In Question</label>
                  <p className="selected">{(this.state.empLastName !== '' && this.state.empFirstName !== '') ? `${this.state.empLastName} ${this.state.empFirstName}` : '-'}</p>
                </fieldset>
                <fieldset>
                  <label className={(this.state.requiredEmployeesId) && 'required-label'} htmlFor="send-copy-to">Send Copy To</label>
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

ShowCauseMemoForms.propTypes = {
  loading: PropTypes.bool,
  show: PropTypes.bool,
  showRequestResponseSuccess: PropTypes.bool,
  showRequestResponseError: PropTypes.bool,
  close: PropTypes.func,
  retrieveEmpList: PropTypes.func,
  retrieveEmpListNoReset: PropTypes.func,
  onResetRequests: PropTypes.func,
  onSubmitFormRequests: PropTypes.func,
  onShowReferrences: PropTypes.func,
  empListPageDetails: PropTypes.any,
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
  showReferrences: makeSelectReferrences('referrences'),
  showRequestResponseError: makeSelectErrorToTrue(),
  showRequestResponseSuccess: makeSelectSuccessToTrue(),
});

function mapDispatchToProps(dispatch) {
  return {
    retrieveEmpList: (page, search) => dispatch(showEmployeeLists(page, search)),
    retrieveEmpListNoReset: (page, search) => dispatch(showEmployeeListsNoReset(page, search)),
    onSubmitFormRequests: (empProfileID, reason, start, sanction, violation, selectedEmployees) => dispatch(createFormRequest(empProfileID, reason, start, sanction, violation, selectedEmployees)),
    onResetRequests: () => dispatch(createFormRequestReset()),
    onShowReferrences: () => dispatch(workflowReferrences()),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'Forms', reducer });
const withSaga = injectSaga({ key: 'Forms', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ShowCauseMemoForms);
