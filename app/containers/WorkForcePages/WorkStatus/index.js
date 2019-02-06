/*
 * Work Status
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactPaginate from 'react-paginate';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faMinus, faCaretDown } from '@fortawesome/fontawesome-free-solid';

/* Global injectSaga and injectReducer */
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

/* Global Components */
import Loading from 'components/LoadingIndicator/Loading';
import LoadingIndicator from 'components/LoadingIndicator';
import PageWrap from 'components/PageWrap';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';
import Sidebar from 'components/Sidebar';
import PageContent from 'components/Main/PageContent';
import Confirm from 'components/ConfirmationDialog';
import Avatar from 'components/Img/Avatar';
import Img from 'components/Header/Img';
import WorkIcon from 'components/ImageFiles/workstatus.png';
import Modal from 'components/Modal';
import Pagination from 'components/Pagination';
import ListBox from 'components/Modal/Listings';
import Lists from 'components/Employee/SmallEMPList';

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

/* SearchFilter Components */
import SearchFilter from 'components/SearchFilter';
import FilterButton from 'components/SearchFilter/Button';

import { WF_WORKSTATSTATUSACTIVE, WF_WORKSTATSTATUSINACTIVE } from 'containers/App/constants';

/* Local Components */
import TemplateListings from './TemplateLists';
import EnrolledListings from './EnrolledLists';
import CreateNewTemplate from './CreateNewTemplate';
import EditTemplate from './EditWorkStatTemplate';
import AddWorkNameType from './AddWorkNameType';

/* selectors, reducer, saga and actions */
import reducer from './reducer';
import saga from './saga';

import {
  makeSelectWorkStatusTemplateID,
  makeSelectData,
  makeSelectListsLoading,
  makeSelectListsError,
  makeSelectPageDetails,
  makeSelectRequester,
  makeSelectDeleteTemplateSuccess,
} from './selectors';

import {
  clearAllStateData,
  getWorkStatusTemplateList,
  searchWorkStatusTemplateList,
  sortWorkStatusTemplateList,
  getEnrolledInTemplate,
  gotoPageInEnrolledLists,
  searchEnrolledLists,
  getAddToList,
  searchAddToTemplateList,
  addToTemplate,
  clearAddToTemplateData,
  deleteTemplate,
  clearDeleteSuccess,
  saveWorkStatTemplate,
  clearSaveTemplateData,
  unAssignTemplate,
  clearUnassign,
} from './actions';

