/**
 * Shift Requests List Component
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

/* Global components */
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
  getListRequests,
  updateRequestStatus,
  clearUpdateRequest,
  resetFormState,
} from './actions';

import Lists from './Lists';

export class ShowCauseMemoComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      searchVal: '',
      filterVal: '',
      formRequestID: '',
      employeeName: '',
      updateStatusText: '',
      statusID: '',
      requestDetails: false,
      isViewDetails: false,
      isConfirmUpdate: false,
      updateStatusSuccess: false,
      isShiftDetails: false,
      isCurrentShiftDetails: false,
    };
  }

  componentDidMount() {
    // Retrieve initial data
    this.props.rertrieveList(false, false, 1);
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
    this.props.rertrieveList(this.state.searchVal, this.state.filterVal, page);
  }

  // Search Leave Request List
  searchLeaveReqList = (query) => {
    this.setState({
      searchVal: query,
    });

    this.props.rertrieveList(query, this.state.filterVal, 1);
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

    this.props.rertrieveList(this.state.searchVal, filter, 1);
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
    const { loading, error, lists, pages } = this.props;
    const { requestDetails } = this.state;


    const refLists = {
      loading,
      error,
      lists,
      viewDetails: this.showViewDetails,
      update: this.showConfirmUpdate,
    };


    let MaxPageIndex = 1;
    if (pages) {
      MaxPageIndex = pages.MaxPageIndex;
    }
    return (
      <ListContainer>
        <h3>Show Cause Memo Request List</h3>
        <SearchFilter search placeholder="Search List..." onClick={(query) => this.searchLeaveReqList(query)} defaultVal={(this.state.searchVal) || ''}>
          <FilterButton className="active" onClick={(e) => this.filterLeaveReqList(e, false)}>ALL</FilterButton>
          <FilterButton onClick={(e) => { this.filterLeaveReqList(e, FORMREQUEST_PENDING); }}>PENDING</FilterButton>
          <FilterButton onClick={(e) => { this.filterLeaveReqList(e, FORMREQUEST_REJECT); }}>REJECTED</FilterButton>
          <FilterButton onClick={(e) => { this.filterLeaveReqList(e, FORMREQUEST_APPROVE); }}>APPROVED</FilterButton>
          <FilterButton onClick={(e) => { this.filterLeaveReqList(e, FORMREQUEST_CANCEL); }}>CANCELLED</FilterButton>
          {/* <FilterButton onClick={(e) => {this.filterLeaveReqList(e, 'Removed')}}>REMOVED</FilterButton> */}
        </SearchFilter>

        <Listings noPadding>
          <Lists {...refLists} />
        </Listings>

        { (pages && MaxPageIndex !== 1) &&
          <Pagination>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={<span>...</span>}
              breakClassName={'break-me'}
              pageCount={MaxPageIndex}
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
          title="Show Cause Memo Request Details"
          width="400px"
        >
          {(requestDetails) &&
            <FormViewDetails>
              { (requestDetails.FormRequest.FormRequestStatusID !== FORMREQUEST_REJECT && !requestDetails.FormRequest.IsCompleted) &&
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
              { (requestDetails.FormRequest.FormRequestStatusID === FORMREQUEST_REJECT || requestDetails.FormRequest.IsCompleted) &&
                <p>
                  <span className="label">General Status</span>
                  {(requestDetails.FormRequest.FormRequestStatusID === FORMREQUEST_REJECT) && <span className="value reject">Rejected</span>}
                  {(requestDetails.FormRequest.IsCompleted) && <span className="value complete">Completed</span>}
                </p>
              }
              <p>
                <span className="label">Employee In Question</span>
                <span className="value">{`${requestDetails.FormRequest.EmpProfile.LastName}, ${requestDetails.FormRequest.EmpProfile.FirstName}`}</span>
              </p>
              <p>
                <span className="label">Date Of Incident</span>
                <span className="value">{moment(requestDetails.IncidentDate).format('MM-DD-YYYY')}</span>
              </p>
              <p>
                <span className="label">Possible Sanction</span>
                <span className="value">{requestDetails.Sanction.Name}</span>
              </p>
              <p>
                <span className="label">Possible Rule Violation</span>
                <span className="value">{requestDetails.RuleViolation.Name}</span>
              </p>
              <p>
                <span className="label">Reason</span>
                <span className="value border">{requestDetails.Reason}</span>
              </p>
              {(requestDetails.FormRequest.FormRequestStatusID === FORMREQUEST_PENDING && requestDetails.FormRequest.IsPendingOfApprover) &&
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
          onClick={() => { this.setState({ updateStatusSuccess: false }); this.props.clearUpdateRequest(); this.props.rertrieveList(); }}
        >
          <p>Request successfully {(this.state.updateStatusText === 'Approve') ? 'approved.' : 'rejected.' }</p>
        </ConfirmBox>
      </ListContainer>
    );
  }
}

ShowCauseMemoComponent.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  pages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  updateStatusSuccess: PropTypes.bool,
  rertrieveList: PropTypes.func,
  updateRequestStatus: PropTypes.func,
  clearUpdateRequest: PropTypes.func,
  resetFormState: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  lists: makeSelectData('formLists'),
  loading: makeSelectLoading('formLists'),
  error: makeSelectError('formLists'),
  pages: makeSelectPages('formLists'),
  updateStatusSuccess: makeSelectData('updateRequestStatus'),
});

function mapDispatchToProps(dispatch) {
  return {
    rertrieveList: (search, filter, page) => dispatch(getListRequests(search, filter, page)),
    updateRequestStatus: (formReqID, statusID) => dispatch(updateRequestStatus(formReqID, statusID)),
    clearUpdateRequest: () => dispatch(clearUpdateRequest()),
    resetFormState: () => dispatch(resetFormState()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'ShowCauseMemoFormsRequests', reducer });
const withSaga = injectSaga({ key: 'ShowCauseMemoFormsRequests', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ShowCauseMemoComponent);
