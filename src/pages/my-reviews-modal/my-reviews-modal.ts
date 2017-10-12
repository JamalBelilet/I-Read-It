import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {BookDetailsPage} from '../book-details/book-details';
import {ReviewsServiceProvider} from '../../providers/reviews-service/reviews-service';
import {FirebaseListObservable} from 'angularfire2/database';
import {AuthenticationServiceProvider} from '../../providers/authentication-service/authentication-service';

/**
 * Generated class for the MyReviewsModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-reviews-modal',
  templateUrl: 'my-reviews-modal.html',
})
export class MyReviewsModalPage {
  m_reviews$: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController, public navParams: NavParams) {

    this.m_reviews$ = navParams.get('m_reviews$');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyReviewsModalPage');
  }

  closeModal() {
    this.navCtrl.pop();
  }
}
