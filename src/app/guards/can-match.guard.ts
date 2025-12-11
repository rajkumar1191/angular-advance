import { CanMatchFn } from '@angular/router';

export const canMatchGuard: CanMatchFn = () => {
  const allowAccess = true; // add logic
  return allowAccess;
};
