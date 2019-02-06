/*
 * Return To Work Order Requests Form
 *
*/

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'components/datepicker.css';
import ReactPaginate from 'react-paginate';

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
import LoadingIndicator from 'components/LoadingIndicator';
import Search from 'components/SearchFilter';
import Pagination from 'components/Pagination';
import ListBox from 'components/Modal/Listings';
import ConfirmBox from 'components/ConfirmationDialog';

/* Lists Retrieval */
import EMPList from 'containers/FormRequests/ShiftScheduleFormRequest/EmployeeList';
import SHIFTList from 'containers/FormRequests/ShiftScheduleFormRequest/ShiftList';

/* Buttons  */
import ButtonEmp from './ButtonEmp';
import RequestForm from './RequestForm';

import { makeSelectLoading, makeSelectPageDetails, makeSelectSuccessResponse, makeSelectErrorResponse, makeSelectErrorToTrue, makeSelectSuccessToTrue, makeSelectUserData } from './selector';

import reducer from './reducer';
import saga from './saga';

import {
  createShiftRequest,
  createShiftrequestReset,
  showEmployeeLists,
  showEmployeeListsNoReset,
  showShiftLists,
  showShiftListNoReset,
} from './action';

export class ShiftScheduleFormRequest extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      empProfileID: '',
      empFirstName: '',
      empLastName: '',
      empSearchVal: '',
      shiftSearchVal: '',
      shiftName: '',
      shiftID: '',
      requestor: 0,
      comparedstring: '',
      startDate: moment().startOf('day'),
      endDate: moment().startOf('day'),
      dateError: false,
      isEmployeeLists: false,
      empListPageIndex: 1,
      shiftPageIndex: 1,
      employees: [],
      requiredShiftID: false,
      requiredSelectShift: false,
    };
  }
  // Load DOM on page load
  componentDidMount() {
    this.props.retrieveShiftList();
  }
  // Create Shift Schedule Request
  onSendShiftScheduleRequest = (defaultuserid) => {
    const start = moment(this.state.startDate).format('YYYY-MM-DD');
    const end = moment(this.state.endDate).format('YYYY-MM-DD');
    const { shiftID, requestor, empProfileID } = this.state;
    let error = false;
    if (shiftID === '') {
      this.setState({
        requiredSelectShift: true,
      });
      error = true;
    }
    if (!error) this.props.onCreateShift(defaultuserid, empProfileID, shiftID, start, end, requestor);
  }
  // Dismiss Dialog
  addDismissLists = () => {
    this.setState({
      isEmployeeLists: false,
    });
  }
  showAssignedEmployee = (empProfileID, empFirstName, empLastName, requestor) => {
    this.setState({
      empProfileID,
      empFirstName,
      empLastName,
      requestor,
      requiredEmployeeId: false,
      isEmployeeLists: false,
      isSelectedEmployee: true,
    });
  }
  showAssignedShiftTemplate = (shiftID, shiftName, requestor) => {
    this.setState({
      shiftID,
      shiftName,
      requestor,
      requiredSelectShift: false,
    });
  }
  // Search Employee list
  searchEmpList = (name) => {
    this.setState({
      empSearchVal: (name) || '',
      empListPageIndex: 1,
    });
    this.props.retrieveEmpList(1, name);
  }
  // Show employee dialog
  showEmployees = () => {
    this.setState({
      isEmployeeLists: true,
    });
    this.props.retrieveEmpList(1, false);
  }
  // Dismiss employee lists
  dismissEmployee = () => {
    this.setState({
      isEmployeeLists: false,
      empSearchVal: '',
      empListPageIndex: 1,
    });
  }
  // Navigate Employee List
  gotoEmpListPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      empListPageIndex: page,
    });
    this.props.retrieveEmpListNoReset(page, this.state.empSearchVal);
  }
  gotoShiftListPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      shiftPageIndex: page,
    });
    this.props.retrieveShiftListNoReset(page, this.state.shiftSearchVal);
  }
  // Search Employee list
  searchShiftList = (name) => {
    this.setState({
      shiftSearchVal: (name) || '',
      shiftPageIndex: 1,
    });
    this.props.retrieveShiftList(1, name);
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

  handleChangeEnd = (date) => {
    this.setState({
      endDate: moment(date),
      dateError: false,
      errorMsg: false,
    });
  }
  // Reset state to its original value
  dismissSuccess = () => {
    this.setState({ isEmployeeLists: false });
    // Close Request Modal
    this.props.close();

    // Reset to original state
    this.props.onResetRequests();
  }

  render() {
    const { loading, empListPageDetails, empShiftPageDetails, showSuccessResponse, showErrorResponse, showRequestResponseSuccess, showRequestResponseError, userData } = this.props;
    const defaultuserid = userData.EmpProfileID;
    const { isSelectedEmployee } = this.state;

    let maxPageIndex = 1; // Get Max Page Index of the list (defaults to 1)

    if (empListPageDetails != null) {
      maxPageIndex = empListPageDetails.MaxPageIndex;
    }
    if (empShiftPageDetails != null) {
      maxPageIndex = empShiftPageDetails.MaxPageIndex;
    }
    return (
      <span>
        <Modal
          show={this.props.show}
          title="Shift Schedule Request"
          width="700px"
        >
          <RequestForm>
            <div className="grid-wrapper">
              <fieldset className="grid-6">
                <fieldset className="border-bottom">
                  <label htmlFor="requestor">Requestor</label>
                  {(isSelectedEmployee) ? <span>{this.state.empLastName}, {this.state.empFirstName}</span> : <span>{userData.LastName}, {userData.FirstName}</span>}
                </fieldset>
                <fieldset>
                  <label htmlFor="select-employee">Request Another Employee <ButtonEmp onClick={this.showEmployees}><FontAwesomeIcon icon={faPlus} /></ButtonEmp></label>
                </fieldset>
                <fieldset>
                  <label htmlFor="on-dates">On Dates</label>
                  <div className="half">
                    <i className="fa fa-caret-down" />
                    <DatePicker
                      selected={this.state.startDate}
                      selectsStart
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleChangeStart}
                      dateFormat="LL"
                      minDate={this.state.startDate}
                    />
                  </div>
                  <small className="middle">to</small>
                  <div className="half">
                    <i className="fa fa-caret-down" />
                    <DatePicker
                      selected={this.state.endDate}
                      selectsEnd
                      endDate={this.state.endDate}
                      onChange={this.handleChangeEnd}
                      dateFormat="LL"
                      popperPlacement="bottom-end"
                      minDate={this.state.startDate}
                    />
                  </div>
                </fieldset>
                <fieldset>
                  {(loading) && <span className="loading-cont"><LoadingIndicator /></span>}
                  <div className="btn-center">
                    <Button handleRoute={(e) => { e.preventDefault(); this.onSendShiftScheduleRequest(defaultuserid); }} color="gray">Submit</Button>
                    <Button handleRoute={() => { this.props.close(); this.setState({ isSelectedEmployee: false }); }} color="red">Cancel</Button>
                  </div>
                </fieldset>
              </fieldset>
              <fieldset className="grid-7">
                <label className={(this.state.requiredSelectShift) && 'required-label'} htmlFor="shift-template">Select Shift Template</label>
                <Search search onClick={(val) => { this.searchShiftList(val); }} placeholder="Search Shift Names..." defaultVal={this.state.shiftSearchVal} />
                <SHIFTList selectShift={this.showAssignedShiftTemplate} />
                {(empShiftPageDetails && maxPageIndex !== 1) &&
                  <Pagination>
                    <ReactPaginate
                      previousLabel={'Previous'}
                      nextLabel={'Next'}
                      breakLabel={<span>...</span>}
                      breakClassName={'break-me'}
                      pageCount={maxPageIndex}
                      marginPagesDisplayed={1}
                      pageRangeDisplayed={4}
                      onPageChange={this.gotoShiftListPage}
                      activeClassName={'active'}
                    />
                  </Pagination>
                }
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

            <EMPList selectEmp={this.showAssignedEmployee} />

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
            {showSuccessResponse}
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
            {showErrorResponse.ErrorMsg}
          </ConfirmBox>)
        }
      </span>
    );
  }
}
ShiftScheduleFormRequest.propTypes = {
  loading: PropTypes.bool,
  show: PropTypes.bool,
  close: PropTypes.func,
  userData: PropTypes.object,
  retrieveEmpList: PropTypes.func,
  retrieveEmpListNoReset: PropTypes.func,
  onResetRequests: PropTypes.func,
  retrieveShiftList: PropTypes.func,
  retrieveShiftListNoReset: PropTypes.func,
  onCreateShift: PropTypes.func,
  showRequestResponseSuccess: PropTypes.bool,
  showRequestResponseError: PropTypes.bool,
  empListPageDetails: PropTypes.any,
  empShiftPageDetails: PropTypes.any,
  showErrorResponse: PropTypes.any,
  showSuccessResponse: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('saveRequest'),
  empListPageDetails: makeSelectPageDetails('employeelists'),
  empShiftPageDetails: makeSelectPageDetails('shiftlists'),
  showSuccessResponse: makeSelectSuccessResponse(),
  showErrorResponse: makeSelectErrorResponse(),
  showRequestResponseError: makeSelectErrorToTrue(),
  showRequestResponseSuccess: makeSelectSuccessToTrue(),
  userData: makeSelectUserData(),
});

function mapDispatchToProps(dispatch) {
  return {
    retrieveEmpList: (page, search) => dispatch(showEmployeeLists(page, search)),
    retrieveEmpListNoReset: (page, search) => dispatch(showEmployeeListsNoReset(page, search)),
    retrieveShiftList: (page, search) => dispatch(showShiftLists(page, search)),
    retrieveShiftListNoReset: (page, search) => dispatch(showShiftListNoReset(page, search)),
    onCreateShift: (defaultid, employeeid, shifttempid, datefrom, dateto, isrequestotheremp) => dispatch(createShiftRequest(defaultid, employeeid, shifttempid, datefrom, dateto, isrequestotheremp)),
    onResetRequests: () => dispatch(createShiftrequestReset()),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'Forms', reducer });
const withSaga = injectSaga({ key: 'Forms', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ShiftScheduleFormRequest);
