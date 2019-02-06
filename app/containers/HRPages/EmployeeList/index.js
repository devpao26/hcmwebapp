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
import Modal from 'components/Modal';
import Confirm from 'components/ConfirmationDialog';

import Section from 'components/Section';
import Back from 'components/Section/Back';
import H2 from 'components/Section/H2';

import SearchFilter from 'components/SearchFilter';
// import FilterButton from 'components/SearchFilter/Filter';

import EmployeeProfile from 'containers/EmployeeProfile';
import { AdminTypes } from 'containers/EmployeeProfile/constants';

import MasterList from 'containers/Masterlist';

import List from './List';
import LeaveCredits from './LeaveCredits';

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
  retrieveEmpListSearch,
  getClearState,
  clearLeavesData,
} from './actions';

export class EmployeeList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isViewEmpProfile: false,
      filterOptions: false,
      isAddLeaveCredits: false,
      isAddLeaveCreditsResp: false,
      empID: '',
      empSearchVal: '',
      empPageIndex: 1,
    };
  }

  componentDidMount() {
    this.props.dataRetrieveEmpList(1, false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updateLeaveSuccess || nextProps.updateLeaveError) {
      this.setState({
        isAddLeaveCredits: false,
        isAddLeaveCreditsResp: true,
      });
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  showFilter = () => {
    this.setState({
      filterOptions: !this.state.filterOptions,
    });
  }

  /* Toggle Employee Profile View and Retrieve Emp Profile */
  showEmpProfileView = (empID) => {
    this.setState({
      empID,
      isViewEmpProfile: !this.state.isViewEmpProfile,
    });
  }
  hideEmpProfileView = () => {
    this.setState({
      empID: '',
      isViewEmpProfile: !this.state.isViewEmpProfile,
    });
  }

  empListSearch = (val) => {
    this.setState({
      empPageIndex: 1,
      empSearchVal: val,
    });
    this.props.dataRetrieveEmpListSearch(1, val);
  }

  gotoEmpListPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      empPageIndex: page,
    });
    this.props.dataRetrieveEmpList(page, this.state.empSearchVal);
  }

  // Update Leave Credits
  showAddLeaveCredits = (id, empProfile) => {
    this.setState({
      empID: id,
      empProf: empProfile,
      isAddLeaveCredits: true,
    });
  }
  hideAddLeaveCredits = (e) => {
    e.preventDefault();
    this.setState({
      isAddLeaveCredits: false,
    });
  }
  hideLeaveResponse = () => {
    this.setState({
      isAddLeaveCreditsResp: false,
    });
    this.props.dataRetrieveEmpListSearch(this.state.empPageIndex, this.state.empSearchVal);
    this.props.clearLeaveData();
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
      empListLoading,
      empListError,
      empList,
      empListPages,
    } = this.props;

    // Pass our List props as one
    const empListProps = {
      loading: empListLoading,
      error: empListError,
      lists: empList,
      leaves: this.showAddLeaveCredits,
      getProf: this.empProfileRetrieve,
      viewProf: this.showEmpProfileView,
    };

    // Get Max Page Index of the list (defaults to 1)
    let maxPageIndex = 1;
    if (empListPages != null) {
      maxPageIndex = empListPages.MaxPageIndex;
    }

    return (
      <PageWrap>
        <Helmet>
          <title>Employee Master List</title>
          <meta name="description" content="HCM-EMP - Employee Master List" />
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Back onClick={this.props.history.goBack}><FontAwesomeIcon icon={faCaretLeft} /> BACK TO HR ADMIN</Back>
            <MasterList />

            <Section>
              <H2>Employee Master List</H2>

              <SearchFilter search onClick={(val) => { this.empListSearch(val); }} formRef={(el) => { this.searchEmpListForm = el; }} placeholder="Search Employees..." defaultVal={(this.state.empSearchVal) || ''}>
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
                <List {...empListProps} />
              </EMPMasterlist>

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
                    onPageChange={this.gotoEmpListPage}
                    activeClassName={'active'}
                  />
                </Pagination>
              }
            </Section>
          </PageContent>
        </Main>
        <Footer />

        {/* Update Employee Leave Credits */}
        <Modal
          show={this.state.isAddLeaveCredits}
          title="Add Leave Credits"
          width="300px"
        >
          <LeaveCredits
            onClose={this.hideAddLeaveCredits}
            empID={this.state.empID}
            empProfile={this.state.empProf}
          />
        </Modal>

        {/* Update Leave Credits Success */}
        <Confirm
          show={this.state.isAddLeaveCreditsResp}
          title={(this.props.updateLeaveSuccess) ? 'SUCCESS' : 'FAILED'}
          onClick={this.hideLeaveResponse}
          okBtnText="OK"
        >
          {(this.props.updateLeaveSuccess) && <p>Employee leave credits successfully updated.</p>}
          {(this.props.updateLeaveError) && <p>Employee leave credits has not been updated. Please try again later.</p>}
        </Confirm>

        {/* Employee Profile Component */}
        { (this.state.isViewEmpProfile) &&
          <EmployeeProfile
            show={this.state.isViewEmpProfile}
            hide={this.hideEmpProfileView}
            empID={this.state.empID}
            admin={AdminTypes.HR}
          />
        }
      </PageWrap>
    );
  }
}

EmployeeList.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  empListLoading: PropTypes.bool,
  empListError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  empList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.bool,
  ]),
  empListPages: PropTypes.any,
  updateLeaveSuccess: PropTypes.bool,
  updateLeaveError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  // Functions dispatch props
  clearState: PropTypes.func,
  dataRetrieveEmpList: PropTypes.func,
  dataRetrieveEmpListSearch: PropTypes.func,
  clearLeaveData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  empListLoading: makeSelectLoading('empList'),
  empListError: makeSelectError('empList'),
  empList: makeSelectData('empList'),
  empListPages: makeSelectPageDetails('empList'),
  updateLeaveSuccess: makeSelectSuccess('updateLeaves'),
  updateLeaveError: makeSelectError('updateLeaves'),
});

function mapDispatchToProps(dispatch) {
  return {
    clearState: () => dispatch(getClearState()),
    dataRetrieveEmpList: (page, search) => dispatch(retrieveEmpList(page, search)),
    dataRetrieveEmpListSearch: (page, search) => dispatch(retrieveEmpListSearch(page, search)),
    clearLeaveData: () => dispatch(clearLeavesData()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'hradmin', reducer });
const withSaga = injectSaga({ key: 'hradmin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EmployeeList);
