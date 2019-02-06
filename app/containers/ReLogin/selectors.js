/**
 * ReLogin selectors
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the ReLogin state domain
 */
const selectReloginDomain = (state) => state.get('ReLogin', initialState);

/**
 * Default selectors used by ReLogin
 */
const makeSelectReloginToggleModal = () => createSelector(
  selectReloginDomain,
  (substate) => substate.get('isToggleRelogin')
);

const makeSelectReloginUsername = () => createSelector(
  selectReloginDomain,
  (substate) => substate.getIn(['relogin', 'username'])
);

const makeSelectReloginPassword = () => createSelector(
  selectReloginDomain,
  (substate) => substate.getIn(['relogin', 'password'])
);

const makeSelectReloginLoading = () => createSelector(
  selectReloginDomain,
  (substate) => substate.getIn(['relogin', 'loading'])
);

const makeSelectReloginError = () => createSelector(
  selectReloginDomain,
  (substate) => substate.getIn(['relogin', 'error'])
);

const makeSelectReloginSuccess = () => createSelector(
  selectReloginDomain,
  (substate) => substate.getIn(['relogin', 'success'])
);

const makeSelectReloginTitle = () => createSelector(
  selectReloginDomain,
  (substate) => substate.getIn(['relogin', 'title'])
);

const makeSelectReloginMessage = () => createSelector(
  selectReloginDomain,
  (substate) => substate.getIn(['relogin', 'message'])
);

export {
  selectReloginDomain,
  makeSelectReloginToggleModal,
  makeSelectReloginUsername,
  makeSelectReloginPassword,
  makeSelectReloginLoading,
  makeSelectReloginError,
  makeSelectReloginSuccess,
  makeSelectReloginTitle,
  makeSelectReloginMessage,
};
