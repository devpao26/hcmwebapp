/**
 * Loginpage selectors
 */

import { createSelector } from 'reselect';

const selectGlobalDomain = (state) => state.get('global');

const makeSelectAuthentication = () => createSelector(
  selectGlobalDomain,
  (loginState) => loginState.get('isAuthenticated')
);

const makeSelectUsername = () => createSelector(
  selectGlobalDomain,
  (loginState) => loginState.get('Username')
);

const makeSelectPassword = () => createSelector(
  selectGlobalDomain,
  (loginState) => loginState.get('Password')
);

const makeSelectUpdatePasswordOld = () => createSelector(
  selectGlobalDomain,
  (loginState) => loginState.getIn(['passwordUpdate', 'oldPassword'])
);

const makeSelectUpdatePasswordNew = () => createSelector(
  selectGlobalDomain,
  (loginState) => loginState.getIn(['passwordUpdate', 'newPassword'])
);

const makeSelectUpdatePasswordEmail = () => createSelector(
  selectGlobalDomain,
  (loginstate) => loginstate.getIn(['passwordUpdate', 'email'])
);

const makeSelectUpdatePasswordSuccess = () => createSelector(
  selectGlobalDomain,
  (loginstate) => loginstate.getIn(['passwordUpdate', 'success'])
);

export {
  selectGlobalDomain,
  makeSelectAuthentication,
  makeSelectUsername,
  makeSelectPassword,
  makeSelectUpdatePasswordOld,
  makeSelectUpdatePasswordNew,
  makeSelectUpdatePasswordEmail,
  makeSelectUpdatePasswordSuccess,
};
