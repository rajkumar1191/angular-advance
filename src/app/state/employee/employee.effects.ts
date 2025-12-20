import { inject, Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { EmployeeService } from "../../core/services/employee.service";
import * as EmployeeActions from "./employee.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class EmployeeEffects {
    private readonly actions$ = inject(Actions);
  constructor(private service: EmployeeService) {}

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),
      switchMap(() =>
        this.service.getEmployees().pipe(
          map((employees) =>
            EmployeeActions.loadEmployeesSuccess({ employees })
          ),
          catchError((err) =>
            of(EmployeeActions.loadEmployeesFailure({ error: err.message }))
          )
        )
      )
    )
  );
}
