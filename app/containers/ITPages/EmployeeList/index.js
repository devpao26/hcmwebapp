/*
 * IT Admin Master List
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
import Modal from 'components/Modal';
import ConfirmBox from 'components/ConfirmationDialog';
import EMPMasterlist from 'components/Employee/EMPMasterlist';

import EmployeeProfile from 'containers/EmployeeProfile';
import {
  AdminTypes,
} from 'containers/EmployeeProfile/constants';


/* Section Component */
import Section from 'components/Section';
import Back from 'components/Section/Back';
import H2 from 'components/Section/H2';

/* SearchFilter Components */
import Search from 'components/SearchFilter';
// import FilterButton from 'components/SearchFilter/Filter';

import reducer from './reducer';
import saga from './saga';
import { makeSelectPageDetails, makeSelectSuccess, makeSelectError } from './selector';

import {
  getEmpList,
  getEmpListSearchFilter,
  getClearState,
  getChangeStatus,
  getChangeStatusReset,
  getSendNewPass,
  getSendNewPassReset,
  getRefs,
  getUpdateEmail,
  getUpdateEmailReset,
} from './actions';

import AccessForm from './AccessForm';
import UpdateEmail from './UpdateEmail';
import EmpList from './EmpList';

export class UserAccess extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      empSearchVal: '',
      empPageIndex: 1,
      empFilter: false,
      empName: '',
      empID: '',
      empStatusID: '',
      statusName: '',
      empEmail: false,
      empOldEmail: '',
      isAccessForm: false,
      isConfirmAccessForm: false,
      isChangeStatusConfirm: false,
      isChangeStatusResponse: false,
      isSendNewPassConfirm: false,
      isSendNewPassResponse: false,
      isUpdateEmail: false,
      isConfirmUpdateEmail: false,
      isUpdateEmailResponse: false,
      isSavingLoading: false,

      isViewEmpProfile: false,
      empProf: {},
    };
  }

  // Execute after the DOM has been rendered
  componentDidMount() {
    // Initial employee list retrieval
    this.props.retrieveEmpList(1, false, false);

    // retrieve refs
    this.props.getRefs();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.changeSuccess || nextProps.changeError) {
      this.setState({
        isChangeStatusResponse: true,
        isSavingLoading: false,
        isAccessForm: false,
        isConfirmAccessForm: false,
        isChangeStatusConfirm: false,
      });
    }

    if (nextProps.newPassSuccess || nextProps.newPassError) {
      this.setState({
        isSendNewPassResponse: true,
        isSendNewPassConfirm: false,
        isSavingLoading: false,
      });
    }

    if (nextProps.updateEmailSuccess || nextProps.updateEmailError) {
      this.setState({
        isUpdateEmail: false,
        isConfirmUpdateEmail: false,
        isSavingLoading: false,
        isUpdateEmailResponse: true,
      });
    }
  }

  componentWillUnmount() {
    // Clear state
    this.props.clearState();
  }

  // Goto page of emp list
  gotoEmpListPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      empPageIndex: page,
    });
    this.props.retrieveEmpList(page, this.state.empSearchVal, this.state.empFilter);
  }

  /* Toggle Employee Profile View and Retrieve Emp Profile */
  empProfileRetrieve = (empObject) => {
    this.setState({
      empProf: empObject,
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


  // Search Emp list
  searchEmpList = (val) => {
    this.setState({
      empSearchVal: (val) || '',
    });
    this.props.retrieveEmpListSearchFilter(1, val, this.state.empFilter);
  }

  // New Employee Access Form
  showAccessForm = (e, empName, empID, empStatusID, statusName) => {
    e.preventDefault();

    this.setState({
      isAccessForm: !this.state.isAccessForm,
      empName,
      empID,
      empStatusID,
      statusName,
    });
  }
  hideAccessForm = (e) => {
    e.preventDefault();
    this.setState({
      isAccessForm: false,
    });
  }
  showConfirmAccessForm = (email) => {
    this.setState({
      isConfirmAccessForm: true,
      empEmail: email,
    });
  }
  hideConfirmAccessForm = (e) => {
    e.preventDefault();
    this.setState({
      isConfirmAccessForm: false,
      isSavingLoading: false,
    });
  }
  confirmAccessForm = (e) => {
    e.preventDefault();
    this.props.createChangeStatus(this.state.empID, this.state.empEmail, this.state.empStatusID);
  }
  hideAccessFormResponse = (e) => {
    e.preventDefault();
    this.setState({
      isChangeStatusResponse: false,
      empName: '',
      empID: '',
      empStatusID: '',
      empEmail: false,
      statusName: '',
    });
    this.props.createChangeStatusReset();
    this.props.retrieveEmpList(this.state.empPageIndex, this.state.empSearchVal, this.state.empFilter);
  }

  showChangeConfirm = (e, empName, empID, empStatusID, statusName) => {
    e.preventDefault();
    this.setState({
      isChangeStatusConfirm: !this.state.isChangeStatusConfirm,
      empName,
      empID,
      empStatusID,
      statusName,
      empEmail: false,
    });
  }
  confirmChangeStatus = (e) => {
    e.preventDefault();
    this.setState({
      isSavingLoading: true,
    });
    this.props.createChangeStatus(this.state.empID, false, this.state.empStatusID);
  }
  hideChangeStatusConfirm = () => {
    this.setState({
      isChangeStatusConfirm: false,
    });
  }

  // Send new password
  showSendNewPassConfirm = (e, empName, empID) => {
    e.preventDefault();
    this.setState({
      isSendNewPassConfirm: true,
      empID,
      empName,
    });
  }
  hideSendNewPassConfirm = (e) => {
    e.preventDefault();
    this.setState({
      isSendNewPassConfirm: false,
      empName: '',
      empID: '',
    });
  }
  confirmSendNewPass = (e) => {
    e.preventDefault();
    this.setState({
      isSavingLoading: true,
    });
    this.props.sendNewPass(this.state.empID);
  }
  hideSendNewPassResponse = (e) => {
    e.preventDefault();
    this.setState({
      isSendNewPassResponse: false,
    });
    this.props.sendNewPassReset();
    this.props.retrieveEmpList(this.state.empPageIndex, this.state.empSearchVal, this.state.empFilter);
  }

  // Update email
  showUpdateEmailForm = (e, oldEmail, empID, empName) => {
    e.preventDefault();
    this.setState({
      isUpdateEmail: true,
      empID,
      empName,
      empOldEmail: oldEmail,
    });
  }
  hideUpdateEmailForm = (e) => {
    e.preventDefault();
    this.setState({
      isUpdateEmail: false,
      empName: '',
      empID: '',
      empOldEmail: '',
    });
  }
  showConfirmUpdateEmail = (email) => {
    this.setState({
      isConfirmUpdateEmail: true,
      empEmail: email,
    });
  }
  hideConfirmUpdateEmail = (e) => {
    e.preventDefault();
    this.setState({
      isConfirmUpdateEmail: false,
    });
  }
  confirmUpdateEmail = (e) => {
    e.preventDefault();
    this.setState({
      isSavingLoading: true,
    });
    this.props.updateEmpEmail(this.state.empID, this.state.empEmail);
  }
  hideUpdateEmailResponse = (e) => {
    e.preventDefault();
    this.setState({
      isUpdateEmailResponse: false,
      empName: '',
      empID: '',
      empOldEmail: '',
    });
    this.props.updateEmpEmailReset();
    this.props.retrieveEmpList(this.state.empPageIndex, this.state.empSearchVal, this.state.empFilter);
  }

  render() {
    const {
      empListPageDetails,
    } = this.props;

    const employeeList = {
      createAccess: this.showAccessForm,
      changeStatus: this.showChangeConfirm,
      sendPass: this.showSendNewPassConfirm,
      updateEmail: this.showUpdateEmailForm,
      getProf: this.empProfileRetrieve,
      viewProf: this.showEmpProfileView,
    };

    // let items = (<div id="checkbox-container">
    //   <label htmlFor="no-filter">No Filter Loaded.</label>
    // </div>);

    let maxPageIndex = 1; // Get Max Page Index of the list (defaults to 1)
    if (empListPageDetails !== null) {
      maxPageIndex = empListPageDetails.MaxPageIndex;
    }

    // if (empRefLists) {
    //   items = empRefLists.map((item) =>
    //     (<div id="checkbox-container" key={item.EmpStatusID}>
    //       <label htmlFor="checked">
    //         <input name="checked" type="checkbox" onClick={this.filterSearchList} data-filterid={item.EmpStatusID} /> {item.Name}
    //       </label>
    //     </div>)
    //   );
    // }

    return (
      <PageWrap>
        <Helmet>
          <title>User Access</title>
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Back onClick={this.props.history.goBack}><FontAwesomeIcon icon={faCaretLeft} /> BACK TO IT ADMIN</Back>
            <Section>
              <H2>Employee Master List</H2>
              <Search search onClick={(val) => { this.searchEmpList(val); }} placeholder="Search Employees..." defaultVal={this.state.empSearchVal}>
                {/* <FilterButton>
                  <OptionMenu
                    title="Filters"
                    position="right"
                    filterButton
                    checked={this.state.checked}
                  >
                    {items}
                  </OptionMenu>
                </FilterButton> */}
              </Search>
              <EMPMasterlist>
                <EmpList {...employeeList} />
              </EMPMasterlist>
              {(empListPageDetails && maxPageIndex !== 1) &&
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
        {/* Show create access form */}
        <Modal
          show={this.state.isAccessForm}
          title="New Employee Access Form"
          onClose={this.hideAccessForm}
          width="500px"
        >
          <AccessForm cancel={this.hideAccessForm} confirm={this.showConfirmAccessForm} />
        </Modal>
        <ConfirmBox
          show={this.state.isConfirmAccessForm}
          title="CONFIRMATION"
          onClick={this.confirmAccessForm}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
          onClose={this.hideConfirmAccessForm}
        >
          {(this.state.isSavingLoading) && <div className="loading-cont"><Loading /></div>}
          <p>Are you sure you want to create access for <span className="text-green">{this.state.empName}</span>&apos;s account?</p>
        </ConfirmBox>
        {/* Confirm change status */}
        <ConfirmBox
          show={this.state.isChangeStatusConfirm}
          title="CONFIRMATION"
          onClick={this.confirmChangeStatus}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
          onClose={this.hideChangeStatusConfirm}
        >
          {(this.state.isSavingLoading) && <div className="loading-cont"><Loading /></div>}
          <p>Are you sure you want to {this.state.statusName} <br /> <span className="text-green">{this.state.empName}</span>&apos;s Account?</p>
        </ConfirmBox>
        <ConfirmBox
          show={this.state.isChangeStatusResponse}
          title={(this.props.changeSuccess) ? 'SUCCESS' : 'FAILED'}
          onClick={this.hideAccessFormResponse}
          okBtnText="OK"
        >
          {(this.state.empEmail && this.props.changeSuccess) && <p>You have successfully created access for<br /><span className="text-green">{this.state.empName}</span></p>}
          {(this.state.empEmail && this.props.changeError) && <p>Creation of access for <br /><span className="text-green">{this.state.empName}</span> is not successfull. Please try again.</p>}

          {(!this.state.empEmail && this.props.changeSuccess) && <p>You have successfully changed the status of<br /><span className="text-green">{this.state.empName}</span></p>}
          {(!this.state.empEmail && this.props.changeError) && <p>Change status for <br /><span className="text-green">{this.state.empName}</span> is not successfull. Please try again.</p>}
        </ConfirmBox>

        {/* Sending of new Password */}
        <ConfirmBox
          show={this.state.isSendNewPassConfirm}
          title="CONFIRMATION"
          onClick={this.confirmSendNewPass}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
          onClose={this.hideSendNewPassConfirm}
        >
          {(this.state.isSavingLoading) && <div className="loading-cont"><Loading /></div>}
          <p>Are you sure you want to send a new password to<br /><span className="text-green">{this.state.empName}</span>?</p>
        </ConfirmBox>
        <ConfirmBox
          show={this.state.isSendNewPassResponse}
          title={(this.props.newPassSuccess) ? 'SUCCESS' : 'FAILED'}
          onClick={this.hideSendNewPassResponse}
          okBtnText="OK"
        >
          {(this.props.newPassSuccess) && <p>You have successfully sent a new password for <br /><span className="text-green">{this.state.empName}</span></p>}
          {(this.props.newPassError) && <p>Sending of new password for <br /><span className="text-green">{this.state.empName}</span> is not successfull. Please try again.</p>}
        </ConfirmBox>
        {/* Update Email */}
        <Modal
          show={this.state.isUpdateEmail}
          title="Update Employee Email"
          onClose={this.hideUpdateEmailForm}
          width="500px"
        >
          <UpdateEmail cancel={this.hideUpdateEmailForm} oldEmail={this.state.empOldEmail} confirm={this.showConfirmUpdateEmail} />
        </Modal>
        <ConfirmBox
          show={this.state.isConfirmUpdateEmail}
          title="CONFIRMATION"
          onClick={this.confirmUpdateEmail}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
          onClose={this.hideConfirmUpdateEmail}
        >
          {(this.state.isSavingLoading) && <div className="loading-cont"><Loading /></div>}
          <p>Are you sure you want to update email of<br /><span className="text-green">{this.state.empName}</span>?</p>
        </ConfirmBox>
        <ConfirmBox
          show={this.state.isUpdateEmailResponse}
          title={(this.props.updateEmailSuccess) ? 'SUCCESS' : 'FAILED'}
          onClick={this.hideUpdateEmailResponse}
          okBtnText="OK"
        >
          {(this.props.updateEmailSuccess) && <p>You have successfully updated the email of <br /><span className="text-green">{this.state.empName}</span></p>}
          {(this.props.updateEmailError) && <p>Updating of email for <br /><span className="text-green">{this.state.empName}</span> is not successfull. Please try again.</p>}
        </ConfirmBox>


        {/* Employee Profile Component */}
        {(this.state.isViewEmpProfile) &&
          <EmployeeProfile
            show={this.state.isViewEmpProfile}
            hide={this.hideEmpProfileView}
            empProfile={this.state.empProf}
            admin={AdminTypes.IT}
          />
        }

      </PageWrap>
    );
  }
}

UserAccess.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  empListPageDetails: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  changeSuccess: PropTypes.bool,
  changeError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  newPassSuccess: PropTypes.bool,
  newPassError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  updateEmailSuccess: PropTypes.bool,
  updateEmailError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  // function dispatch props
  clearState: PropTypes.func,
  getRefs: PropTypes.func,
  retrieveEmpList: PropTypes.func,
  retrieveEmpListSearchFilter: PropTypes.func,
  createChangeStatus: PropTypes.func,
  createChangeStatusReset: PropTypes.func,
  sendNewPass: PropTypes.func,
  sendNewPassReset: PropTypes.func,
  updateEmpEmail: PropTypes.func,
  updateEmpEmailReset: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  empListPageDetails: makeSelectPageDetails('empList'),
  changeSuccess: makeSelectSuccess('changeStatus'),
  changeError: makeSelectError('changeStatus'),
  newPassSuccess: makeSelectSuccess('newPass'),
  newPassError: makeSelectError('newPass'),
  updateEmailSuccess: makeSelectSuccess('updateEmail'),
  updateEmailError: makeSelectError('updateEmail'),
});

function mapDispatchToProps(dispatch) {
  return {
    clearState: () => dispatch(getClearState()),
    getRefs: () => dispatch(getRefs()),
    retrieveEmpList: (page, search, filter) => dispatch(getEmpList(page, search, filter)),
    retrieveEmpListSearchFilter: (page, search, filter) => dispatch(getEmpListSearchFilter(page, search, filter)),
    createChangeStatus: (empID, email, status) => dispatch(getChangeStatus(empID, email, status)),
    createChangeStatusReset: () => dispatch(getChangeStatusReset()),
    sendNewPass: (empID) => dispatch(getSendNewPass(empID)),
    sendNewPassReset: () => dispatch(getSendNewPassReset()),
    updateEmpEmail: (empID, newEmail) => dispatch(getUpdateEmail(empID, newEmail)),
    updateEmpEmailReset: () => dispatch(getUpdateEmailReset()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'itadmin', reducer });
const withSaga = injectSaga({ key: 'itadmin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserAccess);
