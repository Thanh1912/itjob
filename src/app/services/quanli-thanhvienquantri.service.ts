
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class QuanliThanhvienquantriService {
public Rest_Url:String ='http://localhost:3000';
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getall(): Observable<any> {
    return this.http.get(this.Rest_Url+'/api/admin/getall_admin').map(res => res.json());
  }

  count(): Observable<any> {
    return this.http.get(this.Rest_Url+'/api/admin/count').map(res => res.json());
  }

  add(cat): Observable<any> {
    return this.http.post(this.Rest_Url+'/api/admin/register/', JSON.stringify(cat), this.options);
  }

  get(cat): Observable<any> {
    return this.http.get(this.Rest_Url+`/api/admin/${cat._id}`, this.options);
  }

  edit(cat): Observable<any> {
    return this.http.put(this.Rest_Url+`/api/admin/${cat._id}`, JSON.stringify(cat), this.options);
  }

  delete(cat): Observable<any> {
    return this.http.delete(this.Rest_Url+`/api/admin/${cat._id}`, this.options);
  }

}


