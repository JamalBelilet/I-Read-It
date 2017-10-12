import { Component } from '@angular/core';
import {ActionSheetController, NavController, NavParams, ToastController} from 'ionic-angular';
import {SocialSharing} from '@ionic-native/social-sharing';
import {Clipboard} from '@ionic-native/clipboard';

/**
 * Generated class for the SavedPortionsModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-saved-portions-modal',
  templateUrl: 'saved-portions-modal.html',
})
export class SavedPortionsModalPage {

  portions= [
    {_s: "Strawberries can be covered with sun-dried bok choy, also try marinateing the chili with joghurt.", copies: 152, shares: 145, loves: 84, me: false, author: "Adobo Sauce", book: "Desire Seashell"},
    {_s: "The scabbard scrapes with yellow fever, haul the pacific ocean before it rises.", copies: 150, shares: 51, loves: 150, me: false, author: "Pedantically Teleporter", book: "Wisely translate a transformator"},
    {_s: "The sun blows with treasure, fire the brig until it laughs. ", copies: 145, shares: 215, loves: 352, me: false, author: "Adobo Sauce", book: "Desire Seashell"}

  ];

  constructor(
    private toastController: ToastController,
    private clipboard: Clipboard,
    private socialSharing: SocialSharing,
    private actionSheetController: ActionSheetController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavedPortionsModalPage');
  }
  closeModal() {
    this.navCtrl.pop();
  }





  goBack() {
    this.navCtrl.pop();
  }

  copyPortion(portion, autor, title) {
    console.log(portion._s + "\n—" + autor + ", " + title);
    this.clipboard.copy(portion._s + "\n—" + autor + ", " + title);
    let copyToast = this.toastController.create( {
      message: "copied !",
      cssClass: "copied-toast",
      duration: 500,
      position: "middle"
    });
    portion.copies++;
    copyToast.present();
  }

  sharePortion(portion, autor, title) {
    let sharePortionActionSheet = this.actionSheetController.create ({
      title: "share portion with friends",
      buttons: [
        {
          text: "share on facebook",
          icon: "logo-facebook",
          handler: () => {
            this.socialSharing.shareViaFacebook(portion._s + " ," + autor + ", --" + title);
          }
        },
        {
          text: "share on twitter",
          icon: "logo-twitter",
          handler: () => {
            this.socialSharing.shareViaTwitter(portion._s + " ," + autor + ", --" + title);
          }
        },
        {
          text: "share",
          icon: "share",
          handler: () => {
            this.socialSharing.share(portion._s + " ," + autor + ", --" + title);
          }
        },
        {
          text: "cancel",
          role: "destructive"
        }
      ]
    });
    sharePortionActionSheet.present();
  }

  togleLoved(portion) {
    if (portion.me) {
      portion.loves--;
    } else {
      portion.loves++;
    }
    portion.me = !portion.me;
  }

}
