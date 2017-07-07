import { Component, OnInit } from '@angular/core';
import { JobService } from './../../services/job.service';
import { JobcategoryService } from './../../services/jobcategory.service';
import { WorkplaceService } from './../../services/workplace.service';

import { JobcategoryDetailService } from './../../services/jobcategory-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CapitalizePipe } from '../Pipe/capitalize.pipe';
import { DatePipe } from '@angular/common';
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
  pager: any = {};
  // paged items
  pagedItems: any[];
  allItems: any;
  Showselected: boolean;
  showcus: boolean;
  isdate: boolean;
  from = new Date()
  to = new Date();
  salaryB: String;
  salaryE: String;
  selectSalaryB(value: String) {
    this.salaryB = value;
  }
  selectSalaryE(value: String) {
    this.salaryE = value;
  }
  select() {
    if (this.Showselected == true) {
      this.Showselected = false;
    } else {
      this.Showselected = true;
    }

  }
  setDate(value: number) {
    //  this.from = 
    //new Date(new Date("2013-02-20T12:01:04.753Z").getTime() - new Date("2013-02-20T12:01:04.753Z").getTime());
    //   this.from= new Date("2013-02-20T12:01:04.753Z");
    var d = new Date();
    d.setDate(d.getDate() - value);
    this.from = d
    this.datePipe.transform(this.from, 'yyyy-MM-dd');
    //Date.now() - +(new Date("2013-02-20T12:01:04.753Z"))
  }
  selectcus() {
    if (this.showcus == true) {
      this.showcus = false;
    } else {
      this.showcus = true;
    }

  }

  isadvance = false;
  constructor(private datePipe: DatePipe, private job: JobService, private capitalize: CapitalizePipe, private Workplace: WorkplaceService, private router: Router, private jobcategoryDetailService: JobcategoryDetailService, private jobcategory: JobcategoryService, private route: ActivatedRoute) { }
  list_all_jobcategory: any;
  list_ById_jobcategory: any;
  private sub: any;
  idDetail: String;
  NameCatagory: String;
  NameCatagoryDetail: String;
  id: any;
  onSubmit(id:String) {
    this.job.searchJobTile({jobcategoryP:this.id}).subscribe(
      data => {
        this.allItems = data;
        console.log(this.allItems);
      },
      error => console.log(error),
      () => {

      }
    );
  }
  ngOnInit() {
    this.isdate = true;
    this.Showselected = false;
    this.showcus = false;
   
    this.isadvance = true;
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.idDetail = params['id_detail'];
      if (this.id !== "all") {
        this.getinfoCatagory(this.id);
         this.onSubmit(this.id)
      }
      this.getjobcategoryByID(this.id);

      if (this.idDetail !== "all")
        this.getinfoCatagoryDetail(this.idDetail);
    });

    this.getjobcategory();
    this.getWorkplace();
  }
  setjsonPost() {

  }

  list_all_Workplace: any;
  getWorkplace() {
    this.Workplace.getall().subscribe(
      data => {
        console.log("SHOW")
        this.list_all_Workplace = data;
        console.log(this.list_all_Workplace)

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

  getjobcategoryByID(id: String) {
    this.jobcategory.Categorybyid(id).subscribe(
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
