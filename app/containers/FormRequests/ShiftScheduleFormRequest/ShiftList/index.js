import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

/**  Global Components **/
import Loading from 'components/LoadingIndicator/Loading';
import EMPList from 'components/Employee/SmallEMPList';
import OptionMenu from 'components/OptionMenu';
import Modal from 'components/Modal';
import CreateNewForm from 'components/Templates/CreateNewForm';
import Fields from 'components/Templates/CreateNewFormFields';
import Button from 'components/Button';
import ButtonWrapper from 'components/Button/ButtonWrapper';
import Status from 'components/User/Status';

import { makeSelectLoading, makeSelectError, makeSelectObjectList } from '../selector';

class ShiftListComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShiftDetails: false,
    };
  }
  select = (e, shiftTemplateID, shiftName, requestor) => {
    // get all element in the list
    const childEl = e.currentTarget.parentNode.children;

    // get the clicked element
    const targetEl = e.currentTarget;

    // Iterate through all the element and toggle the class
    for (let i = 0; i < childEl.length; i += 1) {
      if (targetEl !== childEl[i]) {
        childEl[i].classList.remove('active');
      } else {
        childEl[i].classList.add('active');
      }
    }

    this.props.selectShift(shiftTemplateID, shiftName, requestor);
  }
  // Show template details
  showShiftTemplateDetails = (name, description, totalbreak, graceperiod, shiftday) => {
    this.setState({ isShiftDetails: !this.state.isShiftDetails, name, description, totalbreak, graceperiod, shiftday });
  }
  render() {
    const { loading, error, lists } = this.props;

    const { shiftday } = this.state;

    let items; let days;

    if (shiftday) {
      days = shiftday.map((day) => {
        const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
        const timeIn = (day.TimeIn !== '') && day.TimeIn.split(':');
        const timeOut = (day.TimeOut !== '') && day.TimeOut.split(':');
        return (
          <dl className="shift-details" key={day.ShiftScheduleID}>
            <dt>
              <Status className="status Active" />
              <span className="days">{dayName[day.Day - 1]}</span>
            </dt>
            <dd>
              <span className="time">{`${timeIn[0]}:${timeIn[1]}`}</span>
              <span className="time">{`${timeOut[0]}:${timeOut[1]}`}</span>
            </dd>
          </dl>
        );
      });
    }
    if (loading) return <span><Loading /></span>;

    if (error) {
      if (error.ErrorCode === 204) {
        return <p className="error-msg">No Record(s) Found.</p>;
      } else if (error.ErrorCode === 403) {
        return <p className="error-msg">You dont have access or permission for this action. Thank you.</p>;
      }
      return <p className="error-msg">There is a problem communicating with the server. Please try again later.</p>;
    }

    if (lists) {
      items = lists.map((item) => (
        <dl role="presentation" key={item.ShiftTemplateID} className="cont" onClick={(e) => { this.select(e, item.ShiftTemplateID, item.Name, 0); }}>
          <dd>
            <p>{item.Name}</p>
            <OptionMenu
              title="Options"
              position="bottom"
            >
              <button onClick={(e) => { e.preventDefault(); this.showShiftTemplateDetails(item.Name, item.Descr, item.TotalBreak, item.GracePeriod, item.ShiftSchedulesList); }}>View Template Details</button>
            </OptionMenu>
          </dd>
        </dl>
      ));
      return (
        <span>
          <EMPList>
            {items}
          </EMPList>
          <Modal
            show={this.state.isShiftDetails}
            title="Template Details"
            width="350px"
          >
            <CreateNewForm>
              <Fields>
                <label htmlFor="name">Name</label>
                <span className="font">{(this.state.name !== '') ? this.state.name : '-'}</span>
              </Fields>
              <Fields>
                <label htmlFor="description">Description</label>
                <span className="font">{(this.state.description !== '') ? this.state.description : '-'}</span>
              </Fields>
              <Fields>
                <div className="half-time">
                  <label htmlFor="total-break-hours">Total Break</label>
                  <span className="font">{moment(this.state.totalbreak).format('h:mm:ss')} (hrs)</span>
                </div>
                <div className="half-time">
                  <label htmlFor="grace-period">Grace Period</label>
                  <span className="font">{moment(this.state.graceperiod).format('mm:ss')} (mins)</span>
                </div>
              </Fields>
              <Fields>
                <div className="scheds">
                  <label htmlFor="shift-schedules"> Shift Schedule </label>
                  {days}
                </div>
              </Fields>
              <br />
              <ButtonWrapper>
                <Button handleRoute={() => { this.setState({ isShiftDetails: false }); }} color="gray">OK</Button>
              </ButtonWrapper>
            </CreateNewForm>
          </Modal>
        </span>
      );
    }
    return null;
  }
}

ShiftListComponent.propTypes = {
  selectShift: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('shiftlists'),
  error: makeSelectError('shiftlists'),
  lists: makeSelectObjectList('shiftlists'),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(ShiftListComponent);
