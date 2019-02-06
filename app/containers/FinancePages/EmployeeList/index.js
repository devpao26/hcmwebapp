/*
 * Employee Master List
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
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
import PageContent from 'components/Main/PageContent';
import Sidebar from 'components/Sidebar';
import Pagination from 'components/Pagination';
import EMPMasterlist from 'components/Employee/EMPMasterlist';

import Section from 'components/Section';
import Back from 'components/Section/Back';
import H2 from 'components/Section/H2';

import SearchFilter from 'components/SearchFilter';
import FilterButton from 'components/SearchFilter/Button';

import Modal from 'components/Modal';
import Confirm from 'components/ConfirmationDialog';

import {
  makeSelectRefs,
} from 'containers/HomePage/selectors';

/* selectors, reducer, saga and actions */
import reducer from './reducer';
import saga from './saga';

import {
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPageDetails,
  makeSelectSuccess,
} from './selectors';

import {
  retrieveEmpList,
  clearTimedSuccess,
} from './actions';

import Deductions from './Deductions';
import Earnings from './Earnings';
import List from './List';

export class EmployeeList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      empSearch: false,
      empFilter: 'All',
      selectedEmpID: false,
      filterOptions: false,
      isDeductions: false,
      isEarnings: false,
      isTimedDeductSuccess: false,
      isTimedEarnSuccess: false,
    };
  }

  componentDidMount() {
    this.props.dataRetrieveEmpList(1, false, false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.timedDeductSuccess) {
      this.setState({
        isTimedDeductSuccess: true,
        isDeductions: false,
      });
    }

    if (nextProps.timedEarnSuccess) {
      this.setState({
        isTimedEarnSuccess: true,
        isEarnings: false,
      });
    }
  }

  getSelectedEmpID = (empID, modal) => {
    let isDeductions = false;
    let isEarnings = false;

    if (modal === 'deduction') { isDeductions = true; }
    if (modal === 'earning') { isEarnings = true; }

    this.setState({
      selectedEmpID: empID,
      isDeductions,
      isEarnings,
    });
  }

  hideIsDeduction = () => {
    this.setState({
      isDeductions: false,
    });
  }

  hideTimedDeductSuccess = () => {
    this.setState({
      isTimedDeductSuccess: false,
    });

    this.props.clearTimedSuccess();
  }

  hideIsEarning = () => {
    this.setState({
      isEarnings: false,
    });
  }

  hideTimedEarnSuccess = () => {
    this.setState({
      isTimedEarnSuccess: false,
    });

    this.props.clearTimedSuccess();
  }

  showFilter = () => {
    this.setState({
      filterOptions: !this.state.filterOptions,
    });
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

  rowExpand = (e) => {
    // Get our Parent Row
    const parentRow = e.currentTarget.parentNode.parentNode;
    // Toggle expand class
    parentRow.classList.toggle('expand');
  }

  render() {
    // Declare our props
    const {
      loading, error, empList, PageDetails,
      formLoadRef,
    } = this.props;

    // Pass our List props as one
    const dataList = {
      loading,
      error,
      empList,
      getEmpID: this.getSelectedEmpID,
    };

    // Get Max Page Index of the list (defaults to 1)
    let maxPageIndex = 1;
    if (PageDetails != null) {
      maxPageIndex = PageDetails.MaxPageIndex;
    }

    // Form Load References
    let comSites;
    if (formLoadRef) {
      const siteLocs = formLoadRef[0].ComSiteLocRefs;
      comSites = siteLocs.map((item) =>
        <FilterButton key={item.ComSiteLocID} className={(this.state.empFilter === item.ComSiteLocID) ? 'active' : ''} onClick={(e) => { this.empFilter(e, item.ComSiteLocID); }}>{item.Name}</FilterButton>
      );
    }

    return (
      <PageWrap>
        <Helmet>
          <title>HCM Payroll</title>
          <meta name="description" content="HCM-Payroll - Employee Listings" />
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Back onClick={this.props.history.goBack}><FontAwesomeIcon icon={faCaretLeft} /> BACK TO FINANCE ADMIN PAGE</Back>
            <Section>
              <H2>Employee Masterlist</H2>
              <SearchFilter search onClick={(val) => { this.searchEmpList(val); }} formRef={(el) => { this.searchForm = el; }}>
                <FilterButton className={(this.state.empFilter === 'All') && 'active'} onClick={(e) => { this.empFilter(e, 'All'); }}>All</FilterButton>
                {comSites}
              </SearchFilter>
              <SearchFilter>
                {/* <FilterButton>
                  <span onClick={this.showFilter}>Filters <i className="fa fa-caret-down" /></span>
                  {this.state.filterOptions &&
                    <OptionMenu title="Filters" position="right">
                      <label className="active">
                        <input type="checkbox" /> Employee Name
                      </label>
                      <label>
                        <input type="checkbox" /> Date Hired
                      </label>
                      <label>
                        <input type="checkbox" /> Location
                      </label>
                      <label>
                        <input type="checkbox" /> Department
                      </label>
                      <label>
                        <input type="checkbox" /> Workgroup
                      </label>
                      <label>
                        <input type="checkbox" /> Employment Type
                      </label>
                      <label>
                        <input type="checkbox" /> Active
                      </label>
                      <label>
                        <input type="checkbox" /> Inactive
                      </label>
                      <label>
                        <input type="checkbox" /> Terminated
                      </label>
                      <label>
                        <input type="checkbox" /> Blocked
                      </label>
                    </OptionMenu>
                  }
                </FilterButton> */}
              </SearchFilter>

              <EMPMasterlist>
                <List {...dataList} />
                {/*
                  <div className="row-container">
                    <Row className="head">
                      <div className="cell">Name <span className="sort fa fa-caret-down" /></div>
                      <div className="cell">Date Hired <span className="sort fa fa-caret-down" /></div>
                      <div className="cell">Position <span className="sort fa fa-caret-down" /></div>
                      <div className="cell">WorkGroup <span className="sort fa fa-caret-down" /></div>
                      <div className="cell">Department <span className="sort fa fa-caret-down" /></div>
                      <div className="cell">Employment Status <span className="sort fa fa-caret-down" /></div>
                      <div className="cell">Current Work Status <span className="sort fa fa-caret-down" /></div>
                    </Row>
                  </div>
                  <div className="row-container">
                    <Row className="body">
                      <div className="cell first">
                        <Avatar />
                        <span className="emp-name" onClick={this.rowExpand}>Wayne, Bruce</span>
                        <small>Makati</small>
                      </div>
                      <div className="cell" data-title="Date Hired">01-08-2016</div>
                      <div className="cell" data-title="Position">Technical Support Representative</div>
                      <div className="cell" data-title="WorkGroup">Contact Center Services</div>
                      <div className="cell" data-title="Department">Operations</div>
                      <div className="cell" data-title="Employment Status">Regular</div>
                      <div className="cell" data-title="Current Work Status">Active</div>
                    </Row>
                    <OptionMenu title="Options" position="left">
                      <button className="active">Assign a Calendar Template</button>
                      <button>Assign a Shift Schedule</button>
                      <button>Assign CutOff Template</button>
                      <button>Update Information</button>
                      <button>Disable Access</button>
                      <button>Access and Permissions</button>
                      <button>Statistics</button>
                      <button>File IRF</button>
                    </OptionMenu>
                  </div>
                  <div className="row-container">
                    <Row className="body">
                      <div className="cell first">
                        <Avatar />
                        <span className="emp-name" onClick={this.rowExpand}>Wayne, Bruce</span>
                        <small>Makati</small>
                      </div>
                      <div className="cell" data-title="Date Hired">01-08-2016</div>
                      <div className="cell" data-title="Position">Technical Support Representative</div>
                      <div className="cell" data-title="WorkGroup">Contact Center Services</div>
                      <div className="cell" data-title="Department">Operations</div>
                      <div className="cell" data-title="Employment Status">Regular</div>
                      <div className="cell" data-title="Current Work Status">Active</div>
                    </Row>
                    <OptionMenu title="Options" position="left">
                      <button className="active">Assign a Calendar Template</button>
                      <button>Assign a Shift Schedule</button>
                      <button>Assign CutOff Template</button>
                      <button>Update Information</button>
                      <button>Disable Access</button>
                      <button>Access and Permissions</button>
                      <button>Statistics</button>
                      <button>File IRF</button>
                    </OptionMenu>
                  </div>
                  <div className="row-container">
                    <Row className="body">
                      <div className="cell first">
                        <Avatar />
                        <span className="emp-name" onClick={this.rowExpand}>Wayne, Bruce</span>
                        <small>Makati</small>
                      </div>
                      <div className="cell" data-title="Date Hired">01-08-2016</div>
                      <div className="cell" data-title="Position">Technical Support Representative</div>
                      <div className="cell" data-title="WorkGroup">Contact Center Services</div>
                      <div className="cell" data-title="Department">Operations</div>
                      <div className="cell" data-title="Employment Status">Regular</div>
                      <div className="cell" data-title="Current Work Status">Active</div>
                    </Row>
                    <OptionMenu title="Options" position="left">
                      <button className="active">Assign a Calendar Template</button>
                      <button>Assign a Shift Schedule</button>
                      <button>Assign CutOff Template</button>
                      <button>Update Information</button>
                      <button>Disable Access</button>
                      <button>Access and Permissions</button>
                      <button>Statistics</button>
                      <button>File IRF</button>
                    </OptionMenu>
                  </div>
                */}
              </EMPMasterlist>

              { (PageDetails && maxPageIndex !== 1) &&
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
            </Section>
          </PageContent>
        </Main>
        <Footer />

        <Modal show={this.state.isDeductions} title="Deductions" onClose={this.hideIsDeduction} width="500px">
          <Deductions cancel={this.hideIsDeduction} empID={this.state.selectedEmpID} />
        </Modal>

        <Modal show={this.state.isEarnings} title="Earnings" onClose={this.hideIsEarning} width="500px">
          <Earnings cancel={this.hideIsEarning} empID={this.state.selectedEmpID} />
        </Modal>

        {/* Timed Deduction and Earning Success Modals */}
        <Confirm
          show={this.state.isTimedDeductSuccess}
          title="SUCCESS"
          message="Timed Deduct request successfully submitted."
          okBtnText="Yes"
          onClick={this.hideTimedDeductSuccess}
        />
        <Confirm
          show={this.state.isTimedEarnSuccess}
          title="SUCCESS"
          message="Timed Earning request successfully submitted."
          okBtnText="Yes"
          onClick={this.hideTimedEarnSuccess}
        />
      </PageWrap>
    );
  }
}

EmployeeList.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  empList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.bool,
  ]),
  PageDetails: PropTypes.any,
  formLoadRef: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  timedDeductSuccess: PropTypes.bool,
  timedEarnSuccess: PropTypes.bool,
  // Function dispatch props
  dataRetrieveEmpList: PropTypes.func,
  clearTimedSuccess: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('empList'),
  error: makeSelectError('empList'),
  empList: makeSelectData('empList'),
  PageDetails: makeSelectPageDetails('empList'),
  formLoadRef: makeSelectRefs('formLoad'),
  timedDeductSuccess: makeSelectSuccess('timedDeduct'),
  timedEarnSuccess: makeSelectSuccess('timedEarning'),
});

function mapDispatchToProps(dispatch) {
  return {
    dataRetrieveEmpList: (page, search, filter) => dispatch(retrieveEmpList(page, search, filter)),
    clearTimedSuccess: () => dispatch(clearTimedSuccess()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'pradmin', reducer });
const withSaga = injectSaga({ key: 'pradmin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EmployeeList);
