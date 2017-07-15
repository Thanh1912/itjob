import { Component, Input, OnInit } from '@angular/core';
import { CandidateService } from './../../services/candidate.service';
import { PagerService } from './../../_services/pager.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {
  // pager object
  @Input() post = {
    jobcategory: '',
    jobcategorydetail: [],
    salarybegin: '',
    salaryend: '',
    districtid: '',
    workplaceid: ''
  };
  @Input() ListJob = [];


   @Input() pager: any = {};
  list = []
  // paged items
  @Input() pagedItems: any[];
  constructor(private _location: Location, private candidate: CandidateService, private pagerService: PagerService) { }
  backClicked() {
    this._location.back();
  }
ngAfterContentInit(){
 this.setPage(1)
}
  ngOnInit() {
   
  }

  setPage(page: number) {
    console.log('pokk')
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(10, page);
    // get current page of items
    this.pagedItems = this.ListJob.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
