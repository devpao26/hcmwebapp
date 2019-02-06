/**
 * Create Access Form for New Employee
 * @prop {string} oldEmail      Employee's old email
 * @prop {func}   confirm       Confirmation modal
 * @prop {func}   cancel        To close the modal
 */
import React from 'react';
import PropTypes from 'prop-types';

import Form from 'components/Forms/Form';
import Fields from 'components/Forms/Fields';
import Label from 'components/Forms/Label';
import Input from 'components/Forms/Input';
import Button from 'components/Button';

class CreateAccessFormComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: false,
      emailError: false,
    };
  }

  handleEmailChange = (e) => {
    const val = e.currentTarget.value;
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape

    if (reg.test(val)) {
      this.setState({
        email: val,
        emailError: false,
      });
    } else {
      this.setState({
        emailError: true,
      });
    }
  }

  submit = (e) => {
    e.preventDefault();

    if (!this.state.emailError && this.state.email) {
      this.props.confirm(this.state.email);
    } else {
      this.setState({
        emailError: true,
      });
    }
  }

  render() {
    return (
      <Form>
        <Fields>
          <Label htmlFor="oldEmail">Email</Label>
          <Input id="oldEmail" type="email" defaultValue={this.props.oldEmail} disabled />
        </Fields>
        <Fields>
          <Label htmlFor="emailInput">Email</Label>
          <Input id="emailInput" type="email" placeholder="Enter New Email" onChange={this.handleEmailChange} />
          {(this.state.emailError) && <span className="error">* Please input a valid email address</span>}
        </Fields>
        <div className="action-button">
          <Button handleRoute={this.submit} color="gray">SAVE</Button>
          <Button handleRoute={this.props.cancel} color="red">CANCEL</Button>
        </div>
      </Form>
    );
  }
}

CreateAccessFormComponent.propTypes = {
  oldEmail: PropTypes.string,
  confirm: PropTypes.func,
  cancel: PropTypes.func,
};

export default CreateAccessFormComponent;
