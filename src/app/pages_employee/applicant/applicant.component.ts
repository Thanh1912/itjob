import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ResumeService } from './../../services/resume.service';
import { PagerService } from './../../_services/pager.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {
  isedit = false;
  // pager object
  pager: any = {};
  all = []
  // paged items
  pagedItems: any[];

  constructor(private route: ActivatedRoute, private resume: ResumeService, private formBuilder: FormBuilder, private pagerService: PagerService) { }
  id: String;
  private sub: any;
  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getall(this.id)

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
    this.pagedItems = this.all.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  getall(id: String) {
    this.resume.getalljobapplyByidJOB(id).subscribe(
      data => {
        this.all = data;
        this.setPage(1);
      },
      error => console.log(error),

    );
  }
}
