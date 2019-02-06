/**
 * Employee MasterList Component
 * @prop {object} columns   Columns to show in masterlist
 * @prop {object} options   Button options with their call back functions
 * @prop {object} filters   Options for the smart filters
 * @prop {object} includes  Data to be retrieve from the employee profiles (based on includes provided by back end)
 * @prop {func}   data      Callback function for getting the retrieved employee list (array objectlist)
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactPaginate from 'react-paginate';

/* Global injectSaga and injectReducer */
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Section from 'components/Section';
import H2 from 'components/Section/H2';
import SearchFilter from 'components/SearchFilter';
import Pagination from 'components/Pagination';

/* selectors, reducer, saga and actions */
import reducer from './reducer';
import saga from './saga';
import { makeSelectPages } from './selectors';
import { getEmpMasterList } from './actions';
import { MasterList } from './constants';

class EmpMasterLists extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      empSearchVal: false,
      empPageIndex: 1,
      empPageSize: 20,
      empMaxPage: 1,
    };
  }

  componentDidMount = () => {
    this.getEmpList(false);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps);
    this.setState({
      empMaxPage: nextProps.pages.MaxPageIndex || 1,
    });
  }

  getEmpList = (isPagination) => {
    const { empSearchVal, empPageIndex, empPageSize } = this.state;

    const data = {
      SortFilter: {
        PageIndex: empPageIndex,
        PageSize: empPageSize,
        SortBy: 'LastName',
        SortExpression: 'ASC',
      },
      Includes: {
        inShortDetails: true,
        withAvatar: true,
        withEmpIDs: true,
        withWorkGroup: true,
        withEmploymentStatus: true,
        withJobRole: true,
        withComSiteLoc: true,
        // withWorkForceUserFlag: true,
      },
      FirstAndLastName: empSearchVal || undefined,
    };

    if (isPagination) {
      this.props.retrieveEmpList(MasterList.PAGING, data);
    } else {
      this.props.retrieveEmpList(MasterList.RETRIEVE, data);
    }
  }

  searchEmpList = (val) => {
    this.setState({
      empSearchVal: val,
    }, () => this.getEmpList(false));
  }

  gotoEmpListPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      empPageIndex: page,
    }, () => this.getEmpList(true));
  }

  render() {
    const { empMaxPage } = this.state;
    return (
      <Section>
        <H2>Employee Master List</H2>

        <SearchFilter search onClick={(val) => { this.searchEmpList(val); }} placeholder="Search Employees..." defaultVal={(this.state.empSearchVal) || ''} />

        {(empMaxPage !== 1) &&
          <Pagination>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={<span>...</span>}
              breakClassName={'break-me'}
              pageCount={empMaxPage}
              marginPagesDisplayed={1}
              pageRangeDisplayed={4}
              onPageChange={this.gotoEmpListPage}
              activeClassName={'active'}
            />
          </Pagination>
        }
      </Section>
    );
  }
}

EmpMasterLists.propTypes = {
  columns: PropTypes.object,
  options: PropTypes.object,
  filters: PropTypes.object,
  includes: PropTypes.object,
  pages: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  retrieveEmpList: PropTypes.func,
};


const mapStateToProps = createStructuredSelector({
  pages: makeSelectPages(),
});

function mapDispatchToProps(dispatch) {
  return {
    retrieveEmpList: (type, data) => dispatch(getEmpMasterList(type, data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'EmpMasterList', reducer });
const withSaga = injectSaga({ key: 'EmpMasterList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EmpMasterLists);
