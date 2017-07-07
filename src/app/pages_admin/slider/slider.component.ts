import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { sliderService } from '../../services/slider.service';
import { JobService } from '../../services/job.service';
import { PagerService } from './../../_services/pager.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
declare var jQuery: any;
interface FileReaderEventTarget extends EventTarget {
  result: string
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  ngAfterViewInit() {
    //upload file image
    function readURL(input) {

      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (fre: FileReaderEvent) {
          //   var data = JSON.parse();
          jQuery('#blah').attr('src', fre.target.result);
          // alert(jQuery('#blah').height() + "size: " + jQuery('#blah').width());

        }
        reader.readAsDataURL(input.files[0]);
      }
    }
    jQuery("#imgInp").change(function () {
      readURL(this);
    });

  }
  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/api/uploadpostbaidang', itemAlias: 'file' });
  //====================================
  listJOB: any;
  listskider: any;
  isLoading: boolean
  //====================================
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];


    pagerJOB: any = {};
  // paged items
  pagedItemsJOB: any[];



  //====================================
  ImageUrls: String;
  IconUrls: String;
  addForm: FormGroup;
  title = new FormControl('', Validators.required);
  namecompany = new FormControl('', Validators.required);
  SalaryC = new FormControl('', Validators.required);
  Link = new FormControl('', Validators.required);
  descriptionwork = new FormControl('', Validators.required);

  constructor(private formBuilder: FormBuilder, private http: Http, private sliderService: sliderService, private Job: JobService, private pagerService: PagerService) { }
  ngOnInit() {
    this.getallJobslider();
    this.getslider()
    this.addForm = this.formBuilder.group({
      title: this.title,
      namecompany: this.namecompany,
      SalaryC: this.SalaryC,
      Link: this.Link,
      descriptionwork: this.descriptionwork
    });

    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    //overide the onComplceteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.ImageUrls = response;
      console.log(this.ImageUrls)
      console.log("ImageUpload: uploaded:", item, status, response);
    };

  }
  //=======
  getallJobslider() {
    this.Job.getall().subscribe(
      data => {
        this.listJOB = data;
        console.log('show')
        console.log(data)
        this.setPageJOB(1)
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  getslider() {
    this.sliderService.getall().subscribe(
      data => {

        this.listskider = data;
        this.setPage(1)
        console.log(data)
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  getByIdJob(idjob: String) {
    this.Job.getjobByID(idjob).subscribe(
      data => {
        console.log(data)
        this.title.setValue(data[0].title);
        this.namecompany.setValue(data[0].company[0].info_recruiter.namecompany);
        this.SalaryC.setValue(data[0].salarycompete);
        this.ImageUrls = data[0].postimage
        this.IconUrls = data[0].company[0].info_recruiter.logo;
        this.Link.setValue("http://localhost:4200/pages/home/detail-jobs/" + data[0]._id);
        this.descriptionwork.setValue(data[0].descriptionwork);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addSlider() {

    var inp = {
      Tilte: this.addForm.value.title,
      postid: '595da418e778d00da0555d03',
      company: this.addForm.value.namecompany,
      salary: this.addForm.value.SalaryC,
      image: this.ImageUrls,
      icon: this.IconUrls
    }
    console.log(inp)

    this.sliderService.add(inp).subscribe(
      res => {
        alert('thanh cong')

      },
      error => console.log(error)
    );
  }


  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.listskider.length, page);

    // get current page of items
    this.pagedItems = this.listskider.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
    setPageJOB(page: number) {
    if (page < 1 || page > this.pagerJOB.totalPages) {
      return;
    }
    // get pager object from service
    this.pagerJOB = this.pagerService.getPager(this.listJOB.length, page);

    // get current page of items
    this.pagedItemsJOB = this.listJOB.slice(this.pagerJOB.startIndex, this.pagerJOB.endIndex + 1);
  }
}
