import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { JobService } from "../../services/job.service";
import { CandidateService } from "../../services/candidate.service";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Title } from "@angular/platform-browser";
@Component({
  selector: "app-detail-candidate",
  templateUrl: "./detail-candidate.component.html",

  styleUrls: [
    "../../../assets/css/bootstrap.css",
    "./detail-candidate.component.css",
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
export class DetailCandidateComponent implements OnInit {
  constructor(
    private title: Title,
    private job: JobService,
    private _location: Location,
    private Candidate: CandidateService,
    private route: ActivatedRoute
  ) {}
  id: any;
  sub: any;
  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = this.job.getIdRouter(params["id"]);
      this.getdetail(this.id);

      console.log(this.id);
    });
  }
  goback() {
    this._location.back();
  }
  listdetail: any;
  getdetail(id) {
    this.Candidate.getdetailCandi(id).subscribe(
      data => {
        if (typeof data[0] !== "undefined") {
          this.listdetail = data[0];
          this.title.setTitle("Detail Candidate:  " + data[0].nameprofile);
          console.log("======GET  console.log(data);=======");
          console.log(data);
        }
      },
      error => console.log(error),
      () => {}
    );
  }
}
