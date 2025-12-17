import { Injectable, signal } from "@angular/core";
import { delay, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  getEmployees() {
    return of([
      {
        id: 1,
        name: "Raj",
        role: "developer",
      },
      {
        id: 2,
        name: "Raj",
        role: "developer",
      },
      {
        id: 3,
        name: "Raj",
        role: "developer",
      },
      {
        id: 4,
        name: "Raj",
        role: "developer",
      },
    ]).pipe(delay(1000));
  }
}
