/*
 * WorkFlow and Approval Pages
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

/* Global injectSaga and injectReducer */
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faMinus, faCaretDown } from '@fortawesome/fontawesome-free-solid';

/* Global Components */
import PageWrap from 'components/PageWrap';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';
import Sidebar from 'components/Sidebar';
import PageContent from 'components/Main/PageContent';
import OptionMenu from 'components/OptionMenu';
import Modal from 'components/Modal';
import Confirm from 'components/ConfirmationDialog';
import Loading from 'components/LoadingIndicator/Loading';
import H2 from 'components/Section/H2';

/* SearchFilter Components */
import SearchFilter from 'components/SearchFilter';
import FilterButton from 'components/SearchFilter/Button';

/* Configurations Components */
import Grid from 'components/Configurations/Grid';
import Left from 'components/Configurations/Left';
import Right from 'components/Configurations/Right';
import TemplateDetails from 'components/Configurations/Details';

/* Local Components */
import StepForm from './StepForm';
import EmpList from './EmpList';
import CreateNew from './CreateNew';
import History from './History';
import ProcessList from './ProcessList';
import TemplatesList from './TemplatesList';

/**
 * Redux references
 */
import reducer from './reducer';
import saga from './saga';
// import { getTemplatesList } from './actions';
import {
  makeSelectTempsItem,
  makeSelectProcsItem,
  makeSelectDataRequestLoading,
  makeSelectDataRequestError,
  makeSelectDataResponse,
  makeSelectDataPageDetail,
  makeSelectTempsProcessResponse,
} from './selectors';

import {
  resetTemplateProcess,
  resetWFlowState,
  processEntity,
  setSelectedEntity,
  processTempStep,
  getTemplatesList,
  processTemplate,
} from './actions';

