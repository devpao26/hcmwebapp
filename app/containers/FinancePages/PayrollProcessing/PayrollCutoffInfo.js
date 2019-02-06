/**
 * This Section Component, is built for the retrieval of Payroll Cutoff for Payroll Processing
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Loading from 'components/LoadingIndicator/Loading';

/* Local Components */
import Cutoff from './Cutoff';
import H3 from '../H3';

class PRPayCutoffInfoSection extends React.PureComponent {
  render() {
    const { prcutoffloading, prcutoffserror, prCutOffInfo, prPayDay } = this.props;
    let items = (
      <Cutoff>
        <H3>Cutoff Template Info</H3>
        <p className="message">Please select date and employee.</p>
      </Cutoff>
    );

    if (prcutoffloading) {
      return (
        <Cutoff>
          <H3>Cutoff Template Info</H3>
          <Loading />
        </Cutoff>
      );
    }

    if (prcutoffserror) {
      return (
        <Cutoff>
          <H3>Cutoff Template Info</H3>
          <p className="message">No Record(s) Found.</p>
        </Cutoff>
      );
    }

    if (prCutOffInfo) {
      // If we have data, iteration it is
      items = prCutOffInfo.map((item) => (
        <div key={item.PayrollReviewID}>
          <dl>
            <dt>DTR Range</dt>
          </dl>
          <dl>
            <dt>From</dt>
            <dd>{moment(item.PayrollDTR.DTRFrom).format('dddd, MMM DD, YYYY')}</dd>
          </dl>
          <dl>
            <dt>To</dt>
            <dd>{moment(item.PayrollDTR.DTRTo).format('dddd, MMM DD, YYYY')}</dd>
          </dl>
          <dl>
            <dt>Payday</dt>
            <dd>{moment(prPayDay).format('dddd, MMM DD, YYYY')}</dd>
          </dl>
          <dl>
            <dt>Payroll Day</dt>
            <dd>2 Days Prior Payday</dd>
          </dl>
        </div>
      ));

      return (
        <Cutoff>
          <H3>Cutoff Template Info</H3>
          {items}
        </Cutoff>
      );
    }

    return items;
  }
}

PRPayCutoffInfoSection.propTypes = {
  prcutoffloading: PropTypes.bool,
  prcutoffserror: PropTypes.any,
  prCutOffInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array,
  ]),
  prPayDay: PropTypes.string,
};

export default PRPayCutoffInfoSection;
