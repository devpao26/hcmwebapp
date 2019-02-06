/**
 * Compensation and Benefit Template
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
import Img from 'components/Header/Img';
import Pagination from 'components/Pagination';
import WorkIcon from 'components/ImageFiles/shift.png';
import Modal from 'components/Modal';
import ListBox from 'components/Modal/Listings';
import Confirm from 'components/ConfirmationDialog';

/* OptionMenu Components */
import OptionMenu from 'components/OptionMenu';

/* Section Component */
import H2 from 'components/Section/H2';
import Flex from 'components/SectionFlex';

/* Template Page Component */
import Left from 'components/Templates/Left';
import Right from 'components/Templates/Right';
import TemplateHeader from 'components/Templates/Header';
import EnrolledInTemplate from 'components/Templates/EnrolledInTemplate';
import TemplateList from 'components/Templates/TemplateList';

/* SearchFilter Components */
import SearchFilter from 'components/SearchFilter';
import FilterButton from 'components/SearchFilter/Button';

/* Local Components */
import TemplateListings from './TemplateLists';
import EnrolledListings from './EnrolledLists';
import EmpList from './EmpList';
import CreateNewTemplate from './CreateNewTemplate';
import EditTemplate from './EditTemplate';

/* selectors, reducer, saga and actions */
import reducer from './reducer';
import saga from './saga';

import {
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPages,
  makeSelectTemplateID,
} from './selectors';

import {
  getBenefitTypes,
  getTemplateList,
  getEnrolledEmp,
  getEnrolledEmpReset,
  getEmployeeList,
  clearEmployeeList,
  assignEmpToTemplate,
  clearAssignEmpToTemplate,
  unAssignToTemplate,
  clearUnassignData,
  createNewTemplate,
  deleteTemplate,
} from './actions';

class CompenBenTemplatePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      templateID: '',
      templateDetailsIndex: 0,
      selectedTemplate: {},
      searchTemplateQuery: false,
      sortTemplateQuery: false,
      searchEnrolledQuery: false,
      searchEmpList: false,
      empListPageIndex: 1,
      isAddToTemplate: false,
      empIdToAdd: '',
      isAddSuccess: false,
      isUnassignSuccess: false,
      confirmUnassign: false,
      nameToUnassign: '',
      unassignID: '',
      isCreateNewTemp: false,
      isEditTemplate: false,
      isSavingTemplateSuccess: false,
      isDeleteTemplate: false,
      isDeleteSuccess: false,
    };
  }

  componentDidMount() {
    // Initial data retrieval
    this.props.retrieveBenefitTypes();
    this.props.retrieveTemplateList(1, false, false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.templateList) {
      this.setState({
        selectedTemplate: nextProps.templateList[0],
      });
    }

    if (nextProps.templateID !== false) {
      this.setState({
        templateID: nextProps.templateID,
      });
    }

    if (nextProps.addToTemplateSuccess === true) {
      this.setState({
        isAddSuccess: true,
      });
    }

    if (nextProps.unassignSuccess === true) {
      this.setState({
        isUnassignSuccess: true,
      });
    }

    if (nextProps.deleteSuccess === true) {
      this.setState({
        isDeleteSuccess: true,
      });
    }
  }

  // Get details of selected template
  showTemplateDetails = (id) => {
    // Reset the enrolled search form
    this.searchEnrolledForm.reset();

    const list = this.props.templateList;

    if (id) {
      const index = list.findIndex((item) => item.CompBenTemplateID === id);

      this.setState({
        templateID: id,
        templateDetailsIndex: index,
      });

      this.props.retrieveEnrolledEmpWithPagesReset(id, 1, false);
    }
  }

  // Search function for template list
  searchTemplateList = (val) => {
    this.setState({
      searchTemplateQuery: val,
    });

    this.searchEnrolledForm.reset();

    // Retrieve Template List
    this.props.retrieveTemplateList(1, val, this.state.sortTemplateQuery);
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
      sortTemplateQuery: sort,
    });

    // Retrieve Template List
    this.props.retrieveTemplateList(1, this.state.searchTemplateQuery, sort);
  }

  gotoTemplatePage = (evt) => {
    const page = evt.selected + 1;
    this.props.retrieveTemplateList(page, this.state.searchTemplateQuery, this.state.sortTemplateQuery);
  }

  // Enrolled Employee List
  searchEnrolledList = (val) => {
    this.setState({
      searchEnrolledQuery: val,
    });

    // Retrieve Enrolled Employees
    this.props.retrieveEnrolledEmpWithPagesReset(this.state.templateID, 1, val);
  }

  gotoEnrolledListPage = (evt) => {
    const page = evt.selected + 1;

    // Retrieve Enrolled Employees
    this.props.retrieveEnrolledEmp(this.state.templateID, page, this.state.searchEnrolledQuery);
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
    this.props.retrieveEnrolledEmpWithPagesReset(this.state.templateID, 1, this.state.searchEnrolledQuery);
  }

  // Show Add To List for departments/workgroup/employee
  showAddEmployeeList = () => {
    this.setState({
      isAddToTemplate: !this.state.isAddToTemplate,
    });

    // Retrieve employee list
    this.props.retrieveEmpList(this.state.templateID, 1, false);
  }

  hideAddEmployeeList = () => {
    // Reset the add to list search form
    this.empListForm.reset();

    this.setState({
      searchAddToListQuery: '',
      isAddToTemplate: !this.state.isAddToTemplate,
    });

    this.props.clearEmpList();
  }

  // Store ID of Selected Employee to be added to template
  selectEmpID = (id) => {
    this.setState({
      empIdToAdd: id,
    });
  }

  gotoEmpListPage = (evt) => {
    const page = evt.selected + 1;
    this.setState({
      empListPageIndex: page,
    });

    // Retrieve employee list together with the page and search value (if defined)
    this.props.retrieveEmpList(this.state.templateID, page, this.state.searchEmpList);
  }

  searchEmpList = (val) => {
    this.setState({
      searchEmpList: val,
    });

    // Retrieve employee list together with the page and search value (if defined)
    this.props.retrieveEmpList(this.state.templateID, 1, val);
  }

  // Hide Add To Template Confirm Success
  hideAddToSuccess = () => {
    this.setState({
      isAddSuccess: false,
    });

    this.props.clearAddTo();
    // Check if we are in the last page and our record only shows 1
    const maxPageIndex = this.props.empListPages.MaxPageIndex;
    const pageIndex = this.props.empListPages.PageIndex;
    const pageRecords = this.props.empListPages.PageRecords;
    let page = this.state.empListPageIndex;
    if ((maxPageIndex === pageIndex) && pageRecords === 1) page = this.state.empListPageIndex - 1;

    // Retrieve Employee List
    this.props.retrieveEmpList(this.state.templateID, page, this.state.searchEmpList);
    this.props.retrieveEnrolledEmp(this.state.templateID, false, false);
  }

  // New Template Creation
  toggleCreateNewTemplate = (e) => {
    e.preventDefault();
    this.setState({
      isCreateNewTemp: !this.state.isCreateNewTemp,
    });
  }

  saveCreateTemplate = (data, isNew) => {
    this.props.createNewTemplate(data, isNew);
  }

  clearSavingData = () => {
    this.setState({
      isCreateNewTemp: false,
      isEditTemplate: false,
      templateDetailsIndex: 0,
    });

    // Retrieve Template List
    this.props.retrieveTemplateList(1, false, false);
    this.searchEnrolledForm.reset();
    this.templateSearchForm.reset();
  }

  toggleConfirmTemplateDelete = () => {
    this.setState({
      isDeleteTemplate: !this.state.isDeleteTemplate,
    });
  }

  hideDeleteSuccess = () => {
    this.setState({
      isDeleteSuccess: false,
    });

    // Retrieve Template List
    this.props.retrieveTemplateList(1, false, false);
    this.searchEnrolledForm.reset();
    this.templateSearchForm.reset();
  }

  // Edit Template
  toggleEditTemplate = (e) => {
    e.preventDefault();
    this.setState({
      isEditTemplate: !this.state.isEditTemplate,
    });
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
      benefitTypes,
      templateListLoading, templateListError, templateList, templateListPages,
      enrolledEmpLoading, enrolledEmpError, enrolledEmp, enrolledEmpPages,
      empListLoading, empListError, empList, empListPages,
      editNewTemplateLoading, editNewTemplateError, editNewTemplateSuccess,
    } = this.props;

    const empListProps = {
      loading: empListLoading,
      error: empListError,
      lists: empList,
      select: this.selectEmpID,
    };

    let empListMaxPageIndex = 1;
    if (empListPages) empListMaxPageIndex = empListPages.MaxPageIndex;

    const enrolledEmpProps = {
      loading: enrolledEmpLoading,
      error: enrolledEmpError,
      lists: enrolledEmp,
      unassign: this.showConfirmUnassign,
    };

    let enrolledEmpMaxPageIndex = 1;
    if (enrolledEmpPages) enrolledEmpMaxPageIndex = enrolledEmpPages.MaxPageIndex;

    const templateLists = {
      loading: templateListLoading,
      error: templateListError,
      lists: templateList,
    };

    let templateListMaxPageIndex = 1;
    if (templateListPages) templateListMaxPageIndex = templateListPages.MaxPageIndex;

    // Display details of first selected template in the list
    let templateDetails = <div className="template-details"><Loading /></div>;
    let tmpIndex = 0;
    let editDetails = {};
    // let editTemplateDetails;
    if (templateList) {
      // Show our pre selected shift template
      tmpIndex = this.state.templateDetailsIndex;
      editDetails = templateList[tmpIndex];

      // editTemplateDetails = templateList[tmpIndex];
      templateDetails = (
        <div className="template-details">
          <h3>
            {templateList[tmpIndex].Name}
            <button onClick={this.toggleEditTemplate}><FontAwesomeIcon icon={faPencilAlt} /></button>
            <button onClick={this.toggleConfirmTemplateDelete}><FontAwesomeIcon icon={faMinus} /></button>
          </h3>
          {/* <p>{templateList[index].Descr}</p> */}
          <p>
            Created at: {moment(new Date(templateList[tmpIndex].CreatedDate)).format('MM-DD-YYYY')} <br />
            Created by: (Not yet available)
          </p>
        </div>
      );
    } else {
      templateDetails = <div className="template-details"><h3>No selected template.</h3></div>;
    }

    const createNewTemplateProps = {
      save: this.saveCreateTemplate,
      cancel: this.toggleCreateNewTemplate,
      loading: editNewTemplateLoading,
      benefitTypes,
    };

    const editTemplateProps = {
      save: this.saveCreateTemplate,
      cancel: this.toggleEditTemplate,
      loading: editNewTemplateLoading,
      benefitTypes,
      details: editDetails,
    };

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
                <H2>Template Overview <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>
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
                      <button onClick={this.showAddEmployeeList}>Employee</button>
                    </OptionMenu>
                  </div>

                  <SearchFilter search onClick={(val) => { this.searchEnrolledList(val); }} formRef={(el) => { this.searchEnrolledForm = el; }} />

                  <EnrolledListings {...enrolledEmpProps} />

                  { (enrolledEmpPages && enrolledEmpMaxPageIndex !== 1) &&
                    <Pagination>
                      <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={<span>...</span>}
                        breakClassName={'break-me'}
                        pageCount={enrolledEmpMaxPageIndex}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={4}
                        onPageChange={this.gotoEnrolledListPage}
                        activeClassName={'active'}
                      />
                    </Pagination>
                  }
                </EnrolledInTemplate>
              </Left>
              <Right>
                <H2>Compensation and Benefits Templates <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>
                <TemplateList>
                  <div className="create-new">
                    <button onClick={this.toggleCreateNewTemplate}><FontAwesomeIcon icon={faPlus} /> Create New Template</button>
                  </div>
                  <SearchFilter search onClick={(val) => { this.searchTemplateList(val); }} formRef={(el) => { this.templateSearchForm = el; }}>
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
                        onPageChange={this.gotoTemplatePage}
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
          show={this.state.isCreateNewTemp}
          onClose={this.toggleCreateNewTemplate}
          showCloseBtn
          title="Create New Template"
          width="550px"
        >
          <CreateNewTemplate {...createNewTemplateProps} />
        </Modal>

        {/* Edit template */}
        <Modal
          show={this.state.isEditTemplate}
          onClose={this.toggleEditTemplate}
          showCloseBtn
          title="Edit Template"
          width="550px"
        >
          <EditTemplate {...editTemplateProps} />
        </Modal>

        {/* Show Add Employee List */}
        <Modal
          show={this.state.isAddToTemplate}
          onClose={this.hideAddEmployeeList}
          showCloseBtn
          title="Employees List"
          width="340px"
        >
          <ListBox>
            <SearchFilter search onClick={(val) => { this.searchEmpList(val); }} placeholder="Search Employees" formRef={(el) => { this.empListForm = el; }} />

            <h3>Employees</h3>
            <button className="add-emp" onClick={() => { this.props.assignToTemplate(this.state.empIdToAdd); }}><FontAwesomeIcon icon={faPlus} /></button>

            <EmpList {...empListProps} />

            { (empListPages && empListMaxPageIndex !== 1) &&
              <Pagination>
                <ReactPaginate
                  previousLabel={'Previous'}
                  nextLabel={'Next'}
                  breakLabel={<span>...</span>}
                  breakClassName={'break-me'}
                  pageCount={empListMaxPageIndex}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={4}
                  onPageChange={this.gotoEmpListPage}
                  activeClassName={'active'}
                />
              </Pagination>
            }
          </ListBox>
        </Modal>

        {/* Confirm Success of Adding Employee to Template */}
        <Confirm
          show={this.state.isAddSuccess}
          title="SUCCESS"
          onClick={this.hideAddToSuccess}
          okBtnText="OK"
        >
          <p>Employee successfully assigned to selected template.</p>
        </Confirm>

        {/* Confirm Delete Enrolled Employees in Template */}
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

        {/* Edit/Create New Template Success */}
        <Confirm
          show={editNewTemplateSuccess}
          title="SUCCESS"
          onClick={this.clearSavingData}
          okBtnText="OK"
        >
          <p>Template has been successfully saved.</p>
        </Confirm>

        {/* Edit/Create New Template Error */}
        <Confirm
          show={editNewTemplateError}
          title="ERROR"
          onClick={this.clearSavingData}
          okBtnText="OK"
        >
          <p>We encountered an error while saving the template.<br />Please try again.</p>
        </Confirm>

        {/* Confirm Delete Template */}
        <Confirm
          show={this.state.isDeleteTemplate}
          title="DELETE"
          onClick={() => { this.setState({ isDeleteTemplate: false }); this.props.deleteTemplate(); }}
          onClose={this.toggleConfirmTemplateDelete}
          okBtnText="Yes"
          cancelBtn
          cancelBtnText="No"
        >
          <p>Are you sure you want to delete this template?</p>
        </Confirm>
        {/* Delete Template Success */}
        <Confirm
          show={this.state.isDeleteSuccess}
          title="SUCCESS"
          onClick={this.hideDeleteSuccess}
          okBtnText="OK"
        >
          <p>Template has been successfully deleted.</p>
        </Confirm>
      </PageWrap>
    );
  }
}

