import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withPreloading } from '@angular/router';
import { routes } from './app/app.routes';
import { CustomPreloader } from './app/preloading/custom-preloader';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { employeeReducer } from './app/state/employee/employee.reducer';
import { EmployeeEffects } from './app/state/employee/employee.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withPreloading(CustomPreloader)),
    provideStore({ employees: employeeReducer }),
    provideEffects([EmployeeEffects]),
    provideRouterStore(),
    provideStoreDevtools()
  ]
})
  .catch(err => console.error(err));
