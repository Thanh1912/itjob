import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CandidateService } from '../../services/candidate.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-detail-candidate',
  templateUrl: './detail-candidate.component.html',

  styleUrls: ['../../../assets/css/bootstrap.css', './detail-candidate.component.css',
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
export class DetailCandidateComponent implements OnInit {

  constructor(private _location: Location, private Candidate: CandidateService, private route: ActivatedRoute) { }
  id: any;
  sub: any;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getdetail(this.id);
      console.log(this.id)
    });

  }
  goback() {
    this._location.back();
  }
  listdetail: any
  getdetail(id) {
    this.Candidate.getdetailCandi(id).subscribe(
      data => {
        this.listdetail = data[0];
        console.log("======GET  console.log(data);=======");
        console.log(data);
      },
      error => console.log(error),
      () => {

      }
    );
  }
}
