import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployeeApiService } from "../../core/services/employee-api.service";
import { WebSocketService } from "../../core/services/websocket.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-employee",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Employees (HTTP + Cache)</h3>

    <button (click)="loadEmployees()">Load Employees</button>

    <ul>
      <li *ngFor="let emp of employees">
        {{ emp.name }}
      </li>
    </ul>

    <hr />

    <h3>Live Messages (WebSocket)</h3>

    <button (click)="send()">Send WebSocket Message</button>

    <p *ngFor="let msg of messages">{{ msg }}</p>
  `,
})
export class EmployeeComponent implements OnInit, OnDestroy {
  employees: any[] = [];
  messages: string[] = [];

  private destroy$ = new Subject<void>();

  constructor(private api: EmployeeApiService, private ws: WebSocketService) {}

  // HTTP + Cache (Intercepted automatically)
  ngOnInit() {
    // this.loadEmployees();

    // WebSocket subscription
    this.ws.messages$.pipe(takeUntil(this.destroy$)).subscribe((msg) => {
      console.log("Received WebSocket message:", msg);
      this.messages.push(msg as string);
    });
  }

  loadEmployees() {
    this.api
      .getEmployees()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.employees = data as any[];
      });
  }

  send() {
    this.ws.send("Hello from Angular");
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
