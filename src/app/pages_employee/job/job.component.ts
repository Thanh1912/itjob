import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { KeywordService } from './../../services/keyword.service';
import { WorkplaceService } from './../../services/workplace.service';
import { DistrictService } from './../../services/district.service';
import { CompanysizeService } from './../../services/companysize.service';
import { countryService } from './../../services/country.service';
import { PostService } from './../../services/post.service';
import { JobcategoryService } from './../../services/jobcategory.service';
import { ViewprofileComponent } from '../viewprofile/viewprofile.component';
import { CandidateService } from './../../services/candidate.service';
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { keyword } from './../../_models/keyword.model';
import { Router } from '@angular/router';
declare var jQuery: any;
interface FileReaderEventTarget extends EventTarget {
  result: string
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],

})
export class JobComponent implements OnInit, AfterViewInit {
  constructor(private candidate: CandidateService, private router: Router, private jobcategoryService: JobcategoryService, private http: Http, private el: ElementRef, private districtService: DistrictService, private workplaceService: WorkplaceService, private jobcategoryDetailService: KeywordService, private countryService: countryService, private postservice: PostService) {
    this.ckeditorContent = `<p>My HTML</p>`;
  }

  //=============================






  //============================


  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/api/uploadpostbaidang', itemAlias: 'file' });
  isthoathuan: boolean = false;
  select_Luong: string = "";
  imageurl: string = "";
  listDistrict = [];
  listKeyword: keyword;
  listWorkplace = [];
  ckeditorContent: String;
  optionsModel: number[];
  keyword: number[];
  myOptions: IMultiSelectOption[];
  model = {};
  id_user: string;
  salarybegin = 0;
  salaryend = 0;
  id_workplace = "";
  id_dictrict = "";
  Donvi = "VND";
  Viewsalary = "0-0 VND";
  ListJobcategory: any;
  ListJobcategoryDetail: any;
  sluongtuyen: String;
  jobcategoryId: String;
  time_end: any;
  isposted: boolean;
  daylaname: string;
  @ViewChild(ViewprofileComponent)
  private viewprofileComponent: ViewprofileComponent
  n = 0;
  Ipost: any;
schange(){
  this.viewprofileComponent.thongbao();
}



  setpost1() {

    this.Ipost = {
      jobcategory: '5958ebc47f843a0dd0b5305c',
      jobcategorydetail: [],
      salarybegin: '',
      salaryend: '',
      districtid: '',
      workplaceid: '',
    };

    this.getlistprofile(this.Ipost);
    if (this.isposted == true) {
      this.isposted = false;
    } else {
      this.isposted = true;
    }

  }
  onChange1() {
    console.log(this.keyword);
  }
  change_category(value: any) {
    this.jobcategoryId = value;
    this.getjobcategoryDetailByid(value)
  }
  onchange_dv(newValue) {
    this.Donvi = newValue;
    this.Viewsalary = this.salarybegin + "-" + this.salaryend + " " + newValue;
  }

  onKeyto() {
    this.Viewsalary = this.salarybegin + "-" + this.salaryend + " " + this.Donvi;
  }
  onChangemotta(newValue) {

  }
  onChangeYeucau(newValue) {

  }
  onKeytfrom() {
    this.Viewsalary = this.salarybegin + "-" + this.salaryend + " " + this.Donvi;
  }
  jobtime: String;
  change_jobtime(value) {
    this.jobtime = value;
  }
  ListJob = [];
  getlistprofile(inputpost) {
    this.candidate.candidate_suitable(inputpost).subscribe(
      data => {
        this.ListJob = data;
        console.log('change ListJob')
        console.log(data)
      },
      error => console.log(error),
      () => { }
    );
  }


