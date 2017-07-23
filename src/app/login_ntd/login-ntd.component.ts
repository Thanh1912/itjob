import {
  Component,
  AfterViewInit,
  OnInit,
  ViewContainerRef,
  ElementRef
} from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../_services/user.model";
import { AuthenticationService } from "../_services/index";
import { animateFactory } from "../index";
declare var $: any;
@Component({
  selector: "app-login-ntd",
  templateUrl: "./login-ntd.component.html",
  styleUrls: ["./login-ntd.component.css"],
  animations: [animateFactory(1000, 100)]
})
export class LoginNtdComponent implements OnInit {
  model: any = {};
  loading = false;
  error = "";
  errorTitle = "";
  result;
  ngAfterContentInit() {
    $("div").removeClass("modal-backdrop");
  }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  ngOnInit() {
    // reset login status
    if (this.authenticationService.isLoggedInE()) {
      this.router.navigateByUrl("/pages_employee");
    }
  }
  close() {
    this.error = "";
  }
  gohome() {
    this.router.navigate(["/pages"]);
  }

  login() {
    this.loading = true;
    const user = new User(this.model.username, this.model.password);

    this.authenticationService.signin_ntd(user).subscribe(
      data => {
        // if the user credentials are correct, set the localStorage token and userId,
        // we need these info in order to do stuff later when the user is signed in and verified
        localStorage.setItem("id_token_ntd", data.token);
        localStorage.setItem("userId_ntd", data.userId);
        localStorage.setItem("username_ntd", data.fullname);
        localStorage.setItem("currentUserRole", data.role);
        location.reload();
        // navigate user to index page of our app
        this.router.navigate(["/pages_employee"]);
        // display toastr success message pop up to inform the user that he logged in successfully
      },
      error => {
        this.errorTitle = error.title;
        this.error = error.error.message;
        this.loading = false;
      }
    );
  }
}
