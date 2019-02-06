/*
 * Payroll Processing Page
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactPaginate from 'react-paginate';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/fontawesome-free-solid';

/* Global injectSaga and injectReducer */
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

/* Global Components */
import PageWrap from 'components/PageWrap';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';
import Sidebar from 'components/Sidebar';
import PageContent from 'components/Main/PageContent';
import H2 from 'components/Section/H2';
import Search from 'components/SearchFilter';
import Pagination from 'components/Pagination';
import Button from 'components/Button';
import Back from 'components/Section/Back';
// import Status from 'components/User/Status';
import EmployeeList from 'components/Employee/EMPAlphaFilter';
import Modal from 'components/Modal';
import Confirm from 'components/ConfirmationDialog';

import {
  makeSelectRefs,
} from 'containers/HomePage/selectors';

// import Table from '../Table';
import Grid from '../Grid';
import Dates from '../GridDates';
import List from '../GridList';
import Details from '../GridDetails';
import Content from '../GridContent';
import Filter from '../Filter';
// import H3 from '../H3';
// import Waive from '../Waive';
// import DisputeNote from './DisputeNote';
import PayrollForm from './PayrollForm';
import GenerateReport from './GenerateReport';

// Sections
import EmpList from './EmpList';
import PayrollDateList from './PayrollDateList';
import PayrollCutoffInfo from './PayrollCutoffInfo';
import PayrollReviewInfo from './PayrollReviewInfo';
import Deductions from './Deductions';
import Earnings from './Earnings';

/* selectors, reducer, saga and actions */
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectEmpListData,
  makeSelectPageDetails,
  makeSelectPRPayDatesLoading,
  makeSelectPRPayDatesError,
  makeSelectPRPayDateListData,
  // makeSelectPRPayMonth,
  // makeSelectPRPayYear,
  makeSelectPREmpSelProf,
  makeSelectPRPayReviewInfo,
  makeSelectPRPayReviewLoading,
  makeSelectPRPayReviewError,
  makeSelectPRPayDate,
  makeSelectPRPayReport,
  makeSelectOnSpotSuccess,
} from './selectors';

import reducer from './reducer';
import saga from './saga';

import {
  retrieveDTREmpList,
  retrievePRDateList,
  retrievePayReviewReport,
  setPRDateSelected,
  setPREmpProfileSelected,
  retrievePayReviewInfo,
  generatePaySlip,
  resetPaySlipState,
} from './actions';

