import { Component,Output,EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
 @Output() out = new EventEmitter<boolean>();
  constructor() { }
  getstar(value: any) {
    alert('ok')
    alert(value)
  }
  over(value: any) {
 this.out.emit(value);
    console.log("" + value);
  }
  ngOnInit() {
  }

}
