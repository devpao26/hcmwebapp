/**
 * Access List Components
 * @prop {string}   empID       Employee Profile ID
 * @prop {func}     submit      Confirm assign function from parent component
 * @prop {boolean}  admin       True/False to dynamically display our modules
 * @prop {string}   moduleName  Name of the Main Category Module
 * @prop {array}    setAccess      Access List of the selected employee
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCube, faKey } from '@fortawesome/fontawesome-free-solid';

import Loading from 'components/LoadingIndicator/Loading';
import Access from 'components/AccessPermission/Access';
import InputCheckbox from 'components/Forms/InputCheckbox';
import Select from 'components/Forms/Select';
import Button from 'components/Button';
import ButtonWrapper from 'components/Button/ButtonWrapper';

import {
  DEFAULT_GUID,
  PERMISSION_ALL, PERMISSION_READONLY,
  GENERAL_GUID, MANAGEMENT_GUID,
  HRD_GUID, MIS_GUID, WFD_GUID, FIN_GUID,
} from 'containers/App/constants';

import { makeSelectUserInfo } from 'containers/App/selectors';

import {
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectTimeConst,
  makeSelectPermissions,
} from './selectors';

class AccessListComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccess: [],
    };
    this.addInitialAccess = this.addInitialAccess.bind(this);
    this.addAccess = this.addAccess.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading) {
      this.setState({
        selectedAccess: [],
      });
    }

    if (nextProps.setAccess !== this.props.setAccess) {
      if (nextProps.setAccess) {
        const access = nextProps.setAccess;
        this.setState(
          {
            selectedAccess: [],
          },
          () => access.map((item) => this.addInitialAccess(item.ModuleID.toLowerCase(), item.PermissionID, item.TimeConstrID, item.Module.ParentID)),
        );
      } else {
        this.setState({
          selectedAccess: [],
        });
      }
    }
  }

  componentWillUnmount() {
    this.state = {
      selectedAccess: [],
    };
  }

  addInitialAccess = (id, permID, timeID, parentID) => {
    const { admin } = this.props;
    // do not add Main Modules on selected Access stat
    if (!admin) {
      if (id !== GENERAL_GUID && id !== MANAGEMENT_GUID && id !== HRD_GUID && id !== FIN_GUID && id !== MIS_GUID && id !== WFD_GUID) {
        // ID doesn't exist in array, so add it
        let el = {
          ModuleID: id,
          PermissionID: permID,
          IsFixAccess: '1',
        };

        if (timeID !== DEFAULT_GUID) {
          el = {
            ModuleID: id,
            PermissionID: permID,
            IsFixAccess: '0',
            TimeConstrID: timeID,
          };
        }

        this.setState((prevState) => ({
          selectedAccess: [...prevState.selectedAccess, el],
        }));
      }
    } else if (admin) {
      if (id === GENERAL_GUID || id === MANAGEMENT_GUID || id === HRD_GUID || id === FIN_GUID || id === MIS_GUID || id === WFD_GUID || parentID === GENERAL_GUID) {
        // ID doesn't exist in array, so add it
        let el = {
          ModuleID: id,
          PermissionID: permID,
          IsFixAccess: '1',
        };

        if (timeID !== DEFAULT_GUID) {
          el = {
            ModuleID: id,
            PermissionID: permID,
            IsFixAccess: '0',
            TimeConstrID: timeID,
          };
        }

        this.setState((prevState) => ({
          selectedAccess: [...prevState.selectedAccess, el],
        }));
      }
    }
  }

  addAccess = (id, permID, timeID) => {
    const { selectedAccess } = this.state;
    const index = selectedAccess.findIndex((item) => item.ModuleID === id);

    if (index === -1) {
      // ID doesn't exist in array, so add it
      let el = {
        ModuleID: id,
        PermissionID: permID,
        IsFixAccess: '1',
      };

      if (timeID) {
        el = {
          ModuleID: id,
          PermissionID: permID,
          IsFixAccess: '0',
          TimeConstrID: timeID,
        };
      }

      this.setState((prevState) => ({
        selectedAccess: [...prevState.selectedAccess, el],
      }));
    } else {
      // ID exists in array, remove it
      const newArray = this.state.selectedAccess.filter((item) => item.ModuleID !== id);
      this.setState({
        selectedAccess: newArray,
      });
    }
  }

  timeConst = (e, id) => {
    const { selectedAccess } = this.state;
    const i = e.currentTarget.value;
    let timeConstID;

    if (i !== 'false') {
      timeConstID = this.props.timeconst[i].TimeConstrID;
      const arrIdx = selectedAccess.findIndex((item) => item.ModuleID === id);
      const newArray = selectedAccess;
      newArray[arrIdx].IsFixAccess = '0';
      newArray[arrIdx].TimeConstrID = timeConstID;

      this.setState({
        selectedAccess: newArray,
      });
      this.forceUpdate();
    } else {
      const arrIdx = selectedAccess.findIndex((item) => item.ModuleID === id);
      const newArray = selectedAccess;
      newArray[arrIdx].IsFixAccess = '1';
      newArray[arrIdx].TimeConstrID = undefined;

      this.setState({
        selectedAccess: newArray,
      });
      this.forceUpdate();
    }
  }

  permissionChange = (e, id) => {
    const { selectedAccess } = this.state;
    const i = e.currentTarget.value;

    const permissionID = this.props.permissions[i].PermissionID;
    const arrIdx = selectedAccess.findIndex((item) => item.ModuleID === id);
    const newArray = selectedAccess;
    newArray[arrIdx].PermissionID = permissionID;

    this.setState({
      selectedAccess: newArray,
    });
  }

  submitPermissions = (e) => {
    e.preventDefault();
    const data = JSON.stringify({ AccessModulePermissionList: this.state.selectedAccess });
    this.props.submit(data);
  }

  render() {
    const { admin, loading, error, access, subaccess, timeconst, permissions, moduleName } = this.props;
    const { selectedAccess } = this.state;
    // console.log('SetAccess', setAccess);
    // console.log('SelectedAccess', selectedAccess);

    const { userProfile } = this.props;
    const userAccessList = (userProfile.AccessPermissionTemplate.length > 0) ? userProfile.AccessPermissionTemplate[0].AccessModulePermissionList : [];

    // This will write the heading for our access categories
    let mainModuleName;
    if (moduleName === 'General') mainModuleName = 'General Access and Permissions';
    if (moduleName === 'HR') mainModuleName = 'HR ADMIN';
    if (moduleName === 'WF') mainModuleName = 'WORKFORCE ADMIN';
    if (moduleName === 'IT') mainModuleName = 'IT ADMIN';
    if (moduleName === 'FIN') mainModuleName = 'FINANCE ADMIN';

    if (loading) return <Access><Loading /></Access>;

    if (error) {
      if (error.ErrorCode === 204) {
        return <Access><p className="message">No Record(s) Found.</p></Access>;
      }
      return <Access><p className="message">There was a problem communicating with the server. Please try again later.</p></Access>;
    }

    if (access && subaccess && permissions && timeconst) {
      // Default Time Constraint Index
      let timeIdx = 'false';

      // Default Permission index and ID
      const defaultPermission = (admin) ? PERMISSION_ALL : PERMISSION_READONLY;
      let readIndex = permissions.findIndex((obj) => obj.PermissionID === PERMISSION_READONLY);
      const permission = permissions.map((item, index) => <option key={item.PermissionID} value={index}>{item.Descr}</option>);

      // Time Constraint Iteration
      const time = timeconst.map((item, index) => <option key={item.TimeConstrID} value={index}>{item.Interval} days</option>);

      // main category modules
      const items = access.map((item, index) => {
        // enable the select tags when we choose the access module
        const idx = selectedAccess.findIndex((obj) => obj.ModuleID === item.ModuleID);
        let disabled = true;
        if (idx !== -1) {
          // enable/disable select tag
          disabled = false;

          // get the index again of permission
          const permID = selectedAccess[idx].PermissionID;
          readIndex = permissions.findIndex((obj) => obj.PermissionID === permID);

          if (selectedAccess[idx].IsFixAccess === '0') {
            const timeConstID = selectedAccess[idx].TimeConstrID;
            timeIdx = timeconst.findIndex((obj) => obj.TimeConstrID === timeConstID);
          } else {
            timeIdx = 'false';
            // readIndex = permissions.findIndex((obj) => obj.PermissionID === PERMISSION_READONLY);
          }
        } else {
          timeIdx = 'false';
          readIndex = permissions.findIndex((obj) => obj.PermissionID === PERMISSION_READONLY);
        }

        // check whether our selected employees has an access already then add it to our selectedAccess
        let selected = false;
        const accessIdx = selectedAccess.findIndex((obj) => obj.ModuleID === item.ModuleID);
        if (accessIdx !== -1) selected = true;

        if (item.ModuleID !== GENERAL_GUID) {
          return (
            <li key={item.ModuleID}>
              <InputCheckbox onChange={() => { this.addAccess(item.ModuleID, defaultPermission, false); }} value={index} checked={selected} />
              <div className="item">
                <span className="name">{item.Name}</span>
                { (!admin) &&
                  <Select label="Permission:" border={false} getValue={(e) => { this.permissionChange(e, item.ModuleID); }} disabled={disabled} default={readIndex}>
                    {permission}
                  </Select>
                }
                <Select label="Expiry:" border={false} getValue={(e) => { this.timeConst(e, item.ModuleID); }} disabled={disabled} default={timeIdx}>
                  <option value="false">No Expiry</option>
                  {time}
                </Select>
              </div>
            </li>
          );
        }
        return null;
      });

      // sub category modules
      const subitems = subaccess.map((item, index) => {
        const idx = selectedAccess.findIndex((obj) => obj.ModuleID === item.ModuleID);
        let disabled = true;
        if (idx !== -1) {
          // enable/disable select tag
          disabled = false;

          // get the index again of permission
          const permID = selectedAccess[idx].PermissionID;
          readIndex = permissions.findIndex((obj) => obj.PermissionID === permID);

          if (selectedAccess[idx].IsFixAccess === '0') {
            const timeConstID = selectedAccess[idx].TimeConstrID;
            timeIdx = timeconst.findIndex((obj) => obj.TimeConstrID === timeConstID);
          } else {
            timeIdx = 'false';
            // readIndex = permissions.findIndex((obj) => obj.PermissionID === PERMISSION_READONLY);
          }
        } else {
          timeIdx = 'false';
          readIndex = permissions.findIndex((obj) => obj.PermissionID === PERMISSION_READONLY);
        }

        // check whether our selected employees has an access already then add it to our selectedAccess
        let selected = false;
        const accessIdx = selectedAccess.findIndex((obj) => obj.ModuleID === item.ModuleID);
        if (accessIdx !== -1) selected = true;

        if (item.ModuleID !== GENERAL_GUID) {
          return (
            <li key={item.ModuleID}>
              <InputCheckbox onChange={() => { this.addAccess(item.ModuleID, defaultPermission, false); }} value={index} checked={selected} />
              <div className="item">
                <span className="name">{item.Name}</span>
                { (!admin) &&
                  <Select label="Permission:" border={false} getValue={(e) => { this.permissionChange(e, item.ModuleID); }} disabled={disabled} default={readIndex}>
                    {permission}
                  </Select>
                }
                <Select label="Expiry:" border={false} getValue={(e) => { this.timeConst(e, item.ModuleID); }} disabled={disabled} default={timeIdx}>
                  <option value="false">No Expiry</option>
                  {time}
                </Select>
              </div>
            </li>
          );
        }
        return null;
      });

      return (
        <div className="groups">
          <Access>
            <h3>
              <FontAwesomeIcon icon={faCube} />
              <span>{mainModuleName}</span>
              <FontAwesomeIcon icon={faKey} />
              {/* {(this.state.selectedAccess.length > 0) && <FontAwesomeIcon icon={faKey} />} */}
            </h3>
            <ul className="access-list">
              {items}
              {/* <p>
                <InputCheckbox label="Workforce Admin" onChange={this.addAccess} value="0" />
                <b>(Read Only)</b>
              </p> */}
            </ul>
          </Access>
          { (userAccessList.findIndex((item) => item.ModuleID === MANAGEMENT_GUID) !== -1) &&
            <Access>
              <h3>
                <FontAwesomeIcon icon={faCube} />
                <span>{(admin) ? 'General Admin Permissions' : 'Management Permissions'}</span>
                <FontAwesomeIcon icon={faKey} />
                {/* {(this.state.selectedAccess.length > 0) && <FontAwesomeIcon icon={faKey} />} */}
              </h3>
              <ul className="access-list">
                {subitems}
              </ul>
            </Access>
          }
          <ButtonWrapper>
            {(this.state.selectedAccess.length > 0 && this.props.empID && this.props.admin) && <p className="message">Upon Saving all access to the Sub Modules will be given to the selected Admin(s).</p>}
            {(this.state.selectedAccess.length > 0 && this.props.empID) && <Button handleRoute={(e) => { this.submitPermissions(e); }} color="gray">Save</Button>}
            {(this.props.setAccess && this.state.selectedAccess.length === 0 && this.props.empID) && <Button handleRoute={(e) => { this.props.removeAccess(e); }} color="red">REMOVE ACCESS</Button>}
          </ButtonWrapper>
        </div>
      );
    }

    return null; // default return until we are not yet fetching data in saga
  }
}

AccessListComponent.propTypes = {
  userProfile: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  empID: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  admin: PropTypes.bool,
  moduleName: PropTypes.string,
  setAccess: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  access: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  subaccess: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  permissions: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  timeconst: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  // props from parent component
  submit: PropTypes.func,
  removeAccess: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userProfile: makeSelectUserInfo(),
  loading: makeSelectLoading('mainModules'),
  error: makeSelectError('mainModules'),
  access: makeSelectData('mainModules'),
  subaccess: makeSelectData('subModules'),
  permissions: makeSelectPermissions(),
  timeconst: makeSelectTimeConst(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(AccessListComponent);
