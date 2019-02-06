/*
 * LandingPage
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';

/* Global injectSaga and injectReducer */
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

/* Global Components */
import PageWrap from 'components/PageWrap';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Sidebar from 'components/Sidebar';

/* Main, Landing Page */
import Main from 'components/Main';
import Landing from 'components/LandingPage';

/* selectors, reducer, saga and actions */
import { makeSelectUserInfo } from 'containers/App/selectors';

import reducer from './reducer';
import saga from './saga';

import {
  getInitialEmpData,
} from './actions';

import {
  makeSelectList, makeSelectSuccess, makeSelectRefs,
} from './selectors';

import LoadingPage from './Loading';

export class LandingPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      adminType: false,
      shiftDate: moment().startOf('days').subtract(1, 'days').format('M/DD/YYYY'),
      // shiftDate: '01/10/2018'
    };
  }

  componentDidMount() {
    const mainWrapper = document.getElementById('mainWrapper');
    // Remove show class in our main wrapper
    mainWrapper.classList.remove('show');

    // Initial employee data
    this.props.getInitialEmpData(this.state.shiftDate);
  }

  shiftDate = (date) => {
    // console.log(date);
    // Reload Page Shift Summart
    this.props.getInitialEmpData(date);
  }

  changeType = (e) => {
    e.preventDefault();
    this.setState({
      adminType: !this.state.adminType,
    });
  }

  render() {
    const {
      refsSuccess,
      refsError,
      userProfile,
      shiftSummary,
      leaveHistory,
    } = this.props;

    if (!refsSuccess) {
      return <LoadingPage half={this.props.timedRefs} error={refsError} />;
    }

    const dataList = {
      loading: false,
      profile: userProfile,
      shift: shiftSummary,
      leaves: leaveHistory,
    };

    return (
      <PageWrap>
        <Helmet>
          <title>Employee Portal Home Page</title>
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <Landing adminType={this.state.adminType} link={this.changeType} {...dataList} selectedDate={this.shiftDate} />
        </Main>
        <Footer />
      </PageWrap>
    );
  }
}

LandingPage.propTypes = {
  location: PropTypes.object,
  userProfile: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  timedRefs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  refsSuccess: PropTypes.bool,
  refsError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  shiftSummary: PropTypes.object,
  leaveHistory: PropTypes.object,
  // Function dispatch props
  getInitialEmpData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userProfile: makeSelectUserInfo(),
  timedRefs: makeSelectRefs('timedEarnTypes'),
  refsSuccess: makeSelectSuccess('refsList'),
  shiftSummary: makeSelectList('empShiftSummary'),
  leaveHistory: makeSelectList('empLeaveHistory'),
});

function mapDispatchToProps(dispatch) {
  return {
    getInitialEmpData: (date) => dispatch(getInitialEmpData(date)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LandingPage);
