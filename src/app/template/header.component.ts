import { Component} from '@angular/core';
import { TheloaiService } from '../services/theloai.service';
import { TheLoai } from '../entities/theloai.entities';
import{SachComponent}from '../sach/sach.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [TheloaiService],
})
export class HeaderComponent {

  public theloais: TheLoai[];
  searchString: string;
  searchTheloai: string = "0";

  constructor(private _router: Router,private theloai:TheloaiService){}

  ngOnInit(): void {
    // Make the HTTP request:
    this.theloai.GetList()
      .subscribe((respone: any[]) => {
        this.theloais = respone;
        console.log(respone);
      }, error => {
        console.log(error);
      });
  }


  Search_(): void {
    this._router.navigate(['/sach',{id:this.searchTheloai,searchstring:this.searchString||null}]);
  }
}