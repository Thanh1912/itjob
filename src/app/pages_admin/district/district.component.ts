import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DistrictService } from './../../services/district.service';
import { WorkplaceService } from './../../services/workplace.service';
import { PagerService } from './../../_services/pager.service';
import { ToastComponent } from './../../pages/shared/toast/toast.component'; 
  

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  selectedItem: string;
  id_w: string;
  c: any;
  item_Workplace: any;
  changeedit(newValue) {
    console.log(newValue);
    this.id_w = newValue;  // don't forget to update the model here
  }
  onChange(newValue) {
    console.log(newValue);
    this.selectedItem = newValue;  // don't forget to update the model here
  }
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

  constructor(private toast:ToastComponent,private http: Http,
    private dataService: DistrictService, private workplace: WorkplaceService,
    //    public toast: ToastComponent,
    private formBuilder: FormBuilder, private pagerService: PagerService) { }

  ngOnInit() {
    this.getall();
    //load select
    this.getall_Workplace();

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
  getall_Workplace() {
    this.workplace.getall().subscribe(
      data => {
        this.item_Workplace = data
      },
      error => console.log(error),
      () => this.isLoading = false
    );
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
    
    // this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getall();
  }
  editCat(cat) {
    this.edit_ = {
      _id: cat._id,
      name: cat.name,
      workplace: this.id_w
    }
    this.dataService.edit(this.edit_).subscribe(
      res => {
        this.isEditing = false;
        this.getall()
       
    this.toast.setMessage('item edited successfully.', 'success','left');

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
