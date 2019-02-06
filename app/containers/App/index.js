/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

/* Containers */
import LoginPage from 'containers/LoginPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';

/* Form Requests Page */
import FormRequests from 'containers/FormRequests/Loadable';
import LeaveRequest from 'containers/FormRequests/LeaveRequest/Loadable';

/* HR Admin Pages */
import HRAdmin from 'containers/HRPages/Loadable';
import OnBoarding from 'containers/HRPages/OnBoarding/Loadable';
import PPERequirements from 'containers/HRPages/PPERequirements/Loadable';
import HREMPList from 'containers/HRPages/EmployeeList/Loadable';
import CompenBen from 'containers/HRPages/CompenBenTemplate/Loadable';
import HRAccessPermission from 'containers/HRPages/AccessPermissions/Loadable';
import HRLeaveListings from 'containers/HRPages/Listings/LeaveRequests/Loadable';
import HRCustomFormListings from 'containers/HRPages/Listings/OtherForms/Loadable';
import HRCOERequestListings from 'containers/HRPages/Listings/COERequests/Loadable';
import HRLCFRequestListings from 'containers/HRPages/Listings/LeaveConversionRequests/Loadable';
import HROTRequestListings from 'containers/HRPages/Listings/OTRequests/Loadable';

/* WorkForce Pages */
import WFAdmin from 'containers/WorkForcePages/Loadable';
import WFEmpMasterList from 'containers/WorkForcePages/EmployeeList/Loadable';
import WFFloorStatusList from 'containers/WorkForcePages/FloorStatusList/Loadable';
import WFFloorStatus from 'containers/WorkForcePages/FloorStatus/Loadable';
import WFShift from 'containers/WorkForcePages/ShiftTemplate/Loadable';
import WFWorkStatus from 'containers/WorkForcePages/WorkStatus/Loadable';
import WFDesktopConfiguration from 'containers/WorkForcePages/DesktopConfiguration/Loadable';
import WFAccessPermissions from 'containers/WorkForcePages/AccessPermissions/Loadable';

/* IT Pages */
import ITAdmin from 'containers/ITPages/Loadable';
import ITEmpList from 'containers/ITPages/EmployeeList/Loadable';
import ITAccessPermissions from 'containers/ITPages/AccessPermissions/Loadable';
import ITAssetsAllocations from 'containers/ITPages/AssetsAllocations/Loadable';

/* Finance Pages */
import FinanceAdmin from 'containers/FinancePages/Loadable';
import DTR from 'containers/FinancePages/DTR/Loadable';
import Payroll from 'containers/FinancePages/PayrollProcessing/Loadable';
import PayrollCutOff from 'containers/FinancePages/PayrollCutOff/Loadable';
import FINEmpList from 'containers/FinancePages/EmployeeList/Loadable';
import FINAccessPermissions from 'containers/FinancePages/AccessPermissions/Loadable';

/* WorkGroups Pages */
import WorkGroup from 'containers/WorkGroup/Loadable';

/* Org Chart Page */
import OrgChart from 'containers/OrgChartPage/Loadable';
import OrgChartManager from 'containers/OrgChartPage/ManagerLevel/Loadable';
import OrgChartSupervisor from 'containers/OrgChartPage/SupervisorLevel/Loadable';

/* Calendar Pages */
import Calendar from 'containers/CalendarPage/Loadable';
import CalendarCreateNew from 'containers/CalendarPage/CreateNewTemplate/Loadable';
import CalendarSchedule from 'containers/CalendarPage/CalendarSchedule/Loadable';

/* Workflow and Approval */
import WorkflowAndApproval from 'containers/WorkflowAndApproval/Loadable';

/* Forms Approval Listings */
import FormsApprovalList from 'containers/FormsApproval/Loadable';

/* General Administration */
import GeneralAdmin from 'containers/GeneralAdmin/Loadable';
import GenAdminAccess from 'containers/GeneralAdmin/AccessPermissions/Loadable';

/* Page Not Found */
import NotFoundPage from 'containers/NotFoundPage/Loadable';

/* Global Component for Sagas */
import GlobalListener from 'containers/GlobalListener';

import PrivateRoute from './PrivateRoute';

