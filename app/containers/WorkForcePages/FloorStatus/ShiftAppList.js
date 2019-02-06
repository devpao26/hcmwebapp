/**
 * Shift Summary List
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactPaginate from 'react-paginate';

import Pagination from 'components/Pagination';
import Status from 'components/User/Status';
import Loading from 'components/LoadingIndicator/Loading';
import ShiftSummary from './ShiftSummary';

class ShiftAppList extends React.PureComponent {
  render() {
    const { loading, error, activeApp } = this.props;

    let shiftApps;

    if (loading) {
      return (
        <ShiftSummary><Loading /></ShiftSummary>
      )
    }

    if (error !== false) {
      return <ShiftSummary><li className="no-data">No Data Found</li></ShiftSummary>
    }

    if (activeApp !== false) {
      if (activeApp) {
        shiftApps = activeApp.map((item) => (
          <li key={item.AppUrlMonitoringID}>
            <div className="appurl-list">
              <Status className="status Active" />
              <p>
                {item.Title}
                <small>{item.ScreenDateTime}</small>
              </p>
            </div>
          </li>
        ));
      }

      return (
        <ShiftSummary>
          {shiftApps}
        </ShiftSummary>
      );
    }

    return null;
  }
}

ShiftAppList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  activeApp: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array
  ]),
};

export default ShiftAppList;
