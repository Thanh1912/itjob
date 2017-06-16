import { Component, OnInit, HostBinding } from '@angular/core';
import { slideInDownAnimation } from '../../animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../../assets/css/bootstrap.css',
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
export class LoginComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';
  constructor() { }

  ngOnInit() {
  }

}
