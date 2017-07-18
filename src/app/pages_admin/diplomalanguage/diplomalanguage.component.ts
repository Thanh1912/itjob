import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DistrictService } from './../../services/district.service';
import { DiplomalanguageService } from './../../services/diplomalanguage.service';
import { PagerService } from './../../_services/pager.service';
  import { ToastComponent } from './../../pages/shared/toast/toast.component'; 
  

@Component({
  selector: 'app-diplomalanguage',
  templateUrl: './diplomalanguage.component.html',
  styleUrls: ['./diplomalanguage.component.css']
})
export class DiplomalanguageComponent implements OnInit {



  pager: any = {};

  // paged items
  pagedItems: any[];


  All_Items = [];
  isLoading = true;
  cat = {};
  isEditing = false;

  addCatForm: FormGroup;
  name = new FormControl('', Validators.required);
  constructor(private toast:ToastComponent,private http: Http,
    private dataService: DiplomalanguageService,
    //    public toast: ToastComponent,
    private formBuilder: FormBuilder, private pagerService: PagerService) { }

  ngOnInit() {
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
    this.pager = this.pagerService.getPager(this.All_Items.length, page);

    // get current page of items
    this.pagedItems = this.All_Items.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  getall() {
    this.dataService.getall().subscribe(
      data => {
        this.All_Items = data
        this.setPage(1);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCat() {
    this.dataService.add(this.addCatForm.value).subscribe(
      res => {
          this.setPage(1);
         this.toast.setMessage('item added successfully', 'success','left');
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
          this.toast.setMessage('item edited successfully', 'success','left');
        //   this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCat(cat) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dataService.delete(cat).subscribe(
        res => {
          const pos = this.All_Items.map(elem => { return elem._id; }).indexOf(cat._id);
          this.All_Items.splice(pos, 1);
           this.toast.setMessage('item deleted successfully', 'success','left');
        },
        error => console.log(error)
      );
    }
  }

}
