import { createAction, props } from "@ngrx/store";

export const loadEmployees = createAction("[Employee] Load");
export const loadEmployeesSuccess = createAction(
  "[Employee] Load Success",
  props<{ employees: any[] }>()
);
export const loadEmployeesFailure = createAction(
  "[Employee] Load Failure",
  props<{ error: string }>()
);
