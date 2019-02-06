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
import moment from 'moment';

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
import Loading from 'components/LoadingIndicator/Loading';

/* Section Component */
import Section from 'components/Section';
import Back from 'components/Section/Back';
import H2 from 'components/Section/H2';

/* SearchFilter Components */
import SearchFilter from 'components/SearchFilter';
// import FilterButton from 'components/SearchFilter/Filter';

/* OptionMenu Components */
// import OptionMenu from 'components/OptionMenu';

/* Modals */
import Modal from 'components/Modal';
import ExportButton from 'components/ExportButton';
import ModalButton from 'components/StyleUtils/ModalButton';
import ButtonBox from 'components/StyleUtils/ModalButtonBox';
import SelectWrap from 'components/StyleUtils/SelectWrap';

/* Calendar */
import Calendar from 'components/Calendar';
import SelectCal from 'components/Calendar/SelectCal';

import List from './List';

/* selectors, reducer, saga and actions */
import reducer from './reducer';
import saga from './saga';

import {
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPageDetails,
  // makeSelectEmpId,
  makeSelectTeamLists,
  makeSelectTeamListLoading,
  makeSelectTeamListError,
  makeSelectDtrUri,
} from './selectors';

import {
  getClearState,
  retrieveEmpList,
  searchAndFilterList,
  setEmpID,
  retrieveTeamList,
  dtrExport,
  clearDtrUri } from './actions';

export class EmployeeList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      SearchValue: '',
      isExportDtr: false,
      isCalendar: false,
      displayDate: moment().startOf('days'),
      teamId: '',
    };
  }

  componentDidMount() {
    this.props.dataRetrieveEmpList(1, false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dtrUri !== false) {
      location.assign(nextProps.dtrUri);
      this.props.clearUri();
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  getEmpId = (id, obj) => {
    this.props.setEmpIdForFloorPage(id);
    this.props.history.push({
      pathname: '/workforce/floor-status',
      emp: {
        detail: obj,
        id,
      },
    });
  }

  selectedDate = (date) => {
    // var _this = this;
    this.setState({
      displayDate: date,
    });

    // this.props.retrieveInitialData(this.state.empId, moment(date).format('M/DD/YYYY'));
  }

  // Search and Filter
  searchAndFilter = (val) => {
    this.setState({
      SearchValue: (val) || '',
    });

    this.props.reqSearchFilter(val);
  }

  // Export DTR Modal
  toggleExportModal = () => {
    this.setState({
      isExportDtr: !this.state.isExportDtr,
    });
  }

  handleChange = (e) => {
    const index = e.target.value;
    this.setState({
      teamId: this.props.teamList[index].TeamID,
    });
  }

  // Calendar Component func
  toggleCalendar = () => {
    this.setState({
      isCalendar: !this.state.isCalendar,
    });
  }

  gotoPage = (e) => {
    const page = e.selected + 1;
    this.props.onGotoPage(page, this.state.SearchValue);
  }

  render() {
    // Local Component State
    const {
      displayDate,
      teamId,
    } = this.state;

    // Declare our props
    const {
      loading,
      error,
      empList,
      PageDetails,
      retrieveTeamsList,
      teamList,
      teamListLoading,
      teamListError,
      generateDtr,
    } = this.props;

    // Pass our Lists props as one
    const dataList = {
      loading,
      error,
      empList,
    };

    // Get Max Page Index of the list (defaults to 1)
    let maxPageIndex = 1;
    if (PageDetails != null) {
      maxPageIndex = PageDetails.MaxPageIndex;
    }

    // Export DTR content
    let exportDTR;
    if (teamListLoading) exportDTR = <Loading />;
    if (teamListError) exportDTR = <p className="no-data">No Data Found</p>;
    if (teamList) {
      const date = moment(displayDate).format('YYYY-MM-DD');

      const options = teamList.map((item, index) =>
        <option key={item.TeamID} value={index}>{item.Name} ({item.Department.Name})</option>
      );
      exportDTR = (
        <div>
          <SelectCal width="50%">
            <label htmlFor="chooseDate">Choose Date</label>
            <div className="data">
              <span role="presentation" className="content" onClick={this.toggleCalendar}>{moment(displayDate).format('LL')}</span>
              <button className="fa fa-caret-down" onClick={this.toggleCalendar} />
              { this.state.isCalendar &&
                <div className="cal-wrap">
                  <H2>Select Date</H2>
                  <Calendar selectedDate={this.selectedDate} hideCal={this.toggleCalendar} displayDate={displayDate} />
                </div>
              }
            </div>
          </SelectCal>
          <SelectWrap padding="0 10px 10px">
            <label htmlFor="selectGroup">WorkGroup</label>
            <div className="select-cont">
              <i className="fa fa-caret-down" />
              <select id="selectGroup" onChange={this.handleChange}>
                {options}
              </select>
            </div>
          </SelectWrap>

          <ButtonBox>
            <ModalButton onClick={() => { generateDtr(date, teamId); }}>Export</ModalButton>
            <ModalButton color="gray" onClick={this.toggleExportModal}>Cancel</ModalButton>
          </ButtonBox>
        </div>
      );
    }

    return (
      <PageWrap>
        <Helmet>
          <title>WorkForce Floor Status List</title>
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Back onClick={this.props.history.goBack}><FontAwesomeIcon icon={faCaretLeft} /> BACK TO WORKFORCE ADMIN</Back>

            <Section>
              <H2>Employee Floor Status List</H2>

              <SearchFilter onClick={(e) => { this.searchAndFilter(e); }} search placeholder="Search Floor Status List..." defaultVal={this.state.SearchValue}>
                {/* <FilterButton>
                  <OptionMenu title="Filters" position="right" filterButton={true}>
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
                </FilterButton> */}
                <ExportButton onClick={() => { this.toggleExportModal(); retrieveTeamsList(); }} text="Export DTR" />
              </SearchFilter>

              <EMPMasterlist>
                <List {...dataList} getEmpId={this.getEmpId} />
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
                    onPageChange={this.gotoPage}
                    activeClassName={'active'}
                  />
                </Pagination>
              }
            </Section>
          </PageContent>
        </Main>
        <Footer />

        {/* Modal for DTR Export */}
        <Modal
          show={this.state.isExportDtr}
          title="Export DTR"
          onClose={this.toggleExportModal}
          showCloseBtn
          width="350px"
        >
          {exportDTR}
        </Modal>
      </PageWrap>
    );
  }
}

