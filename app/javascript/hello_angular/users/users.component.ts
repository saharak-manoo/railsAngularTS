import { Component } from '@angular/core';
import templateString from './users.html';
import { NgFlashMessageService } from "ng-flash-messages";
import { AppService } from '../app/app.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm_dialog/confirm_dialog.conponent';
import { MatDialog } from '@angular/material';
import { Page } from '../_model/page';
import { PagedData } from '../_model/paged_data';
import { User } from '../_model/user';

@Component({
  template: templateString,
  providers: [AppService]
})
export class UsersComponent {
  constructor(private ngFlashMessageService: NgFlashMessageService, private appService: AppService, public dialog: MatDialog) { this.page.page_now = 0; this.page.limit = 10; }
  public datas: any;
  public sessions: any;
  loading: boolean = false;
  page = new Page();
  rows = new Array<User>();

  ngOnInit() {
    this.checkSignIn();
    this.loadTable();
  }

  checkSignIn() {
    this.sessions = {
      signed_in: false
    }
    this.appService.all('users/check_sign_in').subscribe(
      resp => {
        this.sessions = resp;
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

  loadTable() {
    this.loading = true;
    this.appService.getDataForTable('users', this.page).subscribe(
      resp => {
        this.datas = resp;
        this.page = this.datas.page;
        this.rows = this.datas.users;
        this.loading = false;
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

  search(event) {
    this.page.search = event.target.value.toLowerCase();
    this.loadTable();
  }

  sort(event) {
    let sort = event.sorts[0]
    this.page.sort = sort.prop;
    this.page.order = sort.dir;
    this.loading = true;
    this.loadTable();
  }

  pageChanged(event) {
    this.page.page_now = event.offset
    this.loadTable();
  }

  removeUser(id) {
    const message = 'Are you sure you want to do this?';
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.appService.delete('users', id).subscribe(
          resp => {
            this.ngFlashMessageService.showFlashMessage({
              messages: ['Delete success.'],
              dismissible: true,
              timeout: 5000,
              type: 'success'
            });
            this.loadTable()
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
    });
  }
}