import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Loading from 'components/LoadingIndicator';
import Button from 'components/Button';
import ButtonWrapper from 'components/Button/ButtonWrapper';

import IncDecNum from 'components/IncDecNum';
import LeaveCredits from 'components/Forms/AddLeaveCredits';

import {
  makeSelectLoading,
} from './selectors';

import { updateLeaves } from './actions';

export class LeaveCreditsComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      vlCount: '0',
      slCount: '0',
      elCount: '0',
      error: false,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      UpdateVLCount: this.state.vlCount.toString(),
      UpdateSLCount: this.state.slCount.toString(),
      UpdateELCount: this.state.elCount.toString(),
    };

    if (this.state.vlCount !== '0' || this.state.slCount !== '0' || this.state.elCount !== '0') {
      this.props.updateLeaves(this.props.empID, data);
    } else {
      this.setState({
        error: true,
      });
    }
  }

  getVlCount = (val) => {
    this.setState({
      vlCount: val,
      error: false,
    });
  }

  getSlCount = (val) => {
    this.setState({
      slCount: val,
      error: false,
    });
  }

  getElCount = (val) => {
    this.setState({
      elCount: val,
      error: false,
    });
  }

  // getNotes = (e) => {
  //   this.setState({
  //     notes: e.currentTarget.value,
  //   });
  // }

  render() {
    return (
      <LeaveCredits>
        {(this.props.loading) && <div className="form-saving"><Loading /></div>}
        <p>
          Current Leaves
          <span className="label">VL - {(this.props.empProfile.EmpLeaveCount.VLCount) || '0'}</span>
          <span className="label">SL - {(this.props.empProfile.EmpLeaveCount.SLCount) || '0'}</span>
          <span className="label">EL - {(this.props.empProfile.EmpLeaveCount.ELCount) || '0'}</span>
        </p>
        <p>
          <span className="label">Vacation Leave</span>
          <IncDecNum getValue={this.getVlCount} />
        </p>
        <p>
          <span className="label">Sick Leave</span>
          <IncDecNum getValue={this.getSlCount} />
        </p>
        <p>
          <span className="label">Emergency Leave</span>
          <IncDecNum getValue={this.getElCount} />
        </p>
        {/* <p>
          <span className="label">Notes</span>
          <textarea onChange={this.getNotes} />
        </p> */}
        {(this.state.error) && <p className="error-msg">* Please input a number at least on one of the leaves.</p>}
        <ButtonWrapper>
          <Button handleRoute={(e) => { this.onSubmit(e); }} color="gray">SAVE</Button>
          <Button handleRoute={(e) => { this.props.onClose(e); }} color="red">CANCEL</Button>
        </ButtonWrapper>
      </LeaveCredits>
    );
  }
}

LeaveCreditsComponent.propTypes = {
  onClose: PropTypes.func,
  loading: PropTypes.bool,
  empID: PropTypes.string,
  empProfile: PropTypes.object,
  // Function dispatch props
  updateLeaves: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading('updateLeaves'),
});

function mapDispatchToProps(dispatch) {
  return {
    updateLeaves: (empID, data) => dispatch(updateLeaves(empID, data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(LeaveCreditsComponent);
