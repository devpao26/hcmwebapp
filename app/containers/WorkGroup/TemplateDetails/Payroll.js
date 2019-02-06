/**
 * Payroll Cutoff Template Details
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function PayrollDisplay(props) {
  const { data } = props;

  return (
    <div className="template-detail">
      <div className="fields">
        <span className="label">Name</span>
        <span className="value">{data.Name}</span>
      </div>
      <div className="fields">
        <span className="label">Cutoff Type</span>
        <span className="value">
          {(data.IsSemiMonthly) && 'Semi Monthly'}
          {(data.IsMonthly) && 'Monthly'}
        </span>
      </div>
      { (data.IsMonthly || data.IsSemiMonthly) &&
        <div className="fields">
          <span className="label">Pay Days</span>
          <span className="value noborder">
            {(data.IsSemiMonthly) && `${data.FirstPayrollDay} and ${data.SecondPayrollDay}`}
            {(data.IsMonthly) && data.FirstPayrollDay}
          </span>
        </div>
      }
      <div className="fields">
        <span className="label">Expiry (optional)</span>
        <span className="value">{moment(new Date(data.ExpiryDate)).format('LL')}</span>
      </div>
      { (data.IsMonthly || data.IsSemiMonthly) &&
        <div className="fields">
          <span className="label">Day Range</span>
          <p className="half">
            <span className="value noborder">
              {(data.IsSemiMonthly) && `${data.FirstCutoffDayFrom} to ${data.FirstCutoffDayTo}`}
            </span>
          </p>
          { (data.IsSemiMonthly) &&
            <p className="half">
              <span className="value noborder">
                {(data.IsSemiMonthly) && `${data.SecondCutoffDayFrom} to ${data.SecondCutoffDayTo}`}
              </span>
            </p>
          }
        </div>
      }
      <div className="fields">
        <span className="label">Payroll Day</span>
        <span className="value">{data.AutoPayrollOffsetDay}</span>
      </div>
    </div>
  );
}

PayrollDisplay.propTypes = {
  data: PropTypes.object,
};

export default PayrollDisplay;
