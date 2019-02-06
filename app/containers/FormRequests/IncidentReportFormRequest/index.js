/*
 * Incident Request Form Page
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
  faPlus, faPaperclip,
} from '@fortawesome/fontawesome-free-solid';

/* Global References */
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

/* Global Components */
import Dialog from 'components/WorkGroup/Dialog';
import Modal from 'components/Modal';
import EMPList from 'components/Employee/SmallEMPList';
import Button from 'components/Button';
import ConfirmBox from 'components/ConfirmationDialog';
import Loading from 'components/LoadingIndicator/Loading';
import LoadingIndicator from 'components/LoadingIndicator';
import Search from 'components/SearchFilter';
import Avatar from 'components/Img/Avatar';
import Pagination from 'components/Pagination';

/* Buttons  */
import ButtonEmp from './ButtonEmp';

import RequestForm from './RequestForm';

import {
  makeSelectPageDetails, makeSelectEmployeeLists, makeSelectIRFReferrences,
  makeShowSuccessCode, makeShowSuccessMessage, makeShowErrorCode,
  makeShowErrorMessage, makeSelectLoading, makeSelectError, makeSelectLoadingEmployee,
} from './selector';

import reducer from './reducer';
import saga from './saga';

import { showEmployeeLists, searchLists,
  IRFReferrences, createIRFRequests, dismissIRFForms,
} from './action';

