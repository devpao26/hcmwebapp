/*
 * Floor Status
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import ReactPaginate from 'react-paginate';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretLeft, faTh, faList, faCaretDown } from '@fortawesome/fontawesome-free-solid';

/* Global injectSaga and injectReducer */
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

/* Global Components */
import PageWrap from 'components/PageWrap';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';
import Sidebar from 'components/Sidebar';
import PageContent from 'components/Main/PageContent';
import Avatar from 'components/Img/Avatar';
import Calendar from 'components/Calendar';
import ImageModal from 'components/Img/ImageModal';
import Pagination from 'components/Pagination';
import ExportButton from 'components/ExportButton';

/* Section Components */
import H2 from 'components/Section/H2';
import Back from 'components/Section/Back';
import Flex from 'components/SectionFlex';

/* Own Components */
import Left from './Left';
import Right from './Right';
import Wrapper from './WhiteBox';
import Employee from './Employee';
import DisplayButton from './DisplayButton';
import CalendarWrapper from './CalendarWrapper';
// import Graph from './Graph';
// import Sample from 'images/sample_graph.png';
import ShiftSummaryList from './ShiftSummaryList';
import ShiftAppList from './ShiftAppList';
import ShiftUrlList from './ShiftUrlList';
import ScreenshotsList from './ScreenshotList';

/* selectors, reducer, saga and actions */
import {
  makeSelectEmpId,
  // makeSelectEmpData,
  makeSelectSummaryData,
  makeSelectLoading,
  makeSelectError,
  makeSelectPages,
  makeSelectDtrUri,
} from './selectors';

import {
  GET_SHIFTREC,
  GET_SSHOT,
  GET_ACTIVEAPP,
  GET_BROWSERURL,
} from './constants';

import reducer from './reducer';
import saga from './saga';

import {
  writeIdDate,
  getPagination,
  dtrExport,
  clearDtrUri,
} from './actions';

