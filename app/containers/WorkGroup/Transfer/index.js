/**
 * Transfer Employee to another workgroup
 * @prop {string} empID        ID of the team/emp to be transferred
 * @prop {string} name      Name of the selected emp/team to be transferred
 * @prop {string} current   Current placement of the selected emp/team
 * @prop {bool}   oldIsTeam Check if our old placement is team/dept
 * @prop {func}   cancel    Hide the transfer modal
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactPaginate from 'react-paginate';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheckCircle, faCaretRight, faChevronRight } from '@fortawesome/fontawesome-free-solid';

import Loading from 'components/LoadingIndicator/Loading';
import Pagination from 'components/Pagination';
import Lists from 'components/Employee/SmallEMPList';
import Button from 'components/Button';
import Search from 'components/SearchFilter';
import Breadcrumbs from 'components/Breadcrumbs';

import Wrapper from './Wrapper';

import { getTransferList, getTransferListNoReset } from '../actions';
import { makeSelectLoading, makeSelectError, makeSelectData, makeSelectPageDetails } from '../selectors';

export class TransferComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbs: [{
        id: false,
        name: 'VKPO',
        isTeam: false,
      }],
      listID: false,
      listIsTeam: false,
      isParentTeam: false,
      selectedID: false,
      selectedName: false,
      selectedIsTeam: false,
      searchVal: false,
    };
  }

  componentDidMount() {
    this.props.retrieveTransferList(false, false, 1, false);
  }

  searchList = (val) => {
    this.setState({
      searchVal: val,
      selectedID: false,
      selectedName: false,
      selectedIsTeam: false,
    });
    this.props.retrieveTransferListNoReset(this.state.listID, this.state.isParentTeam, 1, val);
  }

  gotoPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      pageIndex: page,
      selectedID: false,
      selectedName: false,
      selectedIsTeam: false,
    });
    // const id = (this.state.listIsTeam) ? this.state.listID : false;
    this.props.retrieveTransferListNoReset(this.state.listID, this.state.isParentTeam, page, this.state.searchVal);
  }

  retrieveList = (e, groupID, groupName, isParentTeam, isTeam) => {
    const index = this.state.breadcrumbs.findIndex((item) => item.id === groupID);
    if (index === -1) {
      this.setState((prevState) => ({
        breadcrumbs: [...prevState.breadcrumbs, { id: groupID, name: groupName, isTeam: isParentTeam }],
      }));
    }

    this.setState({
      listID: groupID,
      listIsTeam: isTeam,
      isParentTeam,
      searchVal: false,
      selectedID: false,
      selectedName: false,
      selectedIsTeam: false,
    });
    this.props.retrieveTransferList(groupID, isParentTeam, 1, false);
  }

  select = (e, groupID, isTeam, groupName) => {
    // get all element in the list
    const childEl = e.currentTarget.parentNode.parentNode.parentNode.children;
    // get the clicked element
    const targetEl = e.currentTarget.parentNode.parentNode;
    // Iterate through all the element and toggle the class
    for (let i = 0; i < childEl.length; i += 1) {
      if (targetEl !== childEl[i]) {
        childEl[i].classList.remove('active');
      } else {
        if (childEl[i].classList.contains('active')) { // eslint-disable-line no-lonely-if
          childEl[i].classList.remove('active');
          this.setState({
            selectedID: false,
            selectedName: false,
            selectedIsTeam: false,
          });
        } else {
          childEl[i].classList.add('active');
          this.setState({
            selectedID: groupID,
            selectedName: groupName,
            selectedIsTeam: isTeam,
          });
        }
      }
    }
  }

  gotoBreadcrumbs = (e, id, isTeam) => {
    e.preventDefault();
    const index = this.state.breadcrumbs.findIndex((item) => item.id === id);

    const newCrumbs = this.state.breadcrumbs;
    newCrumbs.length = index + 1;

    this.setState({
      breadcrumbs: newCrumbs,
      isParentTeam: isTeam,
      listID: id,
      searchVal: false,
      selectedID: false,
      selectedName: false,
      selectedIsTeam: false,
    });

    this.props.retrieveTransferList(id, isTeam, 1, false);
  }

  submitTransfer = () => {
    this.props.confirm(this.state.selectedIsTeam, this.state.selectedID, this.state.selectedName);
  }

  render() {
    const {
      loading, error, lists, pages,
      names, current, oldIsTeam,
    } = this.props;

    let name;
    if (names.length > 1) {
      name = names.map((item) => <p key={item.id} className="name">{item.name}</p>);
    } else {
      name = <p className="name">{names[0].name}</p>;
    }

    let items;
    let crumbs;
    if (this.state.breadcrumbs.length > 0) {
      const totalNav = this.state.breadcrumbs.length - 1;
      crumbs = this.state.breadcrumbs.map((nav, index) => {
        if (index === totalNav) return <span key={nav.id} className="text-green">{nav.name}</span>;
        return <span key={nav.id}><a role="presentation" onClick={(e) => { this.gotoBreadcrumbs(e, nav.id, nav.isTeam); }}>{nav.name}</a><FontAwesomeIcon icon={faChevronRight} /></span>;
      });
    }

    let maxPageIndex = 5;
    if (pages) {
      maxPageIndex = pages.MaxPageIndex;
    }

    if (loading) items = <Loading />;

    if (error) {
      if (error.ErrorCode === 204) {
        items = <p className="message">No Record(s) Found.</p>;
      } else {
        items = <p className="message">There is a problem communicating with the server. Please try again later.</p>;
      }
    }

    if (lists) {
      let isTeam = false;
      items = lists.map((item) => {
        if (item.TeamID) isTeam = true;
        const groupID = (isTeam) ? item.TeamID : item.DeptID;
        return (
          <dl key={groupID}>
            <dd>
              <h4 role="presentation" onClick={(e) => { this.select(e, groupID, isTeam, item.Name); }} title="Select this group">{item.Name}</h4>
            </dd>
            <FontAwesomeIcon icon={faCheckCircle} />
            <button className="goto" title="Open this group" onClick={(e) => { this.retrieveList(e, groupID, item.Name, isTeam, true); }}><FontAwesomeIcon icon={faCaretRight} /></button>
          </dl>
        );
      });
    }

    return (
      <Wrapper>
        <div className="cols current">
          <h3>Current Placement</h3>
          <div className="box">
            <p className="current-placement">{(oldIsTeam) ? 'Team Name' : 'Department Name'}: {current}</p>
            {name}
          </div>
          <div className="action">
            { (this.state.selectedID)
              ? <Button color="gray" handleRoute={this.submitTransfer}>CONFIRM</Button>
              : <Button color="gray" deadButton opaque>CONFIRM</Button>
            }
            <Button color="red" handleRoute={this.props.cancel}>CANCEL</Button>
          </div>
        </div>
        <div className="cols arrow"><FontAwesomeIcon icon={faArrowRight} /></div>
        <div className="cols transfer">
          <h3>Transfer to:</h3>
          <div className="box">
            <Search search onClick={(val) => { this.searchList(val); }} formRef={(el) => { this.searchForm = el; }} defaultVal={(this.state.searchVal) || ''} placeholder="Search Lists..." />
            <Breadcrumbs className="breadcrumbs">
              {crumbs}
              {/* <span><a role="presentation" onClick={() => { }}>Team</a><FontAwesomeIcon icon={faChevronRight} /></span>
              <span className="text-green">Department</span> */}
            </Breadcrumbs>
            <Lists className="transfer-list">
              {items}
            </Lists>
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
          </div>
        </div>
      </Wrapper>
    );
  }
}

TransferComponent.propTypes = {
  // empID: PropTypes.oneOfType([
  //   PropTypes.bool,
  //   PropTypes.string,
  // ]),
  names: PropTypes.array,
  current: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  oldIsTeam: PropTypes.bool,
  cancel: PropTypes.func,
  confirm: PropTypes.func,
  // Map state props
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
  // function dispatch props
  retrieveTransferList: PropTypes.func,
  retrieveTransferListNoReset: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('transferList'),
  error: makeSelectError('transferList'),
  lists: makeSelectData('transferList'),
  pages: makeSelectPageDetails('transferList'),
});

function mapDispatchToProps(dispatch) {
  return {
    retrieveTransferList: (id, isTeam, page, search) => dispatch(getTransferList(id, isTeam, page, search)),
    retrieveTransferListNoReset: (id, isTeam, page, search) => dispatch(getTransferListNoReset(id, isTeam, page, search)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(TransferComponent);
