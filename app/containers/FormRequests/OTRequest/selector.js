/**
 * OT selectors
 */

import { createSelector } from 'reselect';

const selectOTRequestForms = (state) => state.get('Forms');

const selectGlobal = (state) => state.get('global');

const makeSelectUserData = () => createSelector(selectGlobal, (substate) => substate.get('userData'));

const makeSelectLoading = () => createSelector(selectOTRequestForms, (substate) => substate.getIn(['otforms', 'otlists', 'loading']));

const makeSelectError = () => createSelector(selectOTRequestForms, (substate) => substate.getIn(['otforms', 'otlists', 'error']));

const makeSelectStartDate = () => createSelector(selectOTRequestForms, (substate) => substate.getIn(['otforms', 'saveRequest', 'startDate']));

const makeSelectEndDate = () => createSelector(selectOTRequestForms, (substate) => substate.getIn(['otforms', 'saveRequest', 'endDate']));

const makeSelectOTMinutes = () => createSelector(selectOTRequestForms, (substate) => substate.getIn(['otforms', 'saveRequest', 'OTMinutes']));

const makeSelectRemarks = () => createSelector(selectOTRequestForms, (substate) => substate.getIn(['otforms', 'saveRequest', 'Remarks']));

const makeShowSuccessCode = () => createSelector(selectOTRequestForms, (substate) => substate.getIn(['otforms', 'saveRequest', 'successCode']));

const makeShowSuccessMessage = () => createSelector(selectOTRequestForms, (substate) => substate.getIn(['otforms', 'saveRequest', 'successMessage']));

const makeShowErrorCode = () => createSelector(selectOTRequestForms, (substate) => substate.getIn(['otforms', 'saveRequest', 'errorCode']));

const makeShowErrorMessage = () => createSelector(selectOTRequestForms, (substate) => substate.getIn(['otforms', 'saveRequest', 'errorMessage']));

const makeShowOTLists = () => createSelector(selectOTRequestForms, (substate) => substate.getIn(['otforms', 'otlists', 'ObjectList']));

const makeSelectData = () => createSelector(
  selectOTRequestForms,
  (substate) => substate.getIn(['otforms', 'saveRequest', 'data'])
);

export {
  makeSelectLoading, makeSelectError, makeSelectStartDate,
  makeSelectEndDate, makeSelectOTMinutes, makeSelectRemarks,
  makeShowSuccessCode, makeShowSuccessMessage, makeShowErrorCode,
  makeShowErrorMessage, makeShowOTLists, makeSelectUserData,
  makeSelectData,
};
