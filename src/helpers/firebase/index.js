import firebase from 'firebase';
import { firebaseConfig } from '../../config.js';

const valid = firebaseConfig  && firebaseConfig.apiKey && firebaseConfig.projectId;

firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebase.auth;

class FirebaseHelper {
  isValid = valid;
  EMAIL = 'email';
  FACEBOOK = 'facebook';
  GOOGLE = 'google';
  GITHUB = 'github';
  TWITTER = 'twitter';
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }
  login(provider, info) {
    if(provider == "google") {
      let p = new firebaseAuth.GoogleAuthProvider();
      p.addScope('profile');
      p.addScope('email');
      console.log(p);
      let r = firebaseAuth().signInWithPopup(p);
      return r;
    } 

    if(provider == 'facebook') {
      let p = new firebaseAuth.FacebookAuthProvider();
      p.addScope('public_profile');
      console.log(p);
      let r = firebaseAuth().signInWithPopup(p);
      return r;
    }

    if(provider == 'email_sign_in') {
      let p = new firebaseAuth.EmailAuthProvider();
      console.log(p);
      let r = firebaseAuth().signInWithEmailAndPassword(info.email, info.password);
      return r;
    }

    if(provider == 'email_sign_up') {
      let p = new firebaseAuth.EmailAuthProvider();
      console.log(p);
      let r = firebaseAuth().createUserWithEmailAndPassword(info.email, info.password);
      return r;
    }
    // switch (provider) {
    //   case "google":
    //     let provider = new firebaseAuth.GoogleAuthProvider();
    //     provider.addScope('profile');
    //     provider.addScope('email');
    //     console.log(provider);
    //     return firebaseAuth().signInWithPopup(provider);
    //   case this.EMAIL:
    //     return firebaseAuth().signInWithEmailAndPassword(
    //       info.email,
    //       info.password
    //     );
    //   case this.FACEBOOK:
    //     return firebaseAuth().FacebookAuthProvider();
    //   case this.GITHUB:
    //     return firebaseAuth().GithubAuthProvider();
    //   case this.TWITTER:
    //     return firebaseAuth().TwitterAuthProvider();
    //   default:
    // }
  }
  logout() {
    return firebaseAuth().signOut();
  }

  isAuthenticated() {
    firebaseAuth().onAuthStateChanged(user => {
      return user ? true : false;
    });
  }
  resetPassword(email) {
    return firebaseAuth().sendPasswordResetEmail(email);
  }
}

export default new FirebaseHelper();
