import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detail-company',
  templateUrl: './detail-company.component.html',
  styleUrls: ['../../../assets/css/bootstrap.css', './detail-company.component.css',
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
export class DetailCompanyComponent implements OnInit {

  sub: any;
  id: any;
  countJob: String;
  constructor(private company: CompanyService, private job: JobService, private route: ActivatedRoute) { }
  companyitem = [];
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    //==============GET============
    this.getdetailCompany();
    this.getcountJobCompany();
    this.get_All_Skill_Company();
    this.get_getjobincompany();
     //==============GET============
  }
  getcountJobCompany() {
    this.company.count_job_in_Company(this.id).subscribe(
      data => {
        if (data.length === 0) {
          this.countJob = "0";
        } else {
          this.countJob = data[0].count;
        }
        console.log(data);
      },
      error => console.log(error),
      () => {
      }
    );
  }
  getdetailCompany() {
    this.company.getdetail_companybyid(this.id).subscribe(
      data => {
        this.companyitem = JSON.parse(data._body)[0];
        console.log(this.companyitem);
      },
      error => console.log(error),
      () => {

      }
    );
  }
  
  //===============GET SKILL COMPANY======

skill_item:any
 get_All_Skill_Company() {
    this.company.get_All_Skill_Company(this.id).subscribe(
      data => {
        this.skill_item = JSON.parse(data._body);
           console.log("======skill_item=======");
        console.log(this.skill_item);
      },
      error => console.log(error),
      () => {

      }
    );
  }
job_item:any
  get_getjobincompany() {
    this.company.getjobincompany(this.id).subscribe(
      data => {
        this.job_item = JSON.parse(data._body);
           console.log("======new=======");
        console.log(this.job_item);
      },
      error => console.log(error),
      () => {

      }
    );
  }

  //===============GET Top JOB OF Company======



    //===============Load comment RATE======



    //===============Post comment RATE======










}
