import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth} from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

/*
  Generated class for the AuthenticationServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthenticationServiceProvider {
  public reviewer$: Observable<firebase.User>;


  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, public http: Http) {
    this.reviewer$ = afAuth.authState;
  }



  login(reviewerCredentials) {
    return this.afAuth.auth.signInWithEmailAndPassword(reviewerCredentials.mail, reviewerCredentials.password);
  }
  signout() {
    this.afAuth.auth.signOut();
  }
  signup(reviewerCredentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(reviewerCredentials.mail, reviewerCredentials.password);
  }

}
