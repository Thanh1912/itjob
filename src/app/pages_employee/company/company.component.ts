import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { countryService } from './../../services/country.service';
import { CompanysizeService } from './../../services/companysize.service';
import { QuanliNtdService } from './../../services/quanli-ntd.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Nhatuyendung } from './../../_models/nhatuyendung';
import { Router } from '@angular/router';
declare var jQuery: any;
interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  public uploader_logo: FileUploader = new FileUploader({ url: 'http://localhost:3000/api/uploadlogo', itemAlias: 'file_logo' });
  public uploader_co: FileUploader = new FileUploader({ url: 'http://localhost:3000/api/uploadcogty', itemAlias: 'file_co' });

  constructor(private router: Router, private builder: FormBuilder, private QuanliNtdService: QuanliNtdService, private countryService: countryService, private company: CompanysizeService) { }

  id_user: String;
  info_user: Nhatuyendung;
  list_country: any;
  list_company: any;
  img_logo_url: String;
  img_congty_url: String;
  namecompany = new FormControl('', [Validators.required, Validators.minLength(5)]);
  website = new FormControl('', [Validators.required]);
  facebook = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  introduction = new FormControl('', [Validators.required]);
  companysize = new FormControl('', [Validators.required]);
  country = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  logo = new FormControl('', [Validators.required]);
  profileimage = new FormControl('', [Validators.required]);


  congtyForm: FormGroup = this.builder.group({
    namecompany: this.namecompany,
    website: this.website,
    facebook: this.facebook,
    phone: this.phone,
    introduction: this.introduction,
    companysizeid: this.companysize,
    countryid: this.country,
    address: this.address,
    logo: this.logo,
    profileimage: this.profileimage
  });
  ngAfterViewInit() {

    //upload file image
    function readURL(input, idimg) {

      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (fre: FileReaderEvent) {
          //   var data = JSON.parse();
          jQuery('#' + idimg).attr('src', fre.target.result);
          // alert(jQuery('#blah').height() + "size: " + jQuery('#blah').width());

        }
        reader.readAsDataURL(input.files[0]);
      }
    }
    jQuery("#logo").change(function () {
      readURL(this, 'logoimg');
    });
    jQuery("#profile").change(function () {
      readURL(this, 'logopro');
    });
  }
  ngOnInit() {
    if (localStorage.getItem('userId_ntd') == null) {
      this.router.navigate(['/']);
    }

    this.id_user = localStorage.getItem('userId_ntd');
    this.load_info_user(this.id_user);
    this.getall_();
    this.getall_company();
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader_logo.onAfterAddingFile = (file) => { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader_logo.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.img_logo_url = response;
      console.log(this.img_logo_url);
      this.congtyForm.controls['logo'].setValue(this.img_logo_url);

      console.log("ImageUpload: uploaded:", item, status, response);
    };
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader_co.onAfterAddingFile = (file) => { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader_co.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.img_congty_url = response;
      console.log(this.img_congty_url);
      this.congtyForm.controls['profileimage'].setValue(this.img_congty_url);
      console.log("ImageUpload: uploaded:", item, status, response);
    };
  }
  getall_() {
    this.countryService.getall().subscribe(
      data => {
        this.list_country = data;
      },
      error => console.log(error),
      () => { }
    );
  }

  load_info_user(id_user) {
    this.QuanliNtdService.getinfo(id_user).subscribe(
      data => {
        const json = JSON.parse(data._body);
        this.congtyForm.controls['logo'].setValue(json.info_recruiter.logo);
        this.congtyForm.controls['profileimage'].setValue(json.info_recruiter.profileimage);
        this.congtyForm.controls['website'].setValue(json.info_recruiter.website);
        this.congtyForm.controls['namecompany'].setValue(json.info_recruiter.namecompany);
        this.congtyForm.controls['facebook'].setValue(json.info_recruiter.facebook);
        this.congtyForm.controls['phone'].setValue(json.info_recruiter.phone);
        this.congtyForm.controls['address'].setValue(json.info_recruiter.address);
        this.congtyForm.controls['introduction'].setValue(json.info_recruiter.introduction);
        this.congtyForm.controls['countryid'].setValue(json.info_recruiter.countryid);
        this.congtyForm.controls['companysizeid'].setValue(json.info_recruiter.companysizeid);
        this.congtyForm.controls['countryid'].setValue(json.info_recruiter.countryid);

      },
      error => console.log(error),
      () => { }
    );
  }
  getall_company() {
    this.company.getall().subscribe(
      data => {
        this.list_company = data;
      },
      error => console.log(error),
      () => { }
    );
  }
  onsubmit() {
    console.log(this.congtyForm.value);
    var id = this.id_user;
    this.QuanliNtdService.updatepro(this.congtyForm.value, id).subscribe(
      data => {
        alert('add thanh cong')
      },
      error => console.log(error),
      () => { }
    );
  }


}
