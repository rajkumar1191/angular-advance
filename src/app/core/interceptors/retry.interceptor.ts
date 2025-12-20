import { HttpInterceptorFn } from '@angular/common/http';
import { retry } from 'rxjs/operators';

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retry(2) // retry failed request 2 times
  );
};
