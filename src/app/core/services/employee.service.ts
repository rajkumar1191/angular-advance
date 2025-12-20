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
        name: "Harish",
        role: "developer",
      },
      {
        id: 3,
        name: "Aadhi",
        role: "developer",
      },
      {
        id: 4,
        name: "Yuga",
        role: "developer",
      },
    ]).pipe(delay(1000));
  }
}
