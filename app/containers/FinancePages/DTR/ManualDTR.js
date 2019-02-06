/**
 * Manual DTR Override
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
import ToggleSwitch from 'components/StyleUtils/ToggleSwitch';
import Select from 'components/Forms/Select';

/* selectors, reducer, saga and actions */
import {
  makeSelectLoading,
  makeSelectError,
} from './selectors';

import {
  manualDtrOverride,
} from './actions';

import DTROverride from './DTROverride';

export class ManualDTROverride extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.date,
      minDate: moment().startOf('days').subtract(1, 'month'),
      hours: 0,
      minutes: 0,
      actualHoursError: false,
      isUnpaidLeave: false,
      notes: false,
    };
  }

  handleDateChange = (date) => {
    this.setState({
      startDate: date,
    });
  }

  handleHour = (e) => {
    this.setState({
      hours: parseInt(e.currentTarget.value, 10),
      actualHoursError: false,
    });
  }

  handleMinutes = (e) => {
    this.setState({
      minutes: parseInt(e.currentTarget.value, 10),
      actualHoursError: false,
    });
  }

  handleUnpaidLeave = (e, isBool) => {
    this.setState({
      isUnpaidLeave: isBool,
    });
  }

  handleNotes = (e) => {
    this.setState({
      notes: e.currentTarget.value,
    });
  }

  submitData = (e) => {
    e.preventDefault();
    let error = false;

    let actualHours = 0;
    if (this.state.hours === 0 && this.state.minutes === 0) {
      this.setState({
        actualHoursError: true,
      });
      error = true;
    } else {
      error = false;
      actualHours = (this.state.hours * 60) + this.state.minutes;
    }

    if (!error) {
      const data = {
        EmpProfileID: this.props.empID,
        ShiftTemplateID: this.props.shiftID,
        ShiftDate: moment(this.state.startDate).format('YYYY-MM-DD'),
        UpdateLeavePaid: this.state.isUnpaidLeave.toString(),
        LeavePaid: this.state.isUnpaidLeave,
        Notes: this.state.notes,
        UpdateTotalActual: actualHours.toString(),
        TotalActual: actualHours,
      };

      this.props.onSubmitData(data);
    }
  }

  render() {
    // Auto generate hours and minutes for all the shift schedule time
    const hours = [];
    const minutes = [];
    for (let h = 0; h < 24; h += 1) {
      const hour = h;
      hours.push(
        <option key={hour} value={hour}>{hour}</option>
      );
    }

    for (let m = 0; m < 60; m += 1) {
      const min = m;
      minutes.push(
        <option key={min} value={min}>{min}</option>
      );
    }

    return (
      <DTROverride>
        {(this.props.loading) && <div className="loading-cont"><Loading /></div>}
        <div className="fields">
          <label htmlFor="label">Employee Name</label>
          <span className="value">{this.props.empName}</span>
        </div>
        <div className="fields">
          <label htmlFor="label">Date</label>
          <DatePicker
            selected={this.state.startDate}
            startDate={this.state.startDate}
            minDate={this.state.minDate}
            onChange={this.handleDateChange}
            dateFormat="LL"
          />
        </div>
        <div className="fields">
          <label htmlFor="label">Total Actual Hours</label>
          <Select label="Hours" getValue={this.handleHour}>{hours}</Select>
          <Select label="Minutes" getValue={this.handleMinutes}>{minutes}</Select>
          {(this.state.actualHoursError) && <span className="error-msg">* Please choose actual hours (hours and minutes must not be both 0)</span>}
          {/* <input type="text" defaultValue="10:09:00" /> */}
        </div>
        <div className="fields">
          <label htmlFor="label">Unpaid Leave <ToggleSwitch value={false} hideReq update={this.handleUnpaidLeave} /></label>
        </div>
        <div className="fields">
          <label htmlFor="label">Notes</label>
          <textarea onChange={this.handleNotes}></textarea>
        </div>
        <div className="action-button">
          {(this.props.error) && <span className="error-msg">* An error has occurred while sending the data, please try again.</span>}
          <Button handleRoute={this.submitData} color="gray">SAVE</Button>
          <Button handleRoute={(e) => { e.preventDefault(); this.props.cancel(); }} color="red">CANCEL</Button>
        </div>
      </DTROverride>
    );
  }
}

ManualDTROverride.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  empID: PropTypes.string,
  empName: PropTypes.string,
  shiftID: PropTypes.string,
  date: PropTypes.object,
  cancel: PropTypes.func,
  onSubmitData: PropTypes.func,
};


const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('manualDtr'),
  error: makeSelectError('manualDtr'),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitData: (data) => dispatch(manualDtrOverride(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(ManualDTROverride);
