import { Component,Input, OnInit } from '@angular/core';
import { CandidateService } from './../../services/candidate.service';
import { PagerService } from './../../_services/pager.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {
 // pager object
 @Input() name:String;
  pager: any = {};
  list=[]
  // paged items
  pagedItems: any[];
  constructor(private _location: Location,private candidate: CandidateService, private pagerService: PagerService) { }
 backClicked() {
        this._location.back();
    }
  ngOnInit() {
    this.getlistprofile();
    this.getcountprofile();
  }
   count:number
getcountprofile() {
    this.candidate.count().subscribe(
      data => {
        this.count = data;
      },
      error => console.log(error),
      () => { }
    );
  }

  
  ListJob=[];
  //jobcategorydetail -jobcategory
  getlistprofile() {
    var post={
     jobcategory :'5958ebb27f843a0dd0b5305a',
      jobcategorydetail:['5958effa7f843a0dd0b53060']
    };
    this.candidate.candidate_suitable(post).subscribe(
      data => {
        this.ListJob = data;
        console.log('ListJob')
        this.setPage(1)
        console.log(data)
      },
      error => console.log(error),
      () => { }
    );
  }
    setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }




    var countItem= this.count;
    // get pager object from service
    this.pager = this.pagerService.getPager(countItem, page);
    // get current page of items
    //this.pagedItems = this.ListJob.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
