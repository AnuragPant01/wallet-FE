import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const dateObject = moment(value);
    const datePortion = dateObject.format('YYYY-MM-DD');
    return datePortion;
  }

}
