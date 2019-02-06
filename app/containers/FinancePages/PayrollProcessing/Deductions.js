/**
 * Deductions Component
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import moment from 'moment';
// import DatePicker from 'react-datepicker';
import 'components/datepicker.css';

import Loading from 'components/LoadingIndicator';
import Button from 'components/Button';

import {
  makeSelectRefs,
} from 'containers/HomePage/selectors';

import PayrollForm from './PayrollForm';
import { makeSelectOnSpotLoading, makeSelectOnSpotError } from './selectors';
import { empOnSpotDeduct } from './actions';

export class DeductionsComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      // startDate: moment().startOf('days'),
      // startFromDate: false,
      deductValue: '',
      deductValueError: false,
      deductOnSpotTypeID: '',
      deductOnSpotTypeIDError: false,
      // deductInstallment: '',
      // deductInstallmentError: false,
      deductNotes: '',
      deductAfterNet: '',
      deductAfterNetError: false,
      error: false,
    };
  }

  handleDeductValue = (e) => {
    this.setState({
      deductValue: e.currentTarget.value,
      deductValueError: false,
      error: false,
    });
  }

  handleDeductOnSpot = (e) => {
    const i = e.currentTarget.value;
    this.setState({
      deductOnSpotTypeID: this.props.onSpotTypeList[i].OnSpotDeductTypeID,
      deductOnSpotTypeIDError: false,
      error: false,
    });
  }

  // handleDeductInstallment = (e) => {
  //   this.setState({
  //     deductInstallment: e.currentTarget.value,
  //     deductInstallmentError: false,
  //     error: false,
  //   });
  // }

  handleDeductNotes = (e) => {
    this.setState({
      deductNotes: e.currentTarget.value,
      deductAfterNetError: false,
      error: false,
    });
  }

  // handleDeductStartDate = (date) => {
  //   this.setState({
  //     startFromDate: date,
  //   });
  // }

  handleDeductAfterNet = (e) => {
    this.setState({
      deductAfterNet: e.currentTarget.value,
      deductAfterNetError: false,
      error: false,
    });
  }

  submitDeductData = (prReviewID) => {
    const { deductAfterNet, deductOnSpotTypeID, deductValue } = this.state;
    let error = false;

    if (deductAfterNet === '') {
      error = true;
      this.setState({
        deductAfterNetError: true,
        error: true,
      });
    }

    // if (deductInstallment === '') {
    //   error = true;
    //   this.setState({
    //     deductInstallmentError: true,
    //     error: true,
    //   });
    // }

    if (deductOnSpotTypeID === '' || deductOnSpotTypeID === 'selectType') {
      error = true;
      this.setState({
        deductOnSpotTypeIDError: true,
        error: true,
      });
    }

    if (deductValue === '') {
      error = true;
      this.setState({
        deductValueError: true,
        error: true,
      });
    }

    if (!error) {
      const data = {
        AfterNet: (this.state.deductAfterNet === 'true') ? true : false, // eslint-disable-line no-unneeded-ternary
        Amount: parseFloat(this.state.deductValue),
        Notes: this.state.deductNotes,
        OnSpotDeductTypeID: this.state.deductOnSpotTypeID,
        PayrollReviewID: prReviewID,
      };

      this.props.submitData(data);
    }
  }

  render() {
    const { onSpotTypeList, prReviewInfo, loading, error } = this.props;

    let onSpotOptions;
    if (onSpotTypeList) {
      onSpotOptions = onSpotTypeList.map((opt, i) =>
        <option key={opt.OnSpotDeductTypeID} value={i}>{opt.Name}</option>
      );
    }

    return (
      <PayrollForm>
        {(loading) && <div className="loading-cont"><Loading /></div>}
        {/* <Waive title="Deduction List" isChecked={this.state.waiveDeductChecked}>
          <button onClick={this.waiveDeduct}>Deduction List 1</button>
          <button onClick={this.waiveDeduct}>Deduction List 2</button>
        </Waive> */}
        <div className="fields">
          <label htmlFor="deductionValue" className="title">* Value</label>
          <input id="deductionValue" type="number" placeholder="Enter amount in Pesos" onChange={this.handleDeductValue} className={(this.state.deductValueError) && 'error'} />
        </div>
        <div className="fields">
          <label htmlFor="onSpotTypes" className="title">* On Spot Type</label>
          <select id="onSpotTypes" defaultValue="selectType" onChange={this.handleDeductOnSpot} className={(this.state.deductOnSpotTypeIDError) && 'error'}>
            <option value="selectType" disabled>Please select type</option>
            {onSpotOptions}
          </select>
        </div>
        {/* <div className="fields">
          <label htmlFor="deductionInstallment" className="title">* Number of Installment</label>
          <input id="deductionInstallment" type="number" onChange={this.handleDeductInstallment} className={(this.state.deductInstallmentError) && 'error'} />
        </div> */}
        <div className="fields">
          <label htmlFor="deductionNotes" className="title">Notes</label>
          <textarea id="deductionNotes" onChange={this.handleDeductNotes} />
        </div>
        {/* <div className="fields">
          <label htmlFor="label" className="title">* Starts From</label>
          <DatePicker
            selected={this.state.startDate}
            startDate={this.state.startDate}
            onChange={this.handleDeductStartDate}
            dateFormat="LL"
            minDate={this.state.startDate}
          />
        </div> */}
        <div className="fields">
          <label htmlFor="label" className="title">* Deduct After</label>
          <label htmlFor="deductAfterNet" className={(this.state.deductAfterNetError) ? 'radio-group error' : 'radio-group'}>
            <input type="radio" id="deductAfterNet" name="deductAfter" value="true" onChange={this.handleDeductAfterNet} />
            <span>Net Pay</span>
          </label>
          <label htmlFor="deductAfterGross" className={(this.state.deductAfterNetError) ? 'radio-group error' : 'radio-group'}>
            <input type="radio" id="deductAfterGross" name="deductAfter" value="false" onChange={this.handleDeductAfterNet} />
            <span>Gross Pay</span>
          </label>
        </div>
        <div className="action-button">
          {(this.state.error) && <p className="error-msg">* Please fill up required fields</p>}
          {(error) && <p className="error-msg">We encountered an error submitting your data. Please try again later.</p>}
          <Button handleRoute={(e) => { e.preventDefault(); this.submitDeductData(prReviewInfo[0].PayrollReviewID); }} color="gray">SAVE</Button>
          <Button handleRoute={(e) => { e.preventDefault(); this.props.cancel(e); }} color="red">CANCEL</Button>
        </div>
      </PayrollForm>
    );
  }
}

DeductionsComponent.propTypes = {
  cancel: PropTypes.func,
  onSpotTypeList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  prReviewInfo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  // Function dispatch props
  submitData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  onSpotTypeList: makeSelectRefs('onSpotDeductTypes'),
  loading: makeSelectOnSpotLoading('onSpotDeduct'),
  error: makeSelectOnSpotError('onSpotDeduct'),
});

function mapDispatchToProps(dispatch) {
  return {
    submitData: (data) => dispatch(empOnSpotDeduct(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(DeductionsComponent);

