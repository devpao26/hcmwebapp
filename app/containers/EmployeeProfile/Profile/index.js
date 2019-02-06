/**
 * Employee Profile Detailed View (Info, Emp History, Req)
 * @prop {object} profile   Employee profile information
 * @prop {array}  refs      Form Load References
 *
 * TODO: enable the user to enter multiple addressess
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'components/datepicker.css';

import { DEFAULT_GUID, EMP_STATUS_REGULAR } from 'containers/App/constants';
import Loading from 'components/LoadingIndicator';
import Modal from 'components/Modal';
import Form from 'components/Forms/Form';
import Fields from 'components/Forms/Fields';
import Input from 'components/Forms/Input';
import Select from 'components/Forms/Select';
import Label from 'components/Forms/Label';
import ErrorMsg from 'components/Forms/FieldErrorMsg';
import ButtonWrapper from 'components/Button/ButtonWrapper';
import Button from 'components/Button';
import Grid from 'components/Main/Grid';

import Wrapper from './Wrapper';
import Information from './PersonalInfo';
import EmpRequirements from './EmpRequirements';
import EmpHistory from './EmpHistory';
import { UpdateProfile } from '../constants';

export class EmpProfileDetail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isView: 'Personal', // values should be: Personal, EmpReq, EmpHistory
      isEditProfile: false,
      isEditSaving: false,
      firstName: '',
      firstNameError: false,
      middleName: '',
      lastName: '',
      lastNameError: false,
      dateHired: (this.props.profile.DateHired && this.props.profile.DateHired !== '') ? moment(new Date(this.props.profile.DateHired)) : moment().startOf('days'),
      position: '',
      positionError: false,
      status: 'false',
      statusError: false,
      location: 'false',
      locationError: false,
      maxDate: moment().startOf('days').subtract(17, 'years'),
      birthDate: (this.props.profile.BirthDate && this.props.profile.BirthDate !== '') ? moment(new Date(this.props.profile.BirthDate)) : moment().startOf('days').subtract(18, 'years'),
      birthDateError: false,
      addressID: false,
      houseNo: '',
      baranggay: '',
      city: '',
      zipCode: '',
      phone: '',
      mobile: '',
      sssNumber: '',
      tinNumber: '',
      philHealthNumber: '',
      hdmfNumber: '',
    };
  }

  componentDidMount = () => {
    const { profile, formRefs, applRefs } = this.props;

    this.setState({
      firstName: profile.FirstName,
      firstNameError: false,
      middleName: profile.MiddleName,
      lastName: profile.LastName,
      lastNameError: false,
      phone: profile.Phone,
      mobile: profile.Mobile,
      sssNumber: profile.SSSNumber,
      tinNumber: profile.TinNumber,
      philHealthNumber: profile.PhilHealthNumber,
      hdmfNumber: profile.HDMFNumber,
    });

    if (profile.EmpAddress && profile.EmpAddress.length > 0) {
      this.setState({
        addressID: profile.EmpAddress[0].AddressID,
        houseNo: profile.EmpAddress[0].StreetSubd,
        baranggay: profile.EmpAddress[0].Brgy,
        city: profile.EmpAddress[0].City,
        zipCode: profile.EmpAddress[0].ZipCode,
      });
    }

    const locations = formRefs[0].ComSiteLocRefs;
    const empStatus = formRefs[0].EmploymentStatusRefs;
    const genders = applRefs[0].GenderRefs;
    const jobRoles = formRefs[0].JobRoleRefs;

    if (profile.ComSiteLoc) {
      const locID = profile.ComSiteLoc.ComSiteLocID;
      const i = locations.findIndex((x) => x.ComSiteLocID === locID);
      this.setState({
        location: (i !== -1) ? locations[i].ComSiteLocID : 'false',
        locationError: false,
      });
    }

    const statID = profile.EmploymentStatus.EmploymentStatusID;
    const s = empStatus.findIndex((y) => y.EmploymentStatusID === statID);
    this.setState({
      status: (s !== -1) ? empStatus[s].EmploymentStatusID : 'false',
      statusError: false,
    });

    const genID = profile.Gender.GenderID;
    const g = genders.findIndex((z) => z.GenderID === genID);
    this.setState({
      gender: (g !== -1) ? genders[g].GenderID : genders[0].GenderID,
    });

    if (profile.JobRole && profile.JobRole.JobRoleID !== DEFAULT_GUID) {
      const jobRoleID = profile.JobRole.JobRoleID;
      const j = jobRoles.findIndex((r) => r.JobRoleID === jobRoleID);
      this.setState({
        position: (j !== 1) ? jobRoles[j].JobRoleID : 'false',
        positionError: false,
      });
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.success || nextProps.error) {
      this.setState({
        isEditSaving: false,
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      isEditSaving: true,
    });

    let error = false;
    const {
      firstName, middleName, lastName, dateHired,
      position, status, location, birthDate, gender,
      houseNo, baranggay, city, zipCode,
      phone, mobile,
      sssNumber, tinNumber, philHealthNumber, hdmfNumber,
    } = this.state;

    if (firstName === '') {
      error = true;
      this.setState({
        firstNameError: true,
        isEditSaving: false,
      });
    }

    if (lastName === '') {
      error = true;
      this.setState({
        lastNameError: true,
        isEditSaving: false,
      });
    }

    // if (position === '') {
    //   error = true;
    //   this.setState({
    //     positionError: true,
    //     isEditSaving: false,
    //   });
    // }

    if (status === 'false') {
      error = true;
      this.setState({
        statusError: true,
        isEditSaving: false,
      });
    }

    if (location === 'false') {
      error = true;
      this.setState({
        locationError: true,
        isEditSaving: false,
      });
    }

    if (!error) {
      const data = {
        FirstName: firstName,
        MiddleName: middleName,
        LastName: lastName,
        DateHired: moment(dateHired).format('MM/DD/YYYY'),
        BirthDate: moment(birthDate).format('MM/DD/YYYY'),
        GenderID: gender,
        EmploymentStatusID: status,
        ComSiteLocID: location,
        Phone: phone,
        Mobile: mobile,
        JobRoleID: position,
        EmpAddress: [{
          StreetSubd: (houseNo !== '') ? houseNo : undefined,
          Brgy: (baranggay !== '') ? baranggay : undefined,
          City: (city !== '') ? city : undefined,
          ZipCode: (zipCode !== '') ? zipCode : undefined,
        }],
        SSSNumber: (sssNumber !== '') ? sssNumber : undefined,
        TinNumber: (tinNumber !== '') ? tinNumber : undefined,
        PhilHealthNumber: (philHealthNumber !== '') ? philHealthNumber : undefined,
        HDMFNumber: (hdmfNumber !== '') ? hdmfNumber : undefined,
      };
      this.props.update(UpdateProfile.SUBMIT, data);
    }
  }

  getFirstName = (e) => {
    this.setState({
      firstName: e.currentTarget.value,
      firstNameError: false,
    });
  }
  getMiddleName = (e) => {
    this.setState({
      middleName: e.currentTarget.value,
    });
  }
  getLastName = (e) => {
    this.setState({
      lastName: e.currentTarget.value,
      lastNameError: false,
    });
  }
  getDateHired = (date) => {
    this.setState({
      dateHired: date,
    });
  }
  getPosition = (e) => {
    const i = e.currentTarget.value;
    const jobRoleRefs = this.props.formRefs[0].JobRoleRefs;
    const jobRoleID = jobRoleRefs[i].JobRoleID;
    this.setState({
      position: jobRoleID,
      positionError: false,
    });
  }
  getStatus = (e) => {
    const i = e.currentTarget.value;
    const empStatusRefs = this.props.formRefs[0].EmploymentStatusRefs;
    const statusID = empStatusRefs[i].EmploymentStatusID;

    this.setState({
      status: statusID,
      statusError: false,
    });
  }

  getLocation = (e) => {
    const i = e.currentTarget.value;
    const locRefs = this.props.formRefs[0].ComSiteLocRefs;
    const locID = locRefs[i].ComSiteLocID;

    this.setState({
      location: locID,
      locationError: false,
    });
  }
  getBirthDate = (date) => {
    this.setState({
      birthDate: date,
      birthDateError: false,
    });
  }
  getGender = (e) => {
    const i = e.currentTarget.value;
    const genders = this.props.applRefs[0].GenderRefs;
    const genderID = genders[i].GenderID;
    this.setState({
      gender: genderID,
    });
  }
  getHouseNo = (e) => {
    this.setState({
      houseNo: e.currentTarget.value,
    });
  }
  getBaranggay = (e) => {
    this.setState({
      baranggay: e.currentTarget.value,
    });
  }
  getCity = (e) => {
    this.setState({
      city: e.currentTarget.value,
    });
  }
  getZipCode = (e) => {
    this.setState({
      zipCode: e.currentTarget.value,
    });
  }
  getPhone = (e) => {
    this.setState({
      phone: e.currentTarget.value,
    });
  }
  getMobile = (e) => {
    this.setState({
      mobile: e.currentTarget.value,
    });
  }
  getSSSNumber = (e) => {
    this.setState({
      sssNumber: e.currentTarget.value,
    });
  }
  getTINNumber = (e) => {
    this.setState({
      tinNumber: e.currentTarget.value,
    });
  }
  getPhilHealthNumber = (e) => {
    this.setState({
      philHealthNumber: e.currentTarget.value,
    });
  }
  getHDMFNumber = (e) => {
    this.setState({
      hdmfNumber: e.currentTarget.value,
    });
  }

  showEditProfile = () => {
    this.setState({
      isEditProfile: true,
    });
  }
  hideEditProfile = (e) => {
    e.preventDefault();
    this.setState({
      isEditProfile: false,
    });
  }

  render() {
    const { profile, formRefs, applRefs, empReqs } = this.props;

    let locSelected = 'false';
    let empStatusSelected = 'false';
    let genderSelected = 0;
    let jobRoleSelected = 'false';

    const comSiteLocs = formRefs[0].ComSiteLocRefs.map((loc, index) => {
      if (profile.ComSiteLoc && profile.ComSiteLoc.ComSiteLocID === loc.ComSiteLocID) {
        locSelected = profile.ComSiteLoc.ComSiteLocID === loc.ComSiteLocID && index;
      }
      return (<option key={loc.ComSiteLocID} value={index}>{loc.Name}</option>);
    });

    const empStatus = formRefs[0].EmploymentStatusRefs.map((stat, index) => {
      if (stat.EmploymentStatusID === profile.EmploymentStatus.EmploymentStatusID) {
        empStatusSelected = index;
      }
      return (<option key={stat.EmploymentStatusID} value={index}>{stat.Name}</option>);
    });

    const genderRefs = applRefs[0].GenderRefs.map((gender, index) => {
      if (gender.GenderID === profile.GenderID) {
        genderSelected = index;
      }
      return (<option key={gender.GenderID} value={index}>{gender.Gender}</option>);
    });

    const jobRoles = formRefs[0].JobRoleRefs.map((jobrole, index) => {
      if (jobrole.JobRoleID === profile.JobRole.JobRoleID) {
        jobRoleSelected = index;
      }
      return (<option key={jobrole.JobRoleID} value={index}>{jobrole.Name}</option>);
    });

    return (
      <Wrapper>
        <div className="tab-nav">
          <a role="presentation" title="Personal Information" onClick={() => { this.setState({ isView: 'Personal' }); }} className={(this.state.isView === 'Personal') && 'active'}>Personal Information</a>|
          <a role="presentation" title="Employment Requirements" onClick={() => { this.setState({ isView: 'EmpReq' }); }} className={(this.state.isView === 'EmpReq') && 'active'}>Employment Requirements</a>
          {/* <a role="presentation" title="Employee History" onClick={() => { this.setState({ isView: 'EmpHistory' }); }} className={(this.state.isView === 'EmpHistory') && 'active'}>Employee History</a> */}
        </div>

        {(this.state.isView === 'Personal') && <Information info={profile} showEdit={this.showEditProfile} />}
        {(this.state.isView === 'EmpReq') && <EmpRequirements lists={empReqs} />}
        {(this.state.isView === 'EmpHistory') && <EmpHistory />}

        {/* Edit Profile Modal */}
        <Modal
          show={this.state.isEditProfile}
          width="520px"
          title="Update Employee Information"
        >
          <Form className="form-box">
            {(this.state.isEditSaving) && <div className="loading-cont"><Loading /></div>}
            <Grid columns="1fr 1fr 1fr" gap="0px 20px">
              <Fields>
                <Label>First Name</Label>
                <Input type="text" placeholder="First Name" defaultValue={profile.FirstName} onChange={this.getFirstName} />
                {this.state.firstNameError && <ErrorMsg>* Please input first name</ErrorMsg>}
              </Fields>
              <Fields>
                <Label>Middle Name</Label>
                <Input type="text" placeholder="Middle Name" defaultValue={profile.MiddleName} onChange={this.getMiddleName} />
              </Fields>
              <Fields>
                <Label>Last Name</Label>
                <Input type="text" placeholder="Last Name" defaultValue={profile.LastName} onChange={this.getLastName} />
                {this.state.lastNameError && <ErrorMsg>* Please input last name</ErrorMsg>}
              </Fields>
            </Grid>

            <Grid columns="1fr 1fr" gap="0px 20px">
              <Fields>
                <Label>Date Hired</Label>
                <DatePicker
                  selected={this.state.dateHired}
                  startDate={this.state.dateHired}
                  onChange={this.getDateHired}
                  dateFormat="LL"
                  dateFormatCalendar="MMMM"
                  showYearDropdown
                  // scrollableYearDropdown
                  // yearDropdownItemNumber={25}
                  maxDate={moment().startOf('days')}
                />
              </Fields>
              <Fields>
                {/* <Label>Position</Label> */}
                {/* <Input readOnly type="text" placeholder="Position" defaultValue={profile.JobRole.Name} /> */}
                <Select label="Position" getValue={this.getPosition} default={jobRoleSelected}>
                  <option value="false">Please select position</option>
                  {jobRoles}
                </Select>
                {this.state.statusError && <ErrorMsg>* Please select employment status</ErrorMsg>}
              </Fields>
            </Grid>

            <Fields>
              <Label>Department</Label>
              <Input readOnly type="text" defaultValue={profile.WorkGroup && profile.WorkGroup.length > 0 && profile.WorkGroup[0].Department ? profile.WorkGroup[0].Department.Name : 'No Department Assigned.'} />
            </Fields>

            <Grid columns="1fr 1fr" gap="0px 20px">
              { (profile.EmploymentStatus && profile.EmploymentStatus.EmploymentStatusID === EMP_STATUS_REGULAR)
                ? (<Fields>
                  <Label>Employment Status</Label>
                  <Input readOnly type="text" defaultValue={profile.EmploymentStatus.Name} />
                </Fields>
                ) : (<Fields>
                  <Select label="Employment Status" getValue={this.getStatus} default={empStatusSelected}>
                    <option value="false">Please select status</option>
                    {empStatus}
                  </Select>
                  {this.state.statusError && <ErrorMsg>* Please select employment status</ErrorMsg>}
                </Fields>
                )
              }
              <Fields>
                <Select label="Location" getValue={this.getLocation} default={locSelected}>
                  <option value="false">Please select location</option>
                  {comSiteLocs}
                </Select>
                {this.state.locationError && <ErrorMsg>* Please select location</ErrorMsg>}
              </Fields>
            </Grid>

            <hr className="line-break" />

            <Grid columns="1fr 1fr" gap="0px 20px">
              <Fields>
                <Label>Birthdate</Label>
                <DatePicker
                  selected={this.state.birthDate}
                  startDate={this.state.birthDate}
                  onChange={this.getBirthDate}
                  dateFormat="LL"
                  dateFormatCalendar="MMMM"
                  showYearDropdown
                  // scrollableYearDropdown
                  // yearDropdownItemNumber={25}
                  maxDate={this.state.maxDate}
                />
              </Fields>
              <Fields>
                <Select label="Gender" getValue={this.getGender} default={genderSelected}>
                  {genderRefs}
                </Select>
              </Fields>
            </Grid>

            <Label>Address</Label>
            <Fields>
              <Label>House No. / Street / Subdivision</Label>
              <Input type="text" placeholder="House No. / Street / Subdivision" onChange={this.getHouseNo} defaultValue={this.state.houseNo} />
            </Fields>

            <Grid columns="1fr 1fr" gap="0px 20px">
              <Fields>
                <Label>Baranggay</Label>
                <Input type="text" placeholder="Baranggay" onChange={this.getBaranggay} defaultValue={this.state.baranggay} />
              </Fields>
              <Fields>
                <Label>City</Label>
                <Input type="text" placeholder="City" onChange={this.getCity} defaultValue={this.state.city} />
              </Fields>
            </Grid>

            <Grid columns="1fr 1fr" gap="0px 20px">
              <Fields>
                <Label>Zip Code</Label>
                <Input type="number" placeholder="Zip Code" onChange={this.getZipCode} defaultValue={this.state.zipCode} />
              </Fields>
              <Fields>
                <Label>Mobile Number</Label>
                <Input type="text" placeholder="Mobile Number" onChange={this.getMobile} defaultValue={this.state.mobile} />
              </Fields>
            </Grid>

            {/* <Grid columns="1fr 1fr" gap="0px 20px">
              <Fields>
                <Label>Phone Number</Label>
                <Input type="text" placeholder="Phone Number" onChange={this.getPhone} defaultValue={this.state.phone} />
              </Fields>
              <Fields>
                <Label>Mobile Number</Label>
                <Input type="text" placeholder="Mobile Number" onChange={this.getMobile} defaultValue={this.state.mobile} />
              </Fields>
            </Grid> */}

            <hr className="line-break" />

            <Grid columns="1fr 1fr" gap="0px 20px">
              <Fields>
                <Label>SSS Number</Label>
                <Input type="text" placeholder="00-0000000-0" onChange={this.getSSSNumber} defaultValue={this.state.sssNumber} />
              </Fields>
              <Fields>
                <Label>TIN Number</Label>
                <Input type="number" placeholder="000-000-000-000" onChange={this.getTINNumber} defaultValue={this.state.tinNumber} />
              </Fields>
            </Grid>

            <Grid columns="1fr 1fr" gap="0px 20px">
              <Fields>
                <Label>PhilHealth Number</Label>
                <Input type="text" placeholder="00-000000000-00" onChange={this.getPhilHealthNumber} defaultValue={this.state.philHealthNumber} />
              </Fields>
              <Fields>
                <Label>HDMF Number</Label>
                <Input type="number" placeholder="00-000000000-00" onChange={this.getHDMFNumber} defaultValue={this.state.hdmfNumber} />
              </Fields>
            </Grid>

            <ButtonWrapper>
              <Button handleRoute={this.onSubmit} color="gray">UPDATE</Button>
              <Button handleRoute={(e) => { this.hideEditProfile(e); }} color="red">CANCEL</Button>
            </ButtonWrapper>
          </Form>
        </Modal>
      </Wrapper>
    );
  }
}

EmpProfileDetail.propTypes = {
  update: PropTypes.func,
  profile: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  success: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  empReqs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  formRefs: PropTypes.array,
  applRefs: PropTypes.array,
};

export default EmpProfileDetail;
