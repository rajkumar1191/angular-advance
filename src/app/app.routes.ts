import { Routes } from '@angular/router';
import { AdvancedRoutingDemoComponent } from './components/advanced-routing-demo/advanced-routing-demo.component';
import { authGuard } from './guards/auth.guard';
import { canDeactivateGuard } from './guards/can-deactivate.guard';
import { canMatchGuard } from './guards/can-match.guard';
import { userResolver } from './resolvers/user.resolver';

export const routes: Routes = [
  { path: '', component: AdvancedRoutingDemoComponent },
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [authGuard],
    canDeactivate: [canDeactivateGuard],
    canMatch: [canMatchGuard],
    resolve: { user: userResolver },
    data: { preload: true }
  }
];
