import { Component, OnInit } from "@angular/core";
import { PostService } from "./../../services/post.service";
import { PagerService } from "./../../_services/pager.service";
import { JobService } from "./../../services/job.service";
import { ToastComponent } from "./../../pages/shared/toast/toast.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";  
@Component({
  selector: "app-list-job",
  templateUrl: "./list-job.component.html",
  styleUrls: ["./list-job.component.css"]
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
  key_search = "";
  //==============VARIABLES==================
  constructor(
    private router: Router,
    private toast: ToastComponent,
    private job: PostService,
    private job1: JobService,
    private pagerService: PagerService,
     private title: Title,  
  ) {}
  onchange_action_s(value) {
    this.action_search = value;
  }
  onchange_ac(value) {
    this.action_sort = value;
    this.setPage(1);
  }
  goRouterJob(name, id) {
    this.router.navigateByUrl(
      "pages/home/detail-jobs/" + this.job1.bodauTiengViet(name) + "-" + id
    );
  }
   goRouterCompany(name, id) {
    this.router.navigateByUrl(
      "pages/home/detail-company/" + this.job1.bodauTiengViet(name) + "-" + id
    );
  }
  setPage(page: number) {
    var post = {};

    if (this.action_sort !== "") {
      post = {
        state: this.action_sort,
        title: this.key_search
      };
    } else {
      post = {
        title: this.key_search
      };
    }
    console.log(post);

    this.job1.countsearchadminjob(post, 0, 10).subscribe(
      data => {
        this.count_all_job = data;

        if (page < 1 || page > this.pager.totalPages) {
          return;
        }
        var count = this.count_all_job;
        // get pager object from service
        this.pager = this.pagerService.getPager(count, page);
        this.job1
          .searchadminjob(post, this.pager.startIndex, this.pager.endIndex + 1)
          .subscribe(
            data => {
              this.listJob = data;
            },
            error => console.log(error),
            () => (this.isLoading = false)
          );
      },
      error => console.log(error),
      () => (this.isLoading = false)
    );
  }

  //==============FUNCTION==================
  /*
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    var count = this.count_all_job;
    // get pager object from service
    this.pager = this.pagerService.getPager(count, page);


    // get current page of items;
    //  this.getall(this.pager.startIndex, this.pager.endIndex + 1)
    // this.listJob = this.listAllJob.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
*/
  countall() {
    this.job1.countjob().subscribe(
      data => {
        this.count_all_job = data;
      },
      error => console.log(error),
      () => (this.isLoading = false)
    );
  }
  delete(item) {
    if (
      window.confirm("Are you sure you want to permanently delete this item?")
    ) {
      this.job.delete(item).subscribe(
        data => {
          const pos = this.listJob
            .map(elem => {
              return elem._id;
            })
            .indexOf(item._id);
          this.listJob.splice(pos, 1);
          this.toast.setMessage("Delete successfully.", "success", "left");
        },
        error => console.log(error),
        () => (this.isLoading = false)
      );
    }
  }
  isloadfirst: boolean;
  getall(start: number, end: number) {
    this.job1.getallpage(start, end).subscribe(
      data => {
        this.listAllJob = data;
        this.listJob = data;
        if (this.isloadfirst) {
          this.setPage(1);
          this.isloadfirst = false;
        }
      },
      error => console.log(error),
      () => (this.isLoading = false)
    );
  }

  updateStatusTrue(item: any) {
    var itemPost = {
      _id: item._id,
      status: true
    };
    this.job.edit(itemPost).subscribe(
      data => {
        this.toast.setMessage("Edit successfully.", "success", "left");
        this.getall(0, 10);
      },
      error => console.log(error),
      () => (this.isLoading = false)
    );
  }
  updateStatusFalse(item: any) {
    var itemPost = {
      _id: item._id,
      status: false
    };
    this.job.edit(itemPost).subscribe(
      data => {
        this.toast.setMessage("Edit successfully.", "success", "left");
        this.getall(0, 10);
      },
      error => console.log(error),
      () => (this.isLoading = false)
    );
  }
  
  //==============FUNCTION==================

  ngOnInit() {
     this.title.setTitle("Admin Manager Job");
    this.isloadfirst = true;
    this.countall();
    this.getall(0, 10);
  }
  //==============Load first==================
}
