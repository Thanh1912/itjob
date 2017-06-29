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


 
   //=================Register  WORKs==================
  ngOnInit() {
    /*if (this._authService.isLoggedIn()) {
      this._router.navigateByUrl('/');
    }*/
   
  }
  



}
