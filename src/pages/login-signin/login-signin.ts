import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login-signin',
  templateUrl: 'login-signin.html',
})
export class LoginSigninPage {
  email: string = ''
  password: string = ''

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public alertCtrl: AlertController
  ) {}

  signIn() {
    this.firebaseAuth.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .catch(err => {
        this.alertCtrl.create({
          title: 'Erro ao fazer login!',
          subTitle: 'O e-mail ou a senha estão incorretos.',
          buttons: ['OK']
        }).present()
      })
  }

  recoverPassword() {
    let prompt = this.alertCtrl.create({
      title: 'Recuperar Senha',
      message: 'Digite seu e-mail.',
      inputs: [
        {
          name: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Confirmar',
          handler: data => {
            this.firebaseAuth.auth.sendPasswordResetEmail(data.email)
              .then(() => {
                this.alertCtrl.create({
                  title: 'Link para recuperação de senha enviado com sucesso!',
                  subTitle: 'Aguarde alguns minutos e olhe sua caixa de entrada.',
                  buttons: ['OK']
                }).present();
              })
              .catch(() => {
                this.alertCtrl.create({
                  title: 'E-mail inválido!',
                  subTitle: 'Seu pedido não pôde ser enviado.',
                  buttons: ['OK']
                }).present();
              })
          }
        }
      ]
    });
    prompt.present();
  }

}
