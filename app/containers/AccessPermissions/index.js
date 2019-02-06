/**
 * Global Component for Access & Permissions
 * @prop {boolean}  isGenAdmin      True/False to determine if we are going to retrieve General Admin Modules or Sub Modules default: false
 * @prop {string}   adminRequester  String name of the admin requester
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

/* Global injectSaga and injectReducer */
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

/* Global Components */
import H2 from 'components/Section/H2';
import Confirm from 'components/ConfirmationDialog';
import Loading from 'components/LoadingIndicator';

import Wrapper from 'components/AccessPermission';
import AccessList from 'components/AccessPermission/AccessList';

import Access from './Access';
import EmpList from './EmpList';

/* selectors, reducer, saga and actions */
import reducer from './reducer';
import saga from './saga';

import {
  makeSelectUserInfo,
} from '../App/selectors';

import {
  toggleReloginModal, resetReloginState,
} from '../ReLogin/actions';
import {
  makeSelectReloginSuccess, makeSelectReloginToggleModal,
} from '../ReLogin/selectors';

import {
  makeSelectSuccess, makeSelectError,
} from './selectors';

import {
  clearState, getMainModules, getAssignAccessReset, getRefs, getAssignAccess, getRemoveTemplate, getRemoveTemplateReset,
} from './actions';

class AccessPermissionsComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      empID: false,
      empName: '',
      empAccess: false,
      isAssign: false,
      isConfirmAssign: false,
      isAssignResponse: false,
      isSavingLoading: false,
      assignData: false,
      isConfirmRemove: false,
      isRemoveResponse: false,
    };
  }

  componentDidMount() {
    // Get the references
    this.props.retrieveRefs();

    // Retrieve Access Permissions Main Modules
    if (this.props.isGenAdmin) {
      this.props.retrieveModules(true, this.props.adminRequester);
    } else {
      this.props.retrieveModules(false, this.props.adminRequester);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.assignSuccess || nextProps.assignError) {
      this.setState({
        isConfirmAssign: false,
        isAssignResponse: true,
        isSavingLoading: false,
        assignData: false,
        empAccess: false,
      });
    }

    if (nextProps.removeSuccess || nextProps.removeError) {
      this.setState({
        isSavingLoading: false,
        isConfirmRemove: false,
        isRemoveResponse: true,
        assignData: false,
        empAccess: false,
      });
    }

    if (nextProps.reloginModal) {
      this.setState({
        isSavingLoading: true,
      });
    }
    // else {
    //   this.setState({
    //     isSavingLoading: false,
    //   });
    // }

    if (nextProps.reloginSuccess) {
      this.props.reloginReset();

      if (this.state.isAssign) {
        this.props.assignAccess(this.state.empID, this.state.assignData);
      } else {
        this.props.removeAccess(this.state.empID);
      }
    }
  }

  componentWillUnmount() {
    // Clear state on unmount
    this.props.clearState();
  }

  // Set the Employee ID from the EmpList component
  setEmployee = (id, name, access) => {
    // console.log(access);
    this.setState({
      empID: id,
      empName: name,
      empAccess: access,
    });
  }

  // Show Relogin Modal
  showRelogin = (isAssign) => {
    this.setState({
      isAssign,
      isConfirmAssign: false,
    });
    this.props.relogin(true, 'RELOGIN', 'Enter Login Credentials to Confirm');
  }

  // Assigning of Access to Employee
  showConfirmAssign = (data) => {
    this.setState({
      isConfirmAssign: true,
      assignData: data,
    });
  }
  hideConfirmAssign = (e) => {
    e.preventDefault();
    this.setState({
      isConfirmAssign: false,
      assignData: false,
    });
  }
  hideAssignResponse = () => {
    this.setState({
      isSavingLoading: false,
      isAssignResponse: false,
      assignData: false,
      empID: false,
      empName: '',
      empAccess: false,
    });
    this.props.assignReset();
    // Retrieve Access Permissions Main Modules
    if (this.props.isGenAdmin) {
      this.props.retrieveModules(true, this.props.adminRequester);
    } else {
      this.props.retrieveModules(false, this.props.adminRequester);
    }
  }

  // Remove Access Template from Employee
  showConfirmRemove = (e) => {
    e.preventDefault();
    this.setState({
      isConfirmRemove: true,
    });
  }
  hideConfirmRemove = () => {
    this.setState({
      isConfirmRemove: false,
    });
  }
  hideRemoveResponse = () => {
    this.setState({
      isSavingLoading: false,
      isRemoveResponse: false,
      assignData: false,
      empID: false,
      empName: '',
      empAccess: false,
    });
    this.props.removeReset();
    // Retrieve Access Permissions Main Modules
    if (this.props.isGenAdmin) {
      this.props.retrieveModules(true, this.props.adminRequester);
    } else {
      this.props.retrieveModules(false, this.props.adminRequester);
    }
  }

  render() {
    return (
      <Wrapper>
        <EmpList selectEmp={this.setEmployee} />
        {/* <Lists>
          <H2>Employee List</H2>
          <Search search onClick={(val) => { this.listSearch(val); }} placeholder="Search Lists..." defaultVal={(this.state.listSearchVal) || ''} />
          <div className="filters">
            <Radio type="radio" value="All" label="Select All" name="listSelection" onChange={this.listFilterChange} />
            <Radio type="radio" value="None" label="Deselect All" name="listSelection" onChange={this.listFilterChange} />
          </div>

          <ul className="listings">
            <li className="active">
              <p>
                Workgroup Name
                <small>Department</small>
              </p>
              <FontAwesomeIcon icon={faCheckCircle} />
            </li>
          </ul>
        </Lists> */}
        <AccessList>
          <H2>Access and Permissions</H2>
          <Access
            empID={this.state.empID}
            submit={this.showConfirmAssign}
            admin={this.props.isGenAdmin}
            moduleName={this.props.adminRequester}
            setAccess={this.state.empAccess}
            removeAccess={this.showConfirmRemove}
          />
        </AccessList>

        {/* Confirm assigning access to employee */}
        <Confirm
          show={this.state.isConfirmAssign}
          title="CONFIRMATION"
          onClick={() => { this.showRelogin(true); }}
          onClose={this.hideConfirmAssign}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
        >
          {(this.state.isSavingLoading) && <div className="loading-cont"><Loading /></div>}
          <p>Are you sure you want to assign the <br />selected permission(s) to<br /><span className="text-green">{this.state.empName}</span>?</p>
        </Confirm>
        <Confirm
          show={this.state.isAssignResponse}
          title={(this.props.assignSuccess) ? 'SUCCESS' : 'FAILED'}
          onClick={this.hideAssignResponse}
          okBtnText="OK"
        >
          {(this.props.assignSuccess) && <p>Permissions have been successfully assigned to <br /><span className="text-green">{this.state.empName}</span>.</p>}
          {(this.props.assignError) && <p>There was a problem assigning permissions to <br /><span className="text-green">{this.state.empName}</span>.<br />Please try again later.</p>}
        </Confirm>

        {/* Confirm removing of template from the employee */}
        <Confirm
          show={this.state.isConfirmRemove}
          title="CONFIRMATION"
          onClick={() => { this.showRelogin(false); }}
          onClose={this.hideConfirmRemove}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
        >
          {(this.state.isSavingLoading) && <div className="loading-cont"><Loading /></div>}
          <p>Are you sure you want to remove access from<br /><span className="text-green">{this.state.empName}</span>?</p>
        </Confirm>
        <Confirm
          show={this.state.isRemoveResponse}
          title={(this.props.removeSuccess) ? 'SUCCESS' : 'FAILED'}
          onClick={this.hideRemoveResponse}
          okBtnText="OK"
        >
          {(this.props.removeSuccess) && <p>Permissions have been successfully removed from <br /><span className="text-green">{this.state.empName}</span>.</p>}
          {(this.props.removeError) && <p>There was a problem removing permissions of <br /><span className="text-green">{this.state.empName}</span>.<br />Please try again later.</p>}
        </Confirm>
      </Wrapper>
    );
  }
}