export class FloorStatus extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      empId: this.props.location.emp.id,
      empData: this.props.location.emp.detail,
      viewImage: false,
      imagePath: '',
      workStatus: false,
      calendar: false,
      displayClass: 'grid',
      displayDate: moment().startOf('days'),
      currentStatus: 'No Available Status',
      displayBy: 'Date',
      filterBy: true,
    };
  }

  componentDidMount() {
    const emp = this.props.location.emp;
    const id = emp.id;
    // Retrieve Initial data
    this.props.retrieveInitialData(id, moment().startOf('days').format('M/DD/YYYY'), true);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dtrUri !== false) {
      location.assign(nextProps.dtrUri);
      this.props.clearUri();
    }
  }

  toggleCalendar = () => {
    this.setState({
      calendar: !this.state.calendar,
      workStatus: false,
    });
  }

  showImageModal = (path) => {
    this.setState({
      viewImage: !this.state.viewImage,
      imagePath: path,
    });
  }

  hideImageModal = () => {
    this.setState({
      viewImage: false,
    });
  }

  selectedDate = (date) => {
    this.setState({
      // calendar: false,
      displayDate: date,
    });

    this.props.retrieveInitialData(this.state.empId, moment(date).format('MM/DD/YYYY'), this.state.filterBy);
  }

  showWorkStatus = () => {
    this.setState({
      calendar: false,
      workStatus: !this.state.workStatus,
    });
  }

  changeDisplay = (e) => {
    e.preventDefault();
    const display = e.currentTarget.getAttribute('data-display');
    this.setState({
      displayClass: display,
    });
  }

  filterBy = (e) => {
    e.preventDefault();
    const filter = (e.currentTarget.innerText === 'Date') || false;
    this.setState({
      displayBy: e.currentTarget.innerText,
      filterBy: filter,
    });

    this.props.retrieveInitialData(this.state.empId, moment(this.state.displayDate).format('MM/DD/YYYY'), filter);
  }

  mobileToggleDisplay = (e) => {
    // get our parent container
    const parent = e.currentTarget.parentNode.parentNode;

    // toggle our class
    parent.classList.toggle('toggle');
  }

  render() {
    const {
      empId,
      displayDate,
      empData,
    } = this.state;

    const {
      shiftRecData,
      screenShotData,
      activeAppsData,
      browserUrlData,
      // workStatData,
      shiftRecLoading,
      shiftRecError,
      screenShotLoading,
      screenShotError,
      activeAppLoading,
      activeAppError,
      browserUrlLoading,
      browserUrlError,
      shiftRecPages,
      screenShotPages,
      activeAppsPages,
      browserUrlPages,
      // workStatPages,
      gotoPage,
      generateDtr,
    } = this.props;

    // Shift Summary Props
    const shiftSummaryList = {
      loading: shiftRecLoading,
      error: shiftRecError,
      shiftRec: shiftRecData,
    };

    // Shift App/URL Summary Props
    const shiftAppList = {
      loading: activeAppLoading,
      error: activeAppError,
      activeApp: activeAppsData,
    };

    const shiftUrlList = {
      loading: browserUrlLoading,
      error: browserUrlError,
      browserUrl: browserUrlData,
    };

    // Screenshots Props
    const screenshotList = {
      loading: screenShotLoading,
      error: screenShotError,
      screenShots: screenShotData,
    };

    // Retrieval of Employee Details
    // let empList;
    let userData;
    let avatar;
    if (empData) {
      avatar = (empData.EmpAvatarAttachs != null) ? <Avatar bgImage={`url('${empData.EmpAvatarAttachs.Path}')`} /> : <Avatar />;
      userData = (
        <div className="details">
          <div className="info">
            <h4>{empData.FirstName} {empData.LastName}</h4>
            <p>{empData.JobRole.Name}</p>
            <p>Department: {(empData.WorkGroup.length !== 0) && empData.WorkGroup[0].Department.Name}</p>
            <p>Workgroup: {(empData.WorkGroup.length !== 0) && empData.WorkGroup[0].Team.Name}</p>
            <p>
              {(empData.WorkGroup.length !== 0) && <i className="fa fa-sitemap" />}
              {(empData.WorkGroup.length !== 0) && <i className="fa fa-group" />}
            </p>
          </div>
        </div>
      );
    }

    // Declare Max Pages for the summaries
    let activeAppMaxPage = 1;
    let browserUrlMaxPage = 1;
    let screenShotMaxPage = 1;
    let shiftRecMaxPage = 1;

    if (activeAppsPages) {
      activeAppMaxPage = activeAppsPages.MaxPageIndex;
    }

    if (browserUrlPages) {
      browserUrlMaxPage = browserUrlPages.MaxPageIndex;
    }

    if (screenShotPages) {
      screenShotMaxPage = screenShotPages.MaxPageIndex;
    }

    if (shiftRecPages) {
      shiftRecMaxPage = shiftRecPages.MaxPageIndex;
    }

    // Get user current status
    // if (shiftRecData) {
    //   const dateToday = moment().startOf('days').format('YYYY-MM-DD');
    //   shiftRecData.map((item, index) => {
    //     if (index === 0 && item.Date === dateToday && displayDate === dateToday) {
    //       // console.log('matched');
    //       this.setState({
    //         currentStatus: (item.TemplateWorkStatusDetails != null) ? item.TemplateWorkStatusDetails.WorkStatus.Name : item.SystemStatusType.Name
    //       });
    //     }
    //   });
    // }

    return (
      <PageWrap>
        <Helmet>
          <title>WorkForce Floor Status</title>
        </Helmet>
        <Header />
        <Sidebar location={this.props.location} />
        <Main>
          <PageContent>
            <Back onClick={this.props.history.goBack}><FontAwesomeIcon icon={faCaretLeft} /> BACK TO EMPLOYEE FLOOR STATUS LIST</Back>
            <Flex>
              <Left>
                <Employee>
                  {avatar}
                  {userData}
                  <div className="options">
                    <div className="select">
                      <label htmlFor="chooseDate">Choose Date</label>
                      <div className="data">
                        <span role="presentation" className="content" onClick={this.toggleCalendar}>{moment(displayDate).format('LL')}</span>
                        <button className="fa fa-caret-down" onClick={this.toggleCalendar} />
                        { this.state.calendar &&
                          <CalendarWrapper className="negtop">
                            <H2>Select Date</H2>
                            <Calendar selectedDate={this.selectedDate} hideCal={this.toggleCalendar} displayDate={displayDate} />
                          </CalendarWrapper>
                        }
                      </div>
                      <label htmlFor="currentStatus">Display By:</label>
                      <div className="filter">
                        <button onClick={this.filterBy} className={(this.state.displayBy === 'Date') && 'active'}>Date</button>
                        <button onClick={this.filterBy} className={(this.state.displayBy === 'Shift Schedule') && 'active'}>Shift Schedule</button>
                      </div>
                      {/* <label htmlFor="currentStatus">Current Status</label>
                      <div className="data">
                        <span className="content">{this.state.currentStatus}</span>
                        <OptionMenu title="Work Status" position="bottom" width="150px">
                          <label>
                            <input type="checkbox" /> Select All
                          </label>
                          <label>
                            <input type="checkbox" defaultChecked="checked" /> Available
                          </label>
                          <label>
                            <input type="checkbox" /> Research
                          </label>
                          <label>
                            <input type="checkbox" /> After Call Work
                          </label>
                          <label>
                            <input type="checkbox" /> Lunch
                          </label>
                          <label>
                            <input type="checkbox" /> BioBreak
                          </label>
                          <label>
                            <input type="checkbox" /> 15 Min Break
                          </label>
                          <label>
                            <input type="checkbox" /> Meeting
                          </label>
                          <label>
                            <input type="checkbox" /> Coaching
                          </label>
                          <label>
                            <input type="checkbox" /> Training
                          </label>
                          <label>
                            <input type="checkbox" /> Admin
                          </label>
                          <label>
                            <input type="checkbox" /> Floorwalk
                          </label>
                          <label>
                            <input type="checkbox" /> Others
                          </label>
                          <label>
                            <input type="checkbox" /> End of Day
                          </label>
                        </OptionMenu>
                      </div> */}
                      <ExportButton onClick={() => { generateDtr(moment(displayDate).format('YYYY-MM-DD'), empId); }} text="Export DTR" />
                    </div>
                  </div>
                </Employee>
                {/* <Wrapper className="expand">
                  <Graph>
                    <select>
                      <option>Weekly Status</option>
                    </select>
                    <Img src={Sample} alt="Sample Graph" />
                  </Graph>
                </Wrapper> */}
                <Wrapper className="toggle">
                  <H2>Shift Summary <button onClick={this.mobileToggleDisplay}><FontAwesomeIcon icon={faCaretDown} /></button></H2>
                  <ShiftSummaryList {...shiftSummaryList} />
                  { (shiftRecPages && shiftRecMaxPage !== 1) &&
                    <Pagination>
                      <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={<span>...</span>}
                        breakClassName={'break-me'}
                        pageCount={shiftRecMaxPage}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={4}
                        onPageChange={(e) => { gotoPage(e, GET_SHIFTREC); }}
                        activeClassName={'active'}
                      />
                    </Pagination>
                  }
                </Wrapper>

                <Wrapper>
                  <H2>
                    Screenshots
                    { (screenShotData) &&
                      <DisplayButton>
                        <button onClick={this.changeDisplay} data-display="grid" className={(this.state.displayClass === 'grid') && 'active'}><FontAwesomeIcon icon={faTh} /></button>
                        |
                        <button onClick={this.changeDisplay} data-display="list" className={(this.state.displayClass === 'list') && 'active'}><FontAwesomeIcon icon={faList} /></button>
                      </DisplayButton>
                    }
                    <button onClick={this.mobileToggleDisplay}><FontAwesomeIcon icon={faCaretDown} /></button>
                  </H2>
                  <ScreenshotsList {...screenshotList} display={this.state.displayClass} imgPath={this.showImageModal} />
                  { (screenShotPages && screenShotMaxPage !== 1) &&
                    <Pagination>
                      <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={<span>...</span>}
                        breakClassName={'break-me'}
                        pageCount={screenShotMaxPage}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={4}
                        onPageChange={(e) => { gotoPage(e, GET_SSHOT); }}
                        activeClassName={'active'}
                      />
                    </Pagination>
                  }
                </Wrapper>
              </Left>

              <Right>
                {/* <Wrapper>
                  <H2>Workgroup Name <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>
                  <EMPList className="list">
                    <dl>
                      <dt><Avatar bgImage="url('https://picsum.photos/100/?random')" /></dt>
                      <dd>
                        <p>
                          Tony Stark
                          <span>stark@marvel.com</span>
                        </p>
                        <OptionMenu title="Options" position="left">
                          <button>Transfer</button>
                          <button>View Profile</button>
                          <button>Assign Calendar Template</button>
                          <button>Assign Shift Schedule Template</button>
                          <button data-user="Tony Stark" onClick={this.showDisable}>Disable Account</button>
                        </OptionMenu>
                      </dd>
                    </dl>
                    <dl>
                      <dt><Avatar /></dt>
                      <dd>
                        <p>
                          Tony Stark
                          <span>stark@marvel.com</span>
                        </p>
                        <OptionMenu title="Options" position="left">
                          <button>Transfer</button>
                          <button>View Profile</button>
                          <button>Assign Calendar Template</button>
                          <button>Assign Shift Schedule Template</button>
                          <button data-user="Tony Stark" onClick={this.showDisable}>Disable Account</button>
                        </OptionMenu>
                      </dd>
                    </dl>
                  </EMPList>
                </Wrapper> */}
                <Wrapper>
                  <H2>Shift Active Apps <button onClick={this.mobileToggleDisplay}><FontAwesomeIcon icon={faCaretDown} /></button></H2>
                  <ShiftAppList {...shiftAppList} />
                  { (activeAppsPages && activeAppMaxPage !== 1) &&
                    <Pagination>
                      <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={<span>...</span>}
                        breakClassName={'break-me'}
                        pageCount={activeAppMaxPage}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={4}
                        onPageChange={(e) => { gotoPage(e, GET_ACTIVEAPP); }}
                        activeClassName={'active'}
                      />
                    </Pagination>
                  }
                </Wrapper>

                <Wrapper>
                  <H2>Shift Browser URLs <button onClick={this.mobileToggleDisplay}><FontAwesomeIcon icon={faCaretDown} /></button></H2>
                  <ShiftUrlList {...shiftUrlList} />
                  { (browserUrlPages && browserUrlMaxPage !== 1) &&
                    <Pagination>
                      <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={<span>...</span>}
                        breakClassName={'break-me'}
                        pageCount={browserUrlMaxPage}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={4}
                        onPageChange={(e) => { gotoPage(e, GET_BROWSERURL); }}
                        activeClassName={'active'}
                      />
                    </Pagination>
                  }
                </Wrapper>
              </Right>
            </Flex>
          </PageContent>
        </Main>
        <Footer />

        <ImageModal show={this.state.viewImage} onClose={this.hideImageModal} imagePath={this.state.imagePath} />
      </PageWrap>
    );
  }
}

