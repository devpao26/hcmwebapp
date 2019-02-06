/**
 * Custom Form Requests
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactPaginate from 'react-paginate';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faDownload, faCaretLeft } from '@fortawesome/fontawesome-free-solid';

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
import Section from 'components/Section';
import H2 from 'components/Section/H2';
import Back from 'components/Section/Back';

import Pagination from 'components/Pagination';
import Listings from 'components/Forms/Listings';
import ListContainer from 'components/Forms/ListContainer';
import SearchFilter from 'components/SearchFilter';
import FilterButton from 'components/SearchFilter/Button';
import Modal from 'components/Modal';
import FormViewDetails from 'components/Forms/FormViewDetails';

/* selectors, reducer, saga and actions */
import {
  FORMREQUEST_PENDING,
  FORMREQUEST_CANCEL,
  FORMREQUEST_APPROVE,
  FORMREQUEST_REJECT,
  COEFORMREQUEST_CUSTOM,
} from 'containers/App/constants';

import reducer from './reducer';
import saga from './saga';

import { RequestList } from './constants';
import {
  makeSelectData,
  makeSelectLoading,
  makeSelectError,
  makeSelectPages,
} from './selectors';

import {
  getRequestLists,
  resetFormState,
} from './actions';

import Lists from './Lists';

