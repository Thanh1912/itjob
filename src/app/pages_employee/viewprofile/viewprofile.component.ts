import { Component, Input, OnInit } from '@angular/core';
import { CandidateService } from './../../services/candidate.service';
import { PagerService } from './../../_services/pager.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { JobService } from "../../services/job.service";
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
  @Input() daylaname: string;
  @Input() ListJob = [];
  @Input() conditionJob = {};
  @Input() pager: any = {};
  list = []
  // paged items
  @Input() pagedItems: any[];
  constructor(private job:JobService, private router: Router,private _location: Location, private candidate: CandidateService, private pagerService: PagerService) { }
 

  ngAfterContentInit() {
    this.setPage(1);
  }
  ngAfterViewInit() {
    this.setPage(1)
  }
     goRouterCandidate(name, id) {
    this.router.navigateByUrl(
      "pages/home/detail-cadidate/" + this.job.bodauTiengViet(name)+"-" + id
    );
  }
  ngOnInit() {

  }
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(10, page);
    // get current page of items
    this.pagedItems = this.ListJob.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
