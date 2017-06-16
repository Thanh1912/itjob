import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { WikipediaService } from '../wikipedia.service';
import { Hero } from '../hero';
@Component({
  moduleId: module.id,
  selector: 'hero-search',
  templateUrl: 'hero-search.component.html',
  styleUrls: [ 'hero-search.component.css' ],
  providers: [WikipediaService]
})
export class HeroSearchComponent  {
items: Observable<string[]>;
  constructor (private wikipediaService: WikipediaService) { }
  search (term: string) {
    this.items = this.wikipediaService.search(term);
  }
}
