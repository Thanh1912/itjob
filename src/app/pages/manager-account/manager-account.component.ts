import { Component, OnInit, AfterViewInit,ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CandidateService } from '../../services/candidate.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
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
  


  clickchangepass() {
    alert('ok')
    if (this.isupdateuser)
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
  //========================================
public uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/api/uploadcv', itemAlias: 'file_cv' });
   imageurl: string = "";
  constructor(private user: CandidateService, private builder: FormBuilder,private http: Http, private el: ElementRef) { }
  username = new FormControl('')
  email = new FormControl('')
  file = new FormControl('')
  saveForm: FormGroup = this.builder.group({
    username: this.username,
    email: this.email,
    file: this.file,
  });
  listuser: any;
  ngOnInit() {
     this.isupdateuser = false;
    this.ischangepass = false;

    if (localStorage.getItem('userId') != null) {
      this.load_detail_user(localStorage.getItem('userId'));
    } else {
      alert('Vui Long dang nhap');

    }
       //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.imageurl= response;
      console.log(this.imageurl)
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
                .post('http://localhost:3000/api/uploadcv', formData).map((res:Response) => res.json()).subscribe(
                //map the success function and alert the response
                 (success) => {
                         alert(success._body);
                },
                (error) => alert(error))
          }
       }

  saveinfo() {
   let userId = localStorage.getItem('userId');
    var userinput={
      "_id":  userId,
      "fullname" : this.username.value,
      "email" : this.email.value,
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
    var input={
       pathresume : this.imageurl,
       candidateid :userId
    };
     this.user.savecv(input).subscribe(
      data => {
          alert('Thành Công CV')
      },
      error => console.log(error),
      () => { }
    );
    
  }
  load_detail_user(id) {
    this.user.getdetail(id).subscribe(
      data => {
        this.listuser = JSON.parse(data._body);
        console.log(this.listuser);
        this.email.setValue(this.listuser.email);
          this.username.setValue(this.listuser.fullname);
      },
      error => console.log(error),
      () => { }
    );
  }




}
