import { Component, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-cd-demo',
  standalone: true,
  template: `
    <div>
      <h3>OnPush CD Demo</h3>
      <p>value: {{ value }}</p>
      <button (click)="incrementInside()">Increment (inside NgZone)</button>
      <button (click)="incrementOutside()">Increment (outside NgZone)</button>
      <button (click)="mark()">markForCheck()</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeDetectionDemoComponent {
  value = 0;
  constructor(private cdr: ChangeDetectorRef, private zone: NgZone) {}

  incrementInside() {
    this.value++;
  }

  incrementOutside() {
    this.zone.runOutsideAngular(() => {
      this.value++;
      this.zone.run(() => {}); // re-enter Angular zone to trigger CD
    });
  }

  mark() {
    this.cdr.markForCheck() // schedules CD for this component and ancestors with OnPush
  }
}
