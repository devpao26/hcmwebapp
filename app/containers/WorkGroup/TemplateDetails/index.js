/**
 * Viewing Template details
 * @prop {string} name    The kind of template we are viewing (values: Calendar, Payroll, Shift, WorkStat, DeskConfig)
 * @prop {object} data    The data of the template
 */
import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';
import Calendar from './Calendar';
import Shift from './Shift';
import WorkStatus from './WorkStatus';
import Payroll from './Payroll';
import DeskConfig from './DeskConfig';

export class ViewTemplateDetails extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { name, data } = this.props;

    return (
      <Wrapper>
        {(name === 'Calendar') && <Calendar data={data} />}
        {(name === 'Shift') && <Shift data={data} />}
        {(name === 'WorkStat') && <WorkStatus data={data} />}
        {(name === 'Payroll') && <Payroll data={data} />}
        {(name === 'DeskConfig') && <DeskConfig data={data} />}
      </Wrapper>
    );
  }
}

ViewTemplateDetails.propTypes = {
  name: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
};

export default ViewTemplateDetails;
