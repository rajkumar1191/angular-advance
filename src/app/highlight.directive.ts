import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input() appHighlight = 'yellow';

  @HostBinding('style.background') bg: string | null = null;

  @HostListener('mouseenter')
  onEnter() {
    this.bg = this.appHighlight;
  }

  @HostListener('mouseleave')
  onLeave() {
    this.bg = null;
  }
}
