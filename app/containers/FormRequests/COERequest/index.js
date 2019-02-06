/*
 * COE Form Requests Page
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
import Fields from 'components/Templates/CreateNewFormFields';
import Button from 'components/Button';
import ButtonWrapper from 'components/Button/ButtonWrapper';
import ConfirmBox from 'components/ConfirmationDialog';
import LoadingIndicator from 'components/LoadingIndicator';

import { COEFORMREQUEST_CUSTOM } from 'containers/App/constants';

import { makeSelectLoading, makeSelectError, makeShowSuccessCode, makeShowSuccessMessage, makeShowErrorCode, makeShowErrorMessage, makeShowCOEtypeList } from './selector';

import reducer from './reducer';
import saga from './saga';

import { createCOEForms, dismissCOEForms, retrieveCOEtypeList } from './action';

export class COERequest extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      reasonInput: '',
      selectedOptionValue: '',
      customInputValue: '',
      validateReasonField: false,
      updateRequest: false,
      requiredTextArea: false,
      requiredSelect: false,
    };
  }
  // Execute until the page is loaded and retrieve lists
  componentDidMount() {
    this.props.dataRetrieveCOEReferrences();
  }
  // Submit COE Request Form
  onSubmitCOEForm = (e) => {
    e.preventDefault();

    let error = false;
    const { reasonInput, selectedOptionValue, customInputValue } = this.state;

    if (reasonInput === '') {
      this.setState({ requiredTextArea: true });
      error = true;
    }
    if (selectedOptionValue === '' && selectedOptionValue !== COEFORMREQUEST_CUSTOM) {
      this.setState({ requiredSelect: true });
      error = true;
    }
    if (selectedOptionValue === COEFORMREQUEST_CUSTOM && customInputValue === '') {
      this.setState({ requiredSelect: true });
      error = true;
    }
    if (!error) {
      this.props.onDispatchCOEFormRequest(reasonInput, selectedOptionValue, customInputValue);
      this.setState({ errorToTrue: true, successToTrue: true });
    }
  }
  // Get reasons current value
  onGetReasonValue = (e) => this.setState({ reasonInput: e.currentTarget.value, requiredTextArea: false });
  // Get value for input of other types
  onGetCustomInputValue = (e) => this.setState({ customInputValue: e.currentTarget.value, requiredSelect: false });
  // Get options from coe referrences type list its current selection
  getSelectedOptionID = (e) => this.setState({ selectedOptionValue: e.currentTarget.value, requiredSelect: false });
  // Dismiss OT Form
  dismissMessage = () => {
    this.props.close();
    this.setState({ requiredFields: false });
  }
  // Reset state to its original value
  dismissSuccess = () => {
    this.props.dismissSuccessMessage();
    this.props.close();
    this.setState({ validateReasonField: false });
  }

  render() {
    let successPrompts; let errorPrompts; let displayReferrences;
    const { loading, show, close, showCOEReferrencesList, showSuccessMessage, showErrorMessage, showSuccessCode, showErrorCode } = this.props;

    // Show coe referrence lists
    if (showCOEReferrencesList) displayReferrences = showCOEReferrencesList[0].COETypeList.map((obj) => <option key={obj.ID} value={obj.ID}>{ obj.Name }</option>);

    // Show success prompt for successful request
    if (showSuccessCode === 200) {
      successPrompts = (<ConfirmBox
        show={this.props.show}
        onClose={close}
        title="Request Success"
        onClick={this.dismissSuccess}
        okBtnText="OK"
      >
        {showSuccessMessage}
      </ConfirmBox>);
    }
    // Show error prompt for error request
    if (showErrorCode >= 400 && showErrorCode <= 1001) {
      errorPrompts = (<ConfirmBox
        show={this.props.show}
        onClose={close}
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
          show={show}
          title="COE Form"
          width="400px"
        >
          <CreateNewForm>
            <Fields>
              <span>
                <label htmlFor="reason">Reason</label>
                <textarea className={(this.state.requiredTextArea) && 'required-textarea'} onChange={this.onGetReasonValue}></textarea>
                <small className={(this.state.requiredTextArea) && 'required-label'}>{(this.state.requiredTextArea) && 'This is a required field.'}</small>
              </span>
            </Fields>
            <Fields>
              <div>
                <label htmlFor="coe-type">COE Type</label>
                <span className="select-custom xlong">
                  <i className={(this.state.requiredSelect) ? 'fa fa-caret-down required-label' : 'fa fa-caret-down'} />
                  <select className={(this.state.requiredSelect) && 'required-select'} onChange={this.getSelectedOptionID} selected defaultValue><option label="Please select type..." />{ displayReferrences }</select>
                </span>
              </div>
            </Fields>
            <Fields>
              { this.state.selectedOptionValue === COEFORMREQUEST_CUSTOM && <input className={(this.state.requiredSelect) && 'required-select'} type="text" placeholder="Other type that is not listed above" onChange={this.onGetCustomInputValue} /> }
            </Fields>
            <br />
            <ButtonWrapper>
              {(loading) && <span className="loading-cont"><LoadingIndicator /></span>}
              <Button handleRoute={(e) => { this.onSubmitCOEForm(e); }} color="gray">SUBMIT</Button>
              <Button handleRoute={this.dismissMessage} color="red">CANCEL</Button>
            </ButtonWrapper>
          </CreateNewForm>
        </Modal>
        {successPrompts}
        {errorPrompts}
      </span>
    );
  }
}

COERequest.propTypes = {
  loading: PropTypes.bool,
  show: PropTypes.bool,
  close: PropTypes.func,
  dismissSuccessMessage: PropTypes.func,
  dataRetrieveCOEReferrences: PropTypes.func,
  onDispatchCOEFormRequest: PropTypes.func,
  // error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  showCOEReferrencesList: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  showSuccessMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  showErrorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
  showCOEReferrencesList: makeShowCOEtypeList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dismissSuccessMessage: () => dispatch(dismissCOEForms()),
    dataRetrieveCOEReferrences: () => dispatch(retrieveCOEtypeList()),
    onDispatchCOEFormRequest: (descr, id, custominput) => dispatch(createCOEForms(descr, id, custominput)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'Forms', reducer });
const withSaga = injectSaga({ key: 'Forms', saga });

export default compose(withReducer, withSaga, withConnect)(COERequest);