  array = []
  ngOnInit() {
    this.array = ['31231', '12312']
    this.isposted = false;
    if (localStorage.getItem('userId_ntd') == null) {
      this.router.navigate(['/pages_employee']);
    }
    this.id_user = localStorage.getItem('userId_ntd');
    this.jobcategoryDetailService.count().subscribe(
      data => {
        this.n = data;
      })
    this.getworkplace();
    this.getjobcategory();

    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.imageurl = response;
      console.log(this.imageurl)
      console.log("ImageUpload: uploaded:", item, status, response);
    };

  }

  //the function which handles the file upload without using a plugin.
  upload() {
    //locate the file element meant for the file upload.
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    //get the total amount of files attached to the file input.
    let fileCount: number = inputEl.files.length;
    //create a new fromdata instance
    let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
    if (fileCount > 0) { // a file was selected
      //append the key name 'photo' with the first file in the element
      formData.append('photo', inputEl.files.item(0));
      //call the angular http method
      this.http
        //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
        .post('http://localhost:3000/uploadpostbaidang', formData).map((res: Response) => res.json()).subscribe(
        //map the success function and alert the response
        (success) => {
          alert('UPload thanh cong');
        },
        (error) => alert('Khong the upload Image'))
    }
  }



  onChange(newValue) {
    console.log(newValue);
    this.select_Luong = newValue;
  }
  private _selectedFields: Array<string> = [];
  public photo: any;
  ngAfterViewInit() {
    //==================FancybOX=====
    jQuery(".fancybox").fancybox({
      afterClose: function () {
        return;
      }
    });

    //====================Select ========
    jQuery('.fields-select').select2();
    jQuery('.fields-select').on(
      'change',
      (e) => this._selectedFields = jQuery(e.target).val()
    );
    //upload file image
    function readURL(input) {

      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (fre: FileReaderEvent) {
          //   var data = JSON.parse();
          jQuery('#blah').attr('src', fre.target.result);
          // alert(jQuery('#blah').height() + "size: " + jQuery('#blah').width());

        }
        reader.readAsDataURL(input.files[0]);
      }
    }
    jQuery("#imgInp").change(function () {
      readURL(this);
    });
  }

  //Event
  //Load select - key work\d-
  onSubmit(value: any) {
    var salarycompete = "";
    if (this.select_Luong == "true") {
      salarycompete = 'Thỏa Thuận';
    } else {
      salarycompete = "$" + value.salarybegin + "-" + "$" + value.salaryend;
    }

    var key = [];
    for (var i = 0; i < this.keyword.length; i++) {
      key.push({ _id: this.keyword[i] })
    }
    var post = {

      title: value.title,
      salarycompete: salarycompete,
      salarybegin: value.salarybegin,
      salaryend: value.salaryend,
      Unit: this.Donvi,
      descriptionwork: value.descriptionwork,
      requirementwork: value.requirementwork,
      postimage: this.imageurl,//
      workplaceid: this.id_workplace,
      districtid: this.id_dictrict,
      recruiterid: this.id_user,
      jobcategorydetail: key,
      JobTime: this.jobtime,
      Apllication: this.sluongtuyen,
      jobcategory: this.jobcategoryId,
      endPost: this.time_end
    }

    this.postservice.add(post).subscribe(
      data => {
        alert('add thanh cong');
        var Ipost = {
          jobcategory: post.jobcategory,
          jobcategorydetail: post.jobcategorydetail,
          salarybegin: post.salarybegin,
          salaryend: post.salaryend,
          districtid: post.districtid,
          workplaceid: post.workplaceid
        };
        this.getlistprofile(Ipost);
        this.setpost1()
      },
      error => console.log(error),
      () => { }
    );
  }

  change_workplace(newValue) {
    console.log(newValue);
    this.id_workplace = newValue;
    this.getDistrict('' + newValue)
  }
  change_dictrict(newValue) {
    this.id_dictrict = newValue;
  }


  getjobcategory() {
    this.jobcategoryService.getall().subscribe(
      data => {
        this.ListJobcategory = data;

      },
      error => console.log(error),
      () => { }
    );
  }
  getjobcategoryDetailByid(id: any) {
    this.jobcategoryDetailService.getallByIdCategory(id).subscribe(
      data => {
        this.listKeyword = data;
        console.log(data)
        //  this.n=listKeyword.le
        this.myOptions = [];

        for (let entry of data) {
          this.myOptions.push({ id: entry._id, name: entry.name })
          console.log(entry.name + entry._id)
        }

      },
      error => console.log(error),
      () => { }
    );
  }
  getworkplace() {
    this.workplaceService.getall().subscribe(
      data => {
        this.listWorkplace = data;
      },
      error => console.log(error),
      () => { }
    );
  }



  getDistrict(id) {
    var c = {
      id: id
    }
    this.districtService.getkeyw(c).subscribe(
      data => {
        this.listDistrict = data
      },
      error => console.log(error),
      () => { }
    );
  }
}
