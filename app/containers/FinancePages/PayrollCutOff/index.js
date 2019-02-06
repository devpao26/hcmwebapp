/*
 * Shift Template Pages
 * Choose this option to initialize active state (let bgColor = this.state.bgColor ? "#fffff" : "#fbfcfe")
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactPaginate from 'react-paginate';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faCaretDown } from '@fortawesome/fontawesome-free-solid';

/* Global injectSaga and injectReducer */
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

/* Global Components */
import PageWrap from 'components/PageWrap';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';
import Sidebar from 'components/Sidebar';
import PageContent from 'components/Main/PageContent';
import Confirm from 'components/ConfirmationDialog';
import Img from 'components/Header/Img';
import WorkIcon from 'components/ImageFiles/payrolltemplateicon.png';
// import Button from 'components/Button';
// import ButtonWrapper from 'components/Button/ButtonWrapper';
import Modal from 'components/Modal';
import ListBox from 'components/Modal/Listings';
import Pagination from 'components/Pagination';
import LoadingIndicator from 'components/LoadingIndicator';

/* Template Page Component */
import Left from 'components/Templates/Left';
import Right from 'components/Templates/Right';
import TemplateHeader from 'components/Templates/Header';
import EnrolledInTemplate from 'components/Templates/EnrolledInTemplate';
import TemplateList from 'components/Templates/TemplateList';

/* Section Component */
import H2 from 'components/Section/H2';
import Flex from 'components/SectionFlex';

/* SearchFilter Components */
import SearchFilter from 'components/SearchFilter';
import FilterButton from 'components/SearchFilter/Button';

/* OptionMenu Components */
import OptionMenu from 'components/OptionMenu';

import GroupFilter from 'components/Enums/GroupFilter';

/* Own Components */
// import RequestForm from './RequestForm';
import TemplateLists from './TemplateList';
import EnrolledList from './EnrolledList';
import TemplateDetails from './TemplateDetails';
import AddToLists from './AddToList';
import CreateEditTemplate from './CreateEditTemplate';

/* selectors, reducer, saga and actions */
import reducer from './reducer';
import saga from './saga';

import { Template, Enrolled, AddToList } from './constants';

import {
  makeSelectData,
  makeSelectPageDetails,
  makeSelectError,
  makeSelectSuccess,
} from './selectors';

import {
  getTemplateList,
  getEnrolledList,
  getAddToList,
  getAssignToTemplate,
  getAssignToTemplateReset,
  getUnassignToTemplate,
  getUnassignToTemplateReset,
  getUpdateTemplate,
  getUpdateTemplateReset,
  getSaveTemplate,
  getSaveTemplateReset,
  getDeleteTemplate,
  getDeleteTemplateReset,
  resetState,
} from './actions';

