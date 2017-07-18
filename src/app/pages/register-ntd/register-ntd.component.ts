import { Component, OnInit, Renderer, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from "../../_services/authentication.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-ntd',
  templateUrl: './register-ntd.component.html',
  styleUrls: ['./register-ntd.component.css']
})
export class RegisterNtdComponent implements OnInit {
  myForm: FormGroup;
  email: FormControl;
  password: FormControl;
  fullname: FormControl;
  phone: FormControl;
  namecompany: FormControl;


  @ViewChild('userEmail') userEmail: ElementRef;
  constructor(private _fb: FormBuilder, private router: Router, private _authService: AuthenticationService,
    private _router: Router, private renderer: Renderer) {
  }
  ngOnInit() {
    // if the user tries to hit the register page, first we check if he is logged in or not, if he is then we redirect him to the form page
   /* if (this._authService.isLoggedIn()) {
      this._router.navigateByUrl('/form');
    }*/
    this.email = new FormControl('', [Validators.required, this.emailValidator]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.fullname = new FormControl('', [Validators.required]);
    this.phone = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.namecompany = new FormControl('', [Validators.required]);

    this.myForm = this._fb.group({
      email: this.email,
      password: this.password,
      fullname: this.fullname,
      namecompany: this.namecompany,
      phone: this.phone
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.invokeElementMethod(this.userEmail.nativeElement, 'focus', []);
    }, 50);
  }

  // submit the register form to the backend with the user's desired credentials
  onSubmit() {
    //  const nhatuyendung = new Nhatuyendung(this.myForm.value.fullname, this.myForm.value.password, this.myForm.email, this.myForm.sodienthoai, this.myForm.tencongty);
    const user = {
      fullname: this.myForm.value.fullname,
      password: this.myForm.value.password,
      email: this.myForm.value.email,
      namecompany: this.myForm.value.namecompany,
      phone: this.myForm.value.phone
    }

    this._authService.signup_ntd(user)
      .subscribe(
      data => {
        // after successfull registration, the user is redirected to the login page
        this._router.navigate(['/ntd/login-ntd']);
      }
      );
  }
  gologin() {
    this.router.navigate(['/ntd/login-ntd']);
  }
  // input validator to check if the email entered by the user is actually text in an email form
  emailValidator(control) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (!EMAIL_REGEXP.test(control.value)) {
      return { invalidEmail: true };
    }
  }
}
