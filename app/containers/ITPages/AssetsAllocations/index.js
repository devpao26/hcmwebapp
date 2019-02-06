import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
// import ReactPaginate from 'react-paginate';

/* Global injectSaga and injectReducer */
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

/* Global Components */
// import Loading from 'components/LoadingIndicator';
import PageWrap from 'components/PageWrap';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';
import PageContent from 'components/Main/PageContent';
import Sidebar from 'components/Sidebar';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/fontawesome-free-solid';

/* Global Component */
import Back from 'components/Section/Back';
import Grid from 'components/Main/Grid';

/* Local Components */
import AssetListings from './AssetListings';
import AssetDetails from './AssetDetails';
import AssignedEmployees from './AssignedEmployees';


/* selectors, reducer, saga and actions */
import reducer from './reducer';
import saga from './saga';

import { makeSelectData } from './selectors';

import {
  clearState, getAssetList,
} from './actions';

export class AssetAllocations extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.retrieveAssetsList(); // Show asset listings
  }
  // componentWillUnmount() {
  //   // Clear state on unmount
  //   this.props.clearState();
  // }
  render() {
    return (
      <PageWrap>
        <Helmet>
          <title>Assets and Allocations</title>
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Back onClick={this.props.history.goBack}><FontAwesomeIcon icon={faCaretLeft} /> BACK TO IT ADMIN</Back>
            <Grid columns="450px 1fr" gap="0 20px">
              <AssetListings />
              <span>
                <AssetDetails />
                <AssignedEmployees />
              </span>
            </Grid>
          </PageContent>
        </Main>
        <Footer />
      </PageWrap>
    );
  }
}

AssetAllocations.propTypes = {
  location: PropTypes.obj,
  history: PropTypes.obj,
  retrieveAssetsList: PropTypes.func,
  clearState: PropTypes.func,
  // showAssetLists: PropTypes.oneOfType([
  //   PropTypes.bool,
  //   PropTypes.array,
  // ]),
};

const mapStateToProps = createStructuredSelector({
  showAssetLists: makeSelectData('assetList'),
});

function mapDispatchToProps(dispatch) {
  return {
    clearState: () => dispatch(clearState()),
    retrieveAssetsList: () => dispatch(getAssetList()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'AssetsAllocations', reducer });
const withSaga = injectSaga({ key: 'AssetsAllocations', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AssetAllocations);
