/**
 * Creation of Template Component
 * @prop {func} close
 */
import React from 'react';
import PropTypes from 'prop-types';

import ButtonWrapper from 'components/Button/ButtonWrapper';
import Button from 'components/Button';

import Form from 'components/Forms/Form';
import Fields from 'components/Forms/Fields';
import Label from 'components/Forms/Label';
import Input from 'components/Forms/Input';
import Textarea from 'components/Forms/Textarea';
import ErrorMsg from 'components/Forms/FieldErrorMsg';

import ToggleSwitch from 'components/StyleUtils/ToggleSwitch';

import { ToggleFilter } from './constants';

class CreateTemplateComponent extends React.PureComponent {
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
      // browserCapture: false,
      // activeBrowserCapture: false,
      activeAppMonitoring: false,
      kbMouseMonitoring: false,
      kbMouseInterval: '0',
      kbMouseIntervalError: false,
    };
  }

  getToggleValue = (e, bool, name) => {
    if (name === ToggleFilter.BGMODE) {
      this.setState({ backgroundMode: bool, foregroundMode: !this.state.foregroundMode });
    }
    if (name === ToggleFilter.SSHOT) {
      this.setState({
        screenshot: bool,
        desktopCapture: bool,
        screenshotInterval: (bool) ? '5' : '0',
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
        kbMouseInterval: (bool) ? '5' : '0',
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

  saveTemplate = (e) => {
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

    if (name === '' || name === false) {
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
        // ActiveBrowserCapture: activeBrowserCapture.toString(),
        // BrowserCapture: browserCapture.toString(),
        ActiveAppMonitoring: activeAppMonitoring,
        Background: backgroundMode,
        Foreground: foregroundMode,
        Descr: description,
        KBMouseInterval: kbMouseInterval,
        KBMouseMonitoring: kbMouseMonitoring,
        Name: name,
        Screenshot: screenshot,
        ScreenshotInterval: screenshotInterval,
        DesktopCapture: desktopCapture,
      };
      console.log(data);
      this.props.submit(data);
    }
  }

  render() {
    return (
      <Form>
        <Fields>
          <Label>Template Name</Label>
          <Input type="text" value={this.state.name} onChange={this.changeName} className={(this.state.nameError) && 'error'} />
          {(this.state.nameError) && <ErrorMsg>* Please input this field.</ErrorMsg>}
        </Fields>
        <Fields>
          <Label>Template Description</Label>
          <Textarea onChange={this.changeDescription} value={this.state.description} />
        </Fields>
        <Fields>
          <Label>Background Mode</Label>
          <div><span className="inline">{(this.state.backgroundMode) ? 'Enabled ' : 'Disabled'}</span> <ToggleSwitch value={this.state.backgroundMode} update={(e, bool) => { this.getToggleValue(e, bool, ToggleFilter.BGMODE); }} /></div>
        </Fields>
        <Fields className="half">
          <Label>Screenshot Configuration</Label>
          <div><span className="inline">{(this.state.screenshot) ? 'Enabled ' : 'Disabled'}</span> <ToggleSwitch value={this.state.screenshot} update={(e, bool) => { this.getToggleValue(e, bool, ToggleFilter.SSHOT); }} /></div>

          <Label>Time Interval (Minutes) * Min. of 5 mins</Label>
          <Input
            type="number"
            placeholder="00"
            value={this.state.screenshotInterval}
            onChange={(e) => { this.changeInterval(e, ToggleFilter.SSHOT); }}
            disabled={!this.state.screenshot}
            min="5"
            max="999"
          />
          {(this.state.screenshotIntervalError) && <ErrorMsg>* Value should be 5 or more.</ErrorMsg>}

          {/* <Label>Enable Desktop Capture <ToggleSwitch value update={(e, bool) => { console.log(e, bool); }} /></Label>
          <Label>Enable Browser Capture <ToggleSwitch value update={(e, bool) => { console.log(e, bool); }} /></Label>
          <Label>Active Browser Capture <ToggleSwitch value update={(e, bool) => { console.log(e, bool); }} /></Label> */}
        </Fields>
        <Fields>
          <Label>Active Application/Browser Monitoring</Label>
          <div><span className="inline">{(this.state.activeAppMonitoring) ? 'Enabled ' : 'Disabled'}</span> <ToggleSwitch value={this.state.activeAppMonitoring} update={(e, bool) => { this.getToggleValue(e, bool, ToggleFilter.APPMONITOR); }} /></div>
        </Fields>
        <Fields className="half">
          <Label>Keyboard and Mouse Sensitivity</Label>
          <div><span className="inline">{(this.state.kbMouseMonitoring) ? 'Enabled ' : 'Disabled'}</span> <ToggleSwitch value={this.state.kbMouseMonitoring} update={(e, bool) => { this.getToggleValue(e, bool, ToggleFilter.KBMOUSEMONITOR); }} /></div>
          <Label>Time Interval (Minutes) * Min. of 5 mins</Label>
          <Input
            type="number"
            placeholder="00"
            value={this.state.kbMouseInterval}
            onChange={(e) => { this.changeInterval(e, ToggleFilter.KBMOUSEMONITOR); }}
            disabled={!this.state.kbMouseMonitoring}
            min="5"
            max="999"
          />
          {(this.state.kbMouseIntervalError) && <ErrorMsg>* Value should be 5 or more.</ErrorMsg>}
        </Fields>
        <ButtonWrapper>
          <Button handleRoute={this.saveTemplate} color="gray">SUBMIT</Button>
          <Button handleRoute={this.props.close} color="red">CANCEL</Button>
        </ButtonWrapper>
      </Form>
    );
  }
}

CreateTemplateComponent.propTypes = {
  close: PropTypes.func,
  submit: PropTypes.func,
};

export default CreateTemplateComponent;
