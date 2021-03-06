import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';

import { HomePage } from '../pages/home/home';
import { AppInfoPage } from '../pages/app-info/app-info';
import { LoginPage } from '../pages/login/login';
import { OrdersPage } from '../pages/orders/orders';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav: NavController;
  rootPage: any;
  user: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public http: Http,
  ) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.http.get('../assets/json/user.json')
      .map(data => data.json())
      .subscribe(user => {
        this.rootPage = user ? HomePage : LoginPage;
        this.user = user;
      })
  }

  openAppInfoPage() {
    this.nav.push(AppInfoPage);
  }

  openOrdersPage() {
    this.nav.push(OrdersPage);
  }

  signOut() {
    // this.firebaseAuth.auth.signOut();
  }

}
