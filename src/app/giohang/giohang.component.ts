import { Component, OnInit } from '@angular/core';
import { Item } from '../entities/item.entites';
import { SachService } from '../services/sach.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Promise } from 'q';
import { Response } from '@angular/http/src/static_response';
import { SanPham } from '../entities/sanpham.entities';



@Component({
  selector: 'app-giohang-sidebar',
  templateUrl: './giohang.component.html',
  providers: [SachService]
})
export class GiohangComponent implements OnInit {
  private tongtien: number;
  private items: Item[] = [];
  private url:String;
  constructor(
    private sachservice: SachService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.url=this.sachservice.GetUrl()+'GetSACHImage/';
    this.route.params.subscribe(params => {
      var id = params['id'];
      if (id) {
        this.sachservice.GetItem(id).toPromise().then(s => {
          var item: Item = {
            sanpham: s,
            soluong: 1,
          };
          if (localStorage.getItem('giohang') === null) {//nếu chưa có item trong giỏ hàng
            let cart: any = [];
            cart.push(JSON.stringify(item));
            localStorage.setItem('giohang', JSON.stringify(cart));
          } else {
            let cart: any = JSON.parse(localStorage.getItem('giohang'));
            let index: number = -1;
            for (var i = 0; i < cart.length; i++) {
              let item: Item = JSON.parse(cart[i]);
              if (item.sanpham.masach === id) {
                index = i;
                break;
              }
            }
            if (index == -1) {
              cart.push(JSON.stringify(item));
              localStorage.setItem('giohang', JSON.stringify(cart));
            } else {
              let item: Item = JSON.parse(cart[index]);
              item.soluong += 1;
              cart[index] = JSON.stringify(item);
              localStorage.setItem("giohang", JSON.stringify(cart));
            }
          }
        }).then(a => {
          console.log(this.items);
          this.loadGiohang();
        })
      } else {
        this.loadGiohang();
      }
    });

  }

  loadGiohang(): void {
    this.tongtien = 0;
    this.items = [];
    let cart = JSON.parse(localStorage.getItem('giohang'));
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
        sanpham: item.sanpham,
        soluong: item.soluong
      })
      this.tongtien += item.sanpham.dongiaban * item.soluong;
    }
    console.log(this.items)
  }

  xoaGiohang(a: Item) {
    let cart: any = JSON.parse(localStorage.getItem('giohang'));
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      if (item.sanpham.masach == a.sanpham.masach) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('giohang', JSON.stringify(cart))
    this.loadGiohang();
  }

  giamGiohang(a: Item) {
    if (a.soluong > 1) {
      let cart: any = JSON.parse(localStorage.getItem('giohang'));
      let index: number = -1;
      for (var i = 0; i < cart.length; i++) {
        let item = JSON.parse(cart[i]);
        if (item.sanpham.masach == a.sanpham.masach) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        let item: Item = JSON.parse(cart[index]);
        item.soluong -= 1;
        cart[index] = JSON.stringify(item);
        localStorage.setItem('giohang', JSON.stringify(cart))
        this.loadGiohang();
      }
    }
  }

  themGiohang(a: Item) {
    let cart: any = JSON.parse(localStorage.getItem('giohang'));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      if (item.sanpham.masach == a.sanpham.masach) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      let item: Item = JSON.parse(cart[index]);
      item.soluong += 1;
      cart[index] = JSON.stringify(item);
      localStorage.setItem('giohang', JSON.stringify(cart))
      this.loadGiohang();
    }
  }

  onChangeGiohang(a: Item,event:any) {
    console.log(event.target.value)
    if (event.target.value > 0) {
      let cart: any = JSON.parse(localStorage.getItem('giohang'));
      let index: number = -1;
      for (var i = 0; i < cart.length; i++) {
        let item = JSON.parse(cart[i]);
        if (item.sanpham.masach == a.sanpham.masach) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        let item: Item = JSON.parse(cart[index]);
        item.soluong =Number.parseInt(event.target.value);
        cart[index] = JSON.stringify(item);
        localStorage.setItem('giohang', JSON.stringify(cart))
      }
      this.loadGiohang();
    }else{
      this.loadGiohang();
    }
  }
}
