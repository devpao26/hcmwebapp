/**
 * Leave Requests
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import ReactPaginate from 'react-paginate';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/fontawesome-free-solid';

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
  getLeaveRequestList,
  updateRequestStatus,
  clearUpdateRequest,
  resetFormState,
} from './actions';

import LeaveRequestList from './LeaveRequestLists';

export class LeaveRequestsComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isViewDetails: false,
      isUpdateDetails: false,
      leaveStartDate: moment(),
      leaveEndDate: moment().add(3, 'days'),
      isConfirmUpdate: false,
      updateStatusText: '',
      employeeName: '',
      formRequestID: '',
      statusID: '',
      requestDetails: false,
      updateStatusSuccess: false,
      searchVal: false,
      filterVal: false,
    };
  }

  componentDidMount() {
    // Retrieve Leave Request List
    this.props.retrieveLeaveReqList(false, false, 1);
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

  // Search Leave Request List
  searchLeaveReqList = (query) => {
    this.setState({
      searchVal: query,
    });

    this.props.retrieveLeaveReqList(query, this.state.filterVal, 1);
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

    this.props.retrieveLeaveReqList(this.state.searchVal, filter, 1);
  }

  gotoPage = (e) => {
    const page = e.selected + 1;
    this.props.retrieveLeaveReqList(this.state.searchVal, this.state.filterVal, page);
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

  // View Request Details
  showViewDetails = (e, formReqID, empName, index) => {
    e.preventDefault();

    this.setState({
      formRequestID: formReqID,
      employeeName: empName,
      isViewDetails: !this.state.isViewDetails,
      requestDetails: this.props.leaveRequestList[index],
    });
  }

  hideViewDetails = (e) => {
    e.preventDefault();
    this.setState({
      isViewDetails: !this.state.isViewDetails,
    });
  }

  // Update Request Details
  toggleUpdateDetails = (e) => {
    e.preventDefault();
    this.setState({
      isUpdateDetails: !this.state.isUpdateDetails,
    });
  }

  handleChangeLeaveStart = (date) => {
    this.setState({
      leaveStartDate: date,
    });
  }

  handleChangeLeaveEnd = (date) => {
    this.setState({
      leaveEndDate: date,
    });
  }

  attachmentChange = (e) => {
    const path = e.target.value;
    const filename = path.replace(/^.*\\/, '');
    this.setState({
      file: filename,
    });
  }

  changeLeaveType = (e) => {
    e.preventDefault();
    const leaveType = e.target.getAttribute('data-title');
    this.setState({
      leaveTypeText: leaveType,
    });
  }

  render() {
    const {
      leaveRequestList, leaveRequestListLoading, leaveRequestListError, leaveRequestPages,
    } = this.props;

    const { requestDetails } = this.state;

    const leaveReqs = {
      loading: leaveRequestListLoading,
      error: leaveRequestListError,
      lists: leaveRequestList,
      viewDetails: this.showViewDetails,
      update: this.showConfirmUpdate,
    };

    let attachs;
    if (leaveRequestList && this.state.isViewDetails) {
      if (requestDetails) {
        if (requestDetails.LeaveAttachList.length !== 0) {
          attachs = requestDetails.LeaveAttachList.map((attach) =>
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
      <ListContainer>
        <h3>Leave Requests List</h3>
        <SearchFilter search placeholder="Search List..." onClick={(query) => this.searchLeaveReqList(query)} defaultVal={(this.state.searchVal) || ''}>
          <FilterButton className="active" onClick={(e) => this.filterLeaveReqList(e, false)}>ALL</FilterButton>
          <FilterButton onClick={(e) => { this.filterLeaveReqList(e, FORMREQUEST_PENDING); }}>PENDING</FilterButton>
          <FilterButton onClick={(e) => { this.filterLeaveReqList(e, FORMREQUEST_REJECT); }}>REJECTED</FilterButton>
          <FilterButton onClick={(e) => { this.filterLeaveReqList(e, FORMREQUEST_APPROVE); }}>APPROVED</FilterButton>
          <FilterButton onClick={(e) => { this.filterLeaveReqList(e, FORMREQUEST_CANCEL); }}>CANCELLED</FilterButton>
          {/* <FilterButton onClick={(e) => {this.filterLeaveReqList(e, 'Removed')}}>REMOVED</FilterButton> */}
        </SearchFilter>

        <Listings noPadding>
          <LeaveRequestList {...leaveReqs} />
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

        <Modal
          show={this.state.isViewDetails}
          onClose={this.hideViewDetails}
          showCloseBtn
          title="Leave Request Details"
          width="450px"
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
                <span className="label">Reason</span>
                <span className="value border">{requestDetails.Reason}</span>
              </p>
              <p>
                <span className="label">Attachments</span>
                {attachs}
                {/* <button className="value"><b>document.pdf</b> <i className="fa fa-download" /></button> */}
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
          onClick={() => { this.setState({ updateStatusSuccess: false }); this.props.clearUpdateRequest(); this.props.retrieveLeaveReqList(); }}
        >
          <p>Request successfully {(this.state.updateStatusText === 'Approve') ? 'approved.' : 'rejected.' }</p>
        </ConfirmBox>
      </ListContainer>
    );
  }
}

LeaveRequestsComponent.propTypes = {
  leaveRequestList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  leaveRequestListLoading: PropTypes.bool,
  leaveRequestListError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  leaveRequestPages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  updateStatusSuccess: PropTypes.bool,

  // Function PropTypes (for the mapDispatchToProps)
  retrieveLeaveReqList: PropTypes.func,
  updateRequestStatus: PropTypes.func,
  clearUpdateRequest: PropTypes.func,
  resetFormState: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  leaveRequestList: makeSelectData('formLists'),
  leaveRequestListLoading: makeSelectLoading('formLists'),
  leaveRequestListError: makeSelectError('formLists'),
  leaveRequestPages: makeSelectPages('formLists'),
  updateStatusSuccess: makeSelectData('updateRequestStatus'),
});

function mapDispatchToProps(dispatch) {
  return {
    retrieveLeaveReqList: (search, filter, page) => dispatch(getLeaveRequestList(search, filter, page)),
    updateRequestStatus: (formReqID, statusID) => dispatch(updateRequestStatus(formReqID, statusID)),
    clearUpdateRequest: () => dispatch(clearUpdateRequest()),
    resetFormState: () => dispatch(resetFormState()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'LeaveRequests', reducer });
const withSaga = injectSaga({ key: 'LeaveRequests', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LeaveRequestsComponent);
