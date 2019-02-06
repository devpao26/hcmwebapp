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
import { empOnSpotEarning } from './actions';

export class DeductionsComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      // startDate: moment().startOf('days'),
      // startFromDate: false,
      earningValue: '',
      earningValueError: false,
      earningOnSpotTypeID: '',
      earningOnSpotTypeIDError: false,
      // earningInstallment: '',
      // earningInstallmentError: false,
      earningNotes: '',
      earningAfterNet: '',
      earningAfterNetError: false,
      error: false,
    };
  }

  handleEarningValue = (e) => {
    this.setState({
      earningValue: e.currentTarget.value,
      earningValueError: false,
      error: false,
    });
  }

  handleEarningOnSpot = (e) => {
    const i = e.currentTarget.value;
    this.setState({
      earningOnSpotTypeID: this.props.onSpotTypeList[i].OnSpotEarnTypeID,
      earningOnSpotTypeIDError: false,
      error: false,
    });
  }

  // handleEarningInstallment = (e) => {
  //   this.setState({
  //     earningInstallment: e.currentTarget.value,
  //     earningInstallmentError: false,
  //     error: false,
  //   });
  // }

  handleEarningNotes = (e) => {
    this.setState({
      earningNotes: e.currentTarget.value,
      earningAfterNetError: false,
      error: false,
    });
  }

  // handleEarningStartDate = (date) => {
  //   this.setState({
  //     startFromDate: date,
  //   });
  // }

  handleEarningAfterNet = (e) => {
    this.setState({
      earningAfterNet: e.currentTarget.value,
      earningAfterNetError: false,
      error: false,
    });
  }

  submitEarningData = (prReviewID) => {
    const { earningAfterNet, earningOnSpotTypeID, earningValue, earningNotes } = this.state;
    let error = false;

    if (earningAfterNet === '') {
      error = true;
      this.setState({
        earningAfterNetError: true,
        error: true,
      });
    }

    // if (earningInstallment === '') {
    //   error = true;
    //   this.setState({
    //     earningInstallmentError: true,
    //     error: true,
    //   });
    // }

    if (earningOnSpotTypeID === '' || earningOnSpotTypeID === 'selectType') {
      error = true;
      this.setState({
        earningOnSpotTypeIDError: true,
        error: true,
      });
    }

    if (earningValue === '') {
      error = true;
      this.setState({
        earningValueError: true,
        error: true,
      });
    }

    if (!error) {
      const data = {
        AfterNet: (earningAfterNet === 'true') ? true : false, // eslint-disable-line no-unneeded-ternary
        Amount: parseFloat(earningValue),
        Notes: earningNotes,
        OnSpotEarnTypeID: earningOnSpotTypeID,
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
        <option key={opt.OnSpotEarnTypeID} value={i}>{opt.Name}</option>
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
          <label htmlFor="earningValue" className="title">* Value</label>
          <input id="earningValue" type="number" placeholder="Enter amount in Pesos" onChange={this.handleEarningValue} className={(this.state.earningValueError) && 'error'} />
        </div>
        <div className="fields">
          <label htmlFor="onSpotTypes" className="title">* On Spot Type</label>
          <select id="onSpotTypes" defaultValue="selectType" onChange={this.handleEarningOnSpot} className={(this.state.earningOnSpotTypeIDError) && 'error'}>
            <option value="selectType" disabled>Please select type</option>
            {onSpotOptions}
          </select>
        </div>
        {/* <div className="fields">
          <label htmlFor="earningInstallment" className="title">* Number of Installment</label>
          <input id="earningInstallment" type="number" onChange={this.handleEarningInstallment} className={(this.state.earningInstallmentError) && 'error'} />
        </div> */}
        <div className="fields">
          <label htmlFor="earningNotes" className="title">Notes</label>
          <textarea id="earningNotes" onChange={this.handleEarningNotes} />
        </div>
        {/* <div className="fields">
          <label htmlFor="label" className="title">* Starts From</label>
          <DatePicker
            selected={this.state.startDate}
            startDate={this.state.startDate}
            onChange={this.handleEarningStartDate}
            dateFormat="LL"
            minDate={this.state.startDate}
          />
        </div> */}
        <div className="fields">
          <label htmlFor="label" className="title">* Deduct After</label>
          <label htmlFor="earningAfterNet" className={(this.state.earningAfterNetError) ? 'radio-group error' : 'radio-group'}>
            <input type="radio" id="earningAfterNet" name="earningAfter" value="true" onChange={this.handleEarningAfterNet} />
            <span>Net Pay</span>
          </label>
          <label htmlFor="earningAfterGross" className={(this.state.earningAfterNetError) ? 'radio-group error' : 'radio-group'}>
            <input type="radio" id="earningAfterGross" name="earningAfter" value="false" onChange={this.handleEarningAfterNet} />
            <span>Gross Pay</span>
          </label>
        </div>
        <div className="action-button">
          {(this.state.error) && <p className="error-msg">* Please fill up required fields</p>}
          {(error) && <p className="error-msg">We encountered an error submitting your data. Please try again later.</p>}
          <Button handleRoute={(e) => { e.preventDefault(); this.submitEarningData(prReviewInfo[0].PayrollReviewID); }} color="gray">SAVE</Button>
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
  onSpotTypeList: makeSelectRefs('onSpotEarnTypes'),
  loading: makeSelectOnSpotLoading('onSpotEarning'),
  error: makeSelectOnSpotError('onSpotEarning'),
});

function mapDispatchToProps(dispatch) {
  return {
    submitData: (data) => dispatch(empOnSpotEarning(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(DeductionsComponent);

