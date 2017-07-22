import { Component, OnInit, state } from "@angular/core";
import { Http } from "@angular/http";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { sliderService } from "../../services/slider.service";
import { JobService } from "../../services/job.service";
import { PostService } from "../../services/post.service";
import { PagerService } from "./../../_services/pager.service";
import { FileUploader } from "ng2-file-upload/ng2-file-upload";
import { ToastComponent } from "./../../pages/shared/toast/toast.component";
import { Title } from "@angular/platform-browser";  
declare var jQuery: any;
interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}
@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.css"]
})
export class SliderComponent implements OnInit {
  ngAfterViewInit() {
    //upload file image
    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(fre: FileReaderEvent) {
          //   var data = JSON.parse();
          jQuery("#blah").attr("src", fre.target.result);
          // alert(jQuery('#blah').height() + "size: " + jQuery('#blah').width());
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
    jQuery("#imgInp").change(function() {
      readURL(this);
    });
  }
  public uploader: FileUploader = new FileUploader({
    url: "http://localhost:3000/api/uploadpostbaidang",
    itemAlias: "file"
  });
  //====================================
  listJOB: any;
  listskider = [];
  isLoading: boolean;
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
  idjob: String;
  IconUrls: String;
  addForm: FormGroup;
  title = new FormControl("", Validators.required);
  namecompany = new FormControl("", Validators.required);
  SalaryC = new FormControl("", Validators.required);
  Link = new FormControl("", Validators.required);
  descriptionwork = new FormControl("", Validators.required);

  constructor(
    private post: PostService,
    private toast: ToastComponent,
    private job1: JobService,
    private formBuilder: FormBuilder,
    private http: Http,
    private sliderService: sliderService,
    private Job: JobService,
    private pagerService: PagerService,
     private _title: Title,  
  ) {}
  ngOnInit() {
     this._title.setTitle("Manager Slider");
    this.getallJobslider();
    this.getslider();
    this.setPageJOB(1);
    this.addForm = this.formBuilder.group({
      title: this.title,
      namecompany: this.namecompany,
      SalaryC: this.SalaryC,
      Link: this.Link,
      descriptionwork: this.descriptionwork
    });

    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };
    //overide the onComplceteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      if (status == 200) {
        this.ImageUrls = response;
      } else {
        this.ImageUrls = "";
          this.toast.setMessage(
            response,
            "error",
            "left"
          );
      }

      console.log(this.ImageUrls);
      console.log("ImageUpload: uploaded:", item, status, response);
    };
  }
  action_sort: any;
  key_search: String;
  count_all_job: number;
  list_Add_Job = [];
  //=======
  getallJobslider() {
    this.Job.getall().subscribe(
      data => {
        this.listJOB = data;
        this.setPageJOB(1);
      },
      error => console.log(error),
      () => (this.isLoading = false)
    );
  }
  onchangesearch() {
    this.setPageJOB(1);
  }
  setPageJOB(page: number) {
    var post = {};

    post = {
      title: this.key_search
    };

    console.log(post);

    this.job1.countsearchadminjob(post, 0, 10).subscribe(
      data => {
        this.count_all_job = data;

        if (page < 1 || page > this.pagerJOB.totalPages) {
          return;
        }
        var count = this.count_all_job;
        console.log(count);
        // get pager object from service
        this.pagerJOB = this.pagerService.getPager(count, page);
        this.job1
          .searchadminjob(
            post,
            this.pagerJOB.startIndex,
            this.pagerJOB.endIndex + 1
          )
          .subscribe(
            data => {
              this.list_Add_Job = data;
              console.log(data);
            },
            error => console.log(error),
            () => (this.isLoading = false)
          );
      },
      error => console.log(error),
      () => (this.isLoading = false)
    );
  }
  delete(cat) {
    if (
      window.confirm("Are you sure you want to permanently delete this item?")
    ) {
      this.sliderService.delete(cat).subscribe(
        res => {
          this.getslider();
          //  const pos = this.listskider.map(elem => { return elem._id; }).indexOf(cat._id);
          //   this.listskider.splice(pos, 1);

          this.toast.setMessage(
            "item deleted successfully.",
            "success",
            "left"
          );
        },
        error => console.log(error)
      );
    }
  }
  getslider() {
    this.sliderService.getall().subscribe(
      data => {
        this.listskider = data;
        this.setPage(1);
        console.log(data);
      },
      error => console.log(error),
      () => (this.isLoading = false)
    );
  }
  getByIdJob(idjob: String) {
    this.Job.getjobByID(idjob).subscribe(
      data => {
        console.log(data);
        this.title.setValue(data[0].title);
        this.namecompany.setValue(
          data[0].company[0].info_recruiter.namecompany
        );
        this.SalaryC.setValue(data[0].salarycompete);
        this.ImageUrls = data[0].postimage;
        this.IconUrls = data[0].company[0].info_recruiter.logo;
        this.idjob = data[0]._id;
        this.Link.setValue(
          "http://localhost:4200/pages/home/detail-jobs/" + data[0]._id
        );
        this.descriptionwork.setValue(data[0].descriptionwork);
      },
      error => console.log(error),
      () => (this.isLoading = false)
    );
  }
  addSlider() {
    var inp = {
      Tilte: this.addForm.value.title,
      postid: this.idjob,
      company: this.addForm.value.namecompany,
      salary: this.addForm.value.SalaryC,
      image: this.ImageUrls,
      icon: this.IconUrls,
      link: this.addForm.value.Link,
      descriptionwork: this.addForm.value.descriptionwork
    };
    console.log(inp);

    this.sliderService.add(inp).subscribe(
      res => {
        this.getslider();
        this.toast.setMessage(
          "item added Slider successfully.",
          "success",
          "left"
        );
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
    this.pagedItems = this.listskider.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }
}
