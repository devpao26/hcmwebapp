import React from 'react';
import PropTypes from 'prop-types';

import Loading from 'components/LoadingIndicator/Loading';
import Status from 'components/User/Status';

import Table from '../Table';

class DTRInfoSection extends React.PureComponent {
  render() {
    const { loading, error, dtrInfo } = this.props;
    let items = (<tbody><tr className="no-data"><td>No Record(s) Found.</td></tr></tbody>);

    if (loading) {
      return (
        <Table className="dtr-details">
          <tbody><tr className="no-data"><td><Loading /></td></tr></tbody>
        </Table>
      );
    }

    if (error) {
      if (error.ErrorCode === 204) {
        return (
          <Table className="dtr-details">
            <tbody><tr className="message"><td>No Record(s) Found.</td></tr></tbody>
          </Table>
        );
      }
      return (
        <Table className="dtr-details">
          <tbody><tr className="message"><td>Something went wrong, please try again</td></tr></tbody>
        </Table>
      );
    }

    if (dtrInfo) {
      items = dtrInfo.map((item) => (
        <tbody key={item.DTRID}>
          <tr>
            <td><Status className="status Active" /></td>
            <td>Total Actual Hours</td>
            <td>{(item.TotalActual / 60).toFixed(2)} hrs</td>
          </tr>
          <tr>
            <td><Status className="status Active" /></td>
            <td>Total Rendered Hours</td>
            <td>{(item.TotalRendered / 60).toFixed(2)} hrs</td>
          </tr>
          <tr>
            <td><Status className="status Active" /></td>
            <td>Absent</td>
            <td><font className="text-green">{item.Absent ? 'YES' : 'NO'}</font></td>
          </tr>
          <tr>
            <td><Status className="status Active" /></td>
            <td>With Dispute</td>
            <td><font className="text-red">{item.Dispute ? 'YES' : 'NO'}</font></td>
          </tr>
          <tr>
            <td><Status className="status Active" /></td>
            <td>Leave</td>
            <td>{item.Leave ? 'YES' : 'NO'}</td>
          </tr>
          <tr>
            <td><Status className="status Active" /></td>
            <td>Paid Leave</td>
            <td>{item.LeavePaid ? 'YES' : 'NO'}</td>
          </tr>
          <tr>
            <td><Status className="status Active" /></td>
            <td>Overbreak</td>
            <td>{item.OverBreak} mins</td>
          </tr>
          <tr>
            <td><Status className="status Active" /></td>
            <td>Half Day</td>
            <td><font className="text-green">{item.HalfDayLeave ? 'YES' : 'NO'}</font></td>
          </tr>
          <tr>
            <td><Status className="status Active" /></td>
            <td>Undertime</td>
            <td>{item.UnderTime ? 'YES' : 'NO'}</td>
          </tr>
          <tr>
            <td><Status className="status Active" /></td>
            <td>Late</td>
            <td>{item.Late} mins</td>
          </tr>
          <tr>
            <td><Status className="status Active" /></td>
            <td>Manual</td>
            <td><font className="text-green">{item.Manual ? 'YES' : 'NO'}</font></td>
          </tr>
          <tr>
            <td><Status className="status Active" /></td>
            <td>Notes</td>
            <td><textarea disabled defaultValue={item.Notes} /></td>
          </tr>
          <tr>
            <td><Status className="status Active" /></td>
            <td>Manualed by</td>
            <td>{(item.Manual) ? item.ManualBy : 'No record.'}</td>
          </tr>
        </tbody>
      ));

      return (
        <Table className="dtr-details">
          {items}
        </Table>
      );
    }

    return (
      <Table className="dtr-details">
        <tbody><tr className="message"><td>Please select date and employee first.</td></tr></tbody>
      </Table>
    );
  }
}

DTRInfoSection.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  dtrInfo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

export default DTRInfoSection;
