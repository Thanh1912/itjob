import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {
  isedit=false;
  constructor() { }

  ngOnInit() {
  }
edit(){
   this.isedit=true;
}
remove(){
   this.isedit=false;
}
}
