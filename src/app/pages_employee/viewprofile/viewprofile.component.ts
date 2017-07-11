import { Component, OnInit } from '@angular/core';
import { CandidateService } from './../../services/candidate.service';
@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {

  constructor(private candidate: CandidateService) { }

  ngOnInit() {
    this.getlistprofile();
  }
  ListJob: any
  getlistprofile() {
    this.candidate.getallpage("0", "10").subscribe(
      data => {
        this.ListJob = data;
        console.log('ListJob')
        console.log(data)
      },
      error => console.log(error),
      () => { }
    );
  }
}
