import { Component, OnInit } from '@angular/core';

import { CompanyService } from '../../services/company.service';
@Component({
  selector: 'app-search-company',
  templateUrl: './search-company.component.html',

  styleUrls: ['../../../assets/css/bootstrap.css', './search-company.component.css',
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
export class SearchCompanyComponent implements OnInit {

  constructor(private company: CompanyService) { }
  listcompany: any;
  isLoading: Boolean;
  ngOnInit() {
      this.getall();
  }
  getall() {
    this.company.getall().subscribe(
      data => {
        this.listcompany = data;
        console.log(data)
        //  this.setPage(1);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

}
