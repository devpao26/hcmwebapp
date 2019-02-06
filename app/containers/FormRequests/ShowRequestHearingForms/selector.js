/**
 * App Selectors
 */

import { createSelector } from 'reselect';

const selectFormRequest = (state) => state.get('Forms');

const makeSelectEmployeeID = () => createSelector(selectFormRequest, (substate) => substate.getIn(['showhearingform', 'submitForm', 'Employeeid']));
const makeSelectViolation = () => createSelector(selectFormRequest, (substate) => substate.getIn(['showhearingform', 'submitForm', 'Violation']));
const makeSelectSCMRequestID = () => createSelector(selectFormRequest, (substate) => substate.getIn(['showhearingform', 'submitForm', 'SCMRequestID']));
const makeSelectDateOfHearing = () => createSelector(selectFormRequest, (substate) => substate.getIn(['showhearingform', 'submitForm', 'DateOfHearing']));
const makeSelectHearingLocationID = () => createSelector(selectFormRequest, (substate) => substate.getIn(['showhearingform', 'submitForm', 'HearingLocID']));
const makeSelectEmployee = () => createSelector(selectFormRequest, (substate) => substate.getIn(['showhearingform', 'submitForm', 'Employees']));

const makeSelectErrorToTrue = () => createSelector(selectFormRequest, (substate) => substate.getIn(['showhearingform', 'submitForm', 'requestRespError']));
const makeSelectSuccessToTrue = () => createSelector(selectFormRequest, (substate) => substate.getIn(['showhearingform', 'submitForm', 'requestRespSuccess']));

const makeSelectLoading = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['showhearingform', list, 'loading']));
const makeSelectError = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['showhearingform', list, 'error']));
const makeSelectSuccess = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['showhearingform', list, 'success']));

const makeSelectObjectList = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['showhearingform', list, 'ObjectList']));
const makeSelectPageDetails = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['showhearingform', list, 'PageDetails']));
const makeSelectPageIndex = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['showhearingform', list, 'PageIndex']));
const makeSelectSearch = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['showhearingform', list, 'search']));

const makeSelectReferrences = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['showhearingform', list, 'ObjectList']));

const makeSelectEmpProfileID = () => createSelector(selectFormRequest, (substate) => substate.getIn(['showhearingform', 'approvedrefs', 'ApprovedID']));

export {
  makeSelectLoading, makeSelectError, makeSelectSuccess, makeSelectErrorToTrue, makeSelectSuccessToTrue,
  makeSelectObjectList, makeSelectPageDetails, makeSelectPageIndex, makeSelectEmployeeID,
  makeSelectSearch, makeSelectViolation, makeSelectSCMRequestID, makeSelectDateOfHearing,
  makeSelectHearingLocationID, makeSelectEmployee, makeSelectReferrences, makeSelectEmpProfileID,
};
