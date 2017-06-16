import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Hero }           from './hero';
@Injectable()
export class HeroSearchService {
  constructor(private http: Http) {}
  search(term: string): Observable<Hero[]> {
    return this.http
               .get(`http://5913438e08cca60011027745.mockapi.io/api/hero?id=${term}`)
               .map((r: Response) => r.json().data as Hero[]);
  }
}
