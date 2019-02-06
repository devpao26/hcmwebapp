/**
 * Leave Conversion Form Selectors
 */

import { createSelector } from 'reselect';

const selectLCFRequest = (state) => state.get('Forms');
const selectGlobal = (state) => state.get('global');

const makeSelectUserData = () => createSelector(selectGlobal, (substate) => substate.get('userData'));
const makeSelectLoading = () => createSelector(selectLCFRequest, (substate) => substate.getIn(['leaveconversionform', 'saveForm', 'loading']));
const makeSelectError = () => createSelector(selectLCFRequest, (substate) => substate.getIn(['leaveconversionform', 'saveForm', 'error']));
const makeShowSuccessCode = () => createSelector(selectLCFRequest, (substate) => substate.getIn(['leaveconversionform', 'saveForm', 'successCode']));
const makeShowSuccessMessage = () => createSelector(selectLCFRequest, (substate) => substate.getIn(['leaveconversionform', 'saveForm', 'successMessage']));
const makeShowErrorCode = () => createSelector(selectLCFRequest, (substate) => substate.getIn(['leaveconversionform', 'saveForm', 'errorCode']));
const makeShowErrorMessage = () => createSelector(selectLCFRequest, (substate) => substate.getIn(['leaveconversionform', 'saveForm', 'errorMessage']));
const makeSelectDate = () => createSelector(selectLCFRequest, (substate) => substate.getIn(['leaveconversionform', 'saveForm', 'Date']));
const makeSelectReferrencesList = () => createSelector(selectLCFRequest, (substate) => substate.getIn(['leaveconversionform', 'refslists', 'ObjectList']));

export {
  makeSelectLoading, makeSelectError, makeShowSuccessCode,
  makeShowSuccessMessage, makeShowErrorCode, makeShowErrorMessage,
  makeSelectDate, makeSelectUserData, makeSelectReferrencesList,
};
