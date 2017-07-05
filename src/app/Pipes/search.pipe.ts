import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCompany'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, term): any {
    //get api => get all 
   
    if( value==null){
       return null;
    }
    if(term==""){
      return value;
    }
    return value;
   // return value.filter(item=>item.info_recruiter.namecompany.startsWith(term));
  }

}