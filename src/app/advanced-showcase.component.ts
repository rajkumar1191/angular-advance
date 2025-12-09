import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  signal,
  computed,
  effect,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  ContentChild,
  AfterContentInit,
  AfterViewInit,
  OnInit,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HighlightDirective } from './highlight.directive';
import { DelayRenderingDirective } from './delay-rendering.directive';
import { ExpensiveMathPipe } from './expensive-math.pipe';
import { RandomValuePipe } from './random-value.pipe';
import { DynamicBoxComponent } from './dynamic-box.component';

@Component({
  selector: 'app-advanced-showcase',
  standalone: true,
  imports: [
    CommonModule,
    HighlightDirective,
    DelayRenderingDirective,
    ExpensiveMathPipe,
    RandomValuePipe
  ],
  template: `
  <div class="container" appHighlight="lightblue">
    <h2>Advanced Angular Core Showcase</h2>

    <!-- SIGNALS -->
    <section>
      <h3>Signals & Computed</h3>
      <p>Counter: {{ counter() }}</p>
      <p>Double: {{ doubleCounter() }}</p>
      <button (click)="increment()">Increment</button>
    </section>

    <!-- VIEWCHILD -->
    <section>
      <h3>ViewChild</h3>
      <input #nameBox type="text" placeholder="Enter text..." />
      <button (click)="readInput()">Read</button>
      <p>Value: {{ inputValue }}</p>
    </section>

    <!-- CONTENT PROJECTION -->
    <section>
      <h3>Content Projection & ContentChild</h3>
      <ng-content></ng-content>
      <p>Projected Template Found? → {{ !!projected }}</p>
      <ng-container *ngTemplateOutlet="projected"></ng-container>
    </section>

    <!-- STRUCTURAL DIRECTIVE -->
    <section>
      <h3>Structural Directive</h3>
      <div *appDelayRendering="1500" class="box">
        This block appeared after 1.5s!
      </div>
    </section>

    <!-- PIPES -->
    <section>
      <h3>Pipes: Pure vs Impure</h3>
      <p>Pure: {{ pureValue | expensiveMath }}</p>
      <p>Impure (changes every CD cycle): {{ '' | randomValue }}</p>
    </section>

    <!-- DYNAMIC COMPONENT LOADING -->
    <section>
      <h3>Dynamic Component Loading</h3>
      <ng-container #dynamicHost></ng-container>
      <button (click)="loadDynamic()">Load Component</button>
    </section>
  </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      border: 2px solid #999;
      border-radius: 10px;
      margin: 20px 0;
    }
    h3 { margin-top: 20px; }
    .box { padding: 10px; background:#eaffea; border:1px solid #bfe6bf; }
    button { margin-top: 6px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedShowcaseComponent
  implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {

  constructor(private cdr: ChangeDetectorRef) {}

  /** SIGNALS */
  counter = signal(0);
  doubleCounter = computed(() => this.counter() * 2);

  pureValue = 50;

  /** VIEWCHILD */
  @ViewChild('nameBox') nameBox!: any;
  @ViewChild('dynamicHost', { read: ViewContainerRef }) dynamicHost!: ViewContainerRef;
  inputValue = '';

  /** CONTENTCHILD */
  @ContentChild('projected', { read: TemplateRef }) projected!: TemplateRef<any>;

  /** SIGNAL EFFECT */
  logger = effect(() => {
    console.log('Signal Value:', this.counter());
  });

  ngOnInit() {
    console.log('OnInit triggered');
    setTimeout(() => {
      this.pureValue = 100;
    }, 3000);
  }

  ngAfterViewInit() {
    console.log('AfterViewInit → DOM ready');
    try { this.nameBox.nativeElement.focus(); } catch {}
  }

  ngAfterContentInit() {
    console.log('AfterContentInit → Projected content ready');
  }

  increment() {
    this.counter.update(v => v + 1);
  }

  readInput() {
    this.inputValue = this.nameBox.nativeElement.value;
    /** Demonstration → manually request CD */
    this.cdr.markForCheck();
  }

  loadDynamic() {
    // dynamic component loaded with a small delay for demonstration
    const ref = this.dynamicHost.createComponent(DynamicBoxComponent);
    ref.instance.message = 'Hello from dynamically loaded component!';

    setTimeout(() => {
      ref.destroy();
    }, 5000);
  }

  ngOnDestroy() {
    console.log('Component destroyed');
  }
}
