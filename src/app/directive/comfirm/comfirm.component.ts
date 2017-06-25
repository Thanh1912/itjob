import { Component, EventEmitter, OnChanges, Output, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes
} from '@angular/animations';

@Component({
  selector: 'app-comfirm',
  templateUrl: './comfirm.component.html',
  styleUrls: ['./comfirm.component.css'],
  animations: [
    trigger('movePanel', [
      transition('void => *', [
        animate(600, keyframes([
          style({ opacity: 0, transform: 'translateY(-200px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(25px)', offset: .75 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
        ]))
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

  ]
})
export class ComfirmComponent implements OnInit {
  @Input() isShow: boolean;
  yes: boolean;
  @Output() out = new EventEmitter<boolean>();
  constructor() { }
  ngOnInit() {
    this.yes = false;
  }

  getYes() {
    return this.yes;
  }

  getisShow() {
    return this.yes;
  }
  show() {
    this.isShow = true;
  }
  hidden() {
    this.out.emit(true);
    this.isShow = false;
    this.yes = true;
  }
  hiddenNo() {
    this.out.emit(false);
    this.isShow = false;
    this.yes = false;
  }

}
