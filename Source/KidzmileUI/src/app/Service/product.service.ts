import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ServerResponse } from '../Core/Model/Common/server-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  code: "";
  constructor(private _http: HttpClient) { }
  getAllProducts() {
    return this._http.get<ServerResponse>(environment.api + "/api/product/GetAsync")
      .map(res => {
        return res["Result"];
      })
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        });
  }

  getProductBySkucode(code: string) {
    return this._http.get<ServerResponse>(environment.api + "/api/product/GetAsync/", { params: { "code": code } })
      .map(res => {
        return res["Result"] as Product;
      })
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        });
  }


  getImagesBySkuCode(code: string) {
    return this._http.get<ServerResponse>(environment.api + "/api/category/Images/GetAsync/code?code=" + code)
      .map(res => {
        return res["Result"];
      })
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        });
  }
}
