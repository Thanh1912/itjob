import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
    this.isupdateuser = false;
    this.ischangepass = false;

  }
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

}
