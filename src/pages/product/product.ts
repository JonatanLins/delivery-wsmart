import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  product: any = this.navParams.get('product');
  quantity: number = 1;
  observations: string = '';
  options: object = {};
  boolTest: boolean = true;
 
  constructor(
    public firebaseDB: AngularFireDatabase,
    public firebaseAuth: AngularFireAuth,
    public navParams: NavParams,
    public navCtrl: NavController,
  ) {

    for(let key in this.product.options) {
      let option = this.product.options[key]
      this.options[key] = {}
      for(let choose in option.choose) {
        if (option.type === 'check'){
          this.options[key][choose] = false
        }
      }
    }
  }

  decreaseQuantity(){
    if(this.quantity > 1){
      this.quantity--
    }
  }

  increaseQuantity(){
    if(this.quantity < 99){
      this.quantity++
    }
  }

  get price(){
    let price: any = parseInt(this.product.price.replace(',', ''))
    for(let option in this.options){
      for (let choose in this.options[option]){
        if(this.options[option][choose]){
          price += parseInt(this.product.options[option].choose[choose].price.replace(',', ''))
        }
      }
    }
    price = (price * this.quantity).toString()
    return price.slice(0, price.length - 2) + ',' + price.slice(price.length - 2)
  }

  getOptions() {
    const optionsProps = Object.keys(this.product.options)
    let optionsArray = []
    for (let prop of optionsProps) {
      optionsArray.push({
        key: prop,
        ...this.product.options[prop]
      })
    }
    return optionsArray
  }

  getSubOptions(option) {
    const optionsProps = Object.keys(option.choose)
    let optionsArray = []
    for (let prop of optionsProps) {
      optionsArray.push({
        key: prop,
        ...option.choose[prop]
      })
    }
    return optionsArray
  }

  addToCart(){
    const uid = this.firebaseAuth.auth.currentUser.uid
    this.firebaseDB.list('users/' + uid + '/cart').push({
      quantity: this.quantity,
      totalPrice: this.price,
      product: this.product.product,
      category: this.product.category,
      options: this.options,
      title: this.product.title,
      observations: this.observations.trim()
    })
    this.navCtrl.pop()
  }

}
