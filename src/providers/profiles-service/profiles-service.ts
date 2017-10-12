import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthenticationServiceProvider} from '../authentication-service/authentication-service';
import { AngularFireDatabase } from 'angularfire2/database';
import {ReviewersServiceProvider} from '../reviewers-service/reviewers-service';

/*
  Generated class for the ProfilesServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProfilesServiceProvider {

  constructor(public http: Http, private authService: AuthenticationServiceProvider, private afDatabase: AngularFireDatabase) {
    console.log('Hello ProfilesServiceProvider Provider');
  }

  getReviewer() {
    return this.authService.reviewer$.switchMap(
      reviewer => this.afDatabase.object(`reviewers/${reviewer.uid}`)
    );
  }
  getReviewerByKey(rev) {
    rev.key = rev.key ? rev.key: rev.$key;
    return this.afDatabase.object(`reviewers/${rev.key}`).map( reviewer => {
        let _reviewer = reviewer;
        _reviewer.isFollowed = this.isFollowed(rev.key);
        return _reviewer;
      }
    )
  }

  isFollowed(reviewer$key) {

    console.error('thats it', reviewer$key);
    return this.getReviewer().switchMap(
      loggedReviewer =>
        this.afDatabase.list(`reviewer_following/${loggedReviewer.$key}`, {
          query: {
            orderByChild: 'key',
            equalTo: reviewer$key
          }
        })
    );
  }

}
