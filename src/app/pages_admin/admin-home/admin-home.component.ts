import { Component, OnInit } from "@angular/core";
import { QuanliNtdService } from "./../../services/quanli-ntd.service";
import { ToastComponent } from "./../../pages/shared/toast/toast.component";
import { JobService } from "./../../services/job.service";
import { PostService } from "./../../services/post.service";
import { ResumeService } from "./../../services/resume.service";
import { CandidateService } from "./../../services/candidate.service";
import { Title } from "@angular/platform-browser"; 
@Component({
  selector: "app-admin-home",
  templateUrl: "./admin-home.component.html",
  styleUrls: [
    "./admin-home.component.css",
    "../../../assets/Back-end/bootstrap/css/bootstrap.min.css",
    "../../../assets/Back-end/dist/css/AdminLTE.css",
    "../../../assets/Back-end/dist/css/skins/skin-blue.min.css",
    "../../../assets/Back-end/plugins/ionslider/ion.rangeSlider.css",
    "../../../assets/Back-end/plugins/ionslider/ion.rangeSlider.skinNice.css"
  ]
})
export class AdminHomeComponent implements OnInit {
  
  sothanhvien: string = "0";
  sonhatuyendung: string = "0";
  sopost: string = "0";
  socv: string = "0";
  constructor(
     private title: Title, 
    private toast: ToastComponent,
    private QuanliNtdService: QuanliNtdService,
    private post: PostService,
    private job: JobService,
    private resume: ResumeService,
    private candidate: CandidateService
  ) {}
  ngOnInit() {
    this.title.setTitle("Home Admin MeshJOB");
    this.QuanliNtdService
      .count()
      .subscribe(
        data => (this.sonhatuyendung = data),
        error => console.log(error)
      );
    this.post
      .count()
      .subscribe(data => (this.socv = data), error => console.log(error));
    this.resume
      .count()
      .subscribe(
        data => (this.sopost = data),
        error => console.log(error)
      );
    this.candidate
      .count()
      .subscribe(
        data => (this.sothanhvien = data),
        error => console.log(error)
      );
  }
 
}