export class IncidentReportFormsRequest extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isIncidentReportForm: this.props.show,
      description: '',
      location: '',
      referrenceTypeID: '',
      empProfileID: '',
      departmentName: '',
      teamName: '',
      empFirstName: '',
      empLastName: '',
      empJobPosition: '',
      value: '',
      time: '',
      departmentHeadName: '',
      teamHeadName: '',
      files: [],
      startDate: moment().startOf('day'),
      endDate: moment().startOf('day'),
      dateError: false,
      isEmployeeLists: false,
      requiredSelect: false,
      requiredTextArea: false,
      requiredLoc: false,
      requiredFileAttacment: false,
      requiredTime: false,
      requiredInitial: false,
      loading: false,
      empSearchVal: '',
      empListPageIndex: 1,
    };
  }
  componentDidMount() {
    this.props.onShowIRFReferrences();
  }
  // Get time value
  getTime = () => {
    // Grab the time and split into hrs and mins
    const getNewTime = document.getElementById('time');
    const hrs = getNewTime.value.split(':')[0];
    const mins = getNewTime.value.split(':')[1];

    this.setState({ time: getNewTime });
    if (this.state.time.length <= 0) this.setState({ requiredTime: false });

    return (hrs % 12 || 12) + ':' + mins + ((hrs >= 12) ? 'PM' : 'AM');
  }
  // Get referrences type id
  getReferrencesID = (e) => {
    this.setState({ referrenceTypeID: e.currentTarget.value });

    const { referrenceTypeID } = this.state;

    if (referrenceTypeID.length <= 0) this.setState({ requiredSelect: false });
  }
  // Get Location's Value
  getLocation = (e) => {
    this.setState({ location: e.currentTarget.value });

    const { location } = this.state;

    if (location.length <= 0) this.setState({ requiredLoc: false });
  }
  // Get Description's value
  getDescription = (e) => {
    this.setState({ description: e.currentTarget.value });
    const { description } = this.state;

    if (description.length <= 0) this.setState({ requiredTextArea: false });
  }
  // Show employee details
  showAssignedEmployee = (e, empProfileID, empFirstName, empLastName, empJobPosition, departmentName, teamName, departmentHeadName, teamHeadName) => {
    e.preventDefault();

    this.setState({ empProfileID, empFirstName, empLastName, empJobPosition, departmentName, teamName, departmentHeadName, teamHeadName, isEmployeeLists: false, requiredInitial: false });

    // get all element in the list
    const childEl = e.currentTarget.parentNode.children;

    // get the clicked element
    const targetEl = e.currentTarget;

    // Iterate through all the element and toggle the class
    for (let i = 0; i < childEl.length; i += 1) {
      if (targetEl !== childEl[i]) {
        childEl[i].classList.remove('active');
      } else {
        childEl[i].classList.add('active');
      }
    }
  }
  // Close Employee Dialog
  addDismissLists = () => this.setState({ isEmployeeLists: false });
  // Search list
  handleFilterSubmit = (name) => {
    this.setState({
      empSearchVal: (name) || '',
      empListPageIndex: 1,
    });
    this.props.onSearchQueryString(1, name);
  }
  // Validate and submit irf form request
  sendIRFFormRequest = () => {
    const start = this.state.startDate;
    const end = this.state.endDate;
    const { referrenceTypeID, description, time, location, files, empProfileID, empFirstName, empLastName } = this.state;
    let error = false;
    this.setState({ loading: true });
    if (referrenceTypeID === '') {
      this.setState({ requiredSelect: true, loading: false });
      error = true;
    }
    if (description === '') {
      this.setState({ requiredTextArea: true, loading: false });
      error = true;
    }
    if (time === '') {
      this.setState({ requiredTime: true, loading: false });
      error = true;
    }
    if (location === '') {
      this.setState({ requiredLoc: true, loading: false });
      error = true;
    }
    if (files.length === 0) {
      this.setState({ requiredFileAttacment: true, loading: false });
      error = true;
    }
    if (empFirstName === '' && empLastName === '') {
      this.setState({ requiredInitial: true, loading: false });
      error = true;
    }
    if (!error) {
      this.props.onSubmitIRFRequest(referrenceTypeID, empProfileID, description, moment(start).format('YYYY-MM-DD'), moment(end).format('LT'), location, files);
    }
  }
  // Show employee dialog
  showEmployees = () => {
    this.setState(() => ({ isEmployeeLists: true }));
    this.props.onShowEmployeeLists();
  }
  // Dismiss employee lists
  dismissEmployee = () => {
    this.setState({ isEmployeeLists: false, isToggleSwitch: false });
    this.props.dismissSuccessMessage();
  }
  // Handle change of user attachments
  attachedFile = (e) => {
    this.setState({ files: e.currentTarget.files });
    const { files } = this.state;
    if (files.length <= 0) this.setState({ requiredFileAttacment: false });
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
  // Dismiss Incident Report Form
  dismissMessage = () => {
    this.props.close();
    this.props.dismissSuccessMessage();
  }
  // Reset state to its original value
  dismissSuccess = () => {
    this.props.dismissSuccessMessage();
    this.setState({ isIncidentReportForm: false, isEmployeeLists: false });
  }
  render() {
    let successPrompts; let errorPrompts;
    let irfferrences; let showemployeelists;
    let searcherror; let maxPageIndex = 1; // Get Max Page Index of the list (defaults to 1)

    const {
      loading, PageDetails, onGotoPage,
      showAllEmployeeLists, showSuccessCode, showSuccessMessage,
      showErrorCode, showErrorMessage, showIRFReferrences,
      showSearchError, loadingEmployee,
    } = this.props;

    const { isIncidentReportForm, isEmployeeLists, requiredInitial, empSearchVal, requiredSelect, requiredTextArea, requiredTime, requiredLoc, requiredFileAttacment } = this.state;

    if (PageDetails != null) maxPageIndex = PageDetails.MaxPageIndex;

    // Show error message
    if (showErrorCode >= 0 && showErrorCode < 204) {
      searcherror = <div className="center">{showSearchError}</div>;
    } else {
      searcherror = <div className="center">There is a problem communicating with the server. Please try again later.</div>;
    }
    // Show all employee lists
    if (showAllEmployeeLists) {
      showemployeelists = showAllEmployeeLists.map((obj) =>
        (<dl role="presentation" key={obj.EmpProfileID} className="cont" onClick={(e) => { this.showAssignedEmployee(e, obj.EmpProfileID, obj.FirstName, obj.LastName, obj.JobRole.Name, obj.WorkGroup[0] !== undefined ? obj.WorkGroup[0].Department.Name : 'No Assigned Department', obj.WorkGroup[0] !== undefined ? obj.WorkGroup[0].Team.Name : 'No Assigned WorkGroup', obj.WorkGroup[0] !== undefined ? obj.WorkGroup[0].Department.DeptHeadName : 'No Assigned Department Head', obj.WorkGroup[0] !== undefined ? obj.WorkGroup[0].Team.TeamHeadName : 'No Assigned Team Head'); }}>
          <dt>
            { (obj.EmpAvatarAttachs != null)
                ? <Avatar bgImage={`url('${obj.EmpAvatarAttachs.Path}')`} />
                : <Avatar />
              }
          </dt>
          <dd>
            <p>
              {obj.LastName}, {obj.FirstName} <br />
              <span>{obj.Email}</span>
            </p>
          </dd>
        </dl>)
      );
    }
    // Show irf type referrences
    if (showIRFReferrences) {
      let ref;
      showIRFReferrences.map((refs) => {
        ref = refs.IRFTypeList;
        irfferrences = ref.map((obj) => <option value={obj.ID} key={obj.ID}>{obj.Name}</option>);
      });
    }
    // Show success modal for successful request
    if (showSuccessCode === 200) {
      successPrompts = (<ConfirmBox
        show={this.props.show}
        title="Request Sent"
        onClick={this.dismissSuccess}
        okBtnText="OK"
      >
        {showSuccessMessage}
      </ConfirmBox>);
    }
    // Show error modal for error request
    if (showErrorCode >= 400 && showErrorCode <= 1001) {
      errorPrompts = (<ConfirmBox
        show={this.props.show}
        title="Request Failed"
        onClick={this.dismissSuccess}
        okBtnText="OK"
      >
        {showErrorMessage}
      </ConfirmBox>);
    }
    // Show error for no workflow assigned
    if (showErrorCode === 400 || showErrorCode === 1002) {
      errorPrompts = (<ConfirmBox
        show={this.props.show}
        title="Request Failed"
        onClick={this.dismissSuccess}
        okBtnText="OK"
      >
        <span>There is no Workflow associated to your request yet. Kindly contact support.</span> <br />
      </ConfirmBox>);
    }
    const file = [];
    const { files } = this.state;
    if (files.length > 0) Object.keys(files).forEach((i) => file.push(files[i]));
    return (
      <span>
        <Modal
          show={isIncidentReportForm}
          title="Incident Report Form"
          width="700px"
        >
          <RequestForm>
            <div className="grid-wrapper">
              <fieldset className="grid-6">
                <fieldset>
                  <label className={requiredInitial && 'required-label'} htmlFor="select-employee">Select Employee <ButtonEmp onClick={this.showEmployees}><FontAwesomeIcon icon={faPlus} /></ButtonEmp></label>
                  <Dialog
                    show={isEmployeeLists}
                    onClick={this.dismissEmployee}
                    onClose={this.dismissEmployee}
                    showCloseBtn
                    title="Employee List"
                  >
                    <Search search onClick={(val) => { this.handleFilterSubmit(val); }} placeholder="Search Employees..." defaultVal={empSearchVal} />
                    <EMPList>
                      {(loadingEmployee) && <span className="loading-cont"><Loading /></span>}
                      {showemployeelists}
                      {searcherror}
                    </EMPList>
                    { PageDetails && maxPageIndex !== 1 && <Pagination>
                      <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={<span>...</span>}
                        breakClassName={'break-me'}
                        pageCount={maxPageIndex}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={4}
                        onPageChange={onGotoPage}
                        activeClassName={'active'}
                      />
                      </Pagination>
                    }
                  </Dialog>
                </fieldset>
                <fieldset>
                  <label htmlFor="Category Options">Category</label>
                  <span className={!requiredSelect ? 'select-custom' : 'select-custom required-label required-select'}>
                    <i className="fa fa-caret-down arrow-down" />
                    <select onChange={this.getReferrencesID}>
                      <option>Please select category..</option>
                      {irfferrences}
                    </select>
                  </span>
                </fieldset>
                <fieldset>
                  <label htmlFor="Description">Description</label>
                  <textarea className={requiredTextArea && 'required-textarea'} onChange={this.getDescription}></textarea>
                  {(requiredTextArea) && <small className="required-label">Please fill out this field.</small>}
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
                        maxDate={moment().startOf('day')}
                      />
                    </span>
                  </div>
                  <div className="half">
                    <label htmlFor="time">Time</label>
                    <span className={!requiredTime ? 'select-custom' : 'select-custom required-label required-select'}>
                      <input id="time" className={requiredTime && 'required-select'} type="time" onChange={this.getTime} />
                    </span>
                  </div>
                </fieldset>
                <fieldset>
                  <label htmlFor="Location">Location</label>
                  <input className={requiredLoc && 'required-select'} type="text" onChange={this.getLocation} />
                </fieldset>
                <fieldset>
                  <label htmlFor="attachments">Attachments</label>
                  <label htmlFor="attach" className={!requiredFileAttacment ? 'attach' : 'attach required-label required-select'}>
                    <input id="attach" type="file" defaultValue={this.state.files} onChange={this.attachedFile} multiple accept=".png, .jpg, .jpeg, .pdf, .doc, .docx" />
                    <span> {file.map((item) => <b key={item.lastModified}>{item.name}</b>)} </span>
                    <FontAwesomeIcon icon={faPaperclip} />
                  </label>
                </fieldset>
              </fieldset>
              <fieldset className="grid-7">
                <label htmlFor="employee-information">Employee Information</label>
                <p>Employee Name: <small>{this.state.empLastName !== '' ? `${this.state.empLastName}, ${this.state.empFirstName}` : '-'}</small></p>
                <p>Department: <small>{this.state.departmentName !== '' ? `${this.state.departmentName}` : '-'}</small></p>
                <p>Workgroup: <small>{this.state.teamName !== '' ? `${this.state.teamName}` : '-'}</small></p>
                <p>Position: <small>{this.state.empJobPosition !== '' ? `${this.state.empJobPosition}` : '-' }</small></p>
                <p>Department Head Name: <small>{this.state.departmentHeadName !== '' ? `${this.state.departmentHeadName}` : '-' }</small></p>
                <p>Team Head Name: <small>{this.state.teamHeadName !== '' ? `${this.state.teamHeadName}` : '-' }</small></p>
              </fieldset>
            </div>
            {(loading) && <span className="loading-cont"><LoadingIndicator /></span>}
            <div className="right">
              <Button handleRoute={(e) => { e.preventDefault(); this.sendIRFFormRequest(); }} color="gray">Submit</Button>
              <Button handleRoute={this.dismissMessage} color="red">Cancel</Button>
            </div>
          </RequestForm>
        </Modal>
        {successPrompts}
        {errorPrompts}
      </span>
    );
  }
}

