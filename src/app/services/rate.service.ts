
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RateService {

///
  public Rest_Url: String = 'http://localhost:3000';
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getByIdRecuter(id:String): Observable<any> {
    return this.http.get(this.Rest_Url + '/api/getByidrecruiter/'+id).map(res => res.json());
  }

  count(id:String): Observable<any> {
    return this.http.get(this.Rest_Url + '/api/countByidrecruiter/'+id).map(res => res.json());
  }

  add(item): Observable<any> {
    return this.http.post(this.Rest_Url + '/api/ratecomment', JSON.stringify(item), this.options);
  }
  checkHire(item:any){
    return this.http.post(this.Rest_Url + '/api/checkHire/resume', JSON.stringify(item), this.options).map(res => res.json());
  }
 


 

}

