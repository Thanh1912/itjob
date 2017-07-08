import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class ResumeService {

  public Rest_Url: String = 'http://localhost:3000';
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }
  getPDFById(id): Observable<any> {
    return this.http.get(this.Rest_Url + `/api/readPdf/resume/` + id, this.options);
  }
  save(items): Observable<any> {
    return this.http.post(this.Rest_Url + '/api/resume', JSON.stringify(items), this.options);
  }
  CheckinsertCV(items): Observable<any> {
    return this.http.post(this.Rest_Url + `/api/insertCV/`, JSON.stringify(items), this.options);
  }
  getalljobapplyByidUser(id: any): Observable<any> {
    return this.http.get(this.Rest_Url + '/api/jobapplyByidUser/resume/' + id).map(res => res.json());
  }
  getalljobapplyByidJOB(id: any): Observable<any> {
    return this.http.get(this.Rest_Url + '/api/jobapplyByidJOB/resume/' + id).map(res => res.json());
  }

  edit(items): Observable<any> {
    return this.http.put(this.Rest_Url + `/api/resume/${items._id}`, JSON.stringify(items), this.options);
  }


}
