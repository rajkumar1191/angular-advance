import { Component, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  Subject,
  BehaviorSubject,
  ReplaySubject,
  AsyncSubject,
  Observable,
  of,
  interval,
  throwError,
  combineLatest,
  forkJoin,
} from "rxjs";
import {
  switchMap,
  mergeMap,
  concatMap,
  exhaustMap,
  takeUntil,
  catchError,
  finalize,
  delay,
  tap,
  retry,
  shareReplay,
  withLatestFrom,
  debounceTime,
} from "rxjs/operators";

@Component({
  selector: "app-rxjs-advanced",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 border rounded shadow">
      <h2>RxJS – Full Advanced Demo</h2>

      <!-- HIGHER ORDER MAPPING -->
      <section>
        <h3>1. Higher Order Mapping Operators</h3>
        <button (click)="fire('switch')">switchMap</button>
        <button (click)="fire('merge')">mergeMap</button>
        <button (click)="fire('concat')">concatMap</button>
        <button (click)="fire('exhaust')">exhaustMap</button>
      </section>

      <!-- SUBJECTS -->
      <section>
        <h3>2. Subjects</h3>
        <button (click)="testSubjects()">Test Subjects</button>
      </section>

      <!-- COMBINATION -->
      <section>
        <h3>3. Combination Operators</h3>
        <button (click)="testCombination()">
          Test combineLatest / forkJoin
        </button>
      </section>

      <!-- MULTICAST -->
      <section>
        <h3>4. Multicasting (shareReplay)</h3>
        <button (click)="testShareReplay()">Test shareReplay</button>
      </section>

      <!-- ERROR -->
      <section>
        <h3>5. Error Handling + Retry</h3>
        <button (click)="testError()">Trigger Error</button>
        <p>Status: {{ errorStatus }}</p>
      </section>

      <!-- COLD vs HOT -->
      <section>
        <h3>6. Cold vs Hot Observables</h3>

        <button (click)="testCold()">Test Cold Observable</button>
        <button (click)="testHot()">Test Hot Observable</button>
        <button (click)="testColdToHot()">Cold → Hot (shareReplay)</button>
      </section>

      <hr />
      <h4>Logs</h4>
      <div *ngFor="let log of logs">{{ log }}</div>
    </div>
  `,
})
export class RxjsAdvancedComponent implements OnDestroy {
  logs: string[] = [];
  destroy$ = new Subject<void>();
  trigger$ = new Subject<string>();
  errorStatus = "OK";

  constructor() {
    this.setupMapping();
  }

  /* ---------------------------
     1. HIGHER ORDER MAPPING
  ---------------------------- */
  setupMapping() {
    this.trigger$
      .pipe(
        takeUntil(this.destroy$), 
        switchMap((type) => {
          if (type !== "switch") return of(null);
          this.log("switchMap started");
          return this.fakeHttp().pipe(
            tap(() => this.log("switchMap completed"))
          );
        })
      )
      .subscribe();

    this.trigger$
      .pipe(
        takeUntil(this.destroy$),
        mergeMap((type) => {
          if (type !== "merge") return of(null);
          this.log("mergeMap started");
          return this.fakeHttp().pipe(
            tap(() => this.log("mergeMap completed"))
          );
        })
      )
      .subscribe();

    this.trigger$
      .pipe(
        takeUntil(this.destroy$),
        concatMap((type) => {
          if (type !== "concat") return of(null);
          this.log("concatMap started");
          return this.fakeHttp().pipe(
            tap(() => this.log("concatMap completed"))
          );
        })
      )
      .subscribe();

    this.trigger$
      .pipe(
        takeUntil(this.destroy$),
        exhaustMap((type) => {
          if (type !== "exhaust") return of(null);
          this.log("exhaustMap started");
          return this.fakeHttp().pipe(
            tap(() => this.log("exhaustMap completed"))
          );
        })
      )
      .subscribe();
  }

  fire(type: string) {
    this.trigger$.next(type);
  }

  fakeHttp() {
    return of("API Response").pipe(delay(1000));
  }

  /* ---------------------------
     2️. SUBJECT TYPES
  ---------------------------- */
  testSubjects() {
    this.log("--- BehaviorSubject ---");
    const bs = new BehaviorSubject(0);
    bs.subscribe((v) => this.log("BS Sub1: " + v));
    bs.next(1);
    bs.subscribe((v) => this.log("BS Sub2: " + v));

    this.log("--- ReplaySubject ---");
    const rs = new ReplaySubject(2);
    rs.next(1);
    rs.next(2);
    rs.next(3);
    rs.subscribe((v) => this.log("RS Sub: " + v));

    this.log("--- AsyncSubject ---");
    const as = new AsyncSubject();
    as.next(1);
    as.next(2);
    as.subscribe((v) => this.log("AS Sub: " + v));
    as.complete(); // emits last value only
    as.subscribe((v) => this.log("AS Sub: " + v));

  }

  /* ---------------------------
     3️. COMBINATION OPERATORS
  ---------------------------- */
  testCombination() {
    const a$ = interval(1000).pipe(tap((v) => this.log("A: " + v)));
    const b$ = interval(1500).pipe(tap((v) => this.log("B: " + v)));

    combineLatest([a$, b$])
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => this.log("combineLatest: " + v));

    forkJoin({
      one: of(1).pipe(delay(1000)),
      two: of(2).pipe(delay(2000)),
    }).subscribe((res) => this.log("forkJoin: " + JSON.stringify(res)));
  }

  /* ---------------------------
     4️. MULTICASTING
  ---------------------------- */
  testShareReplay() {
    const api$ = of(Math.random()).pipe(
      delay(1000),
      tap(() => this.log("HTTP CALL EXECUTED")),
      shareReplay(1)
    );

    api$.subscribe((v) => this.log("Subscriber 1: " + v));
    setTimeout(() => {
      api$.subscribe((v) => this.log("Subscriber 2 (cached): " + v));
    }, 2000);
  }

  /* ---------------------------
     5️. ERROR HANDLING
  ---------------------------- */
  testError() {
    this.errorStatus = "Loading...";

    throwError(() => new Error("Network Error"))
      .pipe(
        retry(2),
        catchError((err) => {
          this.log("Error handled");
          return of("Fallback Data");
        }),
        finalize(() => {
          this.errorStatus = "Completed";
        })
      )
      .subscribe((res) => this.log("Result: " + res));
  }

  /* ---------------------------
   6️. COLD vs HOT OBSERVABLES
---------------------------- */

  // COLD: each subscriber gets its own execution
  testCold() {
    this.log("--- COLD OBSERVABLE ---");

    const cold$ = new Observable<number>((observer) => {
      this.log("Cold observable executed");
      observer.next(Math.random());
    });

    cold$.subscribe((v) => this.log("Cold Sub 1: " + v));
    cold$.subscribe((v) => this.log("Cold Sub 2: " + v));
  }

  // HOT: shared execution using Subject
  testHot() {
    this.log("--- HOT OBSERVABLE ---");

    const hot$ = new Subject<number>();

    hot$.subscribe((v) => this.log("Hot Sub 1: " + v));

    hot$.next(Math.random());

    hot$.subscribe((v) => this.log("Hot Sub 2: " + v));

    hot$.next(Math.random());
  }

  // Convert COLD → HOT using shareReplay
  testColdToHot() {
    this.log("--- COLD → HOT (shareReplay) ---");

    const api$ = of(Math.random()).pipe(
      tap(() => this.log("API EXECUTED")),
      shareReplay(2)
    );

    api$.subscribe((v) => this.log("Subscriber 1: " + v));
    api$.subscribe((v) => this.log("Subscriber 2 (cached): " + v));
    api$.subscribe((v) => this.log("Subscriber 3 (cached): " + v));
    api$.subscribe((v) => this.log("Subscriber 4 (cached): " + v));
    api$.subscribe((v) => this.log("Subscriber 5 (cached): " + v));
  }

  log(msg: string) {
    this.logs.unshift(new Date().toLocaleTimeString() + " " + msg);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
