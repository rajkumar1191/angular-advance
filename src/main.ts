import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withPreloading } from '@angular/router';
import { routes } from './app/app.routes';
import { CustomPreloader } from './app/core/preloading/custom-preloader';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { employeeReducer } from './app/state/employee/employee.reducer';
import { EmployeeEffects } from './app/state/employee/employee.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { retryInterceptor } from './app/core/interceptors/retry.interceptor';
import { errorInterceptor } from './app/core/interceptors/error.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withPreloading(CustomPreloader)),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        retryInterceptor,
        errorInterceptor
      ])
    ),
    provideStore({ employees: employeeReducer }),
    provideEffects([EmployeeEffects]),
    provideRouterStore(),
    provideStoreDevtools()
  ]
})
  .catch(err => console.error(err));
