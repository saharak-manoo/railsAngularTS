import { Component } from "@angular/core";
import templateString from "./app.html";
import { NgFlashMessageService } from "ng-flash-messages";

@Component({
  selector: "hello-angular",
  template: templateString
})
export class AppComponent {
  constructor(private ngFlashMessageService: NgFlashMessageService) {}
  name = "Angular!";

  ngOnInit() {
    console.log(">>>>>");
    this.ngFlashMessageService.showFlashMessage({
      // Array of messages each will be displayed in new line
      messages: ["Yah! i'm alive"],
      // Whether the flash can be dismissed by the user defaults to false
      dismissible: true,
      // Time after which the flash disappears defaults to 2000ms
      timeout: false,
      // Type of flash message, it defaults to info and success, warning, danger types can also be used
      type: "danger"
    });
  }
}
