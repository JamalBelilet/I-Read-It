import { Component } from '@angular/core';
import {
  ToastController, ActionSheetController, NavController, NavParams,
  PopoverController
} from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard';
import {MoreBookPopoverPage} from '../more-book-popover/more-book-popover';
import { ReviewerProfilePopoverPage } from '../reviewer-profile-popover/reviewer-profile-popover';
import {ReviewersServiceProvider} from '../../providers/reviewers-service/reviewers-service';
import {AuthenticationServiceProvider} from '../../providers/authentication-service/authentication-service';
import {ConsoleLogPage} from '../console-log/console-log';

/**
 * Generated class for the BookDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-book-details',
  templateUrl: 'book-details.html',
})
export class BookDetailsPage {

  book;
  loved = false;
  loggedReviewerKey;

  constructor(
    private authService: AuthenticationServiceProvider,
    private reviewersService: ReviewersServiceProvider,
    private popoverController:PopoverController,
    private toastController: ToastController,
    private clipboard: Clipboard,
    private socialSharing: SocialSharing,
    private actionSheetController: ActionSheetController,
    public navCtrl: NavController,
    public navParams: NavParams

  ) {
      this.book = navParams.get('book');
      this.authService.reviewer$.subscribe(
        reviewer => this.loggedReviewerKey = reviewer.uid
      );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookDetailsPage');
  }

  getShares():string {
    let count = 0;
    for( let _ of this.book.details.social.share) {
      count += _.shares
    }
    return count > 1000 ? Math.floor(count / 1000) + 'k' : count.toString();
  }

  goBack() {
    this.navCtrl.pop();
  }

  copyPortion(portion, autor, title) {
    console.log(portion._s + '\n—' + autor + ', ' + title);
    this.clipboard.copy(portion._s + '\n—' + autor + ', ' + title);
    let copyToast = this.toastController.create( {
      message: 'copied !',
      cssClass: 'copied-toast',
      duration: 500,
      position: 'middle'
    });
    portion.copies++;
    copyToast.present();
  }

  sharePortion(portion, autor, title) {
    let sharePortionActionSheet = this.actionSheetController.create ({
      title: 'share portion with friends',
      buttons: [
        {
          text: 'share on facebook',
          icon: 'logo-facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook('"' +portion._s + '" , —' + autor + ' ,' + title);
          }
        },
        {
          text: 'share on twitter',
          icon: 'logo-twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter('"' +portion._s + '" , —' + autor + ' ,' + title);
          }
        },
        {
          text: 'share',
          icon: 'share',
          handler: () => {
            this.socialSharing.share('"' +portion._s + '" , —' + autor + ' ,' + title);
          }
        },
        {
          text: 'cancel',
          role: 'destructive'
        }
      ]
    });
    sharePortionActionSheet.present();
  }

  togleLoved(portion) {
    if (portion.me) {
      portion.loves--;
    } else {
      portion.loves++;
    }
    portion.me = !portion.me;
  }

  reviewerProfile($event, reviewer) {
    console.log('this is reviewer passed from book-details', reviewer);
    let popover = this.popoverController.create(ReviewerProfilePopoverPage, {reviewer: reviewer});
    popover.present({
      ev: $event
    });
  }

  saveReview($event, review) {
    $event.stopPropagation();
    console.log('heeeeeeeeeeeeeee+++++++eeeeeeeere', review);
    this.reviewersService.saveReview(review.$key)
  }

  unsaveReview($event, review) {
    $event.stopPropagation();
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
