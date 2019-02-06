import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

/* Global Components */
import Section from 'components/Section';
import H2 from 'components/Section/H2';

/* Global References */
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { makeSelectData } from '../selectors';

import reducer from '../reducer';
import saga from '../saga';

import WrapList from '../WrapList';
/* Selectors */
export class AssetDetails extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { lists } = this.props;
    let list;

    if (lists) {
      list = lists.map((item) =>
        (<WrapList>
          <h3 key={item.AssetID}>{item.Name}</h3>
          <label htmlFor="is-available">{(item.IsAllowToBring) ? 'Available: Allowed to bring out' : 'Not Allowed' }</label>
        </WrapList>)
      );
    }
    return (
      <Section>
        <H2>Asset Details</H2>
        {list}
      </Section>
    );
  }
}

AssetDetails.propTypes = {
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

const mapStateToProps = createStructuredSelector({
  lists: makeSelectData('assetList'),
});

const withConnect = connect(mapStateToProps, null);

const withReducer = injectReducer({ key: 'Forms', reducer });
const withSaga = injectSaga({ key: 'Forms', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AssetDetails);
