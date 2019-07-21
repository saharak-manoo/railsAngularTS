import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { UsersComponent } from '../users/users.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SignInComponent } from '../sign_in/sign_in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

enableProdMode();

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'homes', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'sign_in', component: SignInComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxDatatableModule,
    NgxPaginationModule,
    FormsModule,
    NgFlashMessagesModule.forRoot(),
    TooltipModule.forRoot(),
    ReactiveFormsModule,
    MatMenuModule,
    MatDatepickerModule,
    MatFormFieldModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }
    )
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }