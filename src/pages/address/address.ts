import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Http } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  cep: string = ''
  logradouro: string = ''
  complemento: string = ''
  numero: string = ''
  bairro: string = ''
  cidade: string = ''
  user: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseDB: AngularFireDatabase,
    public http: Http,
  ) {

    this.http.get('../../assets/json/user.json')
      .map(data => data.json())
      .subscribe(data => this.user = data)

    this.http.get('../../assets/json/address.json')
      .map(data => data.json())
      .subscribe(data => {
        console.log(data)
        this.cep = data.cep
        this.logradouro = data.logradouro
        this.complemento = data.complemento
        this.numero = data.numero
        this.bairro = data.bairro
        this.cidade = data.cidade
      })

  }

  submit() {
    this.firebaseDB.object('users/' + this.user.uid + '/address').set({
      cep: this.cep,
      logradouro: this.logradouro,
      complemento: this.complemento,
      numero: this.numero,
      bairro: this.bairro,
      cidade: this.cidade,
    })
    this.navCtrl.pop()
  }

}
