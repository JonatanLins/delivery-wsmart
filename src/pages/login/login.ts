import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoginSigninPage } from '../login-signin/login-signin';
import { LoginSignupPage } from '../login-signup/login-signup';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(public navCtrl: NavController, public firebaseAuth: AngularFireAuth){}

  openSignIn() {
    this.navCtrl.push(LoginSigninPage)
  }

  openSignup() {
    this.navCtrl.push(LoginSignupPage)
  }

  googleLogin() {
    this.firebaseAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }

  facebookLogin() {
    this.firebaseAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
  }

}
