/**
 * Home selectors
 */

import { createSelector } from 'reselect';

const selectHomePage = (state) => state.get('home');

const makeSelectData = (list) => createSelector(
  selectHomePage,
  (substate) => substate.getIn(list, 'data')
);

const makeSelectPages = (list) => createSelector(
  selectHomePage,
  (substate) => substate.getIn(list, 'pages')
);

const makeSelectPageIndex = (list) => createSelector(
  selectHomePage,
  (substate) => substate.getIn(list, 'pageIndex')
);

const makeSelectSuccess = (list) => createSelector(
  selectHomePage,
  (substate) => substate.getIn([list, 'success'])
);

const makeSelectList = (list) => createSelector(
  selectHomePage,
  (substate) => substate.get(list)
);

const makeSelectRefs = (refs) => createSelector(
  selectHomePage,
  (substate) => substate.getIn(['refsList', refs])
);

export {
  selectHomePage,
  makeSelectData,
  makeSelectPages,
  makeSelectPageIndex,
  makeSelectSuccess,
  makeSelectList,
  makeSelectRefs,
};
