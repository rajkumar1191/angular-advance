import { ComponentStore } from "@ngrx/component-store";
import { Injectable } from "@angular/core";

@Injectable()
export class EmployeeFilterStore extends ComponentStore<{ filter: string }> {
  readonly filter$ = this.select((s) => s.filter);

  readonly setFilter = this.updater((state, filter: string) => ({
    ...state,
    filter,
  }));

  constructor() {
    super({ filter: "" });
  }
}