export class PayrollCutOffList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isSavingLoading: false,
      templateID: false,
      templateDetailsIndex: 0,
      templateDetails: false,
      templateSearch: '',
      templateSort: 'LastModDate',
      templatePageIndex: 1,
      enrolledListFilter: false,
      enrolledListSearch: '',
      enrolledListPage: 1,
      isAddToTemplate: false,
      isAssignResponse: false,
      addToTemplateFilter: false,
      addToTemplateSearch: '',
      addToPageIndex: 1,
      addToIDs: false,
      isUnassignConfirm: false,
      isUnassignResponse: false,
      unassignID: false,
      unassignName: false,
      isCreateNewTemplate: false,
      isCreate: true,
      isEditTemplate: false,
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

  componentDidMount() {
    this.props.retrieveTemplateList(Template.RETRIEVE, 1, false, 'LastModDate');
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.templateList && nextProps.templateList !== this.props.templateList) {
      this.setState({
        templateDetails: nextProps.templateList[0],
        templateID: nextProps.templateList[0].CutoffTemplateID,
        enrolledListFilter: GroupFilter.Employee,
      });
      this.props.retrieveEnrolledList(Enrolled.RETRIEVE, nextProps.templateList[0].CutoffTemplateID, 1, false, GroupFilter.Employee);
    }

    if (nextProps.assignSuccess || nextProps.assignError) {
      this.setState({
        isAddToTemplate: false,
        isSavingLoading: false,
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
        isCreateNewTemplate: false,
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

  // Get details of selected template
  showTemplateDetails = (id, item) => {
    this.setState({
      enrolledListSearch: '',
      enrolledListPage: 1,
      enrolledListFilter: GroupFilter.Employee,
      templateID: id,
      templateDetails: item,
    });

    this.props.retrieveEnrolledList(Enrolled.RETRIEVE, id, 1, false, GroupFilter.Employee);
  }

  searchTemplateList = (val) => {
    this.setState({
      templateSearch: val,
    });
    this.props.retrieveTemplateList(Template.RETRIEVE, 1, val, this.state.templateSort);
  }

  // Sort Template List by: Name or Date
  sortTemplateList = (e, sort) => {
    e.preventDefault();

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

    this.setState({
      templateSort: sort,
    });

    this.props.retrieveTemplateList(Template.RETRIEVE, 1, this.state.templateSearch, sort);
  }

  // Template Pagination
  templateGotoPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      templatePageIndex: page,
    });
    this.props.retrieveTemplateList(Template.PAGING, page, this.state.templateSearch, this.state.templateSort);
  }

  // Search Enrolled List
  searchEnrolledList = (val) => {
    this.setState({
      enrolledListSearch: val,
    });
    this.props.retrieveEnrolledList(Enrolled.RETRIEVE, this.state.templateID, 1, val, this.state.enrolledListFilter);
  }

  // Enrolled Pagination
  enrolledGotoPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      enrolledListPage: page,
    });
    this.props.retrieveEnrolledList(Enrolled.PAGING, this.state.templateID, page, this.state.enrolledListSearch, this.state.enrolledListFilter);
  }

  // Filter enrolled list
  enrolledFilter = (e, filter) => {
    this.setState({
      enrolledListFilter: filter,
      enrolledListSearch: '',
    });
    this.props.retrieveEnrolledList(Enrolled.RETRIEVE, this.state.templateID, 1, false, filter);
  }

  // Show Schedule Options
  showSchedType = (e) => {
    e.preventDefault();
    this.setState({
      schedTypeOption: !this.state.schedTypeOption,
    });
  }

  // Change Schedule Options
  changeSchedType = (e) => {
    e.preventDefault();
    const schedType = e.target.getAttribute('data-title');
    this.setState({
      schedTypeText: schedType,
      schedTypeOption: false,
    });
  }
  // Show deletion option on modal
  showDelete = () => {
    this.setState({
      confirmDelete: !this.state.confirmDelete,
    });
  }

  // Create New Template
  showCreateNewTemplate = (e, isCreate) => {
    e.preventDefault();
    this.setState({
      isCreateNewTemplate: true,
      isCreate,
    });
  }
  hideCreateNewTemplate = (e) => {
    e.preventDefault();
    this.setState({
      isCreateNewTemplate: false,
    });
  }
  // Create/Edit of Template
  saveTemplate = (data) => {
    if (this.state.isCreate) {
      this.setState({
        isConfirmSave: true,
        saveData: data,
      });
    } else {
      this.setState({
        isConfirmUpdate: true,
        updateData: data,
      });
    }
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
    if (this.state.isCreate) {
      this.props.saveTemplate(this.state.saveData);
    } else {
      this.props.updateTemplate(this.state.saveData);
    }
  }
  hideSaveResponse = () => {
    this.setState({
      saveData: false,
      isSaveResponse: false,
      templateID: '',
      templateDetails: false,
      templateSort: 'LastModDate',
      templateSearch: '',
    });
    this.props.saveReset();
    this.props.retrieveTemplateList(Template.RETRIEVE, 1, false, 'LastModDate');
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
      updateData: false,
      isUpdateResponse: false,
      templateID: '',
      templateDetails: false,
      templateSort: 'LastModDate',
      templateSearch: '',
    });
    this.props.updateReset();
    this.props.retrieveTemplateList(Template.RETRIEVE, 1, false, 'LastModDate');
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
      templateSort: 'LastModDate',
      templateSearch: '',
    });
    this.props.deleteReset();
    this.props.retrieveTemplateList(Template.RETRIEVE, 1, false, 'LastModDate');
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
  addSelectedToTemplate = (id) => {
    this.setState({
      addToIDs: id,
    });
    this.props.assignSelectedToTemplate(`${this.state.templateID}/${id}`, this.state.addToTemplateFilter);
  }
  hideAssignResponse = () => {
    this.setState({
      isAssignResponse: false,
    });
    this.props.assignReset();
    this.props.retrieveEnrolledList(Enrolled.PAGING, this.state.templateID, this.state.enrolledListPage, this.state.enrolledListSearch, this.state.enrolledListFilter);
  }

  // Unassign Confirm and Response
  showUnassignConfirm = (name, id) => {
    this.setState({
      isUnassignConfirm: true,
      unassignID: id,
      unassignName: name,
    });
  }
  hideUnassignConfirm = () => {
    this.setState({
      isUnassignConfirm: false,
      unassignID: false,
      unassignName: false,
    });
  }
  confirmUnassign = () => {
    this.setState({
      isSavingLoading: true,
    });
    this.props.unassignSelected(this.state.unassignID, this.state.enrolledListFilter);
  }
  hideUnassignResponse = () => {
    this.setState({
      isUnassignResponse: false,
    });
    this.props.unassignReset();
    this.props.retrieveEnrolledList(Enrolled.PAGING, this.state.templateID, this.state.enrolledListPage, this.state.enrolledListSearch, this.state.enrolledListFilter);
  }

  // Toggle mobile display
  mobileToggleDisplay = (e) => {
    // get our parent container
    const parent = e.currentTarget.parentNode.parentNode;

    // toggle our class
    parent.classList.toggle('toggle');
  }

  render() {
    // Declare props
    const {
      templateListPages,
      enrolledListPages,
      addToListPages,
    } = this.props;

    // Get Max Page Index of the list (defaults to 1)
    let templateListMaxPageIndex = 1;
    if (templateListPages) templateListMaxPageIndex = templateListPages.MaxPageIndex;

    let addToListMaxPageIndex = 1;
    if (addToListPages) addToListMaxPageIndex = addToListPages.MaxPageIndex;

    let enrolledListMaxPageIndex = 1;
    if (enrolledListPages) enrolledListMaxPageIndex = enrolledListPages.MaxPageIndex;

    return (
      <PageWrap>
        <Helmet>
          <title>Payroll CutOff</title>
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Flex>
              <Left className="toggle">
                <H2>Template Overview <button onClick={this.mobileToggleDisplay}><FontAwesomeIcon icon={faCaretDown} /></button></H2>
                <TemplateHeader>
                  <div className="template-icon">
                    <Img src={WorkIcon} alt="Payroll Cutoff Template Icon"></Img>
                  </div>
                  <TemplateDetails details={this.state.templateDetails} edit={(e) => { this.showCreateNewTemplate(e, false); }} delete={this.deleteTemplate} />
                </TemplateHeader>
                <EnrolledInTemplate>
                  <div className="enrolled-heading">
                    List of Enrolled Users
                    <OptionMenu title="Category" position="right" icon="plus">
                      <button onClick={() => { this.showAddToModal(GroupFilter.Workgroup); }}>Workgroup</button>
                      <button onClick={() => { this.showAddToModal(GroupFilter.Department); }}>Department</button>
                      <button onClick={() => { this.showAddToModal(GroupFilter.Employee); }}>Employee</button>
                    </OptionMenu>
                  </div>

                  <SearchFilter search onClick={(val) => { this.searchEnrolledList(val); }} defaultVal={(this.state.enrolledListSearch) || ''}>
                    <FilterButton className={(this.state.enrolledListFilter === GroupFilter.Employee) && 'active'} onClick={(e) => { this.enrolledFilter(e, GroupFilter.Employee); }}>Employee</FilterButton>
                    <FilterButton className={(this.state.enrolledListFilter === GroupFilter.Workgroup) && 'active'} onClick={(e) => { this.enrolledFilter(e, GroupFilter.Workgroup); }}>Workgroup</FilterButton>
                    <FilterButton className={(this.state.enrolledListFilter === GroupFilter.Department) && 'active'} onClick={(e) => { this.enrolledFilter(e, GroupFilter.Department); }}>Department</FilterButton>
                  </SearchFilter>

                  <EnrolledList filter={this.state.enrolledListFilter} unassign={this.showUnassignConfirm} />
                  { (enrolledListPages && enrolledListMaxPageIndex !== 1) &&
                    <Pagination>
                      <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={<span>...</span>}
                        breakClassName={'break-me'}
                        pageCount={enrolledListMaxPageIndex}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={4}
                        onPageChange={this.enrolledGotoPage}
                        activeClassName={'active'}
                      />
                    </Pagination>
                  }
                </EnrolledInTemplate>
              </Left>
              <Right>
                <H2>Payroll Cutoff Templates <button onClick={this.mobileToggleDisplay}><FontAwesomeIcon icon={faCaretDown} /></button></H2>
                <TemplateList>
                  <div className="create-new">
                    <button onClick={(e) => { this.showCreateNewTemplate(e, true); }}><FontAwesomeIcon icon={faPlus} /> Create New Template</button>
                  </div>
                  <SearchFilter search onClick={(val) => { this.searchTemplateList(val); }} formRef={(el) => { this.templateSearchForm = el; }} defaultVal={(this.state.templateSearch) || ''} >
                    <span className="filter-label">Sort by:</span>
                    <FilterButton className={(this.state.templateSort === 'LastModDate') && 'active'} onClick={(e) => { this.sortTemplateList(e, 'LastModDate'); }}>Date</FilterButton>
                    <FilterButton className={(this.state.templateSort === 'Name') && 'active'} onClick={(e) => { this.sortTemplateList(e, 'Name'); }}>Name</FilterButton>
                  </SearchFilter>

                  <TemplateLists templateIndex={this.state.templateDetailsIndex} getTemplateId={this.showTemplateDetails} />

                  { (templateListPages && templateListMaxPageIndex !== 1) &&
                    <Pagination>
                      <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={<span>...</span>}
                        breakClassName={'break-me'}
                        pageCount={templateListMaxPageIndex}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={4}
                        onPageChange={this.templateGotoPage}
                        activeClassName={'active'}
                      />
                    </Pagination>
                  }
                </TemplateList>
              </Right>
            </Flex>
          </PageContent>
        </Main>
        <Footer />
        {/* Add To Template list */}
        <Modal
          show={this.state.isAddToTemplate}
          onClose={this.hideAddToModal}
          showCloseBtn
          title={`${this.state.addToTemplateFilter} List`}
          width="340px"
        >
          <ListBox>
            {(this.state.isSavingLoading) && <div className="loading-cont"><LoadingIndicator /></div>}
            {(!this.props.addToListError) && <SearchFilter search onClick={(val) => { this.searchAddToList(val); }} placeholder={`Search ${this.state.addToTemplateFilter}`} formRef={(el) => { this.addToForm = el; }} defaultVal={this.state.addToTemplateSearch} />}

            <AddToLists addSelected={(id) => { this.addSelectedToTemplate(id); }} catName={this.state.addToTemplateFilter} templateName={this.state.templateDetails.Name} />

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
          <p>Are you sure you want to unassign <br /><span className="text-green">{this.state.unassignName}</span> from this template?</p>
        </Confirm>
        <Confirm
          show={this.state.isUnassignResponse}
          title={(this.props.unassignSuccess) ? 'SUCCESS' : 'FAILED'}
          onClick={this.hideUnassignResponse}
          okBtnText="OK"
        >
          {(this.props.unassignSuccess) && <p><span className="text-green">{this.state.unassignName}</span> has been successfully<br />unassigned to this template.</p>}
          {(this.props.unassignError) && <p>There was a problem unassigning <span className="text-green">{this.state.unassignName}</span> to template. Please try again later.</p>}
        </Confirm>

        {/* Create New Template */}
        <Modal
          show={this.state.isCreateNewTemplate}
          title={(this.state.isCreate) ? 'Create New Template' : 'Edit Template'}
          width="450px"
        >
          <CreateEditTemplate close={this.hideCreateNewTemplate} save={this.saveTemplate} details={this.state.templateDetails} isEdit={!this.state.isCreate} />
        </Modal>

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

PayrollCutOffList.propTypes = {
  location: PropTypes.object,
  // map state props
  templateList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  templateListPages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  enrolledListPages: PropTypes.oneOfType([
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
  assignSuccess: PropTypes.bool,
  assignError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  unassignError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  unassignSuccess: PropTypes.bool,
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
  // Function dispatch props
  resetState: PropTypes.func,
  retrieveTemplateList: PropTypes.func,
  retrieveEnrolledList: PropTypes.func,
  retrieveAddToList: PropTypes.func,
  assignSelectedToTemplate: PropTypes.func,
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
  templateList: makeSelectData('templateList'),
  templateListPages: makeSelectPageDetails('templateList'),
  enrolledListPages: makeSelectPageDetails('enrolledList'),
  addToListError: makeSelectError('addToList'),
  addToListPages: makeSelectPageDetails('addToList'),
  assignSuccess: makeSelectSuccess('assign'),
  assignError: makeSelectError('assign'),
  unassignError: makeSelectError('unassign'),
  unassignSuccess: makeSelectSuccess('unassign'),
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
    retrieveTemplateList: (type, page, search, sort) => dispatch(getTemplateList(type, page, search, sort)),
    retrieveEnrolledList: (type, id, page, search, filter) => dispatch(getEnrolledList(type, id, page, search, filter)),
    retrieveAddToList: (action, page, search, filter) => dispatch(getAddToList(action, page, search, filter)),
    assignSelectedToTemplate: (id, filter) => dispatch(getAssignToTemplate(id, filter)),
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

const withReducer = injectReducer({ key: 'pradmin', reducer });
const withSaga = injectSaga({ key: 'pradmin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PayrollCutOffList);
