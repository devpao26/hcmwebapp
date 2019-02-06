/**
 * Transfer Selectors
 */
import { createSelector } from 'reselect';

/**
 * Direct selector to the transfer state domain
 */
const selectTransferDomain = (state) => state.get('TransferComp');

/**
 * Default selectors used by Transfer Component
 */
const makeSelectToggleTransfer = () => createSelector(
  selectTransferDomain,
  (substate) => substate.get('toggleTransfer')
);

const makeSelectEmpData = () => createSelector(
  selectTransferDomain,
  (substate) => substate.get('empData')
);

const makeSelectLoading = (list) => createSelector(
  selectTransferDomain,
  (substate) => substate.getIn([list, 'loading'])
);

const makeSelectError = (list) => createSelector(
  selectTransferDomain,
  (substate) => substate.getIn([list, 'error'])
);

const makeSelectData = (list) => createSelector(
  selectTransferDomain,
  (substate) => substate.getIn([list, 'data'])
);

const makeSelectSuccess = (list) => createSelector(
  selectTransferDomain,
  (substate) => substate.getIn([list, 'success'])
);

const makeSelectPageDetails = (list) => createSelector(
  selectTransferDomain,
  (substate) => substate.getIn([list, 'pages'])
);

const makeSelectPageIndex = (list) => createSelector(
  selectTransferDomain,
  (substate) => substate.getIn([list, 'pageIndex'])
);

const makeSelectSearch = (list) => createSelector(
  selectTransferDomain,
  (substate) => substate.getIn([list, 'search'])
);

const makeSelectID = (list) => createSelector(
  selectTransferDomain,
  (substate) => substate.getIn([list, 'id'])
);

const makeSelectIsTeam = (list) => createSelector(
  selectTransferDomain,
  (substate) => substate.getIn([list, 'isTeam'])
);


export {
  selectTransferDomain,
  makeSelectToggleTransfer,
  makeSelectEmpData,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectSuccess,
  makeSelectPageDetails,
  makeSelectPageIndex,
  makeSelectSearch,
  makeSelectID,
  makeSelectIsTeam,
};
