/*
 * HomePage
 *
 * NOTE: this will serve as a bare Template for other Pages
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

/* Global Components */
import PageWrap from 'components/PageWrap';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';
import Sidebar from 'components/Sidebar';
import PageContent from 'components/Main/PageContent';

export default class Page extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <PageWrap>
        <Helmet>
          <title>Name of Page</title>
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
          </PageContent>
        </Main>
        <Footer />
      </PageWrap>
    );
  }
}
