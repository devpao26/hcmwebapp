/**
 * Workgroup selectors
 */
import { createSelector } from 'reselect';

/**
 * Direct selector to the state domain
 */
const selectAssetsAllocations = (state) => state.get('AssetsAllocations');

/**
 * Default selectors used
 */
const makeSelectLoading = (list) => createSelector(
  selectAssetsAllocations,
  (substate) => substate.getIn(['assetsallocations', list, 'loading'])
);

const makeSelectError = (list) => createSelector(
  selectAssetsAllocations,
  (substate) => substate.getIn(['assetsallocations', list, 'error'])
);

const makeSelectData = (list) => createSelector(
  selectAssetsAllocations,
  (substate) => substate.getIn(['assetsallocations', list, 'data'])
);

const makeSelectPageIndex = (list) => createSelector(
  selectAssetsAllocations,
  (substate) => substate.getIn(['assetsallocations', list, 'pageIndex'])
);

const makeSelectPageDetails = (list) => createSelector(
  selectAssetsAllocations,
  (substate) => substate.getIn(['assetsallocations', list, 'pages'])
);

const makeSelectSearch = (list) => createSelector(
  selectAssetsAllocations,
  (substate) => substate.getIn(['assetsallocations', list, 'search'])
);

const makeSelectSuccess = (list) => createSelector(
  selectAssetsAllocations,
  (substate) => substate.getIn(['assetsallocations', list, 'success'])
);

const makeSelectID = (list) => createSelector(
  selectAssetsAllocations,
  (substate) => substate.getIn(['assetsallocations', list, 'id'])
);

const makeSelectEmpID = (list) => createSelector(
  selectAssetsAllocations,
  (substate) => substate.getIn(['assetsallocations', list, 'empID'])
);


export {
  selectAssetsAllocations,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPageIndex,
  makeSelectPageDetails,
  makeSelectSearch,
  makeSelectSuccess,
  makeSelectID,
  makeSelectEmpID,
};
