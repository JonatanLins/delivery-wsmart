import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login-signup',
  templateUrl: 'login-signup.html',
})
export class LoginSignupPage {
  name: string = ''
  email: string = ''
  cpf: string = ''
  phone: string = ''
  password: string = ''
  passwordConfirm: string = ''

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public alertCtrl: AlertController
  ) { }

  signUp() {
    let error
    if(this.name == ''){
      error = 'Escreva seu nome corretamente.'
    } else if (this.phone.length < 14) {
      error = 'Digite um telefone válido.'
    } else if (this.cpf.length < 14) {
      error = 'Digite um CPF válido.'
    } else if (this.email === '') {
      error = 'Digite um email válido.'
    } else if (this.password.length <= 6) {
      error = 'Senha curta demais.'
    } else if (this.password !== this.passwordConfirm) {
      error = 'As senhas digitadas não correspondem.'
    } else {
      this.firebaseAuth.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch(err => error = err)
    }

    if(error){
      this.alertCtrl.create({
        title: 'Erro ao fazer o cadastro!',
        subTitle: error,
        buttons: ['OK']
      }).present()
    }
  }


}
