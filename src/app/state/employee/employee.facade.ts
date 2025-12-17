import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectEmployees } from "./employee.selectors";
import * as EmployeeActions from "./employee.actions";

@Injectable({
  providedIn: "root",
})
export class EmployeeFacade {
  private readonly store = inject(Store);
  employees$ = this.store.select(selectEmployees);

  load() {
    this.store.dispatch(EmployeeActions.loadEmployees());
  }
}
