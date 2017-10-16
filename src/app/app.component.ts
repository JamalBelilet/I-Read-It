import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';


import { MyHotPortionsModalPage } from '../pages/my-hot-portions-modal/my-hot-portions-modal';
import { MyReviewsModalPage } from '../pages/my-reviews-modal/my-reviews-modal';
import { ProfileInfoModalPage } from '../pages/profile-info-modal/profile-info-modal';
import { SavedReviewsModalPage } from '../pages/saved-reviews-modal/saved-reviews-modal';
import { SavedPortionsModalPage } from '../pages/saved-portions-modal/saved-portions-modal';
import {FollowersModalPage} from '../pages/followers-modal/followers-modal';
import {FollowingModalPage} from '../pages/following-modal/following-modal';
import {ProfilesServiceProvider} from '../providers/profiles-service/profiles-service';
import {ReviewsServiceProvider} from '../providers/reviews-service/reviews-service';
import {AuthenticationServiceProvider} from '../providers/authentication-service/authentication-service';
import {Observable} from 'rxjs/Observable';
import {ReviewersServiceProvider} from '../providers/reviewers-service/reviewers-service';
import {SearchPage} from '../pages/search/search';
import {ReviewerInfoModalPage} from '../pages/reviewer-info-modal/reviewer-info-modal';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  reviewer;

  @ViewChild(Nav) nav: Nav;

  rootPage: any = SearchPage;


  constructor(
    private reviewersService: ReviewersServiceProvider,
    private authService: AuthenticationServiceProvider,
    private reviewsService: ReviewsServiceProvider,
    private profilesService:ProfilesServiceProvider,
    private alertController:AlertController,
    private modal:ModalController,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {

      this.initializeApp();
      this.reviewer = profilesService.getReviewer().subscribe(
        reviewer => this.reviewer = reviewer
      );

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openModel() {
    console.log('this is our model coming ');
    this.modal.create(HomePage);

  }

  getMyReviews() {
    // let _ = this._getMyReviews();
    let m_reviews$ = this.reviewsService.getReviewerReviews(this.reviewer.$key);
    console.log('meaaaaaaaaaaaaaaaaaaaaw', m_reviews$);
    let myReviewsModal = this.modal.create(MyReviewsModalPage, {m_reviews$: m_reviews$});
    myReviewsModal.present();
  }
  getSavedReviews() {
    let savedReviewsModal = this.modal.create(SavedReviewsModalPage, {reviewerUsername: this.reviewer.username});
    savedReviewsModal.present();
  }
  getSavedPortions() {
    let savedPortionsModal = this.modal.create(SavedPortionsModalPage);
    savedPortionsModal.present();
  }
  getMyHotPortions() {
    let myHotPortionsModal = this.modal.create(MyHotPortionsModalPage);
    myHotPortionsModal.present();
  }
  getFollowers() {
    let followersModal = this.modal.create(FollowersModalPage, {followers: this.reviewersService.getReviewersFollowers(this.reviewer.$key)});
    followersModal.present();
  }
  getFollowing() {
    let followingModal = this.modal.create(FollowingModalPage, {following: this.reviewersService.getReviewersFollowing(this.reviewer.$key)});
    followingModal.present();
  }

  getReviewerInfoModel() {
    let reviewerInfoModel = this.modal.create(ReviewerInfoModalPage, {reviewer: this.reviewer});
    reviewerInfoModel.present();
  }

  signout() {
    let alert = this.alertController.create( {
      title: 'log out',
      message: 'Are you sure you want to logout',
      buttons:  [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'yes',
          handler: () => {
            this.authService.signout();
            this.nav.setRoot(HomePage);
          }
        }
      ]
    } );
    alert.present();
  }



}