CompenBenTemplatePage.propTypes = {
  location: PropTypes.object,
  benefitTypes: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  templateID: PropTypes.oneOfType([
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
  enrolledEmpLoading: PropTypes.bool,
  enrolledEmpError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  enrolledEmp: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  enrolledEmpPages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  empListLoading: PropTypes.bool,
  empListError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  empList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  empListPages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  editNewTemplateLoading: PropTypes.bool,
  editNewTemplateError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  editNewTemplateSuccess: PropTypes.bool,
  addToTemplateSuccess: PropTypes.bool,
  unassignSuccess: PropTypes.bool,
  deleteSuccess: PropTypes.bool,

  // dispatch functions
  retrieveBenefitTypes: PropTypes.func,
  retrieveTemplateList: PropTypes.func,
  retrieveEmpList: PropTypes.func,
  clearEmpList: PropTypes.func,
  retrieveEnrolledEmp: PropTypes.func,
  retrieveEnrolledEmpWithPagesReset: PropTypes.func,
  assignToTemplate: PropTypes.func,
  clearAddTo: PropTypes.func,
  unAssignToTemplate: PropTypes.func,
  clearUnassignData: PropTypes.func,
  createNewTemplate: PropTypes.func,
  deleteTemplate: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  templateID: makeSelectTemplateID(),
  benefitTypes: makeSelectData('benefitTypes'),
  templateListLoading: makeSelectLoading('templateList'),
  templateListError: makeSelectError('templateList'),
  templateList: makeSelectData('templateList'),
  templateListPages: makeSelectPages('templateList'),
  enrolledEmpLoading: makeSelectLoading('enrolledList'),
  enrolledEmpError: makeSelectError('enrolledList'),
  enrolledEmp: makeSelectData('enrolledList'),
  enrolledEmpPages: makeSelectPages('enrolledList'),
  empListLoading: makeSelectLoading('employeeList'),
  empListError: makeSelectError('employeeList'),
  empList: makeSelectData('employeeList'),
  empListPages: makeSelectPages('employeeList'),
  editNewTemplateLoading: makeSelectLoading('editNewTemplate'),
  editNewTemplateError: makeSelectError('editNewTemplate'),
  editNewTemplateSuccess: makeSelectData('editNewTemplate'),
  addToTemplateSuccess: makeSelectData('addToTemplate'),
  unassignSuccess: makeSelectData('unAssignList'),
  deleteSuccess: makeSelectData('deleteTemplate'),
});

/* eslint arrow-body-style: ["error", "as-needed", { "requireReturnForObjectLiteral": true }] */
const mapDispatchToProps = (dispatch) => {
  return {
    retrieveBenefitTypes: () => dispatch(getBenefitTypes()),
    retrieveTemplateList: (page, search, sort) => dispatch(getTemplateList(page, search, sort)),
    retrieveEmpList: (id, page, search) => dispatch(getEmployeeList(id, page, search)),
    clearEmpList: () => dispatch(clearEmployeeList()),
    retrieveEnrolledEmp: (id, page, search) => dispatch(getEnrolledEmp(id, page, search)),
    retrieveEnrolledEmpWithPagesReset: (id, page, search) => dispatch(getEnrolledEmpReset(id, page, search)),
    assignToTemplate: (id) => dispatch(assignEmpToTemplate(id)),
    clearAddTo: () => dispatch(clearAssignEmpToTemplate()),
    unAssignToTemplate: (id) => dispatch(unAssignToTemplate(id)),
    clearUnassignData: () => dispatch(clearUnassignData()),
    createNewTemplate: (data, isNew) => dispatch(createNewTemplate(data, isNew)),
    deleteTemplate: () => dispatch(deleteTemplate()),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'hradmin', reducer });
const withSaga = injectSaga({ key: 'hradmin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CompenBenTemplatePage);
