/**
 * Day Component (selection of time from and time to)
 * @prop {string} timeFrom  Set the initial time from
 * @prop {string} timeTo    Set the initial time to
 * @prop {string} dayName   Name of the day
 * @prop {func}   getTimes  Function to catch the return time from and time to (param: timeFrom, timeTo)
 */
import React from 'react';
import PropTypes from 'prop-types';

import Status from 'components/User/Status';
import Fields from 'components/Templates/CreateNewFormFields';

export class DayComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      timeFrom: (this.props.timeFrom) ? this.props.timeFrom : '00:00',
      timeTo: (this.props.timeTo) ? this.props.timeTo : '00:00',
    };
  }

  timeFromChange = () => {
    const newTime = `${this.hourFrom.value}:${this.minFrom.value}`;
    this.setState({
      timeFrom: newTime,
    });
    this.props.getTimes(newTime, this.state.timeTo);
  }

  timeToChange = () => {
    const newTime = `${this.hourTo.value}:${this.minTo.value}`;
    this.setState({
      timeTo: newTime,
    });
    this.props.getTimes(this.state.timeFrom, newTime);
  }

  render() {
    const { timeFrom, timeTo } = this.state;
    // Auto generate hours and minutes for all the shift schedule time
    const hours = [];
    const minutes = [];
    for (let h = 0; h < 24; h += 1) {
      const hour = h < 10 ? `0${h}` : h;
      hours.push(
        <option key={hour} value={hour}>{hour}</option>
      );
    }

    for (let m = 0; m < 60; m += 1) {
      const min = m < 10 ? `0${m}` : m;
      minutes.push(
        <option key={min} value={min}>{min}</option>
      );
    }

    // Split the default time
    const eTimeFrom = timeFrom.split(':');
    const eTimeTo = timeTo.split(':');

    return (
      <Fields className="scheds">
        <p>
          <Status className={((timeFrom !== '00:00' || timeTo !== '00:00') && timeFrom !== timeTo) ? 'Active status' : 'status'} />
          <span className="week-name">{this.props.dayName}:</span>
          <span className="select-custom">
            <i className="fa fa-caret-down" />
            <select ref={(el) => { this.hourFrom = el; }} defaultValue={eTimeFrom[0]} onChange={this.timeFromChange}>
              {hours}
            </select>
          </span> : &nbsp;
          <span className="select-custom">
            <i className="fa fa-caret-down" />
            <select ref={(el) => { this.minFrom = el; }} defaultValue={eTimeFrom[1]} onChange={this.timeFromChange}>
              {minutes}
            </select>
          </span>
          <span className="separator">-</span>
          <span className="select-custom">
            <i className="fa fa-caret-down" />
            <select ref={(el) => { this.hourTo = el; }} defaultValue={eTimeTo[0]} onChange={this.timeToChange}>
              {hours}
            </select>
          </span> : &nbsp;
          <span className="select-custom">
            <i className="fa fa-caret-down" />
            <select ref={(el) => { this.minTo = el; }} defaultValue={eTimeTo[1]} onChange={this.timeToChange}>
              {minutes}
            </select>
          </span>
        </p>
      </Fields>
    );
  }
}

DayComponent.propTypes = {
  timeFrom: PropTypes.string,
  timeTo: PropTypes.string,
  dayName: PropTypes.string,
  getTimes: PropTypes.func,
};

export default DayComponent;
