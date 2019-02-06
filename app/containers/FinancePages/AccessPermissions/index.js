/**
 * Access and Permissions
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/fontawesome-free-solid';

/* Global Components */
import PageWrap from 'components/PageWrap';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';
import PageContent from 'components/Main/PageContent';
import Sidebar from 'components/Sidebar';
import Back from 'components/Section/Back';

import AccessPermissions from 'containers/AccessPermissions';

class AdminAccessPermissions extends React.PureComponent {
  render() {
    return (
      <PageWrap>
        <Helmet>
          <title>Finance Administration | Access and Permissions</title>
          <meta name="description" content="HCM-EMP - Finance Administration | Access and Permissions" />
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Back onClick={this.props.history.goBack}><FontAwesomeIcon icon={faCaretLeft} /> BACK TO FINANCE ADMIN</Back>
            <AccessPermissions isGenAdmin={false} adminRequester="FIN" />
          </PageContent>
        </Main>
        <Footer />
      </PageWrap>
    );
  }
}

AdminAccessPermissions.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

export default AdminAccessPermissions;
