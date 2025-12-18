import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeFacade } from '../../state/employee/employee.facade';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  private readonly facade = inject(EmployeeFacade);
  form: FormGroup;
  resolvedUser: any;
  saved = true;

  filteredEmployees$ = this.facade.employees$;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.resolvedUser = this.route.snapshot.data['user'];

    this.form = this.fb.group({
      name: [this.resolvedUser?.name ?? ''],
      email: [this.resolvedUser?.email ?? ''],
      role: [this.resolvedUser?.role ?? 'User']
    });

    this.form.valueChanges.subscribe(() => {
      this.saved = false;
    });
  }

  save() {
    console.log('Saving…', this.form.value);
    this.saved = true;
  }

  canLeave() {
    if (!this.saved) {
      return confirm('You have unsaved changes, leave anyway?');
    }
    return true;
  }
}
