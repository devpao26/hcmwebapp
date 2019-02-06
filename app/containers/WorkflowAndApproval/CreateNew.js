/**
 * Shift Template Creation of New Template
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Loading from 'components/LoadingIndicator';
import Button from 'components/Button';
import ButtonWrapper from 'components/Button/ButtonWrapper';
import ToggleSwitch from 'components/StyleUtils/ToggleSwitch';

import CreateNewForm from 'components/Templates/CreateNewForm';
import Fields from 'components/Templates/CreateNewFormFields';

/**
 * Redux Patterns
 */
import {
  makeSelectTempsProcessLoading,
  makeSelectTempsProcessError,
  makeSelectTempsProcessResponse,
  makeSelectProcsItem,
  makeSelectTempsItem,
} from './selectors';

import { processTemplate, getTemplatesList } from './actions';


class CreateNewTemplateForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      templateName: false,
      templateDesc: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.response.ResponseCode === 200) {
      this.reloadTemp();
    }
  }

  componentDidMount(){
    if(this.props.isUpdateTemplate){
      this.setState({
        templateName: this.props.tempselitem.Name,
        templateDesc: this.props.tempselitem.Descr
      });
    }
  }

  changeInputVal = (e) => {
    // console.log(e.target.value);
    this.setState({
      templateName: e.target.value,
    });
  }
  changeDescVal = (e) => {
    // console.log(e.target.value);
    this.setState({
      templateDesc: e.target.value,
    });
  }

  createTemplate(e, name, desc) {
    e.preventDefault();
    // console.log(tempDetail);
    if (this.props.isUpdateTemplate) {
      let tempDetail = JSON.stringify({
        'Name': name,
        'Descr': desc,
      });
      this.props.templateUpdate(e, tempDetail);
    } else {
      let tempDetail = JSON.stringify({
        'Name': name,
        'Descr': desc,
        'WorkFlowFormID': this.props.loadWflowSelProcs.WorkFlowFormID
      });
      this.props.onSave(tempDetail);
    }

  }

  reloadTemp() {
    // console.log(this.props.loadWflowSelProcs);
    this.props.reloadTempList(false);
  }

  render() {
    const { templateName, templateDesc } = this.state;
    let component;

    if (this.props.response) {

      component = (
        <div>
          <span>{this.props.response.ResponseMsg}</span>
          <ButtonWrapper>
            <Button handleRoute={this.props.cancel} color="green">OK</Button>
          </ButtonWrapper>
        </div>
      );

    } else if (this.props.error) {
      component = (
        <div>
          <span>Something went wrong. Please try again!</span>
          <ButtonWrapper>
            <Button handleRoute={this.props.cancel} color="green">OK</Button>
          </ButtonWrapper>
        </div>
      );
    } else {
      let saveReady;
      if (templateName && templateDesc) {
        saveReady = (<Button handleRoute={(e) => { this.createTemplate(e, this.state.templateName, this.state.templateDesc) }} color="green" >{this.props.isUpdateTemplate ? "UPDATE" : "SAVE"}</Button>);
      }
      component = (
        <div>
          <Fields>
            <label htmlFor="newTemplateName">Template Name</label>
            <input id="newTemplateName" type="text" placeholder="New Template Name" onChange={this.changeInputVal} value={this.state.templateName ? this.state.templateName : ''}/>
          </Fields>
          <Fields>
            <label htmlFor="newTemplateDescr">Template Description</label>
            <textarea id="newTemplateDescr" onChange={this.changeDescVal} value={this.state.templateDesc ? this.state.templateDesc : ''}/>
          </Fields>
          <ButtonWrapper>
            {saveReady}
            <Button handleRoute={this.props.cancel} color="red">CANCEL</Button>
          </ButtonWrapper>
        </div>
      );
    }

    return (
      <CreateNewForm>
        {(this.props.loading) && <div className="form-saving"><Loading /></div>}

        {/* <Fields>
          <label htmlFor="newTemplateCustom">Custom <ToggleSwitch hideReq value={false} update={(e, isBool) => { console.log(isBool); }} /></label>
        </Fields> */}
        {/* <Fields>
          <label htmlFor="newTemplateProcessType">Template Duration</label>
          <input id="newTemplateProcessType" type="text" defaultValue="Process Type" disabled />
        </Fields> */}

        {/* <Fields>
          <label htmlFor="newTemplateDescr">Template Description</label>
          <textarea id="newTemplateDescr" />
        </Fields> */}
        {component}
      </CreateNewForm>
    );
  }
}

CreateNewTemplateForm.propTypes = {
  cancel: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.any,
  response: PropTypes.any,
  loadWflowSelProcs: PropTypes.any,
  isUpdateTemplate: PropTypes.bool.isRequired,
  templateUpdate: PropTypes.func,
  tempselitem: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectTempsProcessLoading(),
  error: makeSelectTempsProcessError(),
  response: makeSelectTempsProcessResponse(),
  loadWflowSelProcs: makeSelectProcsItem(),
  tempselitem: makeSelectTempsItem(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSave: (details) => dispatch(processTemplate(details, 1)),
    reloadTempList: (data) => dispatch(getTemplatesList(data)),

  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(CreateNewTemplateForm);

