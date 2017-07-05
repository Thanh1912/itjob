import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCompany'
})
export class SearchCompanyPipe implements PipeTransform {

  transform(value: any, allvalue: any, term): any {
    //get api => get all 

    if (value == null) {
      return null;
    }
    if (term == "") {
      return value;
    }
    return allvalue.filter(
      function (item) {
        return (item.info_recruiter.namecompany.toUpperCase().startsWith(term.toUpperCase()) || item.info_recruiter.namecompany.toUpperCase().indexOf(term.toUpperCase()) >= 0);
      }
    );
  }


}
