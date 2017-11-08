import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConsoleLogPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-console-log',
  templateUrl: 'console-log.html',
})
export class ConsoleLogPage {
  private console_log_params: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.console_log_params = this.navParams.get('console_log_params') ;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsoleLogPage');
  }

}
