import { createSelector } from 'reselect';

// Global State Selector
const selectGlobal = (state) => state.get('global');

// Route State Selector
const selectRoute = (state) => state.get('route');

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectUserInfo = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('userData')
);

const makeSelectToken = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('token')
);

const makeSelectAuthenticated = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('isAuthenticated')
);

const makeSelectUsername = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('Username')
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (globalState) => globalState.get('location').toJS()
);

const makeSelectSessionExpired = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('isSessionExpired')
);

const makeSelectServerError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('isServerError')
);

const makeSelectIsUserLoggingOut = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('isUserLoggingOut')
);

const makeSelectAlertCount = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('alertCount')
);

const makeSelectNotifCount = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('notifCount')
);

// const makeSelectAccessDenied = () => createSelector(
//   selectGlobal,
//   (globalstate) => globalstate.get('isAccessDenied')
// );

export {
  selectGlobal,
  selectRoute,
  makeSelectLoading,
  makeSelectError,
  makeSelectUserInfo,
  makeSelectAuthenticated,
  makeSelectLocation,
  makeSelectToken,
  makeSelectUsername,
  makeSelectSessionExpired,
  makeSelectServerError,
  makeSelectIsUserLoggingOut,
  makeSelectAlertCount,
  makeSelectNotifCount,
};
