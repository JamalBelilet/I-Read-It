import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import * as firebase from 'firebase';
import {SearchPage} from '../search/search';
import {NotificationsPage} from '../notifications/notifications';
import {ConsoleLogPage} from '../console-log/console-log';

/**
 * Generated class for the ProfileInfoModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-info-modal',
  templateUrl: 'profile-info-modal.html',
})
export class ProfileInfoModalPage {

  imageURI;
  reviewer;
  private assetCollection = [];

  constructor(private platform: Platform, private imagePicker: ImagePicker, public navCtrl: NavController, public navParams: NavParams) {
    this.reviewer = navParams.get('reviewer');
    this.imageURI  = `assets/img/${this.reviewer.username}.jpg`;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileInfoModalPage');
  }

  closeModal() {
    this.navCtrl.pop();
  }

  pickProfileImage() {


    this.platform.ready().then(() => {

      this.imagePicker.getPictures({maximumImagesCount: 1}).then((imageURIsArray) => {

        this.navCtrl.push(ConsoleLogPage, {console_log_params: JSON.stringify(this.imagePicker.getPictures({maximumImagesCount: 1}))});

        console.log('Image URI: ' + imageURIsArray[0]);
        this.imageURI = imageURIsArray[0];
        // let storageRef = firebase.storage().ref('avatars');
        // storageRef.put(this.imageURI);

        // const image = `data:image/jpeg.base64.${this.imageURI}`;
        // storageRef.putString(image, 'data_url');






      }, (err) => { });

    });



  }




  /**
   * query firebase database for a list of images stored in the
   * firebase storage. You cannot query firebase storage for a list
   * of objects.
   *
   */
  loadData() {

    firebase.database().ref('assets').on('value', function(_snapshot){

      // need to reset array each time
      let result = [];

      // loop through the snapshot to get the objects
      // to display in the list
      _snapshot.forEach((childSnapshot) => {
        // get key & data...
        // var element = Object.assign({ id: childSnapshot.key }, childSnapshot.val());
        let element = childSnapshot.val();
        element.id = childSnapshot.key;

        // add to array object
        result.push(element);
        return true;
      });


      // put the array on the $scope for display in the UI,
      // we will wrap it in a $timeout to ensure the screen is
      // updated
      setTimeout( ()=> {
        this.assetCollection = result;
      }, 2);
    })
  }

  /**
   *  from documentation:
   *  https://firebase.google.com/docs/storage/web/upload-files
   *
   * This function returns a promise now to better process the
   * image data.
   */
  saveToFirebase(_imageBlob, _filename) {

    return (resolve, reject) => {
      // Create a root reference to the firebase storage
      let storageRef = firebase.storage().ref();

      // pass in the _filename, and save the _imageBlob
      let uploadTask = storageRef.child('images/' + _filename).put(_imageBlob);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // See below for more detail
      }, function (error) {
        // Handle unsuccessful uploads, alert with error message
        alert(error.message);
        reject(error)
      }, function () {
        // Handle successful uploads on complete
        let downloadURL = uploadTask.snapshot.downloadURL;

        // when done, pass back information on the saved image
        resolve(uploadTask.snapshot)
      });
    };
  }


  saveReferenceInDatabase(_snapshot) {
    let ref = firebase.database().ref('assets');

    // see information in firebase documentation on storage snapshot and metaData
    let dataToSave =  {
      'URL': _snapshot.downloadURL, // url to access file
      'name': _snapshot.metadata.name, // name of the file
      'owner': firebase.auth().currentUser.uid,
      'email': firebase.auth().currentUser.email,
      'lastUpdated': new Date().getTime(),
    };

    return ref.push(dataToSave).catch(function(_error){
      alert("Error Saving to Assets " + _error.message);
    })
  }



}
