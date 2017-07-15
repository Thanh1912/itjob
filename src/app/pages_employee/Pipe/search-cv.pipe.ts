import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchcv'
})
export class SearchCvPipe implements PipeTransform {
 transform(value: any, titlesearch: string, allvalue: any, action: string ): Array<string> {

    if (titlesearch.length !== 0) {
        //======Search Email========
        return allvalue.filter(
          function (item) {
            return (item.infocandidateid[0].email.toUpperCase().startsWith(titlesearch.toUpperCase())
             || item.infocandidateid[0].email.toUpperCase().indexOf(titlesearch.toUpperCase()) >= 0
           );
          }
        )
          .map(function (item) {
            return item;
          });
        //======Search Email========
    }
    console.log('shw:'+action)
     if (action.length !== 0&& action!="new") {
       console.log(action)
        //======Search Email========
        return allvalue.filter(
          function (item) {
            return (item.status==action)
           ;
          }
        )
          .map(function (item) {
            return item;
          });
        //======Search Email========
    }
    return value;
  }
}
