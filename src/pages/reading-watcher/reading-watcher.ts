import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

import { trigger, state, style, animate, transition } from '@angular/animations';

/**
 * Generated class for the ReadingWatcherPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reading-watcher',
  templateUrl: 'reading-watcher.html',
})
export class ReadingWatcherPage {

  mainReader = 'BELILET Djamaleddine';
  discuss = true;
  private _readingState = [
    {
      reader: 'BELILET Djamaleddine',
      states: [
        {order: 122, text: "Fortis fermiums ducunt ad rumor."},
        {order: 251, text: "Our soft dimension for death is to fear others agreeable."},
        {order: 352, text: "A playful form of ascension is the manifestation."},
        {order: 520, text: "Cur liberi peregrinatione?"}
      ]
    },
    {
      reader: 'Be Eternal',
      states: [
        {order: 156, text: "Embittered shames fears most joys."},
        {order: 253, text: "Congregabo aegre ducunt ad mirabilis stella."},
        {order: 450, text: "Canis, gallus, et rumor."},
        {order: 515, text: "In wonderland PLURALdisturb harmoniously density."}
      ]
    }
  ];

  __discuss = [
    {
      reader: 'Meto Alvila',
      book: 'How to Give Up',
      lastText: 'Fugiat in cupidatat non Lorem nostrud ea.'
    },
    {
      reader: 'Hila Vaio',
      book: 'The Emetter',
      lastText: 'Eu tempor laboris ex nisi quis dolor consequat culpa duis.'
    },
    {
      reader: 'Casio Mathio',
      book: 'I Do Not Know !',
      lastText: 'Incididunt Lorem pariatur cillum aliqua reprehenderit commodo duis nulla cupidatat aliquip esse.'
    },
    {
      reader: 'Maria Linoti',
      book: 'I am Feeling',
      lastText: 'Ex dolore quis nisi aliqua cillum tempor do ex qui cillum enim fugiat.'
    },
    {
      reader: 'Tempor Fugiat',
      book: 'Eiusmod occaecat sunt magna.',
      lastText: 'Amet reprehenderit amet laborum commodo reprehenderit culpa qui veniam velit nostrud proident consectetur cupidatat.'
    },
    {
      reader: 'Ex Sunt Pariatur',
      book: 'Culpa do elit voluptate.',
      lastText: 'Consectetur proident qui nulla minim ullamco amet ut voluptate nulla est nostrud officia aliqua.'
    }
  ]

  constructor(
    private alertController: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  get readingState() {
    let _states = [];
    this._readingState.forEach((readerStates) => {
      readerStates.states.forEach((state) => {
        (state as any).reader = readerStates.reader;
      });
      _states.push(...readerStates.states);
    });
    _states = _states.sort((state_1, state_2) => state_1.order - state_2.order);
    return _states;
  }
  set readingState(__readingState) {
    this._readingState = __readingState;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadingWatcherPage');
  }

  getWatcherApps() {
    this.discuss = ! this.discuss;
  }

}
