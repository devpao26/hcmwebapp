import React from 'react';
import PropTypes from 'prop-types';

import Loading from 'components/LoadingIndicator/Loading';
import Status from 'components/User/Status';

/* Local Components
*/
import Table from '../Table';
import ShiftSummary from './ShiftSummary';

class ShiftSummaryList extends React.PureComponent {
 
  constructor(props) {
    super(props);
  }  

  render() {
    const { loading, error, shiftRecs } = this.props;
    let items = (<ShiftSummary><li className="no-data">No Record(s) Found</li></ShiftSummary>);
    if (loading) {
      return (
        <ShiftSummary><Loading /></ShiftSummary>
      )
    }

    if (error !== false) {
      return <ShiftSummary><li className="no-data">No Record(s) Found</li></ShiftSummary>
    }

    if (shiftRecs !== false) {
      // console.log(shiftRecs);
      // If we have data, iteration it is
      if (shiftRecs != null && shiftRecs.ErrorCode === 204) {
        items = ( 
          <ShiftSummary><li className="no-data">No Record(s) Found</li></ShiftSummary>
        );
      } else if (shiftRecs) {
        items = shiftRecs.map((item, index) =>
        // <div className="templateName" style={{background: this.changeActiveColor(0)}} onClick={() => {this.showActiveSelection(0)}}> 
        // <button><i className="fa fa-circle" aria-hidden="true"></i></button>
        //     {item.Name}
        // </div>
          <li key={item.ShiftRecordID}>
            <div>
              <Status className="status Active" />
              <p>
                {(item.TemplateWorkStatusDetails != null) ? item.TemplateWorkStatusDetails.WorkStatus.Name : item.SystemStatusType.Name}
                {/* <small>{item.SystemStatusType.Name}</small> */}
              </p>
            </div>
            <div>
              <p>{item.Date} {item.Time}</p>
            </div>
          </li>
        );
      }

      return (
        <ShiftSummary>
          {items}
        </ShiftSummary>
      );
    }

    return (
      <ShiftSummary>
        <li className="no-data">Please select date and employee first.</li>
      </ShiftSummary>
    );
  }
}

ShiftSummaryList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  shiftRecs: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array
  ]),
};

export default ShiftSummaryList;
