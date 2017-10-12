import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthenticationServiceProvider} from '../../providers/authentication-service/authentication-service';
import {ProfilesServiceProvider} from '../../providers/profiles-service/profiles-service';
import {ReviewsServiceProvider} from '../../providers/reviews-service/reviews-service';

/**
 * Generated class for the ReviewInputModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-review-input-modal',
  templateUrl: 'review-input-modal.html',
})
export class ReviewInputModalPage {
  reviewer;
  n_review = {
    "bookDetails" : {
      "author" : "",
      "cover" : "",
      "title" : ""
    },
    "resume": "",
    "portions" : [ {
      "_s" : "",
      "copies" : 0,
      "loves" : 0,
      "shares" : 0
    } ],
    "reviewers" : []
  };

  constructor(
    private reviewsService: ReviewsServiceProvider,
    private profilesService:ProfilesServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    this.profilesService.getReviewer().subscribe(
      reviewer => {
        this.reviewer = reviewer;
        this.n_review.reviewers.push(
          {
            "key" : reviewer.$key,
            "name" : reviewer.name,
            "username" : reviewer.username
          }
        );
      }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewInputModalPage');



  }

  closeModal() {
    this.navCtrl.pop();
  }

  submitReview() {
    this.reviewsService.submitReview(this.n_review, this.reviewer.$key, this.reviewer.myreviews);
    this.navCtrl.pop();

  }

}
