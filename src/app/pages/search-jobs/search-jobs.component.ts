import { Component, OnInit } from "@angular/core";
import { JobService } from "./../../services/job.service";
import { JobcategoryService } from "./../../services/jobcategory.service";
import { WorkplaceService } from "./../../services/workplace.service";
import { JobcategoryDetailService } from "./../../services/jobcategory-detail.service";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { CapitalizePipe } from "../Pipe/capitalize.pipe";
import { DatePipe } from "@angular/common";
import { PagerService } from "./../../_services/pager.service";
import { Title } from "@angular/platform-browser";
@Component({
  selector: "app-search-jobs",
  templateUrl: "./search-jobs.component.html",

  styleUrls: [
    "../../../assets/css/bootstrap.css",
    "./search-jobs.component.css",
    "../../../assets/css/animate.css",
    "../../../assets/css/style.css",
    "../../../assets/js/plugins/fancybox/jquery.fancybox.css",
    "../../../assets/js/plugins/rsslider/settings.css",
    "../../../assets/js/plugins/rsslider/layers.css",
    "../../../assets/js/plugins/rsslider/navigation.css",
    "../../../assets/js/plugins/jquery-ui/jquery-ui.css",
    "../../../assets/js/plugins/bootstrap-slider/bootstrap-slider.css",
    "../../../assets/js/plugins/owl/owl.carousel.css"
  ]
})
export class SearchJobsComponent implements OnInit {
  pager: any = {};
  // paged items
  pagedItems: any[];

