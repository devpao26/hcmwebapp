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

class EditShiftTemplateForm extends React.PureComponent {
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

  componentWillMount() {
    const details = this.props.details;

    // set default values from the template details
    this.setState({
      shiftName: details.Name,
      shiftDesc: details.Descr,
      gracePeriod: details.GracePeriod,
      totalBreakHours: details.TotalBreak,
      isFlexi: details.IsFlexi,
    });

    if (details.IsFlexi === true) {
      this.setState({
        flexiId: details.FlexiConditionID,
        flexiEndTime: details.FlexiInEnd,
        flexiStartTime: details.FlexiInStart,
      });
    }

    const shiftSchedules = details.ShiftSchedulesList;

    const sI = shiftSchedules.findIndex((item) => item.Day === 1);
    const mI = shiftSchedules.findIndex((item) => item.Day === 2);
    const tI = shiftSchedules.findIndex((item) => item.Day === 3);
    const wI = shiftSchedules.findIndex((item) => item.Day === 4);
    const thI = shiftSchedules.findIndex((item) => item.Day === 5);
    const fI = shiftSchedules.findIndex((item) => item.Day === 6);
    const saI = shiftSchedules.findIndex((item) => item.Day === 7);

    if (sI >= 0) {
      this.eSunTimeFrom = shiftSchedules[sI].TimeIn.split(':');
      this.eSunTimeTo = shiftSchedules[sI].TimeOut.split(':');

      this.setState({
        sunTimeFrom: `${this.eSunTimeFrom[0]}:${this.eSunTimeFrom[1]}`,
        sunTimeTo: `${this.eSunTimeTo[0]}:${this.eSunTimeTo[1]}`,
      });
    }

    if (mI >= 0) {
      this.eMonTimeFrom = shiftSchedules[mI].TimeIn.split(':');
      this.eMonTimeTo = shiftSchedules[mI].TimeOut.split(':');

      this.setState({
        monTimeFrom: `${this.eMonTimeFrom[0]}:${this.eMonTimeFrom[1]}`,
        monTimeTo: `${this.eMonTimeTo[0]}:${this.eMonTimeTo[1]}`,
      });
    }

    if (tI >= 0) {
      this.eTueTimeFrom = shiftSchedules[tI].TimeIn.split(':');
      this.eTueTimeTo = shiftSchedules[tI].TimeOut.split(':');

      this.setState({
        tueTimeFrom: `${this.eTueTimeFrom[0]}:${this.eTueTimeFrom[1]}`,
        tueTimeTo: `${this.eTueTimeTo[0]}:${this.eTueTimeTo[1]}`,
      });
    }

    if (wI >= 0) {
      this.eWedTimeFrom = shiftSchedules[wI].TimeIn.split(':');
      this.eWedTimeTo = shiftSchedules[wI].TimeOut.split(':');

      this.setState({
        wedTimeFrom: `${this.eWedTimeFrom[0]}:${this.eWedTimeFrom[1]}`,
        wedTimeTo: `${this.eWedTimeTo[0]}:${this.eWedTimeTo[1]}`,
      });
    }

    if (thI >= 0) {
      this.eThuTimeFrom = shiftSchedules[thI].TimeIn.split(':');
      this.eThuTimeTo = shiftSchedules[thI].TimeOut.split(':');

      this.setState({
        thuTimeFrom: `${this.eThuTimeFrom[0]}:${this.eThuTimeFrom[1]}`,
        thuTimeTo: `${this.eThuTimeTo[0]}:${this.eThuTimeTo[1]}`,
      });
    }

    if (fI >= 0) {
      this.eFriTimeFrom = shiftSchedules[fI].TimeIn.split(':');
      this.eFriTimeTo = shiftSchedules[fI].TimeOut.split(':');

      this.setState({
        friTimeFrom: `${this.eFriTimeFrom[0]}:${this.eFriTimeFrom[1]}`,
        friTimeTo: `${this.eFriTimeTo[0]}:${this.eFriTimeTo[1]}`,
      });
    }

    if (saI >= 0) {
      this.eSatTimeFrom = shiftSchedules[saI].TimeIn.split(':');
      this.eSatTimeTo = shiftSchedules[saI].TimeOut.split(':');

      this.setState({
        satTimeFrom: `${this.eSatTimeFrom[0]}:${this.eSatTimeFrom[1]}`,
        satTimeTo: `${this.eSatTimeTo[0]}:${this.eSatTimeTo[1]}`,
      });
    }
  }

