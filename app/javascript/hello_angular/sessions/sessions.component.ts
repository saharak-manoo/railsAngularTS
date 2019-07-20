import { Component } from '@angular/core';
import templateString from './sessions.html';
import { NgFlashMessageService } from "ng-flash-messages";
import { SignInService } from '../sessions/sign_in.service';

@Component({
  template: templateString,
  providers: [SignInService]
})
export class SessionsComponent {
  constructor(private ngFlashMessageService: NgFlashMessageService, private signInService: SignInService) { }
  public datas: any;

  onSubmit(params) {
    this.signInService.create({ user: params }).subscribe(
      resp => {
        console.log(resp)
        this.datas = resp;
      }, e => {
        console.log(e);
      }
    )
  }
}