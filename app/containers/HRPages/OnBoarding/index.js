/*
 * Employee OnBoarding page
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
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

/* Section Component */
import Section from 'components/Section';
import Back from 'components/Section/Back';
import H2 from 'components/Section/H2';

/* SearchFilter Components */
import SearchFilter from 'components/SearchFilter';
import FilterButton from 'components/SearchFilter/Button';

/* Confirmation Dialog */
import ConfirmBox from 'components/ConfirmationDialog';

/* selectors, reducer, saga and actions */
import { JO_STATUSREMOVE, JO_STATUSREJECT, JO_STATUSPENDING } from 'containers/App/constants';
import {
  makeSelectRefs,
} from 'containers/HomePage/selectors';

import reducer from './reducer';
import saga from './saga';

import {
  makeSelectData,
  makeSelectPageDetails,
  makeSelectLoading,
  makeSelectError,
  makeSelectRedirect,
  makeSelectNotifState,
  makeSelectJoStatus,
} from './selectors';

import {
  retrieveJoSignedList,
  changeApplJoStatus,
  writeApplIds,
  showHideJoStatSuccess,
  redirectToPpe,
  searchAndFilterList,
} from './actions';

import List from './List';

export class OnBoardingPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isChangeJoStat: false,
      confirmTitleText: '',
      confirmJoStatId: '',
      confirmMessageName: '',
      confirmMessageStatus: '',
      appliedJobId: '',
      ComSiteLocID: false,
      SearchValue: '',
    };
  }

  componentDidMount() {
    // on component mount retrieve jo signed applicant lists
    this.props.dataRetrieveJoList(1, false, false);
  }

  showConfirm = (e) => {
    e.preventDefault();
    // get our ids (job applied id and jo status id)
    const jobId = e.currentTarget.getAttribute('data-jobid');
    const joStatId = e.currentTarget.getAttribute('data-jostatid');

    // declare default var of our names and message status
    let applName;
    let message;
    /* run through our iteration to get the clicked applicant name
     * corresponding message status
     */
    this.props.joSignedList.map((jobItem) => {
      if (jobItem.ApplAppliedJobID === jobId) {
        applName = `${jobItem.ApplProfile.FirstName} ${jobItem.ApplProfile.LastName}`;
        return applName;
      }
      return null;
    });
    // jo status references
    const JOStatRefs = this.props.joStatusRefs[0].JOStatusRefs;
    JOStatRefs.map((statItem) => {
      if (statItem.JOStatusID === joStatId) {
        message = statItem.Name;
        return message;
      }
      return null;
    });

    // set in our state (not store state) to be passed on to confirm box
    this.setState({
      isChangeJoStat: !this.state.isChangeJoStat,
      confirmTitleText: e.currentTarget.textContent,
      appliedJobId: jobId,
      confirmJoStatId: joStatId,
      confirmMessageName: applName,
      confirmMessageStatus: message,
    });

    this.props.writeOurIds(jobId, joStatId);
  }

  hideConfirmSuccess = () => {
  }

  // Search and Filter
  searchAndFilter = (val) => {
    this.setState({
      SearchValue: (val) || '',
    });

    if (this.state.ComSiteLocID !== false) {
      this.props.reqSearchFilter(this.state.ComSiteLocID, val);
    } else {
      this.props.reqSearchFilter(false, val);
    }
  }

  locFilter = (e) => {
    const val = (e.currentTarget.value === 'all') ? false : e.currentTarget.value;
    this.setState({
      ComSiteLocID: val,
    });

    if (this.state.SearchValue !== '') {
      this.props.reqSearchFilter(val, this.state.SearchValue);
    } else {
      this.props.reqSearchFilter(val, false);
    }
  }

  gotoPage = (e) => {
    const page = e.selected + 1;
    this.props.dataRetrieveJoList(page, this.state.ComSiteLocID, this.state.SearchValue);
  }

  // mobile function to expand row
  rowExpand = (e) => {
    // Get our Parent Row
    const parentRow = e.currentTarget.parentNode.parentNode;
    // Toggle expand class
    parentRow.classList.toggle('expand');
  }

  render() {
    // Declare our props
    const {
      loading,
      error,
      joSignedList,
      PageDetails,
      comLocRefList,
      joStatusRefs,
      redirect,
      changeJOStatus,
      hideSuccessNotif,
      hidePpeSuccessNotif,
      showSuccessNotif,
      joStatus,
    } = this.props;

    // Consolidate our props to be passed on our list component
    const dataList = {
      loading,
      error,
      joSignedList,
      joStatusRefs,
    };

    // Get Max Page Index of the list (defaults to 1)
    let maxPageIndex = 1;
    if (PageDetails) {
      maxPageIndex = PageDetails.MaxPageIndex;
    }

    // Site Location reference from the store state tree global: { refsList: {} }
    let items;
    if (comLocRefList) {
      const siteLocs = comLocRefList[0].ComSiteLocRefs;
      items = siteLocs.map((item) =>
        <FilterButton key={item.ComSiteLocID} className={(this.state.ComSiteLocID === item.ComSiteLocID) ? 'active' : ''} value={item.ComSiteLocID} onClick={this.locFilter}>{item.Name}</FilterButton>
      );
    }

    // if our redirect is true
    if (redirect) {
      return (
        <Redirect to="/hradmin/ppe-requirements/" />
      );
    }

    return (
      <PageWrap>
        <Helmet>
          <title>Onboarding</title>
          <meta name="description" content="HCM-EMP - Onboarding" />
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Back onClick={this.props.history.goBack}><FontAwesomeIcon icon={faCaretLeft} /> BACK TO HR ADMIN</Back>

            <Section>
              <H2>JO Signed ({(PageDetails) ? PageDetails.TotalRecords : '0'})</H2>

              <SearchFilter search onClick={(e) => this.searchAndFilter(e)} placeholder="Search JO Signed Applicants..." defaultVal={this.state.SearchValue}>
                <FilterButton className={(this.state.ComSiteLocID === false) ? 'active' : ''} value="all" onClick={this.locFilter}>All Location</FilterButton>
                { items }
              </SearchFilter>

              <EMPMasterlist>
                <List {...dataList} showConfirm={this.showConfirm} />
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

        <ConfirmBox
          show={this.state.isChangeJoStat}
          title={this.state.confirmTitleText}
          // onClick={changeJOStatus}
          onClick={(e) => { changeJOStatus(e); this.setState({ isChangeJoStat: !this.state.isChangeJoStat }); }}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
          onClose={this.showConfirm}
        >
          <p>Are you sure you want to change status of <span className="green">{this.state.confirmMessageName}</span><br />to {this.state.confirmMessageStatus}</p>
        </ConfirmBox>

        { /* detect our JO status and show corresponding notification */
          (joStatus === 'Others') ? (
            <ConfirmBox
              show={showSuccessNotif}
              title="Success"
              onClick={(e) => { hideSuccessNotif(e); this.setState({ confirmJoStatId: '' }); }}
              okBtnText="OK"
              onClose={(e) => { hideSuccessNotif(e); this.setState({ confirmJoStatId: '' }); }}
            >
              { /* eslint no-nested-ternary: "off" */
                (this.state.confirmJoStatId === JO_STATUSREJECT)
                ? <p>You have successfully rejected <span className="green">{this.state.confirmMessageName}</span>.</p>
                : (this.state.confirmJoStatId === JO_STATUSPENDING)
                ? <p>You have successfully changed <br /><span className="green">{this.state.confirmMessageName}</span> status to Pending.</p>
                : (this.state.confirmJoStatId === JO_STATUSREMOVE)
                ? <p>You have successfully removed <br /><span className="green">{this.state.confirmMessageName}</span> from the list.</p>
                : null
              }
            </ConfirmBox>
          ) : (
            <ConfirmBox
              show={showSuccessNotif}
              title="Success"
              onClick={hidePpeSuccessNotif}
              okBtnText="OK"
              onClose={hidePpeSuccessNotif}
            >
              <p>You have successfully moved <span className="green">{this.state.confirmMessageName}</span><br /> to PPE.</p>
            </ConfirmBox>
          )
        }
      </PageWrap>
    );
  }
}

