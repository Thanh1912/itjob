import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { JobcategoryService } from './../../services/jobcategory.service';
import { PagerService } from './../../_services/pager.service';
@Component({
  selector: 'app-catalog-job',
  templateUrl: './catalog-job.component.html',
  styleUrls: ['./catalog-job.component.css']
})
export class CatalogJobComponent implements OnInit {
  selectedItem: string;
  item_Workplace: any;
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  cats = [];
  isLoading = true;
  cat = {};
  edit_ = {};
  isEditing = false;
  addCatForm: FormGroup;
  name = new FormControl('', Validators.required);
  constructor(private http: Http,
    private dataService: JobcategoryService, 
    private formBuilder: FormBuilder, private pagerService: PagerService) { }
  ngOnInit() {
    this.getall();
    this.addCatForm = this.formBuilder.group({
      name: this.name,
      workplace: this.selectedItem
    });
  }


  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.cats.length, page);
    // get current page of items
    this.pagedItems = this.cats.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
 
  getall() {
    this.dataService.getall().subscribe(
      data => {
        this.cats = data
        this.setPage(1);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCat() {
    this.addCatForm.value.workplace = this.selectedItem;
    this.dataService.add(this.addCatForm.value).subscribe(
      res => {
        const newCat = res.json();
        this.pagedItems.push(newCat);
        //this.getall()
        // this.addCatForm.reset();
    
        // this.toast.setMessage('item added successfully.', 'success');
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
    this.getall();
  }
  editCat(cat) {
    this.edit_ = {
      _id: cat._id,
      name: cat.name,
    }
    this.dataService.edit(this.edit_).subscribe(
      res => {
        this.isEditing = false;
        this.getall()
    
        //   this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCat(cat) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dataService.delete(cat).subscribe(
        res => {
          const pos = this.cats.map(elem => { return elem._id; }).indexOf(cat._id);
          this.pagedItems.splice(pos, 1);
           // this.getall()
          // this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
