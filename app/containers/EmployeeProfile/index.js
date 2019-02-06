/**
 * EmployeeProfile
 * @prop {boolean}  show        True/False to show the Employee Profile Component
 * @prop {func}     hide        Function callback to hide the component
 * @prop {object}   empProfile  Object data of employee profile
 * @prop {string}   empID       Employee Profile ID
 * @prop {enum}     admin       Admin Type, reference for enum is in ./constants file
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';

/* Global injectSaga and injectReducer */
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import EmpProfile from 'components/StyleUtils/Overlay';
import Content from 'components/Employee/EMPProfileContainer';
import Close from 'components/StyleUtils/Close';

import Modal from 'components/Modal';
import FormViewDetails from 'components/Forms/FormViewDetails';

/** Transfer Modal */
// import Transfer from 'components/Transfer';
// import { toggleTransferModal } from 'components/Transfer/actions';

import { DEFAULT_GUID } from 'containers/App/constants';

import EmployeeDetails from './EmployeeDetails';

/** actions, selectors, constants, saga, reducer */
import reducer from './reducer';
import saga from './saga';

import {
  resetEmpProfState,
  loadInitSubComponents,
  getEmpProfile,
  getEmpReqs,
} from './actions';

import {
  AdminTypes, EmpReqs,
} from './constants';

import { makeSelectData } from './selectors';

/**
 * Employee Profile Page Sub-Components : HR
 */
import COEList from './COELists';
import IRFList from './IRFList';
import OTList from './OTList';
import CustomFormsList from './CustomForms';
import AttendanceList from './AttendanceList';
import LeaveInformation from './LeaveInformation';

// import ShiftSummList from './ShiftSummary';
// import CurrWorkGroup from './WorkGroup';

