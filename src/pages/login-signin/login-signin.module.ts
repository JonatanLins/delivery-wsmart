import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginSigninPage } from './login-signin';

@NgModule({
  declarations: [
    LoginSigninPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginSigninPage),
  ],
})
export class LoginSigninPageModule {}
