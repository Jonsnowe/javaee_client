import { Component, OnInit } from '@angular/core';
import { SachService } from '../services/sach.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { concat } from 'rxjs/operator/concat';
import{SanPham}from '../entities/sanpham.entities';

@Component({
  selector: 'sach-component',
  templateUrl: './sach.component.html',
  providers: [SachService],
})
export class SachComponent implements OnInit {
  public results: any[];
  public url: string;
  public matheloai: string;
  public subscription: Subscription;
  private oldmatheloai:string;
  public sachs:SanPham[];
  public search:string;
  public oldsearch:string;
  constructor(
    private route: ActivatedRoute,
    private sachservice: SachService,
    private router: Router,
  ) {

  }


  ngDoCheck(): void {
      
      if(this.oldmatheloai!==this.matheloai||this.oldsearch!==this.search){
        this.Xuly(this.results);
      }
    this.oldmatheloai=this.matheloai;
    this.oldsearch=this.search;
  }
  ngAfterViewInit(){
    console.log("ngAfterViewInit2")
  }

  ngOnInit(): void {
    this.url=this.sachservice.GetUrl()+"GetSACHImage/";
    this.sachservice.GetList().toPromise()
      .then((respone: SanPham[]) => {
        this.results = respone;
         //console.log(respone);
      }, error => {
        console.log(error);
      }).then(respone=> this.Xuly(this.results));
     // this.Xuly();
    console.log("ngOnInit")
  }

  public Xuly(a: SanPham[]): void {
   this.subscription = this.route.params.subscribe(params => {
      this.matheloai = params['id'];
      this.search=params['searchstring'];
    })
    if (this.matheloai == null||this.matheloai=="0") {
      this.sachs=a;
    }
    else {
     this.sachs=a.filter(s=>s.matheloai===this.matheloai);
       console.log(this.sachs);
    }
    if(this.search!=="null"&&this.search!==undefined){
      console.log(this.search)
     this.sachs=this.sachs.filter(s=>s.tensach.toLowerCase().includes(this.search.toLowerCase()));
   }
  }
}