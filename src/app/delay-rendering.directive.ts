import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDelayRendering]',
  standalone: true
})
export class DelayRenderingDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  @Input() set appDelayRendering(time: number) {
    this.viewContainer.clear();
    setTimeout(() => {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }, time);
  }
}
