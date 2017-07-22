import { Component, OnInit } from "@angular/core";

import { PostService } from "./../../services/post.service";
import { Title } from "@angular/platform-browser";
@Component({
  selector: "app-danh-sach-bai-dang",
  templateUrl: "./danh-sach-bai-dang.component.html",
  styleUrls: ["./danh-sach-bai-dang.component.css"]
})
export class DanhSachBaiDangComponent implements OnInit {
  constructor(private PostService: PostService, private title: Title) {}
  list_post: any;
  ngOnInit() {
    this.getallpost(localStorage.getItem("userId_ntd"));
    this.title.setTitle("List Job");
  }
  delete(item: any) {
    if (
      window.confirm("Are you sure you want to permanently delete this item?")
    ) {
      this.PostService.delete(item).subscribe(
        res => {
          const pos = this.list_post
            .map(elem => {
              return elem._id;
            })
            .indexOf(item._id);
          this.list_post.splice(pos, 1);
          // this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

  getallpost(id) {
    this.PostService.getpost(id).subscribe(
      data => {
        this.list_post = data;
        console.log(this.list_post);
      },
      error => console.log(error),
      () => {}
    );
  }
}
