import { Component,ViewChild,AfterViewInit } from '@angular/core';
import {SachComponent } from'./sach/sach.component';

  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent   {


  title = 'app';
  public thanhtien:number=10000;
  public soluong:number=1;


  
  // ngAfterViewInit(){
  //  this.searchService.addSearch(this.search);
  // }

  // Search_(a:any){
  //   this.search=JSON.parse(a);
  //   this.searchService.addSearch(this.search);
  //   console.log(this.search);
  // }
}


