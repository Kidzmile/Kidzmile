import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { ServerResponse } from '../Core/Model/Common/server-response';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }

  getAllCategories()
  {
    console.log(environment.api+"/api/category/GetAsync/");
    return this._http.get<ServerResponse>(environment.api+"/api/category/GetAsync")
    .map(res=>{
    return res["Result"];
    })
    .catch(
      (error: Response) => {
        return Observable.throw(error);
      });
  }
}
