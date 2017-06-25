import {
  Component, OnInit, Input,
  trigger, state, animate, transition, style
} from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { ComfirmComponent } from '../directive/comfirm/comfirm.component';
import { animateFactory } from '../index';
@Component({
  selector: 'app-democode',
  templateUrl: './democode.component.html',
  styleUrls: ['./democode.component.css'],
  animations: [animateFactory(1000, 100)]
})
export class DemocodeComponent implements OnInit {
  iserror = false;
  Rate: string;
  state = ''
  visibility = '';
  set() {
    this.visibility = this.visibility ? '' : 'bounceInLeft';

  }
  constructor(public toast: ToastComponent, public Comfirm: ComfirmComponent) { }

  ngOnInit() {
    this.Rate = "";
    this.iserror = false;
    this.toast.setMessage('you successfully registered!', 'success');
  }
  parentget(agree: boolean) {
    alert(agree);
  }
  getRate(value: any) {
    this.Rate = value
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
