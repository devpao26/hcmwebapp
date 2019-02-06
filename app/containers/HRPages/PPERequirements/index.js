/*
 * Employee OnBoarding PPE Requirements
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faMinusCircle, faCaretLeft } from '@fortawesome/fontawesome-free-solid';
import { faFileAlt } from '@fortawesome/fontawesome-free-regular';

/* Global injectSaga and injectReducer */
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

/* Global Components */
import Loading from 'components/LoadingIndicator/Loading';
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

/* Modal */
import Modal from 'components/Modal';
import ConfirmBox from 'components/ConfirmationDialog';

/* Lists */
import FileList from 'components/Lists/FileList';

import {
  makeSelectRefs,
} from 'containers/HomePage/selectors';

import { PREEMPSTATUS_PENDING, PREEMPSTATUS_APPROVED } from './constants';

import {
  retrieveJoSignedList,
  reqApplReqList,
  reqUpdateIsRequired,
  uploadReqFiles,
  updateReqStatus,
  deleteFile,
  migrateApplicant,
  searchAndFilterList,
} from './actions';

import {
  makeSelectData,
  makeSelectPageDetails,
  makeSelectLoading,
  makeSelectError,
  makeSelectReqList,
  makeSelectMigrate,
} from './selectors';

import reducer from './reducer';
import saga from './saga';

import RequirementList from './RequirementList';
import EmpReqsStatusRefs from './RequirementList/ReqsStatusRefs';
import List from './List';

