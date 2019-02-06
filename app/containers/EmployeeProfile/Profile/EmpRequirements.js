/**
 * Employment Requirements
 * @prop {object} lists    List of the employee requirements passed
 */
import React from 'react';
import PropTypes from 'prop-types';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/fontawesome-free-regular';

function EmpRequirements(props) {
  let jolist;
  let ppelist;
  if (props.lists) {
    const joAttachs = props.lists[0].JOAttachsList;
    const ppeAttachs = props.lists[0].PreEmpApplReqsList;

    jolist = joAttachs.map((jo) => (
      <p key={jo.JOAttachID}>
        <FontAwesomeIcon icon={faCopy} />
        <span>{jo.FileName}</span>
        <a title="Download File" href={jo.Path} target="_blank">Download</a>
      </p>
    ));

    ppelist = ppeAttachs.map((ppe) => {
      const ppeattach = ppe.PreEmpApplReqAttachsList;
      const ppes = ppeattach.map((p) => (
        <p key={p.ApplReqAttachID}>
          <FontAwesomeIcon icon={faCopy} />
          <span>{p.FileName}</span>
          <a title="Download File" href={p.Path} target="_blank">Download</a>
        </p>
      ));
      return ppes;
    });
  }
  return (
    <div className="tab-content emp-requirements">
      {!props.lists && <div className="text-center">No File(s) Found.</div>}
      {jolist}
      {ppelist}
      {/* <p>
        <FontAwesomeIcon icon={faCopy} />
        <span>Resume.docx</span>
        <button title="View File" onClick={() => { alert('download link'); }}>View</button>
      </p>
      <p>
        <FontAwesomeIcon icon={faCopy} />
        <span>Resume.docx</span>
        <button title="View File" onClick={() => { alert('download link'); }}>View</button>
      </p>
      <p>
        <FontAwesomeIcon icon={faCopy} />
        <span>Resume.docx</span>
        <button title="View File" onClick={() => { alert('download link'); }}>View</button>
      </p>
      <p>
        <FontAwesomeIcon icon={faCopy} />
        <span>Resume.docx</span>
        <button title="View File" onClick={() => { alert('download link'); }}>View</button>
      </p>
      <p>
        <FontAwesomeIcon icon={faCopy} />
        <span>Resume.docx</span>
        <button title="View File" onClick={() => { alert('download link'); }}>View</button>
      </p> */}
    </div>
  );
}

EmpRequirements.propTypes = {
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

export default EmpRequirements;
