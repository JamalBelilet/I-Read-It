import { Component } from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';
import {ReviewerProfilePopoverPage} from '../reviewer-profile-popover/reviewer-profile-popover';
import {FirebaseListObservable} from 'angularfire2/database';

/**
 * Generated class for the FollowersModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-followers-modal',
  templateUrl: 'followers-modal.html',
})
export class FollowersModalPage {
  private followers$: FirebaseListObservable<any>;



  constructor(
    private popoverController:PopoverController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.followers$ = navParams.get('followers');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowersModalPage');
  }
  closeModal() {
    this.navCtrl.pop();
  }

  followerProfile($event, follower) {
    console.log('follower passed from followers list', follower);
    let popover = this.popoverController.create(ReviewerProfilePopoverPage, {reviewer: follower});
    popover.present({
      ev: $event
    });
  }
}