const Wrapper = styled.div`
  width: 100%;
  margin: 0 0 0;
  padding: 0 0 0;
  height: 100%;
  overflow-x: hidden;

  .loading-cont {
    display: block;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255,255,255,.5);
    z-index: 10;
  }

  .error-msg,
  .api-error {
    font-size: 1.1em;
    text-align: center;
  }

  .api-error {
    padding: 15px 0;
  }

  @media screen and (max-width: 1023px) {
    &.show .sidebar {
      left: 0;
      overflow-y: auto;
    }

    &.show [class*="PageWrap_"] {
      left: 200px;
    }
  }
`;

export default function App() {
  return (
    <Wrapper id="mainWrapper">
      <Helmet titleTemplate="%s - Visaya KPO HCM" defaultTitle="Visaya KPO - Employee Management Portal">
        <meta name="description" content="Visaya KPO Employee Management Portal - Powered by Exceture, Inc." />
      </Helmet>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <PrivateRoute exact path="/home" component={HomePage} />
        <PrivateRoute exact path="/forms" component={FormRequests} />
        <PrivateRoute exact path="/forms/leave-request" component={LeaveRequest} />
        <PrivateRoute exact path="/hradmin" component={HRAdmin} />
        <PrivateRoute exact path="/hradmin/onboarding" component={OnBoarding} />
        <PrivateRoute exact path="/hradmin/ppe-requirements" component={PPERequirements} />
        <PrivateRoute exact path="/hradmin/employee-list" component={HREMPList} />
        <PrivateRoute exact path="/hradmin/compenben" component={CompenBen} />
        <PrivateRoute exact path="/hradmin/access-permissions" component={HRAccessPermission} />
        <PrivateRoute exact path="/hradmin/workflow-and-approval" component={WorkflowAndApproval} />
        <PrivateRoute exact path="/hradmin/leaverequests" component={HRLeaveListings} />
        <PrivateRoute exact path="/hradmin/customformrequests" component={HRCustomFormListings} />
        <PrivateRoute exact path="/hradmin/coerequests" component={HRCOERequestListings} />
        <PrivateRoute exact path="/hradmin/lcfrequests" component={HRLCFRequestListings} />
        <PrivateRoute exact path="/hradmin/otrequests" component={HROTRequestListings} />
        <PrivateRoute exact path="/workforce" component={WFAdmin} />
        <PrivateRoute exact path="/workforce/desktop-configuration" component={WFDesktopConfiguration} />
        <PrivateRoute exact path="/workforce/shift" component={WFShift} />
        <PrivateRoute exact path="/workforce/workstatus" component={WFWorkStatus} />
        <PrivateRoute exact path="/workforce/employee-list" component={WFEmpMasterList} />
        <PrivateRoute exact path="/workforce/floor-status-list" component={WFFloorStatusList} />
        <PrivateRoute exact path="/workforce/floor-status" component={WFFloorStatus} />
        <PrivateRoute exact path="/workforce/access-permissions" component={WFAccessPermissions} />
        <PrivateRoute exact path="/itadmin" component={ITAdmin} />
        <PrivateRoute exact path="/itadmin/employee-list" component={ITEmpList} />
        <PrivateRoute exact path="/itadmin/access-permissions" component={ITAccessPermissions} />
        <PrivateRoute exact path="/itadmin/assets-allocations" component={ITAssetsAllocations} />
        <PrivateRoute exact path="/finance" component={FinanceAdmin} />
        <PrivateRoute exact path="/finance/payroll-cutoff" component={PayrollCutOff} />
        <PrivateRoute exact path="/finance/dtr" component={DTR} />
        <PrivateRoute exact path="/finance/payroll" component={Payroll} />
        <PrivateRoute exact path="/finance/employee-list" component={FINEmpList} />
        <PrivateRoute exact path="/finance/access-permissions" component={FINAccessPermissions} />
        <PrivateRoute exact path="/workgroup" component={WorkGroup} />
        <PrivateRoute exact path="/org-chart" component={OrgChart} />
        <PrivateRoute exact path="/org-chart/manager" component={OrgChartManager} />
        <PrivateRoute exact path="/org-chart/supervisor" component={OrgChartSupervisor} />
        <PrivateRoute exact path="/calendar" component={Calendar} />
        <PrivateRoute exact path="/calendar/create-new" component={CalendarCreateNew} />
        <PrivateRoute exact path="/calendar/schedule" component={CalendarSchedule} />
        <PrivateRoute exact path="/forms-approval" component={FormsApprovalList} />
        <PrivateRoute exact path="/general-administration" component={GeneralAdmin} />
        <PrivateRoute exact path="/general-administration/access-permission" component={GenAdminAccess} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalListener />
    </Wrapper>
  );
}
