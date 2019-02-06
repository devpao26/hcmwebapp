/**
 * App Selectors
 */

import { createSelector } from 'reselect';

const selectFormRequest = (state) => state.get('Forms');

const makeSelectEmployeeID = () => createSelector(selectFormRequest, (substate) => substate.getIn(['showcausememoforms', 'submitForm', 'Employeeid']));
const makeSelectReason = () => createSelector(selectFormRequest, (substate) => substate.getIn(['showcausememoforms', 'submitForm', 'Reason']));
const makeSelectIncidentDate = () => createSelector(selectFormRequest, (substate) => substate.getIn(['showcausememoforms', 'submitForm', 'IncidentDate']));
const makeSelectPossibleSanction = () => createSelector(selectFormRequest, (substate) => substate.getIn(['showcausememoforms', 'submitForm', 'PossibleSanction']));
const makeSelectPossibleRuleValidation = () => createSelector(selectFormRequest, (substate) => substate.getIn(['showcausememoforms', 'submitForm', 'PossibleRuleValidation']));
const makeSelectEmployee = () => createSelector(selectFormRequest, (substate) => substate.getIn(['showcausememoforms', 'submitForm', 'Employees']));

const makeSelectLoading = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['showcausememoforms', list, 'loading']));
const makeSelectError = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['showcausememoforms', list, 'error']));
const makeSelectSuccess = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['showcausememoforms', list, 'success']));
const makeSelectErrorToTrue = () => createSelector(selectFormRequest, (substate) => substate.getIn(['showcausememoforms', 'submitForm', 'requestRespError']));
const makeSelectSuccessToTrue = () => createSelector(selectFormRequest, (substate) => substate.getIn(['showcausememoforms', 'submitForm', 'requestRespSuccess']));
const makeSelectObjectList = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['showcausememoforms', list, 'ObjectList']));
const makeSelectPageDetails = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['showcausememoforms', list, 'PageDetails']));
const makeSelectPageIndex = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['showcausememoforms', list, 'PageIndex']));
const makeSelectSearch = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['showcausememoforms', list, 'search']));

const makeSelectReferrences = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['showcausememoforms', list, 'ObjectList']));

export {
  makeSelectLoading, makeSelectError, makeSelectSuccess, makeSelectErrorToTrue, makeSelectSuccessToTrue,
  makeSelectObjectList, makeSelectPageDetails, makeSelectPageIndex, makeSelectEmployeeID,
  makeSelectSearch, makeSelectReason, makeSelectIncidentDate, makeSelectPossibleSanction, makeSelectPossibleRuleValidation,
  makeSelectEmployee, makeSelectReferrences,
};
