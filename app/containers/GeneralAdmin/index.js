/**
 * General Administration Page
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faTag, faTasks, faEnvelope, faUsers, faCogs, faKey,
} from '@fortawesome/fontawesome-free-solid';

import {
  faListAlt,
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

class GenAdminPanel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
          <title>Content Management / General Administration Panel</title>
          <meta name="description" content="HCM-EMP - Content Management / General Administration Panel" />
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Section>
              <H2>Content Management / General Administration</H2>
              <Flex>
                { (accessList.findIndex((item) => item.ModuleID === '3140a6a9-673c-42fe-aaaa-2893c44e2691') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faTag} />
                    <span>Branding</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === 'fcd46ccf-bffe-437e-9842-d698621900cd') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faTasks} />
                    <span>Feature Lists Management and Activation</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '6d0f6fbb-ebdb-41b4-83f8-dd969f1ff137') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span>SMTP Control Panel</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '3919dcec-de95-487c-b17f-df28221df0c9') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faCogs} />
                    <span>Components Integration</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '57a4e665-ff96-43c4-99b8-1c73f8e84443') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faUsers} />
                    <span>User Roles, Levels and Management</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '6595ce89-ebbe-45f2-8caa-f977c8216721') !== -1) &&
                  <Button to="/general-administration/access-permission">
                    <FontAwesomeIcon icon={faKey} />
                    <span>Access and Permissions</span>
                  </Button>
                }
                { (accessList.findIndex((item) => item.ModuleID === '13d73f2f-1596-42c6-8a40-e4259a1b46e9') !== -1) &&
                  <Button deadBtn onClick={(e) => { e.preventDefault(); }}>
                    <FontAwesomeIcon icon={faListAlt} />
                    <span>Process Lists and Management</span>
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

GenAdminPanel.propTypes = {
  location: PropTypes.object,
};

GenAdminPanel.propTypes = {
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
)(GenAdminPanel);
