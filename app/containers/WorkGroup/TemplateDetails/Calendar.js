/**
 * Calendar Details
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Status from 'components/User/Status';

function CalendarDisplay(props) {
  const { data } = props;
  let holidays;
  if (data.HolidayList) {
    holidays = data.HolidayList.map((hol) => (
      <dl key={hol.HolidayID}>
        <dt>
          <Status className="status Active" />
          <span>{moment(new Date(hol.HolidayDate)).format('MMMM DD')}</span>
        </dt>
        <dd>{hol.Name}</dd>
      </dl>
    ));
  } else {
    holidays = <p className="message">No Holidays.</p>;
  }
  return (
    <div className="template-detail">
      <div className="fields">
        <span className="label">Name</span>
        <span className="value">{data.Name}</span>
      </div>
      <div className="fields">
        <span className="label">Time Zone</span>
        <span className="value">{(data.TimeZone) ? data.TimeZone.Value : 'No timezone assigned to the template.'}</span>
      </div>
      <div className="fields">
        <span className="label">Holidays</span>
        <div>
          {holidays}
        </div>
        {/*
        <dl>
          <dt>
            <Status className="status Active" />
            <span>January 01</span>
          </dt>
          <dd>
            New Years Day
          </dd>
        </dl>
        {(data.HolidayList) && (
          <dl>
            <dt>
              <Status className="status Active" />
            </dt>
          </dl>
        )} */}
      </div>
    </div>
  );
}

CalendarDisplay.propTypes = {
  data: PropTypes.object,
};

export default CalendarDisplay;
