import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Slides } from 'ionic-angular';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { SignUpPage } from '../sign-up/sign-up';
import { TabsPage } from '../tabs/tabs';
import {AuthenticationServiceProvider} from '../../providers/authentication-service/authentication-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('swape', [
      state('toLeft', style({
        transform: 'translateX(+10px)'
      })),
      state('toRight', style({
        transform: 'translateX(-10px)'
      })),
      state('none', style({
        transform: 'translateX(0)'
      })),
      transition('toLeft <=> toRight', animate('800ms ease-out'))
    ])
  ]
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;
  private signUpPage;
  private reviewerCredentials = {
    mail: "",
    password: ""
  };
  private toggleLoginError = false;

  state: string = 'toLeft';
  constructor(private authService: AuthenticationServiceProvider, public menu: MenuController,public navCtrl: NavController) {
    this.signUpPage = SignUpPage;
    menu.swipeEnable(false);

  }
  SlidesDidChanged() {
    if (this.slides.getActiveIndex() <= this.slides.getPreviousIndex() ) {
      this.state = 'toLeft';
    } else {
      this.state = 'toRight';
    }
  }

  getSignUpPage() {
    this.navCtrl.push(this.signUpPage, {signUpPage: this.signUpPage});
  }

  login() {
    const _= this;
    this.authService.login(this.reviewerCredentials)
      .then( _ => {
        this.navCtrl.setRoot(TabsPage);
        this.authService.reviewer$.subscribe( reviewer => console.log(reviewer))
      })
      .catch(error => {

        _.toggleLoginError = !_.toggleLoginError;

        setTimeout(function(){
          _.toggleLoginError = !_.toggleLoginError;
        }, 1500);

      })
  }


}
