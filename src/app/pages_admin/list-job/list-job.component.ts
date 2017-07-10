import { Component, OnInit } from '@angular/core';
import { PostService } from './../../services/post.service';
import { PagerService } from './../../_services/pager.service';





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
  //==============VARIABLES==================
  constructor(private job: PostService, private pagerService: PagerService) {

  }
  //==============FUNCTION==================
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.listAllJob.length, page);
    // get current page of items
    this.listJob = this.listAllJob.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  getall() {
    this.job.getall().subscribe(
      data => {
        this.listAllJob = data;
        this.listJob = data;
           console.log('Show')
        console.log(data)
        this.setPage(1);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

updateStatusTrue(item:any){
  var itemPost={
    _id:item._id,
    status:true
  }
 this.job.edit(itemPost).subscribe(
      data => {
        alert('Thanh cong')
      },
      error => console.log(error),
      () => this.isLoading = false
    );
}
updateStatusFalse(item:any){
  var itemPost={
    _id:item._id,
    status:false
  }
 this.job.edit(itemPost).subscribe(
      data => {
         alert('Thanh cong')
      },
      error => console.log(error),
      () => this.isLoading = false
    );
}
  //==============FUNCTION==================

  //==============Load first==================
  ngOnInit() {
    this.getall();
  }
  //==============Load first==================

}
