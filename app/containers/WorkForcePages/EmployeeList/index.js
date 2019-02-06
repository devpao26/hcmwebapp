/*
 * Employee Master List
 *
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/fontawesome-free-solid';

/* Global References */
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

/* Global Components */
import Loading from 'components/LoadingIndicator';
import PageWrap from 'components/PageWrap';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';
import PageContent from 'components/Main/PageContent';
import Sidebar from 'components/Sidebar';
import Pagination from 'components/Pagination';
import Confirm from 'components/ConfirmationDialog';
import EMPMasterlist from 'components/Employee/EMPMasterlist';

/* Section Component */
import Section from 'components/Section';
import Back from 'components/Section/Back';
import H2 from 'components/Section/H2';

/* SearchFilter Components */
import SearchFilter from 'components/SearchFilter';
// import FilterButton from 'components/SearchFilter/Filter';

/**
 * Options : View Emp Profile
 */
import EmployeeProfile from 'containers/EmployeeProfile';
import { AdminTypes } from 'containers/EmployeeProfile/constants';

import reducer from './reducer';
import saga from './saga';
import {
  makeSelectError,
  makeSelectSuccess,
  makeSelectPageDetails,
} from './selector';

import {
  getEmpList,
  getEnrollEmpToApp,
  getEnrollEmpToAppReset,
  getEmpListNoReset,
} from './actions';

import Lists from './Lists';

