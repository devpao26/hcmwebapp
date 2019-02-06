/*
 * Alerts and Notifications Page
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { PropTypes } from 'prop-types';

/* Global References */
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

/* Global Components */
import ReactPaginate from 'react-paginate';
import Pagination from 'components/Pagination';
import Modal from 'components/Modal';
// import ConfirmBox from 'components/ConfirmationDialog';

import Wrapper from 'components/AlertsNotification';

/* selectors, reducer, saga and actions */
import reducer from './reducer';
import saga from './saga';

import { makeSelectToggleModal, makeSelectPageDetails, makeSelectIsAlert } from './selector';

import { getAlertsNotif, resetState } from './action';

import Lists from './Lists';

export class AlertsAndNotifications extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      retrieveCount: 0,
      isRead: false,
      filterName: 'latest',
    };
  }

  componentDidMount() {
    //
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show && this.state.retrieveCount < 1) {
      this.props.retrieveAlertNotif(1, false);
      // This is a count of our data retrieval, to stop from looping saga request
      this.setState({
        retrieveCount: this.state.retrieveCount + 1,
      });

      // Check if we are going to show, add a no-scroll class in body to prevent background from scrolling
      const el = document.getElementsByTagName('body')[0];
      el.classList.add('no-scroll');
    }
  }

  onGotoPage = (e) => {
    const page = e.selected + 1;
    this.props.retrieveAlertNotif(page, this.state.isRead);
  }

  hideAlertNotif = () => {
    this.setState({
      retrieveCount: 0,
      filterName: 'latest',
    });

    const el = document.getElementsByTagName('body')[0];
    el.classList.remove('no-scroll');

    this.props.close();
  }

  changeFilter = (e, name) => {
    this.setState({
      filterName: name,
      isRead: (name === 'unseen') && true,
    });

    if (name === 'latest') {
      this.props.retrieveAlertNotif(1, false);
    }
    if (name === 'unseen') {
      this.props.retrieveAlertNotif(1, true);
    }
  }

  render() {
    const { pages } = this.props;
    let maxPageIndex = 1;
    if (pages) maxPageIndex = pages.MaxPageIndex;

    if (!this.props.show) {
      return null;
    }

    return (
      <Modal
        show={this.props.show}
        showCloseBtn
        onClose={this.hideAlertNotif}
        title={(this.props.isRequestAlert) ? 'Alerts' : 'Notifications'}
        width="450px"
      >
        <Wrapper>
          <div className="filters">
            <button className={(this.state.filterName === 'latest') && 'active'} title="By Latest" onClick={(e) => { this.changeFilter(e, 'latest'); }}>By Latest</button>
            {/* <button title="By Priority">By Priority</button> */}
            <button className={(this.state.filterName === 'unseen') && 'active'} title="Unseen" onClick={(e) => { this.changeFilter(e, 'unseen'); }}>Unseen</button>
          </div>
          <Lists />
          { (pages && maxPageIndex > 1) &&
            <Pagination>
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={<span>...</span>}
                breakClassName={'break-me'}
                pageCount={maxPageIndex}
                marginPagesDisplayed={1}
                pageRangeDisplayed={4}
                onPageChange={this.onGotoPage}
                activeClassName={'active'}
              />
            </Pagination>
          }
        </Wrapper>
      </Modal>
    );

    // return (
    //   <Modal
    //     show={this.props.show}
    //     showCloseBtn
    //     onClose={this.hideAlertNotif}
    //     title={(this.props.isRequestAlert) ? 'ALERTS' : 'NOTIFICATIONS'}
    //     width="450px"
    //   >
    //     <Wrapper>
    //       <div className="filters">
    //         <button className={(this.state.filterName === 'latest') && 'active'} title="By Latest" onClick={(e) => { this.changeFilter(e, 'latest'); }}>By Latest</button>
    //         {/* <button title="By Priority">By Priority</button> */}
    //         <button className={(this.state.filterName === 'unseen') && 'active'} title="Unseen" onClick={(e) => { this.changeFilter(e, 'unseen'); }}>Unseen</button>
    //       </div>
    //       <Lists />
    //       { (pages && maxPageIndex > 1) &&
    //         <Pagination>
    //           <ReactPaginate
    //             previousLabel={'Previous'}
    //             nextLabel={'Next'}
    //             breakLabel={<span>...</span>}
    //             breakClassName={'break-me'}
    //             pageCount={maxPageIndex}
    //             marginPagesDisplayed={1}
    //             pageRangeDisplayed={4}
    //             onPageChange={this.onGotoPage}
    //             activeClassName={'active'}
    //           />
    //         </Pagination>
    //       }
    //     </Wrapper>
    //   </Modal>
    // );
  }
}

AlertsAndNotifications.defaultProps = {
  show: false,
};

AlertsAndNotifications.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func,
  // map state to props
  pages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  isRequestAlert: PropTypes.bool,
  // function dispatch props
  retrieveAlertNotif: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  show: makeSelectToggleModal(),
  pages: makeSelectPageDetails('alertsNotif'),
  isRequestAlert: makeSelectIsAlert(),
});

function mapDispatchToProps(dispatch) {
  return {
    close: () => dispatch(resetState()),
    retrieveAlertNotif: (page, isRead) => dispatch(getAlertsNotif(page, isRead)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'AlertsNotif', reducer });
const withSaga = injectSaga({ key: 'AlertsNotif', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AlertsAndNotifications);
