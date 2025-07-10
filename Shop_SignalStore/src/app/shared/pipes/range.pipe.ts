import { Pipe, PipeTransform } from '@angular/core';

@Pipe({standalone: true, name: 'range'})
export class RangePipe implements PipeTransform {
  transform(value: number): number[] {
    return Array.from({ length: value }, (_, i) => i);
  }
}
