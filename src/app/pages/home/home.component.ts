import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { JobService } from "../../services/job.service";
import { JobcategoryService } from "../../services/jobcategory.service";
import { JobcategoryDetailService } from "../../services/jobcategory-detail.service";
import { sliderService } from "../../services/slider.service";
import { CandidateService } from "../../services/candidate.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: [
    "../../../assets/css/bootstrap.css",
    "../../../assets/css/animate.css",
    "../../../assets/css/style.css",
    "../../../assets/js/plugins/fancybox/jquery.fancybox.css",
    "../../../assets/js/plugins/rsslider/settings.css",
    "../../../assets/js/plugins/rsslider/layers.css",
    "../../../assets/js/plugins/rsslider/navigation.css",
    "../../../assets/js/plugins/jquery-ui/jquery-ui.css",
    "../../../assets/js/plugins/bootstrap-slider/bootstrap-slider.css",
    "../../../assets/js/plugins/owl/owl.carousel.css",
    "home.component.css"
  ]
})
export class HomeComponent implements OnInit {
  ListJobcategory: any;
  ListJob: any;
  ListJobcategoryD: any;
  Listcompany: any;
  listjobtop: any;
  listslider: any;
  listCandidate: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private Candidate: CandidateService,
    private title: Title,
    private slider: sliderService,
    private job: JobService,
    private JobcategoryService: JobcategoryService,
    private JobcategoryDetailService: JobcategoryDetailService
  ) {}

  getslider() {
    this.slider.getslider().subscribe(
      data => {
        this.listslider = data;
        console.log("====listslider====");
        console.log(this.listslider);
      },
      error => console.log(error),
      () => {}
    );
  }

  getCandidateTop() {
    this.Candidate.getTop().subscribe(
      data => {
        this.listCandidate = data;
        console.log("====getCandidate====");
        console.log(data);
      },
      error => console.log(error),
      () => {}
    );
  }
  goRouterJob(name, id) {
    this.router.navigateByUrl(
      "pages/home/detail-jobs/" + this.job.bodauTiengViet(name)+"-" + id
    );
  }
    goRouterCompany(name, id) {
    this.router.navigateByUrl(
      "pages/home/detail-company/" + this.job.bodauTiengViet(name)+"-" + id
    );
  }
    goRouterCandidate(name, id) {
    this.router.navigateByUrl(
      "pages/home/detail-cadidate/" + this.job.bodauTiengViet(name)+"-" + id
    );
  }
  getjobTOP() {
    this.job.gettopjob().subscribe(
      data => {
        this.listjobtop = data;
        console.log("====listjobtop====");
        console.log(this.listjobtop);
      },
      error => console.log(error),
      () => {}
    );
  }
  getjobcategory() {
    this.JobcategoryService.getall().subscribe(
      data => {
        this.ListJobcategory = data;
      },
      error => console.log(error),
      () => {}
    );
  }
  getjobcategoryD() {
    this.JobcategoryDetailService.getAllCategoryHome().subscribe(
      data => {
        this.ListJobcategoryD = data;
        console.log(this.ListJobcategoryD);
      },
      error => console.log(error),
      () => {}
    );
  }
  gettop12Company() {
    this.job.gettop12Company().subscribe(
      data => {
        this.Listcompany = data;
      },
      error => console.log(error),
      () => {}
    );
  }

  getvalue(value: any) {}
  ngOnInit() {
    this.getjobcategory();
    this.getjobcategoryD();
    this.gettop12Company();
    this.getjobTOP();
    this.getCandidateTop();
    this.title.setTitle("Trang chủ ");
    this.getslider();
  }
}
