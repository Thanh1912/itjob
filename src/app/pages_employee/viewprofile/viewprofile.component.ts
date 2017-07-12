import { Component, OnInit } from '@angular/core';
import { CandidateService } from './../../services/candidate.service';
import { PagerService } from './../../_services/pager.service';
@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {
 // pager object
  pager: any = {};
  list=[]
  // paged items
  pagedItems: any[];
  constructor(private candidate: CandidateService, private pagerService: PagerService) { }

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

  
  ListJob=[]
  getlistprofile() {
    this.candidate.getallpage("0", "10").subscribe(
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
