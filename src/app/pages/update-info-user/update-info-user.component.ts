import { Component, OnInit } from '@angular/core';
import { WorkplaceService } from './../../services/workplace.service';
import { JobcategoryDetailService } from './../../services/jobcategory-detail.service';
import { JobcategoryService } from './../../services/jobcategory.service';
import { DistrictService } from './../../services/district.service';
import { DiplomalanguageService } from './../../services/diplomalanguage.service';
import { CandidateService } from '../../services/candidate.service';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';

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
  Listdiplomalanguage = [];
  diplomalanguage_submit = [];
  list_Jobcategory: any;
  list_thanhpho: any;
  list_quan: any;

  experience: String;
  Category: String
  workplace1: String
  dictrict1: String

  constructor(private builder: FormBuilder, private Candidate: CandidateService, private District: DistrictService, private Jobcategory: JobcategoryService, private Jobcategory_Detail: JobcategoryDetailService, private Workplace: WorkplaceService, private JobcategoryDetail: JobcategoryDetailService
    , private DiplomalanguageService: DiplomalanguageService) { }
  mucluong = new FormControl('', [
    Validators.required,
  ]);
  select

  namepro = new FormControl('', [Validators.required]);

  profileForm: FormGroup = this.builder.group({
    mucluong: this.mucluong,
    namepro: this.namepro
  });

listJobDetail=[]
    getlistJobDetail() {
    this.JobcategoryDetail.getall().subscribe(
      data => {
        this.listJobDetail = data
      },
      error => console.log(error),
      () => {

      }
    );
  }

  submitProfile() {
    console.log(this.profileForm.value);
    var listpost_Jobcategory_Detail = [];
    var listpost_diplomalanguage = [];
    //============Convert=======
    for (let entry of this.list_Jobcategory_Detail_Submit) {
      listpost_Jobcategory_Detail.push(entry._id)
    }
    for (let entry of this.diplomalanguage_submit) {
      listpost_diplomalanguage.push(entry._id)
    }
    var idd = ""
    if (localStorage.getItem('userId') != null) {
      idd = localStorage.getItem('userId');
      var post = {
        _id: idd,
        salary: this.profileForm.value.mucluong,
        nameprofile: this.profileForm.value.namepro,
        jobcategory: this.Category,
        jobcategorydetail: listpost_Jobcategory_Detail,
        experience: this.experience,
        diplomalanguage: listpost_diplomalanguage,
        workplaceid: this.workplace1,
        districtid: this.dictrict1,
        status: true
      }
      console.log(post);
      this.Candidate.edit_user(post).subscribe(
        data => {
          alert('thanh cong')
          console.log(data)
        },
        error => console.log(error),
        () => {

        }
      );

    }
    //===========================



  }
  ngOnInit() {
    this.getthanhpho();
    this.getDiplomalanguage();
    this.getJobcategory();

    if (localStorage.getItem('userId') !== null) {
      alert(localStorage.getItem('userId'))
      this.getcandidate(localStorage.getItem('userId'));
    }
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
    this.list_Jobcategory_Detail = this.list_Jobcategory_Detail.filter(obj => obj._id !== id);
    this.list_Jobcategory_Detail_Submit.push(
      {
        _id: id,
        name: name
      }
    )
  }
  addLang(id: String, name: String) {
    this.Listdiplomalanguage = this.Listdiplomalanguage.filter(obj => obj._id !== id);
    this.diplomalanguage_submit.push(
      {
        _id: id,
        name: name
      }
    )
  }
  removeaddlang(id: String, name: String) {
    this.diplomalanguage_submit = this.diplomalanguage_submit.filter(obj => obj._id !== id);
    this.Listdiplomalanguage.push(
      {
        _id: id,
        name: name
      }
    )
  }
  removeadd(id: String, name: String) {
    this.list_Jobcategory_Detail_Submit = this.list_Jobcategory_Detail_Submit.filter(obj => obj._id !== id);
    this.list_Jobcategory_Detail.push(
      {
        _id: id,
        name: name
      }
    )
  }
  Load_mucluong: String;
  Load_namepro: String;
  Load_Id_Category: String;
  Load__id_jobcategorydetail = [];
  Load_Id_workplace: String;
  Load_diplomalanguage = [];
  Load_id_dictrict: String;
  Load_id_experience: String;


  getcandidate(id: String) {
    var post = {
      _id: id
    }
    this.Candidate.get(post).subscribe(
      data => {
        console.log('SowS');
        console.log(data);
        this.Load_mucluong = data.salary;
        this.Load_namepro = data.nameprofile
        this.Load_Id_Category = data.jobcategory
            var tmparrDetail = [];
        tmparrDetail = data.jobcategorydetail;
        console.log(tmparrDetail)
        for (let entry0 of this.listJobDetail) {
          for (let entry00 of tmparrDetail) {
            if (entry0._id === entry00) {
              alert('ok')
              this.list_Jobcategory_Detail_Submit.push({
                _id: entry0._id,
                name: entry0.name
              })
            }
          }
        }
        this.Load_Id_workplace = data.workplaceid;
        var tmparr = [];
        tmparr = data.diplomalanguage;

        for (let entry of this.Listdiplomalanguage) {
          for (let entry1 of tmparr) {
            if (entry._id === entry1) {
              this.diplomalanguage_submit.push({
                _id: entry._id,
                name: entry.name
              })

            }
          }
        }
        this.Load_id_dictrict = data.districtid
        if (data.districtid !== null) {
          this.getall_District();
        }
        this.Load_id_experience = data.experience

      },
      error => console.log(error),
      () => {

      }
    );
  }
  getall_District() {
    this.District.getall().subscribe(
      data => {
        this.list_quan = data
      },
      error => console.log(error),
      () => {

      }
    );
  }


  getDiplomalanguage() {
    this.DiplomalanguageService.getall().subscribe(
      data => {
        this.Listdiplomalanguage = data
      },
      error => console.log(error),
      () => {

      }
    );
  }

  getthanhpho() {
    this.Workplace.getall().subscribe(
      data => {
        this.list_thanhpho = data
      },
      error => console.log(error),
      () => {
      }
    );
  }
  changetp(id: String) {
    var post = {
      id: id
    }
    this.District.getkeyw(post).subscribe(
      data => {
        this.list_quan = data
      },
      error => console.log(error),
      () => {

      }
    );
  }


}
