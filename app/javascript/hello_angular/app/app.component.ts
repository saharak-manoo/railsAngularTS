import { Component } from "@angular/core";
import templateString from "./app.html";
import { NgFlashMessageService } from "ng-flash-messages";
import { CheckSignInService } from '../sessions/check_sign_in.service';
import { SignOutService } from '../sessions/sign_out.service';

@Component({
  selector: "hello-angular",
  template: templateString,
  providers: [CheckSignInService, SignOutService]
})
export class AppComponent {
  constructor(private ngFlashMessageService: NgFlashMessageService, private checkSignInService: CheckSignInService, private signOutService: SignOutService) { }
  public sessions: any;

  ngOnInit() {
    this.checkSignIn();
  }

  checkSignIn() {
    this.checkSignInService.all().subscribe(
      resp => {
        console.log(resp)
        this.sessions = resp;
      }, e => {
        console.log(e);
      }
    )
  }

  signOut(id) {
    var confirmation = confirm('Are you sure ?');
    if (confirmation) {
      this.signOutService.delete(id).subscribe(
        resp => {
          this.ngFlashMessageService.showFlashMessage({
            messages: ["Sign Out success."],
            dismissible: true,
            timeout: true,
            type: "success"
          });
        }, e => {
          console.log(e);
        }
      );
    }
  }
}
