/**
 * Employee MasterList selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Select Emp MasterList state domain
 */
const selectEmpMasterListState = (state) => state.get('EmpMasterList', initialState);

/**
 * Other selectors
 */
const makeSelectLoading = () => createSelector(
  selectEmpMasterListState,
  (substate) => substate.get('loading')
);

const makeSelectError = () => createSelector(
  selectEmpMasterListState,
  (substate) => substate.get('error')
);

const makeSelectData = () => createSelector(
  selectEmpMasterListState,
  (substate) => substate.get('data')
);

const makeSelectPages = () => createSelector(
  selectEmpMasterListState,
  (substate) => substate.get('pages')
);

const makeSelectRequestBody = () => createSelector(
  selectEmpMasterListState,
  (substate) => substate.get('requestBody')
);

export {
  selectEmpMasterListState,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPages,
  makeSelectRequestBody,
};
