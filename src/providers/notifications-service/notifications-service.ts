import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FCM } from '@ionic-native/fcm';

/*
  Generated class for the NotificationsServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class NotificationsServiceProvider {

  notification: {
    key: '',
    generator: 'followerKey',
    type: 'like, follow, share, invite',
    source: ''

  };

  constructor(public http: Http, private fcm: FCM) {
    console.log('Hello NotificationsServiceProvider Provider');

    //Receiving Token Refresh
    //FCMPlugin.onTokenRefresh( onTokenRefreshCallback(token) );
    //Note that this callback will be fired everytime a new token is generated, including the first time.
    fcm.onTokenRefresh().subscribe(token=>{
      alert( token );
      // backend.registerToken(token);
    });

    //Get token
    //FCMPlugin.getToken( successCallback(token), errorCallback(err) );
    //Keep in mind the function will return null if the token has not been established yet.
    fcm.getToken().then(token=>{
      alert(token);
      // backend.registerToken(token);
    });

    //Subscribe to topic
    //FCMPlugin.subscribeToTopic( topic, successCallback(msg), errorCallback(err) );
    //All devices are subscribed automatically to 'all' and 'ios' or 'android' topic respectively.
    //Must match the following regular expression: "[a-zA-Z0-9-_.~%]{1,900}".
    fcm.subscribeToTopic('topicExample');

    //Unsubscribe from topic
    //FCMPlugin.unsubscribeFromTopic( topic, successCallback(msg), errorCallback(err) );
    fcm.unsubscribeFromTopic('topicExample');

    //Receiving push notification data
    //FCMPlugin.onNotification( onNotificationCallback(data), successCallback(msg), errorCallback(err) )
    //Here you define your application behaviour based on the notification data.
    fcm.onNotification().subscribe(data=>{
      if(data.wasTapped){
        //Notification was received on device tray and tapped by the user.
        alert( JSON.stringify(data) );
      }else{
        //Notification was received in foreground. Maybe the user needs to be notified.
        alert( JSON.stringify(data) );
      }
    });

  }






}
