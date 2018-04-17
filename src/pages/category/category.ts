import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { NavController, AlertController } from 'ionic-angular';
import { ProductPage } from '../product/product';

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  category: object = this.navParams.get('category')

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  getProducts() {
    const categoryProps = Object.keys(this.category['items'])
    let productsArray = []
    for (let prop of categoryProps) {
      productsArray.push({
        product: prop,
        category: this.category['key'],
        ...this.category['items'][prop]
      })
    }
    return productsArray
  }
  
  openProductPage (product){
    if (product.available){
      this.navCtrl.push(ProductPage, { product });
    } else {
      let alert = this.alertCtrl.create({
        subTitle: 'Produto indisponível no momento',
        buttons: ['Fechar']
      });
      alert.present();
    }
  }

}