export class CustomFormComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isViewDetails: false,
      isUpdateDetails: false,
      employeeName: '',
      formRequestID: '',
      requestDetails: false,
      searchVal: false,
      filterVal: false,
    };
  }

  componentDidMount() {
    // Retrieve Leave Request List
    this.props.retrieveFormRequests(RequestList.RETRIEVE, false, false, 1);
  }

  componentWillUnmount() {
    // Reset the form state on component unmount
    this.props.resetFormState();
  }

  // Search Leave Request List
  searchLeaveReqList = (query) => {
    this.setState({
      searchVal: query,
    });

    this.props.retrieveFormRequests(RequestList.RETRIEVE, query, this.state.filterVal, 1);
  }

  // Filter Leave Request List
  filterRequestList = (e, filter) => {
    // Toggle active class name
    // get all element in the list
    const childEl = e.currentTarget.parentNode.children;

    // get the clicked element
    const targetEl = e.currentTarget;

    // Iterate through all the element and toggle the class
    for (let i = 0; i < childEl.length; i += 1) {
      if (targetEl !== childEl[i]) {
        childEl[i].classList.remove('active');
      } else {
        childEl[i].classList.add('active');
      }
    }
    // Set the value in local state
    this.setState({
      filterVal: filter,
    });

    this.props.retrieveFormRequests(RequestList.RETRIEVE, this.state.searchVal, filter, 1);
  }

  gotoPage = (e) => {
    const page = e.selected + 1;
    this.props.retrieveFormRequests(RequestList.PAGING, this.state.searchVal, this.state.filterVal, page);
  }

  // View Request Details
  showViewDetails = (e, formReqID, empName, index) => {
    e.preventDefault();

    this.setState({
      formRequestID: formReqID,
      employeeName: empName,
      isViewDetails: !this.state.isViewDetails,
      requestDetails: this.props.lists[index],
    });
  }

  hideViewDetails = (e) => {
    e.preventDefault();
    this.setState({
      isViewDetails: !this.state.isViewDetails,
    });
  }

  render() {
    const {
      lists, listsLoading, listsError, leaveRequestPages,
    } = this.props;

    const { requestDetails } = this.state;

    const listProps = {
      loading: listsLoading,
      error: listsError,
      lists,
      viewDetails: this.showViewDetails,
    };

    let attachs;
    let stepLength = 1;
    if (requestDetails) {
      stepLength = requestDetails.FormRequest.FormRequestStepList.length;
    }
    if (lists && this.state.isViewDetails) {
      if (requestDetails) {
        if (requestDetails.FormRequest.CompletionFileList.length !== 0) {
          attachs = requestDetails.FormRequest.CompletionFileList.map((attach) =>
            <span className="value" key={attach.ID}><a href={attach.Path} title="Download"><b>{attach.FileName}</b> <FontAwesomeIcon icon={faDownload} /></a></span>
          );
        } else {
          attachs = 'No attached file.';
        }
      }
    }

    let leaveRequestMaxPageIndex = 1;
    if (leaveRequestPages) {
      leaveRequestMaxPageIndex = leaveRequestPages.MaxPageIndex;
    }

    return (
      <PageWrap>
        <Helmet>
          <title>Form Requests Lists</title>
          <meta name="description" content="HCM-EMP - Form Requests" />
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Back onClick={this.props.history.goBack}><FontAwesomeIcon icon={faCaretLeft} /> BACK TO HR ADMIN</Back>
            <Section>
              <H2>COE Requests List</H2>
              <ListContainer>
                <SearchFilter search placeholder="Search List..." onClick={(query) => this.searchLeaveReqList(query)} defaultVal={(this.state.searchVal) || ''}>
                  <FilterButton className="active" onClick={(e) => this.filterRequestList(e, false)}>ALL</FilterButton>
                  <FilterButton onClick={(e) => { this.filterRequestList(e, FORMREQUEST_PENDING); }}>PENDING</FilterButton>
                  <FilterButton onClick={(e) => { this.filterRequestList(e, FORMREQUEST_REJECT); }}>REJECTED</FilterButton>
                  <FilterButton onClick={(e) => { this.filterRequestList(e, FORMREQUEST_APPROVE); }}>APPROVED</FilterButton>
                  <FilterButton onClick={(e) => { this.filterRequestList(e, FORMREQUEST_CANCEL); }}>CANCELLED</FilterButton>
                  {/* <FilterButton onClick={(e) => {this.filterRequestList(e, 'Removed')}}>REMOVED</FilterButton> */}
                </SearchFilter>

                <Listings noPadding>
                  <Lists {...listProps} />
                </Listings>

                { (leaveRequestPages && leaveRequestMaxPageIndex !== 1) &&
                  <Pagination>
                    <ReactPaginate
                      previousLabel={'Previous'}
                      nextLabel={'Next'}
                      breakLabel={<span>...</span>}
                      breakClassName={'break-me'}
                      pageCount={leaveRequestMaxPageIndex}
                      marginPagesDisplayed={1}
                      pageRangeDisplayed={4}
                      onPageChange={this.gotoPage}
                      activeClassName={'active'}
                    />
                  </Pagination>
                }
              </ListContainer>
            </Section>
          </PageContent>
        </Main>
        <Footer />

        <Modal
          show={this.state.isViewDetails}
          onClose={this.hideViewDetails}
          showCloseBtn
          title="Form Request Details"
          width="450px"
        >
          {(requestDetails) &&
            <FormViewDetails>
              { (requestDetails.FormRequest.FormRequestStatusID === FORMREQUEST_PENDING) &&
                <p>
                  <span className="label">Status</span>
                  <span className="value">
                    { (requestDetails.FormRequest.FormRequestStatusID === FORMREQUEST_PENDING) &&
                      `Pending (${requestDetails.FormRequest.ApprovedCount} of ${requestDetails.FormRequest.RequiredApprovalCount})`
                    }
                    { (requestDetails.FormRequest.FormRequestStatusID !== FORMREQUEST_PENDING && requestDetails.FormRequest.ApproverPassedStep) &&
                      `Approved (${requestDetails.FormRequest.ApprovedCount} of ${requestDetails.FormRequest.RequiredApprovalCount})`
                    }
                  </span>
                </p>
              }
              { (stepLength > 1 && !requestDetails.FormRequest.IsCompleted) &&
                <p>
                  <span className="label">Last Approved By:</span>
                  <span className="value">
                    {requestDetails.FormRequest.FormRequestStepList[stepLength - 1].Approver.FirstName} {requestDetails.FormRequest.FormRequestStepList[stepLength - 1].Approver.LastName}
                  </span>
                </p>
              }
              { (requestDetails.FormRequest.FormRequestStatusID === FORMREQUEST_REJECT || requestDetails.FormRequest.IsCompleted) &&
                <p>
                  <span className="label">General Status</span>
                  {(requestDetails.FormRequest.FormRequestStatusID === FORMREQUEST_REJECT) && <span className="value reject">Rejected</span>}
                  {(requestDetails.FormRequest.IsCompleted) && <span className="value complete">Completed</span>}
                </p>
              }
              <p>
                <span className="label">Reason</span>
                <span className="value border">{requestDetails.Reason}</span>
              </p>
              <p>
                <span className="label">COE Type</span>
                <span className="value">{(requestDetails.COETypeID === COEFORMREQUEST_CUSTOM) ? requestDetails.COEUsageType : requestDetails.COEType.Name}</span>
              </p>
              { (requestDetails.FormRequest.CompletionFileList.length !== 0) &&
                <p>
                  <span className="label">Generated COE File</span>
                  <span className="value">{attachs}</span>
                </p>
              }
            </FormViewDetails>
          }
        </Modal>
      </PageWrap>
    );
  }
}

CustomFormComponent.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  listsLoading: PropTypes.bool,
  listsError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  leaveRequestPages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  // Function PropTypes (for the mapDispatchToProps)
  retrieveFormRequests: PropTypes.func,
  resetFormState: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  lists: makeSelectData('formLists'),
  listsLoading: makeSelectLoading('formLists'),
  listsError: makeSelectError('formLists'),
  leaveRequestPages: makeSelectPages('formLists'),
});

function mapDispatchToProps(dispatch) {
  return {
    retrieveFormRequests: (type, search, filter, page) => dispatch(getRequestLists(type, search, filter, page)),
    resetFormState: () => dispatch(resetFormState()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'COERequests', reducer });
const withSaga = injectSaga({ key: 'COERequests', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CustomFormComponent);
