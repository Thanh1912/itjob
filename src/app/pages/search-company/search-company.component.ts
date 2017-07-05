import { Component, OnInit } from '@angular/core';
import { PagerService } from './../../_services/pager.service';
import { CompanyService } from '../../services/company.service';
import { SearchCompanyPipe } from './../search-company.pipe';
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
   // pager object
  pager: any = {};
  term:String;
setvalue(value:string){
  this.term=value;
}
  // paged items
  pagedItems: any[];

  constructor(private company: CompanyService,
   private pagerService: PagerService) { }
  listcompany: any;
    all=[];
  isLoading: Boolean;
  ngOnInit() {
    this.term=""
      this.getall();
  }
  getall() {
    this.company.getall().subscribe(
      data => {
        this.all = data;
        console.log(data)
         this.setPage(1);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }
   setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.all.length, page);

    // get current page of items
    this.pagedItems = this.all.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
