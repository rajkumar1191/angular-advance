import { signalStore, withState } from "@ngrx/signals";

export const EmployeeSignalStore = signalStore(
  withState({
    selectedId: null as number | null,
  })
);
