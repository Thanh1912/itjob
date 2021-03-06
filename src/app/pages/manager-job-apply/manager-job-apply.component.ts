import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import { ResumeService } from '../../services/resume.service';
import { Title } from "@angular/platform-browser";  
@Component({
  selector: 'app-manager-job-apply',
  templateUrl: './manager-job-apply.component.html',
  styleUrls: ['../../../assets/css/bootstrap.css', './manager-job-apply.component.css',
    '../../../assets/css/animate.css'
    , '../../../assets/css/style.css'
    , '../../../assets/js/plugins/fancybox/jquery.fancybox.css'
    , '../../../assets/js/plugins/rsslider/settings.css'
    , '../../../assets/js/plugins/rsslider/layers.css'
    , '../../../assets/js/plugins/rsslider/navigation.css'
    , '../../../assets/js/plugins/jquery-ui/jquery-ui.css'
    , '../../../assets/js/plugins/bootstrap-slider/bootstrap-slider.css'
    , '../../../assets/js/plugins/owl/owl.carousel.css'
  ]
})
export class ManagerJobApplyComponent implements OnInit {

  constructor(private title: Title, private user: CandidateService, private resume: ResumeService) { }
  listJOB=[];
  ngOnInit() {
    this.title.setTitle("Manager Apply job");
    if (localStorage.getItem('userId') != null) {
      this.load_detail_user(localStorage.getItem('userId'));
    } else {
      alert('vui long dang nhap')
    }
  }
  load_detail_user(id) {
    this.resume.getalljobapplyByidUser(id).subscribe(
      data => {
        this.listJOB=data;
        console.log(data);
      },
      error => console.log(error),
      () => { }
    );
  }

}
