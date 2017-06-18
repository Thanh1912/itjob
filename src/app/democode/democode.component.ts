import {
  Component, OnInit, Input,
  trigger, state, animate, transition, style
} from '@angular/core';
@Component({
  selector: 'app-democode',
  templateUrl: './democode.component.html',
  styleUrls: ['./democode.component.css'],

})
export class DemocodeComponent implements OnInit {
  iserror = false
  state = ''
  constructor() { }

  ngOnInit() {
    this.iserror = false
  }
  closeToast() {
    this.iserror = false
  }
  showToast() {
    this.state = 'in'
    this.iserror = true;
    setTimeout(function () { this.state = '' }, 5000);
  }



}
