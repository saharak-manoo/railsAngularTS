import { Component, TemplateRef } from '@angular/core';
import templateString from './users.html';
import { NgFlashMessageService } from "ng-flash-messages";
import { UsersService } from '../users/users.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  template: templateString,
  providers: [UsersService]
})
export class UsersComponent {
  constructor(private ngFlashMessageService: NgFlashMessageService, private usersService: UsersService) { }
  public datas: any;
  config: any;
  search: any;
  limit: number = 10;
  params: any;
  pageNow: number;
  limited = [5, 10, 15, 20, 50, 100];

  ngOnInit() {
    this.loadTable();
  }

  loadTable() {
    this.pageNow = !this.config ? 1 : this.config.currentPage;
    this.params = {
      search: this.search || '',
      limit: this.limit,
      offset: this.pageNow == 1 ? 0 : (this.pageNow - 1) * this.limit
    }
    this.usersService.getDataForTable(this.params).subscribe(
      resp => {
        this.datas = resp;
        this.config = {
          itemsPerPage: this.params.limit,
          currentPage: this.pageNow,
          totalItems: this.datas.total
        };
      }, e => {
        console.log(e);
      }
    )
  }

  pageChanged(event) {
    this.config.currentPage = event;
    this.loadTable();
  }

  removeUser(id) {
    var confirmation = confirm('are you sure you want to remove the item?');
    if (confirmation) {
      this.usersService.delete(id).subscribe(
        resp => {
          this.ngFlashMessageService.showFlashMessage({
            messages: ["Delete success."],
            dismissible: true,
            timeout: true,
            type: "success"
          });
          this.loadTable()
        }, e => {
          console.log(e);
        }
      );
    }
  }
}