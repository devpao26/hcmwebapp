/**
 * Payroll Cutoff Template selectors
 */

import { createSelector } from 'reselect';

const selectPRadmin = (state) => state.get('pradmin');

/**
 * Default selector used by select Payroll Cut Off
 */
const makeSelectLoading = (list) => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['prCutOff', list, 'loading'])
);

const makeSelectError = (list) => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['prCutOff', list, 'error'])
);

const makeSelectData = (list) => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['prCutOff', list, 'data'])
);

const makeSelectPageDetails = (list) => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['prCutOff', list, 'pages'])
);

const makeSelectPageIndex = (list) => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['prCutOff', list, 'pageIndex'])
);

const makeSelectSearch = (list) => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['prCutOff', list, 'search'])
);

const makeSelectSortBy = (list) => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['prCutOff', list, 'sort'])
);

const makeSelectFilter = (list) => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['prCutOff', list, 'filter'])
);

const makeSelectID = (list) => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['prCutOff', list, 'id'])
);

const makeSelectSuccess = (list) => createSelector(
  selectPRadmin,
  (substate) => substate.getIn(['prCutOff', list, 'success'])
);

export {
  selectPRadmin,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPageDetails,
  makeSelectPageIndex,
  makeSelectSearch,
  makeSelectSortBy,
  makeSelectFilter,
  makeSelectID,
  makeSelectSuccess,
};
