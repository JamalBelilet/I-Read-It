import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyHotPortionsModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-hot-portions-modal',
  templateUrl: 'my-hot-portions-modal.html',
})
export class MyHotPortionsModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyHotPortionsModalPage');
  }

  closeModal() {
    this.navCtrl.pop();
  }
}