  Showselected: boolean;
  showcus: boolean;
  isdate: boolean;
  from = new Date();
  to = new Date();
  fromFilter = new Date();
  toFilter = new Date();
  salaryB: String;
  salaryE: String;
  allItem = [];

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
  ngOnInit() {
    this.JobTime = "==";
    this.workplaceid = "0";
    this.fromFilter = new Date("Sat Mar 24 1900 06:50:39 GMT+0100 (CET)");
    this.toFilter = new Date("Sat Mar 24 1900 06:50:39 GMT+0100 (CET)");
    this.Search_title = "";
    this.isdate = true;
    this.Showselected = false;
    this.showcus = false;
    this.isadvance = true;
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
      this.jobcategory_ = params["id"];
      this.idDetail = params["id_detail"];
      if (this.id !== "all") {
        this.getinfoCatagory(this.id);
      }
      this.getjobcategoryByID(this.id);
      if (this.idDetail !== "all") {
        this.jobcategorydetail_ = [];
        this.jobcategorydetail_.push(this.idDetail);
        this.getinfoCatagoryDetail(this.idDetail);
        this.title.setTitle("Search Job " + this.NameCatagoryDetail);
      } else {
        this.NameCatagoryDetail = "";
      }
      this.ChangeListJob();
    });

    this.getjobcategory();
    this.getWorkplace();
  }
  //==========ngOnInit=============
  //********* */
  //===

  selectSalaryB(value: String) {
    this.salaryB = value;
  }
  selectSalaryE(value: String) {
    this.salaryE = value;
  }
  changeJOBTIME(value: String) {
    this.JobTime = value;
  }
  goRouterJob(name, id) {
    this.router.navigateByUrl(
      "pages/home/detail-jobs/" + this.job.bodauTiengViet(name) + "-" + id
    );
  }
  resetDateFrom() {
    this.from = new Date("Sat Mar 24 1900 06:50:39 GMT+0100 (CET)");
  }
  resetDateTo() {
    this.from = new Date("Sat Mar 24 1900 06:50:39 GMT+0100 (CET)");
  }

  select() {
    if (this.Showselected == true) {
      this.Showselected = false;
    } else {
      this.Showselected = true;
    }
  }
  setCustumer() {
    if (this.isdate == true) {
      this.isdate = false;
    } else {
      this.isdate = true;
    }
  }
  setDateFrom(value: Date) {
    this.from = value;
    this.fromFilter = value;
  }
  tp: any;
  resetall() {
    this.salaryB = "0";
    this.salaryE = "0";
    this.fromFilter = new Date("Sat Mar 24 1900 06:50:39 GMT+0100 (CET)");
    this.toFilter = new Date("Sat Mar 24 1900 06:50:39 GMT+0100 (CET)");
    this.tp = "0";
    this.districtid = "";
    this.workplaceid = "";
    this.JobTime = "";
    this.Search_title = "";
    this.ChangeListJob();
  }
  setDate(value: number) {
    var myDate = new Date();
    var dayOfMonth = myDate.getDate();
    myDate.setDate(dayOfMonth - value);
    this.fromFilter = myDate;
  }
  setDateTo(value: Date) {
    this.to = value;
    this.toFilter = value;
  }
  updateCheckBox() {
    //  document.getElementById('check').checked == true
  }
  selectcus() {
    if (this.showcus == true) {
      this.showcus = false;
    } else {
      this.showcus = true;
    }
  }
  onchangeTP(value: String) {
    this.workplaceid = value;
    this.ChangeListJob();
  }
  isadvance = false;
  constructor(
    private title: Title,
    private pagerService: PagerService,
    private datePipe: DatePipe,
    private job: JobService,
    private capitalize: CapitalizePipe,
    private Workplace: WorkplaceService,
    private router: Router,
    private jobcategoryDetailService: JobcategoryDetailService,
    private jobcategory: JobcategoryService,
    private route: ActivatedRoute
  ) {}
  list_all_jobcategory: any;
  list_ById_jobcategory: any;
  private sub: any;
  idDetail: String;
  workplaceid: String;
  NameCatagory: String;
  NameCatagoryDetail: String;
  districtid: String;
  JobTime: String;
  id: any;
  Unit: String;
  jobcategory_: String;
  Search_title: String;
  jobcategorydetail_ = [];
  listPost = {};
  searchTitle() {
    this.ChangeListJob();
  }
  ChangeListJob() {
    var salaryB_TMP = this.salaryB;
    var salaryE_TMP = this.salaryE;
    var fromFilter_TMP = this.fromFilter;
    var toFilter_TMP = this.toFilter;
    var districtid_TMP = this.districtid;
    var workplaceid_TMP = this.workplaceid;
    var JobTime_TMP = this.JobTime;
    var jobcategory_TMP = this.jobcategory_;
    var jobcategorydetail_TMP = this.jobcategorydetail_;
    var Ptitle = this.Search_title;
    var tmp1 = "==";
    var tmp2 = "==";
    if (new Date(this.fromFilter).getTime() !== -2201882961000) {
      tmp1 = fromFilter_TMP + "";
    }
    if (new Date(this.toFilter).getTime() !== -2201882961000) {
      tmp2 = toFilter_TMP + "";
    }
    if (salaryB_TMP === "") {
      salaryB_TMP = "==";
    }
    if (salaryE_TMP === "") {
      salaryE_TMP = "==";
    }
    if (districtid_TMP === "") {
      districtid_TMP = "==";
    }
    if (workplaceid_TMP === "0") {
      workplaceid_TMP = "==";
    }
    if (JobTime_TMP === "") {
      JobTime_TMP = "==";
    }

    if (jobcategory_TMP === "") {
      jobcategory_TMP = "==";
    }
    if (jobcategorydetail_TMP === []) {
      jobcategorydetail_TMP = [];
    }
    if (Ptitle === "") {
      Ptitle = "==";
    }
    this.listPost = {
      salarybeginP: salaryB_TMP,
      salaryendP: salaryE_TMP,
      districtidP: districtid_TMP,
      workplaceidP: workplaceid_TMP,
      JobTimeP: JobTime_TMP,
      jobcategoryP: jobcategory_TMP,
      jobcategorydetailP: jobcategorydetail_TMP,
      titleP: Ptitle,
      dateBeginP: tmp1,
      dateEndP: tmp2
    };
    this.job.searchJobTile(this.listPost).subscribe(
      data => {
        this.allItem = data;
        console.log("show all");
        console.log(data);
        this.setPage(1);
        console.log(this.pagedItems);
      },
      error => console.log(error),
      () => {}
    );
  }
  setallDate() {
    this.fromFilter = new Date("Sat Mar 24 1900 06:50:39 GMT+0100 (CET)");
    this.toFilter = new Date("Sat Mar 24 1900 06:50:39 GMT+0100 (CET)");
  }

  setjsonPost() {}

  list_all_Workplace: any;
  getWorkplace() {
    this.Workplace.getall().subscribe(
      data => {
        console.log("SHOW");
        this.list_all_Workplace = data;
        console.log(this.list_all_Workplace);
      },
      error => console.log(error),
      () => {}
    );
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItem.length, page);
    // get current page of items
    this.pagedItems = this.allItem.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }
  getjobcategory() {
    this.jobcategory.getall().subscribe(
      data => {
        this.list_all_jobcategory = data;
      },
      error => console.log(error),
      () => {}
    );
  }
  getinfoCatagory(id: string) {
    var put = {
      _id: id
    };
    this.jobcategory.get(put).subscribe(
      data => {
        var json = JSON.parse(data._body);
        this.NameCatagory = json.name;
        this.title.setTitle("Search Job - " + this.NameCatagory);
      },
      error => console.log(error),
      () => {}
    );
  }
  getinfoCatagoryDetail(id: String) {
    var post = {
      _id: id
    };
    this.jobcategoryDetailService.get(post).subscribe(
      data => {
        var json = JSON.parse(data._body);
        this.NameCatagoryDetail = "/" + json.name;
        this.title.setTitle(
          "Search Job - " + this.NameCatagory + "-" + json.name
        );
      },
      error => console.log(error),
      () => {}
    );
  }

  getjobcategoryByID(id: String) {
    this.jobcategory.Categorybyid(id).subscribe(
      data => {
        this.list_ById_jobcategory = data;
        console.log(data);
      },
      error => console.log(error),
      () => {}
    );
  }

  clickav() {
    if (this.isadvance) {
      this.isadvance = false;
    } else {
      this.isadvance = true;
    }
  }
}
