/*
 * Form Requests Page
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

/* Global References */
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

/* Global Components */
import Modal from 'components/Modal';
import CreateNewForm from 'components/Templates/CreateNewForm';
import Fields from 'components/Templates/CreateNewFormFields';
import ErrorMsg from 'components/Forms/FieldErrorMsg';
import Button from 'components/Button';
import ButtonWrapper from 'components/Button/ButtonWrapper';
import ConfirmBox from 'components/ConfirmationDialog';
import LoadingIndicator from 'components/LoadingIndicator';

import { makeShowSuccessCode, makeShowSuccessMessage, makeShowErrorCode, makeShowErrorMessage, makeShowOTLists } from './selector';

import reducer from './reducer';
import saga from './saga';

import { createOTFOrms, dismissOTForms, retrieveOTForms, resetState } from './action';

export class OTRequest extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().startOf('day'),
      endDate: moment().startOf('day'),
      dateError: false,
      OTMinutes: 0,
      OTHours: 0,
      successToTrue: true,
      errorToTrue: true,
      setActive: false,
      requiredTextArea: false,
      requiredMinutes: false,
      requiredHours: false,
      loading: false,
      remarks: '',
      otMinutesError: false,
    };
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  // Dispatch ot forms request
  onSubmitOTRequest = (totalActualHours) => {
    const start = this.state.startDate;

    const { remarks } = this.state;

    let error = false;
    this.setState({
      loading: true,
    });

    let requestedOTMinutes = 0;

    const OTHours = parseInt(this.state.OTHours, 10);
    const OTMinutes = parseInt(this.state.OTMinutes, 10);

    if (OTHours === 0 && OTMinutes === 0) {
      error = true;
      this.setState({
        requiredHours: true,
        requiredMinutes: true,
        loading: false,
      });
    }

    if (OTHours <= 0 && OTMinutes === 0) {
      error = true;
      this.setState({
        requiredMinutes: true,
        loading: false,
      });
    }

    if (OTHours !== 0 || OTMinutes !== 0) {
      requestedOTMinutes = (OTHours * 60) + OTMinutes;
      if (requestedOTMinutes < 30) {
        error = true;
        this.setState({
          otMinutesError: true,
          loading: false,
        });
      }
    }

    if (remarks === '') {
      this.setState({ requiredTextArea: true, loading: false });
      error = true;
    }
    if (!error) {
      const data = {
        OTFrom: moment(start).format('YYYY-MM-DD'),
        OTTo: moment(start).format('YYYY-MM-DD'),
        RenderedMinutes: totalActualHours,
        Remarks: remarks,
        RequestedOTMinutes: requestedOTMinutes,
      };
      this.props.onCreateOTForms(data);
    }
  }
  // Get remarks value
  onGetRemarks = (e) => {
    this.setState({
      remarks: e.currentTarget.value,
    });

    const { remarks } = this.state;

    if (remarks.length <= 0) this.setState({ requiredTextArea: false });
  }
  // Select current hours
  onChangeHours = (e) => {
    this.setState({
      OTHours: e.currentTarget.value,
      requiredHours: false,
      requiredMinutes: false,
      otMinutesError: false,
    });
  }
  // Select current minutes
  onChangeMinutes = (e) => {
    this.setState({
      OTMinutes: e.currentTarget.value,
      requiredHours: false,
      requiredMinutes: false,
      otMinutesError: false,
    });
  }
  // Dismiss OT Form
  dismissMessage = (e) => {
    e.preventDefault();
    this.props.close();
    // this.props.dismissSuccessMessage();

    this.setState({
      setActive: false,
      startDate: moment().startOf('day'),
      endDate: moment().startOf('day'),
    });
  }
  // Handle Date Picker Dates
  handleChangeStart = (date) => {
    this.setState({
      startDate: date,
      endDate: moment(date),
      dateError: false,
      errorMsg: false,
    });
    this.props.dataRetrieveOTLists(moment(date).format('YYYY-MM-DD'));
  }

  handleChangeEnd = (date) => {
    this.setState({
      endDate: date,
      startDate: date,
      dateError: false,
      errorMsg: false,
    });
  }
  // Reset state to its original value
  dismissSuccess = (e) => {
    this.setState({
      OTMinutes: 0,
      OTHours: 0,
      remarks: '',
      setActive: false,
      requiredTextArea: false,
      requiredMinutes: false,
      requiredHours: false,
      loading: false,
      startDate: moment().startOf('day').add(1, 'day'),
      endDate: moment().startOf('day').add(1, 'day'),
      dateError: false,
      // isOTForm: false,
    });
    this.props.close(e);
    this.props.dismissSuccessMessage();
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    const { loading } = this.state;

    let successPrompts;
    let errorPrompts;
    let OTLists;

    const {
      showSuccessCode,
      showSuccessMessage,
      showErrorCode,
      showErrorMessage,
      showOTLists,
    } = this.props;

    const getMinutes = [];
    const getHours = [];

    let totalActualHours;
    if (showOTLists) {
      totalActualHours = showOTLists[0].TotalActual !== 0 ? showOTLists[0].TotalActual : 0;
      OTLists = showOTLists[0].TotalActual !== 0 ? `${showOTLists[0].TotalActual / 60} hrs` : 0;
    } else {
      OTLists = 0;
    }

    for (let h = 0; h < 17; h += 1) {
      getHours.push(
        <option key={h} value={h}>{h}</option>
      );
    }

    for (let m = 0; m < 61; m += 1) {
      getMinutes.push(
        <option key={m} value={m}>{m}</option>
      );
    }
    if (showSuccessCode === 200) {
      // Show success prompt for successful request
      successPrompts = (<ConfirmBox
        show={this.props.show}
        title="Request Success"
        onClick={this.dismissSuccess}
        okBtnText="OK"
      >
        {showSuccessMessage}
      </ConfirmBox>);
    }
    if (showErrorCode >= 400 && showErrorCode <= 1001) {
      // Show error prompt for invalid request
      errorPrompts = (<ConfirmBox
        show={this.props.show}
        title="Request Failed"
        onClick={this.dismissSuccess}
        okBtnText="OK"
      >
        {showErrorMessage}
      </ConfirmBox>);
    }
    if (showErrorCode === 400 || showErrorCode === 1002) {
      // Show error prompt for invalid request
      errorPrompts = (<ConfirmBox
        show={this.props.show}
        title="Request Failed"
        onClick={this.dismissSuccess}
        okBtnText="OK"
      >
        <span>There is no Workflow associated to your request yet. Kindly contact support.</span>
      </ConfirmBox>);
    }
    return (
      <span>
        <Modal
          show={this.props.show}
          title="OT Form"
          width="400px"
        >
          <CreateNewForm>
            <Fields>
              <div className={(this.state.dateError) ? 'error half' : 'half'}>
                <label htmlFor="start-date">Shift Date</label>
                <span className="select-custom">
                  <i className="fa fa-caret-down" />
                  <DatePicker
                    selected={this.state.startDate}
                    selectsStart
                    startDate={this.state.startDate}
                    onChange={this.handleChangeStart}
                    dateFormat="LL"
                    minDate={moment().subtract(30, 'days')}
                    maxDate={moment().startOf('day').add(1, 'day')}
                  />
                </span>
              </div>
            </Fields>
            <Fields>
              <label htmlFor="rendered-hours">Captured OT Hours from Shift</label>
              {OTLists}
            </Fields>
            <Fields>
              <label htmlFor="ot-hours">Requested OT Hours</label>
              <label htmlFor="hours"> Hours &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Minutes</label>
              <span className={!this.state.requiredHours ? 'select-custom' : 'select-custom required-label required-select'}>
                <i className="fa fa-caret-down" />
                <select onChange={this.onChangeHours} value={this.state.OTHours}>
                  {getHours}
                </select>
              </span> &nbsp;
              <span className={!this.state.requiredMinutes ? 'select-custom' : 'select-custom required-label required-select'}>
                <i className="fa fa-caret-down" />
                <select onChange={this.onChangeMinutes} value={this.state.OTMinutes}>
                  {getMinutes}
                </select>
              </span>
              {(this.state.otMinutesError) && <ErrorMsg>* Requested OT Minutes should not be less than 30mins</ErrorMsg>}
            </Fields>
            <Fields>
              <label htmlFor="remarks">Remarks</label>
              <textarea className={this.state.requiredTextArea && 'required-textarea'} onChange={this.onGetRemarks} value={this.state.remarks} />
              {this.state.requiredTextArea && <small className="required-label">This is a required field</small>}
            </Fields>
            <br />
            <ButtonWrapper>
              {(loading) && <span className="loading-cont"><LoadingIndicator /></span>}
              <Button handleRoute={(e) => { e.preventDefault(); this.onSubmitOTRequest(totalActualHours); }} color="gray">SUBMIT</Button>
              <Button handleRoute={(e) => { e.preventDefault(); this.props.close(); }} color="red">CANCEL</Button>
            </ButtonWrapper>
          </CreateNewForm>
        </Modal>
        {successPrompts}
        {errorPrompts}
      </span>
    );
  }
}

OTRequest.propTypes = {
  close: PropTypes.func,
  onCreateOTForms: PropTypes.func,
  dismissSuccessMessage: PropTypes.func,
  dataRetrieveOTLists: PropTypes.func,
  show: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  showOTLists: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  showSuccessMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  showErrorMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  showSuccessCode: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
  showErrorCode: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
  resetState: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  showSuccessCode: makeShowSuccessCode(),
  showSuccessMessage: makeShowSuccessMessage(),
  showErrorCode: makeShowErrorCode(),
  showErrorMessage: makeShowErrorMessage(),
  showOTLists: makeShowOTLists(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCreateOTForms: (data) => dispatch(createOTFOrms(data)),
    dataRetrieveOTLists: (startdate) => dispatch(retrieveOTForms(startdate)),
    dismissSuccessMessage: () => dispatch(dismissOTForms()),
    resetState: () => dispatch(resetState()),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'Forms', reducer });
const withSaga = injectSaga({ key: 'Forms', saga });

export default compose(withReducer, withSaga, withConnect)(OTRequest);
