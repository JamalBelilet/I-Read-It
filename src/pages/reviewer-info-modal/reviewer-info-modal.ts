import { Component } from '@angular/core';
import {NavController, NavParams, PopoverController, ModalController} from 'ionic-angular';
import {BooksPage} from '../books/books';
import {NotificationsPage} from '../notifications/notifications';
import {SchoolPage} from '../school/school';
import {SearchPage} from '../search/search';
import {ReviewsServiceProvider} from '../../providers/reviews-service/reviews-service';
import {BookDetailsPage} from '../book-details/book-details';
import {ReviewerProfilePopoverPage} from '../reviewer-profile-popover/reviewer-profile-popover';
import {FirebaseListObservable} from 'angularfire2/database';
import {ReviewersServiceProvider} from '../../providers/reviewers-service/reviewers-service';
import {ProfilesServiceProvider} from '../../providers/profiles-service/profiles-service';
import {AuthenticationServiceProvider} from '../../providers/authentication-service/authentication-service';
import {ProfileInfoModalPage} from '../profile-info-modal/profile-info-modal';

/**
 * Generated class for the ReviewerInfoModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-reviewer-info-modal',
  templateUrl: 'reviewer-info-modal.html',
})
export class ReviewerInfoModalPage {
  loggedReviewer;
  reviewer;
  reviews$;
  segmentOption;
  following$: FirebaseListObservable<any>;
  followers$: FirebaseListObservable<any>;


  constructor(
    private authService: AuthenticationServiceProvider,
    private profilesService: ProfilesServiceProvider,
    private reviewersService: ReviewersServiceProvider,
    private popoverController:PopoverController,
    private reviewsService: ReviewsServiceProvider,
    public navCtrl: NavController,
    private modal:ModalController,
    public navParams: NavParams) {
    this.reviewer = navParams.get('reviewer');
    this.profilesService.getReviewerByKey(this.reviewer).subscribe(
      reviewer => {
        this.reviewer = reviewer;
      }
    );
    this.loggedReviewer = authService.reviewer$;
    this.segmentOption = 'reviews';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewerInfoModalPage');
    let key = this.reviewer.key ? this.reviewer.key : this.reviewer.$key;

    this.reviews$ = this.reviewsService.getReviewerReviews(key);

    this.followers$ = this.reviewersService.getReviewersFollowers(key);
    this.following$ = this.reviewersService.getReviewersFollowing(key);

  }

  closeModal() {
    this.navCtrl.pop();
  }

  followerProfile($event, follower) {
    console.log(follower);
    let popover = this.popoverController.create(ReviewerProfilePopoverPage, {reviewer: follower});
    popover.present({
      ev: $event
    });
  }

  followingProfile($event, following) {
    console.log(following);
    let popover = this.popoverController.create(ReviewerProfilePopoverPage, {reviewer: following});
    popover.present({
      ev: $event
    });
  }

  startFollowing(reviewer) {
    this.reviewersService.startFollowing(reviewer);
  }
  unfollow(reviewer) {
    console.warn('kadf;laksfj;lskvnio ejfdk; bjf;b kfdjio fjds nfew fjd fewof djffno bjfds fjsd', reviewer);
    console.warn('kadf;laksfj;lskvnio e----------------------------', this.reviewer);
    this.reviewersService.unfollow(reviewer);
  }

  editProfile() {
    let profileInfoModal = this.modal.create(ProfileInfoModalPage, {reviewer: this.reviewer});
    profileInfoModal.present();
  }



}
