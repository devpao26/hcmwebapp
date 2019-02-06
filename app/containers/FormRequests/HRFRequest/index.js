/*
 * App Page
 *
*/

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { PropTypes } from 'prop-types';
import 'components/datepicker.css';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

/* Global References */
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

/* Global Components */
import Modal from 'components/Modal';
import Button from 'components/Button';
import ButtonWrapper from 'components/Button/ButtonWrapper';
import LoadingIndicator from 'components/LoadingIndicator';
import ConfirmBox from 'components/ConfirmationDialog';

/* Show Form Load Refs */
import { makeSelectRefs } from 'containers/HomePage/selectors';

import RequestForm from './RequestForm';

import {
  makeSelectLoading,
  makeSelectError,
  makeSelectSuccess,
  makeSelectErrorToTrue,
  makeSelectSuccessToTrue,
} from './selector';

import reducer from './reducer';
import saga from './saga';

import {
  createFormRequest,
  createFormRequestReset,
} from './action';

export class HRFRequestForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isHRFRequest: false,
      jobtitle: '',
      joblevel: '',
      employmentstatus: '',
      jobdescrandresp: '',
      location: '',
      minsalary: '',
      maxsalary: '',
      editorState: EditorState.createEmpty(),
      disableSelectedValue: '',
      selectedAssesmentIds: [],
      selectedAssesmentNames: [],
      selectedSkillsIds: [],
      selectedSkillsNames: [],
      requiredJobTitle: false,
      requiredJobLevel: false,
      requiredEmploymentStatus: false,
      requiredDescrAndResp: false,
      requiredLocation: false,
      requiredSkills: false,
      requiredMinimumSalary: false,
      requiredMinimumSalaryPrice: false,
      requiredMaximumSalary: false,
      requiredMaximumSalaryPrice: false,
      requireMaximumSalaryPriceRange: false,
      requiredMaxMinValidation: false,
      requiredMinMaxValidation: false,
    };
  }
  // Get job description value
  onContentStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  // Get Job Title Value
  getJobTitle = (e) => {
    e.preventDefault();
    this.setState({
      jobtitle: e.currentTarget.value,
      requiredJobTitle: false,
    });
  }
  // Get Job Level Option Value
  getJobLevel = (e) => {
    e.preventDefault();
    this.setState({
      joblevel: e.currentTarget.value,
      disableSelectedValue: 0,
      requiredJobLevel: false,
    });
  }
  // Get Employment Status Option Value
  getEmploymentStatus = (e) => {
    e.preventDefault();
    this.setState({
      employmentstatus: e.currentTarget.value,
      disableSelectedValue: 0,
      requiredEmploymentStatus: false,
    });
  }
  // Get location option value
  getLocation = (e) => {
    this.setState({
      location: e.currentTarget.value,
      requiredLocation: false,
    });
  }
  getRequiredDescrAndViolation = (e) => {
    this.setState({
      jobdescrandresp: e.currentTarget.value,
      requiredDescrAndResp: false,
    });
  }
  // Get Skills Value
  getSkills = (id, name) => {
    const { selectedSkillsIds, selectedSkillsNames } = this.state;
    const index = selectedSkillsIds.indexOf(id);

    if (index === -1) {
      selectedSkillsNames.push({ id, name });
      selectedSkillsIds.push(id);
    } else {
      for (let i = 0; i < selectedSkillsIds.length; i += 1) {
        if (selectedSkillsIds[i] === id) {
          selectedSkillsIds.splice(i, 1);
          selectedSkillsNames.splice(i, 1);
        }
      }
    }
    this.setState({
      requiredSkills: false,
    });
  }
  // Get assesments value
  getAssesments = (id, name) => {
    const { selectedAssesmentIds, selectedAssesmentNames } = this.state;
    const index = selectedAssesmentIds.indexOf(id);

    if (index === -1) {
      selectedAssesmentNames.push({ id, name });
      selectedAssesmentIds.push(id);
    } else {
      for (let i = 0; i < selectedAssesmentIds.length; i += 1) {
        if (selectedAssesmentIds[i] === id) {
          selectedAssesmentIds.splice(i, 1);
          selectedAssesmentNames.splice(i, 1);
        }
      }
    }
    this.setState({
      requiredAssesments: false,
    });
  }
  // Get Minimum Salary
  getMinimumSalary = (e) => {
    this.setState({
      minsalary: e.currentTarget.value,
      requiredMinimumSalary: false,
    });

    // Salary range should not be below 1000
    if (e.currentTarget.value < 1000) {
      this.state.requiredMinimumSalaryPrice = true;
    } else {
      this.state.requiredMinimumSalaryPrice = false;
    }
  }
  // Get Max Salary
  getMaximumSalary = (e) => {
    this.setState({
      maxsalary: e.currentTarget.value,
      requiredMaximumSalary: false,
    });
    const { minsalary } = this.state;
    if (e.currentTarget.value === '') {
      this.setState({
        requiredMaximumSalaryPrice: false,
        requiredMaxMinValidation: false,
      });
    }
    if (e.currentTarget.value < 1000) {
      this.setState({
        requiredMaximumSalaryPrice: true,
        requiredMaxMinValidation: false,
      });
    } else {
      this.setState({
        requiredMaximumSalaryPrice: false,
      });
    }
    if (e.currentTarget.value > 999999) {
      this.setState({
        requireMaximumSalaryPriceRange: true,
        requiredMaxMinValidation: false,
      });
    } else {
      this.setState({
        requireMaximumSalaryPriceRange: false,
      });
    }
    if (e.currentTarget.value > minsalary) {
      this.setState({
        requiredMaxMinValidation: false,
      });
    }
  }
  // Reset state to its original value
  dismissSuccess = () => {
    this.setState({ isHRFRequest: false });

    // Close Request Modal
    this.props.close();

    // Reset to original state
    this.props.onResetRequests();
  }
  // Submit Form Request
  submitFormRequest = () => {
    let error = false;
    const { editorState } = this.state;
    const jobdescrandresp = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const { jobtitle, joblevel, employmentstatus, location, selectedSkillsIds, selectedAssesmentIds, minsalary, maxsalary } = this.state;

    const data = {
      jobtitle,
      joblevel,
      employmentstatus,
      jobdescrandresp,
      location,
      selectedSkillsIds,
      selectedAssesmentIds,
      minsalary,
      maxsalary,
    };
    if (jobtitle === '') {
      this.setState({
        requiredJobTitle: true,
      });
      error = true;
    }
    if (joblevel === '') {
      this.setState({
        requiredJobLevel: true,
      });
      error = true;
    }
    if (employmentstatus === '') {
      this.setState({
        requiredEmploymentStatus: true,
      });
      error = true;
    }
    if (jobdescrandresp === '') {
      this.setState({
        requiredDescrAndResp: true,
      });
      error = true;
    }
    if (location === '') {
      this.setState({
        requiredLocation: true,
      });
      error = true;
    }
    if (!Array.isArray(selectedSkillsIds) || !selectedSkillsIds.length) {
      this.setState({
        requiredSkills: true,
      });
      error = true;
    }
    if (!Array.isArray(selectedAssesmentIds) || !selectedAssesmentIds.length) {
      this.setState({
        requiredAssesments: true,
      });
      error = true;
    }
    if (minsalary === '' || minsalary < 1000) {
      this.setState({
        requiredMinimumSalary: true,
        requiredMinimumSalaryPrice: true,
      });
      error = true;
    }
    if (maxsalary === '' || maxsalary < 1000) {
      this.setState({
        requiredMaximumSalary: true,
        requiredMaximumSalaryPrice: true,
      });
      error = true;
    }
    if (maxsalary > 999999) {
      this.setState({
        requireMaximumSalaryPriceRange: true,
      });
      error = true;
    }
    if (maxsalary < minsalary) {
      this.setState({
        requiredMaxMinValidation: true,
      });
      error = true;
    }
    if (!error) this.props.onSubmitFormRequests(data);
  }
  render() {
    const { editorState } = this.state;
    const { loading, success, error, showFormReferrences, showRequestResponseSuccess, showRequestResponseError } = this.props;
    let joblevel; let employmentstatus; let location; let assesments; let skills;
    if (showFormReferrences) {
      const formrefs = showFormReferrences[0];
      joblevel = formrefs.JobLvlRefs.map((item) => <option key={item.JobLvlID} value={item.JobLvlID}>{item.Name}</option>);
      employmentstatus = formrefs.EmploymentStatusRefs.map((item) => <option key={item.EmploymentStatusID} value={item.EmploymentStatusID}>{item.Name}</option>);
      location = formrefs.ComSiteLocRefs.map((item) => <option key={item.ComSiteLocID} value={item.ComSiteLocID}>{item.Name}</option>);
      skills = formrefs.SkillsRefs.map((item) =>
        (<span className="checked">
          <input type="checkbox" id="checked-state" className="checkboxes" onClick={() => { this.getSkills(item.SkillID, item.Name); }} />
          <span key={item.SkillID} className={(this.state.requiredSkills) && 'required-label'}>{item.Name}</span>
        </span>)
      );
      assesments = formrefs.JobAssessTestsRefs.map((item) =>
        (<div className="checked">
          <input type="checkbox" id="checked-state" className="checkboxes" onClick={() => { this.getAssesments(item.JobAssessTestID, item.Name); }} />
          <span className={(this.state.requiredAssesments) && 'required-label'}>{item.Name}</span>
        </div>)
      );
    }
    return (
      <span>
        <Modal
          show={this.props.show}
          title="HRF"
          width="70%"
        >
          <RequestForm>
            <div className="grid-wrapper">
              <fieldset>
                <label htmlFor="job-title">Job Title</label>
                <input type="text" className={(this.state.requiredJobTitle) && 'required-select'} onChange={this.getJobTitle} />
              </fieldset>
              <fieldset>
                <div className="half">
                  <label htmlFor="job-level">Job Level</label>
                  <span className={!this.state.requiredJobLevel ? 'select-custom' : 'select-custom required-label required-select'}>
                    <i className="fa fa-caret-down arrow-down" />
                    <select onChange={this.getJobLevel}>
                      <option disabled={this.state.disableSelectedValue === 0}>Please select job level</option>
                      {joblevel}
                    </select>
                  </span>
                </div>
                <div className="half">
                  <label htmlFor="employement-status">Employment Status</label>
                  <span className={!this.state.requiredEmploymentStatus ? 'select-custom' : 'select-custom required-label required-select'}>
                    <i className="fa fa-caret-down arrow-down" />
                    <select onChange={this.getEmploymentStatus}>
                      <option disabled={this.state.disableSelectedValue === 0}>Please select status</option>
                      {employmentstatus}
                    </select>
                  </span>
                </div>
              </fieldset>
              <fieldset>
                <label htmlFor="job-description-and-responsibilities">Job Description and Responsibilities</label>
                <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={this.onContentStateChange}
                  toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded'],
                  }}
                />
                <textarea
                  className="hide"
                  disabled
                  value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="location">Location</label>
                <span className={!this.state.requiredLocation ? 'select-custom' : 'select-custom required-label required-select'}>
                  <i className="fa fa-caret-down arrow-down" />
                  <select onChange={this.getLocation}>
                    <option disabled={this.state.disableSelectedValue === 0}>Please select location</option>
                    {location}
                  </select>
                </span>
              </fieldset>
              <fieldset>
                <label htmlFor="required-skills">Required Skills</label>
                <div className="skills">
                  {skills}
                </div>
              </fieldset>
              <fieldset>
                <label htmlFor="assessments">Assesments</label>
                {assesments}
              </fieldset>
              <fieldset>
                <div className="half">
                  <label htmlFor="minimum-salary">Minimum Salary</label>
                  <input type="number" className={(this.state.requiredMinimumSalary) && 'required-select'} onChange={this.getMinimumSalary} />
                  {(this.state.requiredMinimumSalaryPrice) && <small className="error-message">Minimum salary range is 1000.</small>}
                  {(this.state.requiredMinMaxValidation) && <small className="error-message">Maximum salary range is 999,9999.</small>}
                </div>
                <div className="half">
                  <label htmlFor="maximum-salary">Maximum Salary</label>
                  <input type="number" className={(this.state.requiredMaximumSalary || this.state.requiredMaxMinValidation) && 'required-select'} onChange={this.getMaximumSalary} />
                  <div>
                    {(this.state.requiredMaximumSalaryPrice) && <small className="error-message">Minimum salary range is 1000.</small>}
                    {(this.state.requireMaximumSalaryPriceRange) && <small className="error-message">Maximum salary range is 999,9999.</small>}
                    {(this.state.requiredMaxMinValidation) && <small className="error-message">Maximum salary should not be lesser than minimum salary </small>}
                  </div>
                </div>
              </fieldset>
            </div>
            {(loading) && <span className="loading-cont"><LoadingIndicator /></span>}
            <ButtonWrapper>
              <Button handleRoute={(e) => { this.submitFormRequest(); e.preventDefault(); }} color="gray">Submit</Button>
              <Button handleRoute={this.props.close} color="red">Cancel</Button>
            </ButtonWrapper>
          </RequestForm>
        </Modal>
        {/* Show Success Response */}
        { (showRequestResponseSuccess === true) &&
          (<ConfirmBox
            show={this.props.show}
            title="Request Success"
            onClick={this.dismissSuccess}
            okBtnText="OK"
          >
            {success}
          </ConfirmBox>)
        }
        {/* Show Error Response */}
        { (showRequestResponseError === true) &&
          (<ConfirmBox
            show={this.props.show}
            title="Request Failed"
            onClick={this.dismissSuccess}
            okBtnText="OK"
          >
            {error.ErrorCode === 400 ? "There's no Workflow associated to your request yet. Kindly contact support." : error.ErrorMsg}
          </ConfirmBox>)
        }
      </span>
    );
  }
}

HRFRequestForm.propTypes = {
  loading: PropTypes.bool,
  show: PropTypes.bool,
  showRequestResponseSuccess: PropTypes.bool,
  showRequestResponseError: PropTypes.bool,
  close: PropTypes.func,
  onResetRequests: PropTypes.func,
  onSubmitFormRequests: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any,
  showFormReferrences: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('submitForm'),
  success: makeSelectSuccess('submitForm'),
  error: makeSelectError('submitForm'),
  showFormReferrences: makeSelectRefs('formLoad'),
  showRequestResponseError: makeSelectErrorToTrue(),
  showRequestResponseSuccess: makeSelectSuccessToTrue(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitFormRequests: (data) => dispatch(createFormRequest(data)),
    onResetRequests: () => dispatch(createFormRequestReset()),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'Forms', reducer });
const withSaga = injectSaga({ key: 'Forms', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HRFRequestForm);
