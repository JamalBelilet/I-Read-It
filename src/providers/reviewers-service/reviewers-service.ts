import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import {AuthenticationServiceProvider} from '../authentication-service/authentication-service';
import {ProfilesServiceProvider} from '../profiles-service/profiles-service';

/*
  Generated class for the ReviewersServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ReviewersServiceProvider {

  loggedReviewer;
  reviewer;
  constructor(
    private profilesService:ProfilesServiceProvider,
    private authService: AuthenticationServiceProvider,
    private afDatabase: AngularFireDatabase,
    public http: Http) {
      console.log('Hello ReviewersServiceProvider Provider');
      this.profilesService.getReviewer().subscribe(
        loggedReviewer => this.loggedReviewer = loggedReviewer
      );
      // this.authService.reviewer$.subscribe(
      //   reviewer => this.loggedReviewer = reviewer.uid
      // );

  }

  getReviewersFollowers(reviewerUID) {
    return this.afDatabase.list(`reviewer_followers/${reviewerUID}`)
  }

  getReviewersFollowing(reviewerUID) {
    console.log('------------------------------');
    console.log(reviewerUID);
    return this.afDatabase.list(`reviewer_following/${reviewerUID}`)
  }

  startFollowing(reviewer) {
    this.afDatabase.list(`reviewer_following/${this.loggedReviewer.$key}`).push({
      key: reviewer.$key,
      name: reviewer.name,
      username: reviewer.username,
      mail: reviewer.mail
    });
    this.afDatabase.object(`reviewers/${this.loggedReviewer.$key}`).update({following: this.loggedReviewer.following + 1 });
    this.afDatabase.list(`reviewer_followers/${reviewer.$key}`).push({
      key: this.loggedReviewer.$key,
      name: this.loggedReviewer.name,
      username: this.loggedReviewer.username,
      mail: this.loggedReviewer.mail
    });
    this.afDatabase.object(`reviewers/${reviewer.key}`).update({followers: reviewer.followers + 1 });

  }

  unfollow(reviewer) {

    let toBeUnfollowed$ =this.afDatabase.list(`reviewer_following/${this.loggedReviewer.$key}`, {
      query: {
        orderByChild: 'key',
        equalTo: reviewer.$key
      }
    });
    let toBeUnfollowedExec = toBeUnfollowed$.subscribe( toBeUnfollowed => {
        for( let _toBeUnfollowed of toBeUnfollowed ) {
          toBeUnfollowed$.remove(_toBeUnfollowed.$key);
        }
      toBeUnfollowedExec.unsubscribe();
    });

    this.afDatabase.object(`reviewers/${this.loggedReviewer.$key}`).update({following: this.loggedReviewer.following - 1 });
    this.afDatabase.object(`reviewers/${reviewer.key}`).update({followers: reviewer.followers - 1 });
    let toBeUnfollowedRev$ =this.afDatabase.list(`reviewer_followers/${reviewer.$key}`, {
      query: {
        orderByChild: 'key',
        equalTo: this.loggedReviewer.$key
      }
    });
    let toBeUnfollowedRevExec = toBeUnfollowed$.subscribe( toBeUnfollowedRev => {
      for( let _toBeUnfollowedRev of toBeUnfollowedRev ) {
        toBeUnfollowedRev$.remove(_toBeUnfollowedRev.$key);
      }
      toBeUnfollowedRevExec.unsubscribe();
    });

  }

  getAllReviewers() {
    return this.afDatabase.list(`reviewers`);
  }



  saveReview(reviewKey) {
    let subscribtion = this.authService.reviewer$.subscribe(
      reviewer => {

        this.afDatabase.list(`reviewer_saved_reviews/${reviewer.uid}`).push( { key: reviewKey } );
        subscribtion.unsubscribe();
      }
  );
  }

  unsaveReview(reviewKey) {
    let sub1 = this.authService.reviewer$.subscribe(
      reviewer => {

        let toBeRemoved$ = this.afDatabase.list(`reviewer_saved_reviews/${reviewer.uid}`, {
          query: {
            orderByChild: "key",
            equalTo: reviewKey
          }
        });
        let sub2 = toBeRemoved$.subscribe( toBeRemoved => {
          for( let _toBeRemoved of toBeRemoved ) {
            console.log('-+-+-+-+-', _toBeRemoved);
            toBeRemoved$.remove(_toBeRemoved.$key);
          }
          sub2.unsubscribe();
        });

        sub1.unsubscribe();
      }
  );
  }

}
