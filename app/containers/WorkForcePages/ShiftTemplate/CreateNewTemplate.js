/**
 * Shift Template Creation of New Template
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// import DatePicker from 'react-datepicker';
import 'components/datepicker.css';

import Loading from 'components/LoadingIndicator';
import Button from 'components/Button';
import ButtonWrapper from 'components/Button/ButtonWrapper';
import ToggleSwitch from 'components/StyleUtils/ToggleSwitch';

import CreateNewForm from 'components/Templates/CreateNewForm';
import Fields from 'components/Templates/CreateNewFormFields';

import ShiftSchedules from './ShiftSchedules';
import Days from './Days';

class CreateNewTemplateForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shiftName: '',
      shiftNameError: false,
      shiftDesc: '',
      shiftDescError: false,
      shiftTemplDurationFrom: moment(),
      shiftTemplDurationTo: moment().add(5, 'days'),
      shiftTemplError: false,
      isFlexi: false,
      flexiId: 'false',
      flexiIdError: false,
      flexiStartTime: '00:00',
      flexiEndTime: '00:00',
      flexiTimeError: false,
      gracePeriod: '0',
      totalBreakHours: '0',
      sunTimeFrom: '00:00',
      sunTimeTo: '00:00',
      sunError: false,
      monTimeFrom: '00:00',
      monTimeTo: '00:00',
      monError: false,
      tueTimeFrom: '00:00',
      tueTimeTo: '00:00',
      tueError: false,
      wedTimeFrom: '00:00',
      wedTimeTo: '00:00',
      wedError: false,
      thuTimeFrom: '00:00',
      thuTimeTo: '00:00',
      thuError: false,
      friTimeFrom: '00:00',
      friTimeTo: '00:00',
      friError: false,
      satTimeFrom: '00:00',
      satTimeTo: '00:00',
      satError: false,
    };
  }

  // TODO: this should be enhanced and refined when used in validating the time difference of time from and time to
  //       move this method in the Days.js component
  // for validating if hours is not less than 9hrs
  compareHours = (start, end) => {
    const startTime = moment(start, 'HH:mm');
    const endTime = moment(end, 'HH:mm');
    const duration = moment.duration(endTime.diff(startTime));
    const hours = duration.asHours();

    if (hours >= 9 || hours <= -15) {
      return true;
    }
    return false;
  }

  shiftName = (e) => {
    this.setState({
      shiftName: e.currentTarget.value,
      shiftNameError: false,
    });
  }

  shiftDesc = (e) => {
    this.setState({
      shiftDesc: e.currentTarget.value,
    });
  }

  gracePeriod = (e) => {
    this.setState({
      gracePeriod: e.currentTarget.value,
    });
  }

  totalBreakHours = (e) => {
    this.setState({
      totalBreakHours: e.currentTarget.value,
    });
  }

  templateDurationFrom = (date) => {
    this.setState({
      shiftTemplDurationFrom: date,
      shiftTemplDurationTo: moment(date).add(3, 'days'),
    });
  }

  templateDurationTo = (date) => {
    this.setState({
      shiftTemplDurationTo: date,
    });
  }

  // Toggle Flexi Schedule
  toggleFlexi = () => {
    this.setState({
      isFlexi: !this.state.isFlexi,
      flexiIdError: false,
    });
  }

  flexiStart = (e) => {
    const val = e.currentTarget.value;
    const classlist = e.currentTarget.classList;

    if (classlist.contains('flexistarthour')) {
      this.flexiStartHour = val;
    } else if (classlist.contains('flexistartmin')) {
      this.flexiStartMin = val;
    }

    const hour = (this.flexiStartHour) ? this.flexiStartHour : '00';
    const min = (this.flexiStartMin) ? this.flexiStartMin : '00';
    this.setState({
      flexiStartTime: `${hour}:${min}`,
    });
  }
  flexiEnd = (e) => {
    const val = e.currentTarget.value;
    const classlist = e.currentTarget.classList;

    if (classlist.contains('flexiendhour')) {
      this.flexiEndHour = val;
    } else if (classlist.contains('flexiendmin')) {
      this.flexiEndMin = val;
    }

    const hour = (this.flexiEndHour) ? this.flexiEndHour : '00';
    const min = (this.flexiEndMin) ? this.flexiEndMin : '00';
    this.setState({
      flexiEndTime: `${hour}:${min}`,
    });
  }

  flexiRefId = (e) => {
    const i = e.currentTarget.value;
    if (i !== 'false') {
      this.setState({
        flexiId: this.props.flexiRefs[i].FlexiConditionID,
        flexiIdError: false,
      });
    } else {
      this.setState({
        flexiId: 'false',
      });
    }
  }

  // #region shift schedules
  // Shift Schedules (Sun - Sat)
  // sunTimeFromChange = (e) => {
  //   let val = e.currentTarget.value;
  //   let classlist = e.currentTarget.classList;

  //   if (classlist.contains('sunhourfrom')) {
  //     this.sunHourFrom = val;
  //   } else if (classlist.contains('sunminfrom')) {
  //     this.sunMinFrom = val;
  //   }

  //   let hour = (this.sunHourFrom) ? this.sunHourFrom : '00';
  //   let min = (this.sunMinFrom) ? this.sunMinFrom : '00';
  //   this.setState({
  //     sunTimeFrom: hour +":"+ min
  //   });
  // }
  // sunTimeToChange = (e) => {
  //   let val = e.currentTarget.value;
  //   let classlist = e.currentTarget.classList;

  //   if (classlist.contains('sunhourto')) {
  //     this.sunHourTo = val;
  //   } else if (classlist.contains('sunminto')) {
  //     this.sunMinTo = val;
  //   }

  //   let hour = (this.sunHourTo) ? this.sunHourTo : '00';
  //   let min = (this.sunMinTo) ? this.sunMinTo : '00';
  //   this.setState({
  //     sunTimeTo: hour +":"+ min
  //   });
  // }

  // monTimeFromChange = (e) => {
  //   let val = e.currentTarget.value;
  //   let classlist = e.currentTarget.classList;

  //   if (classlist.contains('monhourfrom')) {
  //     this.monHourFrom = val;
  //   } else if (classlist.contains('monminfrom')) {
  //     this.monMinFrom = val;
  //   }

  //   let hour = (this.monHourFrom) ? this.monHourFrom : '00';
  //   let min = (this.monMinFrom) ? this.monMinFrom : '00';
  //   this.setState({
  //     monTimeFrom: hour +":"+ min
  //   });
  // }
  // monTimeToChange = (e) => {
  //   let val = e.currentTarget.value;
  //   let classlist = e.currentTarget.classList;

  //   if (classlist.contains('monhourto')) {
  //     this.monHourTo = val;
  //   } else if (classlist.contains('monminto')) {
  //     this.monMinTo = val;
  //   }

  //   let hour = (this.monHourTo) ? this.monHourTo : '00';
  //   let min = (this.monMinTo) ? this.monMinTo : '00';
  //   this.setState({
  //     monTimeTo: hour +":"+ min
  //   });
  // }

  // tueTimeFromChange = (e) => {
  //   let val = e.currentTarget.value;
  //   let classlist = e.currentTarget.classList;

  //   if (classlist.contains('tuehourfrom')) {
  //     this.tueHourFrom = val;
  //   } else if (classlist.contains('tueminfrom')) {
  //     this.tueMinFrom = val;
  //   }

  //   let hour = (this.tueHourFrom) ? this.tueHourFrom : '00';
  //   let min = (this.tueMinFrom) ? this.tueMinFrom : '00';
  //   this.setState({
  //     tueTimeFrom: hour +":"+ min
  //   });
  // }
  // tueTimeToChange = (e) => {
  //   let val = e.currentTarget.value;
  //   let classlist = e.currentTarget.classList;

  //   if (classlist.contains('tuehourto')) {
  //     this.tueHourTo = val;
  //   } else if (classlist.contains('tueminto')) {
  //     this.tueMinTo = val;
  //   }

  //   let hour = (this.tueHourTo) ? this.tueHourTo : '00';
  //   let min = (this.tueMinTo) ? this.tueMinTo : '00';
  //   this.setState({
  //     tueTimeTo: hour +":"+ min
  //   });
  // }

  // wedTimeFromChange = (e) => {
  //   let val = e.currentTarget.value;
  //   let classlist = e.currentTarget.classList;

  //   if (classlist.contains('wedhourfrom')) {
  //     this.wedHourFrom = val;
  //   } else if (classlist.contains('wedminfrom')) {
  //     this.wedMinFrom = val;
  //   }

  //   let hour = (this.wedHourFrom) ? this.wedHourFrom : '00';
  //   let min = (this.wedMinFrom) ? this.wedMinFrom : '00';
  //   this.setState({
  //     wedTimeFrom: hour +":"+ min
  //   });
  // }
  // wedTimeToChange = (e) => {
  //   let val = e.currentTarget.value;
  //   let classlist = e.currentTarget.classList;

  //   if (classlist.contains('wedhourto')) {
  //     this.wedHourTo = val;
  //   } else if (classlist.contains('wedminto')) {
  //     this.wedMinTo = val;
  //   }

  //   let hour = (this.wedHourTo) ? this.wedHourTo : '00';
  //   let min = (this.wedMinTo) ? this.wedMinTo : '00';
  //   this.setState({
  //     wedTimeTo: hour +":"+ min
  //   });
  // }

  // thuTimeFromChange = (e) => {
  //   let val = e.currentTarget.value;
  //   let classlist = e.currentTarget.classList;

  //   if (classlist.contains('thuhourfrom')) {
  //     this.thuHourFrom = val;
  //   } else if (classlist.contains('thuminfrom')) {
  //     this.thuMinFrom = val;
  //   }

  //   let hour = (this.thuHourFrom) ? this.thuHourFrom : '00';
  //   let min = (this.thuMinFrom) ? this.thuMinFrom : '00';
  //   this.setState({
  //     thuTimeFrom: hour +":"+ min
  //   });
  // }
  // thuTimeToChange = (e) => {
  //   let val = e.currentTarget.value;
  //   let classlist = e.currentTarget.classList;

  //   if (classlist.contains('thuhourto')) {
  //     this.thuHourTo = val;
  //   } else if (classlist.contains('thuminto')) {
  //     this.thuMinTo = val;
  //   }

  //   let hour = (this.thuHourTo) ? this.thuHourTo : '00';
  //   let min = (this.thuMinTo) ? this.thuMinTo : '00';
  //   this.setState({
  //     thuTimeTo: hour +":"+ min
  //   });
  // }

  // friTimeFromChange = (e) => {
  //   let val = e.currentTarget.value;
  //   let classlist = e.currentTarget.classList;

  //   if (classlist.contains('frihourfrom')) {
  //     this.friHourFrom = val;
  //   } else if (classlist.contains('friminfrom')) {
  //     this.friMinFrom = val;
  //   }

  //   let hour = (this.friHourFrom) ? this.friHourFrom : '00';
  //   let min = (this.friMinFrom) ? this.friMinFrom : '00';
  //   this.setState({
  //     friTimeFrom: hour +":"+ min
  //   });
  // }
  // friTimeToChange = (e) => {
  //   let val = e.currentTarget.value;
  //   let classlist = e.currentTarget.classList;

  //   if (classlist.contains('frihourto')) {
  //     this.friHourTo = val;
  //   } else if (classlist.contains('friminto')) {
  //     this.friMinTo = val;
  //   }

  //   let hour = (this.friHourTo) ? this.friHourTo : '00';
  //   let min = (this.friMinTo) ? this.friMinTo : '00';
  //   this.setState({
  //     friTimeTo: hour +":"+ min
  //   });
  // }

  // satTimeFromChange = (e) => {
  //   let val = e.currentTarget.value;
  //   let classlist = e.currentTarget.classList;

  //   if (classlist.contains('sathourfrom')) {
  //     this.satHourFrom = val;
  //   } else if (classlist.contains('satminfrom')) {
  //     this.satMinFrom = val;
  //   }

  //   let hour = (this.satHourFrom) ? this.satHourFrom : '00';
  //   let min = (this.satMinFrom) ? this.satMinFrom : '00';
  //   this.setState({
  //     satTimeFrom: hour +":"+ min
  //   });
  // }
  // satTimeToChange = (e) => {
  //   let val = e.currentTarget.value;
  //   let classlist = e.currentTarget.classList;

  //   if (classlist.contains('sathourto')) {
  //     this.satHourTo = val;
  //   } else if (classlist.contains('satminto')) {
  //     this.satMinTo = val;
  //   }

  //   let hour = (this.satHourTo) ? this.satHourTo : '00';
  //   let min = (this.satMinTo) ? this.satMinTo : '00';
  //   this.setState({
  //     satTimeTo: hour +":"+ min
  //   });
  // }
  // #endregion

  monGetTime = (timeFrom, timeTo) => {
    this.setState({
      monTimeFrom: timeFrom,
      monTimeTo: timeTo,
    });
  }
  tueGetTime = (timeFrom, timeTo) => {
    this.setState({
      tueTimeFrom: timeFrom,
      tueTimeTo: timeTo,
    });
  }
  wedGetTime = (timeFrom, timeTo) => {
    this.setState({
      wedTimeFrom: timeFrom,
      wedTimeTo: timeTo,
    });
  }
  thuGetTime = (timeFrom, timeTo) => {
    this.setState({
      thuTimeFrom: timeFrom,
      thuTimeTo: timeTo,
    });
  }
  friGetTime = (timeFrom, timeTo) => {
    this.setState({
      friTimeFrom: timeFrom,
      friTimeTo: timeTo,
    });
  }
  satGetTime = (timeFrom, timeTo) => {
    this.setState({
      satTimeFrom: timeFrom,
      satTimeTo: timeTo,
    });
  }
  sunGetTime = (timeFrom, timeTo) => {
    this.setState({
      sunTimeFrom: timeFrom,
      sunTimeTo: timeTo,
    });
  }

  saveForm = (e) => {
    e.preventDefault();
    let error = false;

    const {
      shiftName, shiftDesc,
      sunTimeFrom, sunTimeTo,
      monTimeFrom, monTimeTo,
      tueTimeFrom, tueTimeTo,
      wedTimeFrom, wedTimeTo,
      thuTimeFrom, thuTimeTo,
      friTimeFrom, friTimeTo,
      satTimeFrom, satTimeTo,
      isFlexi, flexiStartTime, flexiEndTime, flexiId,
      gracePeriod, totalBreakHours,
    } = this.state;

    const shiftSchedList = [];

    if ((sunTimeFrom !== '00:00' || sunTimeTo !== '00:00') && sunTimeFrom !== sunTimeTo) {
      shiftSchedList.push({
        Day: 1,
        TimeIn: sunTimeFrom,
        TimeOut: sunTimeTo,
      });
    }

    if ((monTimeFrom !== '00:00' || monTimeTo !== '00:00') && monTimeFrom !== monTimeTo) {
      shiftSchedList.push({
        Day: 2,
        TimeIn: monTimeFrom,
        TimeOut: monTimeTo,
      });
    }

    if ((tueTimeFrom !== '00:00' || tueTimeTo !== '00:00') && tueTimeFrom !== tueTimeTo) {
      shiftSchedList.push({
        Day: 3,
        TimeIn: tueTimeFrom,
        TimeOut: tueTimeTo,
      });
    }

    if ((wedTimeFrom !== '00:00' || wedTimeTo !== '00:00') && wedTimeFrom !== wedTimeTo) {
      shiftSchedList.push({
        Day: 4,
        TimeIn: wedTimeFrom,
        TimeOut: wedTimeTo,
      });
    }

    if ((thuTimeFrom !== '00:00' || thuTimeTo !== '00:00') && thuTimeFrom !== thuTimeTo) {
      shiftSchedList.push({
        Day: 5,
        TimeIn: thuTimeFrom,
        TimeOut: thuTimeTo,
      });
    }

    if ((friTimeFrom !== '00:00' || friTimeTo !== '00:00') && friTimeFrom !== friTimeTo) {
      shiftSchedList.push({
        Day: 6,
        TimeIn: friTimeFrom,
        TimeOut: friTimeTo,
      });
    }

    if ((satTimeFrom !== '00:00' || satTimeTo !== '00:00') && satTimeFrom !== satTimeTo) {
      shiftSchedList.push({
        Day: 7,
        TimeIn: satTimeFrom,
        TimeOut: satTimeTo,
      });
    }

    // Gather the new shift template data
    // to be passed on our saga
    const data = {
      Descr: shiftDesc,
      GracePeriod: parseInt(gracePeriod, 10),
      TotalBreak: parseInt(totalBreakHours, 10),
      ShiftSchedulesList: shiftSchedList,
      IsFlexi: false,
    };

    if (!shiftName.replace(/\s/g, '').length || shiftName === '' || !shiftName) {
      this.setState({
        shiftNameError: true,
      });
      error = true;
    } else {
      data.Name = shiftName;
    }

    if (isFlexi && flexiId !== 'false') {
      data.IsFlexi = true;
      data.FlexiConditionID = flexiId;
      data.FlexiInEnd = flexiEndTime;
      data.FlexiInStart = flexiStartTime;
    } else if (isFlexi && flexiId === 'false') {
      this.setState({
        flexiIdError: true,
      });
      error = true;
    }

    if (!error) {
      this.props.save(data);
    }
  }

  render() {
    const { flexiRefs } = this.props;

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

    let refs;
    if (flexiRefs) {
      refs = flexiRefs.map((item, index) =>
        <option value={index} key={item.FlexiConditionID}>{item.Name}</option>
      );
    }

    return (
      <CreateNewForm>
        {(this.props.loading) && <div className="form-saving"><Loading /></div>}
        <Fields>
          <label htmlFor="tempName">Name</label>
          <input id="tempName" type="text" placeholder="New Shift Template Name" onChange={this.shiftName} className={this.state.shiftNameError && 'error'} />
          {(this.state.shiftNameError) && <span className="error-msg">* Please fill out this field.</span>}
        </Fields>
        <Fields>
          <label htmlFor="tempDescr">Description</label>
          <input id="tempDescr" type="text" placeholder="Template Description Here" onChange={this.shiftDesc} className={this.state.shiftDescError && 'error'} />
        </Fields>
        {/* <Fields>
          <label>Template Duration</label>
          <div className="half">
            <label>Start</label>
            <span className="select-custom">
              <i className="fa fa-caret-down" />
              <DatePicker
                selected={this.state.shiftTemplDurationFrom}
                selectsStart
                startDate={this.state.shiftTemplDurationFrom}
                endDate={this.state.shiftTemplDurationTo}
                onChange={this.templateDurationFrom}
                dateFormat="LL"
                minDate={moment().startOf('days')}
              />
            </span>
          </div>
          <div className="half">
            <label>End</label>
            <span className="select-custom">
              <i className="fa fa-caret-down" />
              <DatePicker
                selected={this.state.shiftTemplDurationTo}
                selectsEnd
                startDate={this.state.shiftTemplDurationFrom}
                endDate={this.state.shiftTemplDurationTo}
                onChange={this.templateDurationTo}
                dateFormat="LL"
                popperPlacement="bottom-end"
                minDate={this.state.shiftTemplDurationFrom}
              />
            </span>
          </div>
        </Fields> */}
        <Fields>
          <div className="flexi">
            <label htmlFor="flexi" className="inline">Flexi <ToggleSwitch value={false} hideReq update={this.toggleFlexi} /></label>
            <br />
            <p className={!this.state.isFlexi ? 'inactive half' : 'half'}>
              <label htmlFor="flexistart">Start</label>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className={(this.state.flexiTimeError) ? 'error flexistarthour' : 'flexistarthour'} disabled={!this.state.isFlexi} onChange={this.flexiStart}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className={(this.state.flexiTimeError) ? 'error flexistartmin' : 'flexistartmin'} disabled={!this.state.isFlexi} onChange={this.flexiStart}>
                  {minutes}
                </select>
              </span>
            </p>
            <p className={!this.state.isFlexi ? 'inactive half' : 'half'}>
              <label htmlFor="flexiend">End</label>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className={(this.state.flexiTimeError) ? 'error flexiendhour' : 'flexiendhour'} disabled={!this.state.isFlexi} onChange={this.flexiEnd}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className={(this.state.flexiTimeError) ? 'error flexiendmin' : 'flexiendmin'} disabled={!this.state.isFlexi} onChange={this.flexiEnd}>
                  {minutes}
                </select>
              </span>
            </p>
            <br />
            <p className={!this.state.isFlexi ? 'inactive half' : 'half'}>
              <label htmlFor="flexicondition">Flexi with condition</label>
              <span className="select-custom long">
                <i className="fa fa-caret-down" />
                <select onChange={this.flexiRefId} disabled={!this.state.isFlexi} className={(this.state.flexiIdError) ? 'error' : ''}>
                  <option value="false">None</option>
                  {refs}
                </select>
                {(this.state.flexiIdError) && <span className="error-msg">* Please fill out this field.</span>}
              </span>
            </p>
            <br />
            <p className={this.state.isFlexi ? 'inactive half' : 'half'}>
              <label htmlFor="gracePeriod">Grace Period</label>
              <input id="gracePeriod" type="number" placeholder="0" onChange={this.gracePeriod} disabled={this.state.isFlexi} />
            </p>
            <p className="half">
              <label htmlFor="totalBreak">Total Break (minutes)</label>
              <input id="totalBreak" type="number" placeholder="0" onChange={this.totalBreakHours} />
            </p>
          </div>
        </Fields>
        <ShiftSchedules>
          <Fields className="scheds">
            <label htmlFor="scheds">
              Shift Schedules
              <span className="time-in">Time In</span>
              <span className="time-out">Time Out</span>
            </label>
          </Fields>
          <Days dayName="SUNDAY" getTimes={this.sunGetTime} />
          <Days dayName="MONDAY" getTimes={this.monGetTime} />
          <Days dayName="TUESDAY" getTimes={this.tueGetTime} />
          <Days dayName="WEDNESDAY" getTimes={this.wedGetTime} />
          <Days dayName="THURSDAY" getTimes={this.thuGetTime} />
          <Days dayName="FRIDAY" getTimes={this.friGetTime} />
          <Days dayName="SATURDAY" getTimes={this.satGetTime} />
          {/* <Fields className="scheds">
            <p>
              <Status className={((sunTimeFrom != '00:00' || sunTimeTo != '00:00') && sunTimeFrom !== sunTimeTo) ? "Active status" : "status"} />
              <span className="week-name">SUNDAY:</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="sunhourfrom" onChange={this.sunTimeFromChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="sunminfrom" onChange={this.sunTimeFromChange}>
                  {minutes}
                </select>
              </span>
              <span className="separator">-</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="sunhourto" onChange={this.sunTimeToChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="sunminto" onChange={this.sunTimeToChange}>
                  {minutes}
                </select>
              </span>
            </p>
          </Fields>
          <Fields className="scheds">
            <p>
              <Status className={((monTimeFrom != '00:00' || monTimeTo != '00:00') && monTimeFrom !== monTimeTo) ? "Active status" : "status"} />
              <span className="week-name">MONDAY:</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="monhourfrom" onChange={this.monTimeFromChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="monminfrom" onChange={this.monTimeFromChange}>
                  {minutes}
                </select>
              </span>
              <span className="separator">-</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="monhourto" onChange={this.monTimeToChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="monminto" onChange={this.monTimeToChange}>
                  {minutes}
                </select>
              </span>
            </p>
          </Fields>
          <Fields className="scheds">
            <p>
              <Status className={((tueTimeFrom != '00:00' || tueTimeTo != '00:00') && tueTimeFrom !== tueTimeTo) ? "Active status" : "status"} />
              <span className="week-name">TUESDAY:</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="tuehourfrom" onChange={this.tueTimeFromChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="tueminfrom" onChange={this.tueTimeFromChange}>
                  {minutes}
                </select>
              </span>
              <span className="separator">-</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="tuehourto" onChange={this.tueTimeToChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="tueminto" onChange={this.tueTimeToChange}>
                  {minutes}
                </select>
              </span>
            </p>
          </Fields>
          <Fields className="scheds">
            <p>
              <Status className={((wedTimeFrom != '00:00' || wedTimeTo != '00:00') && wedTimeFrom !== wedTimeTo) ? "Active status" : "status"} />
              <span className="week-name">WEDNESDAY:</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="wedhourfrom" onChange={this.wedTimeFromChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="wedminfrom" onChange={this.wedTimeFromChange}>
                  {minutes}
                </select>
              </span>
              <span className="separator">-</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="wedhourto" onChange={this.wedTimeToChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="wedminto" onChange={this.wedTimeToChange}>
                  {minutes}
                </select>
              </span>
            </p>
          </Fields>
          <Fields className="scheds">
            <p>
              <Status className={((thuTimeFrom != '00:00' || thuTimeTo != '00:00') && thuTimeFrom !== thuTimeTo) ? "Active status" : "status"} />
              <span className="week-name">THURSDAY:</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="thuhourfrom" onChange={this.thuTimeFromChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="thuminfrom" onChange={this.thuTimeFromChange}>
                  {minutes}
                </select>
              </span>
              <span className="separator">-</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="thuhourto" onChange={this.thuTimeToChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="thuminto" onChange={this.thuTimeToChange}>
                  {minutes}
                </select>
              </span>
            </p>
          </Fields>
          <Fields className="scheds">
            <p>
              <Status className={((friTimeFrom != '00:00' || friTimeTo != '00:00') && friTimeFrom !== friTimeTo) ? "Active status" : "status"} />
              <span className="week-name">FRIDAY:</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="frihourfrom" onChange={this.friTimeFromChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="friminfrom" onChange={this.friTimeFromChange}>
                  {minutes}
                </select>
              </span>
              <span className="separator">-</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="frihourto" onChange={this.friTimeToChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="friminto" onChange={this.friTimeToChange}>
                  {minutes}
                </select>
              </span>
            </p>
          </Fields>
          <Fields className="scheds">
            <p>
              <Status className={((satTimeFrom != '00:00' || satTimeTo != '00:00') && satTimeFrom !== satTimeTo) ? "Active status" : "status"} />
              <span className="week-name">SATURDAY:</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="sathourfrom" onChange={this.satTimeFromChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="satminfrom" onChange={this.satTimeFromChange}>
                  {minutes}
                </select>
              </span>
              <span className="separator">-</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="sathourto" onChange={this.satTimeToChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select className="satminto" onChange={this.satTimeToChange}>
                  {minutes}
                </select>
              </span>
            </p>
          </Fields> */}
        </ShiftSchedules>
        <ButtonWrapper>
          <Button handleRoute={this.saveForm} color="gray">SAVE</Button>
          <Button handleRoute={this.props.cancel} color="red">CANCEL</Button>
        </ButtonWrapper>
      </CreateNewForm>
    );
  }
}

CreateNewTemplateForm.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  flexiRefs: PropTypes.array,
};

export default CreateNewTemplateForm;