  // TODO: this should be enhanced and refined when used in validating the time difference of time from and time to
  //       move this method in the Days.js component
  // for validating if hours is not less than 9hrs
  compareHours = (start, end) => {
    const startTime = moment(start, 'HH:mm');
    const endTime = moment(end, 'HH:mm');
    const duration = moment.duration(endTime.diff(startTime));
    const hours = duration.asHours();
    if (hours >= 9 || hours <= (-15)) {
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

  // #region old shift schedules
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
        UpdateDay: '1',
        TimeIn: sunTimeFrom,
        TimeOut: sunTimeTo,
      });
    } else if ((sunTimeFrom !== '00:00' || sunTimeTo !== '00:00') && sunTimeFrom === sunTimeTo) {
      this.setState({
        sunError: true,
      });
    }

    if ((monTimeFrom !== '00:00' || monTimeTo !== '00:00') && monTimeFrom !== monTimeTo) {
      shiftSchedList.push({
        Day: 2,
        UpdateDay: '2',
        TimeIn: monTimeFrom,
        TimeOut: monTimeTo,
      });
    }

    if ((tueTimeFrom !== '00:00' || tueTimeTo !== '00:00') && tueTimeFrom !== tueTimeTo) {
      shiftSchedList.push({
        Day: 3,
        UpdateDay: '3',
        TimeIn: tueTimeFrom,
        TimeOut: tueTimeTo,
      });
    }

    if ((wedTimeFrom !== '00:00' || wedTimeTo !== '00:00') && wedTimeFrom !== wedTimeTo) {
      shiftSchedList.push({
        Day: 4,
        UpdateDay: '4',
        TimeIn: wedTimeFrom,
        TimeOut: wedTimeTo,
      });
    }

    if ((thuTimeFrom !== '00:00' || thuTimeTo !== '00:00') && thuTimeFrom !== thuTimeTo) {
      shiftSchedList.push({
        Day: 5,
        UpdateDay: '5',
        TimeIn: thuTimeFrom,
        TimeOut: thuTimeTo,
      });
    }

    if ((friTimeFrom !== '00:00' || friTimeTo !== '00:00') && friTimeFrom !== friTimeTo) {
      shiftSchedList.push({
        Day: 6,
        UpdateDay: '6',
        TimeIn: friTimeFrom,
        TimeOut: friTimeTo,
      });
    }

    if ((satTimeFrom !== '00:00' || satTimeTo !== '00:00') && satTimeFrom !== satTimeTo) {
      shiftSchedList.push({
        Day: 7,
        UpdateDay: '7',
        TimeIn: satTimeFrom,
        TimeOut: satTimeTo,
      });
    }

    // Gather the new shift template data
    // to be passed on our saga
    const data = {
      Descr: shiftDesc,
      UpdateGracePeriod: gracePeriod,
      UpdateTotalBreak: totalBreakHours,
      ShiftSchedulesList: shiftSchedList,
      UpdateIsFlexi: 'false',
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
      data.UpdateIsFlexi = 'true';
      data.FlexiConditionID = flexiId;
      data.FlexiInEnd = flexiEndTime;
      data.FlexiInStart = flexiStartTime;
      data.UpdateGracePeriod = '0';
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
    const { flexiRefs, details } = this.props;

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

    const {
      sunTimeFrom, sunTimeTo,
      monTimeFrom, monTimeTo,
      tueTimeFrom, tueTimeTo,
      wedTimeFrom, wedTimeTo,
      thuTimeFrom, thuTimeTo,
      friTimeFrom, friTimeTo,
      satTimeFrom, satTimeTo,
    } = this.state;

    let selectedFlexiCond;
    if (details && details.IsFlexi === true) {
      const flexiCondId = details.FlexiConditionID;
      const index = flexiRefs.findIndex((item) => item.FlexiConditionID === flexiCondId);
      selectedFlexiCond = index;
    }

    // Split the Time retrieved from the shift template details
    let flexiInStartTime;
    let flexiInEndTime;
    if (details.IsFlexi) {
      flexiInStartTime = details.FlexiInStart.split(':');
      flexiInEndTime = details.FlexiInEnd.split(':');
    } else {
      flexiInStartTime = ['00', '00'];
      flexiInEndTime = ['00', '00'];
    }

    return (
      <CreateNewForm>
        {(this.props.loading) && <div className="form-saving"><Loading /></div>}
        <Fields>
          <label htmlFor="tempName">Name</label>
          <input id="tempName" type="text" defaultValue={details.Name} placeholder="New Shift Template Name" onChange={this.shiftName} className={this.state.shiftNameError && 'error'} />
          {(this.state.shiftNameError) && <span className="error-msg">* Please fill out this field.</span>}
        </Fields>
        <Fields>
          <label htmlFor="tempDescr">Description</label>
          <input id="tempDescr" type="text" defaultValue={details.Descr} placeholder="Template Description Here" onChange={this.shiftDesc} className={this.state.shiftDescError && 'error'} />
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
            <label htmlFor="isflexi" className="inline">Flexi <ToggleSwitch value={this.state.isFlexi} hideReq update={this.toggleFlexi} /></label>
            <br />
            <p className={!this.state.isFlexi ? 'inactive half' : 'half'}>
              <label htmlFor="flexistart">Start</label>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={flexiInStartTime[0]} className={(this.state.flexiTimeError) ? 'error flexistarthour' : 'flexistarthour'} disabled={!this.state.isFlexi} onChange={this.flexiStart}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={flexiInStartTime[1]} className={(this.state.flexiTimeError) ? 'error flexistartmin' : 'flexistartmin'} disabled={!this.state.isFlexi} onChange={this.flexiStart}>
                  {minutes}
                </select>
              </span>
            </p>
            <p className={!this.state.isFlexi ? 'inactive half' : 'half'}>
              <label htmlFor="flexiend">End</label>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={flexiInEndTime[0]} className={(this.state.flexiTimeError) ? 'error flexiendhour' : 'flexiendhour'} disabled={!this.state.isFlexi} onChange={this.flexiEnd}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={flexiInEndTime[1]} className={(this.state.flexiTimeError) ? 'error flexiendmin' : 'flexiendmin'} disabled={!this.state.isFlexi} onChange={this.flexiEnd}>
                  {minutes}
                </select>
              </span>
            </p>
            <br />
            <p className={!this.state.isFlexi ? 'inactive half' : 'half'}>
              <label htmlFor="flexicondition">Flexi with condition</label>
              <span className="select-custom long">
                <i className="fa fa-caret-down" />
                <select onChange={this.flexiRefId} disabled={!this.state.isFlexi} defaultValue={selectedFlexiCond} className={(this.state.flexiIdError) && 'error'}>
                  <option value="false">None</option>
                  {refs}
                </select>
                {(this.state.flexiIdError) && <span className="error-msg">* Please fill out this field.</span>}
              </span>
            </p>
            <br />
            <p className={this.state.isFlexi ? 'inactive half' : 'half'}>
              <label htmlFor="gracePeriod">Grace Period</label>
              <input id="gracePeriod" type="number" defaultValue={details.GracePeriod} placeholder="00" onChange={this.gracePeriod} disabled={this.state.isFlexi} />
            </p>
            <p className="half">
              <label htmlFor="totalBreak">Total Break (minutes)</label>
              <input id="totalBreak" type="number" defaultValue={details.TotalBreak} placeholder="00" onChange={this.totalBreakHours} />
            </p>
          </div>
        </Fields>
        <ShiftSchedules>
          <Fields className="scheds">
            <label htmlFor="shiftschedules">
              Shift Schedules
              <span className="time-in">Time In</span>
              <span className="time-out">Time Out</span>
            </label>
          </Fields>
          <Days dayName="SUNDAY" getTimes={this.sunGetTime} timeFrom={sunTimeFrom} timeTo={sunTimeTo} />
          <Days dayName="MONDAY" getTimes={this.monGetTime} timeFrom={monTimeFrom} timeTo={monTimeTo} />
          <Days dayName="TUESDAY" getTimes={this.tueGetTime} timeFrom={tueTimeFrom} timeTo={tueTimeTo} />
          <Days dayName="WEDNESDAY" getTimes={this.wedGetTime} timeFrom={wedTimeFrom} timeTo={wedTimeTo} />
          <Days dayName="THURSDAY" getTimes={this.thuGetTime} timeFrom={thuTimeFrom} timeTo={thuTimeTo} />
          <Days dayName="FRIDAY" getTimes={this.friGetTime} timeFrom={friTimeFrom} timeTo={friTimeTo} />
          <Days dayName="SATURDAY" getTimes={this.satGetTime} timeFrom={satTimeFrom} timeTo={satTimeTo} />
          {/* <Fields className="scheds">
            <p>
              <Status className={((sunTimeFrom != '00:00' || sunTimeTo != '00:00') && sunTimeFrom !== sunTimeTo) ? "Active status" : "status"} />
              <span className="week-name">SUNDAY:</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eSunTimeFrom) ? this.eSunTimeFrom[0] : '00'} className="sunhourfrom" onChange={this.sunTimeFromChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eSunTimeFrom) ? this.eSunTimeFrom[1] : '00'} className="sunminfrom" onChange={this.sunTimeFromChange}>
                  {minutes}
                </select>
              </span>
              <span className="separator">-</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eSunTimeTo) ? this.eSunTimeTo[0] : '00'} className="sunhourto" onChange={this.sunTimeToChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eSunTimeTo) ? this.eSunTimeTo[1] : '00'} className="sunminto" onChange={this.sunTimeToChange}>
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
                <select defaultValue={(this.eMonTimeFrom) ? this.eMonTimeFrom[0] : '00'} className="monhourfrom" onChange={this.monTimeFromChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eMonTimeFrom) ? this.eMonTimeFrom[1] : '00'}className="monminfrom" onChange={this.monTimeFromChange}>
                  {minutes}
                </select>
              </span>
              <span className="separator">-</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eMonTimeTo) ? this.eMonTimeTo[0] : '00'} className="monhourto" onChange={this.monTimeToChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eMonTimeTo) ? this.eMonTimeTo[1] : '00'}className="monminto" onChange={this.monTimeToChange}>
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
                <select defaultValue={(this.eTueTimeFrom) ? this.eTueTimeFrom[0] : '00'} className="tuehourfrom" onChange={this.tueTimeFromChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eTueTimeFrom) ? this.eTueTimeFrom[1] : '00'} className="tueminfrom" onChange={this.tueTimeFromChange}>
                  {minutes}
                </select>
              </span>
              <span className="separator">-</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eTueTimeTo) ? this.eTueTimeTo[0] : '00'} className="tuehourto" onChange={this.tueTimeToChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eTueTimeTo) ? this.eTueTimeTo[1] : '00'} className="tueminto" onChange={this.tueTimeToChange}>
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
                <select defaultValue={(this.eWedTimeFrom) ? this.eWedTimeFrom[0] : '00'} className="wedhourfrom" onChange={this.wedTimeFromChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eWedTimeFrom) ? this.eWedTimeFrom[1] : '00'} className="wedminfrom" onChange={this.wedTimeFromChange}>
                  {minutes}
                </select>
              </span>
              <span className="separator">-</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eWedTimeTo) ? this.eWedTimeTo[0] : '00'} className="wedhourto" onChange={this.wedTimeToChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eWedTimeTo) ? this.eWedTimeTo[1] : '00'} className="wedminto" onChange={this.wedTimeToChange}>
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
                <select defaultValue={(this.eThuTimeFrom) ? this.eThuTimeFrom[0] : '00'} className="thuhourfrom" onChange={this.thuTimeFromChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eThuTimeFrom) ? this.eThuTimeFrom[1] : '00'} className="thuminfrom" onChange={this.thuTimeFromChange}>
                  {minutes}
                </select>
              </span>
              <span className="separator">-</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eThuTimeTo) ? this.eThuTimeTo[0] : '00'} className="thuhourto" onChange={this.thuTimeToChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eThuTimeTo) ? this.eThuTimeTo[1] : '00'} className="thuminto" onChange={this.thuTimeToChange}>
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
                <select defaultValue={(this.eFriTimeFrom) ? this.eFriTimeFrom[0] : '00'} className="frihourfrom" onChange={this.friTimeFromChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eFriTimeFrom) ? this.eFriTimeFrom[1] : '00'} className="friminfrom" onChange={this.friTimeFromChange}>
                  {minutes}
                </select>
              </span>
              <span className="separator">-</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eFriTimeTo) ? this.eFriTimeTo[0] : '00'} className="frihourto" onChange={this.friTimeToChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eFriTimeTo) ? this.eFriTimeTo[1] : '00'} className="friminto" onChange={this.friTimeToChange}>
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
                <select defaultValue={(this.eSatTimeFrom) ? this.eSatTimeFrom[0] : '00'} className="sathourfrom" onChange={this.satTimeFromChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eSatTimeFrom) ? this.eSatTimeFrom[1] : '00'} className="satminfrom" onChange={this.satTimeFromChange}>
                  {minutes}
                </select>
              </span>
              <span className="separator">-</span>
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eSatTimeTo) ? this.eSatTimeTo[0] : '00'}className="sathourto" onChange={this.satTimeToChange}>
                  {hours}
                </select>
              </span> : &nbsp;
              <span className="select-custom">
                <i className="fa fa-caret-down" />
                <select defaultValue={(this.eSatTimeTo) ? this.eSatTimeTo[1] : '00'} className="satminto" onChange={this.satTimeToChange}>
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

EditShiftTemplateForm.propTypes = {
  loading: PropTypes.bool,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  details: PropTypes.object,
  flexiRefs: PropTypes.array,
};

export default EditShiftTemplateForm;