export class WorkStatusPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      templateID: '',
      templateDetailsIndex: 0,
      searchTemplateQuery: '',
      sortTemplateQuery: '',
      enrolledCatRequester: 'Employee',
      searchEnrolledQuery: '',
      isAddToTemplate: false,
      addToTemplateCatName: '',
      addToTemplateID: '',
      searchAddToListQuery: '',
      isAddSuccess: false,
      isDeleteTemplate: false,
      formRefs: {},
      workNameTypeIndex: false,
      workNameTypeFields: [],
      createNewTemp: false,
      isAddWorkNameType: false,
      editTemplate: false,
      isAddWorkNameTypeEdit: false,
      isSavingTemplateSuccess: false,
      confirmUnassign: false,
      nameToUnassign: '',
      unassignID: '',
      isUnassignSuccess: false,
      statusTypeList: [{
        Name: 'Active',
        SystemStatusTypeID: WF_WORKSTATSTATUSACTIVE.toLowerCase(),
      },
      {
        Name: 'InActive',
        SystemStatusTypeID: WF_WORKSTATSTATUSINACTIVE.toLowerCase(),
      }],
    };
  }

  componentDidMount() {
    // Retrieve Initial Data
    this.props.retrieveTemplateList(false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.workStatusTemplateID !== false) {
      this.setState({
        templateID: nextProps.workStatusTemplateID,
      });
    }

    if (nextProps.addToTemplateSuccess === true) {
      this.setState({
        isAddSuccess: !this.state.isAddSuccess,
      });
    }

    if (nextProps.deleteTemplateSuccess === true) {
      this.setState({
        isDeleteSuccess: !this.state.isDeleteSuccess,
      });
    }

    if (nextProps.saveTemplateSuccess === true) {
      this.setState({
        isSavingTemplateSuccess: !this.state.isSavingTemplateSuccess,
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

  toggleCreateTemplate = (e) => {
    e.preventDefault();

    this.setState({
      createNewTemp: !this.state.createNewTemp,
      workNameTypeIndex: false,
      workNameTypeFields: [],
    });
  }

  // Show/Hide modal for adding work name and type on Create Template
  showAddWorkNameType = (e) => {
    e.preventDefault();
    this.setState({
      isAddWorkNameType: !this.state.isAddWorkNameType,
      formRefs: this.props.formLoads,
    });
  }
  hideAddWorkNameType = (e) => {
    e.preventDefault();
    this.setState({
      isAddWorkNameType: false,
      formRefs: {},
    });
  }

  // Toggle mobile display
  mobileToggleDisplay = (e) => {
    // get our parent container
    const parent = e.currentTarget.parentNode.parentNode;

    // toggle our class
    parent.classList.toggle('toggle');
  }

  addWorkNameType = (e, nI, tI, sI) => {
    e.preventDefault();
    const workNames = this.props.formLoads.WorkStatusList;
    const workTypes = this.props.formLoads.WorkStatusTypeList;
    const statusTypes = this.state.statusTypeList;
    // const workTypes = this.props.formLoads.WorkStatusTypeList;

    // TO DO: change the WorkStatusTypeID to field SystemStatusTypeID when API is ready
    //        remove the static content for SystemStatusTypeID
    const ids = {
      WorkStatusID: workNames[nI].WorkStatusID,
      SystemStatusTypeID: statusTypes[tI].SystemStatusTypeID,
      WorkStatusTypeID: workTypes[sI].WorkStatusTypeID,
      // SystemStatusTypeID: 'E1B5380A-AA16-416C-8DBE-7435BDEB893C',
    };
    this.setState((prevState) => ({
      isAddWorkNameType: false,
      formRefs: {},
      workNameTypeIndex: [...prevState.workNameTypeIndex, ids],
    }));

    const that = this;
    setTimeout(() => {
      that.renderWorkNameTypeFields();
    }, 100);
  }

  removeWorkNameType = (e, id) => {
    e.preventDefault();
    const ids = this.state.workNameTypeIndex;

    const index = ids.findIndex((item) => item.WorkStatusID === id);
    ids.splice(index, 1);

    if (ids.length === 0) {
      this.setState({
        workNameTypeIndex: false,
      });
    } else {
      this.setState({
        workNameTypeIndex: ids,
      });
    }

    const that = this;
    setTimeout(() => {
      that.renderWorkNameTypeFields();
    }, 100);
  }

  // Editing Template
  showEditTemplate = (e) => {
    e.preventDefault();
    const i = this.state.templateDetailsIndex;
    const list = this.props.templateList[i].WorkStatusTemplateDetailsList;

    const ids = [];
    for (let o = 0; o < list.length; o += 1) {
      ids.push({
        WorkStatusID: list[o].WorkStatusID,
        SystemStatusTypeID: list[o].SystemStatusType.SystemStatusTypeID,
        WorkStatusTypeID: list[o].WorkStatusTypeID,
        // SystemStatusTypeID: 'E1B5380A-AA16-416C-8DBE-7435BDEB893C',
      });
    }

    // NOTE: if the for loop above is slow,
    // try to use he list.concat() to assign in the workNameTypeIndex state
    this.setState({
      editTemplate: !this.state.editTemplate,
      workNameTypeIndex: ids,
    });

    const that = this;
    setTimeout(() => {
      that.renderWorkNameTypeFields();
    }, 100);
  }

  hideEditTemplate = (e) => {
    e.preventDefault();
    this.setState({
      editTemplate: false,
      workNameTypeIndex: false,
      workNameTypeFields: [],
    });
  }

  // Show/Hide modal for adding work name and type on Editing Template
  showAddWorkNameTypeEdit = (e) => {
    e.preventDefault();
    this.setState({
      isAddWorkNameTypeEdit: !this.state.isAddWorkNameTypeEdit,
      formRefs: this.props.formLoads,
    });
  }
  hideAddWorkNameTypeEdit = (e) => {
    e.preventDefault();
    this.setState({
      isAddWorkNameTypeEdit: false,
      formRefs: {},
    });
  }

  // Clear Create/Edit Template Data
  clearSavingData = (e) => {
    e.preventDefault();
    this.setState({
      createNewTemp: false,
      editTemplate: false,
      isSavingTemplateSuccess: false,
      workNameTypeIndex: false,
      workNameTypeFields: [],
    });

    this.props.clearSavingTemplateData();
    this.props.retrieveTemplateList();
  }

  // Get details of selected template
  showTemplateDetails = (id) => {
    // Reset the enrolled search form
    this.searchForm.reset();

    const list = this.props.templateList;

    if (id) {
      const index = list.findIndex((item) => item.WorkStatusTemplateID === id);
      this.setState({
        templateID: id,
        templateDetailsIndex: index,
      });

      this.props.retrieveEnrolledLists(this.state.enrolledCatRequester, id);
    }
  }

  // Search function for template list
  searchTemplateList = (val) => {
    this.setState({
      templateDetailsIndex: 0,
      searchTemplateQuery: (val) || '',
      sortTemplateQuery: '',
    });
    this.props.searchTemplateList(val);
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
    this.templateSearchForm.reset();

    this.setState({
      templateDetailsIndex: 0,
      searchTemplateQuery: '',
      sortTemplateQuery: sort,
    });

    this.props.sortTemplateList(sort);
  }

  // Search Enrolled list
  searchEnrolledList = (val) => {
    this.setState({
      searchEnrolledQuery: (val) || '',
    });
    this.props.searchEnrolledList(val);
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

  // Show Add To List for departments/workgroup/employee
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

  searchAddToList = (val) => {
    this.setState({
      searchAddToListQuery: (val) || '',
    });
    this.props.searchAddToList(val);
  }

  // Add selected Department/Workgroup/Employee to Selected Template
  addToSelectedTemplate = (e, id) => {
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
      addToTemplateID: id,
    });
  }

  clearAddToTemplate = () => {
    this.setState({
      isAddSuccess: false,
    });

    this.props.clearAddToTemplateData();
    this.props.getAddToLists(false, this.state.addToTemplateCatName);
    this.props.retrieveTemplateList();
  }

  // Template Deletion
  toggleConfirmTemplateDelete = () => {
    this.setState({
      isDeleteTemplate: !this.state.isDeleteTemplate,
    });
  }
  clearDeleteTemplate = () => {
    this.setState({
      isDeleteSuccess: false,
    });

    this.props.clearDeleteSuccess();
    this.props.retrieveTemplateList();
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
  toClearUnassign = () => {
    this.setState({
      isUnassignSuccess: false,
      nameToUnassign: '',
      unassignID: '',
    });

    this.props.clearUnassignData();
    this.props.retrieveEnrolledLists(this.state.enrolledCatRequester, this.state.templateID);
  }

  // This will render the selected work name type for the Create New Template component
  renderWorkNameTypeFields = () => {
    // Reset the select work name and type fields
    this.setState({
      workNameTypeFields: [],
    });

    const { formLoads } = this.props;
    const { workNameTypeIndex } = this.state;

    const workNames = formLoads.WorkStatusList;
    const statusTypes = this.state.statusTypeList;
    const workTypes = formLoads.WorkStatusTypeList;

    for (let i = 0; i < workNameTypeIndex.length; i += 1) {
      let id; let name; let type; let status;

      for (let o = 0; o < workNames.length; o += 1) {
        if (workNameTypeIndex[i].WorkStatusID === workNames[o].WorkStatusID) {
          name = workNames[o].Name;
          id = workNames[o].WorkStatusID;
        }
      }

      for (let u = 0; u < statusTypes.length; u += 1) {
        // TO DO: change the WorkStatusTypeID to SystemStatusTypeID for the workNameTypeIndex
        if (workNameTypeIndex[i].SystemStatusTypeID === statusTypes[u].SystemStatusTypeID) {
          type = statusTypes[u].Name;
        }
      }

      for (let s = 0; s < workTypes.length; s += 1) {
        if (workNameTypeIndex[i].WorkStatusTypeID === workTypes[s].WorkStatusTypeID) {
          status = workTypes[s].Name;
        }
      }

      // Set the content for the work name type fields state
      const el = {
        id,
        name,
        type,
        status,
      };
      this.setState((prevState) => ({
        workNameTypeFields: [...prevState.workNameTypeFields, el],
      }));
    }
  }

  render() {
    const {
      workNameTypeIndex,
    } = this.state;

    const {
      templateList,
      templateListError,
      templateListLoading,
      templateListPages,
      templateListGotoPage,
      enrolledListLoading,
      enrolledListError,
      enrolledList,
      enrolledListPages,
      enrolledRequester,
      enrolledListGotoPage,
      addToListLoading,
      addToListError,
      addToList,
      addToListPages,
    } = this.props;

    const templateLists = {
      loading: templateListLoading,
      error: templateListError,
      lists: templateList,
    };

    // Get Max Page Index of the list (defaults to 1)
    let templateListMaxPageIndex = 1;
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
            <button onClick={this.showEditTemplate}><FontAwesomeIcon icon={faPencilAlt} /></button>
            <button onClick={this.toggleConfirmTemplateDelete}><FontAwesomeIcon icon={faMinus} /></button>
          </h3>
          <p>{templateList[index].Descr}</p>
        </div>
      );
    } else if (templateListError && templateListError.ErrorCode === 204) {
      templateDetails = (
        <div className="template-details">
          <h3>No Record Found.</h3>
        </div>
      );
    }

    /** Enrolled Lists */
    const enrolledLists = {
      loading: enrolledListLoading,
      error: enrolledListError,
      lists: enrolledList,
      requester: enrolledRequester,
      unassign: this.showConfirmUnassign,
    };

    // Get Max Page Index on Enrolled List in Shift Template
    let enrolledListMaxPageIndex = 1;
    if (enrolledListPages != null) {
      enrolledListMaxPageIndex = enrolledListPages.MaxPageIndex;
    }

    /*
     * Modal content for adding Department/Workgroup/Employee
     * for the selected Template
     */
    let addToListMaxPageIndex = 1;
    if (addToListPages != null) {
      addToListMaxPageIndex = addToListPages.MaxPageIndex;
    }
    let addToTemplateItems;
    const requestCat = this.state.addToTemplateCatName;
    if (addToListLoading) addToTemplateItems = <Loading />;
    if (addToListError) addToTemplateItems = <dl className="message">No Record(s) Found.</dl>;
    if (addToList) {
      if (requestCat === 'Department') {
        addToTemplateItems = addToList.map((item) => (
          <dl role="presentation" key={item.DeptID} onClick={(e) => { this.addToSelectedTemplate(e, item.DeptID); }}>
            <dd>
              <h4>{item.Name}</h4>
            </dd>
          </dl>
        ));
      }

      if (requestCat === 'Workgroup') {
        addToTemplateItems = addToList.map((item) => (
          <dl role="presentation" key={item.TeamID} onClick={(e) => { this.addToSelectedTemplate(e, item.TeamID); }}>
            <dd>
              <h4>{item.Name}</h4>
            </dd>
          </dl>
        ));
      }

      if (requestCat === 'Employee') {
        addToTemplateItems = addToList.map((item) => (
          <dl role="presentation" key={item.EmpProfileID} onClick={(e) => { this.addToSelectedTemplate(e, item.EmpProfileID); }}>
            <dt>
              { (item.EmpAvatarAttachs != null)
                ? <Avatar bgImage={`url('${item.EmpAvatarAttachs.Path}')`} />
                : <Avatar />
              }
            </dt>
            <dd>
              <p>
                {item.LastName}, {item.FirstName}
                <span>{item.Email}</span>
              </p>
            </dd>
          </dl>
        ));
      }
    }

    return (
      <PageWrap>
        <Helmet>
          <title>Work Status</title>
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
                    <Img src={WorkIcon} alt="Work Status Icon"></Img>
                  </div>
                  {templateDetails}
                </TemplateHeader>
                <EnrolledInTemplate>
                  <div className="enrolled-heading">
                    List of Enrolled Users
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

                  {/* List of enrolled in template */}
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
                  {/* <div className="enrolled-list">
                    <div className="enrolled-items">
                      <p>Department Name 1</p>
                      <button onClick={this.showDelete} className="fa fa-minus" />
                    </div>
                    <div className="enrolled-items">
                      <p>Department Name 1</p>
                      <button onClick={this.showDelete} className="fa fa-minus" />
                    </div>
                    <div className="enrolled-items">
                      <p>Department Name 1</p>
                      <button onClick={this.showDelete} className="fa fa-minus" />
                    </div>
                    <div className="enrolled-items">
                      <p>Department Name 1</p>
                      <button onClick={this.showDelete} className="fa fa-minus" />
                    </div>
                  </div> */}
                </EnrolledInTemplate>
              </Left>
              <Right className="toggle">
                <H2>Work Status Templates <button onClick={this.mobileToggleDisplay}><FontAwesomeIcon icon={faCaretDown} /></button></H2>
                <TemplateList>
                  <div className="create-new">
                    <button onClick={this.toggleCreateTemplate}><FontAwesomeIcon icon={faPlus} /> Create New Template</button>
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
                        onPageChange={templateListGotoPage}
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

        {/* Create new template */}
        <Modal
          show={this.state.createNewTemp}
          onClose={this.toggleCreateTemplate}
          showCloseBtn
          title="Create New Template"
          width="550px"
        >
          <CreateNewTemplate save={(data) => { this.props.saveTemplate(data, true); }} cancel={this.toggleCreateTemplate} loading={this.props.saveTemplateLoading} toggleFormRefs={this.showAddWorkNameType} ids={workNameTypeIndex} formRefs={this.state.workNameTypeFields} remove={this.removeWorkNameType} />
        </Modal>
        {/* Edit Template */}
        <Modal
          show={this.state.editTemplate}
          onClose={this.hideEditTemplate}
          showCloseBtn
          title="Edit Template"
          width="550px"
        >
          <EditTemplate save={(data) => { this.props.saveTemplate(data, false); }} cancel={this.hideEditTemplate} loading={this.props.saveTemplateLoading} details={editTemplateDetails} toggleFormRefs={this.showAddWorkNameType} ids={workNameTypeIndex} formRefs={this.state.workNameTypeFields} remove={this.removeWorkNameType} />
        </Modal>
        {/* Modal for adding a Work Name and Type on Create/Edit Template */}
        <Modal
          show={this.state.isAddWorkNameType}
          onClose={this.hideAddWorkNameType}
          showCloseBtn
          title="Work Name and Type"
          width="340px"
        >
          {/* <AddWorkNameType ids={workNameTypeIndex} add={this.addWorkNameType} cancel={this.hideAddWorkNameType} formRefs={this.state.formRefs} /> */}
          <AddWorkNameType ids={workNameTypeIndex} add={this.addWorkNameType} cancel={this.hideAddWorkNameType} />
        </Modal>

        {/* Edit/Created Successfully */}
        <Confirm
          show={this.state.isSavingTemplateSuccess}
          title="SUCCESS"
          onClick={this.clearSavingData}
          onClose={this.clearSavingData}
          okBtnText="OK"
        >
          <p>Work Status template has been successfully saved.</p>
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
            {(this.props.addToTemplateLoading) && <div className="loading-cont"><LoadingIndicator /></div>}
            <SearchFilter search onClick={(val) => { this.searchAddToList(val); }} placeholder={`Search ${this.state.addToTemplateCatName}`} formRef={(el) => { this.addToForm = el; }} defaultVal={this.state.searchAddToListQuery} />

            <h3>
              {this.state.addToTemplateCatName}
              <button className="add-emp" onClick={() => { this.props.addSelectedToTemplate(this.state.addToTemplateID); }}><FontAwesomeIcon icon={faPlus} /></button>
            </h3>

            <Lists>
              {addToTemplateItems}
            </Lists>

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
          <p>Work Status Template successfully assigned to selected {this.state.addToTemplateCatName}.</p>
        </Confirm>

        {/* Confirm Delete Template */}
        <Confirm
          show={this.state.isDeleteTemplate}
          title="DELETE"
          onClick={() => { this.setState({ isDeleteTemplate: false }); this.props.deleteSelectedTemplate(); }}
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
          <p>Selected template has been successfully deleted.</p>
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
      </PageWrap>
    );
  }
}

WorkStatusPage.defaultProps = {
  templateListError: false,
  templateList: false,
};

WorkStatusPage.propTypes = {
  location: PropTypes.object,
  workStatusTemplateID: PropTypes.string,
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
  addToListLoading: PropTypes.bool,
  addToListError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  addToList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  addToListPages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  addToTemplateLoading: PropTypes.bool,
  // addToTemplateError: PropTypes.oneOfType([
  //   PropTypes.bool,
  //   PropTypes.object,
  // ]),
  addToTemplateSuccess: PropTypes.bool,
  deleteTemplateSuccess: PropTypes.bool,
  formLoads: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  saveTemplateLoading: PropTypes.bool,
  saveTemplateSuccess: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  unassignSuccess: PropTypes.bool,
  // unassignLoading: PropTypes.bool,
  // unassignError: PropTypes.oneOfType([
  //   PropTypes.bool,
  //   PropTypes.object,
  // ]),

  // Functions props (dispatchs)
  clearStateData: PropTypes.func,
  retrieveTemplateList: PropTypes.func,
  searchTemplateList: PropTypes.func,
  sortTemplateList: PropTypes.func,
  templateListGotoPage: PropTypes.func,
  retrieveEnrolledLists: PropTypes.func,
  enrolledListGotoPage: PropTypes.func,
  searchEnrolledList: PropTypes.func,
  getAddToLists: PropTypes.func,
  searchAddToList: PropTypes.func,
  addToListsGotoPage: PropTypes.func,
  addSelectedToTemplate: PropTypes.func,
  clearAddToTemplateData: PropTypes.func,
  deleteSelectedTemplate: PropTypes.func,
  clearDeleteSuccess: PropTypes.func,
  saveTemplate: PropTypes.func,
  clearSavingTemplateData: PropTypes.func,
  unAssignToTemplate: PropTypes.func,
  clearUnassignData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  workStatusTemplateID: makeSelectWorkStatusTemplateID(),
  templateListLoading: makeSelectListsLoading('templateList'),
  templateListError: makeSelectListsError('templateList'),
  templateList: makeSelectData('templateList'),
  templateListPages: makeSelectPageDetails('templateList'),
  enrolledListLoading: makeSelectListsLoading('enrolledList'),
  enrolledListError: makeSelectListsError('enrolledList'),
  enrolledList: makeSelectData('enrolledList'),
  enrolledListPages: makeSelectPageDetails('enrolledList'),
  enrolledRequester: makeSelectRequester(),
  addToListLoading: makeSelectListsLoading('addToList'),
  addToListError: makeSelectListsError('addToList'),
  addToList: makeSelectData('addToList'),
  addToListPages: makeSelectPageDetails('addToList'),
  addToTemplateLoading: makeSelectListsLoading('addToTemplate'),
  addToTemplateError: makeSelectListsError('addToTemplate'),
  addToTemplateSuccess: makeSelectData('addToTemplate'),
  deleteTemplateSuccess: makeSelectDeleteTemplateSuccess(),
  formLoads: makeSelectData('formLoads'),
  saveTemplateLoading: makeSelectListsLoading('templateSaving'),
  saveTemplateSuccess: makeSelectData('templateSaving'),
  unassignLoading: makeSelectListsLoading('unassignTemplate'),
  unassignError: makeSelectListsError('unassignTemplate'),
  unassignSuccess: makeSelectData('unassignTemplate'),
});

