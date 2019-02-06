/*
 * Shift Template Page
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

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faMinus } from '@fortawesome/fontawesome-free-solid';

/* Global injectSaga and injectReducer */
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

/* Global Components */
import Loading from 'components/LoadingIndicator/Loading';
import PageWrap from 'components/PageWrap';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';
import Sidebar from 'components/Sidebar';
import PageContent from 'components/Main/PageContent';
import Confirm from 'components/ConfirmationDialog';
import Img from 'components/Header/Img';
import WorkIcon from 'components/ImageFiles/shift.png';
import Modal from 'components/Modal';
import ListBox from 'components/Modal/Listings';
import Pagination from 'components/Pagination';

/* SearchFilter Components */
import SearchFilter from 'components/SearchFilter';
import FilterButton from 'components/SearchFilter/Button';

/* Template Page Component */
import Left from 'components/Templates/Left';
import Right from 'components/Templates/Right';
import TemplateHeader from 'components/Templates/Header';
import EnrolledInTemplate from 'components/Templates/EnrolledInTemplate';
import TemplateList from 'components/Templates/TemplateList';

/* Section Component */
import H2 from 'components/Section/H2';
import Flex from 'components/SectionFlex';

/* OptionMenu Components */
import OptionMenu from 'components/OptionMenu';

/* Local Component */
import TemplateListings from './TemplateLists';
import EnrolledListings from './EnrolledLists';
import CreateNewTemplate from './CreateNewTemplate';
import EditShiftTemplate from './EditShiftTemplate';
import AddToList from './AddToList';

/* selectors, reducer, saga and actions */
import {
  clearAllStateData,
  getShiftTemplateLists,
  searchTemplateList,
  sortTemplateList,
  getEnrolledInTemplate,
  gotoPageInEnrolledLists,
  searchEnrolledLists,
  getFlexiRefs,
  saveShiftTemplate,
  clearTemplateData,
  deleteShiftTemplate,
  clearDeleteSuccess,
  getAddToList,
  addToTemplate,
  searchAddToTemplateList,
  clearAddToTemplateData,
  unAssignTemplate,
  clearUnassign,
} from './actions';

import {
  makeSelectData,
  makeSelectListsLoading,
  makeSelectListsError,
  makeSelectRequester,
  makeSelectPageDetails,
  makeSelectFlexiRefs,
  makeSelectSaveShiftTemplateLoading,
  makeSelectSaveShiftTemplateError,
  makeSelectDeleteTemplateSuccess,
  makeSelectShiftTemplateID,
} from './selectors';

import reducer from './reducer';
import saga from './saga';

