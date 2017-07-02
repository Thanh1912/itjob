import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { KeywordService } from './../../services/keyword.service';
import { PagerService } from './../../_services/pager.service';
import { JobcategoryService } from './../../services/jobcategory.service';

@Component({
  selector: 'app-quan-li-nganh-nghe',
  templateUrl: './quan-li-nganh-nghe.component.html',
  styleUrls: ['./quan-li-nganh-nghe.component.css']
})
export class QuanLiNganhNgheComponent implements OnInit {

  // pager object
  pager: any = {};
selectedItem: any
  // paged items
  pagedItems: any[];
  Listjobcat: any[];

  cats = [];
  isLoading = true;
  cat = {};
  isEditing = false;
  changeId :any;
  addCatForm: FormGroup;
  name = new FormControl('', Validators.required);
  _idCategory = new FormControl('', Validators.required);
  constructor(private http: Http,
    private dataService: KeywordService,
    private Jobcategory: JobcategoryService,
    private formBuilder: FormBuilder, private pagerService: PagerService) { }

  ngOnInit() {
    this.getall();
    this.getjobcategory();
    this.addCatForm = this.formBuilder.group({
      name: this.name,
      _idCategory: this._idCategory
    });
  }
  changeEdit(value:any){
    this.changeId=value;
  }
 onChange(newValue) {
    console.log(newValue);
    this.selectedItem = newValue;  // don't forget to update the model here
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
  getjobcategory() {
    this.Jobcategory.getall().subscribe(
      data => {
        this.Listjobcat = data
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  addCat() {
    this.addCatForm.controls['_idCategory'].setValue( this.selectedItem);
    console.log(this.addCatForm.value)
    this.dataService.add(this.addCatForm.value).subscribe(
      res => {
        this.getall();
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
       this.addCatForm.controls['_idCategory'].setValue( this.changeId);
    this.dataService.edit(cat).subscribe(
      res => {
        this.isEditing = false;
        this.cat = cat;
      
      },
      error => console.log(error)
    );
  }

  deleteCat(cat) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dataService.delete(cat).subscribe(
        res => {
          const pos = this.pagedItems.map(elem => { return elem._id; }).indexOf(cat._id);
          this.pagedItems.splice(pos, 1);
          // this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
