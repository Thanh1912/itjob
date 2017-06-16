import { Component, OnInit } from '@angular/core';

import { PostService } from './../../services/post.service';

@Component({
  selector: 'app-danh-sach-bai-dang',
  templateUrl: './danh-sach-bai-dang.component.html',
  styleUrls: ['./danh-sach-bai-dang.component.css']
})
export class DanhSachBaiDangComponent implements OnInit {

  constructor(private PostService: PostService) { }
   list_post :any;
  ngOnInit() {
  this.getallpost (localStorage.getItem('userId_ntd'));
    // alert( localStorage.getItem('userId_ntd'));

  }
  delete(item){



  }

  getallpost(id) {

 this.PostService.getpost(id).subscribe(
      data => {
        this.list_post = data;
         console.log( this.list_post);
      },
      error => console.log(error),
      () => { }
    );
  }



}
