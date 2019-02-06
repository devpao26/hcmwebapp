/**
 * Create Template Component
 * @prop {func}   save    Save function callback
 * @prop {func}   close   Close modal function callback
 * @prop {bool}   isEdit  True/False if we are editing or creating (default: false)
 * @prop {object} details Object details of the template to be edited (if isEdit true)
 */
import React from 'react';
import PropTypes from 'prop-types';

import Form from 'components/Forms/Form';
import Fields from 'components/Forms/Fields';
import Label from 'components/Forms/Label';
import Input from 'components/Forms/Input';
import InputRadio from 'components/Forms/InputRadio';
import Textarea from 'components/Forms/Textarea';
import ErrorMsg from 'components/Forms/FieldErrorMsg';
import Select from 'components/Forms/Select';

import ButtonWrapper from 'components/Button/ButtonWrapper';
import Button from 'components/Button';

class CreateTemplateComponent extends React.PureComponent {
  state = {
    name: '',
    nameError: false,
    descr: '',
    descrError: false,
    isMonthly: false,
    isSemiMonthly: true,
    firstPayrollDay: '0',
    secondPayrollDay: '0',
    payrollDayError: false,
    payrollDayErrorMsg: '',
    firstCutoffDayFrom: '0',
    firstCutoffDayTo: '0',
    secondCutoffDayFrom: '0',
    secondCutoffDayTo: '0',
    cutoffError: false,
    cutoffErrorMsg: '',
    autoPayrollOffsetDay: '0',
    autoPayrollOffsetDayError: false,
  };

  componentDidMount = () => {
    const { isEdit, details } = this.props;
    if (isEdit) {
      this.setState({
        name: details.Name,
        descr: details.Descr,
        isMonthly: details.IsMonthly,
        isSemiMonthly: details.IsSemiMonthly,
        firstPayrollDay: details.FirstPayrollDay.toString(),
        secondPayrollDay: details.SecondPayrollDay.toString(),
        firstCutoffDayFrom: details.FirstCutoffDayFrom.toString(),
        firstCutoffDayTo: details.FirstCutoffDayTo.toString(),
        secondCutoffDayFrom: details.SecondCutoffDayFrom.toString(),
        secondCutoffDayTo: details.SecondCutoffDayTo.toString(),
        autoPayrollOffsetDay: details.AutoPayrollOffsetDay.toString(),
      });
    }
  }

  onChangeName = (e) => {
    this.setState({
      name: e.currentTarget.value,
      nameError: false,
    });
  }

  onChangeDescr = (e) => {
    this.setState({
      descr: e.currentTarget.value,
      descrError: false,
    });
  }

  onChangeCutoffType = (e, isMonthly) => {
    if (isMonthly) {
      this.setState({
        isMonthly: true,
        isSemiMonthly: false,
      });
    }

    if (!isMonthly) {
      this.setState({
        isMonthly: false,
        isSemiMonthly: true,
      });
    }
  }

  onChangePaydays = (e, isFrom) => {
    if (isFrom) {
      this.setState({
        firstPayrollDay: e.currentTarget.value,
        payrollDayError: false,
      });
    }

    if (!isFrom) {
      this.setState({
        secondPayrollDay: e.currentTarget.value,
        payrollDayError: false,
      });
    }
  }

  onChangeFirstCutoff = (e, isFrom) => {
    if (isFrom) {
      this.setState({
        firstCutoffDayFrom: e.currentTarget.value,
        cutoffError: false,
      });
    }

    if (!isFrom) {
      this.setState({
        firstCutoffDayTo: e.currentTarget.value,
        cutoffError: false,
      });
    }
  }

  onChangeSecondCutoff = (e, isFrom) => {
    if (isFrom) {
      this.setState({
        secondCutoffDayFrom: e.currentTarget.value,
        cutoffError: false,
      });
    }

    if (!isFrom) {
      this.setState({
        secondCutoffDayTo: e.currentTarget.value,
        cutoffError: false,
      });
    }
  }

  onChangePayrollOffsetDay = (e) => {
    this.setState({
      autoPayrollOffsetDay: e.currentTarget.value,
      autoPayrollOffsetDayError: false,
    });
  }

