import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { QuanliNtdService } from './../../services/quanli-ntd.service';
import { ToastComponent } from './../../shared/toast/toast.component';
import { Nhatuyendung } from './../../_models/nhatuyendung';
import { PagerService } from './../../_services/pager.service';
import { CompanysizeService } from './../../services/companysize.service';
import { countryService } from './../../services/country.service';
import { DuyetntdPipe } from '../../Pipes/duyetntd.pipe';
@Component({
  selector: 'app-duyet-nha-tuyen-dung',
  templateUrl: './duyet-nha-tuyen-dung.component.html',
  styleUrls: ['./duyet-nha-tuyen-dung.component.css']
})
export class DuyetNhaTuyenDungComponent implements OnInit {
  //===Search====
  term: String;
  action: String;
  //===Search====
  set_term(value) {
    this.term = value;
    if (value === "") {
      this.getCats();
    }
  }
  changeaction(value) {
    this.action = value;
    alert(this.action)
  }
  private allItems: any[];
  query: string = "";

  // pager object
  pager: any = {};
  companysize: any;
  country: any;
  // paged items
  pagedItems: any[];
  cats = [];
  isLoading = true;

  cat = {};
  isEditing = false;

  addCatForm: FormGroup;
  fullname = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  createddate = new FormControl('', Validators.required);
  namecompany = new FormControl('', Validators.required);
  facebook = new FormControl('', Validators.required);
  website = new FormControl('', Validators.required);
  phone = new FormControl('', Validators.required);
  introduction = new FormControl('', Validators.required);
  logo = new FormControl('', Validators.required);
  profileimage = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  active = new FormControl('', Validators.required);
  companysizeid = new FormControl('', Validators.required);
  countryid = new FormControl('', Validators.required);
  constructor(private http: Http,
    private dataService: QuanliNtdService,
    public toast: ToastComponent,
    private formBuilder: FormBuilder, private countryService: countryService, private CompanysizeService: CompanysizeService, private pagerService: PagerService) { }

  ngOnInit() {
    this.term = "";
    this.action = "all";
    this.getCats();
    this.getcountry();
    this.getcompany();
    this.addCatForm = this.formBuilder.group({
      fullname: this.fullname,
      email: this.email,
      password: this.password,
      info_recruiter: {
        namecompany: this.namecompany,
        website: this.website,
        facebook: this.facebook,
        phone: this.phone,
        introduction: this.introduction,
        logo: this.logo,
        profileimage: this.profileimage,
        address: this.address,
        active: this.active,
        companysizeid: this.companysizeid,
        countryid: this.countryid
      }
    });
  }

  getCats() {
    this.dataService.getall().subscribe(
      data => {
        // set items to json response
        this.allItems = data;
        console.log(data)
        this.cats = data
        // initialize to page 1
        this.setPage(1);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }


  getcompany() {
    this.CompanysizeService.getall().subscribe(
      data => {
        this.companysize = data

      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getcountry() {
    this.countryService.getall().subscribe(
      data => {
        this.country = data
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }


    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  addCat() {
    this.dataService.add(this.addCatForm.value).subscribe(
      res => {
        this.getCats();
        // this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(cat) {
    this.isEditing = true;
    this.cat = cat;
    console.log(cat);
  }

  cancelEditing() {
    this.isEditing = false;
    this.cat = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getCats();
  }

  editCat(cat) {
    this.dataService.edit(cat).subscribe(
      res => {
        this.isEditing = false;
        this.cat = cat;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }
  duyet(cat) {
    cat = this.cat
    console.log(this.cat);
    this.dataService.duyet(this.cat).subscribe(
      res => {
        this.isEditing = false;
        this.cat = cat;
        this.getCats();
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }
  khongduyet(cat) {
    cat = this.cat
    this.dataService.kduyet(this.cat).subscribe(
      res => {
        this.isEditing = false;
        this.cat = cat;
        this.getCats();
        this.toast.setMessage('item edited successfully.', 'success');
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
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