AccessPermissionsComponent.defaultProps = {
  isGenAdmin: false,
};

AccessPermissionsComponent.propTypes = {
  isGenAdmin: PropTypes.bool.isRequired,
  adminRequester: PropTypes.string,
  // map state props
  reloginModal: PropTypes.bool,
  reloginSuccess: PropTypes.bool,
  assignSuccess: PropTypes.bool,
  assignError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  removeSuccess: PropTypes.bool,
  removeError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  // Function dispatch props
  clearState: PropTypes.func,
  retrieveRefs: PropTypes.func,
  retrieveModules: PropTypes.func,
  relogin: PropTypes.func,
  reloginReset: PropTypes.func,
  assignAccess: PropTypes.func,
  assignReset: PropTypes.func,
  removeAccess: PropTypes.func,
  removeReset: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserInfo(),
  reloginModal: makeSelectReloginToggleModal(),
  reloginSuccess: makeSelectReloginSuccess(),
  assignSuccess: makeSelectSuccess('assign'),
  assignError: makeSelectError('assign'),
  removeSuccess: makeSelectSuccess('remove'),
  removeError: makeSelectError('remove'),
});

function mapDispatchToProps(dispatch) {
  return {
    clearState: () => dispatch(clearState()),
    retrieveRefs: () => dispatch(getRefs()),
    retrieveModules: (isGenAdmin, requester) => dispatch(getMainModules(isGenAdmin, requester)),
    relogin: (toggle, title, message) => dispatch(toggleReloginModal(toggle, title, message)),
    reloginReset: () => dispatch(resetReloginState()),
    assignAccess: (empID, data) => dispatch(getAssignAccess(empID, data)),
    assignReset: () => dispatch(getAssignAccessReset()),
    removeAccess: (empID) => dispatch(getRemoveTemplate(empID)),
    removeReset: () => dispatch(getRemoveTemplateReset()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'AccessPermissions', reducer });
const withSaga = injectSaga({ key: 'AccessPermissions', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AccessPermissionsComponent);
