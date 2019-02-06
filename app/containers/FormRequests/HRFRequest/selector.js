/**
 * App Selectors
*/
import { createSelector } from 'reselect';

const selectFormRequest = (state) => state.get('Forms');
const makeSelectLoading = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['hrfrequests', list, 'loading']));
const makeSelectSuccess = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['hrfrequests', list, 'success']));
const makeSelectError = (list) => createSelector(selectFormRequest, (substate) => substate.getIn(['hrfrequests', list, 'error']));

const makeSelectSaveFormData = () => createSelector(selectFormRequest, (substate) => substate.getIn(['hrfrequests', 'submitForm', 'saveData']));
const makeSelectErrorToTrue = () => createSelector(selectFormRequest, (substate) => substate.getIn(['hrfrequests', 'submitForm', 'requestRespError']));
const makeSelectSuccessToTrue = () => createSelector(selectFormRequest, (substate) => substate.getIn(['hrfrequests', 'submitForm', 'requestRespSuccess']));

export { makeSelectLoading, makeSelectError, makeSelectSuccess, makeSelectErrorToTrue, makeSelectSuccessToTrue, makeSelectSaveFormData };
