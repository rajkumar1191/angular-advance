import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../core/services/auth.service";

export const authGuard: CanActivateFn = () => {
  console.log("coming in");
  const auth = inject(AuthService);
  console.log(auth.isLoggedIn());
  return auth.isLoggedIn() ? true : false;
};

// canActivateChild
