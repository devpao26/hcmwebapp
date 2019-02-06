/**
 * Sidebar Menus
 *
 * Usage: <Sidebar location={this.props.location} />
 * Note: On <Link> tag, put the Route Name both in to="" and in string to compare
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faHome, faChevronDown, faFileAlt, faExclamationCircle, faUsers, faChartArea, faTh,
  faLaptop, faSuitcase, // faBriefcase,
  faSitemap, // faChartLine, faClipboard,
  faMoneyBillAlt, faIdBadge,
} from '@fortawesome/fontawesome-free-solid';
import {
  faBell, faHandshake, // faCreditCard, faCalendarAlt,
  faUserCircle,
} from '@fortawesome/fontawesome-free-regular';

import injectReducer from 'utils/injectReducer';

import { GENERAL_GUID, MANAGEMENT_GUID, HRD_GUID, MIS_GUID, WFD_GUID, FIN_GUID } from 'containers/App/constants';
import { userLogout } from 'containers/App/actions';
import { toggleAlertModal } from 'containers/Alerts/action';
import {
  makeSelectUserInfo,
  makeSelectAlertCount,
  makeSelectNotifCount,
} from 'containers/App/selectors';

/* Global Components */
import Avatar from 'components/Img/Avatar';

import reducer from 'containers/App/reducer';

/* Styles */
import Wrapper from './Wrapper';
import MenuWrap from './Menu';
import UserProfile from './UserProfile';
// import { makeSelectToggleModal } from '../../containers/Alerts/selector';

class SidebarMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      confirmDialog: false,
      isAlertsAndListings: false,
    };
  }

  componentDidMount() {
    const actives = document.getElementsByClassName('active');

    for (let i = 0; i < actives.length; i += 1) {
      const nav = actives[i].getElementsByTagName('nav')[0];
      if (nav) {
        nav.style.maxHeight = `${nav.scrollHeight}px`;
      }
    }
  }

  // Show Alerts Listings
  showAlerts = () => {
    this.setState({
      isAlertsAndListings: !this.state.isAlertsAndListings,
    });
  }
  dismissSuccessMessage = () => {
    this.setState({
      isAlertsAndListings: false,
    });
  }
  showConfirmLogout = () => {
    this.setState({
      confirmDialog: !this.state.confirmDialog,
    });
  }

  handleClick = (e) => {
    const parent = e.currentTarget.parentNode;

    parent.classList.toggle('active');

    const nav = e.currentTarget.nextElementSibling;
    // add/remove max height on our content element for animation
    const maxHeight = nav.scrollHeight; // get the scroll height of the element
    if (nav.style.maxHeight) {
      nav.style.maxHeight = null;
    } else {
      nav.style.maxHeight = `${maxHeight}px`; // set the max height style
    }
  }

  toggleLogoutButton = (e) => {
    const target = e.currentTarget.parentNode;
    target.classList.toggle('active');
  }

  logout = () => {
    this.props.userLogout();
  }

  /**
   * Toggle for Alert and Notification
   * TODO: make this a dynamic code next time,
   *       the display should also dynamically change
   */
  // toggleAlertNotif = (e, empID, isAlert) => {
  //   e.preventDefault();
  //   if (this.props.isAlertShowing) {
  //     console.log('true');
  //     this.props.toggleAlert(empID, true, isAlert);
  //   } else {
  //     console.log('false');
  //     this.props.toggleAlert(empID, false, isAlert);
  //   }
  // }

  render() {
    const { userProfile, location, alertCount, notifCount } = this.props;
    const empProfileID = userProfile.EmpProfileID;
    const accessList = (userProfile.AccessPermissionTemplate.length > 0) ? userProfile.AccessPermissionTemplate[0].AccessModulePermissionList : [];

    let menuLocation = '';
    if (location !== undefined) {
      menuLocation = location.pathname;
    }

    return (
      <Wrapper className="sidebar">
        <UserProfile>
          { (userProfile.EmpAvatarAttachs != null)
            ? <Avatar bgImage={`url('${userProfile.EmpAvatarAttachs.Path}')`} />
            : <Avatar />
          }
          {/* <h2 role="presentation" onClick={this.toggleLogoutButton}>{userProfile.FirstName} {userProfile.LastName} <FontAwesomeIcon icon={faChevronDown} /></h2> */}
          <h2 role="presentation" onClick={this.toggleLogoutButton}>{userProfile.FirstName} {userProfile.LastName}</h2>
          <p>{userProfile.JobRole.Name}</p>
          <p>{userProfile.Email}</p>

          <nav>
            <button onClick={this.logout} title="Logout">LOGOUT</button>
          </nav>
        </UserProfile>
        <MenuWrap className="active">
          <h2 role="presentation" onClick={this.handleClick}>Main <FontAwesomeIcon icon={faChevronDown} /></h2>
          <nav>
            <Link to="/home" className={(/home/.test(menuLocation)) ? 'active' : ''} title="Home">
              <FontAwesomeIcon icon={faHome} /> <b>Home</b>
            </Link>
            <Link to="/forms" className={(/forms$/.test(menuLocation)) ? 'active' : ''} title="Form Request">
              <FontAwesomeIcon icon={faFileAlt} /> <b>Form Request</b>
            </Link>
            <Link to="/" onClick={(e) => { e.preventDefault(); this.props.toggleAlert(empProfileID, true, true); }} title="Alerts">
              <FontAwesomeIcon icon={faExclamationCircle} /> <b>Alerts</b>
              <span>{alertCount}</span>
            </Link>
            <Link to="/" onClick={(e) => { e.preventDefault(); this.props.toggleAlert(empProfileID, true, false); }} title="Alerts">
              <FontAwesomeIcon icon={faBell} /> <b>Notifications</b>
              <span>{notifCount}</span>
            </Link>
          </nav>
        </MenuWrap>

        { (accessList.findIndex((item) => { if (item.ModuleID === GENERAL_GUID || item.ModuleID === HRD_GUID || item.ModuleID === MIS_GUID || item.ModuleID === WFD_GUID || item.ModuleID === FIN_GUID) { return true; } return false; }) !== -1) &&
          <MenuWrap className="active">
            <h2 role="presentation" onClick={this.handleClick}>Administration <FontAwesomeIcon icon={faChevronDown} /></h2>
            <nav>
              {/* { (accessList.findIndex((item) => item.ModuleID === '5f2c2c71-7dac-4cba-a445-4017ef489c7e') !== -1) &&
                <Link to="/workflow-and-approval" className={(/workflow-and-approval/.test(menuLocation)) ? 'active' : ''} title="Workflow and Approval"><FontAwesomeIcon icon={faSitemap} /> <b>Workflow and Approval</b></Link>
              } */}
              { (accessList.findIndex((item) => item.ModuleID === 'aa65ec58-3a24-46f1-9d74-8d9bb06827a0') !== -1) &&
                <Link to="/hradmin" className={(/hradmin/.test(menuLocation)) ? 'active' : ''} title="HR Admin"><FontAwesomeIcon icon={faUsers} /> <b>HR Admin</b></Link>
              }
              { (accessList.findIndex((item) => item.ModuleID === '331159e2-ae0e-488e-99d5-d5e814b16f50') !== -1) &&
                <Link to="http://recruitment.visayakpo.com" title="Recruitment Portal" target="_blank"><FontAwesomeIcon icon={faIdBadge} /> <b>Recruitment Portal</b></Link>
              }
              { (accessList.findIndex((item) => item.ModuleID === '85e4f910-9bcd-43aa-a185-a2b11980c955') !== -1) &&
                <Link to="/itadmin" className={(/itadmin/.test(menuLocation)) ? 'active' : ''} title="IT Admin"><FontAwesomeIcon icon={faLaptop} /> <b>IT Admin</b></Link>
              }
              { (accessList.findIndex((item) => item.ModuleID === 'd503cb04-2e87-4f46-b735-53410f0289de') !== -1) &&
                <Link to="/workforce" className={(/workforce/.test(menuLocation)) ? 'active' : ''} title="Workforce Admin"><FontAwesomeIcon icon={faHandshake} /> <b>Workforce Admin</b></Link>
              }
              { (accessList.findIndex((item) => item.ModuleID === 'b8738f73-5932-41fc-8590-8dadedb7ecfe') !== -1) &&
                <Link to="/finance" className={(/finance/.test(menuLocation)) ? 'active' : ''} title="Finance Admin"><FontAwesomeIcon icon={faMoneyBillAlt} /> <b>Finance Admin</b></Link>
              }
              { (accessList.findIndex((item) => { if (item.ModuleID === 'aa65ec58-3a24-46f1-9d74-8d9bb06827a0' || item.ModuleID === '85e4f910-9bcd-43aa-a185-a2b11980c955' || item.ModuleID === 'd503cb04-2e87-4f46-b735-53410f0289de' || item.ModuleID === 'b8738f73-5932-41fc-8590-8dadedb7ecfe') { return true; } return false; }) !== -1) &&
                <span className="temp-link"><FontAwesomeIcon icon={faChartArea} /> <b>Reports and Monitoring</b></span>
              }
              { (accessList.findIndex((item) => { if (item.ModuleID === 'aa65ec58-3a24-46f1-9d74-8d9bb06827a0' || item.ModuleID === '85e4f910-9bcd-43aa-a185-a2b11980c955' || item.ModuleID === 'd503cb04-2e87-4f46-b735-53410f0289de' || item.ModuleID === 'b8738f73-5932-41fc-8590-8dadedb7ecfe') { return true; } return false; }) !== -1) &&
                <span className="temp-link"><FontAwesomeIcon icon={faTh} /> <b>Dashboard</b></span>
              }
            </nav>
          </MenuWrap>
        }
        { (accessList.findIndex((item) => { if (item.ModuleID === GENERAL_GUID || item.ModuleID === MANAGEMENT_GUID) { return true; } return false; }) !== -1) &&
          <MenuWrap last className="active">
            <h2 role="presentation" onClick={this.handleClick}>Management <FontAwesomeIcon icon={faChevronDown} /></h2>
            <nav>
              { (accessList.findIndex((item) => item.ModuleID === '5888c959-bef7-4875-96b0-838a6582ca61') !== -1) &&
                <Link to="/general-administration" className={(/general-administration/.test(menuLocation)) ? 'active' : ''}><FontAwesomeIcon icon={faUserCircle} /> <b>General Administration</b></Link>
              }
              { (accessList.findIndex((item) => item.ModuleID === '3095510b-c59a-41f6-ab2f-2a511027dc18') !== -1) &&
                <Link to="/forms-approval" className={(/forms-approval/.test(menuLocation)) ? 'active' : ''} title="Forms Approval Listings and Management"><FontAwesomeIcon icon={faSuitcase} /> <b>Forms Approval Listings and Management</b></Link>
              }
              { (accessList.findIndex((item) => item.ModuleID === '30b17de8-6152-4e9d-a41e-290f89503d03') !== -1) &&
                <Link to="/workgroup" className={(/workgroup/.test(menuLocation)) ? 'active' : ''} title="Work Group"><FontAwesomeIcon icon={faSitemap} /> <b>Work Group</b></Link>
              }
              {/* { (accessList.findIndex((item) => item.ModuleID === '30b17de8-6152-4e9d-a41e-290f89503d03') !== -1) &&
                <Link to="/org-chart" className={(/workgroup/.test(menuLocation)) ? 'active' : ''} title="Organizational Chart"><FontAwesomeIcon icon={faSitemap} /> <b>Organizational Chart</b></Link>
              } */}
              {/* <Link to="/" className={(/stringtocompare/.test(menuLocation)) ? 'active' : ''} title="">
                <FontAwesomeIcon icon={faBriefcase} /> Resources Campaign
              </Link>
              <span className="temp-link"><FontAwesomeIcon icon={faBriefcase} /> <b>Resources</b></span>
              <Link to="/workgroup" className={(/workgroup/.test(menuLocation)) ? 'active' : ''} title="Work Group">
                <FontAwesomeIcon icon={faSitemap} /> <b>Work Group</b>
              </Link>
              <Link to="/org-chart" className={(/org-chart/.test(menuLocation)) ? 'active' : ''} title="Organizational Chart">
                <FontAwesomeIcon icon={faSitemap} /> <b>Organizational Chart</b>
              </Link>
              <Link to="/" className={(/stringtocompare/.test(menuLocation)) ? 'active' : ''} title="Campaigns and Department">
                <FontAwesomeIcon icon={faSitemap} /> <b>Campaigns and Department</b>
              </Link>
              <Link to="/" className={(/stringtocompare/.test(menuLocation)) ? 'active' : ''} title="Reports Monitoring">
                <FontAwesomeIcon icon={faChartLine} /> <b>Reports Monitoring</b>
              </Link>
              <Link to="/" className={(/stringtocompare/.test(menuLocation)) ? 'active' : ''} title="Performance Board">
                <FontAwesomeIcon icon={faChartLine} /> <b>Performance Board</b>
              </Link>
              <Link to="/calendar" className={(/calendar/.test(menuLocation)) ? 'active' : ''} title="Calendar">
                <FontAwesomeIcon icon={faCalendarAlt} /> <b>Calendar</b>
              </Link> */}
            </nav>
          </MenuWrap>
        }
      </Wrapper>
    );
  }
}

SidebarMenu.propTypes = {
  location: PropTypes.object,
  userProfile: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  // isAlertShowing: PropTypes.bool,
  alertCount: PropTypes.number,
  notifCount: PropTypes.number,
  // function dispatch props
  userLogout: PropTypes.func,
  toggleAlert: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userProfile: makeSelectUserInfo(),
  // isAlertShowing: makeSelectToggleModal(),
  alertCount: makeSelectAlertCount(),
  notifCount: makeSelectNotifCount(),
});

function mapDispatchToProps(dispatch) {
  return {
    userLogout: () => dispatch(userLogout()),
    toggleAlert: (empID, isShowing, isAlert) => dispatch(toggleAlertModal(empID, isShowing, isAlert)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'global', reducer });

export default compose(
  withReducer,
  withConnect,
)(SidebarMenu);
