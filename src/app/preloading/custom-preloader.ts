import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

export class CustomPreloader implements PreloadingStrategy {
  preload(route: Route, loadFn: () => Observable<any>): Observable<any> {
    return route.data?.['preload'] ? loadFn() : of(null);
  }
}
