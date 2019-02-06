/**
 * This Section Component, is built for the retrieval of Employee List for Payroll Processing
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Loading from 'components/LoadingIndicator/Loading';

class PRPayDatesSection extends React.PureComponent {
  // select date function
  selectDay = (e, date) => {
    // get all our li element
    const dateEl = e.target.parentNode.children;
    // get the clicked element
    const targetEl = e.currentTarget;

    // Iterate through all the element and toggle the class
    for (let i = 0; i < dateEl.length; i += 1) {
      if (targetEl !== dateEl[i]) {
        dateEl[i].classList.remove('active');
      } else {
        dateEl[i].classList.add('active');
      }
    }
    this.props.selectDate(date);
  }

  render() {
    const { prdatesloading, prdateserror, prDatesList } = this.props;

    let items = (<ul><li><p className="message">No Record(s) Found.</p></li></ul>);

    if (prdatesloading) {
      return <ul><li><Loading /></li></ul>;
    }

    if (prdateserror) {
      if (prdateserror.ErrorCode === 204) {
        return <ul><li><p className="message">No Record(s) Found.</p></li></ul>;
      }
      return <ul><li><p className="message">Something went wrong, please try again</p></li></ul>;
    }

    if (prDatesList) {
      // If we have data, iteration it is
      items = prDatesList.map((item) => (
        <li role="presentation" onClick={(e) => { this.selectDay(e, item.DateProcessed); }} key={item.DateProcessed}>
          {moment(new Date(item.DateProcessed)).format('dddd, MMM D, YYYY')}
        </li>
      ));

      return (
        <ul>
          {items}
        </ul>
      );
    }

    return null;
  }
}

PRPayDatesSection.propTypes = {
  prdatesloading: PropTypes.bool,
  prdateserror: PropTypes.any,
  prDatesList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array,
  ]),
  selectDate: PropTypes.func,
};

export default PRPayDatesSection;
// function mapDispatchToProps(dispatch) {
//   return {
//     sendSelectedDate: (date) => {
//       // console.log("Selected Date: " + date);
//       dispatch(setPRDateSelected(date));
//     }
//   }
// }

// const withConnect = connect(null, null);

// export default compose(
//   withConnect,
// )(PRPayDatesSection);
