/**
 * OT Requests List Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

/* Global injectSaga and injectReducer */
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Pagination from 'components/Pagination';
import Listings from 'components/Forms/Listings';
import ListContainer from 'components/Forms/ListContainer';
import SearchFilter from 'components/SearchFilter';
import FilterButton from 'components/SearchFilter/Button';
import Modal from 'components/Modal';
import FormViewDetails from 'components/Forms/FormViewDetails';
import ButtonWrapper from 'components/Button/ButtonWrapper';
import Button from 'components/Button';
import ConfirmBox from 'components/ConfirmationDialog';

/* selectors, reducer, saga and actions */
import {
  FORMREQUEST_PENDING,
  FORMREQUEST_CANCEL,
  FORMREQUEST_APPROVE,
  FORMREQUEST_REJECT,
} from 'containers/App/constants';

import reducer from './reducer';
import saga from './saga';

import {
  makeSelectData,
  makeSelectLoading,
  makeSelectError,
  makeSelectPages,
} from './selectors';

import {
  getOTRequests,
  updateRequestStatus,
  clearUpdateRequest,
  resetFormState,
} from './actions';

import OTRequestList from './Lists';

export class OTRequestsComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      searchVal: '',
      filterVal: '',
      requestDetails: false,
      isViewDetails: false,
      formRequestID: '',
      employeeName: '',
      isConfirmUpdate: false,
      updateStatusText: '',
      statusID: '',
      updateStatusSuccess: false,
    };
  }

  componentDidMount() {
    // Retrieve initial data
    this.props.retrieveOTRequests(false, false, 1);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updateStatusSuccess === true) {
      this.setState({
        updateStatusSuccess: true,
      });
    }
  }

  componentWillUnmount() {
    // Reset the form state on component unmount
    this.props.resetFormState();
  }

  gotoPage = (e) => {
    const page = e.selected + 1;
    this.props.retrieveOTRequests(this.state.searchVal, this.state.filterVal, page);
  }

  // Search Leave Request List
  searchLeaveReqList = (query) => {
    this.setState({
      searchVal: query,
    });

    this.props.retrieveOTRequests(query, this.state.filterVal, 1);
  }

  // Filter Leave Request List
  filterLeaveReqList = (e, filter) => {
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

    this.props.retrieveOTRequests(this.state.searchVal, filter, 1);
  }

  // View Request Details
  showViewDetails = (e, formReqID, empName, index) => {
    e.preventDefault();

    this.setState({
      formRequestID: formReqID,
      employeeName: empName,
      isViewDetails: !this.state.isViewDetails,
      requestDetails: this.props.otLists[index],
    });
  }

  hideViewDetails = (e) => {
    e.preventDefault();
    this.setState({
      isViewDetails: !this.state.isViewDetails,
    });
  }

  // Update Status
  showConfirmUpdate = (e, formReqID, statusID, empName) => {
    e.preventDefault();

    this.setState({
      isViewDetails: false,
      updateStatusText: e.currentTarget.innerText,
      employeeName: empName,
      formRequestID: formReqID,
      statusID,
      isConfirmUpdate: !this.state.isConfirmUpdate,
    });
  }

  hideConfirmUpdate = () => {
    this.setState({
      isConfirmUpdate: !this.state.isConfirmUpdate,
    });
  }

  render() {
    const { otListsLoading, otListsError, otLists, otListsPages } = this.props;

    const { requestDetails } = this.state;

    const otRequestProps = {
      loading: otListsLoading,
      error: otListsError,
      lists: otLists,
      viewDetails: this.showViewDetails,
      update: this.showConfirmUpdate,
    };

    let otListMaxPageIndex = 1;
    if (otListsPages) {
      otListMaxPageIndex = otListsPages.MaxPageIndex;
    }

    return (
      <ListContainer>
        <h3>OT Requests List</h3>
        <SearchFilter search placeholder="Search List..." onClick={(query) => this.searchLeaveReqList(query)} defaultVal={(this.state.searchVal) || ''}>
          <FilterButton className="active" onClick={(e) => this.filterLeaveReqList(e, false)}>ALL</FilterButton>
          <FilterButton onClick={(e) => { this.filterLeaveReqList(e, FORMREQUEST_PENDING); }}>PENDING</FilterButton>
          <FilterButton onClick={(e) => { this.filterLeaveReqList(e, FORMREQUEST_REJECT); }}>REJECTED</FilterButton>
          <FilterButton onClick={(e) => { this.filterLeaveReqList(e, FORMREQUEST_APPROVE); }}>APPROVED</FilterButton>
          <FilterButton onClick={(e) => { this.filterLeaveReqList(e, FORMREQUEST_CANCEL); }}>CANCELLED</FilterButton>
          {/* <FilterButton onClick={(e) => {this.filterLeaveReqList(e, 'Removed')}}>REMOVED</FilterButton> */}
        </SearchFilter>

        <Listings noPadding>
          <OTRequestList {...otRequestProps} />
        </Listings>

        { (otListsPages && otListMaxPageIndex !== 1) &&
          <Pagination>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={<span>...</span>}
              breakClassName={'break-me'}
              pageCount={otListMaxPageIndex}
              marginPagesDisplayed={1}
              pageRangeDisplayed={4}
              onPageChange={this.gotoPage}
              activeClassName={'active'}
            />
          </Pagination>
        }

        {/* View Details */}
        <Modal
          show={this.state.isViewDetails}
          onClose={this.hideViewDetails}
          showCloseBtn
          title="OT Request Details"
          width="400px"
        >
          {(requestDetails) &&
            <FormViewDetails>
              { (requestDetails.FormRequest.FormRequestStatusID !== FORMREQUEST_REJECT && !requestDetails.FormRequest.IsCompleted) &&
                <p>
                  <span className="label">Status</span>
                  <span className="value">
                    { (requestDetails.FormRequest.FormRequestStatusID === FORMREQUEST_PENDING && !requestDetails.FormRequest.IsEscalated) &&
                      `Pending (${requestDetails.FormRequest.ApprovedCount} of ${requestDetails.FormRequest.RequiredApprovalCount})`
                    }
                    { (requestDetails.FormRequest.FormRequestStatusID !== FORMREQUEST_PENDING && requestDetails.FormRequest.ApproverPassedStep && !requestDetails.FormRequest.IsEscalated) &&
                      `Approved (${requestDetails.FormRequest.ApprovedCount} of ${requestDetails.FormRequest.RequiredApprovalCount})`
                    }
                    {requestDetails.FormRequest.IsEscalated && 'This request has already been escalated.'}
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
                <span className="label">Date</span>
                <span className="value">{moment(requestDetails.OTFrom).format('LL')} to {moment(requestDetails.OTTo).format('LL')}</span>
              </p>
              <p>
                <span className="label">Captured OT Minutes from Shift</span>
                <span className="value">{requestDetails.RenderedMinutes}</span>
              </p>
              <p>
                <span className="label">Requested OT Minutes</span>
                <span className="value">{requestDetails.RequestedOTMinutes}</span>
              </p>
              <p>
                <span className="label">Remarks</span>
                <span className="value border">{requestDetails.Remarks}</span>
              </p>
              {(requestDetails.FormRequest.FormRequestStatusID === FORMREQUEST_PENDING && requestDetails.FormRequest.IsPendingOfApprover && !requestDetails.FormRequest.IsEscalated) &&
                <ButtonWrapper>
                  <Button handleRoute={(e) => { this.showConfirmUpdate(e, requestDetails.FormRequestID, FORMREQUEST_APPROVE, `${requestDetails.FormRequest.EmpProfile.FirstName} ${requestDetails.FormRequest.EmpProfile.LastName}`); }} color="green">Approve</Button>
                  <Button handleRoute={(e) => { this.showConfirmUpdate(e, requestDetails.FormRequestID, FORMREQUEST_REJECT, `${requestDetails.FormRequest.EmpProfile.FirstName} ${requestDetails.FormRequest.EmpProfile.LastName}`); }} color="red">Reject</Button>
                  {/* <Button handleRoute={() => { alert() }} color="gray">CANCEL REQUEST</Button>
                  <Button handleRoute={() => { alert() }} color="gray">REMOVE</Button> */}
                </ButtonWrapper>
              }
            </FormViewDetails>
          }
        </Modal>
        {/* Confirm Status Update */}
        <ConfirmBox
          show={this.state.isConfirmUpdate}
          title={this.state.updateStatusText}
          okBtnText="Yes"
          onClick={() => { this.setState({ isConfirmUpdate: false }); this.props.updateRequestStatus(this.state.formRequestID, this.state.statusID); }}
          cancelBtn
          cancelBtnText="No"
          onClose={this.hideConfirmUpdate}
        >
          <p>Are you sure you want to <span className="green">{this.state.updateStatusText}</span> the request of <span className="green">{this.state.employeeName}</span>?</p>
        </ConfirmBox>

        {/* Status Update Success */}
        <ConfirmBox
          show={this.state.updateStatusSuccess}
          title={`${this.state.updateStatusText} SUCCESS`}
          okBtnText="OK"
          onClick={() => { this.setState({ updateStatusSuccess: false }); this.props.clearUpdateRequest(); this.props.retrieveOTRequests(); }}
        >
          <p>Request successfully {(this.state.updateStatusText === 'Approve') ? 'approved.' : 'rejected.' }</p>
        </ConfirmBox>
      </ListContainer>
    );
  }
}

OTRequestsComponent.propTypes = {
  otListsLoading: PropTypes.bool,
  otListsError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  otLists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  otListsPages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  updateStatusSuccess: PropTypes.bool,

  // Function PropTypes (for the mapDispatchToProps)
  retrieveOTRequests: PropTypes.func,
  updateRequestStatus: PropTypes.func,
  clearUpdateRequest: PropTypes.func,
  resetFormState: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  otLists: makeSelectData('formLists'),
  otListsLoading: makeSelectLoading('formLists'),
  otListsError: makeSelectError('formLists'),
  otListsPages: makeSelectPages('formLists'),
  updateStatusSuccess: makeSelectData('updateRequestStatus'),
});

function mapDispatchToProps(dispatch) {
  return {
    retrieveOTRequests: (search, filter, page) => dispatch(getOTRequests(search, filter, page)),
    updateRequestStatus: (formReqID, statusID) => dispatch(updateRequestStatus(formReqID, statusID)),
    clearUpdateRequest: () => dispatch(clearUpdateRequest()),
    resetFormState: () => dispatch(resetFormState()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'OTRequests', reducer });
const withSaga = injectSaga({ key: 'OTRequests', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OTRequestsComponent);
