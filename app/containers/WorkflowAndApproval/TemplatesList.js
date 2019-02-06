/**
 * Templates List Component Page Display
 * @prop {func} create        Function to create new template
 * @prop {func} getSelected   Get the name of the selected template
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';

/* Global injectSaga and injectReducer */
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

/**
 * Global References
 */
import Loading from 'components/LoadingIndicator/Loading';
import SearchFilter from 'components/SearchFilter';
import Lists from 'components/Configurations/Lists';
import Pagination from 'components/Pagination';
import ReactPaginate from 'react-paginate';

/**
 * Redux references
 */

import { getTemplatesList, setTempsSelected, processEntity } from './actions';
import {
  makeSelectProcsItem,
  makeSelectTempsList,
  makeSelectTempsListLoading,
  makeSelectTempsListError,
  makeSelectTempsPageDetail,
} from './selectors';


export class WFlowTemplatesListPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      searchVal: '',
    };
  }
  componentDidMount() {
  }

  wflowTempsGotoPage = (e) => {
    const page = e.selected + 1;
    // this.props.loadEntities(page, 1, this.state.empFilter);
    this.loadTemplates(page, false);
  }

  wflowTempsSelectItem = (e, item) => {
    e.preventDefault();

    // get all element in the list
    let childEl = e.currentTarget.parentNode.children;

    // get the clicked element
    let targetEl = e.currentTarget;

    // Iterate through all the element and toggle the class
    for (let i = 0; i < childEl.length; i += 1) {
      if (targetEl !== childEl[i]) {
        childEl[i].classList.remove('active');
      } else {
        childEl[i].classList.add('active');
      }
    }
    this.props.onSelectItem(item);
    this.loadEntities(1, 1, item);

    // pass the name of the selected template to our parent component
    this.props.getSelected(e, item.Name);
  }

  loadTemplates(page, search) {

    let filter = {
      "WorkFlowFormID": this.props.procsselitem.WorkFlowFormID,
      "SortFilter": {
        "SortBy": "LastModDate",
        "SortExpression": "DESC",
        "PageSize": 20,
        "PageIndex": page,
      }
    };

    if (search) {
      filter.Name = search;
    }

    let filterForList = JSON.stringify(filter);
    this.props.reloadTempList(filterForList);

  }

  /**
   * 
   * @param {Index} page Current Page Index you want to retrieve
   * @param {Enum} grpType Enum type you want to process: 1 = WorkGroup 2 = Department
   */
  loadEntities(page, grpType, item) {
    //WorkFlowProcTemplateID
    let filterForList = JSON.stringify({
      'SortFilter': {
        'PageIndex': page,
        'PageSize': '20',
        'SortBy': 'Name',
        'SortExpression': 'ASC'
      },
      'WorkFlowProcTemplateID': item.WorkFlowProcTemplateID,
    });
    this.props.showEntities(filterForList, grpType, true);
  }

  /**
   * Search Function
   */
  search = (val) => {
    // console.log(val); // eslint-disable-line no-console
    this.setState({ searchVal: val });
    // this.props.getInfoList(this.filterList(1, this.props.listrqs, val), this.props.listrqs);
    this.loadTemplates(1, val);
  }


  render() {
    // Check if there's a new selected Process Item -> Reload Templates
    // if (this.props.procsselitem){

    //     this.props.onLoadTempsList();
    // }

    // Get Max Page Index of the list (defaults to 1)
    let maxTempsPageIndex = 0;
    // console.log(this.props.templatesPageDetails);
    if (this.props.templatesPageDetails) {
      maxTempsPageIndex = this.props.templatesPageDetails.MaxPageIndex;
    }

    let components = <li className="message">Please select Process Type</li>;
    // console.log(this.props.procsserror);
    if (this.props.templateserror) {
      components = (<li className="message">{this.props.templateserror.ErrorMsg}</li>);
    }

    if (this.props.tempsdata) {
      // Load items
      components = this.props.tempsdata.map((item) => (
        <li role="presentation" key={item.WorkFlowProcTemplateID} onClick={(e) => { this.wflowTempsSelectItem(e, item); }}>
          <span>{item.Name ? item.Name : item.Descr}</span>
          <span>Steps [<b>{item.ApproverGroupByStepList.length}</b>]</span>
        </li>
      ));
    }

    return (
      <Lists id="templateList" className="template-list">
        {(this.props.procsselitem) && <button className="create-new" onClick={this.props.create} >Create New Template <FontAwesomeIcon icon={faPlus} /></button> }
        {(this.props.procsselitem) && <SearchFilter search defaultVal={(this.state.searchVal) || ''} onClick={(val) => { this.search(val); }} placeholder="Search Template Name" /> }
        <ul className="lists">
          {components}
        </ul>
        { (this.props.templatesPageDetails) &&
          <Pagination>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={<span>...</span>}
              breakClassName={'break-me'}
              pageCount={this.props.templatesPageDetails.MaxPageIndex}
              marginPagesDisplayed={1}
              pageRangeDisplayed={4}
              onPageChange={this.wflowTempsGotoPage}
              activeClassName={'active'}
            />
          </Pagination>
        }
      </Lists>
    );
  }
}


WFlowTemplatesListPage.propTypes = {
  create: PropTypes.func,
  getSelected: PropTypes.func,
  procsselitem: PropTypes.any,
  templatesloading: PropTypes.any,
  templateserror: PropTypes.any,
  tempsdata: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  templatesPageDetails: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  procsselitem: makeSelectProcsItem(),
  templatesloading: makeSelectTempsListLoading(),
  templateserror: makeSelectTempsListError(),
  tempsdata: makeSelectTempsList(),
  templatesPageDetails: makeSelectTempsPageDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSelectItem: (temps) => dispatch(setTempsSelected(temps)),
    showEntities: (filter, rqsType) => dispatch(processEntity(filter, rqsType, 1)),
    reloadTempList: (page) => dispatch(getTemplatesList(page)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(WFlowTemplatesListPage);


// export default WFlowProcessListPage;
