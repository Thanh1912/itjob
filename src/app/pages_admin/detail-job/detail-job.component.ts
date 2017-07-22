import { Component, OnInit } from "@angular/core";
import { JobService } from "./../../services/job.service";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Location } from "@angular/common";
import { Title } from "@angular/platform-browser";
@Component({
  selector: "app-detail-job",
  templateUrl: "./detail-job.component.html",
  styleUrls: ["./detail-job.component.css"]
})
export class DetailJobComponent implements OnInit {
  constructor(
    private job: JobService,
    private _location: Location,
    private route: ActivatedRoute,
    private title: Title
  ) {}
  list: any;
  id: any;
  sub: any;

  ngOnInit() {
    this.title.setTitle("Detail Job");
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
      this.getall(this.id);
    });
  }
  go() {
    this._location.back();
  }
  getall(ids) {
    this.job.getdetailjobByIdjob_admin(ids).subscribe(
      data => {
        this.list = data[0];
        console.log(data);
      },
      error => console.log(error),
      () => {}
    );
  }
}
