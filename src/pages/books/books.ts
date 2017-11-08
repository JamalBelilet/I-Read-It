import {  Component } from '@angular/core';
import { ModalController, NavController, NavParams} from 'ionic-angular';

import { BookDetailsPage } from '../book-details/book-details';
import {ReviewInputModalPage} from '../review-input-modal/review-input-modal';
import {ReviewsServiceProvider} from '../../providers/reviews-service/reviews-service';
import {FirebaseListObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {AuthenticationServiceProvider} from '../../providers/authentication-service/authentication-service';
import {ReviewersServiceProvider} from '../../providers/reviewers-service/reviewers-service';
import {ProfilesServiceProvider} from '../../providers/profiles-service/profiles-service';
import { ConsoleLogPage } from '../console-log/console-log';

import * as anime from 'animejs';

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
  _readed = true;

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
    const that = this;
    setTimeout(function() {
      that._readed = false;

    }, 6000);

    anime
    .timeline({ loop: true })
    .add({
      targets: "._ml5 ._line",
      opacity: [0, 1],
      scaleX: [.2, 1],
      easing: "easeInOutExpo",
      duration: 700
    })
    .add({
      targets: "._ml5 ._line",
      opacity: [0.5, 0],
      scaleX: [1, .2],
      easing: "easeInOutExpo",
      duration: 700
    })

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
