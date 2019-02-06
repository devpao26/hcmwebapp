import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { PropTypes } from 'prop-types';
import ReactPaginate from 'react-paginate';

/* Font Awesome */
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faPlus,
} from '@fortawesome/fontawesome-free-solid';

/* Global Components */
import Modal from 'components/Modal';
import Search from 'components/SearchFilter';
import Pagination from 'components/Pagination';
import ListBox from 'components/Modal/Listings';
import Section from 'components/Section';
import H2 from 'components/Section/H2';

/* Global References */
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

/* AssetLists */
import Lists from './Lists';
import WrapList from '../WrapList';

/* Buttons */
import ButtonEmp from '../ButtonEmp';

import { getEmpList, getEmpListNoReset, clearState } from '../actions';

import { makeSelectLoading, makeSelectError, makeSelectData, makeSelectPageDetails } from '../selectors';

import reducer from '../reducer';
import saga from '../saga';

export class AssignedEmployees extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isEmployeeLists: false,
      requiredEmployeeId: false,
    };
  }
  componentWillUnmount() {
    this.props.onResetRequests();
  }
  // Show employee prompt
  showEmployees = () => {
    this.setState({
      isEmployeeLists: true,
    });
    this.props.retrieveEmpList(1, false);
  }
  // Dismiss employee prompt
  dismissEmployee = () => {
    this.setState({
      isEmployeeLists: false,
      showCauseMemoList: false,
      empSearchVal: '',
      approvedSearchVal: '',
      approvedPageIndex: 1,
      empListPageIndex: 1,
    });
  }
  // Paginate employee listings
  gotoEmpListPage = (e) => {
    const page = e.selected + 1;
    this.setState({
      empListPageIndex: page,
    });
    this.props.retrieveEmpListNoReset(page, this.state.empSearchVal);
  }
  // Reset state to its original value
  dismissSuccess = () => {
    this.setState({ isEmployeeLists: false });
    // Close Request Modal
    this.props.close();

    // Reset to original state
    this.props.onResetRequests();
  }
  // Search employee list
  searchEmpList = (name) => {
    this.setState({
      empSearchVal: (name) || '',
      empListPageIndex: 1,
    });
    this.props.retrieveEmpList(1, name);
  }
   // Show multiple selected employee list
  showMultipleAssignedEmployee = (selectedEmployees, selectedEmpNames) => {
    this.setState({
      selectedEmployees,
      selectedEmpNames,
      requiredEmployeesId: false,
    });
    console.log(selectedEmployees, selectedEmpNames);
  }
  render() {
    const { empListPageDetails } = this.props;
    let maxPageIndex = 1; // Get Max Page Index of the list (defaults to 1)

    if (empListPageDetails != null) {
      maxPageIndex = empListPageDetails.MaxPageIndex;
    }
    return (
      <Section>
        <H2>Asset Details</H2>
        <WrapList>
          <label className={(this.state.requiredEmployeeId) && 'required-label'} htmlFor="assign-to-resource">ASSIGN TO RESOURCE <ButtonEmp onClick={(e) => { e.preventDefault(); this.showEmployees(); }}><FontAwesomeIcon icon={faPlus} /></ButtonEmp></label>
        </WrapList>
        <Modal
          show={this.state.isEmployeeLists}
          onClose={this.dismissEmployee}
          showCloseBtn
          title="Employee List"
          width="340px"
        >
          <ListBox>
            <Search search onClick={(val) => { this.searchEmpList(val); }} placeholder="Search Employees..." defaultVal={this.state.empSearchVal} />
            <ButtonEmp onClick={(e) => { e.preventDefault(); this.setState({ isEmployeeLists: false }); }}><FontAwesomeIcon icon={faPlus} /></ButtonEmp>
            <Lists selectMultipleEmp={this.showMultipleAssignedEmployee} />
            {(empListPageDetails && maxPageIndex !== 1) &&
              <Pagination>
                <ReactPaginate
                  previousLabel={'Previous'}
                  nextLabel={'Next'}
                  breakLabel={<span>...</span>}
                  breakClassName={'break-me'}
                  pageCount={maxPageIndex}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={4}
                  onPageChange={this.gotoEmpListPage}
                  activeClassName={'active'}
                />
              </Pagination>
            }
          </ListBox>
        </Modal>

      </Section>
    );
  }
}

AssignedEmployees.propTypes = {
  close: PropTypes.func,
  retrieveEmpList: PropTypes.func,
  retrieveEmpListNoReset: PropTypes.func,
  onResetRequests: PropTypes.func,
  empListPageDetails: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('empList'),
  error: makeSelectError('empList'),
  lists: makeSelectData('empList'),
  empListPageDetails: makeSelectPageDetails('empList'),
});

function mapDispatchToProps(dispatch) {
  return {
    retrieveEmpList: (page, search) => dispatch(getEmpList(page, search)),
    retrieveEmpListNoReset: (page, search) => dispatch(getEmpListNoReset(page, search)),
    onResetRequests: () => dispatch(clearState()),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'Forms', reducer });
const withSaga = injectSaga({ key: 'Forms', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AssignedEmployees);
