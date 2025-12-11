import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const userResolver: ResolveFn<any> = (route) => {
  const userService = inject(UserService);
  return userService.getUser(route.paramMap.get('id'));
};
