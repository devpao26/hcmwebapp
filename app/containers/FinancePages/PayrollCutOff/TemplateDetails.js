/**
 * Payroll Cutoff Template Details
 * @prop {object} details     Object details of the selected template
 * @prop {func}   edit        Function callback for updating template
 * @prop {func}   delete      Function callback for deleting template
 */
import React from 'react';
import PropTypes from 'prop-types';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPencilAlt, faMinus } from '@fortawesome/fontawesome-free-solid';

import Loading from 'components/LoadingIndicator/Loading';

class TemplateDetailsComponent extends React.PureComponent {
  render() {
    const { details } = this.props;
    if (!details) {
      return <div className="template-details"><Loading /></div>;
    }

    return (
      <div className="template-details">
        <h3>
          {details.Name}
          <button onClick={this.props.edit}><FontAwesomeIcon icon={faPencilAlt} /></button>
          <button onClick={this.props.delete}><FontAwesomeIcon icon={faMinus} /></button>
        </h3>
        <p>
          <small>Cut-Off Type:</small>
          <b>{details.IsMonthly ? 'IsMonthly' : 'Semi Monthly'}</b>
        </p>
        <p>
          <small>Pay Days</small>
          <span>First: <b>{details.FirstPayrollDay}</b></span>
          {(details.IsSemiMonthly) && <span>Second: <b>{details.SecondPayrollDay}</b></span>}
        </p>
        {/* <p>
          <small>Expiry</small>
          None
        </p> */}
        <p>
          <small>Day Range</small>
          <span>First Cut-Off: <b>{details.FirstCutoffDayFrom} to {details.FirstCutoffDayTo}</b></span>
          {(details.IsSemiMonthly) && <span>Second Cut-Off: <b>{details.SecondCutoffDayFrom} to {details.SecondCutoffDayTo}</b></span>}
        </p>
        <p>
          <small>Auto Payroll Off Set Day</small>
          <b>{details.AutoPayrollOffsetDay}</b>
        </p>
      </div>
    );
  }
}

TemplateDetailsComponent.propTypes = {
  details: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  edit: PropTypes.func,
  delete: PropTypes.func,
};

export default TemplateDetailsComponent;
