import { Component, OnInit } from '@angular/core';
import { SachService } from '../services/sach.service';
import { TheloaiService } from '../services/theloai.service'
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SanPham } from '../entities/sanpham.entities'
import { TheLoai } from '../entities/theloai.entities';
import { Observable } from 'rxjs/Observable';





@Component({
  selector: 'sach-detail-component',
  templateUrl: './sachdetail.component.html',
  providers: [SachService, TheloaiService],
})
export class SachDetailComponent implements OnInit {
  public masach: string;
  public subscription: Subscription;
  public detailsach: SanPham;
  public theloai: TheLoai;
  public url: string;



  // Inject HttpClient into your component or service.
  constructor(
    private route: ActivatedRoute,
    private sachservice: SachService,
    private router: Router,
    private theloaiservice: TheloaiService
  ) {
    this.theloai = {
      matheloai: "",
      tentheloai: "",
    };
    this.detailsach = {
      anhbia: "",
      dongiaban: 0,
      khuyenmai: 0,
      luotmua: 0,
      masach: "",
      matheloai: "",
      mota: "",
      tensach: "",
      tinhtrang: true
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params => {
      this.masach = params['id'];
      this.sachservice
        .GetItem(this.masach).toPromise()
        .then(a => {
          this.detailsach = a
          console.log(this.detailsach.matheloai)
        })
        .then(b => {
          this.theloaiservice
            .GetItem(this.detailsach.matheloai)
            .toPromise()
            .then(b => {
              this.theloai = b;
              console.log(this.theloai);
            });
        })
    })
    )
  }
}