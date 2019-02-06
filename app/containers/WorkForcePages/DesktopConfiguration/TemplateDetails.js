/**
 * Template Details component
 * @prop {object} details   Template details
 */
import React from 'react';
import PropTypes from 'prop-types';

import ToggleSwitch from 'components/StyleUtils/ToggleSwitch';
import ButtonWrapper from 'components/Button/ButtonWrapper';
import Button from 'components/Button';

import TemplateDetails from 'components/Configurations/Details';
import ConfigItem from 'components/Configurations/ConfigItem';

import Fields from 'components/Forms/Fields';
import Label from 'components/Forms/Label';
import Input from 'components/Forms/Input';
import Textarea from 'components/Forms/Textarea';
import ErrorMsg from 'components/Forms/FieldErrorMsg';

import { ToggleFilter } from './constants';

class TemplateDetailsComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameError: false,
      description: '',
      backgroundMode: true,
      foregroundMode: false,
      screenshot: false,
      screenshotInterval: '0',
      screenshotIntervalError: false,
      desktopCapture: false,
      browserCapture: false,
      activeBrowserCapture: false,
      activeAppMonitoring: false,
      kbMouseMonitoring: false,
      kbMouseInterval: '0',
      kbMouseIntervalError: false,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.details !== this.props.details && nextProps.details !== false) {
      const detail = nextProps.details;
      this.setState({
        name: detail.Name,
        description: detail.Descr,
        backgroundMode: detail.Background,
        foregroundMode: detail.Foreground,
        screenshot: detail.Screenshot,
        screenshotInterval: detail.ScreenshotInterval,
        desktopCapture: detail.DesktopCapture,
        browserCapture: detail.BrowserCapture,
        activeBrowserCapture: detail.ActiveBrowserCapture,
        activeAppMonitoring: detail.ActiveAppMonitoring,
        kbMouseMonitoring: detail.KBMouseMonitoring,
        kbMouseInterval: detail.KBMouseInterval,
      });
    }
  }

  getToggleValue = (e, bool, name) => {
    if (name === ToggleFilter.BGMODE) {
      this.setState({
        backgroundMode: bool,
        foregroundMode: !this.state.foregroundMode,
      });
    }
    if (name === ToggleFilter.SSHOT) {
      this.setState({
        screenshot: bool,
        desktopCapture: bool,
        screenshotInterval: (bool) || this.statesc,
      });
    }
    // if (name === ToggleFilter.DESKCAPTURE) {
    //   this.setState({
    //     desktopCapture: bool,
    //   });
    // }
    // if (name === ToggleFilter.BROWSERCAPTURE) {
    //   this.setState({
    //     browserCapture: bool,
    //   });
    // }
    // if (name === ToggleFilter.ACTIVEBROWSER) {
    //   this.setState({
    //     activeBrowserCapture: bool,
    //   });
    // }
    if (name === ToggleFilter.APPMONITOR) {
      this.setState({
        activeAppMonitoring: bool,
      });
    }
    if (name === ToggleFilter.KBMOUSEMONITOR) {
      this.setState({
        kbMouseMonitoring: bool,
      });
    }
  }

  changeInterval = (e, name) => {
    if (name === ToggleFilter.SSHOT) {
      this.setState({
        screenshotInterval: e.currentTarget.value,
        screenshotIntervalError: false,
      });
    }

    if (name === ToggleFilter.KBMOUSEMONITOR) {
      this.setState({
        kbMouseInterval: e.currentTarget.value,
        kbMouseIntervalError: false,
      });
    }
  }

  changeName = (e) => {
    this.setState({
      name: e.currentTarget.value,
      nameError: false,
    });
  }

  changeDescription = (e) => {
    this.setState({
      description: e.currentTarget.value,
    });
  }

  updateTemplate = (e) => {
    e.preventDefault();
    let error = false;
    const {
      name,
      description,
      backgroundMode,
      foregroundMode,
      screenshot,
      screenshotInterval,
      desktopCapture,
      // browserCapture,
      // activeBrowserCapture,
      activeAppMonitoring,
      kbMouseMonitoring,
      kbMouseInterval,
    } = this.state;

    if (name === '') {
      this.setState({
        nameError: true,
      });
      error = true;
    }

    if (screenshot && parseInt(screenshotInterval, 10) < 5) {
      this.setState({
        screenshotIntervalError: true,
      });
      error = true;
    }

    if (kbMouseMonitoring && parseInt(kbMouseInterval, 10) < 5) {
      this.setState({
        kbMouseIntervalError: true,
      });
      error = true;
    }

    if (!error) {
      const data = {
        // UpdateActiveBrowserCapture: activeBrowserCapture.toString(),
        // UpdateBrowserCapture: browserCapture.toString(),
        UpdateActiveAppMonitoring: activeAppMonitoring.toString(),
        UpdateBackground: backgroundMode.toString(),
        Descr: description,
        UpdateDesktopCapture: desktopCapture.toString(),
        UpdateForeground: foregroundMode.toString(),
        UpdateKBMouseInterval: kbMouseInterval,
        UpdateKBMouseMonitoring: kbMouseMonitoring.toString(),
        Name: name,
        UpdateScreenshot: screenshot.toString(),
        UpdateScreenshotInterval: screenshotInterval,
      };
      this.props.update(data);
    }
  }

  removeTemplate = (e) => {
    e.preventDefault();
    this.props.delete();
  }

  render() {
    const { details } = this.props;

    if (!details) return <TemplateDetails><p className="message">Please select template.</p></TemplateDetails>;

    return (
      <TemplateDetails>
        <div className="details">
          <Fields>
            <Label>Name</Label>
            <Input type="text" value={this.state.name} onChange={this.changeName} className={(this.state.nameError) && 'error'} />
            {(this.state.nameError) && <ErrorMsg>* Please input this field.</ErrorMsg>}
          </Fields>
          <Fields>
            <Label>Description</Label>
            <Textarea onChange={this.changeDescription} value={this.state.description} />
          </Fields>
          {/* If read only
            <h3>Template Name 1</h3>
            <p>Template ID: 000000</p>
          */}
        </div>
        <div className="configs">
          <h4>CONFIGURATIONS</h4>
          <ConfigItem className="items">
            <div className="name">
              <p>Background Mode</p>
              <ToggleSwitch value={this.state.backgroundMode} update={(e, bool) => { this.getToggleValue(e, bool, ToggleFilter.BGMODE); }} />
            </div>
          </ConfigItem>

          <ConfigItem className="items">
            <div className="name">
              <p>Screenshot Configuration</p>
              <ToggleSwitch value={this.state.screenshot} update={(e, bool) => { this.getToggleValue(e, bool, ToggleFilter.SSHOT); }} />
            </div>
            <div className="sub-item">
              <Label>Time Interval (Minutes)</Label>
              <Input
                type="number"
                placeholder="0"
                defaultValue={this.state.screenshotInterval}
                onChange={(e) => { this.changeInterval(e, ToggleFilter.SSHOT); }}
                disabled={!this.state.screenshot}
              />
              {(this.state.screenshotIntervalError) && <ErrorMsg>* Value should be 5 or more.</ErrorMsg>}
            </div>
            {/* <div className="sub-item">
              <Label>Enable Desktop Capture <ToggleSwitch value={this.state.desktopCapture} update={(e, bool) => { this.getToggleValue(e, bool, ToggleFilter.DESKCAPTURE); }} /></Label>
            </div>
            <div className="sub-item">
              <Label>Enable Browser Capture <ToggleSwitch value={this.state.browserCapture} update={(e, bool) => { this.getToggleValue(e, bool, ToggleFilter.BROWSERCAPTURE); }} /></Label>
            </div>
            <div className="sub-item">
              <Label>Active Browser Capture <ToggleSwitch value={this.state.activeBrowserCapture} update={(e, bool) => { this.getToggleValue(e, bool, ToggleFilter.ACTIVEBROWSER); }} /></Label>
            </div> */}
          </ConfigItem>

          <ConfigItem className="items">
            <div className="name">
              <p>Active Application/Browser Monitoring</p>
              <ToggleSwitch value={this.state.activeAppMonitoring} update={(e, bool) => { this.getToggleValue(e, bool, ToggleFilter.APPMONITOR); }} />
            </div>
          </ConfigItem>

          <ConfigItem className="items">
            <div className="name">
              <p>Keyboard and Mouse Sensitivity Monitoring</p>
              <ToggleSwitch value={this.state.kbMouseMonitoring} update={(e, bool) => { this.getToggleValue(e, bool, ToggleFilter.KBMOUSEMONITOR); }} />
            </div>
            <div className="sub-item">
              <Label>Time Interval (Minutes)</Label>
              <Input
                type="number"
                placeholder="0"
                defaultValue={this.state.kbMouseInterval}
                onChange={(e) => { this.changeInterval(e, ToggleFilter.KBMOUSEMONITOR); }}
                disabled={!this.state.kbMouseMonitoring}
              />
              {(this.state.kbMouseIntervalError) && <ErrorMsg>* Value should be 5 or more.</ErrorMsg>}
            </div>
          </ConfigItem>

          <ButtonWrapper>
            <Button handleRoute={this.updateTemplate} color="gray">UPDATE</Button>
            <Button handleRoute={this.removeTemplate} color="red">DELETE</Button>
          </ButtonWrapper>
        </div>
      </TemplateDetails>
    );
  }
}

TemplateDetailsComponent.propTypes = {
  details: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  update: PropTypes.func,
  delete: PropTypes.func,
};

export default TemplateDetailsComponent;
