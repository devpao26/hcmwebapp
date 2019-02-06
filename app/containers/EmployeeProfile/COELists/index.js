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
// import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import H2 from 'components/Modal/H2';
import Loading from 'components/LoadingIndicator/Loading';
import Pagination from 'components/Pagination';
import ReactPaginate from 'react-paginate';
import ListWrapper from 'components/Lists/GroupList';

import reducer from './reducer';
import saga from './saga';
import {
  getCOEList, resetState,
} from './actions';

import {
  makeSelectLoading,
  makeSelectError,
  makeSelectDatas,
  makeSelectPages,
} from './selectors';
import { Lists } from './constants';

export class COEList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      page: 1,
    };
  }

  componentDidMount() {
    this.props.retrieveCOEList(Lists.RETRIEVE, 1, false);
  }

  componentWillUnmount = () => {
    this.props.resetState();
  }

  searchLists = (val) => {
    this.setState({
      search: val,
    });
    this.props.retrieveCOEList(Lists.RETRIEVE, 1, val);
  }

  gotoListPage = (e) => {
    // Send Page Index
    const page = e.selected + 1;
    this.setState({
      page,
    });
    this.props.retrieveCOEList(Lists.PAGING, page, this.state.search);
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
            {item.COEType.Name}
          </p>
          <p>
            <span>Date Requested: {moment(item.FormRequest.CreatedDate).format('LL')}</span>
            <button className="btn-view">View</button>
          </p>
        </li>
      ));
    }

    return (
      <div className="empprof-section">
        <H2>COE Request(s)</H2>
        <ListWrapper className="comp-list">
          <ul>
            {components}
          </ul>
        </ListWrapper>
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

COEList.propTypes = {
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
  retrieveCOEList: PropTypes.func,
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
    retrieveCOEList: (type, page, search) => dispatch(getCOEList(type, page, search)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'EMPProfileCOE', reducer });
const withSaga = injectSaga({ key: 'EMPProfileCOE', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(COEList);