export class WFEmpMasterList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isEnrollEmpToApp: false,
      enrollEmpName: '',
      enrollEmpID: false,
      isEnrollEmpResponse: false,
      empSearchVal: '',
      empPageIndex: 1,
      isSavingLoading: false,
      isViewEmpProfile: false,
      empSelProf: false, // Selected Emp
    };
  }
  // Execute after the DOM has been rendered
  componentDidMount() {
    // Initial retrieval of employee list
    this.props.retrieveEmpList(1, false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.enrollEmpSuccess || nextProps.enrollEmpError) {
      this.setState({
        isSavingLoading: false,
        isEnrollEmpResponse: true,
        isEnrollEmpToApp: false,
      });
    }
  }

  empListGotoPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      empPageIndex: page,
    });
    this.props.retrieveEmpListNoReset(page, this.state.empSearchVal);
  }

  empListSearch = (val) => {
    this.setState({
      empPageIndex: 1,
      empSearchVal: (val) || '',
    });
    this.props.retrieveEmpList(1, val);
  }

  showConfirmEnrollEmpToApp = (e, name, id) => {
    this.setState({
      isEnrollEmpToApp: true,
      enrollEmpName: name,
      enrollEmpID: id,
    });
  }
  hideConfirmEnrollEmpToApp = () => {
    this.setState({
      isEnrollEmpToApp: false,
      enrollEmpName: '',
      enrollEmpID: false,
    });
  }
  confirmEnrollEmpToApp = () => {
    this.setState({
      isSavingLoading: true,
    });
    this.props.enrollEmpToApp(this.state.enrollEmpID);
  }
  hideEnrollEmpResponse = () => {
    this.setState({
      isEnrollEmpResponse: false,
    });
    this.props.enrollEmpToAppReset();
    this.props.retrieveEmpListNoReset(this.state.empPageIndex, this.state.empSearchVal);
  }


  /* Toggle Employee Profile View and Retrieve Emp Profile */
  empProfileRetrieve = (empObject) => {
    this.setState({
      empSelProf: empObject,
    });
  }
  showEmpProfileView = () => {
    this.setState({
      isViewEmpProfile: !this.state.isViewEmpProfile,
    });
  }
  hideEmpProfileView = () => {
    this.setState({
      isViewEmpProfile: !this.state.isViewEmpProfile,
    });
  }


  render() {
    const { empPageDetails } = this.props;

    let maxPageIndex = 1; // Get Max Page Index of the list (defaults to 1)
    if (empPageDetails) {
      maxPageIndex = empPageDetails.MaxPageIndex;
    }

    return (
      <PageWrap>
        <Helmet>
          <title>Employee Master List</title>
        </Helmet>
        <Header />
        <Sidebar />
        <Main>
          <PageContent>
            <Back onClick={this.props.history.goBack}><FontAwesomeIcon icon={faCaretLeft} /> BACK TO WORKFORCE ADMIN</Back>
            <Section>
              <H2>Employee Master List</H2>
              <SearchFilter search onClick={(val) => { this.empListSearch(val); }} formRef={(el) => { this.searchEmpListForm = el; }} placeholder="Search Employees..." defaultVal={this.state.empSearchVal} />

              <EMPMasterlist>
                <Lists enrollEmp={this.showConfirmEnrollEmpToApp} getProf={this.empProfileRetrieve} viewProf={this.showEmpProfileView} />
              </EMPMasterlist>

              { (empPageDetails && maxPageIndex !== 1) &&
                <Pagination>
                  <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={<span>...</span>}
                    breakClassName={'break-me'}
                    pageCount={maxPageIndex}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={4}
                    onPageChange={this.empListGotoPage}
                    activeClassName={'active'}
                  />
                </Pagination>
              }
            </Section>
          </PageContent>
        </Main>
        <Footer />
        {/* Show Confirmation prompt for enrollment of employee */}
        <Confirm
          show={this.state.isEnrollEmpToApp}
          title="CONFIRM ENROLLMENT"
          onClick={this.confirmEnrollEmpToApp}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
          onClose={this.hideConfirmEnrollEmpToApp}
        >
          {(this.state.isSavingLoading) && <div className="loading-cont"><Loading /></div>}
          <p>Are you sure you want to enroll<br /><span className="text-green">{this.state.enrollEmpName}</span><br />into the WorkForce Desktop App?</p>
        </Confirm>
        <Confirm
          show={this.state.isEnrollEmpResponse}
          title={(this.props.enrollEmpSuccess) ? 'SUCCESS' : 'ERROR'}
          onClick={this.hideEnrollEmpResponse}
          okBtnText="OK"
        >
          {(this.props.enrollEmpSuccess) && <p>You have successfully enrolled <br /><span className="text-green">{this.state.enrollEmpName}</span> to the WorkForce Desktop App.</p>}
          {(this.props.enrollEmpError) && <p>There was a problem enrolling <br /><span className="text-green">{this.state.enrollEmpName}</span>. Please try again later.</p>}
        </Confirm>

        {/* Employee Profile Component */}
        { (this.state.isViewEmpProfile) &&
          <EmployeeProfile
            show={this.state.isViewEmpProfile}
            hide={this.hideEmpProfileView}
            admin={AdminTypes.WF}
          />
        }
      </PageWrap>
    );
  }
}

WFEmpMasterList.propTypes = {
  history: PropTypes.object,
  empPageDetails: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  // map state props
  enrollEmpSuccess: PropTypes.bool,
  enrollEmpError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  // Function dispatch props
  retrieveEmpList: PropTypes.func,
  retrieveEmpListNoReset: PropTypes.func,
  enrollEmpToApp: PropTypes.func,
  enrollEmpToAppReset: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  empPageDetails: makeSelectPageDetails('empList'),
  enrollEmpSuccess: makeSelectSuccess('enrollEmp'),
  enrollEmpError: makeSelectError('enrollEmp'),
});

function mapDispatchToProps(dispatch) {
  return {
    retrieveEmpList: (page, search) => dispatch(getEmpList(page, search)),
    retrieveEmpListNoReset: (page, search) => dispatch(getEmpListNoReset(page, search)),
    enrollEmpToApp: (id) => dispatch(getEnrollEmpToApp(id)),
    enrollEmpToAppReset: () => dispatch(getEnrollEmpToAppReset()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'wfadmin', reducer });
const withSaga = injectSaga({ key: 'wfadmin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WFEmpMasterList);
