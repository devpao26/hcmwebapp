/**
 * Toaster Selectors
 */
import { createSelector } from 'reselect';

const selectToasterDomain = (state) => state.get('toaster');

const makeSelectToaster = () => createSelector(
  selectToasterDomain,
  (substate) => substate.get('toggleToaster')
);

const makeSelectToastData = () => createSelector(
  selectToasterDomain,
  (substate) => substate.get('toasterData')
);

export {
  selectToasterDomain,
  makeSelectToaster,
  makeSelectToastData,
};
