/*
 * Form Approval List Page
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import 'components/datepicker.css';

/* Global Components */
import PageWrap from 'components/PageWrap';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';
import PageContent from 'components/Main/PageContent';
import Sidebar from 'components/Sidebar';

/* Section Component */
import Section from 'components/Section';
import H2 from 'components/Section/H2';

/* Forms */
import Menus from 'components/Forms/Menus';

import LeaveRequests from './LeaveRequests';
import OTRequests from './OTRequests';
import COERequests from './COERequests';
import OtherForms from './OtherForms';
import LeaveConversionRequests from './LeaveConversionRequests';
import IncidentReportRequests from './IncidentReportRequests';
import ReturnToWorkOrderRequests from './ReturnToWorkOrderRequests';
import ShiftScheduleRequests from './ShiftScheduleRequests';
import TerminationRequests from './TerminationRequests';
import ShowCauseMemoRequests from './ShowCauseMemoRequests';
import ShowHearingRequests from './ShowHearingRequests';
import HRFRequests from './HRFRequests';
import DTRRequests from './DTRRequests';

export class FormApprovalPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectedMenu: 'Leaves',
      indexOfMenuName: 'Leave Requests',
    };
  }

  componentDidMount() {
    const mainWrapper = document.getElementById('mainWrapper');
    // Remove show class in our main wrapper
    mainWrapper.classList.remove('show');
  }

  toggleMobileSelectMenu = (e) => {
    const parent = e.currentTarget.parentNode;
    parent.classList.toggle('show');
  }

  selectForm = (e, name) => {
    e.preventDefault();

    // get all element in the list
    const childEl = e.currentTarget.parentNode.children;

    // get the clicked element
    const targetEl = e.currentTarget;

    // Iterate through all the element and toggle the class
    for (let i = 0; i < childEl.length; i += 1) {
      if (targetEl !== childEl[i]) {
        // Remove active class on all other child elements
        childEl[i].classList.remove('active');
      } else {
        // Add active class in the clicked element
        childEl[i].classList.add('active');
        // Set the name of selected menu in state
        this.setState({
          indexOfMenuName: childEl[i].children[1].innerHTML,
        });
        // Remove the show class in parent container to hide the menus
        const parent = childEl[i].parentNode.parentNode;
        parent.classList.remove('show');
      }
    }
    // This will be our reference on what component list to show
    this.setState({
      selectedMenu: name,
    });
  }

  render() {
    return (
      <PageWrap>
        <Helmet>
          <title>Form Requests</title>
          <meta name="description" content="HCM-EMP - Form Requests" />
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Section>
              <H2>Forms Approval Listings and Management</H2>
              <Menus>
                <p role="presentation" className="label" onClick={this.toggleMobileSelectMenu}>
                  <i className="fa fa-caret-down" />
                  <i className="fa fa-copy" />
                  <span>{this.state.indexOfMenuName}</span>
                  {/* <b className="count">(5)</b> */}
                </p>
                <div className="buttons" ref={(el) => { this.buttons = el; }}>
                  <button onClick={(e) => { this.selectForm(e, 'Leaves'); }} className="active">
                    <i className="fa fa-copy" />
                    <span>Leave Requests</span>
                    {/* <b className="count">(000)</b> */}
                  </button>
                  <button onClick={(e) => { this.selectForm(e, 'OT'); }}>
                    <i className="fa fa-copy" />
                    <span>OT Requests</span>
                    {/* <b className="count">(5)</b> */}
                  </button>
                  <button onClick={(e) => { this.selectForm(e, 'COE'); }}>
                    <i className="fa fa-copy" />
                    <span>COE Requests</span>
                    {/* <b className="count">(5)</b> */}
                  </button>
                  <button onClick={(e) => { this.selectForm(e, 'Govt'); }}>
                    <i className="fa fa-copy" />
                    <span>Government Forms Requests</span>
                    {/* <b className="count">(5)</b> */}
                  </button>
                  <button onClick={(e) => { this.selectForm(e, 'LeaveConversion'); }}>
                    <i className="fa fa-copy" />
                    <span>Leave Conversion Requests</span>
                  </button>
                  <button onClick={(e) => { this.selectForm(e, 'IncidentReport'); }}>
                    <i className="fa fa-copy" />
                    <span>Incident Report Requests</span>
                  </button>
                  <button onClick={(e) => { this.selectForm(e, 'ReturnToWorkOrder'); }}>
                    <i className="fa fa-copy" />
                    <span>Return To Work Order Requests</span>
                  </button>
                  <button onClick={(e) => { this.selectForm(e, 'ShiftSchedule'); }}>
                    <i className="fa fa-copy" />
                    <span>Shift Schedule Requests</span>
                    {/* <b className="count">(5)</b> */}
                  </button>
                  <button onClick={(e) => { this.selectForm(e, 'Termination'); }}>
                    <i className="fa fa-copy" />
                    <span>Termination Requests</span>
                    {/* <b className="count">(5)</b> */}
                  </button>
                  <button onClick={(e) => { this.selectForm(e, 'ShowCauseMemo'); }}>
                    <i className="fa fa-copy" />
                    <span>Show Cause Memo Requests</span>
                    {/* <b className="count">(5)</b> */}
                  </button>
                  <button onClick={(e) => { this.selectForm(e, 'ShowHearingRequest'); }}>
                    <i className="fa fa-copy" />
                    <span>Show Hearing Requests</span>
                  </button>
                  <button onClick={(e) => { this.selectForm(e, 'HeadCountRequest'); }}>
                    <i className="fa fa-copy" />
                    <span>HRF Requests</span>
                  </button>
                  <button onClick={(e) => { this.selectForm(e, 'DTRRequest'); }}>
                    <i className="fa fa-copy" />
                    <span>DTR Requests</span>
                  </button>
                </div>
              </Menus>

              {(this.state.selectedMenu === 'Leaves') && <LeaveRequests />}
              {(this.state.selectedMenu === 'OT') && <OTRequests />}
              {(this.state.selectedMenu === 'COE') && <COERequests />}
              {(this.state.selectedMenu === 'Govt') && <OtherForms />}
              {(this.state.selectedMenu === 'LeaveConversion') && <LeaveConversionRequests />}
              {(this.state.selectedMenu === 'IncidentReport') && <IncidentReportRequests />}
              {(this.state.selectedMenu === 'ReturnToWorkOrder') && <ReturnToWorkOrderRequests />}
              {(this.state.selectedMenu === 'ShiftSchedule') && <ShiftScheduleRequests />}
              {(this.state.selectedMenu === 'Termination') && <TerminationRequests />}
              {(this.state.selectedMenu === 'ShowCauseMemo') && <ShowCauseMemoRequests />}
              {(this.state.selectedMenu === 'ShowHearingRequest') && <ShowHearingRequests />}
              {(this.state.selectedMenu === 'HeadCountRequest') && <HRFRequests />}
              {(this.state.selectedMenu === 'DTRRequest') && <DTRRequests />}
            </Section>
          </PageContent>
        </Main>
        <Footer />
      </PageWrap>
    );
  }
}

FormApprovalPage.propTypes = {
  location: PropTypes.object,
};

export default FormApprovalPage;
