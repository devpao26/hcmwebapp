/*
 * Landing Page Content based on User Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

/* Global Components */
import Avatar from 'components/Img/Avatar';

/* Main, Sections, PageContent */
import PageContent from 'components/Main/PageContent';
import H2 from 'components/Section/H2';

import Section from 'components/SectionFlex/Section';
import Flex from 'components/SectionFlex';
import Calendar from 'components/Calendar';

/* User Styles */
import UserProfile from 'components/User/UserProfile';
import UserDetails from 'components/User/UserDetails';
import OtherUserInfo from 'components/User/OtherUserInfo';

/* Shift Summary List */
import ShiftSummaryList from 'containers/WorkForcePages/FloorStatus/ShiftSummaryList';

/* Leave History List */
import EMPMasterlist from 'components/Employee/EMPMasterlist';
import HistoryList from 'containers/FormRequests/LeaveRequest/HistoryList';

/* Page Styles */
// import Select from './SelectTag';
// import Matrix from './Matrix';
// import TrainingList from './TrainingList';
import LeaveCreditList from './LeaveCreditList';
// import ActivityList from './ActivityList';
// import MonitorList from './MonitorList';
// import Graph from './Graph';

// class MatrixGraph extends React.PureComponent {
//   render() {
//     return (
//       <Graph>
//         <p>STATS</p>
//       </Graph>
//     );
//   }
// };

class LandingPageContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayDate: moment().startOf('days'),
    };
  }

  mobileToggleDisplay = (e) => {
    // get our parent container
    const parent = e.currentTarget.parentNode.parentNode;

    // toggle our class
    parent.classList.toggle('toggle');

    // // Update selected Date
    // const date = moment(new Date(`${this.currYr}-${this.currMonth}-${count}`));
    // this.selectedDate(date);
  }

  selectedDate = (date) => {
    this.setState({
      displayDate: date,
    });

    const currMonth = moment(date).format('MM');
    const currYr = moment(date).format('YYYY');
    // const cMonthName = moment(date).format('MMMM');
    const cSelectedDay = moment(date).format('D');
    // const daysInSelDate = moment(date).daysInMonth();

    // console.log(`${currMonth}/${cSelectedDay}/${currYr}`);
    if (this.props.selectedDate) this.props.selectedDate(`${currMonth}/${cSelectedDay}/${currYr}`);
  }

  render() {
    // const { profile, adminType, shift, leaves } = this.props;
    const { profile, shift, leaves } = this.props;

    const shiftSummaryProps = {
      loading: shift.get('loading'),
      error: shift.get('error'),
      shiftRec: shift.get('data'),
    };

    // const shiftPageDetails = shift.get('pages');
    // const shiftMaxPage = 1;
    // if (shiftPageDetails !== null) {
    //   shiftMaxPage = shiftPageDetails.MaxPageIndex;
    // }

    const leaveHistoryProps = {
      loading: leaves.get('loading'),
      error: leaves.get('error'),
      list: leaves.get('data'),
      home: true,
    };

    // let graph = null;
    // if (adminType === true) {
    //   graph = (<Graph />);
    // }

    return (
      <PageContent>
        {/* <Link to="/" onClick={this.props.link}>Change Landing Page Display (Temp trigger)</Link> */}
        <Section className="expand">
          <UserProfile>
            { (profile.EmpAvatarAttachs != null)
              ? <Avatar bgImage={`url('${profile.EmpAvatarAttachs.Path}')`} />
              : <Avatar />
            }
            <UserDetails>
              <p className="user-name">{profile.FirstName} {profile.LastName}</p>
              <div className="inline-box">
                { (profile.JobRole != null)
                  ? <p>Job Role: {profile.JobRole.Name}</p>
                  : <p>Job Role: No Role Yet</p>
                }
                <p>Workgroup: {(profile.WorkGroup.length > 0) ? profile.WorkGroup[0].Team.Name : 'Not assigned yet.'}</p>
                <p>Email: {profile.Email}</p>
              </div>
              <div className="inline-box last">
                <p>Status: <span className="regular">{profile.EmploymentStatus.Name}</span></p>
                <p>Location: {profile.ComSiteLoc.Name}</p>
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
            <OtherUserInfo>
              <p>
                <span>Birthday</span>
                { (profile.BirthDate !== '')
                  ? <span>{moment(new Date(profile.BirthDate)).format('LL')}</span>
                  : <span>{profile.BirthDate}</span>
                }
              </p>
              <p>
                <span>Address</span>
                { (profile.EmpAddress.length > 0)
                  ? <span>{profile.EmpAddress[0].StreetSubd} {profile.EmpAddress[0].Brgy} {profile.EmpAddress[0].City}</span>
                  : <span>No Address on record.</span>
                }
              </p>
              {/* <p>
                <span>Civil Status</span>
                <span>Single</span>
              </p> */}
            </OtherUserInfo>
          </UserProfile>
          {/* <Link to="/home" className="see-more">See more...</Link> */}
          {/* <a className="see-more">See more...</a> */}
        </Section>

        <Flex>
          <Section className="shift-cont" half>
            <H2>Shift Summary <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>

            <ShiftSummaryList {...shiftSummaryProps} />

            {/* <Matrix>
              <Select>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </Select>
              <div className="green">
                <p>
                  5/5
                  <span>Attendance</span>
                </p>
              </div>

              <div className="green">
                <p>
                  3
                  <span>Tardiness</span>
                </p>
              </div>

              <div className="purple">
                <p>
                  563
                  <span>No. of Calls Summary</span>
                </p>
              </div>
            </Matrix>
            {
              this.props.adminType === true && <MatrixGraph />
            } */}
            {/* <Link to="/home" className="see-more">See more...</Link> */}
          </Section>

          {this.props.adminType !== true &&
            <Section half>
              <H2>Calendar <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>
              <Calendar displayDate={this.state.displayDate} selectedDate={this.selectedDate} />
            </Section>
          }
        </Flex>

        {this.props.adminType !== true &&
          <Flex>
            <Section className="leave-cont" half>
              <H2>Leave History <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>
              <EMPMasterlist>
                <HistoryList {...leaveHistoryProps} />
              </EMPMasterlist>
              {/* <TrainingList>
                <p>
                  <span>Language and Communications</span>
                  <span>Year Completed: 2016</span>
                </p>
                <p>
                  <span>Product Training</span>
                  <span>Year Completed: 2016</span>
                </p>
                <p>
                  <span>Skills Training</span>
                  <span>Year Completed: 2016</span>
                </p>
              </TrainingList>
              <Link to="/home" className="see-more">See more...</Link> */}
            </Section>

            <Section half>
              <H2>Leave Credits <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>
              <LeaveCreditList>
                <tbody>
                  <tr>
                    <th>Type</th>
                    <th>Remaining</th>
                    <th>Used</th>
                  </tr>
                  <tr>
                    <td>Vacation Leave</td>
                    <td>{profile.EmpLeaveCount.VLCount}</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>Sick Leave</td>
                    <td>{profile.EmpLeaveCount.SLCount}</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>Personal Leave</td>
                    <td>{profile.EmpLeaveCount.ELCount}</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </LeaveCreditList>
              {/* <Link to="/home" className="see-more">See more...</Link> */}
            </Section>
          </Flex>
        }

        {/* <Flex>
          <Section half>
            <H2>Activities <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>
            <ActivityList>
              <li>
                <p>
                  <span className="circle"></span>
                </p>
                <p>
                  <span className="name">Clark Kent</span>
                  <small>Viewed your Leave Request</small>
                </p>
                <p>
                  <br />
                  <small>11:00am</small>
                </p>
              </li>
              <li>
                <p>
                  <span className="circle"></span>
                </p>
                <p>
                  <span className="name">Time Monitoring</span>
                  <small>Diana Prince is on a meeting</small>
                </p>
                <p>
                  <br />
                  <small>Yesterday</small>
                </p>
              </li>
              <li>
                <p>
                  <span className="circle"></span>
                </p>
                <p>
                  <span className="name">Clark Kent</span>
                  <small>Approved your Leave Request</small>
                </p>
                <p>
                  <br />
                  <small>3 June 2017</small>
                </p>
              </li>
              <li>
                <p>
                  <span className="circle"></span>
                </p>
                <p>
                  <span className="name">Time Monitoring</span>
                  <small>Bruce Wayne is on a meeting</small>
                </p>
                <p>
                  <br />
                  <small>1 June 2017</small>
                </p>
              </li>
            </ActivityList>
            <Link to="/home" className="see-more">See more...</Link>
          </Section>

          <Section half>
            <H2>Monitoring <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>
            <MonitorList>
              <li>
                <p>
                  <span className="name">IRF</span>
                  <span>Attendance</span>
                </p>
                <p>
                  <small>Reported by: Hal Jordan</small>
                </p>
              </li>
              <li>
                <p>
                  <span className="name">COE Request</span>
                </p>
                <p>
                  <small>Requested by: Louis Lane</small>
                </p>
              </li>
              <li>
                <p>
                  <span className="name">For Approval</span>
                  <span>Performance Review</span>
                </p>
                <p>
                  <br />
                  <small>June 20, 2017</small>
                </p>
              </li>
              <li>
                <p>
                  <span className="name">For Approval</span>
                  <span>Leave Request</span>
                </p>
                <p>
                  <small>June 7, 2017</small>
                </p>
              </li>
            </MonitorList>
            <Link to="/home" className="see-more">See more...</Link>
          </Section>
        </Flex> */}

      </PageContent>
    );
  }
}

LandingPageContent.propTypes = {
  profile: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  adminType: PropTypes.bool,
  shift: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  leaves: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  selectedDate: PropTypes.func,
};

export default LandingPageContent;
