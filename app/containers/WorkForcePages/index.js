/*
 * WorkForce Admin Panel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faUsers, faHeadphones, faDesktop, faClock, faComment, faKey } from '@fortawesome/fontawesome-free-solid';

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

class WFAdminPanel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
          <title>Workforce Admin Panel</title>
          <meta name="description" content="HCM-EMP - Workforce Admin Panel" />
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Section>
              <H2>Workforce Admin Panel</H2>
              <Flex>
                { (accessList.findIndex((item) => item.ModuleID === 'af7e47e2-6d06-45d5-b729-19c8054e5c71') !== -1) &&
                  <Button to="/workforce/employee-list">
                    <FontAwesomeIcon icon={faUsers} />
                    <span>Employee Master List</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === 'd6590922-e262-453b-9597-c2829d249952') !== -1) &&
                  <Button to="/workforce/floor-status-list">
                    <FontAwesomeIcon icon={faHeadphones} />
                    <span>Floor Status List</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '0332a1b2-d792-4df1-80ad-930888bd387b') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }} to="/workforce/desktop-configuration">
                    <FontAwesomeIcon icon={faDesktop} />
                    <span>Desktop Monitoring and Configuration Menu</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === 'a44e0a5b-1e28-47dc-a894-6731d0e0745a') !== -1) &&
                  <Button to="/workforce/shift">
                    <FontAwesomeIcon icon={faClock} />
                    <span>Shift Management</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === 'ec47ff47-354f-471c-9f76-fbaeebe55bc4') !== -1) &&
                  <Button to="/workforce/workstatus">
                    <FontAwesomeIcon icon={faComment} />
                    <span>Work Status</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '9d6e29b0-2aa3-42a1-a4e6-fbcfc7decc4b') !== -1) &&
                  <Button to="/workforce/access-permissions">
                    <FontAwesomeIcon icon={faKey} />
                    <span>Access and Permissions</span>
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

WFAdminPanel.propTypes = {
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
)(WFAdminPanel);
