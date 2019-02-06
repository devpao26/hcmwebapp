/**
 * Work Group List Component for Employee Profile View and Display
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

import {
  getWGList,
} from './actions';

import {
  makeSelectWGListLoading,
  makeSelectWGListError,
  makeSelectWGDatas,
  makeSelectWGPages,
} from './selectors';

export class WGList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // console.log(this.props.selectedEmpProfile);
  }

  reloadWGPage = (page) => {
    // const filterWGList = JSON.stringify({
    //   SortFilter: {
    //     PageIndex: page,
    //     PageSize: '20',
    //     SortBy: 'LastModDate',
    //     SortExpression: 'DESC',
    //   },
    //   CreatedBy: this.props.selectedEmpProfile.EmpProfileID,
    // });
    // // console.log("Page Count: " + filterWGList);
    // this.props.reloadByPage(filterWGList);
  }

  // TODO: Added Selection Handlers
  selectItem = (e, item) => {
  }

  GotoPage = (e) => {
    // Send Page Index
    const page = e.selected + 1;
    // this.props.reloadWithPage(page);
    this.reloadWGPage(page);
  }


  render() {
    const { loading, error, lists, wgListPage } = this.props;

    let maxPageIndex = 1;
    if (wgListPage) maxPageIndex = wgListPage.MaxPageIndex;

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
            <small>Auto Generated: {(item.IsAutoRequest) ? 'Yes' : 'No'}</small>
            <small>Requested OT Min(s): {item.RequestedOTMinutes}</small>
          </p>
          <p>
            <span>OT Date From: {item.OTFrom} | OT Date To: {item.OTTo}</span>
            <button className="btn-view">View</button>
          </p>
        </li>
      ));
    }

    return (
      <div className="empprof-section">
        <H2>Current WorkGroup</H2>
        <Lists className="comp-list">
          <ul>
            {components}
          </ul>
        </Lists>
        { (wgListPage && maxPageIndex > 1) &&
          <Pagination>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={<span>...</span>}
              breakClassName={'break-me'}
              pageCount={maxPageIndex}
              marginPagesDisplayed={1}
              pageRangeDisplayed={4}
              onPageChange={this.GotoPage}
              activeClassName={'active'}
            />
          </Pagination>
        }
      </div>
    );
  }

}

WGList.propTypes = {
  selectedEmpProfile: PropTypes.any.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.any,
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  wgListPage: PropTypes.any,
  hasWGList: PropTypes.func, // This function returns to the Parent 
  reloadByPage: PropTypes.func, // This function reloads with filter for page Index
  wgListDetail: PropTypes.any,
};


function mapDispatchToProps(dispatch) {
  return {
    reloadByPage: (filter) => {
      // console.log(filter);
      // dispatch(getWGList(filter));
    },
    // onSelectItem: (item) => dispatch(),
  };
}

const withConnect = connect(null, mapDispatchToProps);
const withReducer = injectReducer({ key: 'EMPProfWG', reducer });
const withSaga = injectSaga({ key: 'EMPProfWG', saga });

export default compose(
    withConnect,
)(WGList);
