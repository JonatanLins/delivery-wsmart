import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


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
    public firebaseAuth: AngularFireAuth,
  ) {
    this.user = this.firebaseAuth.auth.currentUser
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
