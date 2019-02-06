/**
 * Employee List
 * @prop {function} addEmp      Function to call to add employee(s)
 * @prop {boolean}  isMultiple  Checker if going to add single or multiple employee
 *
 * NOTE: This will become a global component in the future,
 *       this component should handle adding employee in single or multiple
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';

import ListBox from 'components/Modal/Listings';
import Lists from 'components/Employee/SmallEMPList';
import SearchFilter from 'components/SearchFilter';
import Avatar from 'components/Img/Avatar';

import Loading from 'components/LoadingIndicator/Loading';
import Pagination from 'components/Pagination';
import ReactPaginate from 'react-paginate';
import Confirm from 'components/ConfirmationDialog';

/**
 * Redux Pattern Dependencies
 */
import { getList, setSelectedEmps, processEntity } from './actions';
import {
  makeSelectDataRequestLoading,
  makeSelectDataRequestError,
  makeSelectDataResponse,
  makeSelectDataPageDetail,
  makeSelectGetDataItems,
  makeSelectTempsItem,
} from './selectors';


export class EmployeeListComponent extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      empSelected: false,
      filterEmpList: false,
      type: props.listrqs,
      searchVal: false,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    // Load List depending at Props (List Request Type)
    this.props.getInfoList(this.filterList(1, this.props.listrqs), this.props.listrqs);
  }

  /**
   * Search Function
   */
  search = (val) => {
    // console.log(val); // eslint-disable-line no-console
    this.setState({ searchVal: val });
    this.props.getInfoList(this.filterList(1, this.props.listrqs, val), this.props.listrqs);
  }

  addEmployees = (e, item) => {
    e.preventDefault();
    // get all element in the list
    let childEl = e.currentTarget.parentNode.children;

    // get the clicked element
    let targetEl = e.currentTarget;

    // Iterate through all the element and toggle the class
    for (var i = 0; i < childEl.length; i++) {
      if (targetEl != childEl[i]) {
        childEl[i].classList.remove('active');
      } else {
        childEl[i].classList.add('active');
      }
    }

    // NOTE: make sure the props addEmp from the parent component can handle single and multiple
    if (this.props.isMultiple) {
      // Do something here to add multiple employee ids
      this.props.addEmp();
    } else {
      // do something and pass only a single employee id
      this.props.addEmp();
    }

    this.setState({
      empSelected: item
    });
  }

  addSelectedItem = (e) => {

    if(!this.state.empSelected) return; // If there's no selected Emp, return

    let type = this.props.listrqs;

    switch (this.props.listrqs) {
      case 1: // WorkGroup : Assign
      case 2: {
        let filter = {
          "WorkFlowProcTemplateID": this.props.tempItem.WorkFlowProcTemplateID,
        };
        if (type === 1) {
          filter.TeamID = this.state.empSelected.TeamID;
        } else { // Otherwise its a Department
          filter.DeptID = this.state.empSelected.DeptID;
        }
        let filterJSON = JSON.stringify(filter);
        // console.log(filter);
        this.props.addToSelectedEmpList(filterJSON, 2, type);

      } break;
      default: {
        var empArr = this.props.empArr ? this.props.empArr.slice() : [].slice();
        empArr.push(this.state.empSelected);
        this.props.addToSelectedEmpList(empArr, null, this.props.listrqs); 
      } break; // Employee List : Select Approvers
    }

    this.props.hide(e);

  }

  GotoPage = (e, type) => {
    const page = e.selected + 1;
    this.props.getInfoList(this.filterList(page, type, this.state.searchVal), type);
  }

  filterList(page, type, search) {
    let sortBy  = (type === 0 ? 'LastName' : 'Name');
    let filter = {
      'SortFilter': {
        'PageIndex': page,
        'PageSize': '20',
        'SortBy': sortBy, // LastName, Name
        'SortExpression': 'ASC'
      }
    };

    if(search){
      switch(type){case 1:{filter.TeamName = search;}break;case 2:{filter.Name = search;}break;default:{filter.FirstAndLastName = search;}break;}
    }

    if (type === 1 || type === 2) filter.HasNoWorkFlowProcTemplateID = this.props.tempItem.WorkFlowProcTemplateID;

    let filterForList = JSON.stringify(filter);
    // console.log("Applied Filters: " + filterForList);
    return filterForList;
  }


  render() {
    let { empSelected } = this.state;
    let components;
    const type = this.props.listrqs;
    let searchPHolder = (type === 0 ? "Employee" : (type === 1 ? "Workgroup" : "Department"));
    if (this.props.error) {
      let errMsg = this.props.error.ErrorCode === 204 ? "No Result(s) Found." : "Something went wrong! Please try again.";
      components = (<span>{errMsg}</span>);
    } else if (this.props.response) {
      // console.log("RType:" + this.props.listrqs);
      if (type === 0) {// Load Employee List Component Display
        components = this.props.response.map((item) =>
          <dl key={item.EmpProfileID} role="presentation" onClick={(e) => { this.addEmployees(e, item) ;}}>
            <dt>
              { (item.EmpAvatarAttachs != null)
                ? <Avatar bgImage={`url('${item.EmpAvatarAttachs.Path}')`} />
                : <Avatar />
              }
            </dt>
            <dd>
              <p>
                {item.LastName}, {item.FirstName} {item.MiddleName}
                <span>{item.Email}</span>
              </p>
            </dd>
          </dl>
        );
      } else { // Otherwise, Load WorkGroup or Department List Component Display
        components = this.props.response.map((item, index) => (
          <dl role="presentation" key={`item-${item.LastModDate}${index + 1}`} onClick={(e) => { this.addEmployees(e, item); }} >
            <dd>
              <h4>{item.Name}</h4>
            </dd>
          </dl>
        ));
      }
    }
    else {
      components = (<Loading />);
    }


    return (
      <ListBox>
        <SearchFilter search defaultVal={(this.state.searchVal) || ''} onClick={(val) => { this.search(val); }} placeholder={`Search ${searchPHolder} List...`} formRef={(el) => { this.searchEmpForm = el; }} />
        <h3>
          <b>{searchPHolder} List</b>
          <button className="add-emp" onClick={this.addSelectedItem}><FontAwesomeIcon icon={faPlus} /></button>
        </h3>
        <Lists>
          {components}
        </Lists>
        {(this.props.PageDetails) &&
          <Pagination>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={<span>...</span>}
              breakClassName={'break-me'}
              pageCount={this.props.PageDetails.MaxPageIndex}
              marginPagesDisplayed={1}
              pageRangeDisplayed={4}
              onPageChange={(e) => { this.GotoPage(e, this.props.listrqs) }}
              activeClassName={'active'}
            />
          </Pagination>
        }
      
      </ListBox>
    );
  }
}

