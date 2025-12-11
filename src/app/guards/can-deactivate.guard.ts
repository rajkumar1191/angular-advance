import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanLeaveComponent {
  canLeave(): boolean | Observable<boolean>;
}

export const canDeactivateGuard: CanDeactivateFn<CanLeaveComponent> = (component) => {
  return component.canLeave();
};
