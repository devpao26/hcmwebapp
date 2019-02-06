/**
 * OnBoarding selectors
 */

import { createSelector } from 'reselect';

const selectHRadmin = (state) => state.get('hradmin');

/**
 * Default selector used by Employee Master List
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
  (substate) => substate.getIn(['masterList', list, 'ObjectList'])
);

const makeSelectPageDetails = (list) => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['masterList', list, 'PageDetails'])
);

const makeSelectPageIndex = (list) => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['masterList', list, 'PageIndex'])
);

const makeSelectSearch = (list) => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['masterList', list, 'search'])
);

const makeSelectEmpID = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['masterList', 'empID'])
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
  makeSelectEmpID,
  makeSelectSuccess,
};