export class PayProcessingPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      payrollDate: false,
      isGeneratePayroll: false,
      isGeneratePayslip: false,
      isPayrollReview: false,
      isDeductions: false,
      isEarnings: false,
      reportDate: '',
      reportEmployee: '',
      waiveDeductChecked: false,
      lastDeductChecked: '',
      waiveEarningsChecked: false,
      lastEarningsChecked: '',
      loadCount: 0,
      empSearch: false,
      empFilter: false,
      ComSiteLocID: 'All',
      isOnSpotDeductSuccess: false,
      isOnSpotEarnSuccess: false,
    };
  }

  componentDidMount() {
    this.props.dataRetrievePayDates();// Retrieve All Payroll Dates
    // this.props.dataRetrieveEmpList(1, false, false);// Retrieve All Employee
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.onSpotDeductSuccess) {
      this.setState({
        isDeductions: false,
        isOnSpotDeductSuccess: true,
      });
    }

    if (nextProps.onSpotEarnSuccess) {
      this.setState({
        isEarnings: false,
        isOnSpotEarnSuccess: true,
      });
    }
  }

  componentWillUnmount() {
    this.props.resetPaySlip();
  }

  showGeneratePayroll = (e) => {
    e.preventDefault();
    this.setState({
      isGeneratePayroll: !this.state.isGeneratePayroll,
      reportDate: moment(this.props.prPayDay).format('LL'),
    });
  }

  confirmedGenPRReport = (e) => {
    e.preventDefault();

    this.setState({
      isGeneratePayroll: !this.state.isGeneratePayroll,
    });
    if (this.props.prPayDay === false || this.props.prPayDay === '') {
      // Needed to select a Date   TODO: Nice to have another Prompt indicating to select date
    } else {
      this.loadCount = 0;
      this.props.dataRetrievePRReport();
    }
  }

  showGeneratePayslip = (e) => {
    e.preventDefault();

    this.setState({
      isGeneratePayslip: !this.state.isGeneratePayslip,
      reportEmployee: 'Sheldon Cooper',
    });
  }

  showPayrollReview = (e) => {
    e.preventDefault();

    this.setState({
      isPayrollReview: !this.state.isPayrollReview,
    });
  }

  toggleDeductions = (e) => {
    e.preventDefault();

    this.setState({
      isDeductions: !this.state.isDeductions,
    });
  }

  hideOnSpotDeductSuccess = () => {
    this.setState({
      isOnSpotDeductSuccess: false,
    });
    this.searchEmpForm.reset();
    this.props.dataRetrieveEmpList(1, false, false);
  }

  toggleEarnings = (e) => {
    e.preventDefault();

    this.setState({
      isEarnings: !this.state.isEarnings,
    });
  }

  hideOnSpotEarnSuccess = () => {
    this.setState({
      isOnSpotEarnSuccess: false,
    });
    this.searchEmpForm.reset();
    this.props.dataRetrieveEmpList(1, false, false);
  }

  selectedPayrollDate = (date) => {
    this.setState({
      empSearch: false,
      ComSiteLocID: 'All',
      payrollDate: date,
    });

    if (this.state.payrollDate) {
      // Reset Emp Search Form
      this.searchEmpForm.reset();
    }

    // Pass data to props
    this.props.sendSelectedDate(date);
    this.props.dataRetrieveEmpList(1, false, false);
  }

  waiveDeduct = (e) => {
    e.preventDefault();

    const { lastDeductChecked } = this.state;

    const currentButton = e.currentTarget;
    const parent = e.target.parentNode;
    const buttons = parent.getElementsByTagName('button');

    // Remove all active class in our buttons
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].classList.remove('active');
    }

    // Let's check if our
    if (currentButton !== lastDeductChecked) {
      this.setState({
        waiveDeductChecked: true,
        lastDeductChecked: currentButton,
      });
      currentButton.classList.add('active');
    } else if (currentButton === lastDeductChecked) {
      currentButton.classList.remove('active');
      this.setState({
        waiveDeductChecked: false,
        lastDeductChecked: '',
      });
    }
  }

  waiveEarnings = (e) => {
    e.preventDefault();

    const { lastEarningsChecked } = this.state;

    const currentButton = e.currentTarget;
    const parent = e.target.parentNode;
    const buttons = parent.getElementsByTagName('button');

    // Remove all active class in our buttons
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].classList.remove('active');
    }

    // Let's check if our
    if (currentButton !== lastEarningsChecked) {
      this.setState({
        waiveEarningsChecked: true,
        lastEarningsChecked: currentButton,
      });
      currentButton.classList.add('active');
    } else if (currentButton === lastEarningsChecked) {
      currentButton.classList.remove('active');
      this.setState({
        waiveEarningsChecked: false,
        lastEarningsChecked: '',
      });
    }
  }

  mobileToggleDisplay = (e) => {
    e.preventDefault();

    // get our parent container
    const parent = e.currentTarget.parentNode.parentNode;

    // toggle our class
    parent.classList.toggle('toggle');
  }

  searchEmpList = (query) => {
    this.setState({
      empSearch: query,
    });

    this.props.dataRetrieveEmpList(1, query, this.state.ComSiteLocID);
  }

  gotoEmpPage = (e) => {
    const page = e.selected + 1;
    this.props.onGotoEmpPage(page, this.state.empSearch, this.state.ComSiteLocID);
  }

  empFilter = (e, locID) => {
    e.preventDefault();
    this.setState({
      ComSiteLocID: locID,
    });

    if (locID === 'All') {
      this.props.dataRetrieveEmpList(1, this.state.empSearch, false);
    } else {
      this.props.dataRetrieveEmpList(1, this.state.empSearch, locID);
    }
  }

  render() {
    const {
      emploading, emperror, empList,
      prdatesloading, prdateserror, prDatesList,
      prcutoffloading, prcutoffserror, prCutOffInfo, prPayDay,
      prpayreviewloading, prpayreviewerror, prPayReviewInfo, prPayReviewSelEmpProf,
      prPayReportInfo, PageDetails, formLoadRef,
    } = this.props;

    // Pass our List props as one for Emp List Retrieval
    const dataEmpList = {
      emploading,
      emperror,
      empList,
      sendSelectedEmp: this.props.sendSelectedEmp,
      retrievePayrollReview: this.props.retrievePayrollReview,
    };

    // Pass our List props as one for Payroll Dates Retrieval
    const dataPRDateList = {
      prdatesloading,
      prdateserror,
      prDatesList,
      selectDate: this.selectedPayrollDate,
    };

    // Pass our List props as one for Payroll Cutoff Info Retrieval
    const dataCutoffInfo = {
      prcutoffloading,
      prcutoffserror,
      prCutOffInfo,
      prPayDay,
    };

    // Pass our List props as one for Payroll Review Info Retrieval
    const dataPayReviewInfo = {
      prpayreviewloading,
      prpayreviewerror,
      prPayReviewInfo,
      prPayDay,
      prPayReviewSelEmpProf,
      generate: this.props.generatePayslip,
      reset: this.props.resetPaySlip,
    };

    // Get Max Page Index of the list (defaults to 1)
    let maxPageIndex = 1;
    if (PageDetails != null) {
      maxPageIndex = PageDetails.MaxPageIndex;
    }

    if (prPayReportInfo && this.loadCount === 0) {
      location.assign(prPayReportInfo);
      this.loadCount = 1;
    }

    // Form Load References
    let comSites;
    if (formLoadRef) {
      const siteLocs = formLoadRef[0].ComSiteLocRefs;
      comSites = siteLocs.map((item) =>
        <button key={item.ComSiteLocID} className={(this.state.ComSiteLocID === item.ComSiteLocID) ? 'active' : ''} onClick={(e) => { this.empFilter(e, item.ComSiteLocID); }}>{item.Name}</button>
      );
    }

    return (
      <PageWrap>
        <Helmet>
          <title>Payroll Processing</title>
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Back onClick={this.props.history.goBack}><FontAwesomeIcon icon={faCaretLeft} /> BACK TO FINANCE ADMIN PAGE</Back>
            <Grid>
              <Dates>
                <Content bgColor="#fff" noMargin className="toggle">
                  <H2>Payroll Days <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>
                  {/* <div className="center date-filter clearfix">
                    <select>
                      <option>Thursday, June 1, 2017</option>
                    </select>
                  </div> */}

                  {/* Render Payroll Dates */}
                  <PayrollDateList {...dataPRDateList} />
                </Content>
              </Dates>

              <List>
                <Content bgColor="#fff">
                  <H2>Payroll Day Details <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>

                  {/* Payroll Cutoff Template Info */}
                  <PayrollCutoffInfo {...dataCutoffInfo} />
                </Content>

                <Content bgColor="#fff" noMargin>
                  <H2>Payroll Review Employee Listing <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>
                  { (!this.state.payrollDate) && <div><p className="message">Please select Payroll Date first.</p></div>}
                  { (this.state.payrollDate) &&
                    <Search search placeholder="Search Employees..." onClick={(query) => this.searchEmpList(query)} formRef={(el) => { this.searchEmpForm = el; }} />
                  }
                  { (this.state.payrollDate) &&
                    <Filter width="100%">
                      <button className={(this.state.ComSiteLocID === 'All') && 'active'} onClick={(e) => { this.empFilter(e, 'All'); }}>All</button>
                      {comSites}
                    </Filter>
                  }
                  {/* <Filter width="58%">
                    <button className="active">Employee</button>
                    <button>Workgroup</button>
                    <button>Department</button>
                    <label htmlFor="empWithDisputes" className="checkbox">
                      <input id="empWithDisputes" type="checkbox" />
                      <i className="fa fa-square-o" />
                      <i className="fa fa-check-square-o" />
                      <span>EMPLOYEES WITH DISPUTES</span>
                    </label>
                    <label htmlFor="empReadyForPayroll" className="checkbox">
                      <input id="empReadyForPayroll" type="checkbox" />
                      <i className="fa fa-square-o" />
                      <i className="fa fa-check-square-o" />
                      <span>EMPLOYEES READY FOR PAYROLL PROCESSING</span>
                    </label>
                  </Filter> */}
                  {/* <Filter width="41%">
                    <button className="active" onClick={() => { this.empFilter(false); }}>All</button>
                    <button onClick={() => { this.empFilter('Makati'); }}>Main</button>
                    <button onClick={() => { this.empFilter('Dumaguete'); }}>Tanjay</button>
                    <label htmlFor="empWithDisputes" className="checkbox">
                      <input id="empWithDisputes" type="checkbox" />
                      <i className="fa fa-square-o" />
                      <i className="fa fa-check-square-o" />
                      <span>EMPLOYEES WITH DISPUTES</span>
                    </label>
                  </Filter> */}
                  { (this.state.payrollDate) &&
                    <EmployeeList alphaFilter={false}>
                      <EmpList {...dataEmpList} />
                      {(PageDetails && maxPageIndex !== 1) &&
                        <Pagination>
                          <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={<span>...</span>}
                            breakClassName={'break-me'}
                            pageCount={maxPageIndex}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={4}
                            onPageChange={this.gotoEmpPage}
                            activeClassName={'active'}
                          />
                        </Pagination>
                      }
                    </EmployeeList>
                  }
                </Content>
              </List>

              <Details>
                <Content bgColor="#fff" className="payroll-review">
                  <H2>Payroll Review <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>
                  <PayrollReviewInfo {...dataPayReviewInfo} />
                </Content>

                <div className="action-button">
                  {(prPayReviewInfo) && <Button handleRoute={this.toggleDeductions} color="gray">ON SPOT DEDUCTIONS</Button>}
                  {(prPayReviewInfo) && <Button handleRoute={this.toggleEarnings} color="gray">ON SPOT EARNINGS</Button>}
                  <GenerateReport disabled={(this.state.payrollDate === false) && 'false'} title="Generate" buttonText="REPORT GENERATIONS">
                    <button onClick={this.showGeneratePayroll}>Payroll Report</button>
                    {/* <button onClick={this.showGeneratePayslip}>Payslip Report</button> */}
                  </GenerateReport>
                </div>
              </Details>
            </Grid>
          </PageContent>
        </Main>
        <Footer />

        <Confirm
          show={this.state.isGeneratePayroll}
          title="GENERATE REPORT"
          message={`Extract Payroll Report for ${moment(this.props.prPayDay).format('LL')}.`}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
          onClick={this.confirmedGenPRReport}
          onClose={this.showGeneratePayroll}
          showCloseBtn
        />

        {/* <Confirm
          show={this.state.isGeneratePayslip}
          title="GENERATE REPORT"
          message={"Extract Payslip Report for " + this.state.reportEmployee + "."}
          okBtnText="Yes" cancelBtn cancelBtnText="No"
          onClick={this.showGeneratePayslip}
          onClose={this.showGeneratePayslip} showCloseBtn /> */}
        <Modal
          show={this.state.isGeneratePayslip}
          title="GENERATE PAYSLIP REPORT"
          onClose={this.showGeneratePayslip}
          showCloseBtn
          width="350px"
        >
          <PayrollForm>
            <p className="text-center">Extract Payslip Report for {moment(this.props.prPayDay).format('LL')}.</p>
            <div className="action-button">
              <Button handleRoute={(e) => { e.preventDefault(); }} color="red">DOWNLOAD</Button>&nbsp;&nbsp;or&nbsp;&nbsp;
              <Button handleRoute={(e) => { e.preventDefault(); }} color="red">EMAIL</Button>
            </div>
          </PayrollForm>
        </Modal>

        <Modal show={this.state.isPayrollReview} title="Payroll Review" onClose={this.showPayrollReview} showCloseBtn width="500px">
          <PayrollReviewInfo {...dataPayReviewInfo} />
        </Modal>

        <Modal show={this.state.isDeductions} title="Deductions" onClose={this.toggleDeductions} width="500px">
          <Deductions cancel={this.toggleDeductions} prReviewInfo={prPayReviewInfo} />
        </Modal>

        <Modal show={this.state.isEarnings} title="Earnings" onClose={this.toggleEarnings} width="500px">
          <Earnings cancel={this.toggleEarnings} prReviewInfo={prPayReviewInfo} />
          {/* <PayrollForm>
            <Waive title="Earnings List" isChecked={this.state.waiveEarningsChecked}>
              <button onClick={this.waiveEarnings}>Earning List 1</button>
              <button onClick={this.waiveEarnings}>Earning List 2</button>
            </Waive>
            <div className="fields">
              <label htmlFor="label" className="title">Value</label>
              <input type="text" defaultValue="Php" />
            </div>
            <div className="fields">
              <label htmlFor="label" className="title">Type</label>
              <select>
                <option>On-Spot</option>
              </select>
            </div>
            <div className="fields">
              <label htmlFor="label" className="title">Number of Installment</label>
              <input type="text" />
            </div>
            <div className="fields">
              <label htmlFor="label" className="title">Notes</label>
              <textarea defaultValue="HMO Dependent"></textarea>
            </div>
            <div className="fields">
              <label htmlFor="label" className="title">Starts From</label>
              <select>
                <option>Friday August 25, 2017</option>
              </select>
            </div>
            <div className="fields">
              <label htmlFor="label" className="title">Deduct After</label>
              <label htmlFor="label" className="radio-group">
                <input type="radio" name="deductAfter" />
                <span>Net Pay</span>
              </label>
              <label htmlFor="label" className="radio-group">
                <input type="radio" name="deductAfter" />
                <span>Gross Pay</span>
              </label>
            </div>
            <div className="action-button">
              <Button handleRoute={(e) => { e.preventDefault(); }} color="gray">SAVE</Button>
              <Button handleRoute={this.toggleEarnings} color="red">CANCEL</Button>
            </div>
          </PayrollForm> */}
        </Modal>

        <Confirm
          show={this.state.isOnSpotDeductSuccess}
          title="SUCCESS"
          message="On Spot Deduct request successfully submitted."
          okBtnText="Yes"
          onClick={this.hideOnSpotDeductSuccess}
        />
        <Confirm
          show={this.state.isOnSpotEarnSuccess}
          title="SUCCESS"
          message="On Spot Earning request successfully submitted."
          okBtnText="Yes"
          onClick={this.hideOnSpotEarnSuccess}
        />
      </PageWrap>
    );
  }
}

