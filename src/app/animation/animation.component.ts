import { Component, OnChanges, HostBinding, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes,
} from '@angular/animations';
import { slideInDownAnimation } from '../animations';
@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css'],
  animations: [
    trigger(
      'openClose',
      [
        state('leave', style({
          opacity: 0, 'display': 'none'
        }))
      ]),
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('movePanel', [
      transition('void => *', [
        animate(600, keyframes([
          style({ opacity: 0, transform: 'translateY(-200px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(25px)', offset: .75 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
        ]))
      ])
    ]),
    trigger('showmsg', [
      state('show', style({ opacity: '1', height: '*' })),
      state('hide', style({ opacity: '0', height: '0px' })),
      transition('show => hide', [
        animate('3s', keyframes([
          style({   '-webkit-transform': 'translateY(0px) rotate(0deg)',
            'transform': 'translateY(0px) rotate(0deg)' }),
           style({ 'transform': 'rotateZ(24deg)' }),
              style({  '-webkit-transform': 'rotate(60deg)',
            'transform': 'rotate(60deg)' }),
                 style({ '-webkit-transform': 'translateY(800px) rotate(10deg)',
            'transform': 'translateY(800px) rotate(10deg)' }),
        ]))
      ])
    ]),
    trigger('shake', [
      state('show', style({ opacity: '1' })),
      transition('void => *', [
        animate(600, keyframes([
          style({ opacity: 0, transform: 'translate3d(0, 0, 0)', offset: 0 }),
        ]))
      ]),
    ]),
    trigger('flyout', [
      transition(':enter', [
        animate('6s', keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)' }),
        ]))
      ]),
      transition(':leave', [
        animate('6s', keyframes([
          style({ opacity: 0, transform: 'translateX(100%)' }),
        ]))
      ])

    ])



    /*
 from, to {
    transform: translate3d(0, 0, 0);
  }

  10%, 30%, 50%, 70%, 90% {
    transform: translate3d(-10px, 0, 0);
  }

  20%, 40%, 60%, 80% {
    transform: translate3d(10px, 0, 0);
  }
        */

  ],


})
export class AnimationComponent implements OnInit {

  shakeState: string = 'show';

  togg() {
    this.shakeState = (this.shakeState === 'hide' ? 'show' : 'hide');
  }

  menuState: string = 'out';
  state: string = 'show';
  @HostBinding('@routeAnimation') routeAnimation = true;
  togglestates2() {
    this.state = (this.state === 'hide' ? 'show' : 'hide');
  }
  toggleMenu() {
    // 1-line if statement that toggles the value:
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }



  @Input() isVisible: boolean;
  @Input() isVisibleflyInOut: string;

  getLabel(): string {
    return this.isVisible ? 'Fade out' : 'Fade in';
  }
  toggleflyInOut(): void {
    this.isVisibleflyInOut = 'inactive';
  }
  toggle(): void {
    this.isVisible = !this.isVisible;
  }
  constructor() { }

  ngOnInit() {
  }

}
