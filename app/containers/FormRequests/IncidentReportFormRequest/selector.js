/**
 * App Selectors
 */

import { createSelector } from 'reselect';

const selectIRFForms = (state) => state.get('Forms');
const selectGlobal = (state) => state.get('global');

const makeSelectUserData = () => createSelector(selectGlobal, (substate) => substate.get('userData'));
const makeSelectLoading = () => createSelector(selectIRFForms, (substate) => substate.getIn(['irfforms', 'loading']));

const makeShowSuccessCode = () => createSelector(selectIRFForms, (substate) => substate.getIn(['irfforms', 'successCode']));
const makeShowSuccessMessage = () => createSelector(selectIRFForms, (substate) => substate.getIn(['irfforms', 'successMessage']));
const makeShowErrorCode = () => createSelector(selectIRFForms, (substate) => substate.getIn(['irfforms', 'errorCode']));
const makeShowErrorMessage = () => createSelector(selectIRFForms, (substate) => substate.getIn(['irfforms', 'errorMessage']));
const makeSelectIRFReferrences = () => createSelector(selectIRFForms, (substate) => substate.getIn(['irfforms', 'irfreferrences', 'ObjectList']));

const makeSelectIRFtypeid = () => createSelector(selectIRFForms, (substate) => substate.getIn(['irfforms', 'saveRequest', 'irfTypeID']));
const makeSelectRequestorEmpID = () => createSelector(selectIRFForms, (substate) => substate.getIn(['irfforms', 'saveRequest', 'requestorEmpID']));
const makeSelectReason = () => createSelector(selectIRFForms, (substate) => substate.getIn(['irfforms', 'saveRequest', 'Reason']));
const makeSelectRequesttime = () => createSelector(selectIRFForms, (substate) => substate.getIn(['irfforms', 'saveRequest', 'Requesttime']));
const makeSelectRequestlocation = () => createSelector(selectIRFForms, (substate) => substate.getIn(['irfforms', 'saveRequest', 'Requestlocation']));
const makeSelectRequestdate = () => createSelector(selectIRFForms, (substate) => substate.getIn(['irfforms', 'saveRequest', 'Requestdate']));
const makeSelectResponse = () => createSelector(selectIRFForms, (substate) => substate.getIn(['irfforms', 'saveRequest', 'response']));
const makeSelectAttachmentFiles = () => createSelector(selectIRFForms, (substate) => substate.getIn(['irfforms', 'saveRequest', 'attachmentFile']));

const makeSelectLoadingEmployee = () => createSelector(selectIRFForms, (substate) => substate.getIn(['irfforms', 'employeelists', 'loading']));
const makeSelectError = () => createSelector(selectIRFForms, (substate) => substate.getIn(['irfforms', 'employeelists', 'error']));
const makeSelectPageDetails = () => createSelector(selectIRFForms, (substate) => substate.getIn(['irfforms', 'employeelists', 'PageDetails']));
const makeSelectPageIndex = () => createSelector(selectIRFForms, (substate) => substate.getIn(['irfforms', 'employeelists', 'PageIndex']));
const makeUserSearchLists = () => createSelector(selectIRFForms, (substate) => substate.getIn(['irfforms', 'employeelists', 'searchData']));
const makeSelectEmployeeLists = () => createSelector(selectIRFForms, (substate) => substate.getIn(['irfforms', 'employeelists', 'ObjectList']));

export {
  makeSelectPageDetails, makeSelectPageIndex, makeUserSearchLists,
  makeSelectEmployeeLists, makeSelectLoading, makeSelectLoadingEmployee,
  makeSelectError, makeShowSuccessCode, makeShowSuccessMessage,
  makeShowErrorCode, makeShowErrorMessage, makeSelectUserData,
  makeSelectIRFReferrences, makeSelectIRFtypeid, makeSelectRequestorEmpID,
  makeSelectReason, makeSelectRequesttime, makeSelectRequestlocation,
  makeSelectRequestdate, makeSelectResponse, makeSelectAttachmentFiles,
};
