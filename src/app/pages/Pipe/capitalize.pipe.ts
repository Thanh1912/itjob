import { JobComponent } from './../../pages_employee/job/job.component';
import { Pipe, PipeTransform } from '@angular/core';
import { JobService } from './../../services/job.service';
import { DatePipe } from '@angular/common';
@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  constructor(private job: JobService, private datePipe: DatePipe) {
  }
  data1 = []
  transform(value: any, titlesearch?: string, allvalue?: any, begindate?: Date, enddate?: Date): any {
    var begin = new Date(begindate).getTime();
    var end = new Date(begindate).getTime();
    if (begin !== -2201882961000) {
      //======Search DateTime========
      return allvalue.filter(
        function (item) {
          return (
            new Date(item.createddate).getTime() < begin
          )
            ;
        }
      )
        .map(function (item) {
          return item;
        });
      //======Search DateTime========
    } else {
      console.log('START')
    }
    if (end !== -2201882961000) {
      //======Search DateTime========
      return allvalue.filter(
        function (item) {
          return (
            new Date(item.createddate).getTime() > end
          )
            ;
        }
      )
        .map(function (item) {
          return item;
        });
      //======Search DateTime========
    } else {
      console.log('end')
    }
    if (end !== -2201882961000 && begin !== -2201882961000) {
      //======Search DateTime========
      return allvalue.filter(
        function (item) {
          return (
            new Date(item.createddate).getTime() < begin
          ) && new Date(item.createddate).getTime() > end
            ;
        }
      )
        .map(function (item) {
          return item;
        });
      //======Search DateTime========
    } else {
      console.log('endbegin')
    }



    var result = [];
    if (titlesearch.length !== 0) {
      //======Search Title========
      return allvalue.filter(
        function (item) {
          return (item.title.toUpperCase().startsWith(titlesearch.toUpperCase())
            || item.title.toUpperCase().indexOf(titlesearch.toUpperCase()) >= 0)
            ;
        }
      )
        .map(function (item) {
          return item;
        });
      //======Search Title========
    }
    return value;




    // return value;





  }
}
