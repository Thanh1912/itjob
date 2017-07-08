import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class CompanyService {
public Rest_Url:String ='http://localhost:3000';
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getall(): Observable<any> {
    return this.http.get(this.Rest_Url+'/api/company-get-all').map(res => res.json());
  }

   getdetail_companybyid(id): Observable<any> {
    return this.http.get(this.Rest_Url+`/api/company/getdetail_company/`+id, this.options).map(res => res.json());
  }
  count_job_in_Company(id:any): Observable<any> {
    return this.http.get(this.Rest_Url+'/api/count-job-in-Company/'+id).map(res => res.json());
  }
  get_All_Skill_Company(id): Observable<any> {
    return this.http.get(this.Rest_Url+`/api/get-All-Skill-Company/`+id, this.options);
  }
   getjobincompany(id): Observable<any> {
    return this.http.get(this.Rest_Url + `/api/job-in-company/`+id, this.options);
  }
  




}
