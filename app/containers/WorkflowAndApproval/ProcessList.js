/**
 * Process List Component Page Display
 * @prop {function} getSelected     Get the selected process type name
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

/**
 * Global References
 */
import Loading from 'components/LoadingIndicator/Loading';
import Lists from 'components/Configurations/Lists';
import Pagination from 'components/Pagination';
import ReactPaginate from 'react-paginate';

/**
 * Redux references
 */

import { 
    getProcessesList, 
    setProcsSelected, 
    getTemplatesList,
    setTempsSelected } from './actions';
import {
    makeSelectProcsList,
    makeSelectProcsListLoading,
    makeSelectProcsListError,
    makeSelectProcsPageDetail,
} from './selectors';


export class WFlowProcessListPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    componentDidMount() {
        // On Load
        this.loadProcsList(1);
    }

    /**
     * Handling Pagination for Process List
     */
    wflowProcsGotoPage = (e) => {
        const page = e.selected + 1;
        this.loadProcsList(page);
    }

    /**
     * Handling Page Index and Filter for Loading the list
     * @param {Integer} page 
     */
    loadProcsList(page){
        let filter = JSON.stringify({
            'SortFilter': {
              'PageIndex': page,
              'PageSize': '20',
              'SortBy': 'Name',
              'SortExpression': 'ASC'
            }
          });
        this.props.onLoadProcsList(filter);
    }

    wflowProcsSelectItem = (e, item) => {
        e.preventDefault();

        // get all element in the list
        let childEl = e.currentTarget.parentNode.children;
    
        // get the clicked element
        let targetEl = e.currentTarget;
    
        // Iterate through all the element and toggle the class
        for (var i = 0; i < childEl.length; i++) { 
          if ( targetEl != childEl[i] ) { 
            childEl[i].classList.remove('active');
          } else {
            childEl[i].classList.add('active');
          }
        }

        let filter = {
            "WorkFlowFormID": item.WorkFlowFormID,
            "SortFilter": {
              "SortBy": "LastModDate",
              "SortExpression": "DESC",
              "PageSize": 20,
              "PageIndex": 1
            }
          };
      
          let filterForList = JSON.stringify(filter);

        this.props.onSelectItem(item, filterForList);

        // pass the name of the selected item to our parent component
        this.props.getSelected(e, item.Name);
    }

    render() {

        // Get Max Page Index of the list (defaults to 1)
        
        // if (this.props.procsPageDetails != null) {
        //     maxProcsPageIndex = this.props.procsPageDetails.MaxPageIndex;
        // }
        
        let components;
        // console.log(this.props.procsserror);
        if (this.props.procsserror) {
            components = (<span>{this.props.procsserror.ErrorMsg}</span>);
        } else if (this.props.procslist) {
            // Load items
            components = this.props.procslist.map((item, index) => <li role="presentation" key={item.WorkFlowFormID} onClick={(e)=>{this.wflowProcsSelectItem(e, item)}}>{item.Name}</li>);
        } else {
            components = (<Loading />);
        }

        return (
            <Lists id="procList">
                <ul className="lists">
                    {components}
                </ul>
                {(this.props.procsPageDetails) &&
                    <Pagination>
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={<span>...</span>}
                            breakClassName={'break-me'}
                            pageCount={this.props.procsPageDetails.MaxPageIndex}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={4}
                            onPageChange={this.wflowProcsGotoPage}
                            activeClassName={'active'}
                        />
                    </Pagination>
                }
            </Lists>
        );
    }
}


WFlowProcessListPage.propTypes = {
    getSelected: PropTypes.func,
    procsloading: PropTypes.any,
    procsserror: PropTypes.any,
    procslist: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool,
    ]),
    procsPageDetails: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
    procsloading: makeSelectProcsListLoading(),
    procsserror: makeSelectProcsListError(),
    procslist: makeSelectProcsList(),
    procsPageDetails: makeSelectProcsPageDetail(),
});

function mapDispatchToProps(dispatch) {
    return {
        
        onLoadProcsList: (page) => dispatch(getProcessesList(page)) ,
        onSelectItem: (procss, temp)=> {
            dispatch(setProcsSelected(procss)); 
            dispatch(getTemplatesList(temp));
            dispatch(setTempsSelected(false));
        }
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);



export default compose(
    withConnect,
)(WFlowProcessListPage);


// export default WFlowProcessListPage;