export class EmployeeProfile extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      empID: false,
      showCOEList: false,
      isFormDetailView: false,
      transferData: false,
    };
  }

  componentWillMount() {
    // Check if we are going to show, add a no-scroll class in body to prevent background from scrolling
    const el = document.getElementsByTagName('body')[0];
    if (this.props.show) {
      el.classList.add('no-scroll');
    } else {
      el.classList.remove('no-scroll');
    }

    const { empID } = this.props;
    this.setState({
      empID,
    });

    this.props.retrieveEmpProfile(empID);
  }

  componentDidMount() {
    this.props.retrieveEmpReqs(EmpReqs.RETRIEVE, 1);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.empProfile) {
      const empProfile = nextProps.empProfile;

      // Ready our data for transferring the member
      if (empProfile) {
        const emp = [
          {
            id: empProfile.EmpProfileID,
            name: `${empProfile.FirstName} ${empProfile.LastName}`,
          },
        ];
        const current = [];
        if (empProfile.WorkGroup.length > 0) { // make sure that employee belongs to a team/dept first
          const group = empProfile.WorkGroup;
          group.map((item) => {
            const id = (item.Team.TeamID !== DEFAULT_GUID) ? item.Team.TeamID : item.Department.DeptID;
            const isTeam = (item.Team.TeamID !== DEFAULT_GUID) && true;
            const name = (item.Team.TeamID !== DEFAULT_GUID) ? item.Team.Name : item.Department.Name;
            return current.push({
              id,
              name,
              isTeam,
            });
          });
        }

        if (emp.length > 0 && current.length > 0) {
          this.setState({
            transferData: { emp, current },
          });
        }
      }
    }
  }

  componentWillUnmount() {
    const el = document.getElementsByTagName('body')[0];
    el.classList.remove('no-scroll');

    this.props.resetState();
  }

  // Show/Hide Form Detail View
  showFormDetailView = () => {
    this.setState({
      isFormDetailView: true,
    });
  }
  hideFormDetailView = () => {
    this.setState({
      isFormDetailView: false,
    });
  }

  render() {
    // const {
    //   empProfile,
    // } = this.props;

    // let parentComp = (<Loading />);
    // const subComponent = [];
    // let outFlexComponent;
    // console.log("Admin Loading: " + this.props.admin + "");

    // if (this.props.admin === AdminTypes.HR) {
    //   // console.log("HR Admin Load");
    //   const coeComp = (
    //     <COEList key={`item-coeComp${0}`} empID={this.props.empProfile} />
    //   );
    //   subComponent.push(coeComp);

    //   const otComp = (
    //     <OTList key={`item-otComp${0}`} empID={this.props.empProfile} />
    //   );
    //   subComponent.push(otComp);

    //   const irfComp = (
    //     <IRFList key={`item-irfComp${0}`} empID={this.props.empProfile} />
    //   );
    //   subComponent.push(irfComp);

    //   const custFormComp = (
    //     <CustomFormsList key={`item-custFormComp${0}`} empID={this.props.empProfile} />
    //   );
    //   subComponent.push(custFormComp);

    //   const attendanceComp = (
    //     <AttList key={`item-attendanceComp${0}`} empID={this.props.empProfile} />
    //   );
    //   subComponent.push(attendanceComp);

    //   outFlexComponent = (<LeaveInformation leaves={empProfile.EmpLeaveCount} />);
    // } else if (this.props.admin === AdminTypes.WF) {
    //   console.log('WF Admin Load');
    //   const currWgComp = (
    //     <CurrWorkGroup key={`item-currWgComp${0}`} empID={this.props.empProfile} />
    //   );
    //   subComponent.push(currWgComp);

    //   const shiftsummComp = (
    //     <ShiftSummList key={`item-shiftsummComp${0}`} empID={this.props.empProfile} />
    //   );
    //   subComponent.push(shiftsummComp);

    // } else if (this.props.admin === AdminTypes.IT) {
    //   console.log('IT Admin Load');
    // } else if (this.props.admin === AdminTypes.FIN) {
    //   console.log('FIN Admin Load');
    // } else {
    //   console.log('Do nothing');
    // }

    return (
      <EmpProfile>
        <Content>
          <Close className="empprof-close" onClick={this.props.hide}><FontAwesomeIcon icon={faTimes} /></Close>
          <h2 className="empprof-title">Employee Profile</h2>
          <div className="empprof-content">
            {/* <div className="empprof-options">
              <span>Options</span>
              <OptionMenu title="Actions" position="bottom" icon="arrowdown">
                <button title="Transfer" onClick={() => { this.props.showTransfer(true, this.state.transferData); }}>Transfer</button>
              </OptionMenu>
            </div> */}
            <EmployeeDetails empID={this.props.empID} />

            <div>
              {/* Container for the sub components */}
              {this.props.admin === AdminTypes.HR &&
                <div className="flex">
                  <COEList />
                  <OTList />
                  <CustomFormsList />
                  <AttendanceList />
                  <IRFList />
                </div>
              }
              {this.props.admin === AdminTypes.HR && <LeaveInformation />}
            </div>
          </div>
        </Content>
        <Modal
          show={this.state.isFormDetailView}
          onClose={this.hideFormDetailView}
          showCloseBtn
          width="320px"
          title="View Details"
        >
          <FormViewDetails>
            <p>
              <span className="label">Name</span>
              <span className="value">Form Name</span>
            </p>
            <p>
              <span className="label">Reason</span>
              <span className="value">Reason for the form request</span>
            </p>
          </FormViewDetails>
        </Modal>
        {/* <Transfer /> */}
      </EmpProfile>
    );
  }
}

EmployeeProfile.defaultProps = {
  empID: false,
};

EmployeeProfile.propTypes = {
  admin: PropTypes.oneOf(Object.keys(AdminTypes)).isRequired,
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  empID: PropTypes.string.isRequired,
  empProfile: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  // Function dispatch props
  retrieveEmpProfile: PropTypes.func,
  retrieveEmpReqs: PropTypes.func,
  resetState: PropTypes.func,
  // showTransfer: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  empProfile: makeSelectData('profile'),
});

function mapDispatchToProps(dispatch) {
  return {
    // showTransfer: (isShowing, empData) => dispatch(toggleTransferModal(isShowing, empData)),
    retrieveEmpProfile: (id) => dispatch(getEmpProfile(id)),
    retrieveEmpReqs: (type, page) => dispatch(getEmpReqs(type, page)),
    resetState: () => dispatch(resetEmpProfState()),
    loadComponentsList: () => dispatch(loadInitSubComponents()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'EMPProfile', reducer });
const withSaga = injectSaga({ key: 'EMPProfile', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EmployeeProfile);
