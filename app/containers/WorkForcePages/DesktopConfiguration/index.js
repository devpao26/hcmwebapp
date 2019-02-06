/*
 * Desktop Configuration Pages
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ReactPaginate from 'react-paginate';

/* Global References */
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faCaretLeft } from '@fortawesome/fontawesome-free-solid';

/* Global Components */
import LoadingIndicator from 'components/LoadingIndicator';
import PageWrap from 'components/PageWrap';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';
import Sidebar from 'components/Sidebar';
import PageContent from 'components/Main/PageContent';
import Pagination from 'components/Pagination';
import Modal from 'components/Modal';
import ListBox from 'components/Modal/Listings';
import H2 from 'components/Section/H2';
import Confirm from 'components/ConfirmationDialog';
import Back from 'components/Section/Back';
import SearchFilter from 'components/SearchFilter';
import FilterButton from 'components/SearchFilter/Button';

/* Configurations Components */
import Grid from 'components/Main/Grid';
import Left from 'components/Configurations/Left';
import Right from 'components/Configurations/Right';
import Lists from 'components/Configurations/Lists';

import CreateTemplate from './CreateTemplate';
import TemplateList from './TemplateList';
import EnrolledList from './EnrolledList';
import TemplateDetails from './TemplateDetails';
import AddToLists from './AddToList';

/* selectors, reducer, saga and actions */
import reducer from './reducer';
import saga from './saga';

import {
  Templates,
  AddToList,
} from './constants';

import { makeSelectPageDetails, makeSelectError, makeSelectLoading, makeSelectSuccess } from './selectors';

import {
  resetState,
  getTemplates, getAddToList,
  getAssignToTemplate, getAssignToTemplateReset,
  getUnassignToTemplate, getUnassignToTemplateReset,
  getUpdateTemplate, getUpdateTemplateReset,
  getSaveTemplate, getSaveTemplateReset,
  getDeleteTemplate, getDeleteTemplateReset,
} from './actions';

