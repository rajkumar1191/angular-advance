import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployeeFacade } from "./../state/employee/employee.facade";
import { EmployeeFilterStore } from "./employee-filter.store";
import { combineLatest, map } from "rxjs";

@Component({
  selector: "app-advanced-routing-demo",
  standalone: true,
  imports: [CommonModule],
  providers: [EmployeeFilterStore],
  template: `
    <button (click)="load()">Load Employees</button>
    <input
      (input)="onFilter($any($event.target).value)"
      placeholder="Employee Filter"
    />
    <ul>
      <li *ngFor="let emp of filteredEmployees$ | async">
        {{ emp.name }}-{{ emp.role }}-{{ emp.id }}
      </li>
    </ul>
  `,
})
export class EmployeeListComponent implements OnInit {
  private readonly facade = inject(EmployeeFacade);
  public filterStore = inject(EmployeeFilterStore);
  filteredEmployees$ = combineLatest([
    this.facade.employees$,
    this.filterStore.filter$,
  ]).pipe(
    map(([employees, filter]) => {
      console.log(employees, filter);
      return employees.filter((emp) =>
        emp.name.toLowerCase().includes(filter.toLowerCase())
      );
    })
  );

  ngOnInit(): void {
    this.facade.load();

    this.filterStore.filter$.subscribe((v) => console.log(v));
  }
  load() {
    this.facade.load();
  }

  onFilter(value) {
    console.log(value);
    const normalized = value.trim().toLowerCase();
    this.filterStore.setFilter(normalized);
  }
}
