/**
 * Desktop Configuration Template Details
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function DeskConfigDisplay(props) {
  const { data } = props;

  return (
    <div className="template-detail">
      <div className="fields">
        <span className="label">Name</span>
        <span className="value">{data.Name}</span>
      </div>
      <div className="fields">
        <span className="label">Background Mode</span>
        <span className="value noborder">{(data.Background) ? <b className="text-green">Enabled</b> : 'Disabled'}</span>
      </div>
      <div className="fields">
        <span className="label">Foreground Mode</span>
        <span className="value noborder">{(data.Foreground) ? <b className="text-green">Enabled</b> : 'Disabled'}</span>
      </div>
      <div className="fields">
        <span className="label">Screenshot Configuration</span>
        <span className="value noborder">{(data.Screenshot) ? <b className="text-green">Enabled</b> : 'Disabled'}</span>
        { (data.Screenshot) &&
          <p>
            <span className="label">Time Interval</span>
            <span className="value noborder">{data.ScreenshotInterval} min(s)</span>
          </p>
        }
      </div>
      <div className="fields">
        <span className="label">Desktop Capture</span>
        <span className="value noborder">{(data.DesktopCapture) ? <b className="text-green">Enabled</b> : 'Disabled'}</span>
      </div>
      <div className="fields">
        <span className="label">Browser Capture</span>
        <span className="value noborder">{(data.BrowserCapture) ? <b className="text-green">Enabled</b> : 'Disabled'}</span>
      </div>
      <div className="fields">
        <span className="label">Active Application Monitoring</span>
        <span className="value noborder">{(data.ActiveAppMonitoring) ? <b className="text-green">Enabled</b> : 'Disabled'}</span>
      </div>
      <div className="fields">
        <span className="label">Keyboard and Mouse Sensitivity</span>
        <span className="value noborder">{(data.KBMouseMonitoring) ? <b className="text-green">Enabled</b> : 'Disabled'}</span>
        { (data.KBMouseMonitoring) &&
          <p>
            <span className="label">Time Interval</span>
            <span className="value noborder">{data.KBMouseInterval} min(s)</span>
          </p>
        }
      </div>
    </div>
  );
}

DeskConfigDisplay.propTypes = {
  data: PropTypes.object,
};

export default DeskConfigDisplay;
