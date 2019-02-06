/*
 * Leave Conversion Form Request Page
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { PropTypes } from 'prop-types';
import moment from 'moment';
// import 'moment-timezone';
/* Font Awesome */
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faInfoCircle,
} from '@fortawesome/fontawesome-free-solid';

/* Global References */
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

/* Global Components */
import Modal from 'components/Modal';
import CreateNewForm from 'components/Templates/CreateNewForm';
import Fields from 'components/Templates/CreateNewFormFields';
import Button from 'components/Button';
import ButtonWrapper from 'components/Button/ButtonWrapper';
import ConfirmBox from 'components/ConfirmationDialog';
import Loading from 'components/LoadingIndicator';

import { makeSelectLoading, makeSelectError, makeSelectUserData, makeShowSuccessCode, makeShowSuccessMessage, makeShowErrorCode, makeShowErrorMessage } from './selector';

import reducer from './reducer';
import saga from './saga';

import { createLCFRequest, dismissLCFRequest } from './action';

export class LCFRequest extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      remarks: '',
      requiredTextArea: false,
      requiredLabel: false,
      requiredLabelCount: false,
      isLeaveConversionForm: this.props.show,
      isLCFRulesAndRegulation: false,
      lessAYear: false,
    };
  }
  onSubmitLeaveConversionForm = (datehired, plcount) => {
    const date = moment().format('MM-DD-YYYY');

    let error = false;
    if (datehired === '') {
      this.setState({
        requiredLabel: true,
      });
      error = true;
    }
    if (plcount.length === 0) {
      this.setState({
        requiredLabelCount: true,
      });
      error = true;
    }
    if (!error) this.props.createLeaveConversionForm(date);
  }
  // Show LCF Rules and Regulation
  showLCFRules = () => this.setState({ isLCFRulesAndRegulation: !this.state.isLCFRulesAndRegulation });
  // Dismiss LCF Rules and regulation
  dismissLCFRules = () => this.setState({ isLCFRulesAndRegulation: false });
  // Reset state to its original value
  dismissSuccess = () => {
    this.props.dismissSuccessMessage();
    this.props.close();

    this.setState({
      isLeaveConversionForm: !this.state.isLeaveConversionForm,
    });
  }
  render() {
    let successPrompts; let errorPrompts; let showloading;

    const { loading, error, showSuccessCode, showSuccessMessage, showErrorCode, showErrorMessage, userData } = this.props;
    const empleaves = userData.EmpLeaveCount;
    const currentMonth = moment().format('MM');
    const currentDate = moment().format('LL');

    const years = moment().diff(moment(userData.DateHired), 'days', true);
    // Load page before mount
    if (loading) showloading = <span className="loading-cont"><Loading /></span>;

    // Show error responses
    if (error) {
      if (error.ErrorCode === 204) {
        return <p className="error-msg">No Record(s) Found.</p>;
      }
      return <p className="error-msg">There is a problem communicating with the server. Please try again later.</p>;
    }
    // Show success prompt for successful request
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
    // Custom error modal for invalid request
    if (showErrorCode === 409) {
      errorPrompts = (<ConfirmBox
        show={this.props.show}
        title="Request Failed"
        onClick={this.dismissSuccess}
        okBtnText="OK"
      >
        <span>You already have a pending or approved request for the current year.</span>
      </ConfirmBox>);
    }
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
    return (
      <span>
        <Modal
          show={this.state.isLeaveConversionForm}
          title="Leave Conversion Form"
          width="400px"
        >
          <CreateNewForm>
            {showloading}
            <Fields>
              <label htmlFor="employee-name">Employee Name</label>
              <span>{userData.LastName}, {userData.FirstName}</span>
            </Fields>
            <Fields>
              <label className={(this.state.requiredLabel) && 'required-label'} htmlFor="date-hired">Date Hired</label>
              <span>{(userData.DateHired !== '') ? moment(new Date(userData.DateHired)).format('LL') : '-'}</span>
            </Fields>
            <Fields>
              <div className="half">
                <label htmlFor="start-date">Date Requested <span role="presentation" className="cursor-pointer" onClick={this.showLCFRules}><FontAwesomeIcon icon={faInfoCircle} /></span></label>
                <span>{currentDate}</span>
              </div>
            </Fields>
            <Fields>
              <label htmlFor="leave-balance">Leave Balance as of {currentMonth}</label>
              <div className="leave-type">
                <span>
                  <label htmlFor="vl">Vacation Leave</label>
                  <span>{empleaves.VLCount}</span>
                </span>&nbsp;&nbsp;
                <span>
                  <label htmlFor="sl">Sick Leave</label>
                  <span>{empleaves.SLCount}</span>
                </span>&nbsp;&nbsp;
                <span>
                  <label className={(this.state.requiredLabelCount) && 'required-label'} htmlFor="el">Personal Leave</label>
                  <span>{empleaves.ELCount}</span>
                </span>&nbsp;&nbsp;
              </div>
              <div>
                <label htmlFor="pl">Leaves To be Converted</label>
                <span>{empleaves.PLCount}</span>
              </div>
            </Fields>
            <br />
            <ButtonWrapper>
              {(loading) && <span className="loading-cont"><Loading /></span>}
              {userData.DateHired === '' || years < 308 || years < 307 || years < 306 || years < 305 || empleaves.PLCount === 0 ? <Button deadButton color="gray">SUBMIT</Button> : <Button handleRoute={(e) => { e.preventDefault(); this.onSubmitLeaveConversionForm(userData.DateHired, empleaves.PLCount); }} color="gray">SUBMIT</Button> }
              <Button handleRoute={() => { this.setState({ isLeaveConversionForm: false }); this.dismissSuccess(); }} color="red">CANCEL</Button>
            </ButtonWrapper>
          </CreateNewForm>
        </Modal>

        {/* LCF Rules and Regulation  */}
        <Modal
          show={this.state.isLCFRulesAndRegulation}
          title="Rules and Regulation For Leave Conversion"
          width="600px"
        >
          <CreateNewForm>
            <Fields>
              <p> The Leave Conversion Form must be submitted on or before the employee&apos;s Anniversary Date (i.e Date of Job Offer).
              Employees may get the form from the Human Resources Department. </p>
              <p> Failure to submit the Leave Conversion Form forfeits any claim for Leave Conversion.
              (Note: There are no exceptions to this rule.) Should the office be closed to the employee&apos;s
              anniversary date, the form should have already been submitted on the business day prior to
              the employee&apos;s anniversary date. </p>
              <p> The Human Resources Department checks for accuracy of information reflected on the employee&apos;s
              Leave Conversion Form, approves the same, and submits the form to the Accounting Department. </p>
              <p> The Accounting Department in turn audits the information reflected to the Leave Conversion Form,
              gives the final approval for such and ensures that the payment is made in the next cut-off after
              the employee&apos;s anniversary date. </p>
            </Fields>
            <br />
            <ButtonWrapper>
              <Button handleRoute={(e) => { e.preventDefault(); this.dismissLCFRules(e); }} color="gray">OK</Button>
            </ButtonWrapper>
          </CreateNewForm>
        </Modal>
        {successPrompts}
        {errorPrompts}
      </span>
    );
  }
}
LCFRequest.propTypes = {
  loading: PropTypes.bool,
  userData: PropTypes.object,
  show: PropTypes.bool,
  close: PropTypes.func,
  createLeaveConversionForm: PropTypes.func,
  dismissSuccessMessage: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  showSuccessMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  showErrorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  showSuccessCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  showErrorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  showSuccessCode: makeShowSuccessCode(),
  showSuccessMessage: makeShowSuccessMessage(),
  showErrorCode: makeShowErrorCode(),
  showErrorMessage: makeShowErrorMessage(),
});

function mapDispatchToProps(dispatch) {
  return {
    createLeaveConversionForm: (date) => dispatch(createLCFRequest(date)),
    dismissSuccessMessage: () => dispatch(dismissLCFRequest()),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'Forms', reducer });
const withSaga = injectSaga({ key: 'Forms', saga });

export default compose(withReducer, withSaga, withConnect)(LCFRequest);
