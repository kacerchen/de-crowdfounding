import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import Auth0 from '../../helpers/auth0/index';
import Firebase from '../../helpers/firebase';
import FirebaseLogin from '../../components/firebase';
import IntlMessages from '../../components/utility/intlMessages';
import SignUpStyleWrapper from './signup.style';

const { login } = authAction;

class SignUp extends React.Component {
  state = {
    redirectToReferrer: false,
    email: '',
    password: '',
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = () => {
    const { login } = this.props;
    login();
    this.props.history.push('/dashboard');
  };

  signupWithEmail = () => {
    Firebase
      .login("email_sign_up", {email: this.state.email, password: this.state.password})
      .then(userCredential => {
        console.log(userCredential);
        this.props.history.replace('./dashboard');
      });  
  }
  render() {
    return (
      <SignUpStyleWrapper className="isoSignUpPage">
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.signUpTitle" />
              </Link>
            </div>

            <div className="isoSignUpForm">
              <div className="isoInputWrapper isoLeftRightComponent">
                <Input size="large" placeholder="First name" />
                <Input size="large" placeholder="Last name" />
              </div>

              <div className="isoInputWrapper">
                <Input size="large" placeholder="Username" />
              </div>

              <div className="isoInputWrapper">
                <Input 
                  size="large" 
                  placeholder="Email" 
                  value={this.state.email}
                  onChange={event => {
                    this.setState({ email: event.target.value });
                  }}
                />
              </div>

              <div className="isoInputWrapper">
                <Input 
                  size="large" 
                  type="password" 
                  placeholder="Password" 
                  value={this.state.password}
                  onChange={event => {
                    this.setState({ password: event.target.value });
                  }}
                />
              </div>

              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>

              <div className="isoInputWrapper" style={{ marginBottom: '50px' }}>
                <Checkbox>
                  <IntlMessages id="page.signUpTermsConditions" />
                </Checkbox>
              </div>

              <div className="isoInputWrapper">
                <Button type="primary" onClick={this.signupWithEmail}>
                  <IntlMessages id="page.signUpButton" />
                </Button>
              </div>
              <div className="isoInputWrapper isoOtherLogin">
                <Button onClick={this.handleLogin} type="primary btnFacebook">
                  <IntlMessages id="page.signUpFacebook" />
                </Button>
                <Button onClick={this.handleLogin} type="primary btnGooglePlus">
                  <IntlMessages id="page.signUpGooglePlus" />
                </Button>
                {Auth0.isValid &&
                  <Button
                    onClick={() => {
                      Auth0.login(this.handleLogin);
                    }}
                    type="primary btnAuthZero"
                  >
                    <IntlMessages id="page.signUpAuth0" />
                  </Button>}

                {Firebase.isValid &&
                  <FirebaseLogin signup={true} login={this.handleLogin} />}
              </div>
              <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
                <Link to="/signin">
                  <IntlMessages id="page.signUpAlreadyAccount" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignUpStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.get('idToken') !== null ? true : false,
  }),
  { login }
)(SignUp);
