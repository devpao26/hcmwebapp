/*
 * WorkGroup Display
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

/* Global injectSaga and injectReducer */
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

/* Global Components */
import Loading from 'components/LoadingIndicator';
import PageWrap from 'components/PageWrap';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';
import Sidebar from 'components/Sidebar';
import PageContent from 'components/Main/PageContent';
import Section from 'components/Section';
import H2 from 'components/Section/H2';
import Confirm from 'components/ConfirmationDialog';
import Dialog from 'components/WorkGroup/Dialog';
import ButtonWrapper from 'components/Button/ButtonWrapper';
import Button from 'components/Button';
import Input from 'components/Forms/Input';

/* selectors, reducer, saga and actions */
import reducer from './reducer';
import saga from './saga';

import {
  makeSelectSuccess,
  makeSelectError,
  makeSelectData,
  makeSelectIsTeam,
  makeSelectID,
} from './selectors';

import {
  clearState,
  getGroupList, getEmpList,
  getEnrollEmpReset, getUnEnrollEmpReset, getAssignEmpHead,
  getAssignTemplate, getAssignTemplateReset,
  getAssignEmpHeadReset,
  getCreateNew, getCreateNewReset,
  getDeleteGroup, getDeleteGroupReset,
  getRenameGroup, getRenameReset,
  getDisableAccount, getDisableAccountReset,
  getViewDetails,
  getUnassignTemplate,
  getUnassignTemplateReset,
  getTransfer,
  getTransferReset,
} from './actions';

import WorkGroupList from './Workgroups';
import EmployeeList from './EmpList';
import TemplateList from './TemplateList';
import ViewDetails from './ViewDetails';
import TemplateDetails from './TemplateDetails';
import Transfer from './Transfer';

