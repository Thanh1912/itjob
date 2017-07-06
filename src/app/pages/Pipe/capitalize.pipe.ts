import { JobComponent } from './../../pages_employee/job/job.component';
import { Pipe, PipeTransform } from '@angular/core';
import { JobService } from './../../services/job.service';
@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  constructor(private job: JobService) {
  }
data1=[]
  transform(value: any, args?: any): any {
    var item = {};
    return  value;
  }
}
