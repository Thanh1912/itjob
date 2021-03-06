import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ResumeService } from './../../services/resume.service';
import { PagerService } from './../../_services/pager.service';
import { ActivatedRoute } from '@angular/router';
import { SearchCvPipe }from '../Pipe/search-cv.pipe';
import { Title } from "@angular/platform-browser";   
@Component({
  selector: "app-applicant",
  templateUrl: "./applicant.component.html",
  styleUrls: ["./applicant.component.css"]
})
export class ApplicantComponent implements OnInit {
  isedit = false;
  // pager object
  pager: any = {};
  term: string;
  all = [];
  filterSelect: any;
  // paged items
  pagedItems: any[];
  selectaction: any;
  constructor(
    private route: ActivatedRoute,
    private resume: ResumeService,
    private formBuilder: FormBuilder,
    private pagerService: PagerService,
    private title: Title, 
  ) {}
  id: String;
  private sub: any;
  onchange(value: string) {
    this.term = value;
  }
  ngOnInit() {
    this.selectaction = "new";
    this.term = "";
  this.title.setTitle("Employee - Manager candidate of one job");
    // this.toast.setMessage('you successfully registered!', 'error','left');
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
      this.getall(this.id);
    });
  }
  edit() {
    this.isedit = true;
  }
  remove() {
    this.isedit = false;
  }
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.all.length, page);

    // get current page of items
    this.pagedItems = this.all.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }
  getall(id: String) {
    this.resume.getalljobapplyByidJOB(id).subscribe(
      data => {
        this.all = data;
        console.log(data);
        this.setPage(1);
      },
      error => console.log(error)
    );
  }
  onChange(value: String, id_: String) {
    // alert('selected: '+value);
    this.updateStatus(id_, value);
  }
  //cap nhat trang thai cho ung vien
  updateStatus(idCV: String, statusUpdate: String) {
    var updateI = {
      _id: idCV,
      status: statusUpdate,
      modifieddate: new Date()
    };
    this.resume.edit(updateI).subscribe(
      data => {
        alert("cap nhat thanh cong");
      },
      error => console.log(error)
    );
  }
}