  submitData = (e) => {
    e.preventDefault();

    let error = false;
    const {
      name,
      descr,
      isMonthly,
      isSemiMonthly,
      firstPayrollDay,
      secondPayrollDay,
      firstCutoffDayFrom,
      firstCutoffDayTo,
      secondCutoffDayFrom,
      secondCutoffDayTo,
      autoPayrollOffsetDay,
    } = this.state;

    let SecondCutoffDayFrom;
    let SecondCutoffDayTo;
    let SecondPayrollDay;
    let UpdateSecondCutoffDayFrom;
    let UpdateSecondCutoffDayTo;
    let UpdateSecondPayrollDay;

    if (isSemiMonthly) {
      SecondCutoffDayFrom = parseInt(secondCutoffDayFrom, 10);
      SecondCutoffDayTo = parseInt(secondCutoffDayTo, 10);
      SecondPayrollDay = parseInt(secondPayrollDay, 10);

      if (this.props.isEdit) {
        UpdateSecondCutoffDayFrom = secondCutoffDayFrom;
        UpdateSecondCutoffDayTo = secondCutoffDayTo;
        UpdateSecondPayrollDay = secondPayrollDay;
      }
    }

    if (name === '') {
      error = true;
      this.setState({
        nameError: true,
      });
    }

    if ((isMonthly && firstPayrollDay === '0') || (isSemiMonthly && (firstPayrollDay === '0' || secondPayrollDay === '0'))) {
      error = true;
      this.setState({
        payrollDayError: true,
        payrollDayErrorMsg: 'Please select day. Value should not be 0',
      });
    }

    if (isSemiMonthly && (firstPayrollDay !== '0' || secondPayrollDay !== '0') && firstPayrollDay === secondPayrollDay) {
      error = true;
      this.setState({
        payrollDayError: true,
        payrollDayErrorMsg: 'Payroll days should not be the same',
      });
    }

    if ((isMonthly && (firstCutoffDayFrom === '0' || firstCutoffDayTo === '0')) || (isSemiMonthly && (firstCutoffDayFrom === '0' || firstCutoffDayTo === '0' || secondCutoffDayFrom === '0' || secondCutoffDayTo === '0'))) {
      error = true;
      this.setState({
        cutoffError: true,
        cutoffErrorMsg: 'Please select day. Value should not be 0',
      });
    }

    if ((isSemiMonthly || isMonthly) && (firstCutoffDayFrom !== '0' || firstCutoffDayTo !== '0') && firstCutoffDayFrom === firstCutoffDayTo) {
      error = true;
      this.setState({
        cutoffError: true,
        cutoffErrorMsg: 'First Cutoff From and To should not be the same day',
      });
    }

    if (isSemiMonthly && (secondCutoffDayFrom !== '0' || secondCutoffDayTo !== '0') && secondCutoffDayFrom === secondCutoffDayTo) {
      error = true;
      this.setState({
        cutoffError: true,
        cutoffErrorMsg: 'Second Cutoff From and To should not be the same day',
      });
    }

    if (
      isSemiMonthly &&
      (firstCutoffDayFrom !== '0' || firstCutoffDayTo !== '0' || secondCutoffDayFrom !== '0' || secondCutoffDayTo !== '0') &&
      (firstCutoffDayFrom === secondCutoffDayFrom ||
      firstCutoffDayFrom === secondCutoffDayTo ||
      firstCutoffDayTo === secondCutoffDayFrom ||
      firstCutoffDayTo === secondCutoffDayTo)
    ) {
      this.setState({
        cutoffError: true,
        cutoffErrorMsg: 'First Cutoff and Second Cutoff should not be of equal values',
      });
    }

    if (parseInt(autoPayrollOffsetDay, 10) < 1 || parseInt(autoPayrollOffsetDay, 10) > 3) {
      error = true;
      this.setState({
        autoPayrollOffsetDayError: true,
      });
    }

    if (!error) {
      let data;
      if (this.props.isEdit) {
        data = {
          UpdateAutoPayrollOffsetDay: autoPayrollOffsetDay,
          Descr: descr,
          UpdateFirstCutoffDayFrom: firstCutoffDayFrom,
          UpdateFirstCutoffDayTo: firstCutoffDayTo,
          UpdateFirstPayrollDay: firstCutoffDayTo,
          UpdateIsMonthly: isMonthly.toString(),
          UpdateIsSemiMonthly: isSemiMonthly.toString(),
          Name: name,
          UpdateSecondCutoffDayFrom,
          UpdateSecondCutoffDayTo,
          UpdateSecondPayrollDay,
        };
      } else {
        data = {
          AutoPayrollOffsetDay: parseInt(autoPayrollOffsetDay, 10),
          Descr: descr,
          FirstCutoffDayFrom: parseInt(firstCutoffDayFrom, 10),
          FirstCutoffDayTo: parseInt(firstCutoffDayTo, 10),
          FirstPayrollDay: parseInt(firstCutoffDayTo, 10),
          IsMonthly: isMonthly,
          IsSemiMonthly: isSemiMonthly,
          Name: name,
          SecondCutoffDayFrom,
          SecondCutoffDayTo,
          SecondPayrollDay,
        };
      }
      this.props.save(data);
    }
  }

