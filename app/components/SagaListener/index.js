/**
 * This component will only be a listener
 * for sagas that need to stay alive even
 * if user changed view pages
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

/* Global injectSaga and injectReducer */
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';

export class ListenerSaga extends React.PureComponent {
  render() {
    return (
      <div></div>
    );
  }
}

ListenerSaga.propTypes = {}

const mapStateToProps = createStructuredSelector({

});

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'listeners', reducer });
const withSaga = injectSaga({ key: 'listeners', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ListenerSaga);
// export default ListenerSaga;