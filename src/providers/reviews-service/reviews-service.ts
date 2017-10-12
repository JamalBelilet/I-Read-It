import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {} from 'angularfire2/'
import 'rxjs/add/observable/forkJoin'
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/merge';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/Observable/combineLatest';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import {AuthenticationServiceProvider} from '../authentication-service/authentication-service';

/*
  Generated class for the ReviewsServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ReviewsServiceProvider {
  booksO$: Observable<{}[]>;
  books$: FirebaseListObservable<any[]> = null;
  books = [];
  subject: BehaviorSubject<any[]>;


  constructor(
    private authService: AuthenticationServiceProvider,
    private afDatabase: AngularFireDatabase,
    public http: Http) {




  }


  getBooksReviews(reviewerKey$) {


    let thing = new Array();

    thing.push({place:"here",name:"stuff"});
    thing.push({place:"there",name:"morestuff"});
    thing.push({place:"there",name:"morestuff"});

    thing = thing.filter((thing, index, self) => self.findIndex((t) => {return t.place === thing.place && t.name === thing.name; }) === index);

    return this.afDatabase.list(`reviewer_following/${reviewerKey$}`)
      .map( followedReviewerKeys => followedReviewerKeys
        .map( followedReviewer => this._o_getBooksReviews(followedReviewer.key)))
      .switchMap( followedReviewerObsArray => followedReviewerObsArray.length >= 1
        ? Observable.combineLatest( followedReviewerObsArray )
        : Observable.of([]))
      .map( reviewKeys => reviewKeys
        .filter((review, index, self) => self.findIndex((t) => {console.log(t[0].$key); console.log(review[0].$key); return t[0].$key === review[0].$key }) === index)
      )


  }

  // _getBooksReviews() {
  //   return this.subject
  //     .switchMap(followedReviewerKey => this.__getBooksReviews(followedReviewerKey));
  // }

  __getBooksReviews(followedReviewerKey) {
    return this.afDatabase.list(`reviewer_reviews/${followedReviewerKey}`)
      .map( reviewKeys => reviewKeys
        .map( review => this.afDatabase.object(`reviews/${review.key}`) ))
      .switchMap( reviewObsArray => reviewObsArray.length >= 1
        ? Observable.combineLatest( reviewObsArray )
        : Observable.of([])
      );
  }
  _o_getBooksReviews(followedReviewerKey) {
    return this.afDatabase.list(`reviewer_reviews/${followedReviewerKey}`)
      .map( reviewKeys => reviewKeys
        .map( review => this.afDatabase.object(`reviews/${review.key}`) )
        .map( review => {
          review.isSaved = true;
          return review;
        }))
      .switchMap( reviewObsArray => reviewObsArray.length >= 1
        ? Observable.combineLatest( reviewObsArray )
        : Observable.of([]))
      .map( reviewKeys => reviewKeys
        .map( review => {

          let _review = review;
          _review.isSaved = this.isSaved(review);
          return _review;
        }))

  }

  getSavedReviews() {
    return this.authService.reviewer$.switchMap( reviewer => {
      return this.afDatabase.list(`reviewer_saved_reviews/${reviewer.uid}`)
        .map( reviewKeys => reviewKeys
          .map( review => this.afDatabase.object(`reviews/${review.key}`) ))
        .switchMap( reviewObsArray => reviewObsArray.length >= 1
          ? Observable.combineLatest( reviewObsArray )
          : Observable.of([]))
        .map( reviewKeys => reviewKeys
          .map( review => {

            let _review = review;
            _review.isSaved = this.isSaved(review);
            return _review;
          }))
    });

  }
  getSavedReviewsKeys() {
    return this.authService.reviewer$.switchMap( reviewer => {
      return this.afDatabase.list(`reviewer_saved_reviews/${reviewer.uid}`)
    });

  }

  // getBooksReviews(reviewerKey$) {
  //   return this.booksO$ = this.afDatabase.list(`reviewer_following/${reviewerKey$}`)
  //     .map(followerKeys => followerKeys
  //       .map(follower => this.afDatabase.object(`reviewer_reviews/${follower.key}`)))
  //     .switchMap(reviewObsArray => Observable.combineLatest(reviewObsArray));
  // }

  getReviewerReviews(reviewerKey) {
    return this._o_getBooksReviews(reviewerKey)
  }

  getReviewers(bookKey: string) {
    var reviewers;
    reviewers = this.afDatabase.list(`reviews/${bookKey}/reviewers`);
    return reviewers;
  }

  submitReview(n_review, reviewer$key, reviewermyreviews) {
    let _key = this.afDatabase.list(`reviews`).push(n_review);
    _key.then(
      (res) => {
        console.error(reviewer$key);
        this.afDatabase.list(`reviewer_reviews/${reviewer$key}`).push({key: _key.key});
        this.afDatabase.object(`reviewers/${reviewer$key}`).update({myreviews: reviewermyreviews + 1});
      }
    )

  }

  isSaved(review: any) {
    return this.authService.reviewer$.switchMap( reviewer => {
      return this.afDatabase.list(`reviewer_saved_reviews/${reviewer.uid}`, {
        query: {
          orderByChild: 'key',
          equalTo: review.$key
        }
      })
    })
  }

  getReviews() {
    return this.afDatabase.list(`reviews`)
      .map( reviewKeys => reviewKeys
        .map( review => {
          let _review = review;
          _review.isSaved = this.isSaved(review);
          return _review;
        }))
  }

}
