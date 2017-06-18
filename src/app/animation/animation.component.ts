import { Component, OnChanges, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes
} from '@angular/animations';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css'],
  animations: [
trigger(
    'openClose',
    [
      transition(":enter", [
        style({ opacity: 0 }),
        animate('2000ms', style({ opacity: 1 }))
      ]),
      transition(":leave", [
        animate('2000ms', style({ opacity: 0 }))
      ])
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
                    style({opacity: 0, transform: 'translateY(-200px)', offset: 0}),
                    style({opacity: 1, transform: 'translateY(25px)', offset: .75}),
                    style({opacity: 1, transform: 'translateY(0)', offset: 1}),
                ]))
            ])

        ])

  ],


})
export class AnimationComponent implements OnInit {
menuState:string = 'out';
 
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
