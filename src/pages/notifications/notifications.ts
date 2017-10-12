import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NotificationsServiceProvider} from '../../providers/notifications-service/notifications-service';

/**
 * Generated class for the NotificationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  portion= {

    _s: "Strawberries can be covered with sun-dried bok choy, also try marinateing the chili with joghurt.",
    copies: 152,
    shares: 145,
    loves: 84,
    me: false,
    author: "Adobo Sauce",
    book: "Desire Seashell"
  };


  constructor(
    private notificationServiceProvider: NotificationsServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

}
