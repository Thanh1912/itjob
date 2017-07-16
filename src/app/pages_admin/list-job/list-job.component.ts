import { Component, OnInit } from '@angular/core';
import { PostService } from './../../services/post.service';
import { PagerService } from './../../_services/pager.service';
import { JobService } from './../../services/job.service';




@Component({
  selector: 'app-list-job',
  templateUrl: './list-job.component.html',
  styleUrls: ['./list-job.component.css']
})
export class ListJobComponent implements OnInit {
  //==============VARIABLES ==================
  listAllJob = [];
  listJob = [];
  isLoading: boolean;
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  isEditing = false;
  count_all_job: number;
  action_search = "";
  action_sort = "";
  key_search = ""
  //==============VARIABLES==================
  constructor(private job: PostService, private job1: JobService, private pagerService: PagerService) {

  }
  onchange_action_s(value) {
    this.action_search = value;
    alert(value)
  }
  onchange_ac(value) {
    this.action_sort = value;
    alert(value)
  }
  search() {
    if (this.action_search == "email") {

      var post = {
        email: this.key_search
      }
      this.job1.searchadminjob(post, 0, 10).subscribe(
        data => {
          this.listJob = data
        },
        error => console.log(error),
        () => this.isLoading = false
      );
    }
    if (this.action_search == "title") {
      var postt = {
        title: this.key_search
      }
      this.job1.searchadminjob(postt, 0, 10).subscribe(
        data => {
          this.listJob = data
        },
        error => console.log(error),
        () => this.isLoading = false
      );
    }





  }


  //==============FUNCTION==================
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    var count = this.count_all_job;
    // get pager object from service
    this.pager = this.pagerService.getPager(count, page);
    // get current page of items;
    this.getall(this.pager.startIndex, this.pager.endIndex + 1)
    // this.listJob = this.listAllJob.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  countall() {
    this.job1.countjob().subscribe(
      data => {
        this.count_all_job = data
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  isloadfirst: boolean;
  getall(start: number, end: number) {
    this.job1.getallpage(start, end).subscribe(
      data => {
        this.listAllJob = data;
        this.listJob = data;
        if (this.isloadfirst) {
          this.setPage(1);
          this.isloadfirst = false
        }

      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  updateStatusTrue(item: any) {
    var itemPost = {
      _id: item._id,
      status: true
    }
    this.job.edit(itemPost).subscribe(
      data => {
        alert('Thanh cong');
        this.getall(0, 10);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  updateStatusFalse(item: any) {
    var itemPost = {
      _id: item._id,
      status: false
    }
    this.job.edit(itemPost).subscribe(
      data => {
        alert('Thanh cong')
        this.getall(0, 10);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  //==============FUNCTION==================

  ngOnInit() {
    this.isloadfirst = true;
    this.countall()
    this.getall(0, 10);
  }
  //==============Load first==================

}
