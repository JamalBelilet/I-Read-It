import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';

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

  constructor(private imagePicker: ImagePicker, public navCtrl: NavController, public navParams: NavParams) {
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

    this.imagePicker.getPictures({maximumImagesCount: 1}).then((imageURIsArray) => {
      console.log('Image URI: ' + imageURIsArray[0]);
      this.imageURI = imageURIsArray[0];

    }, (err) => { });

  }
}
