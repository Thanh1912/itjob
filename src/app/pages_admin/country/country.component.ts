import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { countryService } from './../../services/country.service';
import { PagerService } from './../../_services/pager.service';
import { ToastComponent } from './../../pages/shared/toast/toast.component'; 
import { Title } from "@angular/platform-browser";   
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  cats = [];
  isLoading = true;
  cat = {};
  isEditing = false;

  addCatForm: FormGroup;
  name = new FormControl('', Validators.required);
  constructor(private toast:ToastComponent,private http: Http,
    private dataService: countryService,
    //    public toast: ToastComponent,
    private formBuilder: FormBuilder,
     private pagerService: PagerService,
     private title: Title,  
     ) { }

  ngOnInit() {
    this.getall();
 this.title.setTitle("Country Company");
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
    this.dataService.add(this.addCatForm.value).subscribe(
      res => {
        this.getall();
    this.toast.setMessage('item added successfully.', 'success','left');
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
    this.dataService.edit(cat).subscribe(
      res => {
        this.isEditing = false;
        this.cat = cat;

     this.toast.setMessage('item editted successfully.', 'success','left');
  
      },
      error => console.log(error)
    );
  }

  deleteCat(cat) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dataService.delete(cat).subscribe(
        res => {
          const pos = this.cats.map(elem => { return elem._id; }).indexOf(cat._id);
          this.cats.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success','left');
  
        },
        error => console.log(error)
      );
    }
  }

}