export class PPEPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      progressModal: false,
      showReqFiles: false,
      showConfirm: false,
      reqMarkAs: false,
      reqId: '',
      reqAttachId: '',
      fileId: '',
      attachType: '',
      migration: true,
      migrateConfirm: false,
      ComSiteLocID: false,
      SearchValue: '',
      unprocessed: 'all',
      pageIndex: 1,
    };
  }

  componentDidMount() {
    // on component mount retrieve jo signed applicant lists
    this.props.dataRetrievePpeList(1, false, false, this.state.unprocessed);
  }

  // Show/Close Progress Modal (Requirement List)
  showProgress = (e) => {
    const applJobId = e.currentTarget.getAttribute('data-appl-jobid');

    this.setState({
      progressModal: true,
    });

    this.props.retrieveApplReqList(applJobId);
  }

  closeProgress = () => {
    this.setState({
      progressModal: false,
    });
    // let page = 1;
    // if (this.props.PageDetails) {
    //   page = this.props.PageDetails.PageIndex;
    // }
    this.props.dataRetrievePpeList(this.state.pageIndex, this.state.ComSiteLocID, this.state.SearchValue, this.state.unprocessed);
  }

  // Show/Close Requirement Mark As Status
  showReqMarkAs = (e) => {
    this.setState({
      reqMarkAs: !this.state.reqMarkAs,
      reqId: e.currentTarget.getAttribute('data-reqid'),
    });
  }

  closeReqMarkAs = () => {
    this.setState({
      reqMarkAs: false,
      reqId: '',
    });
  }

  // Show/Hide Requirement Uploaded Files
  showReqFiles = (e) => {
    this.setState({
      showReqFiles: !this.state.showReqFiles,
      reqAttachId: e.currentTarget.getAttribute('data-attachid'),
    });
  }
  hideReqFiles = () => {
    this.setState({
      showReqFiles: !this.state.showReqFiles,
    });
  }

  // Confirm Deletion of File
  toggleConfirmDelete = (e, fileid, attachType) => {
    if (this.state.showConfirm === false) {
      this.setState({
        showConfirm: !this.state.showConfirm,
        fileId: fileid,
        attachType,
      });
    } else {
      this.setState({
        showConfirm: false,
        fileId: '',
        attachType: '',
      });
    }
  }

  confirmDeleteAction = () => {
    this.props.toDeleteFile(this.state.fileId, this.state.attachType);
    this.setState({
      showConfirm: false,
      showReqFiles: false,
    });
  }

  // Toggle Migration Modals
  toggleMigrateConfirm = () => {
    this.setState({
      migrateConfirm: !this.state.migrateConfirm,
    });
  }

  hideMigrate = () => {
    this.setState({
      migration: false,
      progressModal: false,
    });

    // let page = 1;
    // if (this.props.PageDetails) {
    //   page = this.props.PageDetails.PageIndex;
    // }
    this.props.dataRetrievePpeList(this.state.pageIndex, this.state.ComSiteLocID, this.state.SearchValue, this.state.unprocessed);
  }

  // Search and Filter
  searchAndFilter = (val) => {
    this.setState({
      SearchValue: (val) || '',
    });

    if (this.state.ComSiteLocID !== false) {
      this.props.reqSearchFilter(this.state.ComSiteLocID, val, this.state.unprocessed);
    } else {
      this.props.reqSearchFilter(false, val, this.state.unprocessed);
    }
  }

  locFilter = (e) => {
    const val = (e.currentTarget.value === 'all') ? false : e.currentTarget.value;
    this.setState({
      ComSiteLocID: val,
    });

    this.props.reqSearchFilter(val, this.state.SearchValue, this.state.unprocessed);
  }

  // Filter PPE list to show only the unprocessed applicants
  toggleUnprocessed = (e) => {
    e.preventDefault();
    this.setState({
      unprocessed: e.currentTarget.value,
    });
    this.props.reqSearchFilter(this.state.ComSiteLocID, this.state.SearchValue, e.currentTarget.value);
    // this.props.dataRetrievePpeList(1, this.state.ComSiteLocID, this.state.SearchValue, e.currentTarget.value);
  }

  gotoPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      pageIndex: page,
    });
    this.props.dataRetrievePpeList(page, this.state.ComSiteLocID, this.state.SearchValue, this.state.unprocessed);
  }

  // Mobile Expand Row
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
      ppeList,
      PageDetails,
      comLocRefList,
      // clearApplJobId,
      PreEmpReqsStatusRefs,
      // PPE Req List
      applReqListData,
      updateIsRequired,
      uploadFile,
      updateReqStatusRef,
      // toDeleteFile,
      migrateApplToEmp,
      migrate,
    } = this.props;

    // Table List Props (<List>)
    const dataList = {
      // loading,
      error,
      ppeList,
    };

    // PPE Requirement List Modal Props
    let statusRefs = [];
    const reqProps = {
      refs: statusRefs,
      applReqListData,
      updateIsRequired,
      uploadFile,
      migrate: this.toggleMigrateConfirm,
      updateReqStatus: this.showReqMarkAs,
      showUploadedFiles: this.showReqFiles,
    };
    if (PreEmpReqsStatusRefs) {
      statusRefs = PreEmpReqsStatusRefs[0].PreEmpReqsStatusRefs;
    }

    // Get Max Page Index of the list (defaults to 1)
    let maxPageIndex = 1;
    if (PageDetails) {
      maxPageIndex = PageDetails.MaxPageIndex;
    }

    // Site Location reference from the store state tree global: { refsList: {} }
    let siteLocs = false;
    let filterItems;
    if (comLocRefList) {
      siteLocs = comLocRefList[0].ComSiteLocRefs;
      filterItems = siteLocs.map((item) =>
        <FilterButton key={item.ComSiteLocID} className={(this.state.ComSiteLocID === item.ComSiteLocID) ? 'active' : ''} value={item.ComSiteLocID} onClick={this.locFilter}>{item.Name}</FilterButton>
      );
    }

    // File(s) to show in the modal
    let files;
    let filesToShow = [];
    let reqAttachFiles;
    let reqStatusId;
    if (this.state.showReqFiles) {
      // Check if the file we are viewing is from JO attachs
      if (this.state.reqAttachId !== 'joAttach') {
        reqAttachFiles = applReqListData[0].PreEmpApplReqsList;
        Object.keys(reqAttachFiles).forEach((i) => {
          if (reqAttachFiles[i].PreEmpApplReqID === this.state.reqAttachId) {
            filesToShow = reqAttachFiles[i].PreEmpApplReqAttachsList;
            reqStatusId = reqAttachFiles[i].PreEmpReqStatusID;
          }
        });
      } else {
        filesToShow = applReqListData[0].JOAttachsList;
      }

      if (filesToShow.length > 0) {
        files = filesToShow.map((file) => {
          const fileid = (this.state.reqAttachId !== 'joAttach') ? file.ApplReqAttachID : file.JOAttachID;
          const attachType = (this.state.reqAttachId !== 'joAttach') ? 'ApplReqAttach' : 'JOAttach';
          return (
            <li key={(this.state.reqAttachId !== 'joAttach') ? file.ApplReqAttachID : file.JOAttachID}>
              <p>
                <FontAwesomeIcon icon={faFileAlt} />
                <Link to={file.Path} target="_blank">[Download]</Link>
              </p>
              <p>
                <span>Attachment</span>
                {file.FileName}
              </p>
              <p>
                <span>Date Uploaded</span>
                {moment(new Date(file.CreatedDate)).format('LL')}
              </p>
              <p>
                {(reqStatusId !== PREEMPSTATUS_APPROVED) && <button className="delete" onClick={(e) => { this.toggleConfirmDelete(e, fileid, attachType); }}><FontAwesomeIcon icon={faMinusCircle} /></button>}
              </p>
            </li>
          );
        });
      }
    }

    return (
      <PageWrap>
        <Helmet>
          <title>PPE Requirements</title>
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Back onClick={this.props.history.goBack}><FontAwesomeIcon icon={faCaretLeft} /> BACK TO PREVIOUS PAGE</Back>

            <Section>
              <H2>PPE ({(PageDetails) ? PageDetails.TotalRecords : '0'}) <span>For Pre-Employment Requirements</span></H2>

              <SearchFilter search onClick={(e) => { this.searchAndFilter(e); }} placeholder="Search PPE List..." defaultVal={this.state.SearchValue}>
                <FilterButton className={(this.state.ComSiteLocID === false) ? 'active' : ''} value="all" onClick={this.locFilter}>All Location</FilterButton>
                { filterItems }
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FilterButton className={(this.state.unprocessed === 'all') ? 'active' : ''} value="all" onClick={this.toggleUnprocessed}>All</FilterButton>
                <FilterButton className={(this.state.unprocessed === 'true') ? 'active' : ''} value="true" onClick={this.toggleUnprocessed}>Processed</FilterButton>
                <FilterButton className={(this.state.unprocessed === 'false') ? 'active' : ''} value="false" onClick={this.toggleUnprocessed}>Unprocessed</FilterButton>
              </SearchFilter>

              <EMPMasterlist noPadding>
                { (loading)
                  ? <Loading />
                  : <List {...dataList} showProgress={this.showProgress} />
                }
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

        {/* PPE Requirement List Modal */}
        <Modal show={this.state.progressModal} title="Requirements" onClose={this.closeProgress} showCloseBtn>
          <RequirementList {...reqProps} showFiles={this.showReqFiles} getFiles={this.getFiles} />
        </Modal>

        <Modal show={this.state.showReqFiles} onClose={this.hideReqFiles} showCloseBtn width="700px">
          <FileList>
            {files}
          </FileList>
        </Modal>

        <Modal show={this.state.reqMarkAs} title="Mark As" onClose={this.closeReqMarkAs} showCloseBtn width="400px">
          <EmpReqsStatusRefs>
            <div className="content">
              <p>
                {statusRefs.map((item) =>
                  (item.PreEmpReqStatusID !== PREEMPSTATUS_PENDING) && <button onClick={(e) => { updateReqStatusRef(e, this.state.reqId, item.PreEmpReqStatusID); this.closeReqMarkAs(); }} className={item.Name} key={item.PreEmpReqStatusID}>{item.Name}</button>
                )}
              </p>
            </div>
          </EmpReqsStatusRefs>
        </Modal>

        <ConfirmBox
          show={this.state.showConfirm}
          title="DELETE FILE"
          onClick={this.confirmDeleteAction}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
          onClose={this.toggleConfirmDelete}
          showCloseBtn
        >
          <p>Are you sure you want to delete this file?</p>
        </ConfirmBox>

        <ConfirmBox
          show={this.state.migrateConfirm}
          title="CONFIRMATION"
          onClick={(e) => { migrateApplToEmp(e); this.toggleMigrateConfirm(); }}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
          onClose={this.toggleMigrateConfirm}
          showCloseBtn
        >
          <p>Are you sure you want to move this applicant to employee?</p>
        </ConfirmBox>

        { (migrate) &&
          (<ConfirmBox
            show={this.state.migration}
            title="SUCCESS"
            onClick={this.hideMigrate}
            okBtnText="OK"
          >
            <p>You have successfully transferred applicant to an employee</p>
          </ConfirmBox>)
        }
      </PageWrap>
    );
  }
}

