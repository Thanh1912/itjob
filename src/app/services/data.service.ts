import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
public Rest_Url:String ='http://localhost:3000';
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getCats(): Observable<any> {
    return this.http.get(this.Rest_Url+'/api/cats').map(res => res.json());
  }

  countCats(): Observable<any> {
    return this.http.get(this.Rest_Url+'/api/cats/count').map(res => res.json());
  }

  addCat(cat): Observable<any> {
    return this.http.post(this.Rest_Url+'/api/cat', JSON.stringify(cat), this.options);
  }

  getCat(cat): Observable<any> {
    return this.http.get(this.Rest_Url+`/api/cat/${cat._id}`, this.options);
  }

  editCat(cat): Observable<any> {
    return this.http.put(this.Rest_Url+`/api/cat/${cat._id}`, JSON.stringify(cat), this.options);
  }

  deleteCat(cat): Observable<any> {
    return this.http.delete(this.Rest_Url+`/api/cat/${cat._id}`, this.options);
  }

}
