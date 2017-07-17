import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { CandidateService } from '../../services/candidate.service';
import { ResumeService } from '../../services/resume.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { AuthenticationService } from "../../_services/authentication.service";
import { ToastComponent } from '../../shared/toast/toast.component';
declare var $: any;
interface FileReaderEventTarget extends EventTarget {
  result: string
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}
@Component({
  selector: 'app-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['../../../assets/css/bootstrap.css', './detail-job.component.css',
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
export class DetailJobComponent implements OnInit {
  sub: any;
  id: any;
  name: String;
  email: String;
  imageUrl: String
  idRecruter: String;
  listuser: any;
  constructor(private toast: ToastComponent, private resume: ResumeService, private user: CandidateService, private job: JobService, private router: Router, private route: ActivatedRoute, private _location: Location) { }
  //==================UPLOAD CV======================
  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/api/uploadcv', itemAlias: 'file_cv' });
  //==================UPLOAD CV======================
  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
  islogin:boolean;
  checklogin() {
      let userId = localStorage.getItem('userId');
      if (userId !== null) {
      this.islogin=true
      }     
  }
  jobitem: any;
  ngOnInit() {
           this.toast.setMessage('you successfully registered!', 'success');
      this.islogin=false
      this.checklogin();
    //=========================UPLOAD CV====================
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

      //cap cv
      let userId = localStorage.getItem('userId');
      if (userId === null) {
        alert('vui long dang nhap')
      } else {
        var user1 = {
          pathresume: response,
          candidateid: userId,
          jobid: this.id,
          recruiterid: this.idRecruter
        }
        this.resume.CheckinsertCV(user1).subscribe(
          data => {
            //==========Save Resume=====
            this.resume.save(user1).subscribe(
              data => {
                alert('ĐÃ UPLOAD THANH CÔNG CV')
              },
              error => console.log(error)
            );
            //==========Save Resume=====
          },
          error => {
            alert(JSON.parse(error._body).Messeage)
            console.log(JSON.parse(error._body).Messeage)
            console.log(error)
          }

        );
      }



      console.log("ImageUpload: uploaded:", item, status, response);
    };
    //=========================UPLOAD CV====================

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.get();
    if (localStorage.getItem('userId') != null) {
      this.getUSER(localStorage.getItem('userId'));
    }
  }
  backClicked() {
    this._location.back();
  }
  get() {
    this.job.getdetailjob(this.id).subscribe(
      data => {
        this.jobitem = JSON.parse(data._body)[0];
        this.idRecruter = this.jobitem.recruiterid
        console.log(this.jobitem)
      },
      error => console.log(error),
      () => {

      }
    );
  }
  //===================Load INFO USER======

 /* checkuploadfilecv() {
    this.resume.(this.id).subscribe(
      data => {
        this.jobitem = JSON.parse(data._body)[0];
        this.idRecruter = this.jobitem.recruiterid
        console.log(this.jobitem)
      },
      error => console.log(error),
      () => {

      }
    );

  }*/
  getUSER(id: String) {
    this.user.getdetail(id).subscribe(
      data => {
        this.listuser = JSON.parse(data._body);
        this.name = this.listuser.fullname;

        this.email = this.listuser.email
        this.imageUrl = this.listuser.profileimage
        console.log("=========Listuser==========");
        console.log(this.listuser);
      },
      error => console.log(error),
      () => { }
    );
  }


  //=================Load Info USER========
}