FloorStatus.defaultProps = {
  dtrUri: false,
};

FloorStatus.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  // empId: PropTypes.oneOfType([
  //   PropTypes.bool,
  //   PropTypes.string,
  // ]),
  // empData: PropTypes.array,
  shiftRecData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  screenShotData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  activeAppsData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  browserUrlData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  // workStatData: PropTypes.oneOfType([
  //   PropTypes.array,
  //   PropTypes.bool,
  // ]),
  shiftRecLoading: PropTypes.bool,
  screenShotLoading: PropTypes.bool,
  activeAppLoading: PropTypes.bool,
  browserUrlLoading: PropTypes.bool,
  // workStatLoading: PropTypes.bool,
  shiftRecError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  screenShotError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  activeAppError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  browserUrlError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  // workStatError: PropTypes.oneOfType([
  //   PropTypes.object,
  //   PropTypes.bool,
  // ]),
  shiftRecPages: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  screenShotPages: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  activeAppsPages: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  browserUrlPages: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  // workStatPages: PropTypes.oneOfType([
  //   PropTypes.object,
  //   PropTypes.bool,
  // ]),
  dtrUri: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  // Function dispatch props
  retrieveInitialData: PropTypes.func,
  gotoPage: PropTypes.func,
  generateDtr: PropTypes.func,
  clearUri: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  empId: makeSelectEmpId(),
  // empData: makeSelectEmpData(),
  shiftRecData: makeSelectSummaryData('shiftRec'),
  screenShotData: makeSelectSummaryData('screenShot'),
  activeAppsData: makeSelectSummaryData('activeApps'),
  browserUrlData: makeSelectSummaryData('browserUrl'),
  workStatData: makeSelectSummaryData('workStat'),
  shiftRecLoading: makeSelectLoading('shiftRec'),
  screenShotLoading: makeSelectLoading('screenShot'),
  activeAppLoading: makeSelectLoading('activeApps'),
  browserUrlLoading: makeSelectLoading('browserUrl'),
  workStatLoading: makeSelectLoading('workStat'),
  shiftRecError: makeSelectError('shiftRec'),
  screenShotError: makeSelectError('screenShot'),
  activeAppError: makeSelectError('activeApps'),
  browserUrlError: makeSelectError('browserUrl'),
  workStatError: makeSelectError('workStat'),
  shiftRecPages: makeSelectPages('shiftRec'),
  screenShotPages: makeSelectPages('screenShot'),
  activeAppsPages: makeSelectPages('activeApps'),
  browserUrlPages: makeSelectPages('browserUrl'),
  workStatPages: makeSelectPages('workStat'),
  dtrUri: makeSelectDtrUri(),
});

function mapDispatchToProps(dispatch) {
  return {
    retrieveInitialData: (id, date, filter) => dispatch(writeIdDate(id, date, filter)),
    gotoPage: (evt, action) => {
      const page = evt.selected + 1;
      dispatch(getPagination(page, action));
    },
    generateDtr: (date, id) => dispatch(dtrExport(date, id)),
    clearUri: () => dispatch(clearDtrUri()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'wfadmin', reducer });
const withSaga = injectSaga({ key: 'wfadmin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FloorStatus);
