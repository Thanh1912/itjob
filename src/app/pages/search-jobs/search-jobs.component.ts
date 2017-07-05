import { Component, OnInit } from '@angular/core';
import { JobService } from './../../services/job.service';
import { JobcategoryService } from './../../services/jobcategory.service';
import { WorkplaceService } from './../../services/workplace.service';

import { JobcategoryDetailService } from './../../services/jobcategory-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-search-jobs',
  templateUrl: './search-jobs.component.html',

  styleUrls: ['../../../assets/css/bootstrap.css', './search-jobs.component.css',
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
export class SearchJobsComponent implements OnInit {
  isadvance = false;
  constructor(private job: JobService,private Workplace: WorkplaceService, private router: Router, private jobcategoryDetailService: JobcategoryDetailService, private jobcategory: JobcategoryService, private route: ActivatedRoute) { }
  list_all_jobcategory: any;
  list_ById_jobcategory: any;
  private sub: any;
  idDetail: String;
  NameCatagory: String;
  NameCatagoryDetail: String;
  id: any;
  ngOnInit() {
    this.isadvance = true;
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.idDetail = params['id_detail'];
      if (this.id !== "all")
        this.getinfoCatagory(this.id);
      if (this.idDetail !== "all")
        this.getinfoCatagoryDetail(this.idDetail);
    });

    this.getjobcategory();
    this.getWorkplace
    this.getjobcategoryByID();

  }
 
list_all_Workplace:any;
  getWorkplace() {
    this.Workplace.getall().subscribe(
      data => {
        this.list_all_Workplace = data

      },
      error => console.log(error),
      () => {

      }
    );
  }
  getjobcategory() {
    this.jobcategory.getall().subscribe(
      data => {
        this.list_all_jobcategory = data

      },
      error => console.log(error),
      () => {

      }
    );
  }
  getinfoCatagory(id: string) {
    var put = {
      _id: id
    };
    this.jobcategory.get(put).subscribe(
      data => {
        var json = JSON.parse(data._body)
        this.NameCatagory = json.name
      },
      error => console.log(error),
      () => {

      }
    );

  }
  getinfoCatagoryDetail(id: String) {
    var post = {
      _id: id
    };
    this.jobcategoryDetailService.get(post).subscribe(
      data => {
        var json = JSON.parse(data._body)
        this.NameCatagoryDetail = json.name

      },
      error => console.log(error),
      () => {

      }
    );
  }

  getjobcategoryByID() {
    this.jobcategory.Categorybyid(this.id).subscribe(
      data => {
        this.list_ById_jobcategory = data;
        console.log(data)
      },
      error => console.log(error),
      () => {

      }
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