export class WorkGroupPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectedGroupName: '',
      // Employee List and Enrollment/Unenrollment
      deptID: false,
      teamID: false,
      employeeList: false,
      isEnrolled: false,
      isTransferring: false,
      isTeam: false,
      confirmEnrollEmpSuccess: false,
      confirmEnrollEmpError: false,
      confirmUnenrollEmpSuccess: false,
      confirmUnenrollEmpError: false,
      isConfirmAssignHead: false,
      employeeName: '',
      employeeID: false,
      isConfirmAssignHeadSuccess: false,
      isConfirmAssignHeadError: false,
      // Template List & Assign
      isTemplateList: false,
      templateCat: false,
      templateListName: '',
      templateName: false,
      assignToID: false,
      assignTo: false,
      assignToName: false,
      isConfirmAssignTemplate: false,
      isAssignTemplateSuccess: false,
      isAssignTemplateError: false,
      isConfirmUnassignTemplate: false,
      isUnassignTemplateResponse: false,
      unassignID: false,
      unassignName: false,
      // View Details
      isViewGroupDetails: false,
      isViewGroupRefresh: false,
      // Creation
      isSavingLoading: false,
      createDeptDialog: false,
      createSuccess: false,
      createInputValue: '',
      createInputError: false,
      createParentName: '',
      createParentCat: 'Company',
      // Delete
      isDeleteGroup: false,
      deleteGroupID: false,
      deleteGroupName: false,
      isDeleteGroupResponse: false,
      deleteGroupResponseMsg: false,
      // Rename
      isRenameGroup: false,
      isRenameGroupConfirm: false,
      isRenameGroupResponse: false,
      renameGroupHead: false,
      renameGroupID: false,
      renameGroupOldName: false,
      renameGroupNewName: '',
      renameGroupIsTop: false,
      // Disable Account
      isDisableEmp: false,
      isDisableEmpResponse: false,
      disableEmpID: false,
      disableEmpName: false,
      disableEmpStatus: false,
      // View Template Details
      isViewTemplateDetails: false,
      viewTemplateName: '',
      viewTemplateData: false,
      // Transfer
      isTransfer: false,
      isConfirmTransfer: false,
      isTransferResponse: false,
      transferIDs: false,
      transferNames: [],
      transferCurrent: false,
      transferCurrentIsTeam: false,
      transferCurrentID: false,
      transferNewIsTeam: false,
      transferNewGroupID: false,
    };
  }

  componentDidMount() {
    const mainWrapper = document.getElementById('mainWrapper');
    // Remove show class in our main wrapper
    mainWrapper.classList.remove('show');

    // retrieve reference data
    // this.props.retrieveRefsData();

    // retrieve group list
    this.props.retrieveGroupList(false, false);
  }

  componentWillReceiveProps(nextProps) {
    // Enrollment
    if (nextProps.enrollEmpSuccess) {
      this.setState({
        employeeList: false,
        confirmEnrollEmpSuccess: true,
      });
    }
    if (nextProps.enrollEmpError) {
      this.setState({
        employeeList: false,
        confirmEnrollEmpError: true,
      });
    }
    // Unenroll
    if (nextProps.unenrollEmpSuccess) {
      this.setState({
        employeeList: false,
        confirmUnenrollEmpSuccess: true,
      });
    }
    if (nextProps.unenrollEmpError) {
      this.setState({
        employeeList: false,
        confirmUnenrollEmpError: true,
      });
    }
    // Assign as Head
    if (nextProps.assignHeadSuccess) {
      this.setState({
        isConfirmAssignHeadSuccess: true,
      });
    }
    if (nextProps.assignHeadError) {
      this.setState({
        isConfirmAssignHeadError: true,
      });
    }
    // Assign Template
    if (nextProps.assignTemplateSuccess) {
      this.setState({
        isTemplateList: false,
        isAssignTemplateSuccess: true,
      });
    }
    if (nextProps.assignTemplateError) {
      this.setState({
        isTemplateList: false,
        isAssignTemplateError: true,
      });
    }
    // Create New Group
    if (nextProps.createGroupSuccess) {
      this.setState({
        createSuccess: true,
        createDeptDialog: false,
        isSavingLoading: false,
      });
    }
    // Delete Group
    if (nextProps.deleteGroupSuccess) {
      this.setState({
        isDeleteGroupResponse: true,
        isDeleteGroup: false,
        isSavingLoading: false,
      });
    }
    if (nextProps.deleteGroupError) {
      this.setState({
        isDeleteGroupResponse: true,
        isDeleteGroup: false,
        isSavingLoading: false,
      });
    }
    // Rename Group
    if (nextProps.renameGroupSuccess) {
      this.setState({
        isRenameGroupResponse: true,
        isRenameGroupConfirm: false,
        isSavingLoading: false,
      });
    }
    if (nextProps.renameGroupError) {
      this.setState({
        isRenameGroupResponse: true,
        isRenameGroupConfirm: false,
        isSavingLoading: false,
      });
    }
    // Disable Account
    if (nextProps.disableEmpSuccess || nextProps.disableEmpError) {
      this.setState({
        isDisableEmp: false,
        isDisableEmpResponse: true,
        isSavingLoading: false,
      });
    }
    // Unassign Template
    if (nextProps.unassignTemplateSuccess || nextProps.unassignTemplateError) {
      this.setState({
        isConfirmUnassignTemplate: false,
        isUnassignTemplateResponse: true,
        isSavingLoading: false,
      });
    }
    // Transfer
    if (nextProps.transferSuccess || nextProps.transferError) {
      this.setState({
        isTransfer: false,
        isConfirmTransfer: false,
        isTransferResponse: true,
        isSavingLoading: false,
      });
    }
  }

  componentWillUnmount() {
    // Clear the component state
    this.props.clearState();
  }

  // #region Employee List related modals
  showEmployeeList = (deptID, teamID, isTeam, isEnrolled, groupName, isTransfer = false) => {
    const id = (!teamID) ? deptID : teamID;
    this.setState({
      deptID,
      teamID,
      isTeam,
      isEnrolled,
      isTransferring: isTransfer,
      employeeList: !this.state.employeeList,
      selectedGroupName: groupName,
    });

    this.props.retrieveEmpList(id, isTeam, isEnrolled, false, false, 1);
  }
  hideEmployeeList = () => {
    this.setState({
      employeeList: false,
      isTeam: false,
    });
  }

  // Hide enroll employee success and error
  hideConfirmEnrollEmp = () => {
    this.setState({
      confirmEnrollEmpError: false,
      confirmEnrollEmpSuccess: false,
    });

    this.props.resetEnrollEmpSuccess();
  }

  // Hide unenroll employee success and error
  hideConfirmUnEnrollEmp = () => {
    this.setState({
      confirmUnenrollEmpError: false,
      confirmUnenrollEmpSuccess: false,
    });

    this.props.resetUnEnrollEmpSuccess();
  }

  // Assign as head confirm, success and error
  assignHead = (empID, groupID, empName) => {
    this.setState({
      isConfirmAssignHead: true,
      employeeName: empName,
      employeeID: empID,
      assignToID: groupID,
    });
  }
  confirmAssignHead = (e) => {
    e.preventDefault();
    this.setState({
      isConfirmAssignHead: false,
    });
    this.props.assignEmpAsHead(this.state.employeeID, this.state.assignToID, this.state.isTeam);
  }
  hideConfirmAssignHead = (e) => {
    e.preventDefault();
    this.setState({
      isConfirmAssignHead: false,
    });
  }
  hideConfirmAssignHeadResult = (e) => {
    e.preventDefault();
    this.setState({
      isConfirmAssignHeadSuccess: false,
      isConfirmAssignHeadError: false,
    });
    this.props.resetAssignEmpAsHead();
    this.props.retrieveGroupList(this.props.groupID, this.props.isGroupTeam);
  }
  // #endregion

  // #region Template List related modals
  showTemplateList = (e, id, isTeam, template, groupName, isViewGroupRefresh = false, isEmp = false) => {
    let name = template;
    if (template === 'Shift') name = 'Shift Schedules';
    if (template === 'Payroll') name = 'Payroll Cutoff';
    if (template === 'WorkStat') name = 'Work Status';
    if (template === 'DeskConfig') name = 'Desktop Configuration';

    this.setState({
      isTemplateList: true,
      templateCat: template,
      templateListName: name,
      assignToID: id,
      isTeam,
      assignToName: groupName,
      selectedGroupName: groupName,
      isViewGroupRefresh,
      assignTo: (isEmp) && 'Emp',
    });
  }
  hideTemplateList = () => {
    this.setState({
      isTemplateList: false,
      isTeam: false,
      assignToID: false,
    });
  }
  showConfirmAssignTemplate = (e, templateID, assignTo, templateName) => {
    this.setState({
      isConfirmAssignTemplate: true,
      templateID,
      assignTo,
      templateName,
    });
  }
  hideConfirmAssignTemplate = () => {
    this.setState({
      isConfirmAssignTemplate: false,
    });
  }
  confirmAssign = () => {
    this.setState({
      isConfirmAssignTemplate: false,
    });

    this.props.assignTemplate(this.state.templateID, this.state.assignToID, this.state.assignTo, this.state.templateCat);
  }
  hideAssignTemplateConfirm = () => {
    this.setState({
      isAssignTemplateError: false,
      isAssignTemplateSuccess: false,
    });

    this.props.resetAssignTemplateSuccess();
    // retrieve group list
    this.props.retrieveGroupList(this.props.groupID, this.props.isGroupTeam);

    if (this.state.isViewGroupRefresh) {
      this.props.viewDetails(this.state.assignToID, this.state.isTeam);
      this.setState({
        isViewGroupRefresh: false,
      });
    }
  }
  // #endregion

  // #region View group details, template details, unassigning of template
  showViewGroupDetails = (e, groupID, isTeam, name) => {
    e.preventDefault();
    this.setState({
      assignToID: groupID,
      isViewGroupDetails: true,
      assignToName: name,
      isTeam,
    });
    this.props.viewDetails(groupID, isTeam);
  }
  hideViewGroupDetails = (e) => {
    e.preventDefault();
    this.setState({
      isViewGroupDetails: false,
    });
  }
  viewTemplateDetails = (e, name, data) => {
    e.preventDefault();

    this.setState({
      isViewTemplateDetails: true,
      viewTemplateName: name,
      viewTemplateData: data,
    });
  }
  closeViewTemplateDetails = () => {
    this.setState({
      isViewTemplateDetails: false,
      viewTemplateName: '',
      viewTemplateData: false,
    });
  }
  showConfirmUnassignTemplate = (e, id, templateCat, templateName, groupName) => {
    this.setState({
      isConfirmUnassignTemplate: true,
      templateCat,
      templateName,
      unassignID: id,
      unassignName: groupName,
    });
  }
  confirmUnassignTemplate = () => {
    this.setState({
      isSavingLoading: true,
      isConfirmUnassignTemplate: false,
    });
    this.props.unassignTemplate(this.state.unassignID, this.state.isTeam, this.state.templateCat);
  }
  hideUnassignTemplateResponse = () => {
    this.setState({
      isUnassignTemplateResponse: false,
    });
    this.props.unassignTemplateReset();
    this.props.viewDetails(this.state.assignToID, this.state.isTeam);
  }
  // #endregion

  // #region Create/Delete/Rename Department
  showCreateDialog = (e, name, groupID, parentCat, isTeam) => {
    this.setState({
      isTeam,
      assignToID: groupID,
      createParentName: name,
      createParentCat: parentCat,
      createDeptDialog: !this.state.createDeptDialog,
      createDeptSuccess: false,
      createInputError: false,
      createInputValue: '',
      createSuccess: false,
    });
  }
  hideCreateDialog = (e) => {
    e.preventDefault();
    this.setState({
      createDeptDialog: false,
    });
  }
  createGroupOnChange = (e) => {
    const value = e.currentTarget.value;
    if (value !== '') {
      this.setState({
        createInputError: false,
        createInputValue: value,
      });
    }
  }
  submitCreateGroup = (e) => {
    e.preventDefault();
    const { createInputValue, assignToID, createParentCat } = this.state;

    if (!createInputValue.replace(/\s/g, '').length || createInputValue === '' || !createInputValue) {
      this.setState({
        createInputError: true,
      });
    } else {
      this.setState({
        isSavingLoading: true,
      });
      this.props.createGroup(createInputValue, createParentCat, assignToID);
    }
  }
  hideCreateSuccess = () => {
    this.setState({
      createSuccess: false,
      isSavingLoading: false,
    });
    this.props.createGroupReset();
    this.props.retrieveGroupList(this.props.groupID, this.props.isGroupTeam);
  }
  showDeleteGroup = (e, id, isTeam, name) => {
    e.preventDefault();
    this.setState({
      isTeam,
      deleteGroupName: name,
      deleteGroupID: id,
      isDeleteGroup: true,
    });
  }
  hideDeleteGroup = (e) => {
    e.preventDefault();
    this.setState({
      isDeleteGroup: false,
    });
  }
  confirmDeleteGroup = (e) => {
    e.preventDefault();
    this.setState({
      isSavingLoading: true,
    });
    this.props.deleteGroup(this.state.deleteGroupID, this.state.isTeam);
  }
  hideDeleteGroupResponse = (e) => {
    e.preventDefault();
    this.setState({
      isDeleteGroup: false,
      isDeleteGroupResponse: false,
    });
    this.props.deleteGroupReset();
    this.props.retrieveGroupList(this.props.groupID, this.props.isGroupTeam);
  }
  showRenameGroup = (e, groupID, isTeam, oldName, isTop = false) => {
    e.preventDefault();
    this.setState({
      isRenameGroup: true,
      renameGroupID: groupID,
      renameGroupOldName: oldName,
      renameGroupIsTop: isTop,
      isTeam,
    });
  }
  renameInputChange = (e) => {
    const value = e.currentTarget.value;
    if (value !== '') {
      this.setState({
        renameInputError: false,
        renameGroupNewName: value,
      });
    }
  }
  confirmRenameGroup = (e) => {
    e.preventDefault();
    this.setState({
      isRenameGroup: false,
      isRenameGroupConfirm: true,
    });
  }
  submitRenameGroup = (e) => {
    e.preventDefault();
    const { renameGroupID, renameGroupNewName, isTeam } = this.state;

    if (!renameGroupNewName.replace(/\s/g, '').length || renameGroupNewName === '' || !renameGroupNewName) {
      this.setState({
        renameInputError: true,
      });
    } else {
      this.setState({
        isSavingLoading: true,
      });
      this.props.renameGroup(renameGroupNewName, renameGroupID, isTeam);
    }
  }
  hideRenameGroup = (e) => {
    e.preventDefault();
    this.setState({
      isSavingLoading: false,
      isRenameGroupConfirm: false,
      isRenameGroup: false,
    });
  }
  hideRenameGroupResponse = (e) => {
    e.preventDefault();
    this.setState({
      isSavingLoading: false,
      isRenameGroupResponse: false,
    });

    this.props.renameGroupReset();
    this.props.retrieveGroupList(this.props.groupID, this.props.isGroupTeam);
  }
  // #endregion

  // #region Disable Account
  showDisableEmp = (e, id, name, status) => {
    e.preventDefault();
    this.setState({
      isDisableEmp: true,
      disableEmpID: id,
      disableEmpName: name,
      disableEmpStatus: status,
    });
  }
  hideDisableEmp = () => {
    this.setState({
      isDisableEmp: false,
      disableEmpID: false,
      disableEmpName: false,
      disableEmpStatus: false,
    });
  }
  confirmDisableEmp = () => {
    this.setState({
      isSavingLoading: true,
    });
    this.props.disableEmp(this.state.disableEmpID, this.state.disableEmpStatus);
  }
  hideDisableResponse = () => {
    this.setState({
      isSavingLoading: false,
      isDisableEmpResponse: false,
      disableEmpID: false,
      disableEmpName: false,
      disableEmpStatus: false,
    });
    this.props.disableEmpReset();
  }
  // #endregion

  // #region Transfer
  showTransfer = (ids, name, isTeam, groupName, groupID) => {
    this.setState({
      isTransfer: true,
      transferIDs: ids,
      transferNames: name,
      transferCurrent: groupName,
      transferCurrentID: groupID,
      transferCurrentIsTeam: isTeam,
    });
  }
  hideTransfer = () => {
    this.setState({
      isTransfer: false,
      transferIDs: false,
      transferNames: [],
    });
  }
  showConfirmTransfer = (newIsTeam, newGroupID, newGroupName) => {
    this.setState({
      isConfirmTransfer: true,
      transferNewIsTeam: newIsTeam,
      transferNewGroupID: newGroupID,
      transferNewGroupName: newGroupName,
    });
  }
  hideConfirmTransfer = () => {
    this.setState({
      isConfirmTransfer: false,
    });
  }
  confirmTransfer = () => {
    this.setState({
      isSavingLoading: true,
    });
    const { transferIDs, isTeam, transferCurrentID, transferNewIsTeam, transferNewGroupID } = this.state;
    this.props.transferToAnother(transferIDs, isTeam, transferCurrentID, transferNewIsTeam, transferNewGroupID);
  }
  hideTransferResponse = () => {
    this.setState({
      isTransferResponse: false,
      isSavingLoading: false,
      transferIDs: false,
      transferNames: [],
    });
    this.props.transferReset();
  }
  // #endregion

  render() {
    // Props
    const {
      enrollEmpData, enrollEmpError, unenrollEmpData, unenrollEmpError,
    } = this.props;
    const {
      createParentCat, createParentName, assignToID, isTeam, viewTemplateName,
    } = this.state;

    let tempName = viewTemplateName;
    if (viewTemplateName === 'WorkStat') tempName = 'Work Status';
    if (viewTemplateName === 'DeskConfig') tempName = 'Desktop Configuration';
    if (viewTemplateName === 'Payroll') tempName = 'Payroll Cutoff';

    // Workgroup list props
    const workGroupListProps = {
      breadcrumbs: this.breadcrumbs,
      gotoBreadcrumbs: this.gotoBreadcrumbs,
      showCreateDept: this.showCreateDialog,
      showEmpList: this.showEmployeeList,
      showTemplateList: this.showTemplateList,
      showDetails: this.showViewGroupDetails,
      showDelete: this.showDeleteGroup,
      showRename: this.showRenameGroup,
      teamID: this.state.teamID,
    };

    // Employee list props
    const employeeListProps = {
      groupName: this.state.selectedGroupName,
      deptID: this.state.deptID,
      teamID: this.state.teamID,
      isTeam: this.state.isTeam,
      isEnrolled: this.state.isEnrolled,
      isTransfer: this.state.isTransferring,
      assignHead: this.assignHead,
      disable: this.showDisableEmp,
      showTemplateList: this.showTemplateList,
      showTransfer: this.showTransfer,
    };

    // Template list props
    const templateListProps = {
      groupName: this.state.selectedGroupName,
      assignToID: this.state.assignToID,
      isTeam: this.state.isTeam,
      templateCat: this.state.templateCat,
      cancel: this.hideTemplateList,
      assign: this.showConfirmAssignTemplate,
      assignTo: this.state.assignTo,
    };

    // View Details props
    const viewDetailsProps = {
      isTeam: this.state.isTeam,
      details: this.state.viewGroupDetails,
      groupID: this.state.assignToID,
      groupName: this.state.assignToName,
      view: this.viewTemplateDetails,
      showTemplateList: this.showTemplateList,
      unassign: this.showConfirmUnassignTemplate,
    };

    // View Template Details props
    const viewTemplateDetailsProps = {
      name: this.state.viewTemplateName,
      data: this.state.viewTemplateData,
    };

    // Transfer props
    const transferProps = {
      oldIsTeam: this.state.isTeam,
      ids: this.state.transferIDs,
      names: this.state.transferNames,
      current: this.state.transferCurrent,
      cancel: this.hideTransfer,
      confirm: this.showConfirmTransfer,
    };

    let transferNames = 'Selected Employees';
    if (this.state.transferNames.length === 1) {
      transferNames = this.state.transferNames[0].name;
    }

    return (
      <PageWrap>
        <Helmet>
          <title>WorkGroup</title>
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Section>
              <H2>WorkGroup</H2>
              <WorkGroupList {...workGroupListProps} />
            </Section>
          </PageContent>
        </Main>
        <Footer />

        {/* View Details */}
        <Dialog
          show={this.state.isViewGroupDetails}
          title={`${this.state.assignToName} Details`}
          onClose={this.hideViewGroupDetails}
          showCloseBtn
          width="700px"
        >
          <ViewDetails {...viewDetailsProps} />
        </Dialog>

        {/* Create Groups */}
        <Dialog
          show={this.state.createDeptDialog}
          onClose={this.hideCreateDialog}
          showCloseBtn
          title={`Create ${(this.state.createParentCat === 'Company') ? 'Department' : 'Team'}`}
          view="dept"
        >
          {(this.state.isSavingLoading) && <div className="loading-cont"><Loading /></div>}
          <div className="create">
            <p className="label">{(this.state.createParentCat)} Name</p>
            <p>{this.state.createParentName}</p>
            <p className="label">{(this.state.createParentCat === 'Company') ? 'Department' : 'Team'} Name:</p>
            <Input type="text" onChange={this.createGroupOnChange} className={(this.state.createInputError) && 'error'} />
            {this.state.createInputError && <small>*Please fill out this field</small>}
          </div>
          <ButtonWrapper>
            <Button handleRoute={this.submitCreateGroup} title="Save">Save</Button>
            <Button color="gray" handleRoute={this.hideCreateDialog}>Cancel</Button>
          </ButtonWrapper>
        </Dialog>
        <Dialog
          show={this.state.createSuccess}
          // onClick={this.hideCreateSuccess}
          title="SUCCESS"
        >
          <div className="center">
            <p>You have successfully created {this.state.createInputValue}</p>
            {/* <p>{this.state.createInputValue}</p> */}
            { (createParentCat === 'Company') &&
              <Button color="green" handleRoute={(e) => { this.showCreateDialog(e, createParentName, assignToID, createParentCat, isTeam); }}>ADD ANOTHER DEPARTMENT</Button>
            }
            { (createParentCat === 'Department' || createParentCat === 'Team') &&
              <Button color="green" handleRoute={(e) => { this.showCreateDialog(e, createParentName, assignToID, createParentCat, isTeam); }}>ADD ANOTHER {(createParentCat === 'Team') ? 'SUB TEAM' : 'TEAM'}</Button>
            }
          </div>
          <ButtonWrapper>
            <Button color="gray" handleRoute={this.hideCreateSuccess}>DONE</Button>
          </ButtonWrapper>
        </Dialog>
        {/* Delete Group */}
        <Confirm
          show={this.state.isDeleteGroup}
          title="CONFIRMATION"
          onClick={this.confirmDeleteGroup}
          onClose={this.hideDeleteGroup}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
        >
          {(this.state.isSavingLoading) && <div className="loading-cont"><Loading /></div>}
          <p>Are you sure you want to delete <br /><span className="green">{this.state.deleteGroupName}</span>?</p>
        </Confirm>
        <Confirm
          show={this.state.isDeleteGroupResponse}
          title={(this.props.deleteGroupSuccess) ? 'SUCCESS' : 'FAILED'}
          onClick={this.hideDeleteGroupResponse}
          okBtnText="OK"
        >
          {(this.props.deleteGroupSuccess) && <p>You have successfully deleted {this.state.deleteGroupName}.</p>}
          {(this.props.deleteGroupError) && <p>There was a problem deleting {this.state.deleteGroupName}. Please try again later.</p>}
        </Confirm>
        {/* Rename Group */}
        <Dialog
          show={this.state.isRenameGroup}
          onClose={this.hideRenameGroup}
          showCloseBtn
          title="Rename"
        >
          <div className="create">
            <p className="label">Current Name</p>
            <p>{this.state.renameGroupOldName}</p>
            <p className="label">New Name</p>
            <Input type="text" onChange={this.renameInputChange} className={(this.state.renameInputError) && 'error'} />
            {this.state.renameInputError && <small>*Please fill out this field</small>}
          </div>
          <ButtonWrapper>
            <Button handleRoute={this.confirmRenameGroup} title="Save">Save</Button>
            <Button color="gray" handleRoute={this.hideRenameGroup}>Cancel</Button>
          </ButtonWrapper>
        </Dialog>
        <Confirm
          show={this.state.isRenameGroupConfirm}
          title="CONFIRMATION"
          onClick={this.submitRenameGroup}
          onClose={this.hideRenameGroup}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
        >
          {(this.state.isSavingLoading) && <div className="loading-cont"><Loading /></div>}
          <p>Are you sure you want to rename <br /><span className="green">{this.state.renameGroupOldName}</span> to <span className="green">{this.state.renameGroupNewName}</span>?</p>
        </Confirm>
        <Confirm
          show={this.state.isRenameGroupResponse}
          title={(this.props.renameGroupSuccess) ? 'SUCCESS' : 'FAILED'}
          onClick={this.hideRenameGroupResponse}
          okBtnText="OK"
        >
          {(this.props.renameGroupSuccess) && <p>You have successfully renamed {this.state.renameGroupOldName} to {this.state.renameGroupNewName}.</p>}
          {(this.props.renameGroupError) && <p>There was a problem renaming {this.state.renameGroupOldName}. Please try again later.</p>}
        </Confirm>

        {/* View Template Details */}
        <Dialog
          show={this.state.isViewTemplateDetails}
          onClose={this.closeViewTemplateDetails}
          showCloseBtn
          title={`${tempName} Template Details`}
          width={this.state.viewTemplateWidth}
        >
          <TemplateDetails {...viewTemplateDetailsProps} />
        </Dialog>

        {/* Employee list modal */}
        <Dialog
          show={this.state.employeeList}
          onClose={this.hideEmployeeList}
          showCloseBtn
          title={(this.state.isEnrolled) ? (!this.state.isTransferring ? 'View Employee List' : 'Transfer Employees') : 'Enroll Employees'} // eslint-disable-line no-nested-ternary
        >
          <EmployeeList {...employeeListProps} />
        </Dialog>

        {/* Enrollment of Employee Success and Error */}
        <Confirm
          show={this.state.confirmEnrollEmpSuccess}
          title="SUCCESS"
          onClick={this.hideConfirmEnrollEmp}
          okBtnText="OK"
        >
          <p>Selected employees have succesfully been added.</p>
        </Confirm>
        <Confirm
          show={this.state.confirmEnrollEmpError}
          title="FAILED"
          onClick={this.hideConfirmEnrollEmp}
          okBtnText="OK"
        >
          {(enrollEmpError.ErrorCode === 200)
            ? enrollEmpData.map((item) =>
              <p>{item}</p>
            )
            : <p>There was a problem communicating with the server. Please try again later.</p>
          }
        </Confirm>

        {/* UnEnrollment of Employee Success and Error */}
        <Confirm
          show={this.state.confirmUnenrollEmpSuccess}
          title="SUCCESS"
          onClick={this.hideConfirmUnEnrollEmp}
          okBtnText="OK"
        >
          <p>Selected employees have succesfully<br />been removed from the list.</p>
        </Confirm>
        <Confirm
          show={this.state.confirmUnenrollEmpError}
          title="FAILED"
          onClick={this.hideConfirmUnEnrollEmp}
          okBtnText="OK"
        >
          {(unenrollEmpError.ErrorCode === 200)
            ? unenrollEmpData.map((item) =>
              <p>{item}</p>
            )
            : <p>There was a problem communicating with the server. Please try again later.</p>
          }
        </Confirm>

        {/* Assign employee as head */}
        <Confirm
          show={this.state.isConfirmAssignHead}
          title="CONFIRMATION"
          onClick={this.confirmAssignHead}
          onClose={this.hideConfirmAssignHead}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
        >
          <p>Are you sure you want to assign <br /><span className="green">{this.state.employeeName}</span> as {(this.state.isTeam) ? 'Team' : 'Department'} head for <span className="green">{this.state.selectedGroupName}</span>.</p>
        </Confirm>
        <Confirm
          show={this.state.isConfirmAssignHeadSuccess}
          title="SUCCESS"
          onClick={this.hideConfirmAssignHeadResult}
          okBtnText="OK"
        >
          <p>Selected employee have succesfully<br />been assigned.</p>
        </Confirm>
        <Confirm
          show={this.state.isConfirmAssignHeadError}
          title="FAILED"
          onClick={this.hideConfirmAssignHeadResult}
          okBtnText="OK"
        >
          <p>There was a problem communicating with the server. Please try again later.</p>
        </Confirm>

        {/* Template List and Assign Success/Error */}
        <Dialog
          show={this.state.isTemplateList}
          title={`${this.state.templateListName} Templates`}
        >
          <TemplateList {...templateListProps} />
        </Dialog>
        <Confirm
          show={this.state.isConfirmAssignTemplate}
          title="CONFIRMATION"
          onClick={this.confirmAssign}
          onClose={this.hideConfirmAssignTemplate}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
        >
          <p>Are you sure you want to assign <br /><span className="green">{this.state.templateName}</span> to <span className="green">{this.state.assignToName}</span>.</p>
        </Confirm>
        <Confirm
          show={this.state.isAssignTemplateSuccess}
          title="SUCCESS"
          onClick={this.hideAssignTemplateConfirm}
          okBtnText="OK"
        >
          <p>Selected template has been successfully assigned.</p>
        </Confirm>
        <Confirm
          show={this.state.isAssignTemplateError}
          title="FAILED"
          onClick={this.hideAssignTemplateConfirm}
          okBtnText="OK"
        >
          <p>There was a problem communicating with the server. Please try again later.</p>
        </Confirm>
        {/* Disable Employee */}
        <Confirm
          show={this.state.isDisableEmp}
          title="DISABLE ACCOUNT"
          onClick={this.confirmDisableEmp}
          onClose={this.hideDisableEmp}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
        >
          {(this.state.isSavingLoading) && <div className="loading-cont"><Loading /></div>}
          <p>Are you sure you want to disable <br /><span className="text-green">{this.state.disableEmpName}</span>&apos;s account?</p>
        </Confirm>
        <Confirm
          show={this.state.isDisableEmpResponse}
          title={(this.props.disableEmpSuccess) ? 'SUCCESS' : 'FAILED'}
          onClick={this.hideDisableResponse}
          okBtnText="OK"
        >
          {(this.props.disableEmpSuccess) && <p>You have successfully disabled {this.state.disableEmpName} account.</p>}
          {(this.props.disableEmpError) && <p>There was a problem disabling {this.state.disableEmpName} account. Please try again later.</p>}
        </Confirm>
        {/* Unassign template */}
        <Confirm
          show={this.state.isConfirmUnassignTemplate}
          title="UNASSIGN TEMPLATE"
          onClick={this.confirmUnassignTemplate}
          onClose={this.hideConfirmUnassignTemplate}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
        >
          {(this.state.isSavingLoading) && <div className="loading-cont"><Loading /></div>}
          <p>Are you sure you want to unassign <br /><span className="text-green">{this.state.templateName}</span> template?</p>
        </Confirm>
        <Confirm
          show={this.state.isUnassignTemplateResponse}
          title={(this.props.unassignTemplateSuccess) ? 'SUCCESS' : 'FAILED'}
          onClick={this.hideUnassignTemplateResponse}
          okBtnText="OK"
        >
          {(this.props.unassignTemplateSuccess) && <p>You have successfully unassigned <span className="text-green">{this.state.templateName}</span> template.</p>}
          {(this.props.unassignTemplateError) && <p>There was a problem unassigning <span className="text-green">{this.state.templateName}</span> template. Please try again later.</p>}
        </Confirm>
        {/* Transfer of employee/dept */}
        <Dialog
          show={this.state.isTransfer}
          title={`Transfer ${(this.state.isTeam) ? 'Team' : 'Employee'}`}
          width="650px"
        >
          <Transfer {...transferProps} />
        </Dialog>
        <Confirm
          show={this.state.isConfirmTransfer}
          title="TRANSFER"
          onClick={this.confirmTransfer}
          onClose={this.hideConfirmTransfer}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
        >
          {(this.state.isSavingLoading) && <div className="loading-cont"><Loading /></div>}
          <p>Are you sure you want to transfer <br /><span className="text-green">{transferNames}</span> to <span className="text-green">{this.state.transferNewGroupName}</span>?</p>
        </Confirm>
        <Confirm
          show={this.state.isTransferResponse}
          title={(this.props.transferSuccess) ? 'SUCCESS' : 'FAILED'}
          onClick={this.hideTransferResponse}
          okBtnText="OK"
        >
          {(this.props.transferSuccess) && <p>You have successfully transferred <span className="text-green">{transferNames}</span> to <span className="text-green">{this.state.transferNewGroupName}</span>.</p>}
          {(this.props.transferError) && <p>There was a problem transferring <span className="text-green">{transferNames}</span>. Please try again later.</p>}
        </Confirm>
      </PageWrap>
    );
  }
}

