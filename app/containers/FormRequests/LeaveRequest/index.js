/*
 * Leave Request
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
import H2 from 'components/Section/H2';
import Back from 'components/Section/Back';
import Flex from 'components/SectionFlex';

/* Confirmation Dialog */
import ConfirmBox from 'components/ConfirmationDialog';

/* Own Components */
import Calendar from 'components/Calendar';
import Left from './Left';
import Right from './Right';
import LeaveCredits from './Table';
import CalendarWrapper from './CalendarWrapper';

import LeaveRequestForm from './LeaveRequestForm';
import HistoryList from './HistoryList';

/* selectors, reducer, saga and actions */
import reducer from './reducer';
import saga from './saga';

import {
  makeSelectUserData,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPages,
} from './selectors';

import {
  getDatas,
  getLeaveReqList,
  createLeaveRequest,
  clearLeaveRequest,
  resetFormState,
} from './actions';

export class LeaveRequestPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      displayDate: moment().startOf('days'),
      isRequestFailed: false,
      isRequestSuccess: false,
    };
  }

  componentDidMount() {
    // Initialize retrieving of inital datas
    if (this.props.userData) {
      const empID = this.props.userData.EmpProfileID;

      this.props.retrieveData(empID);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createRequestSuccess === true) {
      this.setState({
        isRequestSuccess: true,
      });
    }
  }

  componentWillUnmount() {
    // Reset Form states to be ready for use with the Form Approval page
    this.props.resetFormState();
  }

  showRequestFailed = (e) => {
    e.preventDefault();
    this.setState({
      isRequestFailed: !this.state.isRequestFailed,
    });
  }

  hideRequestSuccess = (e) => {
    e.preventDefault();

    this.setState({
      isRequestSuccess: false,
    });

    // Reset Leave Request Form
    // this.leaveRequestForm.reset();

    // Clear send request
    this.props.clearSendRequest();

    // Retrieve Leave Request List
    this.props.retrieveReqList();
  }

  sendData = (e, data, files) => {
    e.preventDefault();

    if (files === false) {
      this.props.sendRequest(data, false);
    } else {
      this.props.sendRequest(data, files);
    }
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
      userData,
      leaveReq, leaveReqLoading, leaveReqError, leaveReqPages,
      gotoPage,
      workFlowRefs, workFlowRefsLoading, workFlowRefsError,
      createRequestLoading, createRequestSuccess, createRequestError,
    } = this.props;

    // History List
    const historyList = {
      loading: leaveReqLoading,
      error: leaveReqError,
      list: leaveReq,
    };

    let leaveReqMaxPageIndex = 1;
    if (leaveReqPages) {
      leaveReqMaxPageIndex = leaveReqPages.MaxPageIndex;
    }

    // Leave Types
    let leaveTypes = [];
    if (workFlowRefs) {
      leaveTypes = workFlowRefs[0].LeaveTypeList;
    }

    // Leave Type Request Form Component Props
    const leaveForm = {
      loading: workFlowRefsLoading,
      error: workFlowRefsError,
      leaveTypes,
      save: this.sendData,
      sending: createRequestLoading,
      saveError: createRequestError,
      saveSuccess: createRequestSuccess,
    };

    return (
      <PageWrap>
        <Helmet>
          <title>Form Requests - Leave</title>
          <meta name="description" content="HCM-EMP - Form Requests [Leave]" />
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Back onClick={this.props.history.goBack}><i className="fa fa-caret-left" /> BACK TO FORM REQUEST</Back>
            <Flex>
              <Left>
                <LeaveCredits>
                  <thead>
                    <tr>
                      <th>Credit</th>
                      <th>Vacation Leave</th>
                      <th>Sick Leave</th>
                      <th>Personal Leave</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Used</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>Remaining</td>
                      <td>{userData.EmpLeaveCount.VLCount}</td>
                      <td>{userData.EmpLeaveCount.SLCount}</td>
                      <td>{userData.EmpLeaveCount.ELCount}</td>
                    </tr>
                  </tbody>
                </LeaveCredits>
                <CalendarWrapper>
                  <H2>Calendar <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>
                  <Calendar displayDate={this.state.displayDate} />
                </CalendarWrapper>
              </Left>

              <Right>
                <LeaveRequestForm {...leaveForm} />
              </Right>
            </Flex>

            <Section>
              <H2>Leave Requests</H2>
              <p />
              {/* { (history) &&
                <Filter>
                  <FilterButton className="active">All</FilterButton>
                  <FilterButton>Pending</FilterButton>
                  <FilterButton>Approved</FilterButton>
                  <FilterButton>Rejected</FilterButton>
                </Filter>
              } */}

              <EMPMasterlist>
                <HistoryList {...historyList} />
              </EMPMasterlist>

              { (leaveReqPages && leaveReqMaxPageIndex !== 1) &&
                <Pagination>
                  <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={<span>...</span>}
                    breakClassName={'break-me'}
                    pageCount={leaveReqMaxPageIndex}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={4}
                    onPageChange={gotoPage}
                    activeClassName={'active'}
                  />
                </Pagination>
              }
            </Section>
          </PageContent>
        </Main>
        <Footer />
        <ConfirmBox
          show={this.state.isRequestFailed}
          title="Request Failed"
          okBtnText="OK"
          onClick={this.showRequestFailed}
        >
          <p>{this.state.leaveTypeText} should be plotted over 2 calendar days.</p>
        </ConfirmBox>

        <ConfirmBox
          show={this.state.isRequestSuccess}
          title="Request Sent"
          okBtnText="OK"
          onClick={this.hideRequestSuccess}
        >
          <p>Your request has been sent successfully.</p>
        </ConfirmBox>
      </PageWrap>
    );
  }
}

LeaveRequestPage.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  userData: PropTypes.object,
  leaveReqLoading: PropTypes.bool,
  leaveReqError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  leaveReq: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  leaveReqPages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  workFlowRefsLoading: PropTypes.bool,
  workFlowRefsError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  workFlowRefs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  createRequestLoading: PropTypes.bool,
  createRequestError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  createRequestSuccess: PropTypes.bool,
  // Function Props
  retrieveData: PropTypes.func,
  retrieveReqList: PropTypes.func,
  gotoPage: PropTypes.func,
  sendRequest: PropTypes.func,
  clearSendRequest: PropTypes.func,
  resetFormState: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
  leaveReqLoading: makeSelectLoading('leaveRequestList'),
  leaveReqError: makeSelectError('leaveRequestList'),
  leaveReq: makeSelectData('leaveRequestList'),
  leaveReqPages: makeSelectPages('leaveRequestList'),
  workFlowRefsLoading: makeSelectLoading('workFlowFormLoad'),
  workFlowRefsError: makeSelectError('workFlowFormLoad'),
  workFlowRefs: makeSelectData('workFlowFormLoad'),
  createRequestLoading: makeSelectLoading('saveRequest'),
  createRequestError: makeSelectError('saveRequest'),
  createRequestSuccess: makeSelectData('saveRequest'),
});

function mapDispatchToProps(dispatch) {
  return {
    retrieveData: (id) => dispatch(getDatas(id, 1)),
    retrieveReqList: () => dispatch(getLeaveReqList(1)),
    gotoPage: (e) => {
      const page = e.selected + 1;
      dispatch(getLeaveReqList(page));
    },
    sendRequest: (data, files) => dispatch(createLeaveRequest(data, files)),
    clearSendRequest: () => dispatch(clearLeaveRequest()),
    resetFormState: () => dispatch(resetFormState()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'Forms', reducer });
const withSaga = injectSaga({ key: 'Forms', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LeaveRequestPage);
