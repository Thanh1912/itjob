import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detail-company',
  templateUrl: './detail-company.component.html',
   styleUrls:['../../../assets/css/bootstrap.css','./detail-company.component.css',
    '../../../assets/css/animate.css'
,'../../../assets/css/style.css'
,'../../../assets/js/plugins/fancybox/jquery.fancybox.css'
,'../../../assets/js/plugins/rsslider/settings.css'
,'../../../assets/js/plugins/rsslider/layers.css'
,'../../../assets/js/plugins/rsslider/navigation.css'
,'../../../assets/js/plugins/jquery-ui/jquery-ui.css'
,'../../../assets/js/plugins/bootstrap-slider/bootstrap-slider.css'
,'../../../assets/js/plugins/owl/owl.carousel.css'
    ]
})
export class DetailCompanyComponent implements OnInit {

  sub: any;
  id: any;
  constructor(private company: CompanyService,private job: JobService,private route: ActivatedRoute ) { }
  companyitem= [];
  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.get();
  }
   get() {
    this.company.getdetailcompany(this.id).subscribe(
      data => {
        this.companyitem =JSON.parse(data._body) ;
        console.log('sh===ow')
           console.log( this.jobitem)
      },
      error => console.log(error),
      () => {

      }
    );
  }

}