  render() {
    // Generate Date from 1 - 31
    const date = [];
    for (let d = 0; d < 32; d += 1) {
      date.push(
        <option key={d} value={d}>{d}</option>
      );
    }

    return (
      <Form>
        <Fields>
          <Label>Name</Label>
          <Input type="text" placeholder="New Payroll Cutoff template name" onChange={this.onChangeName} value={this.state.name} />
          {(this.state.nameError) && <ErrorMsg>* Field must not be empty.</ErrorMsg>}
        </Fields>
        <Fields>
          <Label>Description</Label>
          <Textarea height="80px" onChange={this.onChangeDescr} value={this.state.descr} />
        </Fields>
        <Fields>
          <Label>Cutoff Type</Label>
          <InputRadio label="Semi-Monthly" name="cutoffType" value="semi" checked={this.state.isSemiMonthly} onClick={(e) => { this.onChangeCutoffType(e, false); }} />
          <InputRadio label="Monthly" name="cutoffType" value="monthly" checked={this.state.isMonthly} onClick={(e) => { this.onChangeCutoffType(e, true); }} />
        </Fields>
        <Fields className="half">
          <Label>Pay Days</Label>
          <Select getValue={(e) => { this.onChangePaydays(e, true); }} inline label="First" default={this.state.firstPayrollDay}>
            {date}
          </Select>
          { (this.state.isSemiMonthly) &&
            <Select getValue={(e) => { this.onChangePaydays(e, false); }} inline label="Second" default={this.state.secondPayrollDay}>
              {date}
            </Select>
          }
        </Fields>
        {(this.state.payrollDayError) && <ErrorMsg>* {this.state.payrollDayErrorMsg}</ErrorMsg>}
        <Label>Day Range</Label>
        <Fields className="third">
          <Label>First Cutoff Range</Label>
          <Select getValue={(e) => { this.onChangeFirstCutoff(e, true); }} inline label="From" default={this.state.firstCutoffDayFrom}>
            {date}
          </Select>
          <Select getValue={(e) => { this.onChangeFirstCutoff(e, false); }} inline label="To" default={this.state.firstCutoffDayTo}>
            {date}
          </Select>
        </Fields>
        { (this.state.isSemiMonthly) &&
          <Fields className="third last">
            <Label>Second Cutoff Range</Label>
            <Select getValue={(e) => { this.onChangeSecondCutoff(e, true); }} inline label="From" default={this.state.secondCutoffDayFrom}>
              {date}
            </Select>
            <Select getValue={(e) => { this.onChangeSecondCutoff(e, false); }} inline label="To" default={this.state.secondCutoffDayTo}>
              {date}
            </Select>
          </Fields>
        }
        {(this.state.cutoffError) && <ErrorMsg>* {this.state.cutoffErrorMsg}</ErrorMsg>}
        <Fields>
          <Label>Payroll Offset Day</Label>
          <Fields className="fourth">
            <Input type="number" placeholder="0" min="1" max="3" onChange={this.onChangePayrollOffsetDay} value={this.state.autoPayrollOffsetDay} />
          </Fields>
          {(this.state.autoPayrollOffsetDayError) && <ErrorMsg>* Offset day should not exceed 3 or less than 1</ErrorMsg>}
        </Fields>
        <ButtonWrapper>
          <Button handleRoute={this.submitData} color="gray">SUBMIT</Button>
          <Button handleRoute={this.props.close} color="red">CANCEL</Button>
        </ButtonWrapper>
      </Form>
    );
  }
}

CreateTemplateComponent.propTypes = {
  save: PropTypes.func,
  close: PropTypes.func,
  isEdit: PropTypes.bool,
  details: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
};

export default CreateTemplateComponent;
