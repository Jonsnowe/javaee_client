import {Injectable} from '@angular/core';
import { Http,Response } from '@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { error } from 'util';
import{SanPham}from '../entities/sanpham.entities'
import { TheLoai } from '../entities/theloai.entities';



@Injectable()
export class SachService{
    private myUrl="http://localhost:27746/api/SACHes/";
    private sach: SanPham[];
    constructor(private http:Http){

    }
    
    GetUrl():string{
        return this.myUrl;
    }

    GetList(): Observable<SanPham[]>{
        return  this.http.get(this.myUrl+"GetSACHes")
      .map((respone:Response)=>respone.json(),error=>{console.log(error)})
    }
    

    GetItem(id:string):Observable<SanPham>{
        return  this.http.get(this.myUrl+"GetSACH/"+id)
        .map((respone:Response)=>respone.json());
    }
}