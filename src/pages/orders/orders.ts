import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { OrderPage } from '../order/order';
import { Http } from '@angular/http';


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
    public http: Http,
  ) {

    this.http.get('../../assets/json/user.json')
      .map(data => data.json())
      .subscribe(data => this.user = data)

    this.http.get('../../assets/json/orders.json')
      .map(data => data.json())
      .subscribe(data => this.orders = data)

  }

  openOrder(order) {
    this.navCtrl.push(OrderPage, { order });
  }

}
