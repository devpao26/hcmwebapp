/*
 * HR Admin Panel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faUserPlus, faListAlt, faUsers, faMoneyBillAlt,
  faSitemap, faChartLine, faGavel, faKey, faTv, faSignOutAlt, faCopy,
  faIdBadge, faCogs, faTasks, faEnvelope, faFileAlt, faSuitcase,
} from '@fortawesome/fontawesome-free-solid';

import {
  faFileAlt as faFileAltReg, faClock,
} from '@fortawesome/fontawesome-free-regular';

/* Global Components */
import PageWrap from 'components/PageWrap';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';
import PageContent from 'components/Main/PageContent';
import Sidebar from 'components/Sidebar';

/* Section Component */
import Section from 'components/Section';
import H2 from 'components/Section/H2';

/* Admin Panels Component */
import Flex from 'components/AdminPanels/Flex';
import Button from 'components/AdminPanels';

import { makeSelectUserInfo } from '../App/selectors';

export class HRAdminPanel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const mainWrapper = document.getElementById('mainWrapper');
    // Remove show class in our main wrapper
    mainWrapper.classList.remove('show');
  }

  render() {
    const { userProfile } = this.props;
    const accessList = (userProfile.AccessPermissionTemplate.length > 0) ? userProfile.AccessPermissionTemplate[0].AccessModulePermissionList : [];

    return (
      <PageWrap>
        <Helmet>
          <title>HR Admin Panel</title>
          <meta name="description" content="HCM-EMP - HR Admin Panel" />
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Section>
              <H2>Human Resources Admin Panel</H2>
              <Flex>
                { (accessList.findIndex((item) => item.ModuleID === 'e83295a1-0868-40e1-983e-1216fa2ecfb4') !== -1) &&
                  <Button to="/hradmin/onboarding">
                    <FontAwesomeIcon icon={faUserPlus} />
                    <span>Employee On-Boarding</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '800ab7f2-9345-48a7-b6bb-6e7f594249e6') !== -1) &&
                  <Button to="/hradmin/ppe-requirements">
                    <FontAwesomeIcon icon={faTasks} />
                    <span>Pre-Employment Requirements</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '53b8e151-1903-4e66-b3cf-5fd450cdfd38') !== -1) &&
                  <Button to="/hradmin/employee-list">
                    <FontAwesomeIcon icon={faUsers} />
                    <span>Employee Master List</span>
                  </Button>
                }
                {/* { (accessList.findIndex((item) => item.ModuleID === '5e020be1-3d98-4a81-a029-8bf774263978') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faAddressCard} />
                    <span>Recruitment Portal</span>
                  </Button>
                } */}
                { (accessList.findIndex((item) => item.ModuleID === 'ef3daa4d-1c77-4e4f-b979-99352f2407ba') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faFileAltReg} />
                    <span>Training Info and Records</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === 'e6179e8b-5193-4096-901d-a54aa71c39b5') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faChartLine} />
                    <span>Performance and Ratings</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === 'f1ed4522-0c44-4a62-b213-5213889098b3') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faTv} />
                    <span>Incident Reports</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '62f612a2-4c3e-4049-a346-594938a308c5') !== -1) &&
                  <Button to="/hradmin/compenben">
                    <FontAwesomeIcon icon={faMoneyBillAlt} />
                    <span>Compensation and Benefits</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '07f53943-861a-4459-8105-c246be9692a6') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <span>Exit Clearance</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === 'd0cbe7f3-4155-40d3-825b-fceff08a2bfc') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faFileAlt} />
                    <span>Show Cause Memo</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '34da8a03-92da-4eb1-ac2d-5d771a698156') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faListAlt} />
                    <span>Attendance</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '9af6742d-d84f-4d7d-878e-7318f626e979') !== -1) &&
                  <Button to="/hradmin/leaverequests">
                    <FontAwesomeIcon icon={faSuitcase} />
                    <span>Leaves Requests</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === 'bcfea40f-4665-4a33-b656-42244fc64b83') !== -1) &&
                  <Button to="/hradmin/coerequests">
                    <FontAwesomeIcon icon={faFileAltReg} />
                    <span>COE Requests</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === 'bcfea40f-4665-4a33-b656-42244fc64b83') !== -1) &&
                  <Button to="/hradmin/lcfrequests">
                    <FontAwesomeIcon icon={faFileAltReg} />
                    <span>LCF Requests</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === 'bcfea40f-4665-4a33-b656-42244fc64b83') !== -1) &&
                  <Button to="/hradmin/otrequests">
                    <FontAwesomeIcon icon={faFileAltReg} />
                    <span>OT Requests</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === 'bcfea40f-4665-4a33-b656-42244fc64b83') !== -1) &&
                  <Button to="/hradmin/customformrequests">
                    <FontAwesomeIcon icon={faCopy} />
                    <span>Custom Form Requests</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '70934522-510a-4241-883c-781d256f850b') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faFileAltReg} />
                    <span>Forms Management</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '062e2270-9cce-4443-80e2-e22746511ec9') !== -1) &&
                  <Button to="/hradmin/access-permissions">
                    <FontAwesomeIcon icon={faKey} />
                    <span>Access and Permissions</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '56040b2e-63ac-42f4-a846-95dd11787d27') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faClock} />
                    <span>History</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '5f2c2c71-7dac-4cba-a445-4017ef489c7e') !== -1) &&
                  <Button to="/hradmin/workflow-and-approval">
                    <FontAwesomeIcon icon={faSitemap} />
                    <span>Work Flow and Approval</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === 'fc3cdb40-f6d4-402d-97af-25960829ad59') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faIdBadge} />
                    <span>Roles</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === 'fe27d8c1-1205-4b27-92eb-b5c54e231b9a') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faCogs} />
                    <span>Cross Integration</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '51595cf4-d32c-4b62-90c3-8205fe7b2a47') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span>Newsletter</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '9081be1e-778b-488e-bb58-feb323971a00') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faGavel} />
                    <span>Policies</span>
                  </Button>
                }
              </Flex>
            </Section>
          </PageContent>
        </Main>
        <Footer />
      </PageWrap>
    );
  }
}

HRAdminPanel.propTypes = {
  location: PropTypes.object,
  userProfile: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};

const mapStateToProps = createStructuredSelector({
  userProfile: makeSelectUserInfo(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(HRAdminPanel);
