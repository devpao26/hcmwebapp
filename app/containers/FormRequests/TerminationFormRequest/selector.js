/**
 * App Selectors
 */

import { createSelector } from 'reselect';

const selectFormRequest = (state) => state.get('Forms');

const makeSelectEmployeeID = () => createSelector(selectFormRequest, (substate) => substate.getIn(['terminationform', 'submitForm', 'Employeeid']));
const makeSelectNote = () => createSelector(selectFormRequest, (substate) => substate.getIn(['terminationform', 'submitForm', 'Note']));
const makeSelectAttachments = () => createSelector(selectFormRequest, (substate) => substate.getIn(['terminationform', 'submitForm', 'Attachments']));
const makeSelectErrorToTrue = () => createSelector(selectFormRequest, (substate) => substate.getIn(['terminationform', 'submitForm', 'requestRespError']));
const makeSelectSuccessToTrue = () => createSelector(selectFormRequest, (substate) => substate.getIn(['terminationform', 'submitForm', 'requestRespSuccess']));

const makeSelectLoading = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['terminationform', list, 'loading']));
const makeSelectError = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['terminationform', list, 'error']));
const makeSelectSuccess = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['terminationform', list, 'success']));
const makeSelectObjectList = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['terminationform', list, 'ObjectList']));
const makeSelectPageDetails = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['terminationform', list, 'PageDetails']));
const makeSelectPageIndex = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['terminationform', list, 'PageIndex']));
const makeSelectSearch = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['terminationform', list, 'search']));

export {
  makeSelectLoading, makeSelectError, makeSelectSuccess,
  makeSelectObjectList, makeSelectPageDetails, makeSelectPageIndex, makeSelectEmployeeID,
  makeSelectSearch, makeSelectNote, makeSelectAttachments, makeSelectErrorToTrue, makeSelectSuccessToTrue,
};
