/**
 * Enrolled List
 * @prop {string}   templateID  Template GUID
 * @prop {function} showAddTo   Function for the modal of add to list
 * @prop {bool}     refresh     True/False that will trigger a refresh every time this props change value
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ReactPaginate from 'react-paginate';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/fontawesome-free-solid';

import Loading from 'components/LoadingIndicator/Loading';
import Pagination from 'components/Pagination';
import SearchFilter from 'components/SearchFilter';
import FilterButton from 'components/SearchFilter/Button';
import Avatar from 'components/Img/Avatar';
import OptionMenu from 'components/OptionMenu';
import Lists from 'components/Configurations/Lists';

import GroupFilter from 'components/Enums/GroupFilter';

/* selectors and actions */
import { DEFAULT_GUID } from 'containers/App/constants';
import { Enrolled } from './constants';
import { makeSelectLoading, makeSelectError, makeSelectData, makeSelectPageDetails } from './selectors';
import {
  getEnrolled,
} from './actions';

class EnrolledListComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      enrolledPage: 1,
      enrolledSearch: '',
      enrolledFilter: GroupFilter.Employee,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.templateID !== this.props.templateID && nextProps.templateID !== '') {
      this.props.retrieveEnrolled(Enrolled.RETRIEVE, nextProps.templateID, 1, false, this.state.enrolledFilter);
    }

    if (nextProps.refresh !== this.props.refresh) {
      this.props.retrieveEnrolled(Enrolled.RETRIEVE, this.props.templateID, this.state.enrolledPage, this.state.enrolledSearch, this.state.enrolledFilter);
    }
  }

  enrolledSearch = (val) => {
    this.setState({
      enrolledPage: 1,
      enrolledSearch: (val) || '',
    });
    this.props.retrieveEnrolled(Enrolled.PAGING, this.props.templateID, 1, val, this.state.enrolledFilter);
  }

  enrolledGotoPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      enrolledPage: page,
    });
  }

  enrolledListFilter = (e, filter) => {
    this.setState({
      enrolledFilter: filter,
    });
    this.props.retrieveEnrolled(Enrolled.RETRIEVE, this.props.templateID, 1, false, filter);
  }

  render() {
    const { enrolledFilter } = this.state;
    const { templateID, loading, error, lists, pages } = this.props;
    let items;
    let errorMessage;

    let enrolledMaxPageIndex = 1;
    if (pages) enrolledMaxPageIndex = pages.MaxPageIndex;

    // Default return when we haven't selected a template
    if (!templateID) return <Lists id="enrolledList" className="template-list"><p className="message">Please select template.</p></Lists>;

    if (error) {
      if (error.ErrorCode === 204) {
        errorMessage = <p className="message">No Record(s) Found.</p>;
      } else {
        errorMessage = <p className="message">There was a problem communicating with the server. Please try again later.</p>;
      }
    }

    if (lists) {
      if (enrolledFilter === GroupFilter.Employee) {
        items = lists.map((item) => {
          let deptName;
          let teamName;
          if (item.WorkGroup.length > 0) {
            deptName = item.WorkGroup[0].Department.Name;
            teamName = (item.WorkGroup[0].Team.TeamID !== DEFAULT_GUID) ? `- ${item.WorkGroup[0].Team.Name}` : '';
          }

          return (
            <li key={item.EmpProfileID}>
              { (item.EmpAvatarAttachs != null)
                ? <Avatar bgImage={`url('${item.EmpAvatarAttachs.Path}')`} />
                : <Avatar />
              }
              <p>
                {item.LastName}, {item.FirstName}
                {(item.WorkGroup.length !== 0) && <small>{deptName} {teamName}</small>}
                {(item.WorkMonitoringTemplate.TemplateInheritance.InheritedFromID !== DEFAULT_GUID) && <small><i>Template inherited from {item.WorkMonitoringTemplate.TemplateInheritance.RefType} - {item.WorkMonitoringTemplate.TemplateInheritance.Name}</i></small>}
              </p>
              {(item.WorkMonitoringTemplate.TemplateInheritance.InheritedFromID === DEFAULT_GUID) && <button title="Delete" className="delete" onClick={() => { this.props.unassign(item.EmpProfileID, GroupFilter.Employee); }}><FontAwesomeIcon icon={faMinusCircle} /></button>}
            </li>
          );
        });
      }

      if (enrolledFilter === GroupFilter.Workgroup) {
        items = lists.map((item) => (
          <li key={item.TeamID}>
            <p>
              {item.Name}
            </p>
            <button title="Delete" className="delete" onClick={() => { this.props.unassign(item.TeamID, GroupFilter.Workgroup); }}><FontAwesomeIcon icon={faMinusCircle} /></button>
          </li>
        ));
      }

      if (enrolledFilter === GroupFilter.Department) {
        items = lists.map((item) => (
          <li key={item.DeptID}>
            <p>
              {item.Name}
            </p>
            <button title="Delete" className="delete" onClick={() => { this.props.unassign(item.DeptID, GroupFilter.Department); }}><FontAwesomeIcon icon={faMinusCircle} /></button>
          </li>
        ));
      }
    }

    return (
      <Lists id="enrolledList">
        {/* <button className="mobile-toggle" title={this.state.mobileEnrolledSelected} onClick={(e) => { this.toggleMobileList(e, false, 'enrolledList'); }}>
          {this.state.mobileEnrolledSelected}
          <FontAwesomeIcon icon={faCaretDown} />
        </button> */}
        <div className="create-new">
          Enroll
          <OptionMenu title="Category" position="right" icon="plus">
            <button onClick={() => { this.props.showAddTo(GroupFilter.Workgroup); }}>Workgroup</button>
            <button onClick={() => { this.props.showAddTo(GroupFilter.Department); }}>Department</button>
            <button onClick={() => { this.props.showAddTo(GroupFilter.Employee); }}>Employee</button>
          </OptionMenu>
        </div>
        <SearchFilter search onClick={(val) => { this.enrolledSearch(val); }} placeholder="Search Enrolled" defaultVal={this.state.enrolledSearch}>
          <FilterButton className={(enrolledFilter === GroupFilter.Employee) && 'active'} onClick={(e) => { this.enrolledListFilter(e, GroupFilter.Employee); }}>Employee</FilterButton>
          <FilterButton className={(enrolledFilter === GroupFilter.Workgroup) && 'active'} onClick={(e) => { this.enrolledListFilter(e, GroupFilter.Workgroup); }}>Workgroup</FilterButton>
          <FilterButton className={(enrolledFilter === GroupFilter.Department) && 'active'} onClick={(e) => { this.enrolledListFilter(e, GroupFilter.Department); }}>Department</FilterButton>
        </SearchFilter>
        {errorMessage}
        { (loading) && <div className="loading-cont"><Loading /></div> }
        { (lists) &&
          <ul className="lists enrolled-list">
            {items}
          </ul>
        }
        { (pages && enrolledMaxPageIndex > 1) &&
          <Pagination>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={<span>...</span>}
              breakClassName={'break-me'}
              pageCount={enrolledMaxPageIndex}
              marginPagesDisplayed={1}
              pageRangeDisplayed={4}
              onPageChange={this.enrolledGotoPage}
              activeClassName={'active'}
            />
          </Pagination>
        }
      </Lists>
    );
  }
}

EnrolledListComponent.propTypes = {
  templateID: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  showAddTo: PropTypes.func,
  refresh: PropTypes.bool,
  unassign: PropTypes.func,
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
  // Function dispatch props
  retrieveEnrolled: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('enrolledList'),
  error: makeSelectError('enrolledList'),
  lists: makeSelectData('enrolledList'),
  pages: makeSelectPageDetails('enrolledList'),
});

function mapDispatchToProps(dispatch) {
  return {
    retrieveEnrolled: (type, id, page, search, filter) => dispatch(getEnrolled(type, id, page, search, filter)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(EnrolledListComponent);
