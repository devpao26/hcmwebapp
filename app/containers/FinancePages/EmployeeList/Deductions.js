/**
 * Deductions Component
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'components/datepicker.css';

import Loading from 'components/LoadingIndicator';
import Button from 'components/Button';

import {
  makeSelectRefs,
} from 'containers/HomePage/selectors';

import PayrollForm from '../PayrollProcessing/PayrollForm';
import { makeSelectLoading, makeSelectError } from './selectors';
import { empTimedDeduct } from './actions';

export class DeductionsComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().startOf('days').add(1, 'days'),
      startFromDate: moment().startOf('days').add(1, 'days'),
      deductValue: '',
      deductValueError: false,
      deductTimedTypeID: '',
      deductTimedTypeIDError: false,
      deductInstallment: '',
      deductInstallmentError: false,
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
      deductTimedTypeID: this.props.timedTypeList[i].TimedDeductTypeID,
      deductTimedTypeIDError: false,
      error: false,
    });
  }

  handleDeductInstallment = (e) => {
    this.setState({
      deductInstallment: e.currentTarget.value,
      deductInstallmentError: false,
      error: false,
    });
  }

  handleDeductNotes = (e) => {
    this.setState({
      deductNotes: e.currentTarget.value,
      deductAfterNetError: false,
      error: false,
    });
  }

  handleDeductStartDate = (date) => {
    this.setState({
      startFromDate: date,
    });
  }

  handleDeductAfterNet = (e) => {
    this.setState({
      deductAfterNet: e.currentTarget.value,
      deductAfterNetError: false,
      error: false,
    });
  }

  submitDeductData = (empID) => {
    const { deductAfterNet, deductInstallment, deductTimedTypeID, deductValue, deductNotes, startFromDate } = this.state;
    let error = false;

    if (deductAfterNet === '') {
      error = true;
      this.setState({
        deductAfterNetError: true,
        error: true,
      });
    }

    if (deductInstallment === '') {
      error = true;
      this.setState({
        deductInstallmentError: true,
        error: true,
      });
    }

    if (deductTimedTypeID === '' || deductTimedTypeID === 'selectType') {
      error = true;
      this.setState({
        deductTimedTypeIDError: true,
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
        AfterNet: (deductAfterNet === 'true') ? true : false, // eslint-disable-line no-unneeded-ternary
        EmpProfileID: empID,
        TotalAmount: parseFloat(deductValue),
        Notes: deductNotes,
        StartDate: moment(startFromDate).format('YYYY-MM-DD'),
        TimedDeductTypeID: deductTimedTypeID,
        TotalInstallments: deductInstallment,
      };

      this.props.submitData(data);
    }
  }

  render() {
    const { timedTypeList, empID, loading, error } = this.props;

    let timedOptions;
    if (timedTypeList) {
      timedOptions = timedTypeList.map((opt, i) =>
        <option key={opt.TimedDeductTypeID} value={i}>{opt.Name}</option>
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
          <select id="onSpotTypes" defaultValue="selectType" onChange={this.handleDeductOnSpot} className={(this.state.deductTimedTypeIDError) && 'error'}>
            <option value="selectType" disabled>Please select type</option>
            {timedOptions}
          </select>
        </div>
        <div className="fields">
          <label htmlFor="deductionInstallment" className="title">* Number of Installment</label>
          <input id="deductionInstallment" type="number" onChange={this.handleDeductInstallment} className={(this.state.deductInstallmentError) && 'error'} />
        </div>
        <div className="fields">
          <label htmlFor="deductionNotes" className="title">Notes</label>
          <textarea id="deductionNotes" onChange={this.handleDeductNotes} />
        </div>
        <div className="fields">
          <label htmlFor="label" className="title">* Starts From</label>
          <DatePicker
            selected={this.state.startFromDate}
            startDate={this.state.startDate}
            onChange={this.handleDeductStartDate}
            dateFormat="LL"
            minDate={this.state.startDate}
          />
        </div>
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
          <Button handleRoute={(e) => { e.preventDefault(); this.submitDeductData(empID); }} color="gray">SAVE</Button>
          <Button handleRoute={(e) => { e.preventDefault(); this.props.cancel(); }} color="red">CANCEL</Button>
        </div>
      </PayrollForm>
    );
  }
}

DeductionsComponent.propTypes = {
  cancel: PropTypes.func,
  timedTypeList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  empID: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  // Function dispatch props
  submitData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  timedTypeList: makeSelectRefs('timedDeductTypes'),
  loading: makeSelectLoading('timedDeduct'),
  error: makeSelectError('timedDeduct'),
});

function mapDispatchToProps(dispatch) {
  return {
    submitData: (data) => dispatch(empTimedDeduct(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(DeductionsComponent);

