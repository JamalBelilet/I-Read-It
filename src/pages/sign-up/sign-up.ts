import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthenticationServiceProvider} from '../../providers/authentication-service/authentication-service';
import {TabsPage} from '../tabs/tabs';
import {AngularFireDatabase} from 'angularfire2/database';

/**
 * Generated class for the SignUpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  reviewerCredentials = {
    name: '',
    username: '',
    mail: '',
    password: ''
  };

  constructor(private authService: AuthenticationServiceProvider, private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  getMeBack() {
    this.navCtrl.pop(this.navParams.get("signUpPage"));
  }

  signup() {
    this.authService.signup(this.reviewerCredentials)
      .then( _ => {

        this.afDatabase.object(`reviewers/${_.uid}`).set(
          {
            name: this.reviewerCredentials.name,
            username: this.reviewerCredentials.username,
            mail: this.reviewerCredentials.mail
          }
        );

        this.authService.login(this.reviewerCredentials)
          .then( $ => {
            this.navCtrl.setRoot(TabsPage);
            this.authService.reviewer$.subscribe( reviewer => console.log(reviewer));
          })
          .catch(error => {

          })
      });
  }

}
