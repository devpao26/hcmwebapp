/**
 * Work Status Template Details
 */
import React from 'react';
import PropTypes from 'prop-types';

import Status from 'components/User/Status';

function WorkStatDisplay(props) {
  const { data } = props;
  let types;
  if (data.WorkStatusTemplateDetailsList) {
    const list = data.WorkStatusTemplateDetailsList;
    types = list.map((type) => (
      <dl key={type.WorkStatusID}>
        <dt>
          <Status className="status Active" />
          <span>{type.WorkStatus.Name}</span>
        </dt>
        <dd>{type.SystemStatusType.Name}</dd>
      </dl>
    ));
  }

  return (
    <div className="template-detail">
      <div className="fields">
        <span className="label">Name</span>
        <span className="value">{data.Name}</span>
      </div>
      <div className="fields">
        <span className="label">Description</span>
        <span className="value border">{data.Descr}</span>
      </div>
      {(data.WorkStatusTemplateDetailsList) &&
        <div className="fields">
          <div className="workstats">
            <p className="label">
              <span className="half">Work Name</span>
              <span className="half">Type</span>
            </p>
            {types}
          </div>
        </div>
      }
    </div>
  );
}

WorkStatDisplay.propTypes = {
  data: PropTypes.object,
};

export default WorkStatDisplay;
