import { Component } from '@angular/core';
import { ModalController, NavController, NavParams} from 'ionic-angular';

import { BookDetailsPage } from '../book-details/book-details';
import {ReviewInputModalPage} from '../review-input-modal/review-input-modal';
import {ReviewsServiceProvider} from '../../providers/reviews-service/reviews-service';
import {FirebaseListObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {AuthenticationServiceProvider} from '../../providers/authentication-service/authentication-service';
import {ReviewersServiceProvider} from '../../providers/reviewers-service/reviewers-service';
import {ProfilesServiceProvider} from '../../providers/profiles-service/profiles-service';

/**
 * Generated class for the BooksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-books',
  templateUrl: 'books.html',
})
export class BooksPage {
  reviewer: any;
  reviewsO$: Observable<any[]>;

  constructor(
    private profilesService: ProfilesServiceProvider,
    private authService: AuthenticationServiceProvider,
    private reviewsService: ReviewsServiceProvider,
    private modal:ModalController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BooksPage');
    this.profilesService.getReviewer().subscribe(
      reviewer => this.reviewer = reviewer
    );

    this.reviewsO$ = this.authService.reviewer$
      .switchMap( reviewer => this.reviewsService.getBooksReviews(reviewer.uid));


  }

  getReviewInput() {
    let reviewInputModal = this.modal.create(ReviewInputModalPage);
    reviewInputModal.present();

  }
}
