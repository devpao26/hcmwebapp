import React from 'react';
import PropTypes from 'prop-types';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare, faWindowClose } from '@fortawesome/fontawesome-free-regular';

/* Loading Indicator */
import Loading from 'components/LoadingIndicator/Loading';

/* User Components */
import Status from 'components/User/Status';

/* Lists */
import RequirementList from 'components/Lists/RequirementList';
import ToggleSwitch from 'components/StyleUtils/ToggleSwitch';

import Button from 'components/Button';
import UploadFile from './UploadFile';
import Note from './Note';
import MarkAs from './MarkAs';

import {
  PREEMPSTATUS_FORAPPROVAL,
  PREEMPSTATUS_APPROVED,
  PREEMPSTATUS_DISAPPROVED } from '../constants';

class PPEReqRefList extends React.PureComponent {
  render() {
    const {
      // refs,
      applReqListData,
      updateIsRequired,
      uploadFile,
      updateReqStatus,
      showUploadedFiles,
      migrate,
    } = this.props;

    if (applReqListData === false) {
      return <RequirementList><Loading /></RequirementList>;
    }

    const joAttachsList = applReqListData[0].JOAttachsList;
    const PreEmpApplReqsList = applReqListData[0].PreEmpApplReqsList;

    // Iterate our Requirement List
    const reqItems = PreEmpApplReqsList.map((item) => (
      <dl key={item.PreEmpReqID}>
        <dd>
          <Status className={item.IsRequired ? 'Active' : ''} />
        </dd>
        <dd>
          <p>{item.PreEmpReq.Name}</p>
          { (item.PreEmpReqStatusID === PREEMPSTATUS_APPROVED)
            ? <ToggleSwitch hide value={item.IsRequired} />
            : <ToggleSwitch ReqId={item.PreEmpReqID} update={updateIsRequired} value={item.IsRequired} />
          }
        </dd>
        <dd className="col-3">
          <p className="file-count">
            { (item.PreEmpApplReqAttachsList.length !== 0 && item.IsRequired === true) && <span className="files">{item.PreEmpApplReqAttachsList.length} File(s)</span> }
          </p>
          <div className="upload-container">
            { (item.PreEmpApplReqAttachsList.length === 0 && item.IsRequired === true)
              && <UploadFile onChange={uploadFile} reqId={item.PreEmpApplReqID} fileTypes=".png, .jpg, .jpeg, .pdf, .doc, .docx" value={false} />
            }
            { (item.PreEmpApplReqAttachsList.length !== 0 && item.IsRequired === true)
              && <button className="view-file" onClick={showUploadedFiles} data-attachid={item.PreEmpApplReqID}>Click here to view file(s)</button>
            }
          </div>
        </dd>
        <dd>
          { (item.PreEmpReqStatusID === PREEMPSTATUS_FORAPPROVAL && item.PreEmpApplReqAttachsList.length > 0 && item.IsRequired === true)
            && <MarkAs onClick={updateReqStatus} data-reqid={item.PreEmpReqID}><FontAwesomeIcon icon={faSquare} /></MarkAs>
          }
          { (item.PreEmpReqStatusID === PREEMPSTATUS_APPROVED)
            && <MarkAs data-reqid={item.PreEmpReqID}><FontAwesomeIcon icon={faCheckSquare} /></MarkAs>
          }
          { (item.PreEmpReqStatusID === PREEMPSTATUS_DISAPPROVED)
            && <MarkAs data-reqid={item.PreEmpReqID}><FontAwesomeIcon icon={faWindowClose} /></MarkAs>
          }
        </dd>
      </dl>
    ));

    return (
      <RequirementList>
        <dl>
          <dd>
            <Status className="Active" />
          </dd>
          <dd>
            <p>Job Offer</p>
            <ToggleSwitch value hide />
          </dd>
          <dd className="col-3">
            <p className="file-count">
              {(joAttachsList && joAttachsList.length > 0) && <span className="files">1 File</span>}
            </p>
            <div className="upload-container">
              { (joAttachsList && joAttachsList.length !== 0)
                ? <button className="view-file" onClick={showUploadedFiles} data-attachid="joAttach">Click here to view file(s)</button>
                : (<UploadFile onChange={uploadFile} fileTypes=".pdf" reqId={applReqListData[0].JOStatusID} value />)
              }
            </div>
          </dd>
          <dd>&nbsp;</dd>
        </dl>
        {reqItems}
        { (applReqListData[0].TotalRequiredCount === 0 && applReqListData[0].PendingRequiredCount === 0 && joAttachsList.length === 0)
          ? <p className="total-completion">Total Completion Progress: <span className="complete">0%</span></p>
          : <p className="total-completion">Total Completion Progress: <span className="complete">{applReqListData[0].CompletionRate}%</span></p>
        }
        { (applReqListData[0].CompletionRate === 100 && joAttachsList.length > 0 && applReqListData[0].IsMigrated === false) && <Button color="green" handleRoute={migrate}>PROCESS AS EMPLOYEE</Button>}
        <Note>Note: You can select multiple files when uploading</Note>
      </RequirementList>
    );
  }
}

PPEReqRefList.propTypes = {
  // refs: PropTypes.array,
  applReqListData: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  updateIsRequired: PropTypes.func,
  uploadFile: PropTypes.func,
  updateReqStatus: PropTypes.func,
  showUploadedFiles: PropTypes.func,
  migrate: PropTypes.func,
};

export default PPEReqRefList;
