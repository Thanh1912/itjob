
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class sliderService {
  public Rest_Url: String = 'http://localhost:3000';
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http) { }
  getall(): Observable<any> {
    return this.http.get(this.Rest_Url + '/api/slider').map(res => res.json());
  }
    getslider(): Observable<any> {
    return this.http.get(this.Rest_Url + '/api/getslider').map(res => res.json());
  }
  
  count(): Observable<any> {
    return this.http.get(this.Rest_Url + '/api/slider/count').map(res => res.json());
  }
  add(items): Observable<any> {
    return this.http.post(this.Rest_Url + '/api/slider', JSON.stringify(items), this.options);
  }
  get(items): Observable<any> {
    return this.http.get(this.Rest_Url + `/api/slider/${items._id}`, this.options);
  }
  edit(items): Observable<any> {
    return this.http.put(this.Rest_Url + `/api/slider/${items._id}`, JSON.stringify(items), this.options);
  }
  delete(items): Observable<any> {
    return this.http.delete(this.Rest_Url + `/api/slider/${items._id}`, this.options);
  }
}

