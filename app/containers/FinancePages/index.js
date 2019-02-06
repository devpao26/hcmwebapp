/*
 * Finance Admin Panel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faList, faCalendar, faUsers, faKey } from '@fortawesome/fontawesome-free-solid';
import { faEnvelopeOpen } from '@fortawesome/fontawesome-free-regular';

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

export class FinAdminPanel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
          <title>Finance Admin Panel</title>
          <meta name="description" content="HCM-EMP - Finance Admin Panel" />
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Section>
              <H2>Finance Admin Panel</H2>
              <Flex>
                { (accessList.findIndex((item) => item.ModuleID === 'bcb4bf53-0b5f-4c4c-bbe1-586902931dac') !== -1) &&
                  <Button to="/finance/dtr">
                    <FontAwesomeIcon icon={faList} />
                    <span>DTR Listings</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '9f72c5bc-6f97-4f47-a396-9c449a7e272b') !== -1) &&
                  <Button to="/finance/payroll-cutoff">
                    {/* <Button deadBtn onClick={(e) => {e.preventDefault();}} to="/finance/payroll-cutoff"> */}
                    <FontAwesomeIcon icon={faCalendar} />
                    <span>Payroll Cutoff Period Template</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '48d29c7c-dc28-4089-b642-75e6d8802de9') !== -1) &&
                  <Button to="/finance/payroll" >
                    <FontAwesomeIcon icon={faEnvelopeOpen} />
                    <span>Payroll Processing</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === 'e0cb19f6-963b-4c70-ac81-edf56397abab') !== -1) &&
                  <Button to="/finance/employee-list">
                    <FontAwesomeIcon icon={faUsers} />
                    <span>Employee Master List</span>
                  </Button>
                }
                {/* { (accessList.findIndex((item) => item.ModuleID === 'e774eff8-96fb-4ffd-aba4-eb1aee178d26') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faCopy} />
                    <span>Forms Requests</span>
                  </Button>
                } */}
                { (accessList.findIndex((item) => item.ModuleID === '1a1922d9-c6ff-4e89-8563-657272639918') !== -1) && // note: change id to proper module id
                  <Button to="/finance/access-permissions">
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

FinAdminPanel.propTypes = {
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
)(FinAdminPanel);
