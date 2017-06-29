import { Component, OnInit, Renderer, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from "../../_services/authentication.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-job',
  templateUrl: './register-job.component.html',
  styleUrls: ['../../../assets/css/bootstrap.css',
    '../../../assets/css/animate.css'
    , '../../../assets/css/style.css'
    , '../../../assets/js/plugins/fancybox/jquery.fancybox.css'
    , '../../../assets/js/plugins/rsslider/settings.css'
    , '../../../assets/js/plugins/rsslider/layers.css'
    , '../../../assets/js/plugins/rsslider/navigation.css'
    , '../../../assets/js/plugins/jquery-ui/jquery-ui.css'
    , '../../../assets/js/plugins/bootstrap-slider/bootstrap-slider.css'
    , '../../../assets/js/plugins/owl/owl.carousel.css']
})
export class RegisterJobComponent implements OnInit {
  myForm: FormGroup;
  email: FormControl;
  password: FormControl;
  fullname: FormControl;
  repeatpass: FormControl;
  iserrorRe: boolean;
  error = '';
  errorTitle="";

  constructor( private _fb: FormBuilder, private _authService: AuthenticationService,
    private _router: Router, ) { }

  ngOnInit() {

    this.iserrorRe = false;
    this.email = new FormControl('', [Validators.required, this.emailValidator]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.fullname = new FormControl('', [Validators.required]);
    this.repeatpass = new FormControl('', [Validators.required]);


    this.myForm = this._fb.group({
      email: this.email,
      password: this.password,
      fullname: this.fullname,
      repeatpass: this.repeatpass
    });
  }


  // submit the register form to the backend with the user's desired credentials
  onSubmit() {

    //  const nhatuyendung = new Nhatuyendung(this.myForm.value.fullname, this.myForm.value.password, this.myForm.email, this.myForm.sodienthoai, this.myForm.tencongty);
    const user = {
      fullname: this.myForm.value.fullname,
      password: this.myForm.value.password,
      email: this.myForm.value.email,
    }
    this._authService.signup_tv(user)
      .subscribe(
      data => {
         alert("Đăng Ký Thành Công")
        // after successfull registration, the user is redirected to the login page
        this._router.navigate(['/pages/login']);
      },
     error => {
         this.errorTitle=error.title;
        this.error = error.error.message;
      
      }

    );
  }
  // input validator to check if the email entered by the user is actually text in an email form
  emailValidator(control) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (!EMAIL_REGEXP.test(control.value)) {
      return { invalidEmail: true };
    }
  }
  checkpassValidator() {
    //  alert(this.myForm.value.password)
    // alert(this.myForm.value.repeatpass)
    if (this.myForm.value.password === this.myForm.value.repeatpass) {
      this.iserrorRe = true;

    } else {
      this.iserrorRe = false;
    }
  }

}
