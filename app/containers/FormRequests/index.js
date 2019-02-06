/*
 * Form Requests Page
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { PropTypes } from 'prop-types';
import 'components/datepicker.css';
import moment from 'moment';

/* Font Awesome */
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faFileAlt,
} from '@fortawesome/fontawesome-free-solid';

/* Global References */
// import injectReducer from 'utils/injectReducer';
// import injectSaga from 'utils/injectSaga';

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

/* Admin Panels Component */
import Button from 'components/AdminPanels';
import Flex from 'components/AdminPanels/Flex';

/* Form Request Static ID */
import { WF_FORMTYPEID } from 'containers/App/constants';

import { makeSelectRefs } from 'containers/HomePage/selectors';

/* Form Requests Components */
import OTRequest from './OTRequest';
import COERequest from './COERequest';
import ShiftScheduleFormRequest from './ShiftScheduleFormRequest';
import GovernmentForms from './GovernmentForms';
import IncidentReportFormRequest from './IncidentReportFormRequest';
import ReturnToWorkOrderRequest from './ReturnToWorkOrderRequest';
import LeaveConversionFormRequest from './LeaveConversionFormRequest';
import TerminationFormRequest from './TerminationFormRequest';
import ShowCauseMemoForms from './ShowCauseMemoForms';
import ShowRequestHearingForms from './ShowRequestHearingForms';
import HRFRequest from './HRFRequest';
import DTRRequest from './DTRRequest';