export class WFlowPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      mobileProcSelected: 'Click to Select Process Type', // for mobile display
      mobileTemplateSelected: 'Click to Select Template', // for mobile display
      isNewTemplate: false,
      isStepModal: false,
      isEmpModal: false,
      updateSteps: false,
      isRemoveEntity: false,
      isRemoveTemplate: false,
      isTemplateUpdate: false,
      templateIsUpdated: false,
      isApprovalHistory: false,
      historyTitle: false,
      historyWidth: '450px',
      historyGroup: false,
      flagListRqs: 0, // 0 : EmpList || 1: WGroup List || 2: DeptList => Request Type Flag
      flagListTitle: '',

      confirmMessage: '',
      confirmTitle: '',
      showConfirm: false,
      searchEntity: false,
      entityType: 1,
      entityFilter: false,
      selectedEntity: false,

      selectedStep: false,
      isRemoveStep: false,
    };
  }

  // Load default listings
  componentDidMount() {
    // This will remove show class in our main wrapper (mobile menu display)
    const mainWrapper = document.getElementById('mainWrapper');
    // Remove show class in our main wrapper
    mainWrapper.classList.remove('show');

    // this.props.onLoadTemplatesList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.entityList.ResponseMsg) {
      this.successAssign(nextProps.entityList.ResponseMsg);
    } else if (nextProps.entityList.ErrorMsg) { this.failedAssign(nextProps.entityList.ErrorMsg); }

    if (nextProps.stepsRsp.ResponseMsg) {
      this.successAssign(nextProps.stepsRsp.ResponseMsg);
      this.props.restTempProcs();
      this.props.reloadTempList(false);
    } else if (nextProps.stepsRsp.ErrorMsg) { this.failedAssign(nextProps.stepsRsp.ErrorMsg); }

    if (nextProps.tempOptRsp.ResponseMsg && !this.state.templateIsUpdated) {
      this.successAssign(nextProps.tempOptRsp.ResponseMsg);
      // this.setState({ showConfirm: !this.state.showConfirm });
      this.props.reloadTempList(false);
    } else if (nextProps.tempOptRsp.ErrorMsg && !this.state.templateIsUpdated) { this.failedAssign(nextProps.tempOptRsp.ErrorMsg); }
  }

  componentWillUnmount() {
    this.props.resetWFlow();
  }

  // Show/Hide create new template
  showCreateNewModal = (e) => {
    e.preventDefault();
    this.setState({
      isNewTemplate: true,
    });
    this.props.restTempProcs();
  }

  hideCreateNewModal = (e) => {
    e.preventDefault();
    this.setState({
      isNewTemplate: false,
      isTemplateUpdate: false,
    });
  }

  // Show/Hide Delete Template
  hideRemoveTemplate = (e) => {
    e.preventDefault();
    this.setState({
      isRemoveTemplate: false,
    });
  }

  showRemoveTemplate = (e) => {
    e.preventDefault();
    this.setState({
      isRemoveTemplate: true,
      templateIsUpdated: false,
    });
  }

  // Show/Hide step modal
  showStepModal = (e) => {
    e.preventDefault();
    this.setState({
      isStepModal: true,
    });
  }
  hideStepModal = (e) => {
    e.preventDefault();
    this.setState({
      isStepModal: false,
      updateSteps: false,
    });
  }

  // Show/Hide emp modal
  showEmpModal = (e, type) => {
    e.preventDefault();
    let title = 'Department List';
    if (type === 0) {
      title = 'Employee List';
    } else if (type === 1) {
      title = 'Workgroup List';
    }
    this.setState({
      isEmpModal: true,
      flagListRqs: type,
      flagListTitle: title,
    });
  }

  hideEmpModal = (e, type) => {
    e.preventDefault();
    this.setState({
      isEmpModal: false,
      flagListRqs: type,
    });
  }

  // Show/Hide remove entity
  showRemoveEntity = (e, item) => {
    e.preventDefault();
    this.setState({
      isRemoveEntity: true,
      selectedEntity: item,
    });
  }
  hideRemoveEntity = (e) => {
    e.preventDefault();
    this.setState({
      isRemoveEntity: false,
      selectedEntity: false,
    });
  }

  // Show/Hide remove step
  showRemoveStep = (e, item) => {
    e.preventDefault();
    this.setState({
      isRemoveStep: true,
      selectedStep: item,
    });
  }
  hideRemoveStep = (e) => {
    e.preventDefault();
    this.setState({
      isRemoveStep: false,
      selectedStep: false,
    });
  }

  // Show/Hide Approval History
  showApprovalHistory = (e, title, isGroup) => {
    e.preventDefault();
    this.setState({
      isApprovalHistory: true,
      historyTitle: title,
      historyGroup: isGroup,
      historyWidth: (isGroup) ? '700px' : '450px',
    });
  }
  hideApprovalHistory = (e) => {
    e.preventDefault();
    this.setState({
      isApprovalHistory: false,
    });
  }

  // stepsOnClick = (e, item) => {
  //   e.preventDefault();
  // }

  /**
   * Load Entities
   * @param {Index} page Current Page Index you want to retrieve
   * @param {Enum} grpType Enum type you want to process: 1 = WorkGroup 2 = Department
   */
  loadEntities(page, grpType, search) {
    // WorkFlowProcTemplateID
    const filter = {
      SortFilter: {
        PageIndex: page,
        PageSize: '20',
        SortBy: 'Name',
        SortExpression: 'ASC',
      },
      WorkFlowProcTemplateID: this.props.tempsselitem.WorkFlowProcTemplateID,
    };
    this.setState({ entityFilter: filter });
    // searchEntity
    // let search = this.state.searchEntity;
    if (search) {
      // console.log("S: " + search);
      switch (grpType) {
        case 1: filter.TeamName = search; break; case 2: filter.Name = search; break; default: break;
      }
    }
    // this.props.getEntities(filterForList, grpType);
    this.props.getEntities(JSON.stringify(filter), 1, grpType);
  }

  successAssign(msg) {
    this.setState({
      confirmTitle: 'SUCCESS',
      showConfirm: !this.state.showConfirm,
      confirmMessage: msg,
      templateIsUpdated: true,
    });
  }

  failedAssign(msg) {
    this.setState({ confirmTitle: msg, showConfirm: !this.state.showConfirm, templateIsUpdated: true });
  }

  hideConfirm = (e) => {
    e.preventDefault();

    this.setState({ showConfirm: false });
    // Reset Entities List : pageIndex = 1 ; group Type = 1
    this.loadEntities(1, 1);
  }

  loadSelectedGroup = (e, type) => {
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
    // Reset Entities List : pageIndex = 1 ; group Type = (1 : WG 2 : Dept)

    this.setState({ entityType: type });
    this.loadEntities(1, type, this.state.searchEntity);
  }


  /**
   * Search Function
   */
  searchEntity = (val) => {
    this.setState({ searchEntity: val });
    this.loadEntities(1, this.state.entityType, val);
  }

  removeEntity = (e) => {
    // console.log("Selected: ");
    // console.log(this.state.selectedEntity);
    this.props.removeSelectedEntity(this.state.selectedEntity);
    this.hideRemoveEntity(e);
    this.props.getEntities(false, 3, this.state.entityType);
  }


  /**
   * Step Options
   */

  deleteStep = (e) => {
    // this.props.removeSelectedEntity(this.state.selectedEntity);
    this.hideRemoveStep(e);
    // this.props.getEntities(false, 3, this.state.entityType);
    this.props.processTemplateStep(this.state.selectedStep.No, 2, this.state.selectedStep);
  }

  showUpdateStepForm = (e, item) => {
    e.preventDefault();
    this.setState({ selectedStep: item, updateSteps: true });
    this.showStepModal(e); // Launch Step Form Modal
  }

  /**
   * Call Action for Process API for Update: Callback function from Step Form Props
   */
  updateSelStep = (e, stepDetail) => {
    // console.log(stepDetail);
    this.hideStepModal(e);
    this.props.processTemplateStep(stepDetail, 1, this.state.selectedStep);
  }

  /**
   * Template Options
   */

  deleteTemplate = (e) => {
    e.preventDefault();
    this.hideRemoveTemplate(e);
    this.props.processTemplateOpt(this.props.tempsselitem, 3);
  }

  showUpdateTemplate = (e) => {
    e.preventDefault();
    this.setState({ isTemplateUpdate: true });
    this.showCreateNewModal(e);
  }

  updateTemplate = (e, item) => {
    // console.log(item);
    this.hideCreateNewModal(e);
    this.setState({ templateIsUpdated: false });
    this.props.processTemplateOpt(item, 2);
  }

  // Function for the mobile display only
  toggleMobileProcList = (e, name = false) => {
    e.preventDefault();

    if (name) {
      this.setState({
        mobileProcSelected: name,
        mobileTemplateSelected: 'Click to Select Template',
      });
    }

    // const procList = document.getElementById('procList');
    // // add/remove max height on our content element for animation
    // const maxHeight = procList.scrollHeight; // get the scroll height of the element
    // if (procList.style.maxHeight) {
    //   procList.style.maxHeight = null;
    // } else {
    //   procList.style.maxHeight = `${maxHeight}px`; // set the max height style
    // }
  }

  toggleMobileTemplateList = (e, name = false) => {
    e.preventDefault();

    if (name) {
      this.setState({
        mobileTemplateSelected: name,
      });
    }

    // const templateList = document.getElementById('templateList');
    // // add/remove max height on our content element for animation
    // const maxHeight = templateList.scrollHeight; // get the scroll height of the element
    // if (templateList.style.maxHeight) {
    //   templateList.style.maxHeight = null;
    // } else {
    //   templateList.style.maxHeight = `${maxHeight}px`; // set the max height style
    // }
  }

  render() {
    let components;
    let steps;
    // let spectators;
    let entities;

    /**
      * Load Entities associated on WorkFlow Process Template
      */
    if (this.props.loading) {
      entities = (<Loading />);
    } else if (this.props.entityList.length > 0) {
      // console.log(this.props.entityList);
      // Load Response

      entities = this.props.entityList.map((item, index) => (
        <li role="presentation" key={`item-${item.LastModDate}${index + 1}`}>{item.Name}
          <OptionMenu title="Options" position="left">
            <button onClick={(e) => this.showRemoveEntity(e, item)}>Remove</button>
            {/* <button onClick={(e) => this.showApprovalHistory(e, 'Employee', false)}>History</button> */}
          </OptionMenu>
        </li>
      ));
      // }
    } else {
      entities = (<span>{this.props.error.ErrorMsg}</span>);
    }

    if (this.props.tempsselitem) {
      // console.log(this.props.tempsselitem.ApproverGroupByStepList);
      // Load items for steps
      if (this.props.tempsselitem.ApproverGroupByStepList) {
        steps = this.props.tempsselitem.ApproverGroupByStepList.map((item, index) => (
          <li key={`item-${item.No}`}>
            <p role="presentation" onClick={(e) => this.showUpdateStepForm(e, item)}><span>{index + 1}</span> Step Name: {item.Name}</p>
            {/* <button onClick={(e) => this.showUpdateStepForm(e, item)}><FontAwesomeIcon icon={faPencilAlt} /></button> */}
            <button onClick={(e) => this.showRemoveStep(e, item)}><FontAwesomeIcon icon={faMinus} /></button>
          </li>
        ));
      } else {
        steps = (<span>No Step(s) Found. Press Add to Create New Step(s).</span>);
      }

      components = (
        <TemplateDetails>
          <div className="details">
            <h3>
              {this.props.tempsselitem.Name}
              <button title="Edit" onClick={this.showUpdateTemplate}><FontAwesomeIcon icon={faPencilAlt} /></button>
              <button title="Delete" onClick={this.showRemoveTemplate}><FontAwesomeIcon icon={faMinus} /></button>
            </h3>
            <p>{this.props.tempsselitem.Descr}</p>
            <p>Process Type: <strong>{this.props.tempsselitem.WorkFlowForm.Name}</strong></p>
          </div>

          <div className="steps">
            <h4>STEPS: <button className="add-btn" onClick={this.showStepModal}><FontAwesomeIcon icon={faPlus} /></button></h4>
            <ul>
              {steps}
              {/* <li><span>1</span> Step Name Sample: Approval Sample</li>
              <li><span>2</span> Step Name Sample: Name of Approver</li> */}
            </ul>
          </div>
          <div className="entities">
            <h4>
              ENTITIES
              <OptionMenu title="Category" position="right" icon="plus">
                <button onClick={(e) => { this.showEmpModal(e, 1); }}>Workgroup</button>
                <button onClick={(e) => { this.showEmpModal(e, 2); }}>Department</button>
                {/* <button onClick={() => { }}>Employee</button> */}
              </OptionMenu>
            </h4>
            <SearchFilter search defaultVal={(this.state.searchEntity) || ''} onClick={(val) => { this.searchEntity(val); }}>
              <span className="filter-label">Select by:</span>
              <FilterButton className="active" onClick={(e) => { this.loadSelectedGroup(e, 1); }}>WorkGroup</FilterButton>
              <FilterButton onClick={(e) => { this.loadSelectedGroup(e, 2); }}>Department</FilterButton>
            </SearchFilter>
            <ul>
              {entities}
            </ul>
          </div>
        </TemplateDetails>
      );
    } else {
      components = (<TemplateDetails><p className="message">Please select Process Type and Template.</p></TemplateDetails>);
    }

    return (
      <PageWrap>
        <Helmet>
          <title>Workflow and Approval</title>
        </Helmet>
        <Header />
        <Sidebar location={this.location} />
        <Main>
          <PageContent>
            <Grid columns="250px auto" gap="0 20px">
              <Left>
                <H2>Process Types</H2>
                {/* <button className="mobile-toggle" title={this.state.mobileProcSelected} onClick={(e) => { this.toggleMobileProcList(e, false); }}>
                  {this.state.mobileProcSelected}
                  <FontAwesomeIcon icon={faCaretDown} />
                </button> */}
                {/* <Lists>
                  <li className="active">Test</li>
                  <li>Test</li>
                </Lists> */}
                <ProcessList getSelected={(e, name) => { this.toggleMobileProcList(e, name); }} />
              </Left>
              <Right>
                <H2>Workflow TemplateList</H2>
                <Grid columns="1fr 1fr" gap="0 0">
                  {/* <button className="mobile-toggle" title={this.state.mobileTemplateSelected} onClick={(e) => { this.toggleMobileTemplateList(e, false); }}>
                    {this.state.mobileTemplateSelected}
                    <FontAwesomeIcon icon={faCaretDown} />
                  </button> */}
                  {/* <li className="active">Test</li>
                  <li>Test</li> */}
                  <TemplatesList create={this.showCreateNewModal} getSelected={(e, name) => { this.toggleMobileTemplateList(e, name); }} />

                  {components}
                </Grid>
              </Right>
            </Grid>
          </PageContent>
        </Main>
        <Footer />

        {/* Modal to show the step form */}
        <Modal
          show={this.state.isStepModal}
          onClose={this.hideStepModal}
          showCloseBtn
          title={this.state.updateSteps ? 'Update Step' : 'Add a Step'}
          width="310px"
        >
          <StepForm
            hide={this.hideStepModal}
            showEmpModal={this.showEmpModal}
            isUpdateStep={this.state.updateSteps}
            updateStep={this.updateSelStep}
            selectedStepInfo={this.state.selectedStep}
          />
        </Modal>

        {/* Modal to show the employee list */}
        <Modal
          show={this.state.isEmpModal}
          onClose={this.hideEmpModal}
          showCloseBtn
          title={this.state.flagListTitle}
          width="320px"
        >
          <EmpList listrqs={this.state.flagListRqs} hide={this.hideEmpModal} addEmp={() => { }} />
        </Modal>

        {/* Modal for creating new template */}
        <Modal
          show={this.state.isNewTemplate}
          onClose={this.hideCreateNewModal}
          title={this.state.isTemplateUpdate ? 'Update Template' : 'Create New Template'}
          width="400px"
        >
          <CreateNew
            cancel={this.hideCreateNewModal}
            isUpdateTemplate={this.state.isTemplateUpdate}
            templateUpdate={this.updateTemplate}
          />
        </Modal>

        {/* Modal for viewing history */}
        <Modal
          show={this.state.isApprovalHistory}
          title={`${this.state.historyTitle} Workflow Approval History`}
          width={this.state.historyWidth}
          showCloseBtn
          onClose={this.hideApprovalHistory}
        >
          <History isGroup={this.state.historyGroup} />
        </Modal>

        {/* Confirm removal of entity */}
        <Confirm
          show={this.state.isRemoveEntity}
          title="Remove Entity"
          okBtnText="YES"
          onClick={this.removeEntity}
          cancelBtn
          cancelBtnText="NO"
          onClose={this.hideRemoveEntity}
          message={`Are you sure you want to remove this ${this.state.selectedEntity.Name} entity from template?`}
        />

        <Confirm
          show={this.state.isRemoveStep}
          title="Remove Step"
          okBtnText="YES"
          onClick={this.deleteStep}
          cancelBtn
          cancelBtnText="NO"
          onClose={this.hideRemoveStep}
          message={`Are you sure you want to remove this ${this.state.selectedStep.Name} Step from template?`}
        />

        <Confirm
          show={this.state.isRemoveTemplate}
          title="Remove Template"
          okBtnText="YES"
          onClick={this.deleteTemplate}
          cancelBtn
          cancelBtnText="NO"
          onClose={this.hideRemoveTemplate}
        >
          <p>Are you sure you want to remove this <span className="text-green">{this.props.tempsselitem.Name}</span> Template?</p>
        </Confirm>

        <Confirm
          show={this.state.showConfirm}
          title={this.state.confirmTitle}
          message={this.state.confirmMessage}
          okBtnText="Yes"
          onClick={this.hideConfirm}
        />
      </PageWrap>
    );
  }
}


