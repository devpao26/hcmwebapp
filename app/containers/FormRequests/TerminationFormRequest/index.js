/*
 * Return To Work Order Requests Form
 *
*/

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { PropTypes } from 'prop-types';
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
} from './selector';

import reducer from './reducer';
import saga from './saga';

import {
  createFormRequest,
  createFormRequestReset,
  showEmployeeLists,
  showEmployeeListsNoReset,
} from './action';

export class TerminationRequestForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      empProfileID: '',
      empFirstName: '',
      empLastName: '',
      empJobRole: '',
      empSearchVal: '',
      notes: '',
      isEmployeeLists: false,
      requiredEmployeeId: false,
      requiredNotes: false,
      requiredFiles: false,
      employees: [],
      files: [],
      empListPageIndex: 1,
    };
  }
  // Get notes value
  getNotes = (e) => {
    this.setState({
      notes: e.currentTarget.value,
      requiredNotes: false,
    });
  }
  // Handle change of user attachments
  attachedFile = (e) => {
    this.setState({
      files: e.target.files,
      requiredFiles: false,
    });
  }
  // Dimiss Dialog Lists
  addDismissLists = () => {
    this.setState({
      isEmployeeLists: false,
    });
  }
  // Show employee Lists
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
  // Search employee list
  searchEmpList = (name) => {
    this.setState({
      empSearchVal: (name) || '',
      empListPageIndex: 1,
    });
    this.props.retrieveEmpList(1, name);
  }
  // Show employee prompt
  showEmployees = () => {
    this.setState({
      isEmployeeLists: true,
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
    const { empProfileID, notes, files } = this.state;
    if (empProfileID === '') {
      this.setState({
        requiredEmployeeId: true,
      });
      error = true;
    }
    if (files.length === 0) {
      this.setState({
        requiredFiles: true,
      });
      error = true;
    }
    if (notes === '') {
      this.setState({
        requiredNotes: true,
      });
      error = true;
    }
    if (!error) this.props.onSubmitFormRequests(empProfileID, notes, files);
  }
  render() {
    const { loading, empListPageDetails, success, error, showRequestResponseSuccess, showRequestResponseError } = this.props;
    let maxPageIndex = 1; // Get Max Page Index of the list (defaults to 1)

    if (empListPageDetails != null) {
      maxPageIndex = empListPageDetails.MaxPageIndex;
    }
    const file = [];
    const { files } = this.state;
    if (files.length > 0) Object.keys(files).forEach((i) => file.push(files[i]));
    return (
      <span>
        <Modal
          show={this.props.show}
          title="Notice of Termination Form"
          width="400px"
        >
          <RequestForm>
            <div className="grid-wrapper">
              <fieldset>
                <label className={(this.state.requiredEmployeeId) && 'required-label'} htmlFor="select-employee">Select Employee <ButtonEmp onClick={this.showEmployees}><FontAwesomeIcon icon={faPlus} /></ButtonEmp></label>
              </fieldset>
              <fieldset>
                <label className="selected" htmlFor="selected-employee">{`${this.state.empLastName} ${this.state.empFirstName}`}</label>
              </fieldset>
              <fieldset>
                <label htmlFor="Description">Note</label>
                <textarea className={(this.state.requiredNotes) && 'required-textarea'} onChange={this.getNotes}></textarea>
                {(this.state.requiredNotes) && <small className="error-message">Please fill out this field.</small>}
              </fieldset>
              <fieldset>
                <label htmlFor="attachments">Attachments</label>
                <label htmlFor="attach" className={(this.state.requiredFiles) ? 'attach required-select' : 'attach'}>
                  <input id="attach" type="file" defaultValue={this.state.files} onChange={this.attachedFile} multiple accept=".png, .jpg, .jpeg, .pdf, .doc, .docx" />
                  <span>
                    {file.map((item) => <b key={item.lastModified}>{item.name}</b>)}
                  </span>
                  <i className={(this.state.requiredFiles) ? 'fa fa-paperclip required-label' : 'fa fa-paperclip'} />
                </label>
              </fieldset>
            </div>
            {(loading) && <span className="loading-cont"><LoadingIndicator /></span>}
            <ButtonWrapper>
              <Button handleRoute={(e) => { this.submitFormRequest(); e.preventDefault(); }} color="gray">Submit</Button>
              <Button handleRoute={this.props.close} color="red">Cancel</Button>
            </ButtonWrapper>
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

TerminationRequestForm.propTypes = {
  loading: PropTypes.bool,
  show: PropTypes.bool,
  showRequestResponseSuccess: PropTypes.bool,
  showRequestResponseError: PropTypes.bool,
  close: PropTypes.func,
  retrieveEmpList: PropTypes.func,
  retrieveEmpListNoReset: PropTypes.func,
  onResetRequests: PropTypes.func,
  onSubmitFormRequests: PropTypes.func,
  empListPageDetails: PropTypes.any,
  error: PropTypes.any,
  success: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('submitForm'),
  success: makeSelectSuccess('submitForm'),
  error: makeSelectError('submitForm'),
  empListPageDetails: makeSelectPageDetails('employeelists'),
  showRequestResponseError: makeSelectErrorToTrue(),
  showRequestResponseSuccess: makeSelectSuccessToTrue(),
});

function mapDispatchToProps(dispatch) {
  return {
    retrieveEmpList: (page, search) => dispatch(showEmployeeLists(page, search)),
    retrieveEmpListNoReset: (page, search) => dispatch(showEmployeeListsNoReset(page, search)),
    onSubmitFormRequests: (empid, note, files) => dispatch(createFormRequest(empid, note, files)),
    onResetRequests: () => dispatch(createFormRequestReset()),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'Forms', reducer });
const withSaga = injectSaga({ key: 'Forms', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TerminationRequestForm);
