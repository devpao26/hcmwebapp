/**
 * Profile Component (201)
 * @prop {object} profile   Employee profile details
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';

import Loading from 'components/LoadingIndicator/Loading';
import Section from 'components/SectionFlex/Section';
import UserProfile from 'components/User/UserProfile';
import UserDetails from 'components/User/UserDetails';
import OtherUserInfo from 'components/User/OtherUserInfo';
import Avatar from 'components/Img/Avatar';
import Confirm from 'components/ConfirmationDialog';
// import OptionMenu from 'components/OptionMenu';
import { parseDate } from 'components/Methods';
import DateFormat from 'components/Enums/DateFormat';

import Profile from './Profile';

/** actions, selectors, constants */
import { makeSelectLoading, makeSelectError, makeSelectData, makeSelectFormRefs, makeSelectApplRefs, makeSelectSuccess } from './selectors';
import { getUpdateEmpProf, getEmpProfile } from './actions';
import { UpdateProfile } from './constants';

class ProfileComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSeeMoreProfile: false,
      isUpdateProfileResponse: false,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.updateSuccess) {
      this.setState({
        isSeeMoreProfile: false,
        isUpdateProfileResponse: true,
      });
    }

    if (nextProps.updateError) {
      this.setState({
        isUpdateProfileResponse: true,
      });
    }
  }

  hideUpdateProfileResponse = () => {
    this.setState({
      isUpdateProfileResponse: false,
    });
    if (this.props.updateSuccess) {
      this.props.updateProfile(UpdateProfile.RESET, false);
      this.props.retrieveEmpProfile(this.props.empID);
    }
  }

  toggleSeeMoreProfile = () => {
    this.setState({
      isSeeMoreProfile: !this.state.isSeeMoreProfile,
    });
  }

  render() {
    const { loading, error, profile } = this.props;

    if (loading) {
      return (
        <Section className="expand fixed">
          <div className="loading-cont"><Loading /></div>
        </Section>
      );
    }

    if (error) {
      if (error.ErrorCode === 204) {
        return (
          <Section className="expand fixed">
            <div className="api-error">No Record Found.</div>
          </Section>
        );
      }

      return (
        <Section className="expand fixed">
          <div className="api-error">There was a problem communicating with the server. Please try again later.</div>
        </Section>
      );
    }

    if (profile) {
      return (
        <Section className="expand fixed">
          <UserProfile>
            {(profile.EmpAvatarAttachs != null)
              ? <Avatar bgImage={`url('${profile.EmpAvatarAttachs.Path}')`} />
              : <Avatar />
            }
            <UserDetails>
              <p className="user-name">{profile.FirstName} {profile.LastName}</p>
              <div className="inline-box">
                {(profile.JobRole)
                  ? <p>Job Role: {profile.JobRole.Name}</p>
                  : <p>Job Role: No Role Yet</p>
                }
                {(profile.WorkGroup.length > 0 && profile.WorkGroup[0].Department)
                  ? <p>Department: {profile.WorkGroup[0].Department.Name}</p>
                  : <p>Department: Not Assigned</p>
                }
                {(profile.WorkGroup.length > 0 && profile.WorkGroup[0].Team)
                  ? <p>Workgroup: {profile.WorkGroup[0].Team.Name}</p>
                  : <p>Workgroup: Not Assigned</p>
                }
                <p>Email: {profile.Email}</p>
              </div>
              <div className="inline-box last">
                <p>Status: <span className="regular">{(profile.EmploymentStatus) && profile.EmploymentStatus.Name}</span></p>
                <p>Location: {(profile.ComSiteLoc) && profile.ComSiteLoc.Name}</p>
                <p className="access">
                  <span>
                    <i className="fa fa-sitemap"></i>
                  </span>
                  <span>
                    <i className="fa fa-users"></i>
                  </span>
                </p>
              </div>
            </UserDetails>
            { (!this.state.isSeeMoreProfile) &&
              <OtherUserInfo>
                <p>
                  <span>DateHired</span>
                  <span>{(profile.DateHired !== '') ? parseDate(profile.DateHired, DateFormat.Long, false, '/') : '-'}</span>
                </p>
                <p>
                  <span>Birthday</span>
                  {(profile.BirthDate && profile.BirthDate !== '')
                    ? <span>{parseDate(profile.BirthDate, DateFormat.Long, false, '-')}</span>
                    : <span>-</span>
                  }
                </p>
                <p>
                  <span>Address</span>
                  {(profile.EmpAddress && profile.EmpAddress.length > 0)
                    ? <span>{profile.EmpAddress[0].StreetSubd} {profile.EmpAddress[0].Brgy} {profile.EmpAddress[0].City}</span>
                    : <span>No Address on record.</span>
                  }
                </p>
                {/* <p>
                  <span>Civil Status</span>
                  <span>Single</span>
                </p> */}
              </OtherUserInfo>
            }
            <a role="presentation" className="see-more" title={(this.state.isSeeMoreProfile) ? 'See Less Details' : 'See More Details'} onClick={this.toggleSeeMoreProfile}>{(this.state.isSeeMoreProfile) ? 'See Less...' : 'See More...'}</a>
          </UserProfile>
          {(this.state.isSeeMoreProfile) && (
            <Profile
              profile={profile}
              formRefs={this.props.formRefs}
              applRefs={this.props.applRefs}
              success={this.props.updateSuccess}
              error={this.props.updateError}
              update={this.props.updateProfile}
              empReqs={this.props.empReqs}
            />
          )}
          <Confirm
            show={this.state.isUpdateProfileResponse}
            title={(this.props.updateSuccess) ? 'SUCCESS' : 'FAILED'}
            onClick={this.hideUpdateProfileResponse}
            okBtnText="OK"
          >
            {(this.props.updateSuccess) && <p>Employee profile has successfully been updated.</p>}
            {(this.props.updateError) && <p>There was a problem updating the employees profile. Please try again later.</p>}
          </Confirm>
        </Section>
      );
    }

    return null;
  }
}

ProfileComponent.propTypes = {
  empID: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  profile: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  updateSuccess: PropTypes.bool,
  updateError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  empReqs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  formRefs: PropTypes.array,
  applRefs: PropTypes.array,
  updateProfile: PropTypes.func,
  retrieveEmpProfile: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('profile'),
  error: makeSelectError('profile'),
  profile: makeSelectData('profile'),
  updateSuccess: makeSelectSuccess('update'),
  updateError: makeSelectError('update'),
  empReqs: makeSelectData('empReqs'),
  formRefs: makeSelectFormRefs(),
  applRefs: makeSelectApplRefs(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateProfile: (type, data) => dispatch(getUpdateEmpProf(type, data)),
    retrieveEmpProfile: (empID) => dispatch(getEmpProfile(empID)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(ProfileComponent);