WorkGroupPage.propTypes = {
  location: PropTypes.object,
  isGroupTeam: PropTypes.bool,
  groupID: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  enrollEmpData: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  enrollEmpSuccess: PropTypes.bool,
  enrollEmpError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  unenrollEmpData: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  unenrollEmpSuccess: PropTypes.bool,
  unenrollEmpError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  assignHeadSuccess: PropTypes.bool,
  assignHeadError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  assignTemplateSuccess: PropTypes.bool,
  assignTemplateError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  disableEmpSuccess: PropTypes.bool,
  disableEmpError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  createGroupSuccess: PropTypes.bool,
  // createGroupError: PropTypes.oneOfType([
  //   PropTypes.bool,
  //   PropTypes.object,
  // ]),
  deleteGroupSuccess: PropTypes.bool,
  deleteGroupError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  renameGroupSuccess: PropTypes.bool,
  renameGroupError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  unassignTemplateSuccess: PropTypes.bool,
  unassignTemplateError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  transferSuccess: PropTypes.bool,
  transferError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  // Function dispatch props
  clearState: PropTypes.func,
  // retrieveRefsData: PropTypes.func,
  retrieveGroupList: PropTypes.func,
  retrieveEmpList: PropTypes.func,
  resetEnrollEmpSuccess: PropTypes.func,
  resetUnEnrollEmpSuccess: PropTypes.func,
  assignEmpAsHead: PropTypes.func,
  resetAssignEmpAsHead: PropTypes.func,
  assignTemplate: PropTypes.func,
  resetAssignTemplateSuccess: PropTypes.func,
  createGroup: PropTypes.func,
  createGroupReset: PropTypes.func,
  deleteGroup: PropTypes.func,
  deleteGroupReset: PropTypes.func,
  renameGroup: PropTypes.func,
  renameGroupReset: PropTypes.func,
  disableEmp: PropTypes.func,
  disableEmpReset: PropTypes.func,
  viewDetails: PropTypes.func,
  unassignTemplate: PropTypes.func,
  unassignTemplateReset: PropTypes.func,
  transferToAnother: PropTypes.func,
  transferReset: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isGroupTeam: makeSelectIsTeam('groupList'),
  groupID: makeSelectID('groupList'),
  enrollEmpData: makeSelectData('enrollEmp'),
  enrollEmpSuccess: makeSelectSuccess('enrollEmp'),
  enrollEmpError: makeSelectError('enrollEmp'),
  unenrollEmpData: makeSelectData('unenrollEmp'),
  unenrollEmpSuccess: makeSelectSuccess('unenrollEmp'),
  unenrollEmpError: makeSelectError('unenrollEmp'),
  assignHeadSuccess: makeSelectSuccess('assignHead'),
  assignHeadError: makeSelectError('assignHead'),
  assignTemplateSuccess: makeSelectSuccess('assignTemplate'),
  assignTemplateError: makeSelectError('assignTemplate'),
  createGroupSuccess: makeSelectSuccess('create'),
  createGroupError: makeSelectError('create'),
  deleteGroupSuccess: makeSelectSuccess('delete'),
  deleteGroupError: makeSelectError('delete'),
  renameGroupSuccess: makeSelectSuccess('rename'),
  renameGroupError: makeSelectError('rename'),
  disableEmpSuccess: makeSelectSuccess('disableEmp'),
  disableEmpError: makeSelectError('disableEmp'),
  unassignTemplateSuccess: makeSelectSuccess('unassignTemplate'),
  unassignTemplateError: makeSelectError('unassignTemplae'),
  transferSuccess: makeSelectSuccess('transfer'),
  transferError: makeSelectError('transfer'),
});

