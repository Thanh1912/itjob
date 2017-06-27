import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchJob'
})
export class SearchJobPipe implements PipeTransform {

  transform(items: any[], filter: String): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter(item => item.title.toUpperCase().indexOf(filter.toUpperCase()) !== -1);
  }
}
@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(array: Array<any>, orderField: string, orderType: boolean): Array<string> {
    array.sort((a: any, b: any) => {
      let ae = a[orderField];
      let be = b[orderField];
      if (ae == undefined && be == undefined) return 0;
      if (ae == undefined && be != undefined) return orderType ? 1 : -1;
      if (ae != undefined && be == undefined) return orderType ? -1 : 1;
      if (ae == be) return 0;
      return orderType ? (ae.toString().toLowerCase() > be.toString().toLowerCase() ? -1 : 1) : (be.toString().toLowerCase() > ae.toString().toLowerCase() ? -1 : 1);
    });
    return array;
  }
}