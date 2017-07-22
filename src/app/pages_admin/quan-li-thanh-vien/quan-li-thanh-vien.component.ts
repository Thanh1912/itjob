import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { QuanliThanhvienquantriService } from "./../../services/quanli-thanhvienquantri.service";
import { Title } from "@angular/platform-browser";
@Component({
  selector: "app-quan-li-thanh-vien",
  templateUrl: "./quan-li-thanh-vien.component.html",
  styleUrls: ["./quan-li-thanh-vien.component.css"]
})
export class QuanLiThanhVienComponent implements OnInit {
  cats = [];
  isLoading = true;

  cat = {};
  isEditing = false;

  addCatForm: FormGroup;
  fullname = new FormControl("", Validators.required);
  email = new FormControl("", Validators.required);
  password = new FormControl("", Validators.required);
  createddate = new FormControl("", Validators.required);
  constructor(
    private http: Http,
    private dataService: QuanliThanhvienquantriService,
    private title: Title,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getall();
    this.title.setTitle("Manager Admin");
    this.addCatForm = this.formBuilder.group({
      fullname: this.fullname,
      email: this.email,
      password: this.password
    });
  }

  getall() {
    this.dataService.getall().subscribe(
      data => {
        this.cats = data;
      },
      error => console.log(error),
      () => (this.isLoading = false)
    );
  }

  addCat() {
    this.dataService.add(this.addCatForm.value).subscribe(
      res => {
        this.getall();
        // this.toast.setMessage('item added successfully.', 'success');
      },
      error => {
        alert("Loi Email da ton tai");
        console.log(error);
      }
    );
  }

  enableEditing(cat) {
    this.isEditing = true;
    this.cat = cat;
  }

  cancelEditing() {
    this.isEditing = false;
    this.cat = {};

    // this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getall();
  }

  editCat(cat) {
    this.dataService.edit(cat).subscribe(
      res => {
        this.isEditing = false;
        this.cat = cat;
        alert("item editing cancelled.");
        //   this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCat(cat) {
    if (
      window.confirm("Are you sure you want to permanently delete this item?")
    ) {
      this.dataService.delete(cat).subscribe(
        res => {
          const pos = this.cats
            .map(elem => {
              return elem._id;
            })
            .indexOf(cat._id);
          this.cats.splice(pos, 1);
          // this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }
}
