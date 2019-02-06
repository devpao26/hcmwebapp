/**
 * This Section Component, is built for the retrieval of Payroll Review Info for Payroll Processing
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Loading from 'components/LoadingIndicator/Loading';
import Dots from 'components/LoadingIndicator/Dots';
import Status from 'components/User/Status';
import Button from 'components/Button';

/* Local Components */
import Table from '../Table';
import DisputeNote from './DisputeNote';
import H3 from '../H3';

import { makeSelectPaySlipState } from './selectors';

class PRPayrollReviewInfoSection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEmail: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.prPaySlipState) {
      const success = nextProps.prPaySlipState.get('success');
      if (success && !this.state.isEmail) {
        location.assign(success[0]);

        const resetState = () => this.props.reset();
        setTimeout(() => {
          resetState();
        }, 1000);
      }
    }
  }

  generatePaySlipReport = (isEmail, empID, date) => {
    this.setState({
      isEmail,
    });

    this.props.generate(isEmail, empID, date);
  }

  render() {
    const { prpayreviewloading, prpayreviewerror, prPayReviewInfo, prPayReviewSelEmpProf, prPayDay, prPaySlipState } = this.props;

    let paySlipLoading;
    let paySlipError;
    let paySlipSuccess;
    if (prPaySlipState) {
      paySlipLoading = prPaySlipState.get('loading');
      paySlipError = prPaySlipState.get('error');
      paySlipSuccess = prPaySlipState.get('success');
    }

    const successMsg = (this.state.isEmail) ? 'Payslip Report was successfully sent to the employee.' : 'Payslip Report was successfully downloaded.';

    let items = (<div><p className="message">Please Select Date and Employee.</p></div>);
    if (prpayreviewloading) {
      return <div><Loading /></div>;
    }

    if (prpayreviewerror) { // If Error, Return no display
      if (prpayreviewerror.ErrorCode === 204) {
        return <div><p className="message">No Record(s) Found.</p></div>;
      }

      return <div><p className="message">Please Select Date and Employee.</p></div>;
    }

    if (prPayReviewInfo) {
      // If we have data, iteration it is
      items = prPayReviewInfo.map((item) => (
        <div key={item.PayrollReviewID}>
          <Table>
            <tbody>
              <tr>
                <td><Status className="Active status" /></td>
                <td>Daily Rate</td>
                <td>{item.IsDailyRate ? 'YES' : 'NO'} </td>
              </tr>
              <tr>
                <td><Status className="Active status" /></td>
                <td>Total Absences</td>
                <td>{item.PayrollDTR.AbsencesCount} </td>
              </tr>
              <tr>
                <td><Status className="Active status" /></td>
                <td>Total Actual in Minutes</td>
                <td>{item.PayrollDTR.TotalActual} </td>
              </tr>
              <tr>
                <td><Status className="Active status" /></td>
                <td>Total Billable in Minutes</td>
                <td>{item.PayrollDTR.TotalBillable} </td>
              </tr>
              <tr>
                <td><Status className="Active status" /></td>
                <td>Total Break in Minutes</td>
                <td>{item.PayrollDTR.TotalBreak} </td>
              </tr>

              <tr>
                <td><Status className="Active status" /></td>
                <td>Basic Pay</td>
                <td>Php {item.Basic}</td>
              </tr>
              <tr>
                <td><Status className="Active status" /></td>
                <td>Gross Pay</td>
                <td>Php {item.Gross}</td>
              </tr>
              <tr>
                <td><Status className="Active status" /></td>
                <td>MANDATED DEDUCTIONS</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>Tax Deductions</td>
                <td>Php {item.Tax}</td>
              </tr>
              <tr>
                <td></td>
                <td>SSS Share</td>
                <td>Php {item.SSS.TCEE}</td>
              </tr>
              <tr>
                <td></td>
                <td>Philhealth Contributions</td>
                <td>Php {item.PhilhealthShare}</td>
              </tr>
              <tr>
                <td></td>
                <td>Pagibig Contributions</td>
                <td>Php {item.Pagibig.Amount}</td>
              </tr>
              <tr>
                <td><Status className="Active status" /></td>
                <td>OTHER DEDUCTIONS</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>Total Mandated Deductions</td>
                <td>Php {item.MandatedDeducts}</td>
              </tr>
              <tr>
                <td></td>
                <td>Total On-Spot Deductions</td>
                <td>Php {item.OnSpotDeductsTotal}</td>
              </tr>
              <tr>
                <td></td>
                <td>Total Timed Deductions</td>
                <td>Php {item.TimedDeductsTotal}</td>
              </tr>
              <tr>
                <td><Status className="Active status" /></td>
                <td>ADDITIONAL EARNING</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>On-Spot</td>
                <td>Php {item.OnSpotEarnsTotal}</td>
              </tr>
              <tr>
                <td></td>
                <td>Total Night Differential Pay</td>
                <td>Php {item.TotalNightDiffPay}</td>
              </tr>
              <tr>
                <td></td>
                <td>Timed</td>
                <td>Php {item.TimedEarnsTotal}</td>
              </tr>
              <tr>
                <td><Status className="Active status" /></td>
                <td>ALLOWANCE</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>Total Taxable Allowance</td>
                <td>Php {item.TotalTaxableAllowance}</td>
              </tr>
              <tr>
                <td></td>
                <td>Total Non Taxable Allowance</td>
                <td>Php {item.TotalNonTaxableAllowance}</td>
              </tr>
              <tr>
                <td><Status className="Active status" /></td>
                <td>Net Pay</td>
                <td>Php {item.NetPay}</td>
              </tr>
            </tbody>
          </Table>
          <DisputeNote>
            <p><span className="text-red">DISPUTE:</span> No Dispute Information</p>
          </DisputeNote>
          {
            (paySlipLoading)
            ? <div className="payslip-action-button"><p>Generating payslip<Dots /></p></div>
            : <div className="payslip-action-button">
              <p>Generate Employee Payslip Report</p>
              <Button handleRoute={() => { this.generatePaySlipReport(false, item.EmpProfileID, moment(new Date(prPayDay)).format('YYYY-MM-DD')); }} color="red">DOWNLOAD</Button>&nbsp;&nbsp;or&nbsp;&nbsp;
              <Button handleRoute={() => { this.generatePaySlipReport(true, item.EmpProfileID, moment(new Date(prPayDay)).format('YYYY-MM-DD')); }} color="red">EMAIL</Button>
            </div>
          }

          {(paySlipSuccess) && <div className="payslip-action-button"><p>{successMsg}</p></div>}

          { (paySlipError) &&
            <div className="payslip-action-button">
              <p>There was a problem generating payslip report. Please try again.</p>
            </div>
          }
        </div>
      ));

      return (
        <div>
          <H3 padding>{prPayReviewSelEmpProf.LastName}, {prPayReviewSelEmpProf.FirstName} {prPayReviewSelEmpProf.MiddleName}</H3>
          {items}
        </div>
      );
    }

    return items;
  }
}

PRPayrollReviewInfoSection.propTypes = {
  prpayreviewloading: PropTypes.bool,
  prpayreviewerror: PropTypes.any,
  prPayReviewInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array,
  ]),
  prPayReviewSelEmpProf: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array,
  ]),
  prPayDay: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  prPaySlipState: PropTypes.object,
  generate: PropTypes.func,
  reset: PropTypes.func,
};

// export default PRPayrollReviewInfoSection;
const mapStateToProps = createStructuredSelector({
  prPaySlipState: makeSelectPaySlipState(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(PRPayrollReviewInfoSection);
