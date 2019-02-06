/**
 * COE List Component for Employee Profile View and Display
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';

/* Global injectSaga and injectReducer */
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import H2 from 'components/Modal/H2';
import Lists from 'components/Lists/GroupList';
import Loading from 'components/LoadingIndicator/Loading';
import Pagination from 'components/Pagination';
import ReactPaginate from 'react-paginate';

import reducer from './reducer';
import saga from './saga';

import { getCustomFormList, resetState } from './actions';

import {
  makeSelectLoading,
  makeSelectError,
  makeSelectDatas,
  makeSelectPages,
} from './selectors';
import { CFList } from './constants';

export class CFORMListComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      page: 1,
    };
  }

  componentDidMount() {
    this.props.retrieveCFormList(CFList.RETRIEVE, 1, false);
  }

  componentWillUnmount = () => {
    this.props.resetState();
  }

  searchLists = (val) => {
    this.setState({
      search: val,
    });
    this.props.retrieveCFormList(CFList.RETRIEVE, 1, val);
  }

  gotoListPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      page,
    });
    this.props.retrieveCFormList(CFList.PAGING, page, this.state.search);
  }

  render() {
    const { loading, error, lists, pages } = this.props;

    let maxPageIndex = 1;
    if (pages) maxPageIndex = pages.MaxPageIndex;

    let components;

    if (loading) components = <li><Loading /></li>;

    if (error) {
      if (error.ErrorCode === 204) {
        components = (<li><p className="message">No Record(s) Found.</p></li>);
      } else {
        components = (<li><p className="message">There is a problem communicating with the server. Please try again later.</p></li>);
      }
    }

    if (lists) {
      components = lists.map((item) => (
        <li key={item.FormRequestID} role="presentation" onClick={(e) => { this.selectItem(e, item); }}>
          <p className="name">
            Requested Date: {moment(new Date(item.FormRequest.CreatedDate)).format('LL')}
            <small>Auto Generated: {item.IsAutoRequest}</small>
            <small>Requestes CFORM Min/s: {item.RequestedCFORMMinutes}</small>
          </p>
          <p>
            <span>CFORM Date From: {item.CFORMFrom} | CFORM Date To: {item.CFORMTo}</span>
            <button className="btn-view">View</button>
          </p>
        </li>
      ));
    }

    return (
      <div className="empprof-section">
        <H2>Other Form Request(s)</H2>
        <Lists className="comp-list">
          <ul>
            {components}
          </ul>
        </Lists>
        {(maxPageIndex > 1) &&
          <Pagination>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={<span>...</span>}
              breakClassName={'break-me'}
              pageCount={maxPageIndex}
              marginPagesDisplayed={1}
              pageRangeDisplayed={4}
              onPageChange={this.gotoListPage}
              activeClassName={'active'}
            />
          </Pagination>
        }
      </div>
    );
  }
}

CFORMListComponent.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  pages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  resetState: PropTypes.func,
  retrieveCFormList: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  lists: makeSelectDatas(),
  pages: makeSelectPages(),
});


function mapDispatchToProps(dispatch) {
  return {
    resetState: () => dispatch(resetState()),
    retrieveCFormList: (type, page, search) => dispatch(getCustomFormList(type, page, search)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'EMPProfileCustomForms', reducer });
const withSaga = injectSaga({ key: 'EMPProfileCustomForms', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CFORMListComponent);
