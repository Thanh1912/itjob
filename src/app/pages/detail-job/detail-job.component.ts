import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['../../../assets/css/bootstrap.css', './detail-job.component.css',
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
export class DetailJobComponent implements OnInit {
  sub: any;
  id: any;
  constructor(private job: JobService,private route: ActivatedRoute ) { }
  jobitem= [];
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.get();

  }

  get() {
    this.job.getdetailjob(this.id).subscribe(
      data => {
        this.jobitem =JSON.parse(data._body)[0] ;
      console.log(  this.jobitem)
      },
      error => console.log(error),
      () => {

      }
    );
  }

}
