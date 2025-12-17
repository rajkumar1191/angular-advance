import { createFeatureSelector, createSelector } from "@ngrx/store";
// import { EmployeeState } from "./employee.reducer";
import { adapter, EmployeeState } from "./employee.entity";

export const selectEmployeeState =
  createFeatureSelector<EmployeeState>("employees");

// export const selectEmployees = createSelector(
//   selectEmployeeState,
//   (s) => s.employees
// );

export const { selectAll: selectEmployees } =
  adapter.getSelectors(selectEmployeeState);

export const selectLoading = createSelector(
  selectEmployeeState,
  (s) => s.loading
);
