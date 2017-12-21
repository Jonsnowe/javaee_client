import { SanPham } from "./sanpham.entities";
import { Observable } from "rxjs/Observable";


export interface Item{
    sanpham: SanPham;
    soluong:number;
}