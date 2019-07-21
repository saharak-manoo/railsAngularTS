import { Component } from "@angular/core";
import templateString from "./app.html";
import { NgFlashMessageService } from "ng-flash-messages";
import { AppService } from '../app/app.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "hello-angular",
  template: templateString,
  providers: [AppService]
})
export class AppComponent {
  constructor(private ngFlashMessageService: NgFlashMessageService, private appService: AppService, private route: ActivatedRoute, private router: Router) { }
  public sessions: {};
  activeTab: string;

  ngOnInit() {
    this.sessions = {
      signed_in: false
    }
    this.router.events.subscribe(
      (event) => {
        if (event) {
          this.activeTab = 'homes';
          this.checkSignIn();
        }
      });
  }

  checkSignIn() {
    this.appService.all('users/check_sign_in').subscribe(
      resp => {
        this.sessions = resp;
      }, e => {
        console.log(e);
      }
    )
  }

  signOut() {
    var confirmation = confirm('Are you sure ?');
    if (confirmation) {
      this.appService.signOut('users/sign_out').subscribe(
        resp => {
          if (resp) {
            this.ngFlashMessageService.showFlashMessage({
              messages: ["Sign Out success."],
              dismissible: true,
              timeout: 5000,
              type: "success"
            });
          }
          this.checkSignIn();
          this.router.navigate(['homes']);
        }, e => {
          console.log(e);
        }
      );
    }
  }

  activeNavTab(tab) {
    this.activeTab = tab;
  }
}
