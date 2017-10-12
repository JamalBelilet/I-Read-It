import { Component } from '@angular/core';
import {ModalController, NavController, NavParams, App, ViewController} from 'ionic-angular';
import {ReviewerInfoModalPage} from '../reviewer-info-modal/reviewer-info-modal';


/**
 * Generated class for the ReviewerProfilePopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-reviewer-profile-popover',
  templateUrl: 'reviewer-profile-popover.html',
})
export class ReviewerProfilePopoverPage {
  reviewer;
  portion = {
    _s: 'The sun blows with treasure, fire the brig until it laughs. ',
    copies: 145,
    shares: 215,
    loves: 352,
    me: false,
    author: 'Adobo Sauce',
    book: 'Desire Seashell'
  };

  constructor(
    protected app: App,
    private modal:ModalController,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.reviewer = navParams.get('reviewer');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewerProfilePopoverPage');
  }

  getReviewerInfoModel() {
    this.app.getRootNav().push(ReviewerInfoModalPage, {reviewer: this.reviewer});
    this.viewCtrl.dismiss();

    // let reviewerInfoModel = this.modal.create(ReviewerInfoModalPage, {reviewer: this.reviewer});
    // reviewerInfoModel.present();
  }

}
