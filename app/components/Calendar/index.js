/*
 * Calendar JS
 *
 * https://codepen.io/nickjvm/pen/bERraX
 * Based on: Chris Harrington Building a Calendar on React JS, LESS CSS and FontAwesome
 *           https://www.codementor.io/reactjs/tutorial/building-a-calendar-using-react-js--less-css-and-font-awesome
 */
import React from 'react';
import PropTypes from 'prop-types';

/* Styles */
import Wrapper from './Wrapper';
import CalHeader from './CalHeader';
import CalWeeksRow from './CalWeeksRow';
import CalDays from './CalDays';
import WeekName from './WeekName';
import Days from './Days';
import HasEvent from './HasEvent';

/* Render the Name of Days */
class DayNames extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <CalWeeksRow>
        <WeekName>Sun</WeekName>
        <WeekName>Mon</WeekName>
        <WeekName>Tue</WeekName>
        <WeekName>Wed</WeekName>
        <WeekName>Thu</WeekName>
        <WeekName>Fri</WeekName>
        <WeekName>Sat</WeekName>
      </CalWeeksRow>
    );
  }
}

/* Will Render the Date per Week Row */
class Week extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const days = [];
    let {
      date,
    } = this.props;

    const {
      month,
      selected,
      select,
      keys,
    } = this.props;

    for (let i = 0; i < 7; i += 1) {
      const day = {
        name: date.format('dd').substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), 'day'),
        date: date
      };
      days.push(
        <Day day={day}
          selected={selected}
          select={select}
          key={i.toString()}
          keys={date.toString()} />
      );

      date = date.clone();
      date.add(1, 'day');
    }

    return (
      <CalWeeksRow key={days[0]}>
        {days}
      </CalWeeksRow>
    );
  }
}

Week.propTypes = {
  date: PropTypes.object,
  month: PropTypes.object,
  selected: PropTypes.object,
  select: PropTypes.func,
  keys: PropTypes.string,
};

/* Render the Day dates */
class Day extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const hasEvent = <HasEvent />;
    const {
      day,
      day: {
        date,
        isCurrentMonth,
        isToday,
        number
      },
      select,
      selected,
      keys
    } = this.props;

    return (
      <Days 
        key={keys}
        className={'day' + (isToday ? ' today' : '') + (isCurrentMonth ? '' : ' diff-month') + (date.isSame(selected) ? ' selected' : '')}
        onClick={()=>select(day)}>
        <span className='date'>{number}</span>
      </Days>
    );
  }
}

class Calendar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    // Initial display for Calendar (based on passed props)
    let day = this.props.displayDate;

    this.state = {
      month: day.clone(),
      selected: day,
    };
  }

  previous = () => {
    const {
      month,
    } = this.state;

    this.setState({
      month: month.subtract(1, 'month'),
    });
  }

  next = () => {
    const {
      month,
    } = this.state;

    this.setState({
      month: month.add(1,'month'),
    });
  }

  select = (day) => {
    this.setState({
      selected: day.date,
      month: day.date.clone(),
    });

    if (this.props.selectedDate) this.props.selectedDate(day.date);
  }

  renderWeeks() {
    let weeks = [];
    let done = false;
    let date = this.state.month.clone().startOf('month').add('w' -1).day('Sunday');
    let count = 0;
    let monthIndex = date.month();

    const {
      selected,
      month,
    } = this.state;

    const {
      hideCal,
    } = this.props;

    while (!done) {
      weeks.push(
        <Week key={date} 
          date={date.clone()} 
          month={month} 
          select={(day) => {this.select(day); if (hideCal) hideCal();}} 
          selected={selected}
        />
      );

      date.add(1, 'w');

      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  };

  renderMonthLabel() {
    const {
      month,
    } = this.state;

    return month.format('MMMM YYYY');
  }

  render() {
    return (
      <Wrapper className="calendar">
        <CalHeader>
          <button onClick={this.previous}>
            <i className="arrow fa fa-angle-left" />
          </button>
          <div className="monthlabel">
            {this.renderMonthLabel()}
          </div>
          <button onClick={this.next}>
            <i className="arrow fa fa-angle-right" />
          </button>
        </CalHeader>
        <DayNames />
        <CalDays>
          {this.renderWeeks()}
        </CalDays>
      </Wrapper>
    );
  }
}

Calendar.propTypes = {
  displayDate: PropTypes.object.isRequired,
  selectedDate: PropTypes.func,
  hideCal: PropTypes.func,
};

export default Calendar;
