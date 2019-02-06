/**
 * Personal Information Component
 * @prop {object} info      Object of the employee personal information
 * @prop {func}   showEdit  Edit profile function
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/fontawesome-free-solid';

import { parseDate } from 'components/Methods';
import DateFormat from 'components/Enums/DateFormat';

function PersonalInformation(props) {
  const { info } = props;
  return (
    <div className="tab-content personal-info">
      <a className="edit-prof" title="Edit Profile" role="presentation" onClick={props.showEdit}>Edit Profile <FontAwesomeIcon icon={faEdit} /></a>
      <p>
        <span>Date Hired</span>
        <span>{info.DateHired !== '' ? parseDate(info.DateHired, DateFormat.Long, false, '/') : '-'}</span>
      </p>
      <p>
        <span>Birthday</span>
        <span>{info.BirthDate ? parseDate(info.BirthDate, DateFormat.Long, false, '-') : '-'}</span>
      </p>
      <p>
        <span>Gender</span>
        <span>{info.Gender.Gender}</span>
      </p>
      <p>
        <span>Address</span>
        <span>{info.EmpAddress && info.EmpAddress.length > 0 ? `${info.EmpAddress[0].StreetSubd} ${info.EmpAddress[0].Brgy} ${info.EmpAddress[0].City}` : 'No Address on record.'}</span>
      </p>
      {/* <p>
        <span>Phone Number</span>
        <span>+63 2 338-4574</span>
      </p> */}
      <p>
        <span>Mobile Number</span>
        <span>{info.Mobile ? info.Mobile : '-'}</span>
      </p>
      <p>
        <span>SSS Number</span>
        <span>{info.SSSNumber ? info.SSSNumber : '-'}</span>
      </p>
      <p>
        <span>TIN Number</span>
        <span>{info.TinNumber ? info.TinNumber : '-'}</span>
      </p>
      <p>
        <span>PhilHealth Number</span>
        <span>{info.PhilHealthNumber ? info.PhilHealthNumber : '-'}</span>
      </p>
      <p>
        <span>HDMF Number</span>
        <span>{info.HDMFNumber ? info.HDMFNumber : '-'}</span>
      </p>
    </div>
  );
}

PersonalInformation.propTypes = {
  info: PropTypes.object,
  showEdit: PropTypes.func,
};

export default PersonalInformation;
