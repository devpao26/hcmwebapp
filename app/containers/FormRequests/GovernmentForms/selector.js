/**
 * UserAccess selectors
 */

import { createSelector } from 'reselect';

const selectCustomForms = (state) => state.get('Forms');

const makeSelectLoading = () => createSelector(selectCustomForms, (substate) => substate.getIn(['customforms', 'saveForm', 'loading']));
const makeSelectError = () => createSelector(selectCustomForms, (substate) => substate.getIn(['customforms', 'saveForm', 'error']));
const makeSelectResponse = () => createSelector(selectCustomForms, (substate) => substate.getIn(['customforms', 'saveForm', 'response']));
const makeSelectCustomFormId = () => createSelector(selectCustomForms, (substate) => substate.getIn(['customforms', 'saveForm', 'customFormId']));
const makeSelectAttachmentFiles = () => createSelector(selectCustomForms, (substate) => substate.getIn(['customforms', 'saveForm', 'attachmentFile']));
const makeSelectReasons = () => createSelector(selectCustomForms, (substate) => substate.getIn(['customforms', 'saveForm', 'reasons']));
const makeShowSuccessCode = () => createSelector(selectCustomForms, (substate) => substate.getIn(['customforms', 'saveForm', 'successCode']));
const makeShowSuccessMessage = () => createSelector(selectCustomForms, (substate) => substate.getIn(['customforms', 'saveForm', 'successMessage']));
const makeShowErrorCode = () => createSelector(selectCustomForms, (substate) => substate.getIn(['customforms', 'saveForm', 'errorCode']));
const makeShowErrorMessage = () => createSelector(selectCustomForms, (substate) => substate.getIn(['customforms', 'saveForm', 'errorMessage']));
const makeSelectLoadingRefs = () => createSelector(selectCustomForms, (substate) => substate.getIn(['customforms', 'customFormsRefs', 'loadingRefs']));
const makeSelectCustomFormError = () => createSelector(selectCustomForms, (substate) => substate.getIn(['customforms', 'customFormsRefs', 'error']));


export {
  makeSelectLoading, makeSelectLoadingRefs, makeSelectCustomFormError, makeSelectError, makeSelectCustomFormId,
  makeSelectResponse, makeSelectAttachmentFiles, makeSelectReasons,
  makeShowSuccessCode, makeShowSuccessMessage,
  makeShowErrorCode, makeShowErrorMessage,
};
