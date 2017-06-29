import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class CandidateService {

  public Rest_Url: String = 'http://localhost:3000';
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }
  getdetail(id): Observable<any> {
    return this.http.get(this.Rest_Url+`/api/thanhvien/`+id, this.options);
  }
    edit_user(user): Observable<any> {
    return this.http.put(this.Rest_Url + `/api/thanhvien/${user._id}`, JSON.stringify(user), this.options);
  }
   savecv(user): Observable<any> {
    return this.http.post(this.Rest_Url + `/api/resume`, JSON.stringify(user), this.options);
  }
}