WFlowPage.propTypes = {
  tempsselitem: PropTypes.any,
  // procsselitem: PropTypes.any,
  loading: PropTypes.bool,
  error: PropTypes.any,
  entityList: PropTypes.any,
  stepsRsp: PropTypes.any,
  tempOptRsp: PropTypes.any,
  // function dispatch props
  resetWFlow: PropTypes.func,
  restTempProcs: PropTypes.func,
  reloadTempList: PropTypes.func,
  getEntities: PropTypes.func,
  removeSelectedEntity: PropTypes.func,
  processTemplateStep: PropTypes.func,
  processTemplateOpt: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  tempsselitem: makeSelectTempsItem(),
  procsselitem: makeSelectProcsItem(),
  loading: makeSelectDataRequestLoading('wflowProcessEntity'),
  error: makeSelectDataRequestError('wflowProcessEntity'),
  entityList: makeSelectDataResponse('wflowProcessEntity'),
  stepsRsp: makeSelectDataResponse('wflowTempStep'),
  tempOptRsp: makeSelectTempsProcessResponse(),
  PageDetails: makeSelectDataPageDetail('wflowProcessEntity'),
});

function mapDispatchToProps(dispatch) {
  return {
    restTempProcs: () => dispatch(resetTemplateProcess()),
    resetWFlow: () => dispatch(resetWFlowState()),
    reloadTempList: (data) => dispatch(getTemplatesList(data)),
    getEntities: (filter, rqsType, grpType) => dispatch(processEntity(filter, rqsType, grpType)),
    removeSelectedEntity: (item) => dispatch(setSelectedEntity(item)),
    processTemplateStep: (detail, requestType, item) => dispatch(processTempStep(detail, requestType, item)),
    processTemplateOpt: (detail, requestType) => dispatch(processTemplate(detail, requestType)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'wflowapproval', reducer });
const withSaga = injectSaga({ key: 'wflowapproval', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WFlowPage);
