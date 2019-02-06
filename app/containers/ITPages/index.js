/*
 * IT Admin Panel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faKey, faUsers, faWrench } from '@fortawesome/fontawesome-free-solid';
import { faClock, faKeyboard } from '@fortawesome/fontawesome-free-regular';

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

class ITAdminPanel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
          <title>IT Admin Panel</title>
          <meta name="description" content="HCM-EMP - IT Admin Panel" />
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Section>
              <H2>IT Admin Panel</H2>
              <Flex>
                { (accessList.findIndex((item) => item.ModuleID === '605ee15e-9732-44e8-b456-80f68f3ec694') !== -1) &&
                  <Button to="/itadmin/employee-list">
                    <FontAwesomeIcon icon={faUsers} />
                    <span>Employee Master List</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '8dcdb75e-690f-40df-95a3-539f473641f2') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faWrench} />
                    <span>IT Ticket and Monitoring</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '8a7926ed-4f30-4b4a-a4de-aea37ad0d8dc') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faClock} />
                    <span>History</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === 'be6f3cfd-07b7-4395-97b0-0beead3258c2') !== -1) &&
                  <Button to="/itadmin/access-permissions">
                    <FontAwesomeIcon icon={faKey} />
                    <span>Access and Permissions</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === 'df4ee0b7-433f-4713-944c-4ce56aace026') !== -1) &&
                  <Button to="/itadmin/assets-allocations">
                    <FontAwesomeIcon icon={faKeyboard} />
                    <span>Asset and Allocation</span>
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

ITAdminPanel.propTypes = {
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
)(ITAdminPanel);
