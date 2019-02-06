/*
 * DTR Page
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
import Calendar from 'components/Calendar';

import Status from 'components/User/Status';
import EmployeeList from 'components/Employee/EMPAlphaFilter';
import Modal from 'components/Modal';
import Confirm from 'components/ConfirmationDialog';
// import ToggleSwitch from 'components/StyleUtils/ToggleSwitch';

/* selectors, reducer, saga and actions */
import {
  makeSelectRefs,
} from 'containers/HomePage/selectors';

import {
  makeSelectPageDetails,
  makeSelectDTREmpInfo,
  makeSelectShiftRecsData,
  makeSelectShiftRecsPages,
  makeSelectDTRReport,
  makeSelectDTRLoading,
  makeSelectDTRError,
  makeSelectShiftRecsLoading,
  makeSelectShiftRecsError,
  makeSelectSuccess,
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import {
  retrieveDTREmpList,
  retrieveDTRInfo,
  retrieveSelDateEmpDTR,
  retrieveSelEmpID,
  retrieveDTREmpShiftRecs,
  retrieveDTRReport,
  clearDTRReport,
  clearManualDtrOverride,
} from './actions';

// import ToggleSwitch from './ToggleSwitch';
import Table from '../Table';
import Grid from '../Grid';
import Dates from '../GridDates';
import List from '../GridList';
import Details from '../GridDetails';
import Content from '../GridContent';
import Filter from '../Filter';
import CalendarWrapper from './CalendarWrapper';
import DTRInfo from './DTRInfo';
import ShiftSummary from './ShiftSummaryList';
import EmpList from './EmpList';
import ManualDTR from './ManualDTR';

export class FINDtrPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      employeeID: '',
      employeeName: '',
      shiftTemplateID: '',
      empSearch: false,
      empFilter: 'All',
      isShowAllEmp: false,
      isOverrideForm: false,
      isError: false,
      isExtractDtrReport: false,
      isManualDtrSuccess: false,
      dismissDTRReport: false,
      isViewDtr: false,
      isViewShiftSummary: false,
      isOtHours: false,
      reportText: '',
      currMonth: false,
      cMonthName: '',
      currYr: false,
      daysInSelDate: 0,
      cSelectedDay: false,
      displayDate: moment().startOf('days'),
      workStatus: false,
      calendar: false,
    };
  }

  componentDidMount() {
    this.props.dataRetrieveEmpList(1, false, false); // Retrieve All Employee

    this.selectedDate(moment().startOf('days'));
    // this.props.dataRetrieveDTRInfo();// Retrieve Default DTR Info
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.manualDtrSuccess) {
      this.setState({
        isOverrideForm: false,
        isManualDtrSuccess: true,
      });
    }
  }

  getSelDate = () => {
    this.setState({
      currMonth: !this.state.currMonth,
      currYr: !this.state.currYr,
    });
  }

  toggleCalendar = () => {
    this.setState({
      calendar: !this.state.calendar,
      workStatus: false,
    });
  }

  selectedDate = (date) => {
    this.setState({
      employeeID: '',
      employeeName: '',
      shiftTemplateID: '',
      // calendar: false,
      displayDate: date,
    });
    // var selDate = moment(date).format('DD');
    // console.log(selDate);
    // console.log(selDate.format('DD'));
    this.currMonth = moment(date).format('MM');
    this.currYr = moment(date).format('YYYY');
    this.cMonthName = moment(date).format('MMMM');
    this.cSelectedDay = moment(date).format('D');
    this.daysInSelDate = moment(date).daysInMonth();

    this.props.setSelectedDTRDate(`${this.currMonth}/${this.cSelectedDay}/${this.currYr}`);
    this.props.dataRetrieveEmpList(1, false, false); // Retrieve All Employee
  }

  toggleDTROverrideForm = () => {
    this.setState({
      isOverrideForm: !this.state.isOverrideForm,
    });
  }

  showError = (e) => {
    e.preventDefault();

    this.setState({
      isError: !this.state.isError,
    });
  }

  showExtractDtrReport = (e) => {
    e.preventDefault();
    // console.log(e.target);

    this.setState({
      isExtractDtrReport: !this.state.isExtractDtrReport,
      reportText: this.state.displayDate,
    });
  }

  clearExtractDtrReport = () => {
    this.props.clearDTRDwLink();
  }

  showDtr = (e) => {
    e.preventDefault();

    this.setState({
      isViewDtr: !this.state.isViewDtr,
    });
  }

  showShiftSummary = (e) => {
    e.preventDefault();

    this.setState({
      isViewShiftSummary: !this.state.isViewShiftSummary,
    });
  }

  showOtHours = (e) => {
    e.preventDefault();

    this.setState({
      isOtHours: !this.state.isOtHours,
    });
  }

  // select date function
  selectDay = (e, count) => {
    // get all our li element
    const dateEl = e.target.parentNode.children;
    // get the clicked element
    const targetEl = e.currentTarget;

    // Iterate through all the element and toggle the class
    for (let i = 0; i < dateEl.length; i += 1) {
      if (targetEl !== dateEl[i]) {
        dateEl[i].classList.remove('active');
      } else {
        dateEl[i].classList.add('active');
      }
    }
    // Update selected Date
    const date = moment(new Date(`${this.currYr}-${this.currMonth}-${count}`));
    this.selectedDate(date);
    // Reset Emp Search
    this.searchEmpForm.reset();
  }

  // select empindex function
  selectedEmp = (empID, empName, shiftID) => {
    this.setState({
      employeeID: empID,
      employeeName: empName,
      shiftTemplateID: shiftID,
    });
    // Update selected Date
    this.props.setSelectEmpID(empID);
    this.props.dataRetrieveDTRInfo(); // Activate DTR Retrieval
    this.props.dataRetrieveShiftRecs(); // Activate Shift Summary Retrieval
  }

  empGotoPage = (e) => {
    const page = e.selected + 1;
    this.props.dataRetrieveEmpList(page, this.state.empSearch, this.state.empFilter);
  }

  searchEmpList = (val) => {
    this.setState({
      empSearch: val,
    });
    this.props.dataRetrieveEmpList(1, val, this.state.empFilter);
  }

  empFilter = (e, locID) => {
    e.preventDefault();
    this.setState({
      empFilter: locID,
    });

    if (locID === 'All') {
      this.props.dataRetrieveEmpList(1, this.state.empSearch, false);
    } else {
      this.props.dataRetrieveEmpList(1, this.state.empSearch, locID);
    }
  }

  showAllEmpValue = (e, isBool) => {
    this.setState({
      isShowAllEmp: isBool,
    });
  }

  // Get DTR Generated Report
  generateDTRReport = () => {
    this.props.dataGetDTRReportLink(null);
  }

  hideManualDtrSuccess = () => {
    this.setState({
      isManualDtrSuccess: false,
    });
    this.props.clearManualDtrState();
  }

  mobileToggleDisplay = (e) => {
    e.preventDefault();

    // get our parent container
    const parent = e.currentTarget.parentNode.parentNode;

    // toggle our class
    parent.classList.toggle('toggle');
  }

  render() {
    const {
      displayDate,
    } = this.state;

    // Declare our props
    const {
      dtrInfo, dtrInfoLoading, dtrInfoError,
      shiftRecs, shiftRecsLoading, shiftRecsError, shiftRecsPages, gotoShiftRecsPage,
      dtrReportDwLink, formLoadRef,
      empListPages,
    } = this.props;

    // Pass our Info props as one for the DTR Info Retrieval and Display
    const dataDTRInfo = {
      loading: dtrInfoLoading,
      error: dtrInfoError,
      dtrInfo,
    };

    const dataShiftRecs = {
      loading: shiftRecsLoading,
      error: shiftRecsError,
      shiftRecs,
    };

    // Get Max Page Index of the employee list (defaults to 1)
    let { maxPageIndex, shiftRecMaxPage } = 1;
    if (empListPages != null) {
      maxPageIndex = empListPages.MaxPageIndex;
    }
    // Get Max Page Index for Shift Summary report
    if (shiftRecsPages != null) {
      shiftRecMaxPage = shiftRecsPages.MaxPageIndex;
    }

    const lstDates = [];
    for (let iCal = this.daysInSelDate; iCal > 0; iCal -= 1) {
      lstDates.push(
        <li role="presentation" key={iCal} onClick={((e) => this.selectDay(e, iCal))} className={(this.cSelectedDay === iCal.toString()) && 'active'}>
          {this.cMonthName} {iCal}, {this.currYr}
        </li>
      );
    }

    if (dtrReportDwLink) {
      // console.log(dtrReportDwLink);
      // {this.hideExtractDtrReport();}
      location.assign(dtrReportDwLink);
      this.clearExtractDtrReport();
    }

    // Form Load References
    let comSites;
    if (formLoadRef) {
      const siteLocs = formLoadRef[0].ComSiteLocRefs;
      comSites = siteLocs.map((item) =>
        <button key={item.ComSiteLocID} className={(this.state.empFilter === item.ComSiteLocID) ? 'active' : ''} onClick={(e) => { this.empFilter(e, item.ComSiteLocID); }}>{item.Name}</button>
      );
    }

    const manualDTRProps = {
      empID: this.state.employeeID,
      empName: this.state.employeeName,
      shiftID: this.state.shiftTemplateID,
      date: this.state.displayDate,
      cancel: this.toggleDTROverrideForm,
    };

    return (
      <PageWrap>
        <Helmet>
          <title>DTR</title>
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Grid>
              <Dates>
                <Content bgColor="#fff" className="toggle">
                  <H2>DTR <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>
                  <div className="date-filter">
                    <div className="data" >
                      <span role="presentation" className="content" onClick={this.toggleCalendar}>{moment(displayDate).format('LL')}</span>
                      <button className="fa fa-caret-down" onClick={this.toggleCalendar} />
                      { this.state.calendar &&
                        <CalendarWrapper className="cal-wrap negtop">
                          <H2>Select Date</H2>
                          <Calendar selectedDate={this.selectedDate} hideCal={this.toggleCalendar} displayDate={displayDate} />
                        </CalendarWrapper>
                      }
                    </div>
                  </div>
                  <ul>
                    {lstDates}
                  </ul>
                </Content>
              </Dates>

              <List>
                <Content bgColor="#fff">
                  <H2>DTR SUB LISTINGS <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>

                  <Search search placeholder="Search Employees..." onClick={(query) => this.searchEmpList(query)} formRef={(el) => { this.searchEmpForm = el; }} />
                  <Filter width="69%">
                    <button className={(this.state.empFilter === 'All') && 'active'} onClick={(e) => { this.empFilter(e, 'All'); }}>All</button>
                    {comSites}
                  </Filter>
                  {/* <Filter width="30%">
                    Show all Employees <ToggleSwitch value={false} hideReq update={this.showAllEmpValue} />
                  </Filter> */}
                  {/*
                    <Search search />
                    <Filter width="58%">
                      <button className="active">Employee</button>
                      <button>Workgroup</button>
                      <button>Department</button>
                      <label className="checkbox">
                        <input type="checkbox" />
                        <i className="fa fa-square-o" />
                        <i className="fa fa-check-square-o" />
                        <span>DTR READY FOR PAYROLL PROCESSING</span>
                      </label>
                    </Filter>
                    <Filter width="41%">
                      <button className="active">All</button>
                      <button>Makati</button>
                      <button>Dumaguete</button>
                      <label className="checkbox">
                        <input type="checkbox" />
                        <i className="fa fa-square-o" />
                        <i className="fa fa-check-square-o" />
                        <span>DTR WITH DISPUTES</span>
                      </label>
                    </Filter>
                  */}

                  <EmployeeList alphaFilter={false}>
                    <EmpList getEmp={this.selectedEmp} />

                    { (empListPages && maxPageIndex !== 1) &&
                      <Pagination>
                        <ReactPaginate
                          previousLabel={'Previous'}
                          nextLabel={'Next'}
                          breakLabel={<span>...</span>}
                          breakClassName={'break-me'}
                          pageCount={maxPageIndex}
                          marginPagesDisplayed={1}
                          pageRangeDisplayed={4}
                          onPageChange={this.empGotoPage}
                          activeClassName={'active'}
                        />
                      </Pagination>
                    }
                  </EmployeeList>
                </Content>
              </List>

              <Details>
                <Content>
                  <H2>DTR Details <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>
                  <DTRInfo {...dataDTRInfo} />
                </Content>

                <Content className="shift-summary">
                  <H2>Shift Summary <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>
                  <ShiftSummary {...dataShiftRecs} />
                  { (shiftRecsPages && shiftRecMaxPage !== 1) &&
                    <Pagination>
                      <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={<span>...</span>}
                        breakClassName={'break-me'}
                        pageCount={shiftRecMaxPage}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={4}
                        onPageChange={gotoShiftRecsPage}
                        activeClassName={'active'}
                      />
                    </Pagination>
                  }
                </Content>

                <Content noMaxHeight>
                  {/*  TODO: Hide this for now, until API for retrieving OT is available
                  <H2>OT Hours</H2>
                  <Table className="ot-hours">
                    <tbody>
                      <tr>
                        <td><Status className="active" /></td>
                        <td>Approved</td>
                        <td>00:30:00</td>
                      </tr>
                      <tr>
                        <td><Status className="active" /></td>
                        <td>Applied</td>
                        <td>00:30:00</td>
                      </tr>
                    </tbody>
                  </Table> */}
                  <div className="action-button">
                    {(this.state.employeeID !== '') && <Button handleRoute={this.toggleDTROverrideForm} color="gray">MANUAL DTR OVERRIDE</Button>}
                    <Button handleRoute={this.showExtractDtrReport} color="green">EXTRACT DTR REPORT</Button>
                  </div>
                </Content>
              </Details>
            </Grid>
          </PageContent>
        </Main>
        <Footer />

        <Confirm show={this.state.isError} title="ERROR" message="Please select Date to download report." okBtnText="OK" onClick={this.showError} onClose={this.showError} showCloseBtn />

        <Confirm show={this.state.isExtractDtrReport} title="DOWNLOAD REPORT" message={`Extract DTR Report for ${moment(this.state.reportText).format('LL')}.`} okBtnText="Yes" cancelBtn cancelBtnText="No" onClick={this.generateDTRReport} onClose={this.showExtractDtrReport} showCloseBtn />

        <Modal show={this.state.isOverrideForm} title="Manual DTR Override" onClose={this.toggleDTROverrideForm} showCloseBtn width="500px">
          <ManualDTR {...manualDTRProps} />
        </Modal>

        <Modal show={this.state.isViewDtr} title="DTR Details" onClose={this.showDtr} showCloseBtn width="500px">
          <DTRInfo {...dataDTRInfo} />
        </Modal>

        <Modal show={this.state.isViewShiftSummary} title="DTR Details" onClose={this.showShiftSummary} showCloseBtn width="500px">
          <ShiftSummary {...dataShiftRecs} />
        </Modal>

        <Modal show={this.state.isOtHours} title="OT Hours" onClose={this.showOtHours} showCloseBtn width="500px">
          <Table className="ot-hours">
            <tbody>
              <tr>
                <td><Status className="active" /></td>
                <td>Approved</td>
                <td>00:30:00</td>
              </tr>
              <tr>
                <td><Status className="active" /></td>
                <td>Applied</td>
                <td>00:30:00</td>
              </tr>
            </tbody>
          </Table>
        </Modal>

        {/* Show Manual DTR Override Success Message */}
        <Confirm show={this.state.isManualDtrSuccess} title="SUCCESS" message="Manual DTR Override has successfully created." okBtnText="OK" onClick={this.hideManualDtrSuccess} />
      </PageWrap>
    );
  }
}

