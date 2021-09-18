import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from '../uielements/button';
import Input from '../uielements/input';
import Modal from '../feedback/modal';
import { notification } from '../index';
import Firebase from '../../helpers/firebase/index';
import history from '../../helpers/auth0/history';

export default class extends Component {
  state = {
    visible: false,
    email: 'demo@gmail.com',
    password: 'demodemo',
    confirmLoading: false
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  handleLogin = () => {
    this.setState({
      confirmLoading: true
    });
    
    Firebase
      .login("google", {})
      .then(result => {
        console.log(result);
        this.props.login(result);
      });
  };
  resetPassword = () => {
    const { email } = this.state;
    if (!email) {
      notification('error', `Please fill in email.`);
      return;
    }
    Firebase.resetPassword(email)
      .then(() =>
        notification('success', `Password reset email sent to ${email}.`)
      )
      .catch(error => notification('error', 'Email address not found.'));
  };
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal} className="primary btnGooglePlus">
          {this.props.signup
            ? 'Sign up with Google'
            : 'Sign in with Google'}
        </Button>
        <Modal
          title="Sign in with Google"
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          onOk={this.handleLogin}
          className="isoGoogleLoginModal"
          cancelText="Cancel"
          okText="Login"
        >
          <div>Confirm you want to sign in with your google account?</div>

        </Modal>
      </div>
    );
  }
}
