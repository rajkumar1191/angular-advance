import { createReducer, on } from "@ngrx/store";

import * as EmployeeActions from "./employee.actions";
import { adapter, initialState } from "./employee.entity";

export interface EmployeeState {
  employees: any[];
  loading: boolean;
  error: string | null;
}

// export const initialState: EmployeeState = {
//   employees: [],
//   loading: false,
//   error: null,
// };

export const employeeReducer = createReducer(
  initialState,
  on(EmployeeActions.loadEmployees, (state) => ({
    ...state,
    loading: true,
  })),
  on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) =>
    adapter.setAll(employees, {
      ...state,
      loading: false,
    })
  ),
  on(EmployeeActions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
