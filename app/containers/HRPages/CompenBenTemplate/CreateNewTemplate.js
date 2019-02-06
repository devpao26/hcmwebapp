/**
 * Work Status Creation of New Template
 */
import React from 'react';
import PropTypes from 'prop-types';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';

import Loading from 'components/LoadingIndicator';
import Button from 'components/Button';
import ButtonWrapper from 'components/Button/ButtonWrapper';
import Toggle from 'components/StyleUtils/ToggleSwitch';

import CreateNewForm from 'components/Templates/CreateNewForm';
import Fields from 'components/Templates/CreateNewFormFields';

import Allowance from './Allowance';
import Benefits from './Benefits';

class CreateNewTemplateForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFormError: false,
      templateName: false,
      templateNameError: false,
      basicSalary: 0,
      basicSalaryError: false,
      isDailyRate: false,
      allowanceFields: [],
      benefitFields: [],
      benefitTypeIndex: false,
    };
  }

  // Handle the Template Name
  onChangeTemplateName = (e) => {
    this.setState({
      isFormError: false,
      templateNameError: false,
      templateName: e.currentTarget.value,
    });
  }
  // Handle the Basic Pay
  onChangeBasicPay = (e) => {
    this.setState({
      isFormError: false,
      basicSalaryError: false,
      basicSalary: parseFloat(e.currentTarget.value),
    });
  }

  // Handle the Daily Rate Toggle
  onChangeDailyRate = () => {
    this.setState({
      isDailyRate: !this.state.isDailyRate,
    });
  }

  // Handle on Change for the allowance fields
  onChangeAllowanceName = (e, index) => {
    e.preventDefault();
    this.setState({
      isFormError: false,
    });
    this.state.allowanceFields[index].Name = e.currentTarget.value;
    this.state.allowanceFields[index].isNameError = false;

    this.forceUpdate();
  }
  onChangeAllowanceType = (e, index) => {
    e.preventDefault();

    let isTaxable = true;
    if (e.currentTarget.value !== 'Taxable') {
      isTaxable = false;
    }
    this.state.allowanceFields[index].IsTaxable = isTaxable;

    this.forceUpdate();
  }
  onChangeAllowanceValue = (e, index) => {
    e.preventDefault();
    this.setState({
      isFormError: false,
    });
    const num = e.currentTarget.value;
    this.state.allowanceFields[index].Value = parseFloat(num);
    this.state.allowanceFields[index].isValueError = false;

    this.forceUpdate();
  }

  // Handle on Change for the benefit fields
  onChangeBenefitValue = (e, index) => {
    e.preventDefault();
    this.setState({
      isFormError: false,
    });
    const num = e.currentTarget.value;
    this.state.benefitFields[index].Value = parseFloat(num);
    this.state.benefitFields[index].isValueError = false;

    this.forceUpdate();
  }

  onChangeBenefitType = (e, index) => {
    e.preventDefault();
    this.setState({
      isFormError: false,
    });
    const itemIndex = e.currentTarget.value;

    const id = this.props.benefitTypes[itemIndex].CompBenefitTypeID;

    this.state.benefitFields[index].CompBenefitTypeID = id;
    this.state.benefitFields[index].isTypeError = false;
    this.forceUpdate();
  }

  // Form Submission
  onSubmit = (e) => {
    e.preventDefault();
    let formErrors = false;
    const CompBenefitsList = [];
    const CompbenAllowancesList = [];

    this.state.benefitFields.map((item, index) => {
      if (item.Value === '' || item.Value === 0) {
        formErrors = true;
        this.setState({
          isFormError: true,
        });

        this.state.benefitFields[index].isValueError = true;
        this.forceUpdate();
      }

      // Check if we are selected a Benefit type
      if (item.CompBenefitTypeID === '') {
        formErrors = true;
        this.state.benefitFields[index].isTypeError = true;
        this.forceUpdate();
      }

      CompBenefitsList.push({
        CompBenefitTypeID: item.CompBenefitTypeID,
        Value: item.Value,
      });

      return CompBenefitsList;
    });

    this.state.allowanceFields.map((item, index) => {
      if (item.Name === '') {
        formErrors = true;
        this.setState({
          isFormError: true,
        });

        this.state.allowanceFields[index].isNameError = true;
        this.forceUpdate();
      }

      if (item.Value === '' || item.Value === 0) {
        formErrors = true;
        this.setState({
          isFormError: true,
        });

        this.state.allowanceFields[index].isValueError = true;
        this.forceUpdate();
      }

      CompbenAllowancesList.push({
        Name: item.Name,
        IsTaxable: item.IsTaxable,
        Value: item.Value,
      });

      return CompbenAllowancesList;
    });

    if (this.state.templateName === false) {
      formErrors = true;
      this.setState({
        isFormError: true,
        templateNameError: true,
      });
    }

    if (this.state.basicSalary === 0) {
      formErrors = true;
      this.setState({
        isFormError: true,
        basicSalaryError: true,
      });
    }

    if (!formErrors) {
      const data = {
        Name: this.state.templateName,
        BasicSalary: this.state.basicSalary,
        IsDailyRate: this.state.isDailyRate,
        CompBenefitsList,
        CompbenAllowancesList,
      };

      this.props.save(data, true);
    }
  }

  addAllowance = (e) => {
    e.preventDefault();
    const id = (new Date()).getTime();

    this.setState((prevState) => ({
      allowanceFields: [...prevState.allowanceFields, { id, Name: '', IsTaxable: true, Value: 0, isNameError: false, isValueError: false }],
    }));
  }

  removeAllowance = (e, id) => {
    e.preventDefault();

    this.setState((prevState) => ({
      allowanceFields: prevState.allowanceFields.filter((obj) => obj.id !== id),
    }));
  }

  addBenefit = (e) => {
    e.preventDefault();
    const id = (new Date()).getTime();

    this.setState((prevState) => ({
      benefitFields: [...prevState.benefitFields, { id, CompBenefitTypeID: '', Value: 0, isTypeError: false, isValueError: false }],
    }));
  }

  removeBenefit = (e, id) => {
    e.preventDefault();
    this.setState((prevState) => ({
      benefitFields: prevState.benefitFields.filter((obj) => obj.id !== id),
    }));
  }

  render() {
    const { benefitTypes } = this.props;

    // Render Benefit Types
    let benefitTypesItems;
    if (benefitTypes) {
      benefitTypesItems = benefitTypes.map((item, index) =>
        <option key={item.CompBenefitTypeID} value={index}>{item.Name}</option>
      );
    }

    // Render the allowance fields
    const allowanceItems = this.state.allowanceFields.map((item, index) => (
      <Fields key={item.id} noPaddingTop>
        <button className="fa fa-minus-circle btn-delete" onClick={(e) => this.removeAllowance(e, item.id)} />
        <div className="one-third">
          <input value={item.Name} type="text" onChange={(e) => this.onChangeAllowanceName(e, index)} className={item.isNameError && 'error'} placeholder="Allowance Name" />
        </div>
        <div className="one-third">
          <span className="select-custom">
            <i className="fa fa-caret-down" />
            <select onChange={(e) => this.onChangeAllowanceType(e, index)}>
              <option value="Taxable">Taxable</option>
              <option value="Non Taxable">Non Taxable</option>
            </select>
          </span>
        </div>
        <div className="one-third last">
          <input value={(item.Value !== 0) ? item.Value : ''} type="number" onChange={(e) => this.onChangeAllowanceValue(e, index)} className={item.isValueError && 'error'} placeholder="Php 5,000.00" />
        </div>
      </Fields>
    ));

    const benefitItems = this.state.benefitFields.map((item, index) => (
      <Fields key={item.id} noPaddingTop>
        <button className="fa fa-minus-circle btn-delete" onClick={(e) => this.removeBenefit(e, item.id)} />
        <div className="two-third">
          <span className="select-custom">
            <i className="fa fa-caret-down" />
            <select defaultValue="none" onChange={(e) => this.onChangeBenefitType(e, index)} className={item.isTypeError && 'error'}>
              <option value="none" disabled>Please select type</option>
              {benefitTypesItems}
            </select>
          </span>
        </div>
        <div className="one-third last">
          <input value={(item.Value !== 0) ? item.Value : ''} type="number" onChange={(e) => this.onChangeBenefitValue(e, index)} className={item.isValueError && 'error'} placeholder="Php 5,000.00" />
        </div>
      </Fields>
    ));

    return (
      <CreateNewForm>
        {(this.props.loading) && <div className="form-saving"><Loading /></div>}
        <Fields>
          <label htmlFor="templateName">Template Name</label>
          <input type="text" id="templateName" placeholder="New Work Status Template Name" onChange={(e) => this.onChangeTemplateName(e)} className={this.state.templateNameError && 'error'} />
        </Fields>
        <Fields>
          {/* <div className="one-third">
            <label htmlFor="roleLevel">Employee Role Level</label>
            <span className="select-custom">
              <i className="fa fa-caret-down" />
              <select id="roleLevel">
                <option>Level 1</option>
              </select>
            </span>
          </div>
          <div className="one-third">
            <label htmlFor="employmentType">Employment Type</label>
            <span className="select-custom">
              <i className="fa fa-caret-down" />
              <select id="employmentType">
                <option>Employment Type</option>
              </select>
            </span>
          </div> */}
          <div className="one-third last">
            <label htmlFor="basicPay">Basic Pay:</label>
            <input id="basicPay" type="number" placeholder="Php 15,000.00" onChange={(e) => this.onChangeBasicPay(e)} className={this.state.basicSalaryError && 'error'} />
            <label htmlFor="test" style={{ marginTop: '5px' }}>Daily Rate? <Toggle hideReq update={this.onChangeDailyRate} value={this.state.isDailyRate} /></label>
          </div>
        </Fields>
        <Fields>
          <div className="one-third">
            <label htmlFor="label">Allowance Name</label>
          </div>
          <div className="one-third">
            <label htmlFor="label">Type</label>
          </div>
          <div className="one-third last">
            <label htmlFor="label">Value</label>
          </div>
        </Fields>
        <Allowance>
          {allowanceItems}
        </Allowance>
        <button title="Add Allowance" className="add-btn" onClick={this.addAllowance}><FontAwesomeIcon icon={faPlus} /></button>

        <Fields noPaddingTop>
          <div className="two-third">
            {/* <label htmlFor="label">Benefits Type<button className="fa fa-plus-circle btn-addbenefit" /></label> */}
            <label htmlFor="label">Benefits Type</label>
          </div>
          <div className="one-third last">
            <label htmlFor="label">Value</label>
          </div>
        </Fields>
        <Benefits>
          {benefitItems}
        </Benefits>
        <button title="Add Benefit" className="add-btn" onClick={this.addBenefit}><FontAwesomeIcon icon={faPlus} /></button>
        <ButtonWrapper>
          {(this.state.isFormError) && <p className="error-msg">* Please fill out the fields in red underline.</p>}
          <Button handleRoute={this.onSubmit} color="gray">SAVE</Button>
          <Button handleRoute={(e) => this.props.cancel(e)} color="red">CANCEL</Button>
        </ButtonWrapper>
      </CreateNewForm>
    );
  }
}

CreateNewTemplateForm.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  benefitTypes: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

export default CreateNewTemplateForm;
