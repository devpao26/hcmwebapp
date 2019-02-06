/**
 * Leave Request form component
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'components/datepicker.css';

import Loading from 'components/LoadingIndicator/Loading';
import Sending from 'components/LoadingIndicator';
import H2 from 'components/Section/H2';
import Button from 'components/StyleUtils/ModalButton';
// import OptionMenu from 'components/OptionMenu';
import Select from 'components/Forms/Select';

import RequestForm from './RequestForm';

const SickLeaveID = 'd8631b67-9526-4830-8b8a-1d89ce5ca4f1';
const PersonalLeaveID = 'd6d7d13d-ca4f-4a0a-8e8d-2bc99717d598';
const HalfDayLeaveID = '8f98e24f-b5b1-4537-9234-7f216c2ff92d';

export class LeaveRequestForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      leaveTypeIndex: 'false',
      leaveTypeID: false,
      leaveTypeText: '',
      leaveTypeError: false,
      files: [],
      minDate: moment().startOf('days').add(2, 'days'),
      startDate: moment().startOf('days').add(2, 'days'),
      endDate: moment().startOf('days').add(2, 'days'),
      dateError: false,
      reason: '',
      reasonError: false,
      formError: false,
      formErrorMsg: 'There is a problem communicating with the server. Please try again.',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.saveSuccess || nextProps.saveError) {
      this.leaveRequest.reset();

      this.setState({
        leaveTypeID: false,
        leaveTypeText: '',
        leaveTypeError: false,
        files: [],
        startDate: moment().startOf('days').add(2, 'days'),
        endDate: moment().startOf('days').add(2, 'days'),
        dateError: false,
        reason: '',
        reasonError: false,
      });
    }

    if (nextProps.saveError) {
      if (nextProps.saveError.ErrorCode === 400) {
        this.setState({
          formErrorMsg: 'There is no Workflow associated to your request yet. Kindly contact support.',
        });
      }
      this.setState({
        formError: true,
      });
    }
  }

  /**
   * Functions for the leave request form
   */
  // Handle Date Picker Dates
  handleChangeStart = (date) => {
    const { leaveTypeID } = this.state;

    let endDate = moment(date).add(1, 'days');
    const ahead = date.diff(this.state.endDate, 'days');

    if (leaveTypeID === HalfDayLeaveID) {
      endDate = date;
    } else if (ahead < 0) {
      endDate = this.state.endDate;
    }

    this.setState({
      startDate: date,
      endDate,
      dateError: false,
      errorMsg: false,
      formError: false,
    });
  }
  handleChangeEnd = (date) => {
    const { leaveTypeID } = this.state;

    let startDate = this.state.startDate;
    const behind = date.diff(startDate, 'days');
    if (leaveTypeID === HalfDayLeaveID) {
      startDate = date;
    } else if (behind < 0) {
      startDate = moment(date).subtract(1, 'days');
    }

    this.setState({
      startDate,
      endDate: date,
      dateError: false,
      errorMsg: false,
      formError: false,
    });
  }

  // Handle change of user attachments
  attachmentChange = (e) => {
    // var path = e.target.value;
    // var filename = path.replace(/^.*\\/, "");
    this.setState({
      files: e.currentTarget.files,
      formError: false,
    });
  }

  // Handle choosing of leave types
  changeLeaveType = (e) => {
    e.preventDefault();
    const index = e.currentTarget.value;
    let minDate = moment().startOf('days').add(2, 'days');
    if (this.props.leaveTypes[index].LeaveTypeID === HalfDayLeaveID || this.props.leaveTypes[index].LeaveTypeID === SickLeaveID || this.props.leaveTypes[index].LeaveTypeID === PersonalLeaveID) {
      minDate = moment().startOf('days').subtract(30, 'days');
    }
    this.setState({
      minDate,
      startDate: moment().startOf('days').add(2, 'days'),
      endDate: moment().startOf('days').add(2, 'days'),
      leaveTypeIndex: index,
      leaveTypeID: this.props.leaveTypes[index].LeaveTypeID,
      leaveTypeText: this.props.leaveTypes[index].Name,
      leaveTypeError: false,
      errorMsg: false,
      formError: false,
    });
  }

  // Handle input for the reason
  reasonChange = (e) => {
    this.setState({
      reason: e.currentTarget.value,
      reasonError: false,
      errorMsg: false,
      formError: false,
    });
  }

  // Send Leave Request Form
  sendForm = (e) => {
    e.preventDefault();
    const {
      leaveTypeID,
      startDate,
      endDate,
      reason,
      files,
    } = this.state;
    let data;

    if (!leaveTypeID || leaveTypeID === '' || leaveTypeID === 'false') {
      this.setState({
        errorMsg: true,
        leaveTypeError: true,
      });
    }

    if (reason === '') {
      this.setState({
        errorMsg: true,
        reasonError: true,
      });
    }

    if (leaveTypeID && reason && files.length > 0) {
      data = {
        LeaveTypeID: leaveTypeID,
        Reason: reason,
        LeaveFrom: moment(startDate).format('YYYY-MM-DD'),
        LeaveTo: moment(endDate).format('YYYY-MM-DD'),
      };
      this.props.save(e, data, files);
    } else if (leaveTypeID && reason) {
      data = {
        LeaveTypeID: leaveTypeID,
        Reason: reason,
        LeaveFrom: moment(startDate).format('YYYY-MM-DD'),
        LeaveTo: moment(endDate).format('YYYY-MM-DD'),
      };
      this.props.save(e, data, false);
    }
  }

  cancelForm = (e) => {
    e.preventDefault();
    this.leaveRequest.reset();
    this.setState({
      leaveTypeIndex: 'false',
      leaveTypeID: false,
      leaveTypeText: '',
      leaveTypeError: false,
      files: false,
      startDate: moment().startOf('days').add(2, 'days'),
      endDate: moment().startOf('days').add(2, 'days'),
      dateError: false,
      reason: '',
      reasonError: false,
      formError: false,
    });
  }

  mobileToggleDisplay = (e) => {
    e.preventDefault();

    // get our parent container
    const parent = e.currentTarget.parentNode.parentNode;
    // toggle our class
    parent.classList.toggle('toggle');
  }

  render() {
    const { loading, error, leaveTypes, sending } = this.props;

    if (loading) {
      return <RequestForm><H2>Leave Request Form <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2><Loading /></RequestForm>;
    }

    if (error) {
      return <RequestForm><H2>Leave Request Form <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2><p className="message">Form References wasn&apos;t retrieve properly. Please refresh your browser.</p></RequestForm>;
    }

    if (leaveTypes) {
      const leaveTypeButtons = leaveTypes.map((item, index) =>
        // <button key={item.LeaveTypeID} onClick={(e) => { this.changeLeaveType(e, item.LeaveTypeID, item.Name); }}>{item.Name}</button>
        <option key={item.LeaveTypeID} value={index}>{item.Name}</option>
      );

      // const file = [];
      let file = [];
      const { files } = this.state;
      if (files.length > 0) {
        Object.keys(files).forEach((i) =>
          file.push(files[i])
        );
      } else {
        file = [];
      }

      return (
        <RequestForm>
          <H2>Leave Request Form <button onClick={this.mobileToggleDisplay} className="fa fa-caret-down" /></H2>
          <form ref={(el) => { this.leaveRequest = el; }}>
            {(sending) && <div className="sending"><Sending /></div>}
            {(this.state.errorMsg) && <span className="error-msg">* Please fill up required fields.</span>}
            <fieldset className="first">
              <label htmlFor="leaveType">Leave Type<span>*</span></label>
              {/* <div className={(this.state.leaveTypeError) ? 'error leave-type' : 'leave-type'}>
                <span>{this.state.leaveTypeText}</span>
                <OptionMenu title="Leave Type" position="left">
                  {leaveTypeButtons}
                </OptionMenu>
              </div> */}
              <Select getValue={this.changeLeaveType} error={(this.state.leaveTypeError) && 'error'} default={this.state.leaveTypeIndex}>
                <option value="false">Please select leave type</option>
                {leaveTypeButtons}
              </Select>
            </fieldset>

            <fieldset>
              <label htmlFor="leaveDate">{this.state.leaveTypeID === HalfDayLeaveID && 'Shift '}Date<span>*</span></label>
              <div className={(this.state.dateError) ? 'error half' : 'half'}>
                <i className="fa fa-caret-down" />
                <DatePicker
                  selected={this.state.startDate}
                  selectsStart
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleChangeStart}
                  dateFormat="LL"
                  minDate={this.state.minDate}
                />
              </div>
              {this.state.leaveTypeID !== HalfDayLeaveID && <span className="middle">To</span>}
              {this.state.leaveTypeID !== HalfDayLeaveID && (
                <div className={(this.state.dateError) ? 'error half' : 'half'}>
                  <i className="fa fa-caret-down" />
                  <DatePicker
                    selected={this.state.endDate}
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeEnd}
                    dateFormat="LL"
                    popperPlacement="bottom-end"
                    minDate={this.state.minDate}
                  />
                </div>
              )}
            </fieldset>

            <fieldset>
              <label htmlFor="leaveReason">Reason<span>*</span></label>
              <textarea id="leaveReason" className={(this.state.reasonError) && 'error'} onChange={this.reasonChange} />
            </fieldset>

            <fieldset>
              <label htmlFor="leaveAttachments">Attachments</label>
              <label htmlFor="leaveAttachment" className="attach">
                <input id="leaveAttachment" type="file" onChange={this.attachmentChange} multiple accept=".png, .jpg, .jpeg, .pdf, .doc, .docx" />
                <span>
                  {file.map((item) => <b key={item.lastModified}>{item.name}</b>)}
                </span>
                <i className="fa fa-paperclip" />
              </label>
            </fieldset>

            <fieldset className="center">
              {(this.state.formError) && <p className="error-msg">{this.state.formErrorMsg}</p>}
              <Button type="submit" onClick={this.sendForm}>Send</Button>
              <Button color="red" onClick={this.cancelForm}>Clear</Button>
            </fieldset>
          </form>
        </RequestForm>
      );
    }

    return null;
  }
}

LeaveRequestForm.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  leaveTypes: PropTypes.array.isRequired,
  save: PropTypes.func,
  sending: PropTypes.bool,
  saveError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  saveSuccess: PropTypes.bool,
};

export default LeaveRequestForm;
