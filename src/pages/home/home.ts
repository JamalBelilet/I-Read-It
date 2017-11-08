import { Component, ViewChild, ElementRef } from '@angular/core';
import { MenuController, NavController, Slides } from 'ionic-angular';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { SignUpPage } from '../sign-up/sign-up';
import { TabsPage } from '../tabs/tabs';
import { AuthenticationServiceProvider } from '../../providers/authentication-service/authentication-service';
import * as anime from 'animejs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('login-loading', [
      state('shift-left', style({
        transform: 'translateX(+10em)'
      })),
      state('shift-right', style({
        transform: 'translateX(-10em)'
      })),
      state('none', style({
        transform: 'translateX(0)'
      })),
      transition('none => shift-right', animate('800ms ease-out')),
      transition('none => shift-left', animate('800ms ease-out'))
    ])
  ]
})
export class HomePage {

  _loadingState: string = 'none';
  loadingState_: string = 'none';

  @ViewChild(Slides) slides: Slides;
  private signUpPage;
  private reviewerCredentials = {
    mail: "fd_belilet@esi.dz",
    password: "Eth.hck.600512"
  };
  private toggleLoginError = false;

  state: string = 'toLeft';
  constructor(private elRef:ElementRef, private authService: AuthenticationServiceProvider, public menu: MenuController,public navCtrl: NavController) {
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

    this._loadingState = 'shift-left';
    this.loadingState_ = 'shift-right';

    const _= this;
    this.authService.login(this.reviewerCredentials)
      .then( $ => {
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

  ionViewDidLoad() {

    this.loadingState_= this._loadingState = 'none';
     
    

    // const wrapperEl = document.querySelector('.wrapper');
    // const numberOfEls = 90;
    // const duration = 1000;
    // const delay = duration / numberOfEls;

    // let tl = anime.timeline({
    //   duration: delay,
    //   complete: function() { tl.restart(); }
    // });

    // function createEl(i) {
    //   let el = document.createElement('div');
    //   const rotate = (360 / numberOfEls) * i;
    //   const translateY = -50;
    //   const hue = Math.round(10 / numberOfEls * i) + 95;
    //   el.classList.add('el');
    //   el.style.backgroundColor = '#ffffff87';
    
    //   el.style.transform = 'rotate(' + rotate + 'deg) translateY(' + translateY + '%)';
    //   tl.add({
    //     begin: function() {
    //       anime({
    //         targets: el,
    //         // backgroundColor: ['hsl(' + hue + ', 40%, 60%)', 'hsl(' + hue + ', 60%, 80%)'],
    //         rotate: [rotate + 'deg', rotate + 10 +'deg'],
    //         translateY: [translateY + '%', translateY + 10 + '%'],
    //         scale: [1, 1.25],
    //         easing: 'easeInOutSine',
    //         direction: 'alternate',
    //         duration: duration * .1
    //       });
    //     }
    //   });
    //   wrapperEl.appendChild(el);
    // };

    // for (let i = 0; i < numberOfEls; i++) createEl(i);



    anime.timeline({loop: 1, })
    .add({
      targets: '.ml5 .line',
      opacity: [0.5,1],
      scaleX: [0, 1],
      easing: "easeInOutExpo",
      duration: 700
    }).add({
      targets: '.ml5 .line',
      duration: 600,
      easing: "easeOutExpo",
      translateY: function(e, i, l) {
        var offset = -2.625 + 2.625*2*i;
        return offset + "em";
      }
    }).add({
      targets: '.ml5 .ampersand',
      opacity: [0,1],
      scaleY: [0.5, 1],
      easing: "easeOutExpo",
      duration: 600,
      offset: '-=600'
    }).add({
      targets: '.ml5 .letters-left',
      opacity: [0,1],
      translateX: ["0.5em", 0],
      easing: "easeOutExpo",
      duration: 600,
      offset: '-=300'
    }).add({
      targets: '.ml5 .letters-right',
      opacity: [0,1],
      translateX: ["-0.5em", 0],
      easing: "easeOutExpo",
      duration: 600,
      offset: '-=600'
    })

  }


}