// Declare our prop types to prevent wrong values on our props
OnBoardingPage.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  loading: PropTypes.bool,
  redirect: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  joSignedList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.bool,
  ]),
  PageDetails: PropTypes.any,
  comLocRefList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  joStatusRefs: PropTypes.array,
  changeJOStatus: PropTypes.func,
  writeOurIds: PropTypes.func,
  showSuccessNotif: PropTypes.bool,
  hideSuccessNotif: PropTypes.func,
  hidePpeSuccessNotif: PropTypes.func,
  joStatus: PropTypes.string,
  // function dispatch props
  dataRetrieveJoList: PropTypes.func,
  reqSearchFilter: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  redirect: makeSelectRedirect(),
  joSignedList: makeSelectData(),
  PageDetails: makeSelectPageDetails(),
  comLocRefList: makeSelectRefs('formLoad'),
  joStatusRefs: makeSelectRefs('applForm'),
  showSuccessNotif: makeSelectNotifState(),
  joStatus: makeSelectJoStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    dataRetrieveJoList: (page, loc, search) => dispatch(retrieveJoSignedList(page, loc, search)),
    reqSearchFilter: (loc, input) => dispatch(searchAndFilterList(loc, input)),
    writeOurIds: (jobId, joStatId) => dispatch(writeApplIds(jobId, joStatId)),
    changeJOStatus: () => dispatch(changeApplJoStatus()),
    hideSuccessNotif: (evt) => {
      evt.preventDefault();
      dispatch(showHideJoStatSuccess(false, 'Others'));
      dispatch(retrieveJoSignedList(false));
    },
    hidePpeSuccessNotif: (evt) => {
      evt.preventDefault();
      dispatch(showHideJoStatSuccess(false, 'Others'));
      // Change the value of 'redirect' in our state
      dispatch(redirectToPpe());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'hradmin', reducer });
const withSaga = injectSaga({ key: 'hradmin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OnBoardingPage);
