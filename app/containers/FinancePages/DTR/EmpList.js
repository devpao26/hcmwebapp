/**
 * This Section Component, is built for the retrieval of Employee List for DTR Listing
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Loading from 'components/LoadingIndicator/Loading';
import OptionMenu from 'components/OptionMenu';

import { DEFAULT_GUID } from 'containers/App/constants';

/* selectors, reducer, saga and actions */
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
} from './selectors';

import {
} from './actions';

class DTREmpListSection extends React.PureComponent {
  // select date function
  selectEmpProfile = (e, empID, empName, shiftID) => {
    // get all our li element
    const dateEl = e.currentTarget.parentNode.children;
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

    this.props.getEmp(empID, empName, shiftID);
  }

  render() {
    const { loading, error, empList } = this.props;
    let items = (<ul className="emp-list"><li><p className="message">No DTR Record(s) Found.</p></li></ul>);

    if (loading) {
      return <ul className="emp-list"><li><Loading /></li></ul>;
    }

    if (error) {
      if (error.ErrorCode === 204) {
        return <ul className="emp-list"><li><p className="message">No Record(s) Found.</p></li></ul>;
      }
      return <ul className="emp-list"><li><p className="message">Something went wrong, please try again</p></li></ul>;
    }

    if (empList) {
      // If we have data, iteration it is
      items = empList.map((item) => {
        const shiftID = (item.ShiftTemplate !== null) ? item.ShiftTemplate.ShiftTemplateID : DEFAULT_GUID;
        return (
          <li role="presentation" onClick={((e) => this.selectEmpProfile(e, item.EmpProfileID, `${item.LastName}, ${item.FirstName}`, shiftID))} key={item.EmpProfileID}>
            <span className="emp-name">{item.LastName}, {item.FirstName}</span>
            <OptionMenu title="Options" position="left" icon="ellipsis">
              <button onClick={this.showDtr}>View DTR Details</button>
              <button onClick={this.showShiftSummary}>View Shift Summary</button>
              <button onClick={this.showOtHours}>OT Hours</button>
              {/* <button onClick={this.showDtrOverrideForm}>MANUAL DTR OVERRIDE</button> */}
              <button onClick={this.showExtractDtrReport}>EXTRACT DTR REPORT</button>
            </OptionMenu>
          </li>
        );
      });

      return (
        <ul className="emp-list">
          {items}
          {/* <li>
            <span>Specter, Harvey</span>
            <OptionMenu title="Options" position="left" icon="ellipsis">
              <button onClick={this.showDtr}>View DTR Details</button>
              <button onClick={this.showShiftSummary}>View Shift Summary</button>
              <button onClick={this.showOtHours}>OT Hours</button>
              <button onClick={this.showDtrOverrideForm}>MANUAL DTR OVERRIDE</button>
              <button onClick={this.showExtractDtrReport} data-date="Thursday, June 1, 2017">EXTRACT DTR REPORT</button>
            </OptionMenu>
          </li> */}
        </ul>
      );
    }

    return null;
  }
}

DTREmpListSection.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  empList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  getEmp: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('empList'),
  error: makeSelectError('empList'),
  empList: makeSelectData('empList'),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(DTREmpListSection);
