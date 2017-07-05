import { JobComponent } from './../../pages_employee/job/job.component';
import { Pipe, PipeTransform } from '@angular/core';
import { JobService } from './../../services/job.service';
@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  constructor(private job: JobService) {
  }
  get() {
    this.job.getall().subscribe(data => {
         console.log('Submot')
      console.log(data)
    })
  }
  transform(value: any, args?: any): any {
    this.get();
    return null;
  }
}
