import { Component } from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';
import {ReviewerProfilePopoverPage} from '../reviewer-profile-popover/reviewer-profile-popover';
import {FirebaseListObservable} from 'angularfire2/database';


/**
 * Generated class for the FollowingModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-following-modal',
  templateUrl: 'following-modal.html',
})
export class FollowingModalPage {
  following$: FirebaseListObservable<any>;


  constructor(
    private popoverController:PopoverController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.following$ = navParams.get('following');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowingModalPage');
  }
  closeModal() {
    this.navCtrl.pop();
  }
  followingProfile($event, following) {
    console.log(following);
    let popover = this.popoverController.create(ReviewerProfilePopoverPage, {reviewer: following});
    popover.present({
      ev: $event
    });
  }
}
