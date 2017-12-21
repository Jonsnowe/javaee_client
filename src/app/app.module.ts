import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './/app-routing.module'//route
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import{HeaderComponent}from './template/header.component'
import{FooterComponent}from './template/footer.component'
import{GiohangComponent}from './giohang/giohang.component'
import{TheLoaiSidebarComponent}from './theloai/theloai-sidebar.component'
import{SachComponent}from './sach/sach.component';
import{SachDetailComponent}from './sach/sachdetail.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GiohangComponent,
    TheLoaiSidebarComponent,
    SachComponent,
    SachDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
