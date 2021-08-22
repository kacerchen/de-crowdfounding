import React, { Component } from 'react';
import Button from '../uielements/button';
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
      .login("facebook", {})
      .then(result => {
        console.log(result);
        history.replace('./dashboard');
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
        <Button type="primary" onClick={this.showModal} className="primary btnFacebook">
          {this.props.signup
            ? 'Sign up with Facebook'
            : 'Sign in with Facebook'}
        </Button>
        <Modal
          title="Sign in with Facebook"
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          onOk={this.handleLogin}
          className="isoFacebookLoginModal"
          cancelText="Cancel"
          okText="Login"
        >
          <div>Confirm you want to sign in with your facebook account?</div>

        </Modal>
      </div>
    );
  }
}
