/*
 * Government Forms Request Page
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { PropTypes } from 'prop-types';

/* Global References */
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

/* Global Components */
import Modal from 'components/Modal';
import CreateNewForm from 'components/Templates/CreateNewForm';
import Button from 'components/Button';
import ButtonWrapper from 'components/Button/ButtonWrapper';
import ConfirmBox from 'components/ConfirmationDialog';
import LoadingIndicator from 'components/LoadingIndicator';

import { makeSelectError } from 'containers/App/selectors';

import RequestForm from './RequestForm';

import { makeSelectLoading, makeShowSuccessCode, makeShowSuccessMessage, makeShowErrorCode, makeShowErrorMessage } from './selector';

import reducer from './reducer';
import saga from './saga';

import { CREATE_CUSTOMFORMS } from './constants';
import { dismissCustomForms } from './action';

export class GovernmentForms extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      reasonInput: '',
      selectedOptionValue: '',
      customInputValue: '',
      successToTrue: false,
      errorToTrue: false,
      reasons: '',
      files: [],
      id: '',
      requiredFiles: false,
      requiredTextArea: false,
      loading: false,
    };
  }
  // Get Reasons textarea input
  getFilingForReasons = (e) => this.setState({ reasons: e.currentTarget.value, requiredTextArea: false });
  // Dispatched created form
  submitCreateForm = (govid) => {
    let error = false;
    const { files, reasons } = this.state;
    if (files.length === 0) {
      error = true;
      this.setState({
        requiredFiles: true,
        loading: false,
      });
    }
    if (reasons === '') {
      this.setState({
        requiredTextArea: true,
        loading: false,
      });
      error = true;
    }
    if (!error) {
      this.props.onCreateCustomForm(govid, this.state.files, this.state.reasons);
      this.setState({ errorToTrue: true, successToTrue: true });
    }
  }
  // Handle change of user attachments
  attachedFile = (e) => this.setState({ files: e.target.files, requiredFiles: false });
  // Dismiss Other Government Forms
  dismissMessage = () => this.props.close();
  // Reset state to its original value
  dismissSuccess = () => {
    this.props.dismissSuccessMessage();
    this.props.close();
    this.setState({ successToTrue: false, errorToTrue: false });
  }
  render() {
    let successPrompts; let errorPrompts;
    const { successToTrue, errorToTrue } = this.state;
    const { loading, close, showSuccessCode, showSuccessMessage, showErrorCode, showErrorMessage, attachment } = this.props;
    // Show success prompt for successful request
    if (showSuccessCode === 200) {
      if (successToTrue === true) {
        successPrompts = (<ConfirmBox
          show={successToTrue}
          onClose={close}
          title="Request Sent"
          onClick={this.dismissSuccess}
          okBtnText="OK"
        >
          {showSuccessMessage}
        </ConfirmBox>);
      }
    }
    // Show error prompt for error request
    if (showErrorCode >= 400 && showErrorCode <= 1001) {
      if (errorToTrue === true) {
        errorPrompts = (<ConfirmBox
          show={errorToTrue}
          onClose={close}
          title="Request Failed"
          onClick={this.dismissSuccess}
          okBtnText="OK"
        >
          {showErrorMessage}
        </ConfirmBox>);
      }
    }
    const file = [];
    const { files } = this.state;
    if (files.length > 0) Object.keys(files).forEach((i) => file.push(files[i]));
    return (
      <span>
        <Modal
          show={this.props.show}
          close={this.props.close}
          title={this.props.title}
          width="400px"
        >
          <CreateNewForm>
            <RequestForm>
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
              <fieldset>
                <label htmlFor="reason-for-filing">Reason For Filing</label>
                <textarea className={(this.state.requiredTextArea) && 'required-textarea'} id="reason-for-filing" value={this.state.reasons} onChange={this.getFilingForReasons}></textarea>
                {(this.state.requiredTextArea) && <small className="error-message">*Please fill out this field.</small>}
              </fieldset>
              <fieldset>
                <p className="dl-form">Step 1: Download this Form {attachment.map((item) => <a key={item.WorkFlowFormAttachID} className="download-link" href={item.Path}>{item.FileName}</a>)}</p>
                <p className="dl-form">Step 2: Fillup the Form and Scan, then attached the scanned file here. Then hit submit.</p>
              </fieldset>
            </RequestForm>
            <br />
            <ButtonWrapper>
              {(loading) && <span className="loading-cont"><LoadingIndicator /></span>}
              <Button handleRoute={(e) => { e.preventDefault(); this.submitCreateForm(this.props.govid); }} color="gray">SUBMIT</Button>
              <Button handleRoute={(e) => { e.preventDefault(); this.dismissMessage(); }} color="red">CANCEL</Button>
            </ButtonWrapper>
          </CreateNewForm>
        </Modal>
        {successPrompts}
        {errorPrompts}
      </span>
    );
  }
}
GovernmentForms.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.string,
  govid: PropTypes.string,
  show: PropTypes.bool,
  close: PropTypes.func,
  onCreateCustomForm: PropTypes.func,
  dismissSuccessMessage: PropTypes.func,
  attachment: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  showSuccessMessage: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  showErrorMessage: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  showSuccessCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  showErrorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};
const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  showSuccessCode: makeShowSuccessCode(),
  showSuccessMessage: makeShowSuccessMessage(),
  showErrorCode: makeShowErrorCode(),
  showErrorMessage: makeShowErrorMessage(),
});
function mapDispatchToProps(dispatch) {
  return {
    onCreateCustomForm: (customformid, attachments, reason) => dispatch({ type: CREATE_CUSTOMFORMS, customformid, attachments, reason }),
    dismissSuccessMessage: () => dispatch(dismissCustomForms()),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'Forms', reducer });
const withSaga = injectSaga({ key: 'Forms', saga });

export default compose(withReducer, withSaga, withConnect)(GovernmentForms);
