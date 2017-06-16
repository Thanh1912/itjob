import { Component, OnInit } from '@angular/core';
import { PagerService } from './../../_services/pager.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import {Observable} from 'rxjs';
import 'rxjs/operator/map';
@Component({
  selector: 'app-quan-li-dia-diem',
  templateUrl: './quan-li-dia-diem.component.html',
  styleUrls: ['./quan-li-dia-diem.component.css']
})
export class QuanLiDiaDiemComponent implements OnInit {
 constructor(private http: Http, private pagerService: PagerService) { }

    // array of all items to be paged
    private allItems: any[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];

    ngOnInit() {

        // get dummy data
        this.http.get('http://5917bd215b63ed001125171e.mockapi.io/api/new')
            .map((response: Response) => response.json())
            .subscribe(data => {
                // set items to json response
                this.allItems = data;
                // initialize to page 1
                this.setPage(1);
            });
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
