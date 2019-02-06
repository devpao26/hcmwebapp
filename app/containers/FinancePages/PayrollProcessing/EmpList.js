/**
 * This Section Component, is built for the retrieval of Employee List for Payroll Processing
 */
import React from 'react';
import PropTypes from 'prop-types';
import Loading from 'components/LoadingIndicator/Loading';

/* Local Components
*/
import OptionMenu from 'components/OptionMenu';

class PREmpListSection extends React.PureComponent {
  // select date function
  selectEmpProfile = (e, empprofile) => {
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

    this.props.sendSelectedEmp(empprofile);
    this.props.retrievePayrollReview();
  }

  render() {
    const { emploading, emperror, empList } = this.props;
    let items = (<ul className="emp-list"><li><p className="message">No DTR Record(s) Found.</p></li></ul>);

    if (emploading) {
      return <ul className="emp-list"><li><Loading /></li></ul>;
    }

    if (emperror) {
      if (emperror.ErrorCode === 204) {
        return <ul className="emp-list"><li><p className="message">No Record(s) Found.</p></li></ul>;
      }
      return <ul className="emp-list"><li><p className="message">Something went wrong, please try again</p></li></ul>;
    }

    if (empList !== false) {
      // If we have data, iteration it is
      items = empList.map((item) => (
        <li role="presentation" onClick={(e) => { this.selectEmpProfile(e, item); }} key={item.EmpProfileID}>
          <span className="emp-name">{item.LastName}, {item.FirstName} {item.MiddleName}</span>
          <OptionMenu title="Options" position="left" icon="ellipsis">
            <button onClick={this.showPayrollReview}>View Payroll Review</button>
            <button onClick={this.showDeductions}>Deductions</button>
            <button onClick={this.showEarning}>Earnings</button>
            <button>Send Payslip</button>
          </OptionMenu>
        </li>
      ));

      return (
        <ul className="emp-list">
          {items}
        </ul>
      );
    }

    return null;
  }
}

PREmpListSection.propTypes = {
  emploading: PropTypes.bool,
  emperror: PropTypes.any,
  empList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  sendSelectedEmp: PropTypes.func,
  retrievePayrollReview: PropTypes.func,
};

export default PREmpListSection;

// function mapDispatchToProps(dispatch) {
//   return {
//     sendSelectedEmp: (empprofile) => {
//       // console.log("Selected Date: " + empprofile);
//       dispatch(setPREmpProfileSelected(empprofile));
//     },
//     retrievePayrollReview: () => {
//       // Process Payroll Review Retrieval
//       dispatch(retrievePayReviewInfo());
//     }
//   }
// }

// const withConnect = connect(null, mapDispatchToProps);
// const withReducer = injectReducer({ key: 'pradmin', reducer });
// const withSaga = injectSaga({ key: 'pradmin', saga });
// export default compose(
//   withReducer,
//   withSaga,
//   withConnect,
// )(PREmpListSection);