export class DesktopConfigurationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      mobileTemplateSelected: 'Click to Select Template',
      mobileEnrolledSelected: 'Click to Select Enrolled in Template',
      templatePage: 1,
      templateSearch: false,
      templateSort: 'LastModDate',
      templateID: '',
      templateDetails: false,
      refreshEnrolledList: false,
      isCreateNewTemplate: false,
      isAddToTemplate: false,
      addToTemplateFilter: false,
      addToTemplateSearch: '',
      addToIDs: false,
      addToPageIndex: 1,
      isAssignResponse: false,
      isUnassignConfirm: false,
      isUnassignResponse: false,
      unassignID: false,
      unassignFilter: false,
      isSavingLoading: false,
      isConfirmUpdate: false,
      isUpdateResponse: false,
      updateData: false,
      isConfirmSave: false,
      isSaveResponse: false,
      saveData: false,
      isConfirmDelete: false,
      isDeleteResponse: false,
    };
  }

  componentDidMount = () => {
    this.props.retrieveTemplate(Templates.RETRIEVE, 1, false, 'LastModDate');
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.assignSuccess || nextProps.assignError) {
      this.setState({
        isAssignResponse: true,
      });
    }

    if (nextProps.unassignSuccess || nextProps.unassignError) {
      this.setState({
        isSavingLoading: false,
        isUnassignConfirm: false,
        isUnassignResponse: true,
      });
    }

    if (nextProps.updateSuccess || nextProps.updateError) {
      this.setState({
        isUpdateResponse: true,
        isSavingLoading: false,
        isConfirmUpdate: false,
      });
    }

    if (nextProps.saveSuccess || nextProps.saveError) {
      this.setState({
        isCreateNewTemplate: false,
        isSaveResponse: true,
        isSavingLoading: false,
        isConfirmSave: false,
      });
    }

    if (nextProps.deleteSuccess || nextProps.deleteError) {
      this.setState({
        isConfirmDelete: false,
        isSavingLoading: false,
        isDeleteResponse: true,
      });
    }
  }

  componentWillUnmount = () => {
    this.props.resetState();
  }

  // Show/Hide Create New Template
  showCreateNewTemplate = () => {
    this.setState({
      isCreateNewTemplate: true,
    });
  }
  hideCreateNewTemplate = (e) => {
    e.preventDefault();
    this.setState({
      isCreateNewTemplate: false,
    });
  }

  // Select template
  selectTemplate = (id, details) => {
    this.setState({
      templateID: id,
      templateDetails: details,
    });
  }

  gotoTemplatePage = (e) => {
    const page = e.selected + 1;
    this.setState({
      templatePage: page,
    });
    this.props.retrieveTemplate(Templates.PAGING, page, this.state.templateSearch, this.state.templateSort);
  }

  searchTemplates = (val) => {
    this.setState({
      templateSearch: val,
    });
    this.props.retrieveTemplate(Templates.RETRIEVE, 1, val, this.state.templateSort);
  }

  sortByTemplates = (e, sort) => {
    this.setState({
      templateSort: sort,
    });
    this.props.retrieveTemplate(Templates.RETRIEVE, 1, this.state.templateSearch, sort);
  }

  // Show/Hide Add To List Modal
  showAddToModal = (filter) => {
    this.setState({
      isAddToTemplate: true,
      addToTemplateFilter: filter,
    });

    this.props.retrieveAddToList(AddToList.RETRIEVE, 1, false, filter);
  }
  hideAddToModal = () => {
    this.setState({
      isAddToTemplate: false,
      addToTemplateFilter: false,
      addToTemplateSearch: '',
      addToPageIndex: 1,
    });
  }
  addToListGotoPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      addToPageIndex: page,
    });
    this.props.retrieveAddToList(AddToList.PAGING, page, this.state.addToTemplateSearch, this.state.addToTemplateFilter);
  }
  searchAddToList = (val) => {
    this.setState({
      addToTemplateSearch: (val) || '',
      addToPageIndex: 1,
    });
    this.props.retrieveAddToList(AddToList.RETRIEVE, 1, val, this.state.addToTemplateFilter);
  }

  // Add selected Department/Workgroup/Employee to Selected Template
  addToSelectedTemplate = (id) => {
    this.setState({
      addToIDs: id,
    });

    this.props.addSelectedToTemplate(`${this.state.templateID}/${id}`, this.state.addToTemplateFilter);
  }

  // Assign response
  hideAssignResponse = () => {
    this.setState({
      isAssignResponse: false,
      refreshEnrolledList: !this.state.refreshEnrolledList,
    });
    this.props.assignReset();
    this.props.retrieveAddToList(AddToList.PAGING, this.state.addToPageIndex, this.state.addToTemplateSearch, this.state.addToTemplateFilter);
  }

  // Unassign Confirm and Response
  showUnassignConfirm = (id, filter) => {
    this.setState({
      isUnassignConfirm: true,
      unassignID: id,
      unassignFilter: filter,
    });
  }
  hideUnassignConfirm = () => {
    this.setState({
      isUnassignConfirm: false,
      unassignID: false,
      unassignFilter: false,
    });
  }
  confirmUnassign = () => {
    this.setState({
      isSavingLoading: true,
    });
    this.props.unassignSelected(this.state.unassignID, this.state.unassignFilter);
  }
  hideUnassignResponse = () => {
    this.setState({
      isUnassignResponse: false,
      refreshEnrolledList: !this.state.refreshEnrolledList,
    });
    this.props.unassignReset();
  }

  // Updating of Template
  updateTemplate = (data) => {
    this.setState({
      isConfirmUpdate: true,
      updateData: data,
    });
  }
  hideConfirmUpdate = () => {
    this.setState({
      isConfirmUpdate: false,
      updateData: false,
    });
  }
  confirmUpdate = () => {
    this.setState({
      isSavingLoading: true,
    });
    this.props.updateTemplate(this.state.templateID, this.state.updateData);
  }
  hideUpdateResponse = () => {
    this.setState({
      isUpdateResponse: false,
      templateID: '',
      templateDetails: false,
    });
    this.props.updateReset();
    this.props.retrieveTemplate(Templates.PAGING, this.state.templatePage, false);
  }

  // Saving of Template
  saveTemplate = (data) => {
    this.setState({
      isConfirmSave: true,
      saveData: data,
    });
  }
  hideConfirmSave = () => {
    this.setState({
      isConfirmSave: false,
      saveData: false,
    });
  }
  confirmSave = () => {
    this.setState({
      isSavingLoading: true,
    });
    this.props.saveTemplate(this.state.saveData);
  }
  hideSaveResponse = () => {
    this.setState({
      isSaveResponse: false,
      templateID: '',
      templateDetails: false,
    });
    this.props.saveReset();
    this.props.retrieveTemplate(Templates.PAGING, this.state.templatePage, false);
  }

  // Delete Template
  deleteTemplate = () => {
    this.setState({
      isConfirmDelete: true,
    });
  }
  hideConfirmDelete = () => {
    this.setState({
      isConfirmDelete: false,
    });
  }
  confirmDelete = () => {
    this.setState({
      isSavingLoading: true,
    });
    this.props.deleteTemplate(this.state.templateID);
  }
  hideDeleteResponse = () => {
    this.setState({
      isDeleteResponse: false,
      templateID: '',
      templateDetails: false,
    });
    this.props.deleteReset();
    this.props.retrieveTemplate(Templates.PAGING, this.state.templatePage, false);
  }

  /**
   * Toggle Mobile Display (for lists)
   * @param {object}      e     Event handler
   * @param {bool/string} name  Name of the selected item in list
   * @param {string}      id    ID of the list to be shown
   */
  toggleMobileList = (e, name = false, id) => {
    e.preventDefault();

    if (name) {
      this.setState({
        mobileTemplateSelected: name,
        mobileEnrolledSelected: 'Click to Select Template',
      });
    }

    const el = document.getElementById(id);
    // add/remove max height on our content element for animation
    const maxHeight = el.scrollHeight; // get the scroll height of the element
    if (el.style.maxHeight) {
      el.style.maxHeight = null;
    } else {
      el.style.maxHeight = `${maxHeight}px`; // set the max height style
    }
  }

  render() {
    const { templatePages, addToListPages } = this.props;

    let templateMaxPageIndex = 1;
    if (templatePages) templateMaxPageIndex = templatePages.MaxPageIndex;

    let addToListMaxPageIndex = 1;
    if (addToListPages) addToListMaxPageIndex = addToListPages.MaxPageIndex;

    return (
      <PageWrap>
        <Helmet>
          <title>Desktop Configuration</title>
        </Helmet>
        <Header />
        <Sidebar location={this.location} />
        <Main>
          <PageContent>
            <Back onClick={this.props.history.goBack}><FontAwesomeIcon icon={faCaretLeft} /> BACK TO WORKFORCE ADMIN</Back>
            <Grid columns="250px auto" gap="0 20px">
              <Left>
                <H2>Template List</H2>
                {/* <button className="mobile-toggle" title={this.state.mobileTemplateSelected} onClick={(e) => { this.toggleMobileList(e, false, 'templateList'); }}>
                  {this.state.mobileTemplateSelected}
                  <FontAwesomeIcon icon={faCaretDown} />
                </button> */}
                <Lists id="templateList">
                  <button className="create-new" onClick={this.showCreateNewTemplate}>Create New Template <FontAwesomeIcon icon={faPlus} /></button>
                  <SearchFilter search onClick={(val) => { this.searchTemplates(val); }} defaultVal={(this.state.templateSearch) || ''}>
                    <span className="filter-label">Sort by:</span>
                    <FilterButton className={(this.state.templateSort === 'LastModDate') && 'active'} onClick={(e) => { this.sortByTemplates(e, 'LastModDate'); }}>Date</FilterButton>
                    <FilterButton className={(this.state.templateSort === 'Name') && 'active'} onClick={(e) => { this.sortByTemplates(e, 'Name'); }}>Name</FilterButton>
                  </SearchFilter>
                  <TemplateList select={this.selectTemplate} templateID={this.state.templateID} />
                  { (templatePages && templateMaxPageIndex > 1) &&
                    <Pagination>
                      <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={<span>...</span>}
                        breakClassName={'break-me'}
                        pageCount={templateMaxPageIndex}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={4}
                        onPageChange={this.gotoTemplatePage}
                        activeClassName={'active'}
                      />
                    </Pagination>
                  }
                </Lists>
              </Left>
              <Right>
                <H2>Template Details</H2>
                <Grid columns="1fr 1fr" gap="0 0">
                  <EnrolledList
                    templateID={this.state.templateID}
                    showAddTo={this.showAddToModal}
                    refresh={this.state.refreshEnrolledList}
                    unassign={this.showUnassignConfirm}
                  />
                  <TemplateDetails details={this.state.templateDetails} update={this.updateTemplate} delete={this.deleteTemplate} />
                </Grid>
              </Right>
            </Grid>
          </PageContent>
        </Main>
        <Footer />
        {/* Creation of New Template */}
        <Modal
          show={this.state.isCreateNewTemplate}
          title="Create New Template"
          width="440px"
        >
          <CreateTemplate close={this.hideCreateNewTemplate} submit={this.saveTemplate} />
        </Modal>

        {/* Add To Template list */}
        <Modal
          show={this.state.isAddToTemplate}
          onClose={this.hideAddToModal}
          showCloseBtn
          title={`${this.state.addToTemplateFilter} List`}
          width="340px"
        >
          <ListBox>
            {(this.props.assignLoading) && <div className="loading-cont"><LoadingIndicator /></div>}
            {(!this.props.addToListError) && <SearchFilter search onClick={(val) => { this.searchAddToList(val); }} placeholder={`Search ${this.state.addToTemplateFilter}`} formRef={(el) => { this.addToForm = el; }} defaultVal={this.state.addToTemplateSearch} />}

            <AddToLists addSelected={(id) => { this.addToSelectedTemplate(id); }} catName={this.state.addToTemplateFilter} templateName={this.state.templateDetails.Name} />

            { (addToListPages && addToListMaxPageIndex !== 1) &&
              <Pagination>
                <ReactPaginate
                  previousLabel={'Previous'}
                  nextLabel={'Next'}
                  breakLabel={<span>...</span>}
                  breakClassName={'break-me'}
                  pageCount={addToListMaxPageIndex}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={4}
                  onPageChange={this.addToListGotoPage}
                  activeClassName={'active'}
                />
              </Pagination>
            }
          </ListBox>
        </Modal>
        {/* Assign Entity to Template response */}
        <Confirm
          show={this.state.isAssignResponse}
          title={(this.props.assignSuccess) ? 'SUCCESS' : 'FAILED'}
          onClick={this.hideAssignResponse}
          okBtnText="OK"
        >
          {(this.props.assignSuccess) && <p>Selected {this.state.addToTemplateFilter} has been successfully assigned to this template.</p>}
          {(this.props.assignError) && <p>There was a problem assigning selected {this.state.addToTemplateFilter} to template. Please try again later.</p>}
        </Confirm>

        {/* Unassign Confirm/Response */}
        <Confirm
          show={this.state.isUnassignConfirm}
          title="CONFIRMATION"
          onClick={this.confirmUnassign}
          okBtnText="PROCEED"
          cancelBtn
          cancelBtnText="CANCEL"
          onClose={this.hideUnassignConfirm}
        >
          {(this.state.isSavingLoading) && <div className="loading-cont"><LoadingIndicator /></div>}
          <p>Are you sure you want to unassign selected {this.state.unassignFilter} from this template?</p>
        </Confirm>
        <Confirm
          show={this.state.isUnassignResponse}
          title={(this.props.unassignSuccess) ? 'SUCCESS' : 'FAILED'}
          onClick={this.hideUnassignResponse}
          okBtnText="OK"
        >
          {(this.props.unassignSuccess) && <p>Selected {this.state.unassignFilter} has been successfully unassigned to this template.</p>}
          {(this.props.unassignError) && <p>There was a problem unassigning selected {this.state.unassignFilter} to template. Please try again later.</p>}
        </Confirm>

        {/* Update Template Confirm/Response */}
        <Confirm
          show={this.state.isConfirmUpdate}
          title="CONFIRMATION"
          onClick={this.confirmUpdate}
          okBtnText="PROCEED"
          cancelBtn
          cancelBtnText="CANCEL"
          onClose={this.hideConfirmUpdate}
        >
          {(this.state.isSavingLoading) && <div className="loading-cont"><LoadingIndicator /></div>}
          <p>Are you sure you want to update selected template?</p>
        </Confirm>
        <Confirm
          show={this.state.isUpdateResponse}
          title={(this.props.updateSuccess) ? 'SUCCESS' : 'FAILED'}
          onClick={this.hideUpdateResponse}
          okBtnText="OK"
        >
          {(this.props.updateSuccess) && <p>Template has been successfully updated.</p>}
          {(this.props.updateError) && <p>There was a problem updating template. Please try again later.</p>}
        </Confirm>

        {/* Create Template Confirm/Response */}
        <Confirm
          show={this.state.isConfirmSave}
          title="CONFIRMATION"
          onClick={this.confirmSave}
          okBtnText="PROCEED"
          cancelBtn
          cancelBtnText="CANCEL"
          onClose={this.hideConfirmSave}
        >
          {(this.state.isSavingLoading) && <div className="loading-cont"><LoadingIndicator /></div>}
          <p>Are you sure you want to create the template?</p>
        </Confirm>
        <Confirm
          show={this.state.isSaveResponse}
          title={(this.props.saveSuccess) ? 'SUCCESS' : 'FAILED'}
          onClick={this.hideSaveResponse}
          okBtnText="OK"
        >
          {(this.props.saveSuccess) && <p>Template has been successfully created.</p>}
          {(this.props.saveError) && <p>There was a problem creating the template. Please try again later.</p>}
        </Confirm>

        {/* Delete Template Confirm/Response */}
        <Confirm
          show={this.state.isConfirmDelete}
          title="CONFIRMATION"
          onClick={this.confirmDelete}
          okBtnText="PROCEED"
          cancelBtn
          cancelBtnText="CANCEL"
          onClose={this.hideConfirmDelete}
        >
          {(this.state.isSavingLoading) && <div className="loading-cont"><LoadingIndicator /></div>}
          <p>Are you sure you want to delete selected template?</p>
        </Confirm>
        <Confirm
          show={this.state.isDeleteResponse}
          title={(this.props.deleteSuccess) ? 'SUCCESS' : 'FAILED'}
          onClick={this.hideDeleteResponse}
          okBtnText="OK"
        >
          {(this.props.deleteSuccess) && <p>Template has been deleted successfully.</p>}
          {(this.props.deleteError) && <p>There was a problem deleting the template. Please try again later.</p>}
        </Confirm>
      </PageWrap>
    );
  }
}


