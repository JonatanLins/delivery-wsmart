import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { LoginPage } from '../login/login';
import { AddressPage } from '../address/address';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  order: Array<Object> = []
  finalObservations: string = ''
  deliveryPrice: any = '0,00'
  user: any = {}
  deliveryText: string = ''
  address: any

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public firebaseDB: AngularFireDatabase,
    public http: Http
  ) {

    this.http.get('../../assets/json/user.json')
      .map(data => data.json())
      .subscribe(data => this.user = data)

    this.http.get('../../assets/json/cart.json')
      .map(data => data.json())
      .subscribe(data => this.order = data)

    this.http.get('../../assets/json/address.json')
      .map(data => data.json())
      .subscribe(address => {
        this.address = address
        if(address) {
          this.deliveryText = address.logradouro + ', Nº ' + address.numero
          this.deliveryPrice = address.price
        } else {
          this.deliveryText = 'Retirar na loja'
          this.deliveryPrice = '00,00'
        }
      })

  }

  openLoginPage() {
    this.navCtrl.push(LoginPage)
  }

  openAddressPage() {
    this.navCtrl.push(AddressPage)
  }

  removeItem(index) {
    let confirm = this.alertCtrl.create({
      title: 'Remover Item',
      message: 'Tem certeza que deseja remover este item do seu carrinho?',
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Remover',
          handler: () => {
            this.order.splice(index, 1)
            this.firebaseDB.object('users/' + this.user.uid + '/cart').set(this.order)
          }
        }
      ]
    });
    confirm.present();
  }

  buy() {
    let askForPayment = this.alertCtrl.create();
    askForPayment.setTitle('Método de pagamento');

    askForPayment.addInput({
      type: 'radio',
      label: 'À vista',
      value: 'dinheiro',
      checked: true
    });

    askForPayment.addInput({
      type: 'radio',
      label: 'Cartão na Entrega',
      value: 'cartao-entrega'
    });

    askForPayment.addInput({
      type: 'radio',
      label: 'Cartão no App',
      value: 'cartao-app'
    });

    askForPayment.addButton('Cancelar');
    askForPayment.addButton({
      text: 'OK',
      handler: data => {
        this.firebaseDB.list('users/' + this.user.uid + '/orders').push({
          address: this.address,
          info: { 
            time: Date.now(),
            totalPrice: this.totalPrice,
            deliveryPrice: this.deliveryPrice
           },
          products: this.order
        })
        this.firebaseDB.object('users/' + this.user.uid + '/cart').remove()
        this.navCtrl.pop()
        this.alertCtrl.create({
          title: 'Pedido concluído',
          message: 'Seu pedido será entregue dentro de alguns minutos!',
          buttons: [{ text: 'Ok' }]
        }).present();
      }
    });
    askForPayment.present();
  }

  get price (){
    let price: any = this.order
      .map(x => parseInt(x['totalPrice'].split(',').join('')))
      .reduce((acc, cur) => acc + cur, 0)
      .toString()
    price = "000".substring(price.length) + price
    return price.slice(0, -2) + ',' + price.slice(-2)
  }

  get totalPrice (){
    let price: any = parseInt(this.price.split(',').join(''))
    price += parseInt(this.deliveryPrice.split(',').join(''))
    price = price.toString()
    price = "000".substring(price.length) + price
    return price.slice(0, -2) + ',' + price.slice(-2)
  }

}