export class ShiftTemplatePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      templateID: '',
      templateDetailsIndex: 0,
      templatePageIndex: 1,
      searchTemplateQuery: '',
      sortTemplateQuery: 'LastModDate',
      createNewTemp: false,
      editShiftTemp: false,
      enrolledCatRequester: 'Employee',
      searchEnrolledQuery: '',
      isCreationSuccess: false,
      isDeleteTemplate: false,
      isDeleteSuccess: false,
      isAddToTemplate: false,
      addToTemplateCatName: '',
      addToTemplateID: '',
      searchAddToListQuery: '',
      isAddSuccess: false,
      confirmUnassign: false,
      nameToUnassign: '',
      unassignID: '',
      isUnassignSuccess: false,
    };
  }

  componentDidMount() {
    // Initial data retrieval
    this.props.retrieveShiftTemplateLists(1, false, 'LastModDate');
    this.props.retrieveFlexiRefs();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stateShiftTemplateID !== false) {
      this.setState({
        templateID: nextProps.stateShiftTemplateID,
      });
    }

    if (nextProps.saveShiftTemplateSuccess === true) {
      this.setState({
        isCreationSuccess: !this.state.isCreationSuccess,
      });
    }

    if (nextProps.deleteTemplateSuccess === true) {
      this.setState({
        isDeleteSuccess: !this.state.isDeleteSuccess,
      });
    }

    if (nextProps.addToTemplateSuccess === true) {
      this.setState({
        isAddSuccess: !this.state.isAddSuccess,
      });
    }

    if (nextProps.unassignSuccess === true) {
      this.setState({
        confirmUnassign: false,
        isUnassignSuccess: !this.state.isUnassignSuccess,
      });
    }
  }

  componentWillUnmount() {
    // Need to clear some state data
    // so when we return to this page
    // we will load the default settings
    this.props.clearStateData();
  }

  // Get details of selected template
  showTemplateDetails = (id) => {
    // Reset the enrolled search form
    this.searchForm.reset();

    const list = this.props.templateList;

    if (id) {
      this.setState({
        templateID: id,
        templateDetailsIndex: list.findIndex((item) => item.ShiftTemplateID === id),
      });

      this.props.retrieveEnrolledLists(this.state.enrolledCatRequester, id);
    }
  }

  // Retrieve Enrolled List (Department/Workgroup/Employee)
  // Default: employee
  enrolledListReq = (e, cat, id) => {
    // Reset the enrolled search form
    this.searchForm.reset();

    this.setState({
      searchEnrolledQuery: '',
      enrolledCatRequester: cat,
    });

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

    this.props.retrieveEnrolledLists(cat, id);
  }

  // Show Unassign confirmation modal
  showConfirmUnassign = (e, name, id) => {
    this.setState({
      nameToUnassign: name,
      confirmUnassign: !this.state.confirmUnassign,
      unassignID: id,
    });
  }
  hideConfirmUnassign = () => {
    this.setState({
      confirmUnassign: false,
    });
  }

  // Create New Template
  toggleCreateNewTemplate = (e) => {
    e.preventDefault();
    this.setState({
      createNewTemp: !this.state.createNewTemp,
    });
  }

  toggleEditShiftTemplate = (e) => {
    e.preventDefault();
    this.setState({
      editShiftTemp: !this.state.editShiftTemp,
    });
  }

  // Show Category for departments
  showAddToTemplate = (cat) => {
    this.setState({
      addToTemplateCatName: cat,
      isAddToTemplate: !this.state.isAddToTemplate,
    });

    this.props.getAddToLists(false, cat);
  }

  hideAddToTemplate = () => {
    // Reset the add to list search form
    this.addToForm.reset();

    this.setState({
      searchAddToListQuery: '',
      addToTemplateCatName: '',
      isAddToTemplate: !this.state.isAddToTemplate,
    });
  }

  // Clear our New Shift Template Data
  clearData = () => {
    this.setState({
      editShiftTemp: false,
      createNewTemp: false,
      isCreationSuccess: false,
    });

    this.props.clearShiftTemplateData();
    this.props.retrieveShiftTemplateLists(this.state.templatePageIndex, this.state.searchTemplateQuery, this.state.sortTemplateQuery);
  }

  clearDeleteTemplate = () => {
    this.setState({
      isDeleteSuccess: false,
    });

    this.props.clearDeleteSuccess();
    this.props.retrieveShiftTemplateLists(this.state.templatePageIndex, this.state.searchTemplateQuery, this.state.sortTemplateQuery);
  }

  // Template Deletion
  toggleConfirmTemplateDelete = () => {
    this.setState({
      isDeleteTemplate: !this.state.isDeleteTemplate,
    });
  }

  // Add selected Department/Workgroup/Employee to Selected Template
  addToSelectedTemplate = (id) => {
    this.setState({
      addToTemplateID: id,
    });
  }

  clearAddToTemplate = () => {
    this.setState({
      isAddSuccess: false,
    });

    this.props.clearAddToTemplateData();
    this.props.getAddToLists(false, this.state.addToTemplateCatName);
    this.props.retrieveShiftTemplateLists(this.state.templatePageIndex, this.state.searchTemplateQuery, this.state.sortTemplateQuery);
  }

  toClearUnassign = () => {
    this.setState({
      isUnassignSuccess: false,
      nameToUnassign: '',
      unassignID: '',
    });

    this.props.clearUnassignData();
    this.props.retrieveEnrolledLists(this.state.enrolledCatRequester, this.state.templateID);
  }

  // Search functions
  searchEnrolledList = (val) => {
    this.setState({
      searchEnrolledQuery: (val) || '',
    });
    this.props.searchEnrolledList(val);
  }

  searchTemplateList = (val) => {
    this.setState({
      templateDetailsIndex: 0,
      searchTemplateQuery: (val) || '',
      // sortTemplateQuery: '',
    });
    this.props.searchTemplateList(1, val, this.state.sortTemplateQuery);
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

    // Reset the template search form
    // this.templateSearchForm.reset();

    this.setState({
      templateDetailsIndex: 0,
      // searchTemplateQuery: '',
      sortTemplateQuery: sort,
    });

    this.props.sortTemplateList(1, this.state.searchTemplateQuery, sort);
  }

  // Paginate Template
  templateGotoPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      templatePageIndex: page,
    });
    this.props.templateListGotoPage(page, this.state.searchTemplateQuery, this.state.sortTemplateQuery);
  }

  searchAddToList = (val) => {
    this.setState({
      searchAddToListQuery: (val) || '',
    });
    this.props.searchAddToList(val);
  }

  // Toggle mobile display
  mobileToggleDisplay = (e) => {
    // get our parent container
    const parent = e.currentTarget.parentNode.parentNode;

    // toggle our class
    parent.classList.toggle('toggle');
  }

  render() {
    const {
      templateList,
      templateListLoading,
      templateListError,
      templateListPages,
      enrolledList,
      enrolledListLoading,
      enrolledListError,
      enrolledListPages,
      enrolledListGotoPage,
      enrolledRequester,
      // retrieveEnrolledLists,
      saveShiftTemplateLoading,
      addToListPages,
    } = this.props;

    const templateLists = {
      loading: templateListLoading,
      error: templateListError,
      lists: templateList,
    };

    const enrolledLists = {
      loading: enrolledListLoading,
      error: enrolledListError,
      lists: enrolledList,
      requester: enrolledRequester,
      unassign: this.showConfirmUnassign,
    };

    let templateListMaxPageIndex = 1;
    // Get Max Page Index of the list (defaults to 1)
    if (templateListPages != null) {
      templateListMaxPageIndex = templateListPages.MaxPageIndex;
    }

    // Display details of first selected template in the list
    let templateDetails = <div className="template-details"><Loading /></div>;
    let editTemplateDetails;
    if (templateList) {
      // Show our pre selected shift template
      const index = this.state.templateDetailsIndex;

      editTemplateDetails = templateList[index];
      templateDetails = (
        <div className="template-details">
          <h3>
            {templateList[index].Name}
            <button onClick={this.toggleEditShiftTemplate}><FontAwesomeIcon icon={faPencilAlt} /></button>
            <button onClick={this.toggleConfirmTemplateDelete}><FontAwesomeIcon icon={faMinus} /></button>
          </h3>
          <p>
            Created at: {moment(new Date(templateList[index].CreatedDate)).format('MM-DD-YYYY')} <br />
            Created by: (Not available yet)
          </p>
        </div>
      );
    } else if (templateListError && templateListError.ErrorCode === 204) {
      templateDetails = (
        <div className="template-details">
          <h3>No Record Found.</h3>
        </div>
      );
    }

    // Get Max Page Index on Enrolled List in Shift Template
    let enrolledListMaxPageIndex = 1;
    if (enrolledListPages != null) {
      enrolledListMaxPageIndex = enrolledListPages.MaxPageIndex;
    }

    // Flexi Ref for creating new form
    let flexiRefs;
    if (this.props.flexiRefs) {
      flexiRefs = this.props.flexiRefs.ObjectList[0].FlexiConditions;
    }

    /*
     * Modal content for adding Department/Workgroup/Employee
     * for the selected Template
     */
    let addToListMaxPageIndex = 1;
    if (addToListPages != null) {
      addToListMaxPageIndex = addToListPages.MaxPageIndex;
    }

    return (
      <PageWrap>
        <Helmet>
          <title>Shift Templates</title>
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Flex>
              <Left className="toggle">
                <H2>Template Overview <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>
                <TemplateHeader>
                  <div className="template-icon">
                    <Img src={WorkIcon} alt="Shift Templates Icon"></Img>
                  </div>
                  {templateDetails}
                </TemplateHeader>
                <EnrolledInTemplate>
                  <div className="enrolled-heading">
                    List of Enrolled in Template
                    <OptionMenu title="Category" position="right" icon="plus">
                      <button onClick={() => { this.showAddToTemplate('Workgroup'); }}>Workgroup</button>
                      <button onClick={() => { this.showAddToTemplate('Department'); }}>Department</button>
                      <button onClick={() => { this.showAddToTemplate('Employee'); }}>Employee</button>
                    </OptionMenu>
                  </div>
                  <SearchFilter search onClick={(val) => { this.searchEnrolledList(val); }} formRef={(el) => { this.searchForm = el; }} defaultVal={this.state.searchEnrolledQuery}>
                    <FilterButton className="active" onClick={(e) => { this.enrolledListReq(e, 'Employee', this.state.templateID); }}>Employee</FilterButton>
                    <FilterButton onClick={(e) => { this.enrolledListReq(e, 'Workgroup', this.state.templateID); }}>Workgroup</FilterButton>
                    <FilterButton onClick={(e) => { this.enrolledListReq(e, 'Department', this.state.templateID); }}>Department</FilterButton>
                  </SearchFilter>
                  <EnrolledListings {...enrolledLists} />

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
                        onPageChange={enrolledListGotoPage}
                        activeClassName={'active'}
                      />
                    </Pagination>
                  }
                </EnrolledInTemplate>
              </Left>
              <Right className="toggle">
                <H2>Shift Templates <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>
                <TemplateList>
                  <div className="create-new">
                    <button onClick={this.toggleCreateNewTemplate}><FontAwesomeIcon icon={faPlus} /> Create New Template</button>
                  </div>
                  <SearchFilter search onClick={(val) => { this.searchTemplateList(val); }} formRef={(el) => { this.templateSearchForm = el; }} defaultVal={this.state.searchTemplateQuery}>
                    <span className="filter-label">Sort by:</span>
                    <FilterButton className="active" onClick={(e) => { this.sortTemplateList(e, 'LastModDate'); }}>Date</FilterButton>
                    <FilterButton onClick={(e) => { this.sortTemplateList(e, 'Name'); }}>Name</FilterButton>
                  </SearchFilter>

                  <TemplateListings {...templateLists} getTemplateId={this.showTemplateDetails} templateIndex={this.state.templateDetailsIndex} />

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
        {/* Create New Template Modal */}
        <Modal
          show={this.state.createNewTemp}
          onClose={this.toggleCreateNewTemplate}
          showCloseBtn
          title="Create New Template"
          width="550px"
        >
          <CreateNewTemplate save={(data) => { this.props.saveShiftTemplate(data, true); }} cancel={this.toggleCreateNewTemplate} flexiRefs={flexiRefs} loading={saveShiftTemplateLoading} />
        </Modal>

        {/* Edit Shift Template */}
        <Modal
          show={this.state.editShiftTemp}
          onClose={this.toggleEditShiftTemplate}
          showCloseBtn
          title="Edit Shift Template"
          width="550px"
        >
          <EditShiftTemplate save={(data) => { this.props.saveShiftTemplate(data, false); }} cancel={this.toggleEditShiftTemplate} details={editTemplateDetails} flexiRefs={flexiRefs} />
        </Modal>

        {/* Edit/Created Successfully */}
        <Confirm
          show={this.state.isCreationSuccess}
          title="SUCCESS"
          onClick={this.clearData}
          onClose={this.clearData}
          okBtnText="OK"
        >
          <p>Shift template has been successfully saved.</p>
        </Confirm>

        {/* Confirm Delete Template */}
        <Confirm
          show={this.state.isDeleteTemplate}
          title="DELETE"
          onClick={() => { this.setState({ isDeleteTemplate: false }); this.props.deleteShiftTemplate(); }}
          onClose={this.toggleConfirmTemplateDelete}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
        >
          <p>Are you sure you want to delete this template?</p>
        </Confirm>
        <Confirm
          show={this.state.isDeleteSuccess}
          title="SUCCESS"
          onClick={this.clearDeleteTemplate}
          okBtnText="OK"
        >
          <p>Shift template has been successfully deleted.</p>
        </Confirm>

        {/* Confirm Delete Enrolled in Template */}
        <Confirm
          show={this.state.confirmUnassign}
          title="UNASSIGN"
          onClick={() => { this.setState({ confirmUnassign: false }); this.props.unAssignToTemplate(this.state.unassignID); }}
          onClose={this.hideConfirmUnassign}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
        >
          <p>Are you sure you want to unassign<br /><span className="dept-header">{this.state.nameToUnassign}</span><br />from this Template?</p>
        </Confirm>
        <Confirm
          show={this.state.isUnassignSuccess}
          title="SUCCESS"
          onClick={this.toClearUnassign}
          okBtnText="OK"
        >
          <p>{this.state.nameToUnassign} has been successfully unassigned to this template.</p>
        </Confirm>

        {/* Show Add To Template List */}
        <Modal
          show={this.state.isAddToTemplate}
          onClose={this.hideAddToTemplate}
          showCloseBtn
          title={`${this.state.addToTemplateCatName} List`}
          width="340px"
        >
          <ListBox>
            <SearchFilter search onClick={(val) => { this.searchAddToList(val); }} placeholder={`Search ${this.state.addToTemplateCatName}`} formRef={(el) => { this.addToForm = el; }} defaultVal={this.state.searchAddToListQuery} />

            <h3>
              <b>{this.state.addToTemplateCatName}</b>
              <button className="add-emp" onClick={() => { this.props.addSelectedToTemplate(this.state.addToTemplateID); }}><FontAwesomeIcon icon={faPlus} /></button>
            </h3>

            <AddToList addSelected={(id) => { this.addToSelectedTemplate(id); }} catName={this.state.addToTemplateCatName} />
            {/* <Lists>
              {addToTemplateItems}
            </Lists> */}

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
                  onPageChange={(e) => { this.props.addToListsGotoPage(e, this.state.addToTemplateCatName); }}
                  activeClassName={'active'}
                />
              </Pagination>
            }
          </ListBox>
        </Modal>

        <Confirm
          show={this.state.isAddSuccess}
          title="SUCCESS"
          onClick={this.clearAddToTemplate}
          onClose={this.clearAddToTemplate}
          okBtnText="OK"
        >
          <p>Shift Template successfully assigned to selected {this.state.addToTemplateCatName}.</p>
        </Confirm>
      </PageWrap>
    );
  }
}

