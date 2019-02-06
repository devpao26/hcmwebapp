/**
 * Shift Summary List Component for Employee Profile View and Display
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';

/* Global injectSaga and injectReducer */
// import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import H2 from 'components/Modal/H2';
import Loading from 'components/LoadingIndicator/Loading';
import Pagination from 'components/Pagination';
import ReactPaginate from 'react-paginate';
import Lists from 'components/Lists/GroupList';

import ShiftSummaryList from 'containers/WorkForcePages/FloorStatus/ShiftSummaryList';
import CalendarWrapper from 'containers/WorkForcePages/FloorStatus/CalendarWrapper';
import Calendar from 'components/Calendar';

import reducer from './reducer';
import saga from './saga';
import {
  getSHIFTSUMMList,
} from './actions';

import {
  makeSelectSHIFTSUMMListLoading,
  makeSelectSHIFTSUMMListError,
  makeSelectSHIFTSUMMDatas,
  makeSelectSHIFTSUMMPages,
} from './selectors';

export class SHIFTSUMMList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      calendar: false,
      shiftDate: moment().startOf('days').subtract(1, 'days').format('M/DD/YYYY'),
      displayDate: moment().startOf('days').subtract(1, 'days'),
    };
  }

  componentDidMount() {
    this.reloadSHIFTSUMMPage(1, this.state.shiftDate);
  }

  reloadSHIFTSUMMPage = (page, date) => {
    const filterSHIFTSUMMList = JSON.stringify({
      SortFilter: {
        PageIndex: page,
        PageSize: '20',
        SortBy: 'LastModDate',
        SortExpression: 'DESC',
      },
      CreatedBy: this.props.selectedEmpProfile.EmpProfileID,
      date: date,
    });
    // console.log("Page Count: " + filterSHIFTSUMMList);
    this.props.reloadByPage(filterSHIFTSUMMList);
  }

  // TODO: Added Selection Handlers
  selectItem = (e, item) => {
  }

  GotoPage = (e) => {
    // Send Page Index
    const page = e.selected + 1;
    // this.props.reloadWithPage(page);
    this.reloadSHIFTSUMMPage(page, this.state.shiftDate);
  }

  /**
   * Calendar
   */
  toggleCalendar = () => {
    this.setState({
      calendar: !this.state.calendar,
      workStatus: false
    });
  }

  selectedDate = (date) => {
    var _this = this;
    this.setState({
      // calendar: false,
      displayDate: date,
      shiftDate: moment(date).format('M/DD/YYYY')
    });
    this.reloadSHIFTSUMMPage(1, moment(date).format('M/DD/YYYY'));
    // this.props.retrieveInitialData(this.state.empId, moment(date).format('M/DD/YYYY'));
  }

  render() {
    const { loading, error, lists, shiftSummListPage } = this.props;

    const shiftSummaryProps = {
      loading: loading,
      error: error,
      shiftRec: lists,
    };

    let maxPageIndex = 1;
    if (shiftSummListPage) maxPageIndex = shiftSummListPage.MaxPageIndex;

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
      components = (<ShiftSummaryList {...shiftSummaryProps} />);
    }

    return (
      <div className="empprof-section">
        <H2>Shift Summary Request(s)</H2>

        <Lists className="comp-list">
          <div>
            <label>Choose Date</label>
            <div className="data">
              <span className="content" onClick={this.toggleCalendar}>{moment(this.state.displayDate).format('LL')}</span>
              <button className="fa fa-caret-down" onClick={this.toggleCalendar} />
              {this.state.calendar &&
                <CalendarWrapper className="negtop">
                  <H2>Select Date</H2>
                  <Calendar selectedDate={this.selectedDate} hideCal={this.toggleCalendar} displayDate={this.state.displayDate} />
                </CalendarWrapper>
              }
            </div>
          </div>
          <ul>
            {components}
          </ul>
        </Lists>
        {(shiftSummListPage && maxPageIndex > 1) &&
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

SHIFTSUMMList.propTypes = {
  selectedEmpProfile: PropTypes.any.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.any,
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  shiftSummListPage: PropTypes.any,
  hasSHIFTSUMMList: PropTypes.func, // This function returns to the Parent if there's a shiftSumm request rendered on Count
  reloadByPage: PropTypes.func, // This function reloads with filter for page Index
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectSHIFTSUMMListLoading(),
  error: makeSelectSHIFTSUMMListError(),
  lists: makeSelectSHIFTSUMMDatas(),
  shiftSummListPage: makeSelectSHIFTSUMMPages(),
});


function mapDispatchToProps(dispatch) {
  return {
    reloadByPage: (filter) => {
      // console.log(filter);
      dispatch(getSHIFTSUMMList(filter));
    },
    // onSelectItem: (item) => dispatch(),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'EMPProfSHIFTSUMM', reducer });
const withSaga = injectSaga({ key: 'EMPProfSHIFTSUMM', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SHIFTSUMMList);
