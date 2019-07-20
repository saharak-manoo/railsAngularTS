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

enableProdMode();

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'homes', component: HomeComponent },
  { path: 'users', component: UsersComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxDatatableModule,
    NgxPaginationModule,
    FormsModule,
    NgFlashMessagesModule.forRoot(),
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