DesktopConfigurationPage.propTypes = {
  history: PropTypes.object,
  templatePages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  addToListError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  addToListPages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  assignLoading: PropTypes.bool,
  assignError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  assignSuccess: PropTypes.bool,
  unassignError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  unassignSuccess: PropTypes.bool,
  // updateLoading: PropTypes.bool,
  updateError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  updateSuccess: PropTypes.bool,
  saveError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  saveSuccess: PropTypes.bool,
  deleteError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  deleteSuccess: PropTypes.bool,
  // Function dispatch Props
  resetState: PropTypes.func,
  retrieveTemplate: PropTypes.func,
  retrieveAddToList: PropTypes.func,
  addSelectedToTemplate: PropTypes.func,
  assignReset: PropTypes.func,
  unassignSelected: PropTypes.func,
  unassignReset: PropTypes.func,
  updateTemplate: PropTypes.func,
  updateReset: PropTypes.func,
  saveTemplate: PropTypes.func,
  saveReset: PropTypes.func,
  deleteTemplate: PropTypes.func,
  deleteReset: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  templatePages: makeSelectPageDetails('templateList'),
  addToListError: makeSelectError('addToList'),
  addToListPages: makeSelectPageDetails('addToList'),
  assignLoading: makeSelectLoading('assign'),
  assignError: makeSelectError('assign'),
  assignSuccess: makeSelectSuccess('assign'),
  unassignLoading: makeSelectLoading('unassign'),
  unassignError: makeSelectError('unassign'),
  unassignSuccess: makeSelectSuccess('unassign'),
  // updateLoading: makeSelectLoading('update'),
  updateError: makeSelectError('update'),
  updateSuccess: makeSelectSuccess('update'),
  saveError: makeSelectError('save'),
  saveSuccess: makeSelectSuccess('save'),
  deleteError: makeSelectError('delete'),
  deleteSuccess: makeSelectSuccess('delete'),
});

function mapDispatchToProps(dispatch) {
  return {
    resetState: () => dispatch(resetState()),
    retrieveTemplate: (action, page, search, sort) => dispatch(getTemplates(action, page, search, sort)),
    retrieveAddToList: (action, page, search, filter) => dispatch(getAddToList(action, page, search, filter)),
    addSelectedToTemplate: (id, filter) => dispatch(getAssignToTemplate(id, filter)),
    assignReset: () => dispatch(getAssignToTemplateReset()),
    unassignSelected: (id, filter) => dispatch(getUnassignToTemplate(id, filter)),
    unassignReset: () => dispatch(getUnassignToTemplateReset()),
    updateTemplate: (id, data) => dispatch(getUpdateTemplate(id, data)),
    updateReset: () => dispatch(getUpdateTemplateReset()),
    saveTemplate: (data) => dispatch(getSaveTemplate(data)),
    saveReset: () => dispatch(getSaveTemplateReset()),
    deleteTemplate: (id) => dispatch(getDeleteTemplate(id)),
    deleteReset: () => dispatch(getDeleteTemplateReset()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'wfadmin', reducer });
const withSaga = injectSaga({ key: 'wfadmin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DesktopConfigurationPage);
