import { Component } from '@angular/core';
import { TheloaiService } from '../services/theloai.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-theloai-sidebar',
  templateUrl: './theloai-sidebar.component.html',
  providers: [TheloaiService],
})
export class TheLoaiSidebarComponent {
  // theloais: any[] = [
  //   {
  //     matheloai: 1, tentheloai: "Thể loại 1"
  //   },
  //   {
  //     matheloai: 2, tentheloai: "Thể loại 2"
  //   },
  //   {
  //     matheloai: 3, tentheloai: "Thể loại 3"
  //   },
  //   {
  //     matheloai: 4, tentheloai: "Thể loại 4"
  //   },
  //   {
  //     matheloai: 5, tentheloai: "Thể loại 5"
  //   },
  // ]

  public theloais: any[];
  // Inject HttpClient into your component or service.
  constructor(private theloai: TheloaiService,private _router: Router) { }

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

  click(a:string){
    this._router.navigate(['/sach',{id:a}]);
  }
}
