import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(err => {
      console.error('Global API Error:', err);

      if (err.status === 401) {
        alert('Unauthorized - Please login again');
      }

      return throwError(() => err);
    })
  );
};
