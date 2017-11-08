import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { SignUpPage } from '../pages/sign-up/sign-up';
import { BookDetailsPage } from '../pages/book-details/book-details';
import { BooksPage } from '../pages/books/books';

import { LovePage } from '../pages/love/love';
import { SearchPage } from '../pages/search/search';

import { TabsPage } from '../pages/tabs/tabs';

import { MyHotPortionsModalPage } from '../pages/my-hot-portions-modal/my-hot-portions-modal';
import { MyReviewsModalPage } from '../pages/my-reviews-modal/my-reviews-modal';
import { ProfileInfoModalPage } from '../pages/profile-info-modal/profile-info-modal'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard';
import { FCM } from '@ionic-native/fcm';

import { SavedReviewsModalPage } from '../pages/saved-reviews-modal/saved-reviews-modal';
import { SavedPortionsModalPage } from '../pages/saved-portions-modal/saved-portions-modal';
import {MoreBookPopoverPage} from '../pages/more-book-popover/more-book-popover';
import { ReviewerProfilePopoverPage } from '../pages/reviewer-profile-popover/reviewer-profile-popover';
import {ReviewInputModalPage} from '../pages/review-input-modal/review-input-modal';
import {FollowersModalPage} from '../pages/followers-modal/followers-modal';
import {FollowingModalPage} from '../pages/following-modal/following-modal';
import {NotificationsPage} from '../pages/notifications/notifications';
import {SchoolPage} from '../pages/school/school';
import { ReviewsServiceProvider } from '../providers/reviews-service/reviews-service';
import { NotificationsServiceProvider } from '../providers/notifications-service/notifications-service';
import { ProfilesServiceProvider } from '../providers/profiles-service/profiles-service';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthenticationServiceProvider } from '../providers/authentication-service/authentication-service';
import { InitServiceProvider } from '../providers/init-service/init-service';
import { ReviewersServiceProvider } from '../providers/reviewers-service/reviewers-service';
import { ImagePicker } from '@ionic-native/image-picker';
import {ReviewerInfoModalPage} from '../pages/reviewer-info-modal/reviewer-info-modal';
import {ReviewHolderComponent} from '../components/review-holder/review-holder';
import {ConsoleLogPage} from '../pages/console-log/console-log';
import {ReadingWatcherPage} from '../pages/reading-watcher/reading-watcher';



var firebaseConfig = {
  apiKey: "AIzaSyC2Z-i-oWam_Yt2H3XL8n-bRJIuZr8Ow6M",
  authDomain: "jbooks-feb7c.firebaseapp.com",
  databaseURL: "https://jbooks-feb7c.firebaseio.com",
  projectId: "jbooks-feb7c",
  storageBucket: "",
  messagingSenderId: "1090130792103"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    SignUpPage,
    BookDetailsPage,
    BooksPage,
    LovePage,
    SearchPage,
    MyHotPortionsModalPage,
    MyReviewsModalPage,
    ProfileInfoModalPage,
    SavedReviewsModalPage,
    SavedPortionsModalPage,
    MoreBookPopoverPage,
    ReviewerProfilePopoverPage,
    ReviewInputModalPage,
    FollowersModalPage,
    FollowingModalPage,
    NotificationsPage,
    SchoolPage,
    ReviewerInfoModalPage,
    ReadingWatcherPage,
    ConsoleLogPage,
    ReviewHolderComponent


  ],
  imports: [
    AngularFireAuthModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,    
    IonicModule.forRoot(MyApp, {
      platforms: {
        ios: {
          // statusbarPadding: true
        }
      }
    }),
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    SignUpPage,
    BookDetailsPage,
    BooksPage,
    LovePage,
    SearchPage,
    MyHotPortionsModalPage,
    MyReviewsModalPage,
    ProfileInfoModalPage,
    SavedReviewsModalPage,
    SavedPortionsModalPage,
    MoreBookPopoverPage,
    ReviewerProfilePopoverPage,
    ReviewInputModalPage,
    FollowersModalPage,
    FollowingModalPage,
    NotificationsPage,
    SchoolPage,
    ReviewerInfoModalPage,
    ReadingWatcherPage,
    ConsoleLogPage
  ],
  providers: [
    ImagePicker,
    AngularFireDatabase,
    SocialSharing,
    Clipboard,
    FCM,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ReviewsServiceProvider,
    NotificationsServiceProvider,
    ProfilesServiceProvider,
    AuthenticationServiceProvider,
    InitServiceProvider,
    ReviewersServiceProvider
  ]
})
export class AppModule {}
