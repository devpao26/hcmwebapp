/**
 * Shift Schedule Template Details
 */
import React from 'react';
import PropTypes from 'prop-types';

import Status from 'components/User/Status';

function ShiftDisplay(props) {
  const { data } = props;
  let days;
  if (data.ShiftSchedulesList) {
    const shifts = data.ShiftSchedulesList;
    days = shifts.map((day) => {
      const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
      const timeIn = (day.TimeIn !== '') && day.TimeIn.split(':');
      const timeOut = (day.TimeOut !== '') && day.TimeOut.split(':');

      return (
        <dl key={day.ShiftScheduleID}>
          <dt>
            <Status className="status Active" />
            <span>{dayName[day.Day - 1]}</span>
          </dt>
          <dd>
            <span>{`${timeIn[0]}:${timeIn[1]}`}</span>
            <span>{`${timeOut[0]}:${timeOut[1]}`}</span>
          </dd>
        </dl>
      );
    });
  }
  return (
    <div className="template-detail">
      <div className="fields">
        <span className="label">Name</span>
        <span className="value">{data.Name}</span>
      </div>
      <div className="fields">
        <span className="label">Description</span>
        <span className="value border">{data.Descr}</span>
      </div>
      { (data.IsFlexi) &&
        <div className="fields">
          <span className="label">Flexi</span>
          <p className="half">
            <span className="label">Start</span>
            <span className="value">{data.FlexiInStart}</span>
          </p>
          <p className="half">
            <span className="label">End</span>
            <span className="value">{data.FlexiInEnd}</span>
          </p>
        </div>
      }
      { (data.IsFlexi) &&
        <div className="fields">
          <span className="label">Flexi Condition</span>
          <span className="value">{data.FlexiCondition.Name}</span>
        </div>
      }
      <div className="fields">
        <p className="half">
          <span className="label">Grace Period</span>
          <span className="value">{data.GracePeriod} min(s)</span>
        </p>
        <p className="half">
          <span className="label">Total Break</span>
          <span className="value">{data.TotalBreak} min(s)</span>
        </p>
      </div>
      {(data.ShiftSchedulesList) &&
        <div className="fields">
          <span className="label">Shift Schedules</span>
          <div className="shifts">
            <dl>
              <dt>&nbsp;</dt>
              <dd>
                <span>Time In</span>
                <span>Time Out</span>
              </dd>
            </dl>
            {days}
          </div>
        </div>
      }
    </div>
  );
}

ShiftDisplay.propTypes = {
  data: PropTypes.object,
};

export default ShiftDisplay;
