import { Component, forwardRef, OnInit } from "@angular/core";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Observable, of, delay, map } from "rxjs";

/**
 * CUSTOM FORM CONTROL (ControlValueAccessor)
 * Allows this component to be used as a form control in a parent form.
 */
@Component({
  selector: "app-rating-input",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rating-container">
      <span
        *ngFor="let star of stars; let i = index"
        (click)="setRating(i + 1)"
        [class.filled]="i < value"
      >
        ★
      </span>
    </div>
  `,
  styles: [
    `
      .rating-container {
        display: inline-block;
        cursor: pointer;
        font-size: 1.5rem;
      }
      .filled {
        color: gold;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingInputComponent),
      multi: true,
    },
  ],
})
export class RatingInputComponent implements ControlValueAccessor {
  stars = [1, 2, 3, 4, 5];
  value = 0;
  onChange = (val: number) => {};
  onTouched = () => {};

  setRating(rating: number) {
    this.value = rating;
    this.onChange(rating);
    this.onTouched();
  }

  // ControlValueAccessor Interface Implementation
  writeValue(value: number): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

/**
 * ASYNC VALIDATOR
 * Simulates a server check for unique username
 */
const uniqueUsernameValidator = (): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(control.value).pipe(
      delay(1000), // Simulate API latency
      map((value) => {
        return value === "admin" ? { usernameTaken: true } : null;
      })
    );
  };
};

/**
 * ADVANCED FORMS COMPONENT
 */
@Component({
  selector: "app-advanced-forms",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RatingInputComponent],
  template: `
    <div class="p-4 border rounded shadow mb-4">
      <h2>2. Advanced Reactive Forms</h2>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <!-- NESTED FORM GROUP -->
        <div formGroupName="userDetails" class="mb-4">
          <h3>User Details</h3>
          <div class="field">
            <label>Username (Async Validated - try 'admin'):</label>
            <input formControlName="username" type="text" />
            <span *ngIf="username?.pending"> Checking...</span>
            <span *ngIf="username?.hasError('usernameTaken')" class="error">
              Username is taken!</span
            >
          </div>
        </div>

        <!-- CUSTOM CONTROL -->
        <div class="mb-4">
          <h3>Custom Control (ControlValueAccessor)</h3>
          <label>Rate your skill:</label>
          <app-rating-input formControlName="skillRating"></app-rating-input>
          <p>Current Rating: {{ form.get("skillRating")?.value }}</p>
        </div>

        <!-- FORM ARRAY -->
        <div class="mb-4">
          <h3>Skills (FormArray)</h3>
          <div formArrayName="skills">
            <div
              *ngFor="let skill of skills.controls; let i = index"
              class="skill-row"
            >
              <input [formControlName]="i" placeholder="Skill name" />
              <button type="button" (click)="removeSkill(i)">x</button>
            </div>
          </div>
          <button type="button" (click)="addSkill()">+ Add Skill</button>
        </div>

        <button type="submit" [disabled]="form.invalid">Submit Form</button>
      </form>

      <pre class="mt-4">{{ form.value | json }}</pre>
    </div>
  `,
  styles: [
    `
      .field {
        margin-bottom: 1rem;
      }
      .error {
        color: red;
        font-size: 0.8em;
      }
      .skill-row {
        margin-bottom: 0.5rem;
      }
    `,
  ],
})
export class AdvancedFormsComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      userDetails: this.fb.group({
        username: ["", [Validators.required], [uniqueUsernameValidator()]],
        email: ["", [Validators.required, Validators.email]],
      }),
      skillRating: [3], // Initial value for custom control
      skills: this.fb.array([this.fb.control("Angular")]),
    });
  }

  ngOnInit() {}

  get username() {
    return this.form.get("userDetails.username");
  }

  get skills() {
    return this.form.get("skills") as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control(""));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  onSubmit() {
    console.log("Form Submitted", this.form.value);
  }
}
