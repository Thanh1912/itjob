import { Component, OnInit } from '@angular/core';
import { QuanliNtdService} from './../../services/quanli-ntd.service';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css','../../../assets/Back-end/bootstrap/css/bootstrap.min.css',
    '../../../assets/Back-end/dist/css/AdminLTE.css',
    '../../../assets/Back-end/dist/css/skins/skin-blue.min.css',
    '../../../assets/Back-end/plugins/ionslider/ion.rangeSlider.css',
    '../../../assets/Back-end/plugins/ionslider/ion.rangeSlider.skinNice.css']
})
export class AdminHomeComponent implements OnInit {
sothanhvien:string="0";
sonhatuyendung:string="0";
  constructor( private QuanliNtdService :QuanliNtdService ) { }
  ngOnInit() {
    this.QuanliNtdService.count().subscribe(
      data => this.sonhatuyendung = data,
      error => console.log(error)
    );

  }
  //nhiem vu
//+thong ke thanh vien hien co
//+thoong ke so nha tuyen dung hien co
//
}
