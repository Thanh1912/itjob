import { Component, ElementRef, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { KeywordService } from './../../services/keyword.service';
import { WorkplaceService } from './../../services/workplace.service';
import { DistrictService } from './../../services/district.service';
import { CompanysizeService } from './../../services/companysize.service';
import { countryService } from './../../services/country.service';
import { PostService } from './../../services/post.service';
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { keyword } from './../../_models/keyword.model';
import { ActivatedRoute, Router } from '@angular/router';

declare var jQuery: any;
interface FileReaderEventTarget extends EventTarget {
  result: string
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}
@Component({
  selector: 'app-edit-baidang',
  templateUrl: './edit-baidang.component.html',
  styleUrls: ['./edit-baidang.component.css']
})
export class EditBaidangComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private http: Http, private el: ElementRef, private districtService: DistrictService, private workplaceService: WorkplaceService, private keywordService: KeywordService, private postservice: PostService) {
    this.ckeditorContent = `<p>My HTML</p>`;

  }

  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/api/uploadpostbaidang', itemAlias: 'file' });
 ckeditordescriptionwork:String;
  isthoathuan: boolean = false;
  id: string;
  private sub: any;
  select_Luong: string = "";
  imageurl: string = "";
  listDistrict = [];
  listKeyword: keyword;
  listWorkplace = [];
  ckeditorContent: String;
  optionsModel: String[];
  keyword: number[];
  myOptions: IMultiSelectOption[];
  model = {};
  salarybegin = 0;
  salaryend = 0;
  id_workplace = "";
  title = "";
  descriptionwork = "";
  requirementwork = "";
  id_dictrict = "";
  Donvi = "VND";
  Viewsalary = "0-0 VND";
  sluongtuyen: String;
  jobcategoryId: String;
  time_end: any;
  jobtime: String;
  selectedjobtime: String;
  n = 0;
  onChange1() {
    console.log(this.keyword);
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

  ngOnInit() {
      this.ckeditordescriptionwork = `<p>My HTML</p>`;

    this.getallDistrict();
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      // In a real app: dispatch action to load the details here.
    });
    this.Loadpage();
    this.keywordService.count().subscribe(
      data => {
        this.n = data;
      })
    this.getKeyword();
    this.getworkplace();
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
        .post('http://localhost:3000/upload', formData).map((res: Response) => res.json()).subscribe(
        //map the success function and alert the response
        (success) => {
          alert(success._body);
        },
        (error) => alert(error))
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
  change_jobtime(value) {
    this.jobtime = value;
  }
  time_endLoad:Date;
  //Event
  Loadpage() {

    var a = {
      '_id': this.id
    }
    this.postservice.get(a).subscribe(
      data => {
        const json = data[0]
        console.log(data)
        this.title = json.title;
        this.Viewsalary = json.salarycompete;
        this.salarybegin = json.salarybegin;
        this.salaryend = json.salaryend;
        this.descriptionwork = json.descriptionwork;
        this.requirementwork = json.requirementwork;
        this.imageurl = json.postimage;
        this.id_workplace = json.workplaceid;
        this.id_dictrict = json.districtid
        this.sluongtuyen = json.Apllication
        this.time_endLoad = json.endPost
        this.selectedjobtime = json.JobTime
      },
      error => console.log(error),
      () => { }
    );


  }


  //Load select - key work\d-
  onSubmit(value: any) {
    var salarycompete = "";
    if (this.select_Luong == "true") {
      salarycompete = 'thoathuan';
    }
    if (localStorage.getItem('userId_ntd') == null) {
      this.router.navigate(['/pages_employee']);
    }
    var id_user = localStorage.getItem('userId_ntd');
    var key = [];
    for (var i = 0; i < this.keyword.length; i++) {
      key.push({ _id: this.keyword[i] })
    }
    var edit = {
      _id: this.id,
      title: value.title,
      salarycompete: salarycompete,
      salarybegin: value.salarybegin,
      salaryend: value.salaryend,
       Unit :this.Donvi,
      descriptionwork: value.descriptionwork,
      requirementwork: value.requirementwork,
      postimage: this.imageurl,//
      workplaceid: this.id_workplace,
      districtid: this.id_dictrict,
      recruiterid: id_user,
      jobcategorydetail: key,
      JobTime: this.jobtime,
      Apllication: this.sluongtuyen,
      jobcategory: this.jobcategoryId,
      endPost: this.time_end
    }
    this.postservice.edit(edit).subscribe(
      data => {
        alert('Edit thành công !!')
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

  getKeyword() {
    this.keywordService.getall().subscribe(
      data => {
        this.listKeyword = data;
        this.myOptions = [];
        for (var i = 0; i < this.n; i++) {
          this.myOptions.push({ id: data[i]._id, name: data[i].name })
          console.log(data[i].name + data[i]._id)
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
  getallDistrict() {

    this.districtService.getall().subscribe(
      data => {
        this.listDistrict = data;
        console.log("LOAD OK");
        console.log(this.listDistrict);
      },
      error => console.log(error),
      () => { }
    );
  }
}
