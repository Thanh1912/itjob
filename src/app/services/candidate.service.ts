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
    return this.http.get(this.Rest_Url + `/api/thanhvien/` + id, this.options);
  }
    count(): Observable<any> {
    return this.http.get(this.Rest_Url + '/api/thanhvien/count').map(res => res.json());
  }
  getTop(): Observable<any> {
    return this.http.get(this.Rest_Url + `/api/topcandidate/`).map(res => res.json());
  }
  getallpage(skip: String, limit: String): Observable<any> {
    return this.http.get(this.Rest_Url + '/api/get-All-page/' + skip + '/' + limit).map(res => res.json());
  }
  searchCandidate(item): Observable<any> {
    return this.http.post(this.Rest_Url + `/api/searchCandidate/`, JSON.stringify(item), this.options).map(res => res.json());
  }

  edit_user(user): Observable<any> {
    return this.http.put(this.Rest_Url + `/api/thanhvien/${user._id}`, JSON.stringify(user), this.options);
  }
  savecv(user): Observable<any> {
    return this.http.post(this.Rest_Url + `/api/resume`, JSON.stringify(user), this.options);
  }
  get(user): Observable<any> {
    return this.http.get(this.Rest_Url + `/api/thanhvien/${user._id}`, this.options).map(res => res.json());
  }

  getdetailCandi(id) {
    return this.http.get(this.Rest_Url + '/api/detail_Candidate/' + id).map(res => res.json());

  }

  //edit password
  EditPassWord(user): Observable<any> {
    return this.http.post(this.Rest_Url + `/api/resume`, JSON.stringify(user), this.options);
  }
    //edit password
   candidate_suitable(post): Observable<any> {
    return this.http.post(this.Rest_Url + `/api/candidate-suitable`, JSON.stringify(post), this.options).map(res => res.json());
  }


 

}
