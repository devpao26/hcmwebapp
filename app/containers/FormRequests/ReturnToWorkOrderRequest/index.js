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

import {
  RTWO_OTHERSREFS,
}
from 'containers/App/constants';
/* Buttons  */
import ButtonEmp from './ButtonEmp';

import RequestForm from './RequestForm';
import EMPList from './List';

import {
  makeSelectPageDetails,
  makeSelectObjectList,
  makeSelectSuccessResponse,
  makeSelectErrorResponse,
  makeSelectErrorToTrue,
  makeSelectSuccessToTrue,
} from './selector';

import reducer from './reducer';
import saga from './saga';

import {
  createRTWOrequest,
  createRTWOrequestReset,
  RTWOReferrences,
  showEmployeeLists,
  showEmployeeListsNoReset,
} from './action';

export class ReturnToWorkOrderForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      successToTrue: true,
      errorToTrue: true,
      description: '',
      empProfileID: '',
      empFirstName: '',
      empLastName: '',
      empJobRole: '',
      referrenceTypeID: '',
      customInputValue: '',
      time: '',
      disableSelectedValue: '',
      startDate: moment().startOf('day'),
      endDate: moment().startOf('day'),
      dateError: false,
      isEmployeeLists: false,
      employees: [],
      requiredTextArea: false,
      requiredSelect: false,
      requiredCategoryID: false,
      requiredTime: false,
      requiredEmployeeId: false,
      requiredOtherRefs: false,
      empSearchVal: '',
      empListPageIndex: 1,
    };
  }
  // Execute components until the DOM is loaded
  componentDidMount() {
    // retrieve rtwo references
    this.props.onShowRTWOReferrences();
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
      requiredTime: false,
    });
  }
  // Get value for input of other types
  getOtherReferrences = (e) => {
    this.setState({
      customInputValue: e.currentTarget.value,
      requiredOtherRefs: false,
    });
  }
  // Get referrences type id
  getReferrencesID = (e) => {
    this.setState({
      referrenceTypeID: e.currentTarget.value,
      requiredSelect: false,
      requiredCategoryID: false,
      disableSelectedValue: 0,
    });
  }
  // Get Description's value
  getDescription = (e) => {
    this.setState({
      description: e.currentTarget.value,
      requiredTextArea: false,
    });
  }
  // Dismiss Dialog
  addDismissLists = () => {
    this.setState({
      isEmployeeLists: false,
    });
  }
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
  // Search list
  searchEmpList = (name) => {
    this.setState({
      empSearchVal: (name) || '',
      empListPageIndex: 1,
    });
    this.props.retrieveEmpList(1, name);
  }
  // Submit return to work order in action
  sendRTWOFormRequest = () => {
    const start = this.state.startDate;
    // const end = this.state.endDate;
    const { description, referrenceTypeID, empProfileID, time, customInputValue } = this.state;
    let error = false;
    this.setState({ loading: true });
    if (empProfileID === '') {
      this.setState({ requiredEmployeeId: true, loading: false });
      error = true;
    }
    if (description === '') {
      this.setState({ requiredTextArea: true, loading: false });
      error = true;
    }
    if (referrenceTypeID === '' && referrenceTypeID !== RTWO_OTHERSREFS) {
      this.setState({ requiredSelect: true, requiredCategoryID: true, requiredOtherRefs: true, loading: false });
      error = true;
    }
    if (referrenceTypeID === RTWO_OTHERSREFS && customInputValue === '') {
      this.setState({ requiredSelect: true, requiredCategoryID: true, requiredOtherRefs: true, loading: false });
      error = true;
    }
    if (time === '') {
      this.setState({ requiredTime: true, loading: false });
      error = true;
    }
    if (!error) this.props.onSendRTWORequest(empProfileID, referrenceTypeID, description, moment(start).format('YYYY-MM-DD'), time);
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
  gotoEmpListPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      empListPageIndex: page,
    });
    this.props.retrieveEmpListNoReset(page, this.state.empSearchVal);
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
      endDate: date,
      startDate: moment(date).subtract(1, 'day'),
      dateError: false,
      errorMsg: false,
    });
  }
  // Reset state to its original value
  dismissSuccess = () => {
    this.setState({ isEmployeeLists: false });
    this.setState({ loading: false });
    // Close Request Modal
    this.props.close();

    // Reset to original state
    this.props.onResetRequests();
  }

  render() {
    const { empListPageDetails, showRTWOReferrences, showSuccessResponse, showErrorResponse, showRequestResponseSuccess, showRequestResponseError } = this.props;
    const { loading, disableSelectedValue } = this.state;

    let maxPageIndex = 1; // Get Max Page Index of the list (defaults to 1)

    if (empListPageDetails != null) {
      maxPageIndex = empListPageDetails.MaxPageIndex;
    }

    // Show return to work order type referrences
    let returntoworkorder;
    if (showRTWOReferrences) {
      const ref = showRTWOReferrences[0].RTWOReasonList;
      returntoworkorder = ref.map((obj) => <option value={obj.ID} key={obj.ID}>{obj.Name}</option>);
    }

    return (
      <span>
        <Modal
          show={this.props.show}
          title="Return to Work Order Form"
          width="700px"
        >
          <RequestForm>
            <div className="grid-wrapper">
              <fieldset className="grid-6">
                <fieldset>
                  <label className={(this.state.requiredEmployeeId) && 'required-label'} htmlFor="select-employee">Select Employee <ButtonEmp onClick={this.showEmployees}><FontAwesomeIcon icon={faPlus} /></ButtonEmp></label>
                </fieldset>
                <fieldset>
                  <label htmlFor="Category Options">Category</label>
                  <span className={(this.state.requiredCategoryID) ? 'select-custom required-select' : 'select-custom'} >
                    <i className="fa fa-caret-down arrow-down" />
                    <select onChange={this.getReferrencesID}>
                      <option disabled={disableSelectedValue === 0}>Choose category options...</option>
                      {returntoworkorder}
                    </select>
                  </span>
                  { this.state.referrenceTypeID === RTWO_OTHERSREFS && <input type="text" className={(this.state.requiredOtherRefs) && 'required-select'} placeholder="Other type that is not listed above" onChange={this.getOtherReferrences} /> }
                </fieldset>
                <fieldset>
                  <label htmlFor="Description">Note</label>
                  <textarea className={(this.state.requiredTextArea) && 'required-textarea'} onChange={this.getDescription}></textarea>
                  {(this.state.requiredTextArea) && <small className="error-message">Please fill out this field.</small>}
                </fieldset>
                <fieldset>
                  <div className="half">
                    <label htmlFor="start-date">Date</label>
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
                    <label htmlFor="time">Time</label>
                    <span className="select-custom">
                      <input className={(this.state.requiredTime) && 'required-select'} id="time" type="time" onChange={this.getTime} />
                    </span>
                  </div>
                </fieldset>
              </fieldset>
              <fieldset className="grid-7">
                <label htmlFor="employee-information">Selected Employee</label>
                <p>{this.state.empLastName && this.state.empFirstName !== '' ? `${this.state.empLastName}, ${this.state.empFirstName}` : '-'}</p>
              </fieldset>
            </div>
            {(loading) && <span className="loading-cont"><LoadingIndicator /></span>}
            <div className="right">
              <Button handleRoute={(e) => { e.preventDefault(); this.sendRTWOFormRequest(); }} color="gray">Submit</Button>
              <Button handleRoute={this.props.close} color="red">Cancel</Button>
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

ReturnToWorkOrderForm.propTypes = {
  show: PropTypes.bool,
  showRequestResponseSuccess: PropTypes.bool,
  showRequestResponseError: PropTypes.bool,
  close: PropTypes.func,
  retrieveEmpList: PropTypes.func,
  retrieveEmpListNoReset: PropTypes.func,
  onShowRTWOReferrences: PropTypes.func,
  onSendRTWORequest: PropTypes.func,
  onResetRequests: PropTypes.func,
  empListPageDetails: PropTypes.any,
  showErrorResponse: PropTypes.any,
  showSuccessResponse: PropTypes.any,
  showRTWOReferrences: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
};

const mapStateToProps = createStructuredSelector({
  empListPageDetails: makeSelectPageDetails('employeelists'),
  showRTWOReferrences: makeSelectObjectList('rtworeferrences'),
  showSuccessResponse: makeSelectSuccessResponse(),
  showErrorResponse: makeSelectErrorResponse(),
  showRequestResponseError: makeSelectErrorToTrue(),
  showRequestResponseSuccess: makeSelectSuccessToTrue(),
});

function mapDispatchToProps(dispatch) {
  return {
    retrieveEmpList: (page, search) => dispatch(showEmployeeLists(page, search)),
    retrieveEmpListNoReset: (page, search) => dispatch(showEmployeeListsNoReset(page, search)),
    onShowRTWOReferrences: () => dispatch(RTWOReferrences()),
    onSendRTWORequest: (empprofileid, rtwotypeid, reason, requestdate, requesttime) => dispatch(createRTWOrequest(empprofileid, rtwotypeid, reason, requestdate, requesttime)),
    onResetRequests: () => dispatch(createRTWOrequestReset()),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'Forms', reducer });
const withSaga = injectSaga({ key: 'Forms', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ReturnToWorkOrderForm);
