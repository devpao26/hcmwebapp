/**
 * OnBoarding selectors
 */

import { createSelector } from 'reselect';

const selectHRadmin = (state) => state.get('hradmin');

/**
 * Default selector used by selectOnBoarding
 */
const makeSelectLoading = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['onBoardingList', 'onBoarding', 'loading'])
);

const makeSelectError = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['onBoardingList', 'onBoarding', 'error'])
);

const makeSelectData = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['onBoardingList', 'onBoarding', 'ObjectList'])
);

const makeSelectPageDetails = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['onBoardingList', 'onBoarding', 'PageDetails'])
);

const makeSelectPageIndex = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['onBoardingList', 'onBoarding', 'PageIndex'])
);

const makeSelectRedirect = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['onBoardingList', 'redirect'])
);

const makeSelectJobId = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['onBoardingList', 'joIds', 'jobId'])
);

const makeSelectJoStatId = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['onBoardingList', 'joIds', 'joStatId'])
);

const makeSelectNotifState = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['onBoardingList', 'isSuccessNotif'])
);

const makeSelectJoStatus = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['onBoardingList', 'onBoarding', 'JoStatus'])
);

const makeSelectSearchLocation = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['onBoardingList', 'onBoarding', 'SearchFilter', 'location'])
);

const makeSelectSearchValue = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['onBoardingList', 'onBoarding', 'SearchFilter', 'value'])
);

// export default makeSelectTestPage;
export {
  selectHRadmin,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPageDetails,
  makeSelectPageIndex,
  makeSelectRedirect,
  makeSelectJobId,
  makeSelectJoStatId,
  makeSelectNotifState,
  makeSelectJoStatus,
  makeSelectSearchLocation,
  makeSelectSearchValue,
};
