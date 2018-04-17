import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AppInfoPage } from '../pages/app-info/app-info';
import { LoginPage } from '../pages/login/login';
import { LoginSigninPage } from '../pages/login-signin/login-signin';
import { LoginSignupPage } from '../pages/login-signup/login-signup';
import { CartPage } from '../pages/cart/cart';
import { AddressPage } from '../pages/address/address';
import { OrderPage } from '../pages/order/order';
import { OrdersPage } from '../pages/orders/orders';
import { SearchPage } from '../pages/search/search';
import { CategoryPage } from '../pages/category/category';
import { ProductPage } from '../pages/product/product';

const configs = {
  backButtonText: ''
}

const firebaseConfigs = {
  apiKey: 'AIzaSyByOx63AXVmsXbcFzvoUN0zjaQNcyY77rk',
  authDomain: 'deliverywsmart.firebaseapp.com',
  databaseURL: 'https://deliverywsmart.firebaseio.com',
  projectId: 'deliverywsmart',
  storageBucket: 'deliverywsmart.appspot.com',
  messagingSenderId: '264252150958'
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AppInfoPage,
    LoginPage,
    ProductPage,
    CartPage,
    CategoryPage,
    LoginSigninPage,
    LoginSignupPage,
    AddressPage,
    OrderPage,
    OrdersPage,
    SearchPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, configs),
    AngularFireModule.initializeApp(firebaseConfigs),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AppInfoPage,
    LoginPage,
    ProductPage,
    CartPage,
    CategoryPage,
    LoginSigninPage,
    LoginSignupPage,
    AddressPage,
    OrderPage,
    OrdersPage,
    SearchPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
