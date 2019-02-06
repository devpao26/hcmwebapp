/**
 * OnBoarding selectors
 */

import { createSelector } from 'reselect';

const selectHRadmin = (state) => state.get('pradmin');

/**
 * Default selector used by selectOnBoarding
 */
const makeSelectLoading = (list) => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['masterList', list, 'loading'])
);

const makeSelectError = (list) => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['masterList', list, 'error'])
);

const makeSelectData = (list) => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['masterList', list, 'data'])
);

const makeSelectPageDetails = (list) => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['masterList', list, 'pages'])
);

const makeSelectPageIndex = (list) => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['masterList', list, 'pageIndex'])
);

const makeSelectSearch = (list) => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['masterList', list, 'search'])
);

const makeSelectFilter = (list) => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['masterList', list, 'filter'])
);

const makeSelectSuccess = (list) => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['masterList', list, 'success'])
);

// export default makeSelectTestPage;
export {
  selectHRadmin,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPageDetails,
  makeSelectPageIndex,
  makeSelectSearch,
  makeSelectFilter,
  makeSelectSuccess,
};
