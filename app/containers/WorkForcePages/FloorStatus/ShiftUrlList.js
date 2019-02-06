/**
 * Shift Summary List
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Status from 'components/User/Status';
import Loading from 'components/LoadingIndicator/Loading';
import ShiftSummary from './ShiftSummary';

class ShiftAppList extends React.PureComponent {
  render() {
    const { loading, error, browserUrl } = this.props;

    let shiftApps;

    if (loading) {
      return (
        <ShiftSummary><Loading /></ShiftSummary>
      )
    }

    if (error !== false) {
      return <ShiftSummary><li className="no-data">No Data Found</li></ShiftSummary>
    }

    if (browserUrl !== false) {
      if (browserUrl) {
        shiftApps = browserUrl.map((item, index) => 
          <li key={item.AppUrlMonitoringID}>
            <div className="appurl-list">
              <Status className="status Active" />
              <p>
                {item.Title}
                <small>{item.ScreenDateTime}</small>
              </p>
            </div>
          </li>
        )
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
  browserUrl: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array
  ]),
};

export default ShiftAppList;
