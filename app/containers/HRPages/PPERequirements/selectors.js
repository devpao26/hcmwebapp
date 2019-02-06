/**
 * PPE Requirements selectors
 */

import { createSelector } from 'reselect';

const selectHRadmin = (state) => state.get('hradmin');

/**
 * Default selector used by PPE Requirements Page
 */
const makeSelectLoading = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['ppeRequirements', 'loading'])
);

const makeSelectError = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['ppeRequirements', 'error'])
);

const makeSelectData = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['ppeRequirements', 'ppeList', 'ObjectList'])
);

const makeSelectPageDetails = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['ppeRequirements', 'ppeList', 'PageDetails'])
);

const makeSelectPageIndex = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['ppeRequirements', 'ppeList', 'PageIndex'])
);

const makeSelectApplJobId = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['ppeRequirements', 'applJobId'])
);

const makeSelectReqList = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['ppeRequirements', 'applReqList', 'ObjectList'])
);

const makeSelectIsRequiredId = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['ppeRequirements', 'applReqList', 'PreEmpReqID'])
);

const makeSelectIsRequiredBool = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['ppeRequirements', 'applReqList', 'isRequired'])
);

const makeSelectIfUploadIsJo = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['ppeRequirements', 'reqUploadFiles', 'joFiles'])
);

const makeSelectUploadFiles = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['ppeRequirements', 'reqUploadFiles', 'files'])
);

const makeSelectReqId = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['ppeRequirements', 'reqUploadFiles', 'reqId'])
);

const makeSelectReqStatId = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['ppeRequirements', 'reqUploadFiles', 'reqStatId'])
);

const makeSelectFileId = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['ppeRequirements', 'reqUploadFiles', 'fileId'])
);

const makeSelectAttachType = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['ppeRequirements', 'reqUploadFiles', 'attachType'])
);

const makeSelectMigrate = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['ppeRequirements', 'migrate'])
);

const makeSelectSearchLocation = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['ppeRequirements', 'ppeList', 'SearchFilter', 'location'])
);

const makeSelectSearchValue = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['ppeRequirements', 'ppeList', 'SearchFilter', 'value'])
);

const makeSelectUnprocessed = () => createSelector(
  selectHRadmin,
  (substate) => substate.getIn(['ppeRequirements', 'ppeList', 'Unprocessed'])
);

// export default makeSelectTestPage;
export {
  selectHRadmin,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectPageDetails,
  makeSelectPageIndex,
  makeSelectApplJobId,
  makeSelectReqList,
  makeSelectIsRequiredId,
  makeSelectIsRequiredBool,
  makeSelectIfUploadIsJo,
  makeSelectUploadFiles,
  makeSelectReqId,
  makeSelectReqStatId,
  makeSelectFileId,
  makeSelectAttachType,
  makeSelectMigrate,
  makeSelectSearchLocation,
  makeSelectSearchValue,
  makeSelectUnprocessed,
};
