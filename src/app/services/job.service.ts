import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class JobService {

  public Rest_Url: String = 'http://localhost:3000';
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http) { }
  //get top  post cong viec 
  gettopjob(): Observable<any> {
    return this.http.get(this.Rest_Url + '/api/gettop10post').map(res => res.json());
  }
  gettop12Company(): Observable<any> {
    return this.http.get(this.Rest_Url + '/api/gettop12Company').map(res => res.json());
  }
  searchJobTile(item): Observable<any> {
    return this.http.post(this.Rest_Url + '/api/job-search-title', JSON.stringify(item), this.options).map(res => res.json());
  }

  getall(): Observable<any> {
    return this.http.get(this.Rest_Url + '/api/job').map(res => res.json());
  }
  getallpage(skip: number, limit: number): Observable<any> {
    return this.http.get(this.Rest_Url + '/api/jobPage/' + skip + "/" + limit).map(res => res.json());
  }
  searchadminjob(item: any, skip: number, limit: number): Observable<any> {
    return this.http.post(this.Rest_Url + '/api/searchjob-page/' + skip + "/" + limit, JSON.stringify(item), this.options).map(res => res.json());
  }
  countsearchadminjob(item: any, skip: number, limit: number): Observable<any> {
    return this.http.post(this.Rest_Url + '/api/count-searchjob-page/', JSON.stringify(item), this.options).map(res => res.json());
  }
  getjobByID(id: String): Observable<any> {
    return this.http.get(this.Rest_Url + `/api/getjobByID/` + id, this.options).map(res => res.json());
  }
  getdetailjob(id): Observable<any> {
    return this.http.get(this.Rest_Url + `/api/getDetailjob/` + id, this.options);
  }
    getdetailjobByIdjob_admin(id): Observable<any> {
    return this.http.get(this.Rest_Url + `/api/getjobByIDJob-admin/` + id, this.options);
  }
  
  //get by id keyword - ngon ngu
  getkeywork_job(list: Array<String>): Observable<any> {
    return this.http.post(this.Rest_Url + `/api/search-job-key`, JSON.stringify(list), this.options);
  }
  //get count job
  countjob(): Observable<any> {
    return this.http.get(this.Rest_Url + '/api/job/count').map(res => res.json());
  }
  getallkeyword(): Observable<any> {
    return this.http.get(this.Rest_Url + '/api/keyword').map(res => res.json());
  }

}
