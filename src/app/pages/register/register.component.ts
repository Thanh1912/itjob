import {Component,ViewContainerRef, OnInit, Renderer, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { AuthenticationService } from "../../_services/authentication.service";
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../../../assets/css/bootstrap.css',
    '../../../assets/css/animate.css'
,'../../../assets/css/style.css'
,'../../../assets/js/plugins/fancybox/jquery.fancybox.css'
,'../../../assets/js/plugins/rsslider/settings.css'
,'../../../assets/js/plugins/rsslider/layers.css'
,'../../../assets/js/plugins/rsslider/navigation.css'
,'../../../assets/js/plugins/jquery-ui/jquery-ui.css'
,'../../../assets/js/plugins/bootstrap-slider/bootstrap-slider.css'
,'../../../assets/js/plugins/owl/owl.carousel.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _fb: FormBuilder, private _authService: AuthenticationService,
              private _router: Router) {
       

  }

  //=================Register   WORKs==================

 myForm: FormGroup;
  email: FormControl;
  password: FormControl;
   fullname: FormControl;

  @ViewChild('userEmail') userEmail: ElementRef;

   //=================Register  WORKs==================
  ngOnInit() {
 if (this._authService.isLoggedIn()) {
      this._router.navigateByUrl('/form');
    }
    this.email = new FormControl('', [Validators.required, this.emailValidator]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
     this.fullname = new FormControl('', [Validators.required, Validators.minLength(6)]);

    this.myForm = this._fb.group({
      email: this.email,
      password: this.password,
     fullname: this.fullname
    });
  }
   // submit the register form to the backend with the user's desired credentials
  onSubmit() {
    const user = {
     email: this.myForm.value.email, 
      password:this.myForm.value.password
    };
    this._authService.signup_tv(user)
      .subscribe(
        data => {
          // after successfull registration, the user is redirected to the login page
          this._router.navigate(['/login-tv']);
          // toastr message pops up to inform user that the registration was successfull
        //  this.toastr.success('Please Login', 'Registration Successfull');
        }
      );
  }
  // input validator to check if the email entered by the user is actually text in an email form
  emailValidator(control) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (!EMAIL_REGEXP.test(control.value)) {
      return {invalidEmail: true};
    }
  }



}
