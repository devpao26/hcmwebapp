/**
 * Work Status Creation of New Template
 */
import React from 'react';
import PropTypes from 'prop-types';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faDesktop } from '@fortawesome/fontawesome-free-solid';

import Loading from 'components/LoadingIndicator';
import Button from 'components/Button';
import ButtonWrapper from 'components/Button/ButtonWrapper';
import Status from 'components/User/Status';

import CreateNewForm from 'components/Templates/CreateNewForm';
import Fields from 'components/Templates/CreateNewFormFields';

import WorkNameType from './WorkNameType';

class CreateNewTemplateForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      templateName: false,
      templateNameError: false,
      templateDescr: '',
      templateDescrError: false,
      templateFieldsError: false,
      // isMeeting: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ids !== false) {
      this.setState({
        templateFieldsError: false,
      });
    }
  }

  templateName = (e) => {
    this.setState({
      templateName: e.currentTarget.value,
      templateNameError: false,
    });
  }

  templateDescr = (e) => {
    this.setState({
      templateDescr: e.currentTarget.value,
      templateDescrError: false,
    });
  }

  // toggleMeeting = () => {
  //   this.setState({
  //     isMeeting: !this.state.isMeeting,
  //   });
  // }

  saveTemplate = (e) => {
    e.preventDefault();
    const { templateName, templateDescr } = this.state;
    const { ids } = this.props;

    if (!templateName) this.setState({ templateNameError: true });
    if (!ids) this.setState({ templateFieldsError: true });

    if (templateName && ids) {
      const data = {
        Name: templateName,
        Descr: templateDescr,
        WorkStatusTemplateDetailsList: ids,
        // WithMeeting: isMeeting,
      };
      this.props.save(data);
    }
  }

  removeWorkTypeField = (e, id) => {
    e.preventDefault();
    this.props.remove(e, id);
  }

  render() {
    const { formRefs } = this.props;

    let selectedFields;
    if (formRefs) {
      selectedFields = formRefs.map((item) => (
        <p key={item.id}>
          <span className="workname">
            <Status className="Active status" />
            {item.name}
          </span>
          <span className="worktype">{item.type}</span>
          <span className="statustype"><FontAwesomeIcon className={(item.status === 'With keyboard and mouse monitoring') ? 'icon-green' : 'icon-red'} icon={faDesktop} /></span>
          <button className="btn-remove" title="Remove this field" onClick={(e) => { this.removeWorkTypeField(e, item.id); }}><FontAwesomeIcon icon={faMinus} /></button>
        </p>
      ));
    }

    return (
      <CreateNewForm>
        {(this.props.loading) && <div className="form-saving"><Loading /></div>}
        <Fields>
          <label htmlFor="createTempName">Name</label>
          <input id="createTempName" type="text" placeholder="New Work Status Template Name" onChange={this.templateName} className={this.state.templateNameError && 'error'} />
        </Fields>
        <Fields>
          <label htmlFor="createTempDesc">Description</label>
          <input id="createTempDesc" type="text" placeholder="Template Description Here" onChange={this.templateDescr} className={this.state.templateDescrError && 'error'} />
        </Fields>
        {/* <Fields>
          <label htmlFor="ismeeting" className="inline">Meeting <ToggleSwitch value={this.state.isMeeting} hideReq update={this.toggleMeeting} /></label>
        </Fields> */}
        <WorkNameType>
          <Fields className="worknametype">
            <label htmlFor="createTemp">
              <span className="workname">Work Name</span>
              <span className="worktype">Type</span>
              <span className="statustype">Hardware Monitoring</span>
            </label>
          </Fields>
          <Fields className="worknametype">
            {(this.state.templateFieldsError) && <p className="error">Please add at least 1 (one) Work Status</p>}
            {selectedFields}
          </Fields>
        </WorkNameType>
        {/* <button className="add-worktype fa fa-plus" onClick={this.addWorkTypeField} /> */}
        <button className="add-worktype" onClick={this.props.toggleFormRefs}><FontAwesomeIcon icon={faPlus} /></button>
        <ButtonWrapper>
          <Button handleRoute={this.saveTemplate} color="gray">SAVE</Button>
          <Button handleRoute={this.props.cancel} color="red">CANCEL</Button>
        </ButtonWrapper>
      </CreateNewForm>
    );
  }
}

CreateNewTemplateForm.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  toggleFormRefs: PropTypes.func.isRequired,
  ids: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  formRefs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  remove: PropTypes.func,
};

export default CreateNewTemplateForm;