IncidentReportFormsRequest.propTypes = {
  loading: PropTypes.bool,
  PageDetails: PropTypes.any,
  onGotoPage: PropTypes.func,
  onSearchQueryString: PropTypes.func,
  onShowIRFReferrences: PropTypes.func,
  dismissSuccessMessage: PropTypes.func,
  close: PropTypes.func,
  onSubmitIRFRequest: PropTypes.func,
  onShowEmployeeLists: PropTypes.func,
  show: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  showSearchError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  showAllEmployeeLists: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  showSuccessMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  showErrorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  showSuccessCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  showErrorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  showIRFReferrences: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loadingEmployee: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = createStructuredSelector({
  PageDetails: makeSelectPageDetails(),
  showAllEmployeeLists: makeSelectEmployeeLists(),
  showSuccessCode: makeShowSuccessCode(),
  showSuccessMessage: makeShowSuccessMessage(),
  showErrorCode: makeShowErrorCode(),
  showErrorMessage: makeShowErrorMessage(),
  showIRFReferrences: makeSelectIRFReferrences(),
  loading: makeSelectLoading(),
  loadingEmployee: makeSelectLoadingEmployee(),
  showSearchError: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onShowEmployeeLists: (page) => dispatch(showEmployeeLists(page)),
    onSearchQueryString: (page, searchData, error) => dispatch(searchLists(page, searchData, error)),
    onSubmitIRFRequest: (irftypeid, requestorempid, reason, requestdate, requesttime, requestlocation, attachments) => dispatch(createIRFRequests(irftypeid, requestorempid, reason, requestdate, requesttime, requestlocation, attachments)),
    onShowIRFReferrences: () => dispatch(IRFReferrences()),
    dismissSuccessMessage: () => dispatch(dismissIRFForms()),
    onGotoPage: (evt) => {
      const page = evt.selected + 1;
      dispatch(showEmployeeLists(page));
    },
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'Forms', reducer });
const withSaga = injectSaga({ key: 'Forms', saga });

export default compose(withReducer, withSaga, withConnect)(IncidentReportFormsRequest);
