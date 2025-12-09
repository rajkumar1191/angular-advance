import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-box',
  standalone: true,
  template: `
    <div style="padding: 10px; background:#d1ffd6; border:1px solid #92e89d; margin-top:10px;">
      {{ message }}
    </div>
  `
})
export class DynamicBoxComponent {
  @Input() message: string = 'I am a dynamically loaded component!';
}
