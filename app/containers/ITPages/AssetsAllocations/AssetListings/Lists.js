/**
 * Employee List Component
 * @prop {bool}   loading   True/False if emp list is retrieving
 * @prop {object} error     Error details
 * @prop {array}  lists     Employee List
 * @prop {func}   selectAssets  Setting the EMP id on the parent component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPlus } from '@fortawesome/fontawesome-free-solid';

import ReactPaginate from 'react-paginate';
import Pagination from 'components/Pagination';
import Loading from 'components/LoadingIndicator/Loading';
import Lists from 'components/AccessPermission/Lists';
import H2 from 'components/Section/H2';
import Search from 'components/SearchFilter';
// import Avatar from 'components/Img/Avatar';
import FilterButton from 'components/SearchFilter/Button';

import { getAssetList, getAssetListNoReset } from '../actions';
import { makeSelectLoading, makeSelectError, makeSelectData, makeSelectPageDetails } from '../selectors';

import ButtonEmp from '../ButtonEmp';

class EmpListComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listSearchVal: false,
      listPage: 1,
      selectedEmpID: false,
      selectedEmpName: '',
      selectedEmpAccess: [],
    };
  }

  componentDidMount() {
    // Retrieve emp list
    this.props.retrieveAssetList(false);
  }

  selectAssets = (e, assetid, name, cost, unitavailable, descr) => {
    // get all element in the list
    const childEl = e.currentTarget.parentNode.children;
    // get the clicked element
    const targetEl = e.currentTarget;

    // Iterate through all the element and toggle the class
    for (let i = 0; i < childEl.length; i += 1) {
      if (targetEl !== childEl[i]) {
        childEl[i].classList.remove('selected');
      } else {
        if (childEl[i].classList.contains('selected')) { // eslint-disable-line no-lonely-if
          childEl[i].classList.remove('selected');
          this.setState({
            selectedEmpID: false,
            selectedEmpName: '',
            selectedEmpAccess: false,
            selectedUnit: false,
            selectedDescr: false,
          });
          this.props.selectAssets(false, '', false);
        } else {
          childEl[i].classList.add('selected');
          this.setState({
            selectedEmpID: assetid,
            selectedEmpName: name,
            selectedEmpAccess: cost,
            selectedUnit: unitavailable,
            selectedDescr: descr,
          });
          this.props.selectAssets(assetid, name, cost, unitavailable, descr);
        }
      }
    }
  }

  listSearch = (val) => {
    this.setState({
      listSearchVal: val,
      selectedEmpID: false,
      selectedEmpName: '',
      selectedEmpAccess: false,
      listPage: 1,
    });
    this.props.selectAssets(false, '', false);
    this.props.retriveAssetNoListReset(1, val);
  }

  gotoPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      selectedEmpID: false,
      selectedEmpName: '',
      selectedEmpAccess: false,
      listPage: page,
    });
    this.props.selectAssets(false, '', false);
    this.props.retriveAssetNoListReset(page, this.state.listSearchVal);
  }

  render() {
    const { loading, error, lists, pages } = this.props;
    let items;
    let maxPageIndex = 1;
    if (pages) maxPageIndex = pages.MaxPageIndex;

    if (loading) items = <li><Loading /></li>;

    if (error) {
      if (error.ErrorCode === 204) {
        items = <li><p className="message">No Record(s) Found.</p></li>;
      } else {
        items = <li><p className="message">There was a problem communicating with the server. Please try again later.</p></li>;
      }
    }

    if (lists) {
      items = lists.map((item) => {
        // const access = (item.AccessPermissionTemplate.length !== 0) ? item.AccessPermissionTemplate[0].AccessModulePermissionList : false;
        return (
          <li role="presentation" key={item.AssetStatusID} onClick={(e) => { this.selectAssets(e, item.AssetStatusID, item.Name, item.Cost, item.UnitAvailable, item.Descr); }}>
            <p>
              {item.Name}
            </p>
            <FontAwesomeIcon icon={faCheckCircle} />
          </li>
        );
      });
    }

    return (
      <Lists>
        <H2>Assigned Lists</H2>
        <Search search onClick={(val) => { this.listSearch(val); }} placeholder="Search Asset..." defaultVal={(this.state.listSearchVal) || ''}><br /><br />
          <FilterButton className="active" onClick={(e) => this.filterLeaveReqList(e, false)}>ALL</FilterButton>
          <FilterButton onClick={(e) => { this.filterLeaveReqList(e, FORMREQUEST_PENDING); }}>AVAILABLE</FilterButton>
          <FilterButton onClick={(e) => { this.filterLeaveReqList(e, FORMREQUEST_REJECT); }}>UNAVAILABLE</FilterButton>
          <FilterButton onClick={(e) => { this.filterLeaveReqList(e, FORMREQUEST_APPROVE); }}>OUT OF STOCK</FilterButton>
          <label className="button-emp" htmlFor="add-new-asset"><ButtonEmp onClick={(e) => { e.preventDefault(); }}><FontAwesomeIcon icon={faPlus} /></ButtonEmp>&nbsp;ADD NEW ASSET</label>
        </Search>
        <ul className="listings">
          {items}
        </ul>
        { (pages && maxPageIndex !== 1) &&
          <Pagination>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={<span>...</span>}
              breakClassName={'break-me'}
              pageCount={maxPageIndex}
              marginPagesDisplayed={1}
              pageRangeDisplayed={4}
              onPageChange={this.gotoPage}
              activeClassName={'active'}
            />
          </Pagination>
        }
      </Lists>
    );
  }
}

EmpListComponent.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  pages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  selectAssets: PropTypes.func,
  retrieveAssetList: PropTypes.func,
  retriveAssetNoListReset: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('assetList'),
  error: makeSelectError('assetList'),
  lists: makeSelectData('assetList'),
  pages: makeSelectPageDetails('assetList'),
});

function mapDispatchToProps(dispatch) {
  return {
    retrieveAssetList: (search) => dispatch(getAssetList(search)),
    retriveAssetNoListReset: (page, search) => dispatch(getAssetListNoReset(page, search)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(EmpListComponent);

