import { Component } from '@angular/core';
import templateString from './users.html';
import { NgFlashMessageService } from "ng-flash-messages";
import { AppService } from '../app/app.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm_dialog/confirm_dialog.conponent';
import { MatDialog } from '@angular/material';

@Component({
  template: templateString,
  providers: [AppService]
})
export class UsersComponent {
  constructor(private ngFlashMessageService: NgFlashMessageService, private appService: AppService, public dialog: MatDialog) { }
  public datas: any;
  public sessions: any;
  config: any;
  search: any;
  limit: number = 5;
  params: any;
  pageNow: number;
  limited = [5, 10, 15, 20, 50, 100];

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
    this.pageNow = !this.config ? 1 : this.config.currentPage;
    this.params = {
      search: this.search || '',
      limit: this.limit,
      offset: this.pageNow == 1 ? 0 : (this.pageNow - 1) * this.limit
    }
    this.datas = {
      users: null
    }
    this.appService.getDataForTable('users', this.params).subscribe(
      resp => {
        this.datas = resp;
        this.config = {
          itemsPerPage: this.params.limit,
          currentPage: this.pageNow,
          totalItems: this.datas.total
        };
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

  pageChanged(event) {
    this.config.currentPage = event;
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