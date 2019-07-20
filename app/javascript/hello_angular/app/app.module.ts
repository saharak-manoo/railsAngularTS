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

enableProdMode();

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'homes', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxDatatableModule,
    FormsModule,
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