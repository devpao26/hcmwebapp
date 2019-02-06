/**
 * ProgressBar
 * Props: onCLick (optional), dataProgress
 * Usage: <ProgressBar dataProgress="50%" onClick={function} />
 */
import React from 'react';
import { PropTypes } from 'prop-types';

import Progress from './Progress';

class ProgressBar extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    const { onClick, dataProgress, applJobId } = this.props;

    return (
      <div role="presentation" className="progress-bar" onClick={onClick} data-appl-jobid={applJobId}>
        <Progress data-appl-jobid={applJobId}>
          <label data-appl-jobid={applJobId} data-progress={dataProgress} style={{ width:dataProgress+'%' }} />
        </Progress>
        <span data-appl-jobid={applJobId}>{dataProgress}%</span>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  onClick: PropTypes.func,
  dataProgress: PropTypes.any.isRequired,
  applJobId: PropTypes.string,
};

export default ProgressBar;