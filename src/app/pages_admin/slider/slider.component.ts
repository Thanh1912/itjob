import { Component, OnInit } from '@angular/core';
import { sliderService } from '../../services/slider.service';
import { JobService } from '../../services/job.service';
import { PagerService } from './../../_services/pager.service';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  //====================================
  listjob: any;
  listskider: any;
  isLoading: boolean
  //====================================
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  Itemsall=[];
  constructor(private sliderService: sliderService, private Job: JobService, private pagerService: PagerService) { }
  ngOnInit() {
    this.getallJobslider ();
  }
  //=======
  getallJobslider () {
    this.Job.getall().subscribe(
      data => {
        this.listjob = data;
        console.log('show')
        console.log(data)
        this.setPage(1)
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.Itemsall.length, page);

    // get current page of items
    this.pagedItems = this.Itemsall.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
