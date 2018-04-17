import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { OrderPage } from '../order/order';


@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  orders: any
  user: object

  constructor(
    public navCtrl: NavController,
    public firebaseAuth: AngularFireAuth,
    public firebaseDB: AngularFireDatabase,
  ) {
    this.user = this.firebaseAuth.auth.currentUser;
    this.orders = this.firebaseDB.list('users/' + this.user['uid'] + '/orders').valueChanges();
  }

  openOrder(order) {
    this.navCtrl.push(OrderPage, { order });
  }

}
