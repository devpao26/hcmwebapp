/**
 * Leave Information
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/fontawesome-free-solid';

/* Global injectSaga and injectReducer */
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import EMPMasterlist from 'components/Employee/EMPMasterlist';
import H2 from 'components/Modal/H2';
import Modal from 'components/Modal';
import Confirm from 'components/ConfirmationDialog';
import Pagination from 'components/Pagination';
import SearchFilter from 'components/SearchFilter';
import FilterButton from 'components/SearchFilter/Button';
import FormViewDetails from 'components/Forms/FormViewDetails';

/* selectors, reducer, saga, constants and actions */
import {
  FORMREQUEST_PENDING,
  FORMREQUEST_APPROVE,
  FORMREQUEST_REJECT,
} from 'containers/App/constants';

import reducer from './reducer';
import saga from './saga';
import { getEmpLeaveReqList, clearLeavesData, resetLeavesState } from './actions';
import { makeSelectLeavesUpdateSuccess, makeSelectPages, makeSelectEmpProfile } from './selectors';

import LeaveReqList from './LeaveReqList';
import LeaveCredits from './LeaveCredits';
import { LeaveList } from './constants';

export class LeaveInformation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAddLeaveCredits: false,
      isUpdateLeaveSuccess: false,
      VLCount: 0,
      SLCount: 0,
      ELCount: 0,
      newCount: false,
      filterVal: '',
      leaveDetails: false,
      isViewLeaveDetails: false,
      search: '',
      page: 1,
    };
  }

  componentDidMount() {
    this.props.retrieveEmpLeaveReq(LeaveList.RETRIEVE, 1, false, false);
  }

  componentWillReceiveProps(nextProps) {
    let count = 0;
    if (nextProps.profile && count === 0) {
      count += 1;
      const leaves = nextProps.profile.EmpLeaveCount;
      this.setState({
        VLCount: leaves.VLCount,
        SLCount: leaves.SLCount,
        ELCount: leaves.ELCount,
      });
    }

    if (nextProps.updateLeavesSuccess === true) {
      this.setState({
        isAddLeaveCredits: false,
        isUpdateLeaveSuccess: true,
      });
    }
  }

  componentWillUnmount = () => {
    this.props.resetState();
  }

  // Add Leave Credits
  toggleAddLeaveCredits = () => {
    this.setState({
      isAddLeaveCredits: !this.state.isAddLeaveCredits,
    });
  }

  hideLeavesUpdateSuccess = () => {
    this.setState({
      isUpdateLeaveSuccess: false,
    });
    // Clear leaves update data
    this.props.clearLeaveUpdateData();
  }

  // Get the value of the added leaves
  addedLeaves = (val) => {
    this.setState({
      newCount: val,
    });
  }

  // Go to leave history page
  gotoLeaveHistoryPage = (evt) => {
    const page = evt.selected + 1;
    this.setState({
      page,
    });
    this.props.retrieveEmpLeaveReq(LeaveList.PAGING, page, this.state.search, this.state.filterVal);
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
    this.props.retrieveEmpLeaveReq(LeaveList.RETRIEVE, 1, this.state.search, filter);
  }

  // leave details
  showLeaveDetails = (item) => {
    this.setState({
      leaveDetails: item,
      isViewLeaveDetails: !this.state.isViewLeaveDetails,
    });
  }

  hideLeaveDetails = () => {
    this.setState({
      isViewLeaveDetails: false,
    });
  }

  render() {
    const { leaveHistoryPages } = this.props;
    const { leaveDetails } = this.state;
    // Get Max Page Index of the leave history list (defaults to 1)
    let historyMaxPageIndex = 1;
    if (leaveHistoryPages != null) {
      historyMaxPageIndex = leaveHistoryPages.MaxPageIndex;
    }

    return (
      <div className="empprof-section">
        <H2>Leave Information</H2>
        <div className="leave-credits">
          <table>
            <thead>
              <tr>
                <th>Credit</th>
                <th>Vacation Leaves</th>
                <th>Sick Leaves</th>
                <th>Personal Leaves</th>
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
                <td>{this.state.newCount ? this.state.VLCount + +this.state.newCount.UpdateVLCount : this.state.VLCount}</td>
                <td>{this.state.newCount ? this.state.VLCount + +this.state.newCount.UpdateSLCount : this.state.SLCount}</td>
                <td>{this.state.newCount ? this.state.VLCount + +this.state.newCount.UpdateELCount : this.state.ELCount}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={this.toggleAddLeaveCredits} className="add-leaves">Add Leave Credits <FontAwesomeIcon icon={faPlusCircle} /></button>
        </div>
        <div className="leave-lists">
          <h3>History</h3>
          {leaveHistoryPages &&
            <SearchFilter>
              <FilterButton className="active" onClick={(e) => this.filterLeaveReqList(e, false)}>ALL</FilterButton>
              <FilterButton onClick={(e) => { this.filterLeaveReqList(e, FORMREQUEST_PENDING); }}>PENDING</FilterButton>
              <FilterButton onClick={(e) => { this.filterLeaveReqList(e, FORMREQUEST_REJECT); }}>REJECTED</FilterButton>
              <FilterButton onClick={(e) => { this.filterLeaveReqList(e, FORMREQUEST_APPROVE); }}>APPROVED</FilterButton>
              {/* <FilterButton onClick={(e) => {this.filterLeaveReqList(e, 'Removed')}}>REMOVED</FilterButton> */}
            </SearchFilter>
          }
          <EMPMasterlist>
            <LeaveReqList viewDetails={this.showLeaveDetails} />
          </EMPMasterlist>
          { (leaveHistoryPages && historyMaxPageIndex !== 1) &&
            <Pagination>
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={<span>...</span>}
                breakClassName={'break-me'}
                pageCount={historyMaxPageIndex}
                marginPagesDisplayed={1}
                pageRangeDisplayed={4}
                onPageChange={this.gotoLeaveHistoryPage}
                activeClassName={'active'}
              />
            </Pagination>
          }
        </div>

        {/* View Leave Details */}
        <Modal
          show={this.state.isViewLeaveDetails}
          onClose={this.hideLeaveDetails}
          showCloseBtn
          title="Leave Request Details"
          width="450px"
          noOverlay
        >
          {(leaveDetails) &&
            <FormViewDetails>
              <p>
                <span className="label">Leave Type</span>
                <span className="value">{leaveDetails.LeaveType.Name}</span>
              </p>
              <p>
                <span className="label">Leave Dates</span>
                <span className="value">
                  { (leaveDetails.LeaveFrom === leaveDetails.LeaveTo)
                    ? moment(new Date(leaveDetails.LeaveFrom)).format('LL')
                    : `${moment(new Date(leaveDetails.LeaveFrom)).format('LL')} To ${moment(new Date(leaveDetails.LeaveTo)).format('LL')}`
                  }
                </span>
              </p>
              <p>
                <span className="label">Date Requested</span>
                <span className="value">
                  {moment(new Date(leaveDetails.CreatedDate)).format('LL')}
                </span>
              </p>
              <p>
                <span className="label">Reason</span>
                <span className="value border">{leaveDetails.Reason}</span>
              </p>
              <p>
                <span className="label">Status</span>
                {(!leaveDetails.FormRequest.IsPendingOfApprover) && <span className="value">Approved ({leaveDetails.FormRequest.ApprovedCount} of {leaveDetails.FormRequest.RequiredApprovalCount})</span>}
              </p>
            </FormViewDetails>
          }
        </Modal>
        {/* Update Employee Leave Credits */}
        <Modal
          show={this.state.isAddLeaveCredits}
          title="Add Leave Credits"
          width="300px"
        >
          <LeaveCredits onClose={this.toggleAddLeaveCredits} empID={this.state.empID} getAddedLeaves={this.addedLeaves} />
        </Modal>

        {/* Update Leave Credits Success */}
        <Confirm
          show={this.state.isUpdateLeaveSuccess}
          title="SUCCESS"
          onClick={this.hideLeavesUpdateSuccess}
          okBtnText="OK"
        >
          <p>Employee leave credits successfully updated.</p>
        </Confirm>
      </div>
    );
  }
}

LeaveInformation.propTypes = {
  profile: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  leaveHistoryPages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  updateLeavesSuccess: PropTypes.bool,
  // Function dispatchs
  resetState: PropTypes.func,
  retrieveEmpLeaveReq: PropTypes.func,
  clearLeaveUpdateData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectEmpProfile(),
  leaveHistoryPages: makeSelectPages('empLeaves'),
  updateLeavesSuccess: makeSelectLeavesUpdateSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    resetState: () => dispatch(resetLeavesState()),
    retrieveEmpLeaveReq: (type, page, search, filter) => dispatch(getEmpLeaveReqList(type, page, search, filter)),
    clearLeaveUpdateData: () => dispatch(clearLeavesData()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'EMPProfileLeaves', reducer });
const withSaga = injectSaga({ key: 'EMPProfileLeaves', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LeaveInformation);