// Declare our prop types to prevent wrong values on our props
PPEPage.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  ppeList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.bool,
  ]),
  PageDetails: PropTypes.any,
  // searchFilter: PropTypes.func,
  comLocRefList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  PreEmpReqsStatusRefs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  applReqListData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  migrate: PropTypes.bool,
  // Function dispatch props
  dataRetrievePpeList: PropTypes.func,
  reqSearchFilter: PropTypes.func,
  retrieveApplReqList: PropTypes.func,
  updateIsRequired: PropTypes.func,
  uploadFile: PropTypes.func,
  updateReqStatusRef: PropTypes.func,
  toDeleteFile: PropTypes.func,
  migrateApplToEmp: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  ppeList: makeSelectData(),
  PageDetails: makeSelectPageDetails(),
  comLocRefList: makeSelectRefs('formLoad'),
  PreEmpReqsStatusRefs: makeSelectRefs('applForm'),
  applReqListData: makeSelectReqList(),
  migrate: makeSelectMigrate(),
});

function mapDispatchToProps(dispatch) {
  return {
    dataRetrievePpeList: (page, loc, search, unprocessed) => dispatch(retrieveJoSignedList(page, loc, search, unprocessed)),
    reqSearchFilter: (loc, input, unprocessed) => dispatch(searchAndFilterList(loc, input, unprocessed)),
    retrieveApplReqList: (id) => dispatch(reqApplReqList(id)),
    updateIsRequired: (e, isReqBool) => {
      const reqid = e.currentTarget.getAttribute('data-id');
      dispatch(reqUpdateIsRequired(reqid, isReqBool));
    },
    uploadFile: (e, reqid, jofile) => {
      const files = e.currentTarget.files;
      if (files.length > 0) {
        dispatch(uploadReqFiles(files, reqid, jofile));
      }
    },
    updateReqStatusRef: (e, reqid, reqstatid) => dispatch(updateReqStatus(reqid, reqstatid)),
    toDeleteFile: (id, attachType) => dispatch(deleteFile(id, attachType)),
    migrateApplToEmp: () => dispatch(migrateApplicant()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'hradmin', reducer });
const withSaga = injectSaga({ key: 'hradmin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PPEPage);
