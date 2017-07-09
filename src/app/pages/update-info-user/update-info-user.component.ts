import { Component, OnInit } from '@angular/core';
import { WorkplaceService } from './../../services/workplace.service';
import { JobcategoryDetailService } from './../../services/jobcategory-detail.service';
import { JobcategoryService } from './../../services/jobcategory.service';
import { DistrictService } from './../../services/district.service';
import { DiplomalanguageService } from './../../services/diplomalanguage.service';



@Component({
  selector: 'app-update-info-user',
  templateUrl: './update-info-user.component.html',
  styleUrls: ['../../../assets/css/bootstrap.css', './update-info-user.component.css',
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
export class UpdateInfoUserComponent implements OnInit {
  list_Jobcategory_Detail = [];
  list_Jobcategory_Detail_Submit = [];
  list_Jobcategory: any;
  list_thanhpho: any;
  list_quan: any;
  list_language: any;



  constructor(private District: DistrictService, private Jobcategory: JobcategoryService, private Jobcategory_Detail: JobcategoryDetailService, private Workplace: WorkplaceService, private JobcategoryDetail: JobcategoryDetailService
    , private DiplomalanguageService: DiplomalanguageService) { }

  ngOnInit() {
    this.getthanhpho();
    this.getquan();
    this.getDiplomalanguage();

    this.getJobcategory();
  }

  getJobcategory() {

    this.Jobcategory.getall().subscribe(
      data => {
        this.list_Jobcategory = data
      },
      error => console.log(error),
      () => {

      }
    );
  }
  onchangeSelect(id: any) {
    alert('ok')
    this.Jobcategory_Detail.getallByIdCategory(id).subscribe(
      data => {
        this.list_Jobcategory_Detail = data;
        console.log(data)
      },
      error => console.log(error),
      () => {

      }
    );

  }

  add(id: String, name: String) {
    this.list_Jobcategory_Detail= this.list_Jobcategory_Detail.filter(obj => obj._id !== id);
    this.list_Jobcategory_Detail_Submit.push(
      {
        _id: id,
        name: name
      }
    )
  }
  removeadd(id: String, name: String) {
    this.list_Jobcategory_Detail_Submit= this.list_Jobcategory_Detail_Submit.filter(obj => obj._id !== id);
    this.list_Jobcategory_Detail.push(
      {
        _id: id,
        name: name
      }
    )
  }




  getDiplomalanguage() {
    this.DiplomalanguageService.getall().subscribe(
      data => {
        this.list_language = data
      },
      error => console.log(error),
      () => {

      }
    );
  }

  getthanhpho() {
    this.District.getall().subscribe(
      data => {
        this.list_thanhpho = data
      },
      error => console.log(error),
      () => {
      }
    );
  }

  getquan() {
    this.District.getall().subscribe(
      data => {
        this.list_quan = data
      },
      error => console.log(error),
      () => {

      }
    );
  }


}