function mapDispatchToProps(dispatch) {
  return {
    clearState: () => dispatch(clearState()),
    // retrieveRefsData: () => dispatch(getRefs()),
    retrieveGroupList: (id, isTeam) => dispatch(getGroupList(id, isTeam)),
    retrieveEmpList: (id, isTeam, isEnrolled, isAll, search, page) => dispatch(getEmpList(id, isTeam, isEnrolled, isAll, search, page)),
    resetEnrollEmpSuccess: () => dispatch(getEnrollEmpReset()),
    resetUnEnrollEmpSuccess: () => dispatch(getUnEnrollEmpReset()),
    assignEmpAsHead: (empID, groupID, isTeam) => dispatch(getAssignEmpHead(empID, groupID, isTeam)),
    resetAssignEmpAsHead: () => dispatch(getAssignEmpHeadReset()),
    assignTemplate: (templateID, assignToID, assignTo, templateCat) => dispatch(getAssignTemplate(templateID, assignToID, assignTo, templateCat)),
    resetAssignTemplateSuccess: () => dispatch(getAssignTemplateReset()),
    createGroup: (name, isTeam, groupID) => dispatch(getCreateNew(name, isTeam, groupID)),
    createGroupReset: () => dispatch(getCreateNewReset()),
    deleteGroup: (id, isTeam) => dispatch(getDeleteGroup(id, isTeam)),
    deleteGroupReset: () => dispatch(getDeleteGroupReset()),
    renameGroup: (name, id, headID, isTeam) => dispatch(getRenameGroup(name, id, headID, isTeam)),
    renameGroupReset: () => dispatch(getRenameReset()),
    disableEmp: (id, status) => dispatch(getDisableAccount(id, status)),
    disableEmpReset: () => dispatch(getDisableAccountReset()),
    viewDetails: (id, isTeam) => dispatch(getViewDetails(id, isTeam)),
    unassignTemplate: (id, isTeam, name) => dispatch(getUnassignTemplate(id, isTeam, name)),
    unassignTemplateReset: () => dispatch(getUnassignTemplateReset()),
    transferToAnother: (empID, oldIsTeam, oldGroupID, newIsTeam, newGroupID) => dispatch(getTransfer(empID, oldIsTeam, oldGroupID, newIsTeam, newGroupID)),
    transferReset: () => dispatch(getTransferReset()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'workgroup', reducer });
const withSaga = injectSaga({ key: 'workgroup', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WorkGroupPage);
