/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Helmet } from 'react-helmet';

import Main from 'components/Main';
import PageWrap from 'components/PageWrap';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Ninja from 'images/404.png';

import Wrapper from './Wrapper';

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <PageWrap>
        <Helmet>
          <title>Employee Portal Home Page</title>
        </Helmet>
        <Header />
        <Main>
          <Wrapper>
            <img src={Ninja} alt="404 Page Not Found" className="ninja-404" />
            <div className="not-found-message">
              <h1>
                <span>404</span>
                <small>Page Not Found</small>
              </h1>
              <p>Uh-oh! You seem to be lost.<br />Don’t worry, this ninja will guide you.</p>
              <a href="/" title="Back to Login">BACK TO LOGIN</a>
            </div>
          </Wrapper>
        </Main>
        <Footer />
      </PageWrap>
    );
  }
}
