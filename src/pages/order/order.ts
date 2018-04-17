import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  order: object = this.navParams.get('order');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {}
}
