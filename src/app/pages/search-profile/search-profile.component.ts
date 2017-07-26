import { Component, OnInit } from "@angular/core";
import { JobService } from "./../../services/job.service";
import { JobcategoryService } from "./../../services/jobcategory.service";
import { DiplomalanguageService } from "./../../services/diplomalanguage.service";
import { CandidateService } from "./../../services/candidate.service";
import { WorkplaceService } from "./../../services/workplace.service";
import { JobcategoryDetailService } from "./../../services/jobcategory-detail.service";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { CapitalizePipe } from "../Pipe/capitalize.pipe";
import { DatePipe } from "@angular/common";
import { PagerService } from "./../../_services/pager.service";
import { Title } from "@angular/platform-browser";
@Component({
  selector: "app-search-profile",
  templateUrl: "./search-profile.component.html",
  styleUrls: [
    "../../../assets/css/bootstrap.css",
    "./search-profile.component.css",
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
export class SearchProfileComponent implements OnInit {
  scrollTopChangeRouter() {
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
  listNamKinhNghiem = [
    {
      value: "0",
      name: "Mới ra trường"
    },
    {
      value: "1",
      name: "1 Năm"
    },
    {
      value: "2",
      name: "2 Năm"
    },
    {
      value: "3",
      name: "3 Năm"
    },
    {
      value: "4",
      name: "4 Năm"
    },
    {
      value: "5",
      name: "5 Năm"
    }
  ];

  listLuong = [
    {
      value: "-500",
      name: "< 500 "
    },
    {
      value: "500-1000",
      name: "500 - 1000"
    },
    {
      value: "1000-1500",
      name: "1000-1500"
    },
    {
      value: "1500-2000",
      name: "1500-2000"
    },
    {
      value: "2000-3000",
      name: "2000-3000"
    },
    {
      value: "3000",
      name: ">3000"
    }
  ];
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
    this.ChangeListJob();
  }
  setDate(value: number) {
    var myDate = new Date();
    var dayOfMonth = myDate.getDate();
    myDate.setDate(dayOfMonth - value);
    console.log("xuat 5 ago" + myDate);
    this.ChangeListJob();
  }
  setDateTo(value: Date) {
    this.to = value;
    this.toFilter = value;
    this.ChangeListJob();
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
    private Diplomalanguage: DiplomalanguageService,
    private candidate: CandidateService,
    private pagerService: PagerService,
    private datePipe: DatePipe,
    private job: JobService,
    private capitalize: CapitalizePipe,
    private Workplace: WorkplaceService,
    private router: Router,
    private jobcategoryDetailService: JobcategoryDetailService,
    private jobcategory: JobcategoryService,
    private route: ActivatedRoute,
      private title: Title
  ) {}
  list_all_jobcategory: any;
  list_ById_jobcategory: any;
  private sub: any;
  idDetail: String;
  workplaceid: String;

  //=================||=====================
  diplomalanguageInput: String;
  Search_title: String;
  jobcategorydetailInput: String;
  jobcategoryInput: String;
  experienceInput: String;
  salaryInput: String;

  list_all_Workplace: any;
  searchTitle() {
    this.ChangeListJob();
  }
  resetall() {
    this.diplomalanguageInput = "";
    this.jobcategorydetailInput = "";
    this.jobcategoryInput = "";
    this.experienceInput = "";
    this.salaryInput = "";
    this.ChangeListJob();
  }
  ChangeListJob() {
    var Ksalary = this.salaryInput;
    // var Kdistrictid =this.districtidP;
    var Kworkplaceid = this.workplaceid;
    var Kjobcategory = this.jobcategoryInput;
    var Kjobcategorydetail = this.jobcategorydetailInput;
    var Ktitle = this.Search_title;
    var Kexperience = this.experienceInput;
    var Kdiplomalanguage = this.diplomalanguageInput;
    if (Kworkplaceid === "") {
      Kworkplaceid = "==";
    }
    if (Kjobcategory === "") {
      Kjobcategory = "==";
    }
    var arr = [];
    if (
      Kjobcategorydetail === "" ||
      typeof Kjobcategorydetail === "undefined"
    ) {
      arr = [];
      // alert('ok')
    } else {
      arr.push(Kjobcategorydetail);
    }

    console.log(typeof Kjobcategorydetail === "undefined");
    console.log(typeof Kjobcategorydetail === "undefined");

    if (Ktitle === "") {
      Ktitle = "==";
    }

    if (Kexperience === "") {
      Kexperience = "==";
    }
    var arr2 = [];
    if (Kdiplomalanguage === "" || typeof Kdiplomalanguage === "undefined") {
      arr2 = [];
      // alert('ok')
    } else {
      arr2.push(Kdiplomalanguage);
    }
    var post = {
      salaryP: Ksalary,
      //  districtidP: Kdistrictid,
      workplaceidP: Kworkplaceid,
      jobcategoryP: Kjobcategory,
      jobcategorydetailP: arr,
      titleP: Ktitle,
      experienceP: Kexperience,
      diplomalanguageP: arr2
    };
    console.log("DA post");
    console.log(post);
    this.candidate.searchCandidate(post).subscribe(
      data => {
        this.list_profile = data;
        this.setPage(1);
      },
      error => console.log(error),
      () => {}
    );
  }

  ngOnInit() {
   this.title.setTitle("Search Candidate");
    this.scrollTopChangeRouter();

    this.workplaceid = "";
    this.Search_title = "";
    this.isdate = true;
    this.Showselected = false;
    this.showcus = false;
    this.isadvance = true;
    this.getjobcategory();
    this.getWorkplace();
    this.getProfile();

    this.getDiplomalanguage();
  }

  list_all_Diplomalanguage: any;
  getDiplomalanguage() {
    this.Diplomalanguage.getall().subscribe(
      data => {
        this.list_all_Diplomalanguage = data;
        console.log(this.list_all_Diplomalanguage);
      },
      error => console.log(error),
      () => {}
    );
  }

  getWorkplace() {
    this.Workplace.getall().subscribe(
      data => {
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
    this.pager = this.pagerService.getPager(this.list_profile.length, page);
    // get current page of items
    this.pagedItems = this.list_profile.slice(
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

  list_jobcategoryDetail: any;
  getCatagoryDetail(id: String) {
    this.jobcategoryDetailService.getallByIdCategory(id).subscribe(
      data => {
        console.log("OJ");
        this.list_jobcategoryDetail = data;
        console.log(this.list_jobcategoryDetail);
      },
      error => console.log(error),
      () => {}
    );
  }

  list_profile = [];
  getProfile() {
    var post = {};
    this.candidate.searchCandidate(post).subscribe(
      data => {
        console.log("List profile");
        this.list_profile = data;
        console.log(this.list_profile);
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
   goRouterJob(name, id) {
    this.router.navigateByUrl(
      "/pages/home/detail-cadidate/" + this.job.bodauTiengViet(name)+"-" + id
    );
  }
}
