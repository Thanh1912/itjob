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
  listjob: any;
  listskider: any;
  isLoading: boolean
  //====================================
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  Itemsall = [];
  listAll = [];

  //====================================
  ImageUrls: String;
  IconUrls: String;
  addForm: FormGroup;
  title = new FormControl('', Validators.required);
  namecompany = new FormControl('', Validators.required);

  SalaryC = new FormControl('', Validators.required);
  //    title = new FormControl('', Validators.required);


  constructor(private formBuilder: FormBuilder, private http: Http, private sliderService: sliderService, private Job: JobService, private pagerService: PagerService) { }
  ngOnInit() {
    this.getallJobslider();
    this.getslider()
    this.addForm = this.formBuilder.group({
      title: this.title,
      namecompany: this.namecompany,
      SalaryC: this.SalaryC
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
        this.listjob = data;
        console.log('show')
        console.log(data)
        this.setPage(1)
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  getslider() {
    this.sliderService.getall().subscribe(
      data => {
        this.listAll = data;
        console.log(this.listAll)
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
    this.pager = this.pagerService.getPager(this.Itemsall.length, page);

    // get current page of items
    this.pagedItems = this.Itemsall.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
