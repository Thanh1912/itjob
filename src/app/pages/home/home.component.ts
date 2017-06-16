import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
    styleUrls:['../../../assets/css/bootstrap.css',
    '../../../assets/css/animate.css'
,'../../../assets/css/style.css'
,'../../../assets/js/plugins/fancybox/jquery.fancybox.css'
,'../../../assets/js/plugins/rsslider/settings.css'
,'../../../assets/js/plugins/rsslider/layers.css'
,'../../../assets/js/plugins/rsslider/navigation.css'
,'../../../assets/js/plugins/jquery-ui/jquery-ui.css'
,'../../../assets/js/plugins/bootstrap-slider/bootstrap-slider.css'
,'../../../assets/js/plugins/owl/owl.carousel.css','home.component.css'
    ]
})
export class HomeComponent implements OnInit {

   constructor(private title: Title) {

   }

  ngOnInit() {
    this.title.setTitle('Trang chủ Itjob');
     // title.getTitle();
    // title.setTitle('new title');
  }

}
