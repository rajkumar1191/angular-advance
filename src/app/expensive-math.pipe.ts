import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expensiveMath',
  standalone: true,
  pure: true
})
export class ExpensiveMathPipe implements PipeTransform {
  transform(value: number): number {
    console.log('Expensive Calculation running...');
    // simulate work
    let result = value;
    for (let i = 0; i < 1000000; i++) result = result;
    return value * 2;
  }
}
