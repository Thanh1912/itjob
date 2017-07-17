import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { RateService } from '../../services/rate.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
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
  Check_PostRate: number
  sub: any;
  id: any;
  countJob: String;
  constructor(private builder: FormBuilder, private router: Router, private rate: RateService, private company: CompanyService, private _location: Location, private job: JobService, private route: ActivatedRoute) { }
  companyitem = [];
  countReView: String;
  scrollTopChangeRouter() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  title = new FormControl('')
  star = new FormControl('');
  description = new FormControl('');

  RateForm: FormGroup = this.builder.group({
    title: this.title,
    star: this.star,
    description: this.description
  });
  IDcandidate: String;
  ngOnInit() {
    this.IDcandidate = "";
    this.Check_PostRate = 2;
    this.scrollTopChangeRouter();
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.CountRate(this.id);
      this.GetListRate(this.id);
      this.updaterate();

    });

    if (localStorage.getItem('userId') != null) {
      this.IDcandidate = localStorage.getItem('userId');

      this.checkRate();
    } else {
      this.Check_PostRate = 2;
    }

    //==============GET============
    this.getdetailCompany();
    this.getcountJobCompany();
    this.get_All_Skill_Company();
    this.get_getjobincompany();
    //==============GET============
  }
  CountReview() {
    this.countReView = "0";
  }



  backClicked() {
    this._location.back();
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
        this.companyitem = data;
        console.log("======GET COMPANY=======");
        console.log(data);
      },
      error => console.log(error),
      () => {

      }
    );
  }

  //===============GET SKILL COMPANY======

  skill_item: any
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
  job_item: any;

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
  checkRate() {
    var post = {
      candidateid: this.IDcandidate,
      recruiterid: this.id
    }
    this.rate.checkHire(post).subscribe(
      data => {
        this.Check_PostRate = data;
        console.log('check' + data)
      },
      error => console.log(error),
      () => {

      }
    );
  }


  //===============Load comment RATE======
  count_Review: String
  CountRate(id: String) {
    this.rate.count(id).subscribe(
      data => {

        console.log("======sdfdsf=======");
        console.log(data);
        this.count_Review = data
      },
      error => console.log(error),
      () => {

      }
    );
  }

  //============Kiem tra THANH VIEN co la thanh vien cua company do hay kho =============

  list01_Review: any;
  arr = [];
  GetListRate(id: String) {
    this.rate.getByIdRecuter(id).subscribe(
      data => {
        console.log("======list_Review=======");
        console.log(data);
        this.list01_Review = data
      },
      error => console.log(error),
      () => {

      }
    );
  }
updaterate(){
    this.rate.UpdateRate(this.id
          ).subscribe(
            data => {
              alert('thanh cong')
            },
            error => console.log(error),
            () => {
            }
          );
}





  //===============Post comment UpdateRate RATE======

  Postrate() {
    if (this.Check_PostRate == 1) {
      console.log(this.RateForm.value);
      var post = {
        recruiterid: this.id,
        candidateid: this.IDcandidate,
        rate: this.RateForm.value.star,
        title: this.RateForm.value.title,
        content: this.RateForm.value.title,
      }
      console.log(post);

      this.rate.add(post).subscribe(
        data => {
          alert('add thanh cong')
        },
        error => console.log(error),
        () => {
        }
      );
    }
    else {
      alert('Ban Khong co quyen danh gia ! Ban Phai la thanh vien đã làm việc cua cong ty nay!')
    }

  }








}
