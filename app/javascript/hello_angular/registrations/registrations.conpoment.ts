import { Component, OnInit } from '@angular/core';
import templateString from './registrations.html';
import { NgFlashMessageService } from "ng-flash-messages";
import { AppService } from '../app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  template: templateString,
  providers: [AppService]
})
export class RegistrationsComponent {
  constructor(private ngFlashMessageService: NgFlashMessageService, private appService: AppService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }
  public datas: any;
  public sessions: any;
  signInForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl = '/homes';

  get f() { return this.signInForm.controls; }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signInForm.invalid) {
      return;
    }

    this.appService.create('users/sign_in', { user: { email: this.f.email.value, password: this.f.password.value } }).subscribe(
      resp => {
        if (resp) {
          this.router.navigate([this.returnUrl]);
          this.ngFlashMessageService.showFlashMessage({
            messages: ["Sign In success."],
            dismissible: true,
            timeout: 5000,
            type: "success"
          });
        }
      }, e => {
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Email or password worng."],
          dismissible: true,
          timeout: 5000,
          type: "danger"
        });
      }
    )
  }
}