import { createSelector } from 'reselect';

/**
 * Direct selector to the employeeProfile SHIFTSUMM state domain
 */
const selectSHIFTSUMMState = (state) => state.get('EMPProfSHIFTSUMM');

/**
 * Other specific selectors
 */

const makeSelectSHIFTSUMMListLoading = () => createSelector(
  selectSHIFTSUMMState,
  (substate) => substate.getIn(['shiftsummList', 'loading'])
);

const makeSelectSHIFTSUMMListError = () => createSelector(
  selectSHIFTSUMMState,
  (substate) => substate.getIn(['shiftsummList', 'error'])
);

const makeSelectSHIFTSUMMDatas = () => createSelector(
  selectSHIFTSUMMState,
  (substate) => substate.getIn(['shiftsummList', 'data'])
);

const makeSelectSHIFTSUMMPages = () => createSelector(
  selectSHIFTSUMMState,
  (substate) => substate.getIn(['shiftsummList', 'pages'])
);

const makeSelectSHIFTSUMMPageIndex = () => createSelector(
  selectSHIFTSUMMState,
  (substate) => substate.getIn(['shiftsummList', 'pageIndex'])
);

const makeSelectSHIFTSUMMSelItem= () => createSelector(
  selectSHIFTSUMMState,
  (substate) => substate.getIn(['shiftsummList', 'selectedItem'])
);

const makeSelectSHIFTSUMMFilter = () => createSelector(
  selectSHIFTSUMMState,
  (substate) => substate.getIn(['shiftsummList', 'filter'])
);

export {
  selectSHIFTSUMMState,
  makeSelectSHIFTSUMMListLoading,
  makeSelectSHIFTSUMMListError,
  makeSelectSHIFTSUMMDatas,
  makeSelectSHIFTSUMMPages,
  makeSelectSHIFTSUMMPageIndex,
  makeSelectSHIFTSUMMFilter,
  makeSelectSHIFTSUMMSelItem,
};
