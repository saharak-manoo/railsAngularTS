import { Component, OnInit } from '@angular/core';
import templateString from './registrations.html';
import { NgFlashMessageService } from "ng-flash-messages";
import { AppService } from '../app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../_model/user';

@Component({
  template: templateString,
  providers: [AppService]
})
export class RegistrationsComponent {
  constructor(private ngFlashMessageService: NgFlashMessageService, private appService: AppService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }
  public datas: any;
  public user: any[];
  public sessions: any;
  signUpForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl = '/homes';

  get f() { return this.signUpForm.controls; }

  ngOnInit() {
    this.newUser();
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.minLength(6)],
      password_confirmation: ['', Validators.minLength(6)],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', Validators.required],
    }, { validator: this.checkPasswords });
  }

  newUser() {
    this.appService.get('users/sign_in').subscribe(
      resp => {
        this.user = resp;
      }, e => {
        this.ngFlashMessageService.showFlashMessage({
          messages: [e.message],
          dismissible: true,
          timeout: 5000,
          type: 'danger'
        });
      }
    );
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.password_confirmation.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }

    this.appService.create('users', { user: this.user }).subscribe(
      resp => {
        this.datas = resp
        if (this.datas.created) {
          this.router.navigate([this.returnUrl]);
          this.ngFlashMessageService.showFlashMessage({
            messages: ["Sign up and sign in success."],
            dismissible: true,
            timeout: 5000,
            type: "success"
          });
        }
      }, e => {
        this.ngFlashMessageService.showFlashMessage({
          messages: [e.message],
          dismissible: true,
          timeout: 5000,
          type: 'danger'
        });
      }
    )
  }
}