PayProcessingPage.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  emploading: PropTypes.bool,
  emperror: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  empList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.bool,
  ]),
  prdatesloading: PropTypes.bool,
  prdateserror: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  prDatesList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.bool,
  ]),
  prCutOffInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.bool,
  ]),
  prcutoffloading: PropTypes.bool,
  prcutoffserror: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  prpayreviewloading: PropTypes.bool,
  prpayreviewerror: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  prPayReviewInfo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  prPayReviewSelEmpProf: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  prPayReportInfo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  prPayDay: PropTypes.string,
  PageDetails: PropTypes.any,
  formLoadRef: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  onSpotDeductSuccess: PropTypes.bool,
  onSpotEarnSuccess: PropTypes.bool,
  // Function dispatch props
  onGotoEmpPage: PropTypes.func,
  sendSelectedDate: PropTypes.func,
  sendSelectedEmp: PropTypes.func,
  retrievePayrollReview: PropTypes.func,
  generatePayslip: PropTypes.func,
  resetPaySlip: PropTypes.func,
  dataRetrievePRReport: PropTypes.func,
  dataRetrievePayDates: PropTypes.func,
  dataRetrieveEmpList: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  emploading: makeSelectLoading(),
  emperror: makeSelectError(),
  empList: makeSelectEmpListData(),
  prdateserror: makeSelectPRPayDatesError(),
  prdatesloading: makeSelectPRPayDatesLoading(),
  prDatesList: makeSelectPRPayDateListData(),
  PageDetails: makeSelectPageDetails(),
  payDates: makeSelectPRPayDateListData(),
  prCutOffInfo: makeSelectPRPayReviewInfo(),
  prcutoffloading: makeSelectPRPayReviewLoading(),
  prcutoffserror: makeSelectPRPayReviewError(),
  prPayDay: makeSelectPRPayDate(),
  prpayreviewloading: makeSelectPRPayReviewLoading(),
  prpayreviewerror: makeSelectPRPayReviewError(),
  prPayReviewInfo: makeSelectPRPayReviewInfo(),
  prPayReviewSelEmpProf: makeSelectPREmpSelProf(),
  prPayReportInfo: makeSelectPRPayReport(),
  formLoadRef: makeSelectRefs('formLoad'),
  onSpotDeductSuccess: makeSelectOnSpotSuccess('onSpotDeduct'),
  onSpotEarnSuccess: makeSelectOnSpotSuccess('onSpotEarning'),
});

function mapDispatchToProps(dispatch) {
  return {
    dataRetrieveEmpList: (page, search, location) => dispatch(retrieveDTREmpList(page, search, location)),
    onGotoEmpPage: (page, search, location) => dispatch(retrieveDTREmpList(page, search, location)),
    dataRetrievePayDates: () => dispatch(retrievePRDateList(false)),
    dataRetrievePRReport: () => dispatch(retrievePayReviewReport()),
    sendSelectedEmp: (empprofile) => dispatch(setPREmpProfileSelected(empprofile)),
    retrievePayrollReview: () => dispatch(retrievePayReviewInfo()),
    sendSelectedDate: (date) => dispatch(setPRDateSelected(date)),
    generatePayslip: (isEmail, empID, date) => dispatch(generatePaySlip(isEmail, empID, date)),
    resetPaySlip: () => dispatch(resetPaySlipState()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'pradmin', reducer });
const withSaga = injectSaga({ key: 'pradmin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PayProcessingPage);
