import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUser(id: string | null) {
    return of({
      id: id ?? '001',
      name: 'Rajesh Kumar',
      role: 'Admin',
      email: 'admin@example.com'
    }).pipe(delay(1000));
  }
}