ShiftTemplatePage.defaultProps = {
  templateList: false,
  templateListError: false,
  enrolledList: false,
  enrolledListError: false,
  enrolledRequester: false,
  newShiftTemplateSuccess: false,
  deleteTemplateSuccess: false,
  addToList: false,
  addToListError: false,
  addToTemplateLoading: false,
  unassignLoading: false,
};

ShiftTemplatePage.propTypes = {
  location: PropTypes.object,
  stateShiftTemplateID: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  templateListLoading: PropTypes.bool,
  templateListError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  templateList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  templateListPages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  enrolledListLoading: PropTypes.bool,
  enrolledListError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  enrolledList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  enrolledListPages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  enrolledRequester: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  flexiRefs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array,
  ]),
  saveShiftTemplateLoading: PropTypes.bool,
  // saveShiftTemplateError: PropTypes.oneOfType([
  //   PropTypes.bool,
  //   PropTypes.object,
  // ]),
  saveShiftTemplateSuccess: PropTypes.bool,
  deleteTemplateSuccess: PropTypes.bool,
  addToListPages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  // addToTemplateLoading: PropTypes.bool,
  // addToTemplateError: PropTypes.oneOfType([
  //   PropTypes.bool,
  //   PropTypes.object,
  // ]),
  addToTemplateSuccess: PropTypes.bool,
  unassignSuccess: PropTypes.bool,
  // unassignLoading: PropTypes.bool,
  // unassignError: PropTypes.oneOfType([
  //   PropTypes.bool,
  //   PropTypes.object,
  // ]),
  // Function dispatch props
  clearStateData: PropTypes.func,
  retrieveShiftTemplateLists: PropTypes.func,
  searchTemplateList: PropTypes.func,
  sortTemplateList: PropTypes.func,
  templateListGotoPage: PropTypes.func,
  retrieveEnrolledLists: PropTypes.func,
  enrolledListGotoPage: PropTypes.func,
  searchEnrolledList: PropTypes.func,
  retrieveFlexiRefs: PropTypes.func,
  saveShiftTemplate: PropTypes.func,
  clearShiftTemplateData: PropTypes.func,
  deleteShiftTemplate: PropTypes.func,
  clearDeleteSuccess: PropTypes.func,
  getAddToLists: PropTypes.func,
  searchAddToList: PropTypes.func,
  addToListsGotoPage: PropTypes.func,
  addSelectedToTemplate: PropTypes.func,
  clearAddToTemplateData: PropTypes.func,
  unAssignToTemplate: PropTypes.func,
  clearUnassignData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  stateShiftTemplateID: makeSelectShiftTemplateID(),
  flexiRefs: makeSelectFlexiRefs(),
  templateListLoading: makeSelectListsLoading('templateList'),
  templateListError: makeSelectListsError('templateList'),
  templateList: makeSelectData('templateList'),
  templateListPages: makeSelectPageDetails('templateList'),
  enrolledListLoading: makeSelectListsLoading('enrolledList'),
  enrolledListError: makeSelectListsError('enrolledList'),
  enrolledList: makeSelectData('enrolledList'),
  enrolledListPages: makeSelectPageDetails('enrolledList'),
  enrolledRequester: makeSelectRequester(),
  saveShiftTemplateLoading: makeSelectSaveShiftTemplateLoading(),
  saveShiftTemplateError: makeSelectSaveShiftTemplateError(),
  saveShiftTemplateSuccess: makeSelectData('shiftTemplateSaving'),
  deleteTemplateSuccess: makeSelectDeleteTemplateSuccess(),
  addToListLoading: makeSelectListsLoading('addToList'),
  addToListError: makeSelectListsError('addToList'),
  addToList: makeSelectData('addToList'),
  addToListPages: makeSelectPageDetails('addToList'),
  addToTemplateLoading: makeSelectListsLoading('addToTemplate'),
  addToTemplateError: makeSelectListsError('addToTemplate'),
  addToTemplateSuccess: makeSelectData('addToTemplate'),
  unassignLoading: makeSelectListsLoading('unassignTemplate'),
  unassignError: makeSelectListsError('unassignTemplate'),
  unassignSuccess: makeSelectData('unassignTemplate'),
});

