/**
 * COE Form selectors
 */

import { createSelector } from 'reselect';

const selectCOERequestForms = (state) => state.get('Forms');

const makeSelectLoading = () => createSelector(selectCOERequestForms, (substate) => substate.getIn(['coeforms', 'saveForms', 'loading']));
const makeSelectError = () => createSelector(selectCOERequestForms, (substate) => substate.getIn(['coeforms', 'saveForms', 'error'], ['coeforms', 'reflist', 'error']));
const makeShowSuccessCode = () => createSelector(selectCOERequestForms, (substate) => substate.getIn(['coeforms', 'saveForms', 'successCode']));
const makeShowSuccessMessage = () => createSelector(selectCOERequestForms, (substate) => substate.getIn(['coeforms', 'saveForms', 'successMessage']));
const makeShowErrorCode = () => createSelector(selectCOERequestForms, (substate) => substate.getIn(['coeforms', 'saveForms', 'errorCode']));
const makeShowErrorMessage = () => createSelector(selectCOERequestForms, (substate) => substate.getIn(['coeforms', 'saveForms', 'errorMessage']));
const makeShowDescription = () => createSelector(selectCOERequestForms, (substate) => substate.getIn(['coeforms', 'saveForms', 'description']));
const makeShowTypeID = () => createSelector(selectCOERequestForms, (substate) => substate.getIn(['coeforms', 'saveForms', 'typeID']));
const makeCustomInputType = () => createSelector(selectCOERequestForms, (substate) => substate.getIn(['coeforms', 'saveForms', 'customInput']));
const makeShowCOEtypeList = () => createSelector(selectCOERequestForms, (substate) => substate.getIn(['coeforms', 'reflist', 'ObjectList']));

export {
  makeSelectLoading, makeSelectError, makeShowSuccessCode,
  makeShowSuccessMessage, makeShowErrorCode, makeShowErrorMessage,
  makeShowDescription, makeShowTypeID, makeShowCOEtypeList,
  makeCustomInputType,
};
