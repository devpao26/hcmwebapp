/**
 * Step Form
 * @prop {function} showEmpModal  Function to show the employee modal
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faMinusCircle } from '@fortawesome/fontawesome-free-solid';

import Avatar from 'components/Img/Avatar';
import Button from 'components/Button';
import StepForm from 'components/Configurations/StepForm';
import Input from 'components/Forms/Input';
import Textarea from 'components/Forms/Textarea';
import Loading from 'components/LoadingIndicator';
// import ToggleSwitch from 'components/StyleUtils/ToggleSwitch';

/**
 * Redux pattern dependencies
 */

import {
  getTemplatesList,
  setTempsSelected,
  setSelectedEmps,
  processTemplate,
} from './actions';

import {
  makeSelectTempsProcessLoading,
  makeSelectTempsProcessError,
  makeSelectTempsProcessResponse,
  makeSelectGetDataItems,
  makeSelectTempsItem,
  // makeSelectGetSelectedItem,
} from './selectors';

export class StepFromComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      stepName: false,
      stepDesc: false,
      formComplete: false,
      selectedStepStateInfo: false,
      empArr: false,
    };
  }

  componentDidMount() {
    if (this.props.isUpdateStep) {
      // console.log(this.props.selectedStepInfo);
      let stepInfo = this.props.selectedStepInfo;
      this.setState((previousState) => ({
        empArr: [...previousState.empArr, ...stepInfo.ApproverList],
        stepName: stepInfo.Name,
        stepDesc: stepInfo.Descr,
      }));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isUpdateStep) {
      // Update our state emp Arr whenever a new Emp selected
      this.setState(previousState => ({
        empArr: [...previousState.empArr, ...nextProps.empArr],
      }));
      // Then Clear the selected Emp
      this.props.removeToSelectedEmpList(false);
    }
  }

  /**
   * Removal of Deleted Employee from the Selected List
   */
  removeApprover = (e, index) => {
    e.preventDefault();


    if (this.props.isUpdateStep) {
      this.setState((previousState) => ({
        empArr: [...previousState.empArr.slice(0, index), ...previousState.empArr.slice(index + 1)]
      }));
    } else {
      // make a copy of the array
      const myCopyEmpList = this.props.empArr.slice();
      // mutate the copy
      myCopyEmpList.splice(index, 1) // remove 1 element from index
      // console.log(myCopyEmpList);
      this.props.removeToSelectedEmpList(myCopyEmpList);
    }
  }

  saveNewStep = (e) => {
    e.preventDefault();

    let approversArr = [];
    let stepRqsDetail;
    // console.log(stepRqsDetail);

    if (this.props.isUpdateStep) { // Update Validator Tag
      this.state.empArr.map((item) => {
        let appDet = {
          'EmpProfileID': item.EmpProfileID,
        };
        approversArr.push(appDet);
      });

      stepRqsDetail = JSON.stringify({
        "WorkFlowProcTemplateID": this.props.selectedStepInfo.WorkFlowProcTemplateID,
        "Name": this.state.stepName,
        "Descr": this.state.stepDesc,
        "No": this.props.selectedStepInfo.No ? this.props.selectedStepInfo.No : 1,
        "ApproverList": approversArr,
      });

      this.props.updateStep(e, stepRqsDetail);
    } else { // Add new Step
      let lastStepNo = this.props.tempItem.ApproverGroupByStepList ? this.props.tempItem.ApproverGroupByStepList.length - 1 : 0; // Get length of Objects
      let availStepNo = this.props.tempItem.ApproverGroupByStepList.length > 0 ? this.props.tempItem.ApproverGroupByStepList[lastStepNo].No + 1 : 1; // Get the last high No from the last entry plus 1
      // console.log(availStepNo);
      this.props.empArr.map((item) => {
        let appDet = {
          'No': availStepNo,
          'ApproverID': item.EmpProfileID,
          'Descr': this.state.stepDesc,
          'Name': this.state.stepName,
        };
        approversArr.push(appDet);
      });
      stepRqsDetail = JSON.stringify({
        'WorkFlowProcTemplateStepList': approversArr,
      });
      this.props.saveStep(stepRqsDetail);
    }
  }

  reloadTemps = (e) => {
    this.props.hide(e);
    this.props.refreshTempList(false);// Reload
  }


  render() {
    const { approversArr, stepName, stepDesc, formComplete } = this.state;

    let saveReady;// Show Button Save when all fields are complete
    let empSelComponent;

    let empArrValid;
    if (this.props.isUpdateStep) {
      empArrValid = this.state.empArr && this.state.empArr.length > 0;
    } else {
      empArrValid = this.props.empArr && this.props.empArr.length > 0;
    }

    if (this.state.stepName && this.state.stepDesc) {
      if (empArrValid) {
        saveReady = (
          <div className="action">
            <Button handleRoute={(e) => { this.saveNewStep(e) }} color="green">{this.props.isUpdateStep ? "UPDATE" : "SAVE"}</Button>
          </div>
        );
      }
    }

    if (empArrValid) {
      // console.log(this.props.empArr);
      let whatRenders = this.props.isUpdateStep ? this.state.empArr : this.props.empArr;
      empSelComponent = whatRenders.map((item, index) =>
        <div className="emp-approvers" key={`item-${item.LastModDate}${index}`}>
          <dl>
            <dt>
              { (item.EmpAvatarAttachs != null)
                ? <Avatar bgImage={`url('${item.EmpAvatarAttachs.Path}')`} />
                : <Avatar />
              }
            </dt>
            <dd>
              <p>{item.LastName}, {item.FirstName} {item.MiddleName}</p>
              {/* <span>Active <ToggleSwitch hideReq value update={(val) => { console.log(val); }} /></span> */}
              <button className="del-btn" onClick={(e) => { this.removeApprover(e, index) }}> <FontAwesomeIcon icon={faMinusCircle} /></button>
            </dd>
          </dl>
        </div>
      );
    } else {
      empSelComponent = (<p className="message">Select Approvers from the Employee List</p>);
    }


    let contentComponent; // Component Rendering
    if (this.props.loading) { // Loading
      contentComponent = (
        <form>
          <div className="form-saving"><Loading /></div>
          <div className="fields">
            <label>Loading....</label>
          </div>
        </form>
      );
    } else if (this.props.error) {
      contentComponent = (<p className="message">{this.props.error.ErrorMsg}</p>);
    } else if (this.props.response.ResponseCode === 200) { // Success

      contentComponent = (
        <form>
          <div className="fields">
            <label>Step Created Successfully</label>
          </div>
          <div className="action">
            <Button handleRoute={this.reloadTemps} color="green">OK</Button>
          </div>
        </form>
      );

    } else {
      contentComponent = (
        <form>
          <div className="fields">
            <label htmlFor="stepName">Step Name</label>
            <Input id="stepName" type="text" placeholder="Step Name" onChange={(e) => { this.setState({ stepName: e.target.value }) }} value={this.state.stepName ? this.state.stepName : ""} />
          </div>
          <div className="fields">
            <label htmlFor="stepDescr">Description</label>
            <Textarea id="stepDescr" onChange={(e) => { this.setState({ stepDesc: e.target.value }) }} value={this.state.stepDesc ? this.state.stepDesc : ""} />
          </div>
          {/* TODO: Commenting this div for now, need to check with back end if Active and InActive States were available at API
          <div className="fields">
            <label htmlFor="stepActive">Status</label>
            Active <ToggleSwitch hideReq value update={(val) => { console.log(val); }} />
          </div> */}
          <div className="fields">
            <h4>Approvers <button className="add-btn" onClick={(e) => { this.props.showEmpModal(e, 0) }}><FontAwesomeIcon icon={faPlus} /></button></h4>
            {empSelComponent}
          </div>
          {saveReady}
        </form>
      );
    }

    return (
      <StepForm className="step-details">
        {contentComponent}
      </StepForm>
    );
  }
}


StepFromComponent.propTypes = {
  showEmpModal: PropTypes.func,
  hide: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.any,
  response: PropTypes.any,
  tempItem: PropTypes.any,
  empArr: PropTypes.any,

  /**
   * Props for Updating Step
   */
  isUpdateStep: PropTypes.bool.isRequired, // Validation if this shows for Add or Update a Step
  updateStep: PropTypes.func,
  selectedStepInfo: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectTempsProcessLoading(),
  error: makeSelectTempsProcessError(),
  response: makeSelectTempsProcessResponse(),
  empArr: makeSelectGetDataItems('wflowEmpWGDeptReqs'),
  tempItem: makeSelectTempsItem(),
  // selectedStepInfo: makeSelectGetSelectedItem('wflowTempStep'),
});

function mapDispatchToProps(dispatch) {
  return {
    removeToSelectedEmpList: (item) => dispatch(setSelectedEmps(item)),
    refreshTempList: (data) => dispatch(getTemplatesList(data)),
    setLastTempSelected: (tempItem) => dispatch(setTempsSelected(tempItem)),
    saveStep: (details) => dispatch(processTemplate(details, 2)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(StepFromComponent);