function mapDispatchToProps(dispatch) {
  return {
    clearStateData: () => dispatch(clearAllStateData()),
    retrieveShiftTemplateLists: (page, search, sort) => dispatch(getShiftTemplateLists(page, search, sort)),
    searchTemplateList: (page, search, sort) => dispatch(searchTemplateList(page, search, sort)),
    sortTemplateList: (page, search, sort) => dispatch(sortTemplateList(page, search, sort)),
    templateListGotoPage: (page, search, sort) => dispatch(getShiftTemplateLists(page, search, sort)),
    retrieveEnrolledLists: (requester, id) => dispatch(getEnrolledInTemplate(requester, id)),
    enrolledListGotoPage: (evt) => {
      const page = evt.selected + 1;
      dispatch(gotoPageInEnrolledLists(page));
    },
    searchEnrolledList: (query) => dispatch(searchEnrolledLists(query)),
    retrieveFlexiRefs: () => dispatch(getFlexiRefs()),
    saveShiftTemplate: (data, isNew) => dispatch(saveShiftTemplate(data, isNew)),
    clearShiftTemplateData: () => dispatch(clearTemplateData()),
    deleteShiftTemplate: () => dispatch(deleteShiftTemplate()),
    clearDeleteSuccess: () => dispatch(clearDeleteSuccess()),
    getAddToLists: (page, cat) => dispatch(getAddToList(page, cat)),
    searchAddToList: (query) => dispatch(searchAddToTemplateList(query)),
    addToListsGotoPage: (evt, cat) => {
      const page = evt.selected + 1;
      dispatch(getAddToList(page, cat));
    },
    addSelectedToTemplate: (id) => dispatch(addToTemplate(id)),
    clearAddToTemplateData: () => dispatch(clearAddToTemplateData()),
    unAssignToTemplate: (id) => dispatch(unAssignTemplate(id)),
    clearUnassignData: () => dispatch(clearUnassign()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'wfadmin', reducer });
const withSaga = injectSaga({ key: 'wfadmin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ShiftTemplatePage);
