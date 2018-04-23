import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, AlertController } from 'ionic-angular';
import { ProductPage } from '../product/product';
import { CartPage } from '../cart/cart';
import { SearchPage } from '../search/search';
import { CategoryPage } from '../category/category';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any
  categories: any = []
  cart: any = []

  constructor(
    public http: Http,
    public alertCtrl: AlertController,
    public navCtrl: NavController
  ) {

    this.http.get('../../assets/json/user.json')
      .map(data => data.json())
      .subscribe(data => this.user = data)

    this.http.get('../../assets/json/products.json')
      .map(data => data.json())
      .subscribe(data => this.categories = data)

    this.http.get('../../assets/json/cart.json')
      .map(data => data.json())
      .subscribe(data => this.cart = data)

  }

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

  openProductPage(product) {
    if(product.available){
      this.navCtrl.push(ProductPage, { product });
    } else {
      let alert = this.alertCtrl.create({
        subTitle: 'Produto indisponível no momento',
        buttons: ['Fechar']
      });
      alert.present();
    }
  }

  openCategory(category) {
    this.navCtrl.push(CategoryPage, { category })
  }

  openCartPage(){
    if(this.cart){
      this.navCtrl.push(CartPage);
    } else {
      let alert = this.alertCtrl.create({
        subTitle: 'Seu carrinho está vazio',
        buttons: ['Fechar']
      });
      alert.present();
    }
  }

  openSearchBar() {
    this.navCtrl.push(SearchPage, { categories: this.categories })
  }

  showSchedulesInfo() {
    let alert = this.alertCtrl.create({
      title: 'Horários de funcionamento',
      message: '<table>' +
        '<tr><td>Domingo</td> <td>08:00 às 23:00</td></tr>' +
        '<tr><td>Segunda</td> <td>08:00 às 23:00</td></tr>' +
        '<tr><td>Terça</td> <td>08:00 às 23:00</td></tr>' +
        '<tr><td>Quarta</td> <td>08:00 às 23:00</td></tr>' +
        '<tr><td>Quinta</td> <td>08:00 às 23:00</td></tr>' +
        '<tr><td>Sexta</td> <td>08:00 às 23:00</td></tr>' +
        '<tr><td>Sábado</td> <td>08:00 às 23:00</td></tr>' +
        '</table>',
      buttons: ['Fechar']
    });
    alert.present();
  }

  showMoreInfo() {
    let alert = this.alertCtrl.create({
      title: 'Mais informações',
      message:
        '<p><b>Tempo de espera:</b> 10 a 20 minutos</p>' +
        '<p><b>Taxa de entrega:</b> R$ 5,00</p>',
      buttons: ['Fechar']
    });
    alert.present();
  }

  get orderPrice() {
    let price: any = this.cart
      .map(x => parseInt(x['totalPrice'].split(',').join('')))
      .reduce((acc, cur) => acc + cur, 0)
      .toString()
    price = "000".substring(price.length) + price
    return price.slice(0, -2) + ',' + price.slice(-2)
  }

}