EmployeeListComponent.propTypes = {
  hide: PropTypes.func,
  addEmp: PropTypes.func,
  isMultiple: PropTypes.bool, // true/false to check if we are going to accept single or multiple
  loading: PropTypes.bool,
  error: PropTypes.any,
  response: PropTypes.any,
  tempItem: PropTypes.any,
  listrqs: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDataRequestLoading('wflowEmpWGDeptReqs'),
  error: makeSelectDataRequestError('wflowEmpWGDeptReqs'),
  response: makeSelectDataResponse('wflowEmpWGDeptReqs'),
  empArr: makeSelectGetDataItems('wflowEmpWGDeptReqs'),
  PageDetails: makeSelectDataPageDetail('wflowEmpWGDeptReqs'),
  tempItem: makeSelectTempsItem(),
});

function mapDispatchToProps(dispatch) {
  return {
    getInfoList: (filter, rqsType) => dispatch(getList(filter, rqsType)),
    addToSelectedEmpList: (item, filter, rqsType) => {
      switch (rqsType) {
        case 1:
        case 2: { dispatch(processEntity(item, filter, rqsType)); } break; //Add to Entity Workgroup or Department
        default: { dispatch(setSelectedEmps(item)); } break; // Add Employee Selected to Approvers List
      }
    }
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(EmployeeListComponent);


// export default EmployeeListComponent;
