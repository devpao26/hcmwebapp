/**
 * OT selectors
 */

import { createSelector } from 'reselect';

const selectDTRForms = (state) => state.get('Forms');

const selectGlobal = (state) => state.get('global');

const makeSelectUserData = () => createSelector(selectGlobal, (substate) => substate.get('userData'));

const makeSelectLoading = () => createSelector(selectDTRForms, (substate) => substate.getIn(['dtrforms', 'lists', 'loading']));

const makeSelectError = () => createSelector(selectDTRForms, (substate) => substate.getIn(['dtrforms', 'lists', 'error']));

const makeSelectStartDate = () => createSelector(selectDTRForms, (substate) => substate.getIn(['dtrforms', 'saveRequest', 'startDate']));

const makeSelectEndDate = () => createSelector(selectDTRForms, (substate) => substate.getIn(['dtrforms', 'saveRequest', 'endDate']));

const makeSelectOTMinutes = () => createSelector(selectDTRForms, (substate) => substate.getIn(['dtrforms', 'saveRequest', 'OTMinutes']));

const makeSelectRemarks = () => createSelector(selectDTRForms, (substate) => substate.getIn(['dtrforms', 'saveRequest', 'Remarks']));

const makeShowSuccessCode = () => createSelector(selectDTRForms, (substate) => substate.getIn(['dtrforms', 'saveRequest', 'successCode']));

const makeShowSuccessMessage = () => createSelector(selectDTRForms, (substate) => substate.getIn(['dtrforms', 'saveRequest', 'successMessage']));

const makeShowErrorCode = () => createSelector(selectDTRForms, (substate) => substate.getIn(['dtrforms', 'saveRequest', 'errorCode']));

const makeShowErrorMessage = () => createSelector(selectDTRForms, (substate) => substate.getIn(['dtrforms', 'saveRequest', 'errorMessage']));

const makeShowOTLists = () => createSelector(selectDTRForms, (substate) => substate.getIn(['dtrforms', 'lists', 'ObjectList']));

const makeSelectData = () => createSelector(
  selectDTRForms,
  (substate) => substate.getIn(['dtrforms', 'saveRequest', 'data'])
);

export {
  makeSelectLoading, makeSelectError, makeSelectStartDate,
  makeSelectEndDate, makeSelectOTMinutes, makeSelectRemarks,
  makeShowSuccessCode, makeShowSuccessMessage, makeShowErrorCode,
  makeShowErrorMessage, makeShowOTLists, makeSelectUserData,
  makeSelectData,
};