function mapDispatchToProps(dispatch) {
  return {
    clearStateData: () => dispatch(clearAllStateData()),
    retrieveTemplateList: (page) => dispatch(getWorkStatusTemplateList(page)),
    searchTemplateList: (query) => dispatch(searchWorkStatusTemplateList(query)),
    sortTemplateList: (sort) => dispatch(sortWorkStatusTemplateList(sort)),
    templateListGotoPage: (evt) => {
      const page = evt.selected + 1;
      dispatch(getWorkStatusTemplateList(page));
    },
    retrieveEnrolledLists: (requester, id) => dispatch(getEnrolledInTemplate(requester, id)),
    enrolledListGotoPage: (evt) => {
      const page = evt.selected + 1;
      dispatch(gotoPageInEnrolledLists(page));
    },
    searchEnrolledList: (query) => dispatch(searchEnrolledLists(query)),
    getAddToLists: (page, cat) => dispatch(getAddToList(page, cat)),
    searchAddToList: (query) => dispatch(searchAddToTemplateList(query)),
    addToListsGotoPage: (evt, cat) => {
      const page = evt.selected + 1;
      dispatch(getAddToList(page, cat));
    },
    addSelectedToTemplate: (id) => dispatch(addToTemplate(id)),
    clearAddToTemplateData: () => dispatch(clearAddToTemplateData()),
    deleteSelectedTemplate: () => dispatch(deleteTemplate()),
    clearDeleteSuccess: () => dispatch(clearDeleteSuccess()),
    saveTemplate: (data, isNew) => dispatch(saveWorkStatTemplate(data, isNew)),
    clearSavingTemplateData: () => dispatch(clearSaveTemplateData()),
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
)(WorkStatusPage);
