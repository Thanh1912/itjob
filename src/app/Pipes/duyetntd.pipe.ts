import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class DuyetntdPipe implements PipeTransform {
  transform(value: any, titlesearch: string, allvalue: any, action: string, ): Array<string> {
    var result = [];
    if (titlesearch.length !== 0) {
      if (action == "all") {
        //======Search Email========
        return allvalue.filter(
          function (item) {
            return (   item.info_recruiter.namecompany.toUpperCase().startsWith(titlesearch.toUpperCase())
             || item.info_recruiter.namecompany.toUpperCase().indexOf(titlesearch.toUpperCase()) >= 0
             || item.email.toUpperCase().startsWith(titlesearch.toUpperCase()) 
             ||item.email.toUpperCase().indexOf(titlesearch.toUpperCase()) >= 0);
          }
        )
          .map(function (item) {
            return item;
          });
        //======Search Email========
      }
      if (action == "email") {
        //======Search Company========
        return allvalue.filter(
          function (item) {
            return (item.email.toUpperCase().startsWith(titlesearch.toUpperCase()) || item.email.toUpperCase().indexOf(titlesearch.toUpperCase()) >= 0);
          }
        )
          .map(function (item) {
            return item;
          });
        //======Search Company========
      }
      if (action == "company") {
        //======Search Company========
        return allvalue.filter(
          function (item) {
            return (item.email.toUpperCase().startsWith(titlesearch.toUpperCase()) || item.email.toUpperCase().indexOf(titlesearch.toUpperCase()) >= 0);
          }
        )
          .map(function (item) {
            return item;
          });
        //======Search Company========
      }







    }
    return value;
  }
}

/*
@Pipe({
  name: 'orderByEmail'
})
export class OrderByPipe implements PipeTransform {
  transform(value:any,titlesearch:string): Array<string> {
   return value.filter(item=>item.email.startsWith(titlesearch));
  }
}*/

/*

 transform(items: any[], filter: String): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter(item => item.title.toUpperCase().indexOf(filter.toUpperCase()) !== -1);
  }
*/