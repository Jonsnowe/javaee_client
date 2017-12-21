import {Injectable} from '@angular/core';
import { Http,Response } from '@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import{TheLoai} from '../entities/theloai.entities'

@Injectable()
export class TheloaiService{
    private myUrl="http://localhost:27746/api/THELOAIs/";

    constructor(private http:Http){

    }
    
    GetUrl():string{
        return this.myUrl;
    }

    GetList(): Observable<TheLoai[]>{
        return  this.http.get(this.myUrl+"GetTHELOAIs")
      .map((respone:Response)=>respone.json(),error=>{console.log(error)})
    }

    GetItem(id:string): Observable<TheLoai>{
        return this.http.get(this.myUrl+"GetTHELOAI/"+id)
        .map((respone:Response)=>respone.json(),error=>{console.log(error)})
    }

}