EmployeeList.defaultProps = {
  teamList: false,
  empList: false,
  dtrUri: false,
};

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
  onGotoPage: PropTypes.func,
  teamList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  teamListLoading: PropTypes.bool,
  teamListError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  dtrUri: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  // Function dispatch props
  clearState: PropTypes.func,
  dataRetrieveEmpList: PropTypes.func,
  reqSearchFilter: PropTypes.func,
  setEmpIdForFloorPage: PropTypes.func,
  retrieveTeamsList: PropTypes.func,
  generateDtr: PropTypes.func,
  clearUri: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  empList: makeSelectData(),
  PageDetails: makeSelectPageDetails(),
  teamList: makeSelectTeamLists(),
  teamListLoading: makeSelectTeamListLoading(),
  teamListError: makeSelectTeamListError(),
  dtrUri: makeSelectDtrUri(),
});

function mapDispatchToProps(dispatch) {
  return {
    clearState: () => dispatch(getClearState()),
    dataRetrieveEmpList: (page, search) => dispatch(retrieveEmpList(page, search)),
    onGotoPage: (page, search) => dispatch(retrieveEmpList(page, search)),
    reqSearchFilter: (query) => dispatch(searchAndFilterList(query)),
    setEmpIdForFloorPage: (id) => dispatch(setEmpID(id)),
    retrieveTeamsList: () => dispatch(retrieveTeamList()),
    generateDtr: (date, id) => dispatch(dtrExport(date, id)),
    clearUri: () => dispatch(clearDtrUri()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'wfadmin', reducer });
const withSaga = injectSaga({ key: 'wfadmin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EmployeeList);
