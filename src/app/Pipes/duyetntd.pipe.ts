import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class DuyetntdPipe implements PipeTransform {
  transform(value: any, titlesearch: string, allvalue: any): Array<string> {
    var result = [];
    if (titlesearch.length !== 0) {


      return allvalue.filter(
        function (item) {
          return (item.email.toUpperCase().startsWith(titlesearch.toUpperCase()) || item.email.toUpperCase().indexOf(titlesearch.toUpperCase())>= 0);
        }
      )
        .map(function (item) {
          return item;
        })
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