export class FormRequests extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isOTForm: false,
      isCOEForm: false,
      isShiftScheduleForm: false,
      isIncidentReportForm: false,
      isReturnToWorkOrderForm: false,
      isLeaveConversionForm: false,
      isTerminationForm: false,
      isShowCauseMemoForm: false,
      isShowRequestHearingForm: false,
      isHRF: false,
      isDTRReconciliation: false,
      isSuccessMessage: false,
      isErrorMessage: false,
      customFormTitle: false,
      customFormId: false,
      attachmentLink: false,
    };
  }
  componentDidMount() {
    const mainWrapper = document.getElementById('mainWrapper');
    // Remove show class in our main wrapper
    mainWrapper.classList.remove('show');
  }
  // Shows OT Request Form
  showOTRequestForm = () => this.setState({ isOTForm: !this.state.isOTForm });

  // Shows COE Request Form
  showCOERequestForm = () => this.setState({ isCOEForm: !this.state.isCOEForm });

  // Shows Shift Schedule Request Form
  showShiftScheduleForm = () => this.setState({ isShiftScheduleForm: !this.state.isShiftScheduleForm });

  // Show Incident Report Form
  showIncidentReportForm = (customFormTitle) => this.setState({ isIncidentReportForm: !this.state.isIncidentReportForm, customFormTitle });

  // Show Return To Work Order Form
  showReturnToWorkOrderForm = (customFormTitle) => this.setState({ isReturnToWorkOrderForm: !this.state.isReturnToWorkOrderForm, customFormTitle });

  // Show Leave Conversion Form
  showLeaveConversionForm = (customFormTitle) => this.setState({ isLeaveConversionForm: !this.state.isLeaveConversionForm, customFormTitle });

  // Show Termination Form
  showTerminationForm = (customFormTitle) => this.setState({ isTerminationForm: !this.state.isTerminationForm, customFormTitle });

  // Show Cause Memo Form
  showCauseMemoForm = (customFormTitle) => this.setState({ isShowCauseMemoForm: !this.state.isShowCauseMemoForm, customFormTitle });
  // Show Request Hearing Form
  showRequestHearingForm = (customFormTitle) => this.setState({ isShowRequestHearingForm: !this.state.isShowRequestHearingForm, customFormTitle });
  // Show HRF
  showHRF = (customFormTitle) => this.setState({ isHRF: !this.state.isHRF, customFormTitle });
  // Show DTR
  showDTRReconciliation = (customFormTitle) => this.setState({ isDTRReconciliation: !this.state.isDTRReconciliation, customFormTitle });
  // Goverment Forms
  showGovermentForm = (name, wfid, filePath) => {
    this.setState({
      govTitle: name,
      govId: wfid,
      govAttach: filePath,
      isGovernmentForm: !this.state.isGovernmentForm,
    });
  }
  // Close government form modal
  closeGovDialog = () => this.setState({ isGovernmentForm: false });
  // Dismiss Success Modal Prompt
  dismissSuccessMessage = () => {
    this.setState({
      isGovernmentForm: false,
      isOTForm: false,
      isCOEForm: false,
      isShiftScheduleForm: false,
      isSuccessMessage: false,
      showCustomForms: false,
      isIncidentReportForm: false,
      isReturnToWorkOrderForm: false,
      isLeaveConversionForm: false,
      isTerminationForm: false,
      isShowCauseMemoForm: false,
      isShowRequestHearingForm: false,
      isHRF: false,
      isDTRReconciliation: false,
      govTitle: false,
      govId: false,
      govAttach: [],
    });
  }

  render() {
    const { showDTRFormsRefs } = this.props;
    const { isOTForm, isCOEForm, isShiftScheduleForm, isIncidentReportForm, isReturnToWorkOrderForm, isLeaveConversionForm, isShowCauseMemoForm, isShowRequestHearingForm, isHRF, isGovernmentForm, isDTRReconciliation, isTerminationForm, govTitle, govId, govAttach } = this.state;
    let govermentforms; let shiftdate;
    // if (showDTRFormsRefs) {
    //   shiftdate = showDTRFormsRefs.map((item) => item.EmpProfileBasicDetails.FirstName);
    // }
    // console.log(shiftdate);

    if (this.props.showCustomFormsRefs === false) govermentforms = <div>Something went wrong, please try again.</div>;
    // Show referrences lists
    if (this.props.showCustomFormsRefs) {
      govermentforms = this.props.showCustomFormsRefs.map((item) =>
      ((item.WorkFlowFormTypeID === WF_FORMTYPEID) && <span key={item.WorkFlowFormID}>
        <Button onClick={(e) => { e.preventDefault(); this.showGovermentForm(item.Name, item.WorkFlowFormID, item.WorkFlowFormAttachList); }} smallSpacing>
          <FontAwesomeIcon icon={faFileAlt} />
          <span>{item.Name}</span>
        </Button>
      </span>));
    }
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
              <H2>Form Request</H2>
              <Flex>
                {/* Note: Remove the deadBtn={true} and onClick={this.noLink}
                    props when we have the pages ready
                */}
                <Button to="/forms/leave-request" smallSpacing>
                  <FontAwesomeIcon icon={faFileAlt} />
                  <span>Leave Request</span>
                </Button>
                {/* <Button deadBtn onClick={(e) => { e.preventDefault(); }} smallSpacing>
                  <FontAwesomeIcon icon={faFileAlt} />
                  <span>IRF</span>
                </Button> */}
                <Button onClick={(e) => { e.preventDefault(); this.showOTRequestForm(); }} smallSpacing>
                  <FontAwesomeIcon icon={faFileAlt} />
                  <span>OT Form</span>
                </Button>
                <Button onClick={(e) => { e.preventDefault(); this.showCOERequestForm(); }} smallSpacing>
                  <FontAwesomeIcon icon={faFileAlt} />
                  <span>COE Request</span>
                </Button>
                <Button onClick={(e) => { e.preventDefault(); this.showLeaveConversionForm(); }} smallSpacing>
                  <FontAwesomeIcon icon={faFileAlt} />
                  <span>LCF</span>
                </Button>
                <Button onClick={(e) => { e.preventDefault(); this.showIncidentReportForm(); }} smallSpacing>
                  <FontAwesomeIcon icon={faFileAlt} />
                  <span>IRF</span>
                </Button>
              </Flex>
            </Section>
            <Section>
              <H2>Admin Forms</H2>
              <Flex>
                <Button onClick={(e) => { e.preventDefault(); this.showShiftScheduleForm(); }} smallSpacing>
                  <FontAwesomeIcon icon={faFileAlt} />
                  <span>Shift Schedule</span>
                </Button>
                <Button onClick={(e) => { e.preventDefault(); this.showReturnToWorkOrderForm(); }} smallSpacing grayIcon>
                  <FontAwesomeIcon icon={faFileAlt} />
                  <span>Return to Work Order</span>
                </Button>
                <Button onClick={(e) => { e.preventDefault(); this.showTerminationForm(); }} smallSpacing>
                  <FontAwesomeIcon icon={faFileAlt} />
                  <span>Notice of Termination Form</span>
                </Button>
                <Button onClick={(e) => { e.preventDefault(); this.showCauseMemoForm(); }} smallSpacing grayIcon>
                  <FontAwesomeIcon icon={faFileAlt} />
                  <span>Show Cause Memo Form</span>
                </Button>
                <Button onClick={(e) => { e.preventDefault(); this.showRequestHearingForm(); }} smallSpacing grayIcon>
                  <FontAwesomeIcon icon={faFileAlt} />
                  <span>Show Request Hearing Form</span>
                </Button>
                <Button onClick={(e) => { e.preventDefault(); this.showHRF(); }} smallSpacing grayIcon>
                  <FontAwesomeIcon icon={faFileAlt} />
                  <span>HRF</span>
                </Button>
                <Button onClick={(e) => { e.preventDefault(); this.showDTRReconciliation(); }} smallSpacing grayIcon>
                  <FontAwesomeIcon icon={faFileAlt} />
                  <span>DTR Reconciliation</span>
                </Button>
              </Flex>
            </Section>
            <Section>
              <H2>Government Forms</H2>
              <Flex>
                {govermentforms}
              </Flex>
            </Section>
          </PageContent>
        </Main>
        <Footer />
        {/*
          * Form Request Components
          * OT, COE Request, Shift Schedule Forms, SSS Member Loan Application, PagIbig MultiPurpose Application, BIR Form 1902, BIR Form 1905, BIR Form 2305, SSS Maternity Notification, Philhealth Claim Form, SSS Sickness Notification, SSS Sickness Benefit
          * Incident Report Form and other types forms.
        */}
        {(isOTForm) && <OTRequest show={isOTForm} close={this.dismissSuccessMessage} />}
        {(isCOEForm) && <COERequest show={isCOEForm} close={this.dismissSuccessMessage} />}
        {(isShiftScheduleForm) && <ShiftScheduleFormRequest show={isShiftScheduleForm} close={this.dismissSuccessMessage} />}
        {(isIncidentReportForm) && <IncidentReportFormRequest show={isIncidentReportForm} close={this.dismissSuccessMessage} title={this.state.customFormTitle} />}
        {(isReturnToWorkOrderForm) && <ReturnToWorkOrderRequest show={isReturnToWorkOrderForm} close={this.dismissSuccessMessage} title={this.state.customFormTitle} />}
        {(isLeaveConversionForm) && <LeaveConversionFormRequest show={isLeaveConversionForm} close={this.dismissSuccessMessage} title={this.state.customFormTitle} />}
        {(isTerminationForm) && <TerminationFormRequest show={this.state.isTerminationForm} close={this.dismissSuccessMessage} title={this.state.customFormTitle} />}
        {(isShowCauseMemoForm) && <ShowCauseMemoForms show={isShowCauseMemoForm} close={this.dismissSuccessMessage} title={this.state.customFormTitle} />}
        {(isShowRequestHearingForm) && <ShowRequestHearingForms show={isShowRequestHearingForm} close={this.dismissSuccessMessage} title={this.state.customFormTitle} />}
        {(isHRF) && <HRFRequest show={isHRF} close={this.dismissSuccessMessage} title={this.state.customFormTitle} />}
        {(isDTRReconciliation) && <DTRRequest show={isDTRReconciliation} close={this.dismissSuccessMessage} title={this.state.customFormTitle} />}
        {isGovernmentForm && <GovernmentForms show={isGovernmentForm} close={this.closeGovDialog} title={govTitle} govid={govId} attachment={govAttach} />}
      </PageWrap>
    );
  }
}
FormRequests.propTypes = {
  location: PropTypes.object,
  showCustomFormsRefs: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  // showDTRFormsRefs: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  showCustomFormsRefs: makeSelectRefs('customFormRefs'),
  // showDTRFormsRefs: makeSelectObjectList('referrences'),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect
)(FormRequests);
