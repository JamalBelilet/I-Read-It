import {Component, Input} from '@angular/core';
import {BookDetailsPage} from '../../pages/book-details/book-details';
import {NavController} from 'ionic-angular';
import {ReviewersServiceProvider} from '../../providers/reviewers-service/reviewers-service';
import {AuthenticationServiceProvider} from '../../providers/authentication-service/authentication-service';

/**
 * Generated class for the ReviewHolderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'review-holder',
  templateUrl: 'review-holder.html'
})
export class ReviewHolderComponent {

  @Input() reviews;
  loggedReviewerKey;

  constructor(
    private authService: AuthenticationServiceProvider,
    private reviewersService: ReviewersServiceProvider,
    public navCtrl: NavController,
  ) {
    this.authService.reviewer$.subscribe(
      reviewer => this.loggedReviewerKey = reviewer.uid
    );
  }

  getDetails(book) {
    this.navCtrl.push(BookDetailsPage, { 'book': book });
  }

  getHotPortion(portions) {
    let hotCount = 0;
    let hotPortion = portions[0];
    for (let portion of portions) {
      hotPortion = portion.copies + portion.shares + portion.loves > hotCount ? portion : hotPortion;
      hotCount = portion.copies + portion.shares + portion.loves > hotCount ? portion.copies + portion.shares + portion.loves : hotCount;
    }
    return hotPortion;
  }

  saveReview($event, review) {
    $event.stopPropagation();
    console.log('the review data containing the key', review.$key);
    this.reviewersService.saveReview(review.$key)
  }

  unsaveReview($event, review) {
    $event.stopPropagation();
    console.log('the review data containing the key', review.$key);
    this.reviewersService.unsaveReview(review.$key)
  }

  notMyReview(reviewReviewers) {
    for( let reviewReviewer of reviewReviewers ) {
      if (reviewReviewer.key == this.loggedReviewerKey)
        return false;
    }
    return true;

  }

}
