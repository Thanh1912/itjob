import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

import { WorkplaceService } from "./../../services/workplace.service";
import { PagerService } from "./../../_services/pager.service";
import { ToastComponent } from "./../../pages/shared/toast/toast.component";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-workplace",
  templateUrl: "./workplace.component.html",
  styleUrls: ["./workplace.component.css"]
})
export class WorkplaceComponent implements OnInit {
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  cats = [];
  isLoading = true;
  cat = {};
  isEditing = false;

  addCatForm: FormGroup;
  name = new FormControl("", Validators.required);
  constructor(
    private toast: ToastComponent,
    private http: Http,
    private dataService: WorkplaceService,
    private formBuilder: FormBuilder,
    private pagerService: PagerService,
    private title: Title
  ) {}

  ngOnInit() {
     this.title.setTitle("Workplace");
    this.getall();
    this.addCatForm = this.formBuilder.group({
      name: this.name
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.cats.length, page);

    // get current page of items
    this.pagedItems = this.cats.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }
  getall() {
    this.dataService.getall().subscribe(
      data => {
        this.cats = data;
        this.setPage(1);
      },
      error => console.log(error),
      () => (this.isLoading = false)
    );
  }

  addCat() {
    this.dataService.add(this.addCatForm.value).subscribe(
      res => {
        this.setPage(1);
        this.isadd = false;
        this.toast.setMessage("item added successfully.", "success", "left");
      },
      error => console.log(error)
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
  isadd = false;
  setadd() {
    if (this.isadd == true) {
      this.isadd = false;
    } else {
      this.isadd = true;
    }
  }
  editCat(cat) {
    this.dataService.edit(cat).subscribe(
      res => {
        this.isEditing = false;
        this.cat = cat;

        this.toast.setMessage("item edited successfully.", "success", "left");
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
          const pos = this.pagedItems
            .map(elem => {
              return elem._id;
            })
            .indexOf(cat._id);
          this.pagedItems.splice(pos, 1);
          this.toast.setMessage(
            "item deleted successfully.",
            "success",
            "left"
          );
        },
        error => console.log(error)
      );
    }
  }
}
