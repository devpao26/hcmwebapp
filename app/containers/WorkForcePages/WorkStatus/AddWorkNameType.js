/**
 * Work Status Add Work Name and Type
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretDown, faDesktop } from '@fortawesome/fontawesome-free-solid';

import Button from 'components/Button';
import ButtonWrapper from 'components/Button/ButtonWrapper';
import Fields from 'components/Templates/CreateNewFormFields';
import ToggleSwitch from 'components/StyleUtils/ToggleSwitch';

import { WF_WORKSTATSTATUSACTIVE, WF_WORKSTATSTATUSINACTIVE } from 'containers/App/constants';

import WorkNameType from './WorkNameType';

import { makeSelectData } from './selectors';

class AddWorkNameType extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formNameItems: [],
      formSystemItems: [],
      formStatusItems: [],
      formStatusItem: 0,
      isHardwareMonitor: true,
      disabled: false,
      noAddBtn: false,
    };
  }

  componentDidMount() {
    this.renderOptionForDropdown();
  }

  componentWillUnmount() {
    this.setState({
      formNameItems: [],
      formSystemItems: [],
      formStatusItems: [],
      formStatusItem: 0,
    });
  }

  systemStatusChanged = () => {
    this.setState({
      disabled: (this.systemType.value === '1') && true,
      formStatusItem: 1,
      isHardwareMonitor: (this.systemType.value !== '1') || false,
    });
  }

  hardwareMonitorToggle = (e, isBool) => {
    const index = (isBool) ? 0 : 1;
    this.setState({
      formStatusItem: index,
      isHardwareMonitor: !this.state.isHardwareMonitor,
    });
  }

  addIndex = (e) => {
    e.preventDefault();
    this.props.add(e, this.workName.value, this.systemType.value, this.state.formStatusItem);
  }

  renderOptionForDropdown = () => {
    const StatusTypeList = [{
      Name: 'Active',
      SystemStatusTypeID: WF_WORKSTATSTATUSACTIVE,
    },
    {
      Name: 'InActive',
      SystemStatusTypeID: WF_WORKSTATSTATUSINACTIVE,
    }];

    const { formRefs, ids } = this.props;

    const workNames = formRefs.WorkStatusList;
    // const workTypes = formRefs.WorkStatusTypeList;

    // Render the select dropdown for Work Names
    for (let i = 0; i < workNames.length; i += 1) {
      let disabled;
      for (let o = 0; o < ids.length; o += 1) {
        disabled = (workNames[i].WorkStatusID === ids[o].WorkStatusID) && true;
        if (disabled === true) {
          break;
        }
      }
      const el = <option key={workNames[i].WorkStatusID} value={i} disabled={disabled}>{workNames[i].Name}</option>;
      this.setState((prevState) => ({
        formNameItems: [...prevState.formNameItems, el],
      }));
    }

    // Render the select dropdown for Work Types
    for (let i = 0; i < StatusTypeList.length; i += 1) {
      const el = <option key={StatusTypeList[i].SystemStatusTypeID} value={i}>{StatusTypeList[i].Name}</option>;
      this.setState((prevState) => ({
        formSystemItems: [...prevState.formSystemItems, el],
      }));
    }

    // for (let i = 0; i < workTypes.length; i += 1) {
    //   const el = <option key={workTypes[i].WorkStatusTypeID} value={i}>{workTypes[i].Name}</option>;
    //   this.setState((prevState) => ({
    //     formStatusItems: [...prevState.formStatusItems, el],
    //   }));
    // }

    // if we don't have a work name choices, disabled the add button
    if (workNames.length === ids.length) {
      this.setState({
        noAddBtn: true,
      });
    }
  }

  render() {
    return (
      <WorkNameType>
        <Fields className="addworknametype">
          <p>
            <label htmlFor="workName">Work Name</label>
            <span className="worktype select-custom">
              <FontAwesomeIcon icon={faCaretDown} />
              <select id="workName" className="type" ref={(name) => (this.workName = name)}>
                {this.state.formNameItems}
                {(this.state.noAddBtn) && <option>No Items Available</option>}
              </select>
            </span>
          </p>
          <p className="system-type">
            <label htmlFor="statusTypes">System Status</label>
            <span className="worktype select-custom">
              <FontAwesomeIcon icon={faCaretDown} />
              <select id="statusTypes" className="type" ref={(type) => (this.systemType = type)} onChange={this.systemStatusChanged}>
                {this.state.formSystemItems}
              </select>
            </span>
          </p>
          <div className="status-type">
            <FontAwesomeIcon className={(this.state.isHardwareMonitor) ? 'icon-green' : 'icon-red'} icon={faDesktop} />
            <span>Hardware Monitoring</span>
            {(!this.state.disabled) && <ToggleSwitch value={this.state.isHardwareMonitor} hideReq update={this.hardwareMonitorToggle} />}
          </div>
          {/* <p className="status-type">
            <label htmlFor="workTypes">Status Type</label>
            <span className={(this.state.disabled) ? 'disabled worktype select-custom' : 'worktype select-custom'}>
              <i className="fa fa-caret-down" />
              <select id="workTypes" className="type" ref={(type) => (this.statusType = type)} disabled={(this.state.disabled) && true} value={(this.state.disabled) && '1'}>
                {this.state.formStatusItems}
              </select>
            </span>
          </p> */}
        </Fields>
        <ButtonWrapper>
          { (this.state.noAddBtn)
            ? <Button deadButton color="gray" opaque>ADD</Button>
            : <Button handleRoute={this.addIndex} color="gray">ADD</Button>
          }
          <Button handleRoute={this.props.cancel} color="red">CANCEL</Button>
        </ButtonWrapper>
      </WorkNameType>
    );
  }
}

AddWorkNameType.propTypes = {
  add: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  ids: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  formRefs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
};

const mapStateToProps = createStructuredSelector({
  formRefs: makeSelectData('formLoads'),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(AddWorkNameType);
// export default AddWorkNameType;
