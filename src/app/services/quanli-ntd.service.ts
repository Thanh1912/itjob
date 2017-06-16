import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Nhatuyendung } from '../_models/nhatuyendung';

import 'rxjs/add/operator/map';
@Injectable()
export class QuanliNtdService {
public Rest_Url:String ='http://localhost:3000';
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getall(): Observable<any> {
    return this.http.get(this.Rest_Url+'/api/nhatuyendung/getall').map(res => res.json());
  }
  loadtop10(): Observable<any> {
    return this.http.get(this.Rest_Url+'/api/nhatuyendungget/gettop10/').map(res => res.json());
  }

  count(): Observable<any> {
    return this.http.get(this.Rest_Url+'/api/nhatuyendung/count').map(res => res.json());
  }

  add(cat): Observable<any> {
    return this.http.post(this.Rest_Url+'/api/nhatuyendung/', JSON.stringify(cat), this.options);
  }


  getinfo(_id): Observable<any> {
    return this.http.get(this.Rest_Url+`/api/nhatuyendung/${_id}`, this.options);
  }
  get(cat): Observable<any> {
    return this.http.get(this.Rest_Url+`/api/nhatuyendung/${cat._id}`, this.options);
  }

  duyet(cat): Observable<any> {
    return this.http.put(this.Rest_Url+`/api/nhatuyendung/duyet/${cat._id}`, JSON.stringify(cat), this.options);
  }
   kduyet(cat): Observable<any> {
    return this.http.put(this.Rest_Url+`/api/nhatuyendung/kduyet/${cat._id}`, JSON.stringify(cat), this.options);
  }
  search(query): Observable<any> {
    var q={
     query :query
    }

    return this.http.post(this.Rest_Url+`/nhatuyendungsearchE/`, JSON.stringify(q), this.options);
  }


  edit(cat): Observable<any> {
    return this.http.put(this.Rest_Url+`/api/nhatuyendung/${cat._id}`, JSON.stringify(cat), this.options);
  }
  updatepro(cat,id): Observable<any> {
    return this.http.put(this.Rest_Url+`/api/updatenhatuyendung/${id}`, JSON.stringify(cat), this.options);
  }

  delete(cat): Observable<any> {
    return this.http.delete(this.Rest_Url+`/api/nhatuyendung/${cat._id}`, this.options);
  }

}




