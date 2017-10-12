import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {BookDetailsPage} from '../book-details/book-details';
import {ReviewsServiceProvider} from '../../providers/reviews-service/reviews-service';
import {ReviewersServiceProvider} from '../../providers/reviewers-service/reviewers-service';
import {AuthenticationServiceProvider} from '../../providers/authentication-service/authentication-service';

/**
 * Generated class for the SavedReviewsModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-saved-reviews-modal',
  templateUrl: 'saved-reviews-modal.html',
})
export class SavedReviewsModalPage {


  savedReviews$;

  constructor(
    private reviewsService: ReviewsServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavedReviewsModalPage');
    this.savedReviews$ = this.reviewsService.getSavedReviews();

  }

  closeModal() {
    this.navCtrl.pop();
  }

}
