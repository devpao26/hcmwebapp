/**
 * Employee List Component
 * @prop {bool}   loading   True/False if emp list is retrieving
 * @prop {object} error     Error details
 * @prop {array}  lists     Employee List
 * @prop {func}   selectEmp  Setting the EMP id on the parent component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/fontawesome-free-solid';

import ReactPaginate from 'react-paginate';
import Pagination from 'components/Pagination';
import Loading from 'components/LoadingIndicator/Loading';
import Lists from 'components/AccessPermission/Lists';
import H2 from 'components/Section/H2';
import Search from 'components/SearchFilter';
import Avatar from 'components/Img/Avatar';

import {
  getEmpList, getEmpListNoReset,
} from './actions';
import { makeSelectLoading, makeSelectError, makeSelectData, makeSelectPageDetails, makeSelectSuccess } from './selectors';

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
    this.props.retrieveEmpList(false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.assignSuccess || nextProps.removeSuccess) {
      this.props.retrieveEmpListNoReset(this.state.listPage, this.state.listSearchVal);
    }
  }

  selectEmp = (e, empID, empName, empAccess) => {
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
          });
          this.props.selectEmp(false, '', false);
        } else {
          childEl[i].classList.add('selected');
          this.setState({
            selectedEmpID: empID,
            selectedEmpName: empName,
            selectedEmpAccess: empAccess,
          });
          this.props.selectEmp(empID, empName, empAccess);
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
    this.props.selectEmp(false, '', false);
    this.props.retrieveEmpListNoReset(1, val);
  }

  gotoPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      selectedEmpID: false,
      selectedEmpName: '',
      selectedEmpAccess: false,
      listPage: page,
    });
    this.props.selectEmp(false, '', false);
    this.props.retrieveEmpListNoReset(page, this.state.listSearchVal);
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
        const access = (item.AccessPermissionTemplate.length !== 0) ? item.AccessPermissionTemplate[0].AccessModulePermissionList : false;
        return (
          <li role="presentation" key={item.EmpProfileID} onClick={(e) => { this.selectEmp(e, item.EmpProfileID, `${item.FirstName} ${item.LastName}`, access); }}>
            { (item.EmpAvatarAttachs != null)
              ? <Avatar bgImage={`url('${item.EmpAvatarAttachs.Path}')`} />
              : <Avatar />
            }
            <p>
              {item.LastName}, {item.FirstName}
              <small>{item.Email}</small>
            </p>
            <FontAwesomeIcon icon={faCheckCircle} />
          </li>
        );
      });
    }

    return (
      <Lists>
        <H2>Employee List</H2>
        <Search search onClick={(val) => { this.listSearch(val); }} placeholder="Search Lists..." defaultVal={(this.state.listSearchVal) || ''} />
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
  // map state props
  assignSuccess: PropTypes.bool,
  removeSuccess: PropTypes.bool,
  // props from parent
  selectEmp: PropTypes.func,
  // Function dispatch props
  retrieveEmpList: PropTypes.func,
  retrieveEmpListNoReset: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('empList'),
  error: makeSelectError('empList'),
  lists: makeSelectData('empList'),
  pages: makeSelectPageDetails('empList'),
  assignSuccess: makeSelectSuccess('assign'),
  removeSuccess: makeSelectSuccess('remove'),
});

function mapDispatchToProps(dispatch) {
  return {
    retrieveEmpList: (search) => dispatch(getEmpList(search)),
    retrieveEmpListNoReset: (page, search) => dispatch(getEmpListNoReset(page, search)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(EmpListComponent);