FINDtrPage.propTypes = {
  location: PropTypes.object,
  dtrInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.bool,
  ]),
  dtrInfoLoading: PropTypes.bool,
  dtrInfoError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  shiftRecs: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.bool,
  ]),
  shiftRecsLoading: PropTypes.bool,
  shiftRecsError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  shiftRecsPages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  dtrReportDwLink: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.bool,
  ]),
  empListPages: PropTypes.any,
  formLoadRef: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  manualDtrSuccess: PropTypes.bool,
  // Function dispatch props
  dataRetrieveEmpList: PropTypes.func,
  dataRetrieveDTRInfo: PropTypes.func,
  setSelectedDTRDate: PropTypes.func,
  setSelectEmpID: PropTypes.func,
  dataRetrieveShiftRecs: PropTypes.func,
  gotoShiftRecsPage: PropTypes.func,
  dataGetDTRReportLink: PropTypes.func,
  clearDTRDwLink: PropTypes.func,
  clearManualDtrState: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  empListPages: makeSelectPageDetails('empList'),
  dtrInfo: makeSelectDTREmpInfo(),
  dtrInfoLoading: makeSelectDTRLoading(),
  dtrInfoError: makeSelectDTRError(),
  shiftRecs: makeSelectShiftRecsData(),
  shiftRecsLoading: makeSelectShiftRecsLoading(),
  shiftRecsError: makeSelectShiftRecsError(),
  shiftRecsPages: makeSelectShiftRecsPages(),
  dtrReportDwLink: makeSelectDTRReport(),
  formLoadRef: makeSelectRefs('formLoad'),
  manualDtrSuccess: makeSelectSuccess('manualDtr'),
});

function mapDispatchToProps(dispatch) {
  return {
    dataRetrieveEmpList: (page, search, filter) => dispatch(retrieveDTREmpList(page, search, filter)),
    dataRetrieveDTRInfo: () => dispatch(retrieveDTRInfo()),
    setSelectedDTRDate: (dateDTR) => dispatch(retrieveSelDateEmpDTR(dateDTR)),
    setSelectEmpID: (empID) => dispatch(retrieveSelEmpID(empID)),
    dataRetrieveShiftRecs: () => dispatch(retrieveDTREmpShiftRecs(false)),
    gotoShiftRecsPage: (evt) => {
      const page = evt.selected + 1;
      dispatch(retrieveDTREmpShiftRecs(page));
    },
    dataGetDTRReportLink: () => dispatch(retrieveDTRReport()),
    clearDTRDwLink: () => dispatch(clearDTRReport()),
    clearManualDtrState: () => dispatch(clearManualDtrOverride()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'pradmin', reducer });
const withSaga = injectSaga({ key: 'pradmin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FINDtrPage);
