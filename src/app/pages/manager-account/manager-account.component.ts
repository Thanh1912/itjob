import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CandidateService } from '../../services/candidate.service';
import { ResumeService } from '../../services/resume.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { AuthenticationService } from "../../_services/authentication.service";
declare var jQuery: any;
interface FileReaderEventTarget extends EventTarget {
  result: string
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}
@Component({
  selector: 'app-manager-account',
  templateUrl: './manager-account.component.html',
  styleUrls: ['../../../assets/css/bootstrap.css', './manager-account.component.css',
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
export class ManagerAccountComponent implements OnInit {
  isupdateuser: boolean;
  ischangepass: boolean;
  //Javascript load image preview when upload image 
  ngAfterViewInit() {

    function readURL(input) {

      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (fre: FileReaderEvent) {
          //   var data = JSON.parse();
          jQuery('#imageprofile').attr('src', fre.target.result);
          // alert(jQuery('#blah').height() + "size: " + jQuery('#blah').width());

        }
        reader.readAsDataURL(input.files[0]);
      }
    }
    jQuery("#anhdaidien").change(function () {
      readURL(this);
    });
  }

  isaction: number;
  
  clickchangepass() {

    if (this.ischangepass)
      this.ischangepass = false;
    else {
      this.ischangepass = true;
    }
  }

  click() {
    if (this.isupdateuser)
      this.isupdateuser = false;
    else {
      this.isupdateuser = true;
    }
  }

  //===========Upload Imgage Anh dai dien================
  public uploaderanhdaidien: FileUploader = new FileUploader({ url: 'http://localhost:3000/api/anhdaidien', itemAlias: 'anhdaidien' });
  //===========Upload Imgage Anh dai dien================


  //========================================
  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/api/uploadcv', itemAlias: 'file_cv' });
  imageurl: string = "";
  constructor(private user: CandidateService, private resume: ResumeService, private builder: FormBuilder, private auth: AuthenticationService, private http: Http, private el: ElementRef) { }
  username = new FormControl('')
  email = new FormControl('')
  phone= new FormControl('')
  file = new FormControl('')
  saveForm: FormGroup = this.builder.group({
    username: this.username,
    email: this.email,
    file: this.file,
  phone:this.phone
  });
  listuser: any;
  change_action(value:number){
    this.isaction=value
  }
  ngOnInit() {
    this.isupdateuser = false;
    this.ischangepass = false;
    this.isaction = 1;
    //1--view profile
    //2--edit myacount
    //3--Edit profile

    if (localStorage.getItem('userId') != null) {
      this.load_detail_user(localStorage.getItem('userId'));
    }
    //===========Upload Imgage Anh dai dien================
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploaderanhdaidien.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploaderanhdaidien.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("UpLoad :", item, status, response);
      alert('Upload thanh cong');

    };
    //===========/Upload Imgage Anh dai dien================

    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

      //cap cv 
      let userId = localStorage.getItem('userId');
      var user1 = {
        pathcv: response,
        _id: userId
      }
      console.log(user1)
      this.user.edit_user(user1).subscribe(
        data => {
          alert('Cap Nhat Thành Công'+response)
        },
        error => console.log(error),
        () => { }
      );
      console.log("ImageUpload: uploaded:", item, status, response);
    };
  }
  upload() {
    //locate the file element meant for the file upload.
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file_cv');
    //get the total amount of files attached to the file input.
    let fileCount: number = inputEl.files.length;
    //create a new fromdata instance
    let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
    if (fileCount > 0) { // a file was selected
      //append the key name 'photo' with the first file in the element
      formData.append('file_cv', inputEl.files.item(0));
      //call the angular http method
      this.http
        //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
        .post('http://localhost:3000/api/uploadcv', formData).map((res: Response) => res.json()).subscribe(
        //map the success function and alert the response
        (success) => {


        },
        (error) => alert(error))
    }
  }
  passwordnew = new FormControl('', [
    Validators.required,
    Validators.minLength(5),

  ]);
  passwordrepeate = new FormControl('', [
    Validators.required,
    Validators.minLength(5),

  ]);

  passwordold = new FormControl('', [
    Validators.required,
    Validators.minLength(5),

  ]);

  changepasswordForm: FormGroup = this.builder.group({
    passwordnew: this.passwordnew,
    passwordold: this.passwordold,

  });
  errrorcheck: String;
  passwordMatch() {
    var checkpass1 = this.changepasswordForm.value.passwordold;
    var checkpass2 = this.changepasswordForm.value.passwordrepeate;
    if (checkpass1 === checkpass2) {
      this.errrorcheck = "";
      return true;
    }
    this.errrorcheck = "No Match";
    return false;

  }

  capnhatpublic() {
    this.user.edit_user({ status: true }).subscribe(
      data => {
        alert('Thành Công')
      },
      error => console.log(error),
      () => { }
    );
  }

  capnhatPrivate() {
    this.user.edit_user({ status: false }).subscribe(
      data => {
        alert('Thành Công')
      },
      error => console.log(error),
      () => { }
    );
  }

  updatePassword() {
    //kiem tra password
    var user = {
      _id: localStorage.getItem('userId'),
      //  password: this.fchangepass.value.passw
    }
    var userinput = {
      //  password: this.fchangepass.value.passnew
    }
    this.auth.signin_tv(user)
      .subscribe(
      data => {
        //update password
        //cap nhat thong tin user 
        this.user.edit_user(userinput).subscribe(
          data => {
            alert('Cap Nhat Thành Công')
          },
          error => console.log(error),
          () => { }
        );


      },
      error => {
        alert('Password is incorrect')

      }
      )
  }


  saveinfo() {
    let userId = localStorage.getItem('userId');
    var userinput = {
      "_id": userId,
      "fullname": this.username.value,
      "email": this.email.value,
      "phone":this.phone.value
    }
    console.log(userinput);
    //cap nhat thong tin user 
    this.user.edit_user(userinput).subscribe(
      data => {
        alert('Thành Công')
      },
      error => console.log(error),
      () => { }
    );


  }
  load_detail_user(id) {
    this.user.getdetailCandi(id).subscribe(
      data => {
        this.listuser = data[0];
        console.log('xuat222');
        console.log(this.listuser);
        this.email.setValue(this.listuser.email);
        this.username.setValue(this.listuser.fullname);
      },
      error => console.log(error),
      () => { }
    );
  }




}
