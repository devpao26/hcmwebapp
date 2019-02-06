/**
 * Shift Summary List
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactPaginate from 'react-paginate';

import Status from 'components/User/Status';
import Loading from 'components/LoadingIndicator/Loading';
import ShiftSummary from './ShiftSummary';

class ShiftSummaryList extends React.PureComponent {
  render() {
    const { loading, error, shiftRec } = this.props;

    let shiftSummary;

    if (loading) {
      return (
        <ShiftSummary><Loading /></ShiftSummary>
      )
    }

    if (error !== false) {
      return <ShiftSummary><li className="no-data">No Record(s) Found.</li></ShiftSummary>
    }

    if (shiftRec !== false) {
      if (shiftRec) {
        shiftSummary = shiftRec.map((item, index) => 
          <li key={item.ShiftRecordID}>
            <div>
              <Status className="status Active" />
              <p>
                {(item.TemplateWorkStatusDetails != null) ? item.TemplateWorkStatusDetails.WorkStatus.Name : item.SystemStatusType.Name}
                {/* <span>{item.CreatedDate}</span> */}
              </p>
            </div>
            <div>
              <p>{item.Date} {item.Time}</p>
            </div>
          </li>
        )
      }

      return (
        <ShiftSummary className={this.props.display}>
          {shiftSummary}
        </ShiftSummary>
      );
    }

    return null;
  }
}

ShiftSummaryList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  shiftRec: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array
  ]),
};

export default ShiftSummaryList;
