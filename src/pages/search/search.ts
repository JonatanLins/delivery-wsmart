import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProductPage } from '../product/product';


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchString: string = ''
  categories: any = this.navParams.get('categories')

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
  ) {}

  getProducts(category) {
    const categoryProps = Object.keys(category.items)
    let productsArray = []
    for (let prop of categoryProps) {
      productsArray.push({
        product: prop,
        category: category['key'],
        ...category.items[prop]
      })
    }
    return productsArray
  }

  match(product) {
    if (this.searchString){
      return product.title.toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1
    } else {
      return false
    }
  }

  search() {
    
  }

  openProductPage(product) {
    this.navCtrl.push(ProductPage, { product })
  }
}
