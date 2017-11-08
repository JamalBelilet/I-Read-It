import { Component } from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {ReviewsServiceProvider} from '../../providers/reviews-service/reviews-service';
import {FirebaseListObservable} from 'angularfire2/database';
import {ReviewInputModalPage} from '../review-input-modal/review-input-modal';
import {BookDetailsPage} from '../book-details/book-details';
import {ReviewersServiceProvider} from '../../providers/reviewers-service/reviewers-service';
import {AuthenticationServiceProvider} from '../../providers/authentication-service/authentication-service';
import {Observable} from 'rxjs/Observable';
import {ReviewerInfoModalPage} from '../reviewer-info-modal/reviewer-info-modal';
import {ProfilesServiceProvider} from '../../providers/profiles-service/profiles-service';
import {ConsoleLogPage} from '../console-log/console-log';

/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  reviewer: any;
  reviewers$: FirebaseListObservable<any[]>;
  reviews$: Observable<any>;
  books$: Observable<any>;


  constructor(
    private provilesService: ProfilesServiceProvider,
    private reviwersService: ReviewersServiceProvider,
    private reviewsService: ReviewsServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {


    this.provilesService.getReviewer().subscribe(
      reviewer => this.reviewer = reviewer
    );

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    this.books$ = this.reviewsService.getBooks();
    this.reviews$ = this.reviewsService.getReviews();
    this.reviewers$ = this.reviwersService.getAllReviewers();
  }

  getReviewerInfo(reviewer) {
    this.navCtrl.push(ReviewerInfoModalPage, {reviewer: reviewer});
  }


  consoleLog( book ) {
    this.navCtrl.push(ConsoleLogPage, {console_log_params: JSON.stringify(book)})
  }




}
