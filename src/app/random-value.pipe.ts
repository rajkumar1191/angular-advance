import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomValue',
  standalone: true,
  pure: false
})
export class RandomValuePipe implements PipeTransform {
  transform() {
    console.log('Impure Pipe Executed');
    return Math.random().toFixed(4);
  }
}
