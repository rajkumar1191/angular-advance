import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheService } from './cache.service';
import { of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeApiService {
  private URL = 'https://jsonplaceholder.typicode.com/users';

  constructor(
    private http: HttpClient,
    private cache: CacheService
  ) {}

  getEmployees() {
    const cacheKey = 'employees';

    if (this.cache.has(cacheKey)) {
      console.log('Returning from cache');
      return of(this.cache.get(cacheKey));
    }

    return this.http.get(this.URL).pipe(
      tap(data => this.cache.set(cacheKey, data))
    );
  }
}
