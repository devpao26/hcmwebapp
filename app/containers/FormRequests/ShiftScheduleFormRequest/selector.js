/**
 * App Selectors
 */

import { createSelector } from 'reselect';

const selectShiftRequestForms = (state) => state.get('Forms');

const selectGlobal = (state) => state.get('global');

const makeSelectUserData = () => createSelector(selectGlobal, (substate) => substate.getIn(['userData']));


const makeSelectLoading = (list) => createSelector(selectShiftRequestForms, (substate) => substate.getIn(['shiftforms', list, 'loading']));
const makeSelectError = (list) => createSelector(selectShiftRequestForms, (substate) => substate.getIn(['shiftforms', list, 'error']));
const makeSelectSuccess = (list) => createSelector(selectShiftRequestForms, (substate) => substate.getIn(['shiftforms', list, 'success']));
const makeSelectObjectList = (list) => createSelector(selectShiftRequestForms, (substate) => substate.getIn(['shiftforms', list, 'ObjectList']));
const makeSelectPageDetails = (list) => createSelector(selectShiftRequestForms, (substate) => substate.getIn(['shiftforms', list, 'PageDetails']));
const makeSelectPageIndex = (list) => createSelector(selectShiftRequestForms, (substate) => substate.getIn(['shiftforms', list, 'PageIndex']));
const makeSelectSearch = (list) => createSelector(selectShiftRequestForms, (substate) => substate.getIn(['shiftforms', list, 'search']));

const makeSelectRequestDefaultID = () => createSelector(selectShiftRequestForms, (substate) => substate.getIn(['shiftforms', 'saveRequest', 'defaultID']));
const makeSelectRequestEmployeeID = () => createSelector(selectShiftRequestForms, (substate) => substate.getIn(['shiftforms', 'saveRequest', 'employeeID']));
const makeSelectRequestShiftID = () => createSelector(selectShiftRequestForms, (substate) => substate.getIn(['shiftforms', 'saveRequest', 'shiftID']));
const makeSelectRequestDateFrom = () => createSelector(selectShiftRequestForms, (substate) => substate.getIn(['shiftforms', 'saveRequest', 'dateFrom']));
const makeSelectRequestDateTo = () => createSelector(selectShiftRequestForms, (substate) => substate.getIn(['shiftforms', 'saveRequest', 'dateTo']));
const makeSelectRequestAnotherEmp = () => createSelector(selectShiftRequestForms, (substate) => substate.getIn(['shiftforms', 'saveRequest', 'requestAnotherEmp']));

const makeSelectSuccessResponse = () => createSelector(selectShiftRequestForms, (substate) => substate.getIn(['shiftforms', 'saveRequest', 'success']));
const makeSelectSuccessToTrue = () => createSelector(selectShiftRequestForms, (substate) => substate.getIn(['shiftforms', 'saveRequest', 'requestRespSuccess']));
const makeSelectErrorResponse = () => createSelector(selectShiftRequestForms, (substate) => substate.getIn(['shiftforms', 'saveRequest', 'error']));
const makeSelectErrorToTrue = () => createSelector(selectShiftRequestForms, (substate) => substate.getIn(['shiftforms', 'saveRequest', 'requestRespError']));

export {
  makeSelectUserData, makeSelectLoading, makeSelectError, makeSelectSuccess,
  makeSelectObjectList, makeSelectPageDetails, makeSelectPageIndex,
  makeSelectSearch, makeSelectRequestDefaultID, makeSelectRequestEmployeeID, makeSelectRequestShiftID,
  makeSelectRequestDateFrom, makeSelectRequestDateTo, makeSelectRequestAnotherEmp,
  makeSelectSuccessResponse, makeSelectErrorResponse, makeSelectErrorToTrue, makeSelectSuccessToTrue,
};
