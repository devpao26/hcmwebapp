/**
 * Listing Componet of the Alerts/Notif
 * @prop {bool} isAlert   Check whether we are viewing an alert or notification
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import Loading from 'components/LoadingIndicator/Loading';
import Status from 'components/User/Status';

import { FORMREQUEST_APPROVE, FORMREQUEST_REJECT } from 'containers/App/constants';
import {
  makeSelectAlertCount,
  makeSelectNotifCount,
} from 'containers/App/selectors';

import { changeAlertCount, changeNotifCount } from 'containers/App/actions';

import {
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectSuccess,
} from './selector';

import { getMarkAsRead, updateRequestStatus } from './action';

export class AlertsNotifListing extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      alertElement: false,
      loadingElement: false,
      isAlert: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.markSuccess) {
      const el = this.state.alertElement;
      if (this.state.isAlert && el.classList.contains('unread')) {
        const count = this.props.alertCount - 1;
        this.props.changeAlertCount(count);
        el.classList.remove('unread');
      } else if (!this.state.isAlert && el.classList.contains('unread')) {
        const count = this.props.notifCount - 1;
        this.props.changeNotifCount(count);
        el.classList.remove('unread');
      }
    }

    if (nextProps.updateSuccess) {
      this.state.loadingElement.style.display = 'none';
      const elButtons = this.state.alertElement.getElementsByClassName('buttons')[0];
      const el = this.state.alertElement;
      if (elButtons) elButtons.remove();

      if (this.state.isAlert && el.classList.contains('unread')) {
        const count = this.props.alertCount - 1;
        this.props.changeAlertCount(count);
        this.state.alertElement.classList.remove('unread');
      } else if (!this.state.isAlert && el.classList.contains('unread')) {
        const count = this.props.notifCount - 1;
        this.props.changeNotifCount(count);
        this.state.alertElement.classList.remove('unread');
      }
    }
  }

  markAsRead = (e, id, isRead, isAlert) => {
    const el = e.currentTarget;
    const parent = e.currentTarget.parentNode.parentNode;
    const detailEl = parent.getElementsByClassName('details')[0];

    this.setState({
      alertElement: parent,
      isAlert,
    });

    // add/remove max height on our content element for animation
    const maxHeight = detailEl.scrollHeight; // get the scroll height of the element
    if (detailEl.style.maxHeight) {
      detailEl.style.maxHeight = null;
      el.innerText = 'View Details';
    } else {
      el.innerText = 'Close Details';
      detailEl.style.maxHeight = `${maxHeight}px`; // set the max height style
      if (!isRead) {
        this.props.markAsRead(id);
      }
    }
  }

  updateStatus = (e, formID, statusID, isAlert) => {
    const parent = e.currentTarget.parentNode.parentNode.parentNode;
    const loadingEl = parent.getElementsByClassName('item-loading')[0];
    this.setState({
      alertElement: parent,
      loadingElement: loadingEl,
      isAlert,
    });
    loadingEl.style.display = 'block';

    const data = {
      formID,
      statusID,
    };
    this.props.updateStatus(data);
  }

  render() {
    const { loading, error, lists } = this.props;

    if (loading) return <div className="loading-cont"><Loading /></div>;

    if (error) {
      if (error.ErrorCode === 204) {
        return <div className="message">No Record(s) Found.</div>;
      }
      return <div className="message">There was a problem communicating with the server. Please try again later.</div>;
    }

    if (lists) {
      const items = lists.map((item) => {
        const now = moment();
        const diff = now.diff(new Date(item.CreatedDate), 'days');
        const displayDate = (diff > 1) ? moment(new Date(item.CreatedDate)).format('MM-DD-YYYY') : moment(new Date(item.CreatedDate)).fromNow();
        const attachs = (item.AttachList.length > 0) ? item.AttachList : [];
        return (
          <li key={item.AlertNotifID} className={(item.IsRead) || 'unread'}>
            <div className="item-loading"><Loading /></div>
            <Status className={(item.IsRead) ? 'status Pending' : 'status Active'} />
            <span className="time">{displayDate}</span>
            <h3>{item.Name}</h3>
            <p className="details">
              {item.Descr}
              {(item.AttachList.length > 0) &&
                <span>Attachments:&nbsp;
                  { attachs.map((attach) => <a key={attach.ID} href={attach.Path} target="_blank">{attach.FileName}</a>) }
                </span>
              }
            </p>
            <div className="action">
              <a onClick={(e) => { this.markAsRead(e, item.AlertNotifID, item.IsRead, item.IsAlert); }} role="presentation" title="View Details">View Details</a>
              { (item.WithButton) &&
                <p className="buttons">
                  <button className="btn-approve" title="Approve" onClick={(e) => { this.updateStatus(e, item.RefID, FORMREQUEST_APPROVE, item.IsAlert); }}>Approve</button>
                  <button className="btn-reject" title="Reject" onClick={(e) => { this.updateStatus(e, item.RefID, FORMREQUEST_REJECT, item.IsAlert); }}>Reject</button>
                </p>
              }
            </div>
          </li>
        );
      });
      return (
        <ul className="notif-list">
          {items}
        </ul>
      );
    }

    return null;
  }
}

AlertsNotifListing.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  lists: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  markSuccess: PropTypes.bool,
  updateSuccess: PropTypes.bool,
  alertCount: PropTypes.number,
  notifCount: PropTypes.number,
  // function dispatch props
  markAsRead: PropTypes.func,
  updateStatus: PropTypes.func,
  changeAlertCount: PropTypes.func,
  changeNotifCount: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('alertsNotif'),
  error: makeSelectError('alertsNotif'),
  lists: makeSelectData('alertsNotif'),
  markSuccess: makeSelectSuccess('markRead'),
  updateSuccess: makeSelectSuccess('updateStatus'),
  alertCount: makeSelectAlertCount(),
  notifCount: makeSelectNotifCount(),
});

function mapDispatchToProps(dispatch) {
  return {
    markAsRead: (id) => dispatch(getMarkAsRead(id)),
    updateStatus: (data) => dispatch(updateRequestStatus(data)),
    changeAlertCount: (count) => dispatch(changeAlertCount(count)),
    changeNotifCount: (count) => dispatch(changeNotifCount(count)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(AlertsNotifListing);
