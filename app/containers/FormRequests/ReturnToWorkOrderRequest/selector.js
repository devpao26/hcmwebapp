/**
 * IRF - Incident Report Form selectors
 */

import { createSelector } from 'reselect';

const selectRTWOForms = (state) => state.get('Forms');

const makeSelectRTWOTypeId = () => createSelector(selectRTWOForms, (substate) => substate.getIn(['rtwoforms', 'submitForm', 'rtwoTypeID']));
const makeSelectEmployeeID = () => createSelector(selectRTWOForms, (substate) => substate.getIn(['rtwoforms', 'submitForm', 'Employeeid']));
const makeSelectReason = () => createSelector(selectRTWOForms, (substate) => substate.getIn(['rtwoforms', 'submitForm', 'Reason']));
const makeSelectRequestDate = () => createSelector(selectRTWOForms, (substate) => substate.getIn(['rtwoforms', 'submitForm', 'Requestdate']));
const makeSelectRequestTime = () => createSelector(selectRTWOForms, (substate) => substate.getIn(['rtwoforms', 'submitForm', 'Requesttime']));
const makeSelectSuccessResponse = () => createSelector(selectRTWOForms, (substate) => substate.getIn(['rtwoforms', 'submitForm', 'success']));
const makeSelectErrorResponse = () => createSelector(selectRTWOForms, (substate) => substate.getIn(['rtwoforms', 'submitForm', 'error']));
const makeSelectErrorToTrue = () => createSelector(selectRTWOForms, (substate) => substate.getIn(['rtwoforms', 'submitForm', 'requestRespError']));
const makeSelectSuccessToTrue = () => createSelector(selectRTWOForms, (substate) => substate.getIn(['rtwoforms', 'submitForm', 'requestRespSuccess']));

const makeSelectLoading = (list) => createSelector(selectRTWOForms, (substate) => substate.getIn(['rtwoforms', list, 'loading']));
const makeSelectError = (list) => createSelector(selectRTWOForms, (substate) => substate.getIn(['rtwoforms', list, 'error']));
const makeSelectSuccess = (list) => createSelector(selectRTWOForms, (substate) => substate.getIn(['rtwoforms', list, 'success']));
const makeSelectObjectList = (list) => createSelector(selectRTWOForms, (substate) => substate.getIn(['rtwoforms', list, 'ObjectList']));
const makeSelectPageDetails = (list) => createSelector(selectRTWOForms, (substate) => substate.getIn(['rtwoforms', list, 'PageDetails']));
const makeSelectPageIndex = (list) => createSelector(selectRTWOForms, (substate) => substate.getIn(['rtwoforms', list, 'PageIndex']));
const makeSelectSearch = (list) => createSelector(selectRTWOForms, (substate) => substate.getIn(['rtwoforms', list, 'search']));

export {
  makeSelectLoading, makeSelectError, makeSelectSuccess,
  makeSelectObjectList, makeSelectPageDetails, makeSelectPageIndex,
  makeSelectSearch, makeSelectRTWOTypeId, makeSelectEmployeeID,
  makeSelectReason, makeSelectRequestDate, makeSelectRequestTime,
  makeSelectSuccessResponse, makeSelectErrorResponse, makeSelectErrorToTrue, makeSelectSuccessToTrue,
};
