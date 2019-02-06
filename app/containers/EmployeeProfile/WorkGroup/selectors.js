import { createSelector } from 'reselect';

/**
 * Direct selector to the employeeProfile WG state domain
 */
const selectWGState = (state) => state.get('EMPProfWG');

/**
 * WGher specific selectors
 */

const makeSelectWGListLoading = () => createSelector(
  selectWGState,
  (substate) => substate.getIn(['wgList', 'loading'])
);

const makeSelectWGListError = () => createSelector(
  selectWGState,
  (substate) => substate.getIn(['wgList', 'error'])
);

const makeSelectWGDatas = () => createSelector(
  selectWGState,
  (substate) => substate.getIn(['wgList', 'data'])
);

const makeSelectWGPages = () => createSelector(
  selectWGState,
  (substate) => substate.getIn(['wgList', 'pages'])
);

const makeSelectWGPageIndex = () => createSelector(
  selectWGState,
  (substate) => substate.getIn(['wgList', 'pageIndex'])
);

const makeSelectWGSelItem= () => createSelector(
  selectWGState,
  (substate) => substate.getIn(['wgList', 'selectedItem'])
);

const makeSelectWGFilter = () => createSelector(
  selectWGState,
  (substate) => substate.getIn(['wgList', 'filter'])
);

export {
  selectWGState,
  makeSelectWGListLoading,
  makeSelectWGListError,
  makeSelectWGDatas,
  makeSelectWGPages,
  makeSelectWGPageIndex,
  makeSelectWGFilter,
  makeSelectWGSelItem,
};
