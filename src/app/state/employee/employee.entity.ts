import { createEntityAdapter, EntityState } from "@ngrx/entity";

export interface Employee {
  id: number;
  name: string;
  role: string;
}

export interface EmployeeState extends EntityState<Employee> {
  loading: boolean;
}

export const adapter = createEntityAdapter<Employee>();

export const initialState: EmployeeState = adapter.getInitialState({
  loading: false,
});
